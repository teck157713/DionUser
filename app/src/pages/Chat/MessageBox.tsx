import { Add, Close, Send } from "@mui/icons-material";
import { IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useChatAPI } from "../../apis/chats.api";
import { MessageBoxMediaIcons } from "./MessageBoxMediaIcons";

export function MessageBox({
    hide,
    onRef
}: {
    hide: boolean,
    onRef: (ref: HTMLDivElement | null) => void
}) {
    const chatAPI = useChatAPI();
    const { caseId, specialistUID } = useParams();
    const [ message, setMessage ] = useState<string>("");
    const [ showMediaIcons, setShowMediaIcons ] = useState<boolean>(false);

    return hide ?
        <React.Fragment></React.Fragment>
        :
        <Stack
            ref={onRef}
            position="fixed"
            width="100%"
            maxWidth="md"
            left="50%"
            bottom={0}
            bgcolor="white"
            sx={{
                transform: "translate(-50%, 0)"
            }}>
            {
                showMediaIcons && caseId && specialistUID &&
                    <MessageBoxMediaIcons 
                        caseId={caseId}
                        specialistUID={specialistUID}
                        onClose={() => setShowMediaIcons(false)}
                    />
            }
            <TextField
                fullWidth
                placeholder="Message"
                value={message}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        chatAPI.sendMessage(caseId!, specialistUID!, message, []);
                        setMessage("");
                    }
                }}
                onChange={(e) => {
                    setMessage(e.target.value);
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <IconButton onClick={() => setShowMediaIcons(!showMediaIcons)}>
                                {
                                    showMediaIcons ?
                                        <Close /> :
                                        <Add />
                                }
                            </IconButton>
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton>
                                <Send />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
        </Stack>;
}