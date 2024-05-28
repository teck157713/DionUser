import { FirebaseApp } from "firebase/app";
import { Auth, User } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { Functions } from "firebase/functions";
import { createContext } from "react";

interface IFirebaseContext {
    app?: FirebaseApp,
    auth?: Auth,
    firestore?: Firestore,
    functions?: Functions,
    user?: User
}

const value: IFirebaseContext = {};
export const FirebaseContext = createContext(value);