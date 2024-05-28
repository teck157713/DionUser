import { Timestamp } from "firebase-admin/firestore";
import { PaginationRequest } from "./firestore.model";

export interface ScheduleRequest {
    uid: string,
    startTime: number,
    endTime?: number,
    startDate?: Timestamp,
    endDate?: Timestamp,
    repeat?: number,
    frequency?: string
}

export interface GetAvailableUsersPaginationRequest extends PaginationRequest {
    startTime: number,
    endTime?: number,
    startDate?: Timestamp,
    endDate?: Timestamp
}
