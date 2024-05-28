import { getApp, getApps, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth, onAuthStateChanged, User } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { FirebaseContext } from "../contexts/firebase.context";
import { Typography } from "@mui/material";

const config = {
    apiKey: "AIzaSyB-4MdewLtEIfpPf-veDeLismr5miZiQ34",
    authDomain: "contractors-dc3b8.firebaseapp.com",
    projectId: "contractors-dc3b8",
    storageBucket: "contractors-dc3b8.appspot.com",
    messagingSenderId: "205250107756",
    appId: "1:205250107756:web:8f2535d49baf5418bf7b49",
    measurementId: "G-B587HKK0Q3"
};

export function FirebaseProvider({ children }: any) {
    const [ initialized, setInitialized ] = useState<boolean>(false);
    const [ user, setUser ] = useState<User>();
    const isLocal = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

    const firebase = useMemo(() => {
        const hasApps = !!getApps().length;

        const app = hasApps ? getApp() : initializeApp(config);
        const auth = getAuth(app);
        const firestore = getFirestore(app);

        // Set up phone number sign in
        auth.useDeviceLanguage();

        // Connect to emulator if it is in development
        if (!hasApps && isLocal) {
            const host = "127.0.0.1"; // For browser
            // const host = "10.0.2.2"; // For mobile apps
            connectAuthEmulator(auth, `http://${host}:9099`, { disableWarnings: true });
            connectFirestoreEmulator(firestore, host, 8080);
        }

        return {
            app,
            auth,
            firestore
        };
    }, [config]);

    useEffect(() => {
        if (firebase.auth) {
            const unsub = onAuthStateChanged(firebase.auth, (user) => {
                setInitialized(true);
                setUser(user || undefined);
            })

            return () => unsub();
        }
    }, [firebase.auth]);

    return (
        <FirebaseContext.Provider value={{
            ...firebase,
            user
        }}>
            {
                !initialized || !firebase.auth || !firebase.firestore ?
                    <Typography>Loading</Typography> :
                    children
            }
        </FirebaseContext.Provider>
    )
}