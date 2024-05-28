import { FieldPath, OrderByDirection, WhereFilterOp } from "firebase-admin/firestore";

export interface OrderByRequest {
    fieldPath: string | FieldPath,
    directionStr?: OrderByDirection
}

export interface WhereRequest {
    fieldPath: string | FieldPath,
    opStr: WhereFilterOp,
    value: any
}

export interface PaginationRequest {
    limit: number,
    where?: WhereRequest[],
    orderBy?: OrderByRequest,
    startAfterCursor?: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>,
}