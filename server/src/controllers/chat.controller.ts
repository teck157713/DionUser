import { Request, Response } from "express";
import { getCaseFn } from "../utils/case.util";
import { auth, firestore, storage } from "../firebase";
import { Timestamp } from "firebase-admin/firestore";
import { sockets } from "../websocket";
import { toUser } from "../utils/auth.utils";
import { getDownloadURL } from "firebase-admin/storage";
import { format } from "util";

export const getChatUsers = async (req: Request, res: Response) => {
    try {
        const chatSnapshots = await firestore
            .collection(`/cases/${req.body.caseId}/chats`)
            .get();
        
        const output = await Promise.all(chatSnapshots.docs.map(async (snapshot) => {
            const record = await auth.getUser(snapshot.id)
            return toUser(record);
        }));
        
        res.status(200).json(output)
    }
    catch (error) {
        res.status(400).json(error);
    }
}

export const getMessages = async (req: Request, res: Response) => {
    try {
        // Get current case (throws error if its not current user)
        await getCaseFn(req, true);

        // Get the list of messages
        const messageResponse = await firestore
            .collection(`/cases/${req.body.caseId}/chats/${req.body.specialistUID}/messages`)
            .orderBy("timestamp", "desc")
            .get();

        res.status(200).json(messageResponse.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })));
    }
    catch (error) {
        res.status(400).json(error);
    }
}

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const uid = req.app.locals.uid
        const message = req.body.message;

        // Upload images if any
        const images = req.body.images?.map((data: string) => ({
            id: crypto.randomUUID(),
            data: data
        })) || [];

        const imagesMetadata = await Promise.all(images.map((image: any) =>
            new Promise((resolve) => {
                const path = `/images/${image.id}`;

                const bucket = storage.bucket();
                const blob = bucket.file(path);
                const blobStream = blob.createWriteStream();
    
                blobStream.on("error", () => resolve(null));
    
                blobStream.on("finish", () => resolve({
                    id: path,
                    url: format(
                        `${process.env.NODE_ENV === "development" ? "http://127.0.0.1:9199/" : "https://storage.googleapis.com/"}${bucket.name}${blob.name}`
                    )
                }));

                blobStream.end(image.data);
            }
        )));

        const data: {
            timestamp: Timestamp,
            from: string,
            message: string,
            images: string[]
        } = {
            timestamp: Timestamp.now(),
            from: uid,
            message,
            images: imagesMetadata.filter(data => data)
        };

        // Add new message to the chats of the case
        const messageResponse = await firestore
            .collection(`/cases/${req.body.caseId}/chats/${req.body.specialistUID}/messages`)
            .add(data);

        res.status(200).send({
            id: messageResponse.id,
            ...data
        });
    }
    catch (error) {
        console.log(error)
        res.status(400).json(error);
    }
}
