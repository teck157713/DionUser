import { CameraAlt, Collections } from "@mui/icons-material";
import { IconButton, Paper, Stack, Typography } from "@mui/material";
import { useChatAPI } from "../../apis/chats.api";
import { IPhoto, getPhoto, pickImages } from "../../utils/Camera";
import { urlToBase64 } from "../../utils/File";

export function MessageBoxMediaIcons({
    caseId,
    specialistUID,
    onClose
}: {
    caseId: string,
    specialistUID: string,
    onClose: () => void
}) {
    const chatAPI = useChatAPI();

    

    const sendImages = (photos: IPhoto[]) => {
        Promise
            .all(photos.map(photo => photo && urlToBase64(photo.webPath)))
            .then((images) => {
                chatAPI.sendMessage(
                    caseId, 
                    specialistUID,
                    "",
                    images.filter(data => data)
                )
            });
    }

    return (
        <Paper>
            <Stack
                direction="row"
                p={2}
                gap={2}
                alignItems="start">
                <Stack>
                    <IconButton
                        onClick={() => pickImages({
                            onImagesSelect: sendImages,
                            onDone: onClose
                        })}>
                        <Collections />
                    </IconButton>
                    <Typography>
                        Gallery
                    </Typography>
                </Stack>
                <Stack>
                    <IconButton
                        onClick={() => getPhoto({
                            onImageSelect: (photo) => sendImages([photo]),
                            onDone: onClose
                        })}>
                        <CameraAlt />
                    </IconButton>
                    <Typography>
                        Camera
                    </Typography>
                </Stack>
            </Stack>
        </Paper>
    )
}