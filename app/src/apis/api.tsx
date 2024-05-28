import axios from "axios";
import useFirebase from "../hooks/firebase.hook";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";

export function useAxios() {
    const { user, auth } = useFirebase();
    const navigate = useNavigate();

    useEffect(() => {
        axios.interceptors.response.use(
            response => response,
            error => {
                const originalRequest = error.config;
                const errorCode = error?.response?.data?.code || error?.code || "";

                if (errorCode === "auth/id-token-expired" || 
                    errorCode === "unauthorized") {
                    axios.defaults.headers.common["Authorization"] = "";

                    return user
                        ?.getIdToken(true)
                        .then((value) => {
                            axios.defaults.headers.common["Authorization"] = `Bearer ${value}`;
                            originalRequest.headers["Authorization"] = `Bearer ${value}`;
                            return axios(originalRequest);
                        })
                        .catch((error) => {
                            signOut(auth!)
                                .then(() => navigate("/sign-in"))
                                .catch(() => navigate("/sign-in"));
                            return Promise.reject(error);
                        });
                }
                else if (errorCode === "auth/id-token-revoked") {
                    axios.defaults.headers.common["Authorization"] = "";

                    signOut(auth!)
                        .then(() => navigate("/sign-in"))
                        .catch(() => navigate("/sign-in"));
                    
                    return Promise.reject(error);
                }

                return Promise.reject(error);
            }
        );
    }, [user]);

    return axios;
}
