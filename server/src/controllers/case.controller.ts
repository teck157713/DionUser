import { Request, Response } from "express";
import { auth, firestore } from "../firebase"
import { AddRequest } from "../models/case.model";
import { PaginationRequest } from "../models/firestore.model";
import { Timestamp } from "firebase-admin/firestore";
import { getCaseFn } from "../utils/case.util";
import { toUser } from "../utils/auth.utils";

export const add = async (req: Request, res: Response) => {
    try {
        const addRequest = req.body as AddRequest;
        const payload = {
            ...addRequest,
            createdAt: Timestamp.now(),
            createdBy: req.app.locals.uid,
            acceptedBy: null,
            status: "PENDING"
        };

        const addResponse = await firestore
            .collection(`cases`)
            .add(payload);

        res.status(200).json({
            id: addResponse.id,
            ...payload
        });
    }
    catch (error) {
        res.status(400).json(error);
    }
}

export const getUserCase = async (req: Request, res: Response) => {
    try {
        const results = await getCaseFn(req, true);
        res.status(200).json(results);
    }
    catch (error) {
        res.status(400).json(error);
    }
}

export const getUserCreatedHistory = async (req: Request, res: Response) => {
    try {
        const getUserCreatedHistoryRequest = req.body as PaginationRequest;

        let query = firestore
            .collection("/cases")
            .where("createdBy", "==", req.app.locals.uid)
            .where("status", "in", ["COMPLETED", "FAILED"]);

        if (getUserCreatedHistoryRequest.startAfterCursor) {
            query = query.startAfter(getUserCreatedHistoryRequest.startAfterCursor);
        }
        
        const getPendingResponse = await query
            .limit(getUserCreatedHistoryRequest.limit)
            .get();

        const output = await Promise.all(
            getPendingResponse.docs.map(async (doc) => {
                const data = {
                    ...doc.data()
                };

                const createdByUser = await auth.getUser(data.createdBy);
                const acceptedByUser = data.acceptedBy ? await auth.getUser(data.acceptedBy) : null;
                
                return {
                    ...data, 
                    id: doc.id,
                    createdBy: createdByUser ? toUser(createdByUser) : {},
                    acceptedBy: acceptedByUser ? toUser(acceptedByUser) : {}
                }
            })
        );
        
        res.status(200).json(output)
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

export const getUserCreatedPending = async (req: Request, res: Response) => {
    try {
        const getUserCreatedPendingRequest = req.body as PaginationRequest;

        let query = firestore
            .collection("/cases")
            .where("createdBy", "==", req.app.locals.uid)
            .where("status", "in", ["PENDING", "PAYMENT_PENDING", "IN_PROGRESS"]);

        if (getUserCreatedPendingRequest.startAfterCursor) {
            query = query.startAfter(getUserCreatedPendingRequest.startAfterCursor);
        }
        
        const getPendingResponse = await query
            .limit(getUserCreatedPendingRequest.limit)
            .get();

        const output = await Promise.all(
            getPendingResponse.docs.map(async (doc) => {
                const data = {
                    ...doc.data()
                };

                const createdByUser = await auth.getUser(data.createdBy);
                const acceptedByUser = data.acceptedBy ? await auth.getUser(data.acceptedBy) : null;
                
                return {
                    ...data, 
                    id: doc.id,
                    createdBy: createdByUser ? toUser(createdByUser) : {},
                    acceptedBy: acceptedByUser ? toUser(acceptedByUser) : null
                }
            })
        );
        
        res.status(200).json(output)
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

export const setPaymentPending = async (req: Request, res: Response) => {
    try {
        const caseId = req.body.caseId;

        const snapshot = await firestore
            .doc(`/cases/${caseId}`)
            .get();

        if (snapshot.data()?.status !== "PENDING") {
            throw {
                code: "failed",
                message: "Only case with PENDING can set as PAYMENT_PENDING"
            }
        }

        await firestore
            .doc(`/cases/${caseId}`)
            .update({
                status: "PAYMENT_PENDING"
            });

        res.status(200).send();
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}
