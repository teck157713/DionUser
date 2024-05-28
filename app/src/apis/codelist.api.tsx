import { CodeListValue } from "../models/codelist.model";
import { useAxios } from "./api";

export function useCodeListAPI() {
    const axios = useAxios();

    return {
        getCodeList: (): Promise<CodeListValue[]> => {
            return axios
                .post("/getCodeList")
                .then((data: any) => data.data)
                .catch((error: any) => Promise.reject(error));
        }
    }
}