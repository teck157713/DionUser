import { Request, Response } from "express";
import { firestore } from "../firebase";

export const onPaymentIntentSucceeded = async (req: Request, res: Response) => {
    try {
        // Get the draft invoice
        const paymentIntentObject = req.body.data.object;
        const caseId = paymentIntentObject.transfer_group;

        const caseSnapshot = await firestore
            .doc(`/cases/${caseId}`)
            .get();

        if (!caseSnapshot.data()?.pendingInvoice) {
            throw {
                code: "NO_PENDING_INVOICE",
                message: "No pending invoice found!"
            }
        }

        const acceptedBy: any = caseSnapshot.data()?.pendingAcceptedBy || null;
        const invoice: any = caseSnapshot.data()?.pendingInvoice || null;
        
        // Update the invoice for the case
        await firestore
            .doc(`/cases/${caseId}`)
            .update({
                status: "IN_PROGRESS",
                acceptedBy,
                invoice,
                pendingAcceptedBy: null,
                pendingInvoice: null
            });
    }
    catch (error) {
        console.log(error)
        res.status(400).json(error);
    }
}
