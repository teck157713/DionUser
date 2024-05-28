import { Box, Paper, Stack, Typography } from "@mui/material"
import useFirebase from "../../hooks/firebase.hook"
import { CustomImage } from "../../components/CustomImage";

export function Message({
    message
}: {
    message: any
}) {
    const { user } = useFirebase();

    return (
        <Box>
            <Paper
                sx={{
                    float: message.from === user?.uid ? "right" : "left",
                    borderRadius: 4,
                    zIndex: 0,
                    maxWidth: "70%"
                }}>
                <Stack
                    p={1}
                    gap={0.5}
                    >
                    <Typography>
                        {message.message}
                    </Typography>
                    {
                        message.images?.map((image: string, i: number) => (
                            <CustomImage
                                key={i}
                                id={`image-${i}`}
                                src={image}
                            />
                        ))
                    }
                    <Typography
                        variant="caption"
                        textAlign="right">
                        {message.timestamp.toDate().toLocaleString()}
                    </Typography>
                </Stack>
            </Paper>
        </Box>
    )
}