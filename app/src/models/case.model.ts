import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import { ServiceResponse } from "./invoice.model";

export interface CaseResponse {
    id: string,
    createdAt: Timestamp,
    createdBy: User,
    acceptedBy: User | null,
    status: string,
    serviceCategory: string,
    service: string,
    from: Timestamp,
    to: Timestamp,
    specialists: string[],
    issue: string,
    address1: string,
    address2?: string,
    postalCode: string,
    invoice?: ServiceResponse[]
}