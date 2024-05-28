import { Request, Response } from "express";
import { firestore } from "../firebase";
import { getDraftInvoice, getTotalAmountFromDraftInvoice, getTotalAmountFromInvoice } from "../utils/invoice.utils";
import { stripe } from "../utils/stripe.utils";
import { onPaymentIntentSucceeded } from "../utils/stripe-webhook";

export const createAccount = async (req: Request, res: Response) => {
    try {
        const snapshot = await firestore
            .doc(`/users/${req.app.locals.uid}`)
            .get();

        if (snapshot.exists && snapshot.data()?.stripeAccountId) {
            throw {
                code: "failed",
                message: "User already has a stripe account!"
            };
        }

        const account = await stripe.accounts.create({
            business_type: "individual",
            controller: {
                stripe_dashboard: {
                    type: "none"
                },
                fees: {
                    payer: "application"
                },
                losses: {
                    payments: "application"
                },
                requirement_collection: "application"
            },
            capabilities: {
                transfers: {
                    requested: true
                }
            },
            country: "SG"
        });

        await firestore
            .doc(`/users/${req.app.locals.uid}`)
            .set(
                {
                    stripeAccountId: account.id
                }, 
                {
                    merge: true
                }
            )

        res.status(200).send();
    }
    catch (error) {
        res.status(400).json(error);
    }
}

export const getAccount = async (req: Request, res: Response) => {
    try {
        const snapshot = await firestore
            .doc(`/users/${req.app.locals.uid}`)
            .get();

        if (!snapshot.exists || snapshot.data()?.stripeAccountId) {
            throw {
                code: "failed",
                message: "User does not have a stripe account!"
            };
        }
        
        res.status(200).json({
            stripeAccountId: snapshot.data()?.stripeAccountId
        });
    }
    catch (error) {
        res.status(400).json(error);
    }
}

export const createIntent = async (req: Request, res: Response) => {
    try {
        const caseId: string = req.body.caseId;
        const specialistUID: string = req.body.specialistUID;
        const invoice: any[] = await getDraftInvoice(caseId!, specialistUID);
        const total = invoice.reduce((acc, curr) => acc += curr.price, 0) || 0;
        const platformFee = parseInt(process.env.PLATFORM_BASE_FEE || "0") + total * parseFloat(process.env.PLATFORM_PERCENTAGE_FEE || "0");

        // Check status
        const caseSnapshot = await firestore
            .doc(`/cases/${caseId}`)
            .get();

        if (caseSnapshot.data()?.status !== "PENDING") {
            throw {
                code: "CASE_NOT_PENDING",
                message: "Case is not pending"
            }
        }
        
        // Check invoice
        if (total < 0) {
            throw {
                code: "NO_DRAFT_INVOICE",
                message: "No draft invoice found!"
            }
        }
        else if (total < platformFee) {
            throw {
                code: "TOTAL_LESS_THAN_MIN",
                message: "Total amount cannot be lesser than platform fee!"
            }
        }

        // Create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total * 100,
            currency: "sgd",
            automatic_payment_methods: {
                enabled: true
            },
            transfer_group: caseId
        });

        // Create a pending invoice
        await firestore
            .doc(`/cases/${caseId}`)
            .update({
                pendingAcceptedBy: specialistUID,
                pendingInvoice: invoice
            })

        res.status(200).json({
            clientSecret: paymentIntent.client_secret
        });
    }
    catch (error) {
        res.status(400).json(error);
    }
}

export const transfer = async (req: Request, res: Response) => {
    try {
        const caseId: string = req.body.caseId;
        const specialistUID = req.body.specialistUID;
        const total = await getTotalAmountFromInvoice(caseId);
        const platformFee = parseInt(process.env.PLATFORM_BASE_FEE || "0") + total * parseFloat(process.env.PLATFORM_PERCENTAGE_FEE || "0");

        if (total < 0) {
            throw {
                code: "NO_DRAFT_INVOICE",
                message: "No draft invoice found!"
            }
        }

        const specialistSnapshot = await firestore
            .doc(`/users/${specialistUID}`)
            .get();

        if (!specialistSnapshot.exists || !specialistSnapshot.data()?.stripeAccountId) {
            throw {
                code: "NO_STRIPE_ACCOUNT",
                message: "User does not have a stripe account!"
            };
        }

        const destination = specialistSnapshot.data()?.stripeAccountId;

        await stripe.transfers.create({
            amount: (total * 100) - (platformFee * 1000),
            currency: "sgd",
            destination: destination,
            transfer_group: caseId
        });

        res.status(200).send();
    }
    catch (error) {
        res.status(400).json(error);
    }
}

export const webhook = async (req: Request, res: Response) => {
    if (req.body.type === "payment_intent.succeeded") {
        onPaymentIntentSucceeded(req, res);
    }
    else {
        res.status(200).send();
    }
}
