import { useContext } from "react";
import { FirebaseContext } from "../contexts/firebase.context";

export default function useFirebase() {
    return useContext(FirebaseContext);
}
