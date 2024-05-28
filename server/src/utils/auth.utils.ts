import { UserRecord } from "firebase-admin/auth";

export function toUser(userRecord: UserRecord) {
    return {
        disabled: userRecord.disabled,
        displayName: userRecord.displayName,
        email: userRecord.email,
        emailVerified: userRecord.emailVerified,
        photoURL: userRecord.photoURL,
        phoneNumber: userRecord.phoneNumber,
        uid: userRecord.uid
    };
}