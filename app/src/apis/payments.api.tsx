import { useAxios } from "./api";

export function usePaymentAPI() {
    const axios = useAxios();

    return {
        createPaymentIntent: (
            caseId: string,
            specialistUID: string
        ) => {
            return axios
                .post("/payments/createIntent", { caseId, specialistUID })
                .then((data) => data.data)
                .catch(() => {})
        }
    }
}