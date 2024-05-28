import { Request } from "express";
import { auth, firestore } from "../firebase";
import { GetModel } from "../models/case.model";
import { Timestamp } from "firebase-admin/firestore";

export const getCaseFn = async (req: Request, authorization: Boolean = true): Promise<GetModel> => {
    const caseId = req.body.caseId;
    const snapshot = await firestore
        .doc(`/cases/${caseId}`)
        .get();

    const data = snapshot.data();

    if (!data) {
        throw {
            code: "failed",
            message: "Unable to find such case!"
        };
    }

    if (authorization &&
        (!data || (data.createdBy !== req.app.locals.uid && data.acceptedBy !== req.app.locals.uid))) {
        throw {
            code: "unauthorized",
            message: "User is not authorized to access this case!"
        };
    }

    const createdByUser = await auth.getUser(data.createdBy);
    const acceptedByUser = data.acceptedBy ? await auth.getUser(data.acceptedBy) : null;

    return {
        id: snapshot.id,
        status: data.status,
        service: data.service,
        serviceCategory: data.serviceCategory,
        address1: data.address1,
        address2: data.address2,
        postalCode: data.postalCode,
        issue: data.issue,
        from: data.from,
        to: data.to,
        createdAt: data.createdAt || Timestamp.now(),
        createdBy: createdByUser || null,
        acceptedBy: acceptedByUser || null
    };
}