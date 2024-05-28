import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { MessageLog } from "./MessageLog";
import { MessageBox } from "./MessageBox";
import useChatContext from "./context";

export function MessageContainer() {
    const [ connecting, setConnecting ] = useState<boolean>(true);

    const {
        topOffset,
        bottomOffset,
        setBottomOffset
    } = useChatContext();

    return (
        <React.Fragment>
            {
                connecting &&
                    <Box 
                        position="absolute"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        top={topOffset}
                        width="100%"
                        maxWidth="md"
                        height={`calc(100dvh - ${topOffset}px)`}>
                        <Stack
                            alignItems="center"
                            spacing={1}>
                            <CircularProgress />
                            <Typography>Loading</Typography>
                        </Stack>
                    </Box>
            }
            <MessageLog
                hide={connecting}
                topOffset={topOffset}
                bottomOffset={bottomOffset}
                onInit={() => setConnecting(false)}
            />
            <MessageBox
                hide={connecting}
                onRef={(ref) => setBottomOffset(ref?.clientHeight || 0)}
            />
        </React.Fragment>
    )
}