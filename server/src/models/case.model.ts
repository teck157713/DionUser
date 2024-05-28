import { Timestamp } from "firebase-admin/firestore"
import { CASE_STATUS } from "./codelist.model"
import { UserRecord } from "firebase-admin/auth"
import { ServiceModel } from "./invoice.model"

export interface AddRequest {
    serviceCategory: string,
    service: string,
    from: Timestamp,
    to: Timestamp,
    issue: string,
    address1: string,
    address2?: string,
    postalCode: string
}

export interface AddModel extends AddRequest {
    createdAt: Timestamp,
    createdBy: string,
    acceptedBy: string | null,
    status: CASE_STATUS
}

export interface GetModel extends AddRequest {
    id: string,
    serviceCategory: string,
    service: string,
    from: Timestamp,
    to: Timestamp,
    issue: string,
    address1: string,
    address2?: string,
    postalCode: string
    status: CASE_STATUS,
    createdAt: Timestamp,
    createdBy: UserRecord,
    acceptedBy: UserRecord | null,
    pendingAcceptedBy?: UserRecord | null,
    invoice?: ServiceModel[],
    pendingInvoice?: ServiceModel[]
}
