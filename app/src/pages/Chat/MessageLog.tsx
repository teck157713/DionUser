import { Box, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ChatResponse } from "../../models/chat.model";
import { DocumentData, QuerySnapshot, collection, onSnapshot } from "firebase/firestore";
import useFirebase from "../../hooks/firebase.hook";
import { useParams } from "react-router-dom";
import { Message } from "./Message";

export function MessageLog({
    hide,
    topOffset,
    bottomOffset,
    onInit
}: {
    hide: boolean,
    topOffset: number,
    bottomOffset: number,
    onInit: () => void
}) {
    const { caseId, specialistUID } = useParams();
    const { firestore } = useFirebase();
    const [ messages, setMessages ] = useState<ChatResponse[]>([]);

    const onSnapshotChange = async (snapshot: QuerySnapshot<DocumentData, DocumentData>) => {
        onInit();

        const snapshotDocs = await Promise.all(snapshot
            .docChanges()
            .map(async (change) => ({
                    id: change.doc.id,
                    ...change.doc.data(),
                    images: change.doc.data()?.images && (
                        await Promise.all(
                            change.doc.data().images.map(async (image: any) => {
                                try {
                                    return fetch(image.url)
                                        .then(res => res.text())
                                        .then(data => data)
                                        .catch(() => "")
                                }
                                catch {
                                    return null;
                                }
                            })
                        )
                    ).filter(data => data)
            } as ChatResponse)));

        setMessages((previousMessages: ChatResponse[]) => 
            previousMessages
                .concat(snapshotDocs)
                .sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis())
        );
    }

    useEffect(() => {
        if (caseId && specialistUID) {
            const unsub = onSnapshot(
                collection(firestore!, `/cases/${caseId}/chats/${specialistUID}/messages`),
                onSnapshotChange
            );
    
            return unsub;
        }
    }, []);

    return hide ?
        <React.Fragment></React.Fragment>
        :
        <Stack
            p={1}
            gap={1}
            sx={{
                bgcolor: "bg",
                position: "absolute",
                maxHeight: `calc(100dvh - ${topOffset}px - ${bottomOffset}px)`,
                width: "100%",
                maxWidth: "md",
                top: topOffset,
                bottom: bottomOffset,
                overflow: "auto",
                flexDirection: "column-reverse",
                left: "50%",
                transform: "translate(-50%, 0)"
            }}>
            {
                messages.map(message => (
                    <Message
                        key={message.id}
                        message={message}
                    /> 
                ))
            }
        </Stack>
}