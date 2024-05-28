import { Timestamp } from "firebase/firestore";

export interface ChatResponse {
    id: string,
    timestamp: Timestamp,
    from : string,
    message: string,
    images: {
        id: string,
        url: string
    }[]
}