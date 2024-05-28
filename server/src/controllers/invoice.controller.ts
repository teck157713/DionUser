import { Request, Response } from "express";
import { GetDraftInvoiceRequest, UpdateDraftInvoiceRequest } from "../models/invoice.model"
import { firestore } from "../firebase";

export const getDraftInvoice = async (req: Request, res: Response) => {
    try {
        const draftInvoiceReq = req.body as GetDraftInvoiceRequest;
        const snapshot = await firestore
            .doc(`/cases/${draftInvoiceReq.caseId}/chats/${draftInvoiceReq.specialistUID}`)
            .get();
        res.status(200).json(snapshot.data()?.invoice || []);
    }
    catch (error) {
        res.status(400).json(error);
    }
}

export const draftInvoice = async (req: Request, res: Response) => {
    try {
        const draftInvoiceReq = req.body as UpdateDraftInvoiceRequest;
        const total = draftInvoiceReq.invoice.reduce((acc, curr) => acc += curr.price, 0) || 0;
        const platformFee = parseInt(process.env.PLATFORM_FEE || "0");

        if (total < platformFee) {
            throw {
                code: "failed",
                message: "Total amount cannot be lesser than platform fee!"
            }
        }

        await firestore
            .doc(`/cases/${draftInvoiceReq.caseId}/chats/${draftInvoiceReq.specialistUID}`)
            .update({
                invoice: draftInvoiceReq.invoice
            });
        res.status(200).send();
    }
    catch (error) {
        res.status(400).json(error);
    }
}
