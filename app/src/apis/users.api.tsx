import { useAxios } from "./api";

export function useUserAPI() {
    const axios = useAxios();

    return {
        add: (
            firstName: string,
            lastName: string,
            email: string,
            password: string
        ) => {
            return axios
                .post("/users/register", {
                    firstName,
                    lastName,
                    email,
                    password
                })
                .then(() => Promise.resolve())
                .catch((error) => Promise.reject(error.response.data));
        }
    }
}