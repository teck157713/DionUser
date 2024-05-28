import React from "react";
import useFirebase from "../hooks/firebase.hook";
import { Navigate, useNavigation } from "react-router-dom";

const unauthorizedRoutes: string[] = [
    "/"
];

export function AuthRoute({ children }: any) {
    const { user } = useFirebase();
    const navigation = useNavigation();
    const isUnauthorized = navigation.location?.pathname ? unauthorizedRoutes.includes(navigation.location?.pathname) : false;

    return (
        <React.Fragment>
            {
                user && !isUnauthorized ?
                    children :
                    <Navigate to="/sign-in" />
            }
        </React.Fragment>
    )
}