import { firestore } from "../firebase";

export const getTotalAmountFromInvoice = async (caseId: string) => {
    const chatSnapshot = await firestore
        .doc(`/cases/${caseId}`)
        .get();

    if (!chatSnapshot.data()?.invoice) {
        return -1;
    }

    const invoice: any[] = chatSnapshot.data()?.invoice || [];
    return invoice.reduce((acc, curr) => acc += curr.price, 0) || 0;
}

export const getTotalAmountFromDraftInvoice = async (caseId: string, specialistUID: string) => {
    const invoice: any[] = await getDraftInvoice(caseId, specialistUID);

    if (!invoice.length) {
        return -1;
    }
    
    return invoice.reduce((acc, curr) => acc += curr.price, 0) || 0;
}

export const getDraftInvoice = async (caseId: string, specialistUID: string) => {
    const chatSnapshot = await firestore
        .doc(`/cases/${caseId}/chats/${specialistUID}`)
        .get();

    if (!chatSnapshot.data()?.invoice) {
        return [];
    }

    return chatSnapshot.data()?.invoice || [];
} 
