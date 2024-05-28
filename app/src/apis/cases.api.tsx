import { Timestamp } from "firebase/firestore";
import { useAxios } from "./api";
import { CaseResponse } from "../models/case.model";

export function useCaseAPI() {
    const axios = useAxios();

    return {
        add: (
            serviceCategory: string,
            service: string,
            from: Timestamp,
            to: Timestamp,
            issue: string,
            postalCode: string,
            address1: string,
            address2?: string,
        ) => {
            return axios
                .post("/cases/add", {
                    serviceCategory,
                    service,
                    from,
                    to,
                    issue,
                    address1,
                    address2,
                    postalCode
                })
                .then((data) => Promise.resolve(data.data))
                .catch((error) => Promise.reject(error));
                
        },
        getUserCase: (
            caseId: string
        ) => {
            return axios
                .post("/cases/getUserCase", { caseId })
                .then((data) => Promise.resolve(data.data as CaseResponse))
                .catch((error) => Promise.reject(error));
        },
        getUserCreatedPending: (
            limit: number,
            startAfter?: any
        ) => {
            return axios
                .post("/cases/getUserCreatedPending", { limit, startAfter })
                .then((data) => Promise.resolve(data.data))
                .catch((error) => Promise.reject(error));
        },
        getUserCreatedHistory: (
            limit: number,
            startAfter?: any
        ) => {
            return axios
                .post("/cases/getUserCreatedHistory", { limit, startAfter })
                .then((data) => Promise.resolve(data.data))
                .catch((error) => Promise.reject(error));
        },
        setPaymentPending: (
            caseId: string
        ) => {
            return axios
                .post("/cases/setPaymentPending", { caseId })
                .then(() => {})
                .catch((error) => Promise.reject(error));
        }
    }
}