import { applicationDefault, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    process.env["FIRESTORE_EMULATOR_HOST"] = "localhost:8080";
    process.env["FIREBASE_AUTH_EMULATOR_HOST"] = "localhost:9099";
    process.env["FIREBASE_STORAGE_EMULATOR_HOST"] = "localhost:9199";
}

// const agent = new HttpsProxyAgent(`http://localhost:${process.env.PORT}`);
const app = initializeApp({
    credential: applicationDefault(),
    storageBucket: "surveillance-405117.appspot.com"
});

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
