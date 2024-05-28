import { Timestamp } from "firebase/firestore";
import { useAxios } from "./api";

export function useChatAPI() {
    const axios = useAxios();

    return {
        getChatUsers: (
            caseId: string
        ) => {
            return axios
                .post("/chats/getChatUsers", { caseId })
                .then((data) => data.data)
                .catch(() => {})
        },
        getMessages: (
            caseId: string,
            specialistUID: string
        ) => {
            return axios
                .post("/chats/getMessages", { caseId, specialistUID })
                .then((data) => data.data.map((val: any) => ({  ...val, timestamp: new Timestamp(val.timestamp._seconds, val.timestamp._nanoseconds) })))
                .catch(() => {})
        },
        sendMessage: (
            caseId: string,
            specialistUID: string,
            message: string,
            images: string[]
        ) => {
            return axios
                .post("/chats/sendMessage", { caseId, specialistUID, message, images })
                .then(() => {})
                .catch(() => {});
        }
    }
}