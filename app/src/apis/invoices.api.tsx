import { useAxios } from "./api";

export function useInvoiceAPI() {
    const axios = useAxios();

    return {
        getDraftInvoice: (
            caseId: string,
            specialistUID: string
        ) => {
            return axios
                .post("/invoices/getDraftInvoice", { caseId, specialistUID })
                .then((data) => data.data)
                .catch(() => {})
        },
        draftInvoice: (
            caseId: string,
            specialistUID: string
        ) => {
            return axios
                .post("/invoices/draftInvoice", { caseId, specialistUID })
                .catch(() => {});
        }
    }
}