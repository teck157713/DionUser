import { Avatar, Box, Divider, Rating, Stack, Typography } from "@mui/material";
import useFirebase from "../../hooks/firebase.hook";

export function ProfilePage() {
    const { user } = useFirebase();

    return (
        <Stack 
            p={2}
            spacing={1}
            alignItems="center"
            bgcolor="bg"
            minHeight="100dvh">
            <Avatar
                src={user?.photoURL || ""}
                sx={{
                    minWidth: 150,
                    minHeight: 150
                }}
            />
            <Typography variant="h5">
                {
                    user?.displayName
                }
            </Typography>
            <Rating 
                name="user-rating"
                size="large"
                value={4}
                precision={0.5}
                readOnly
            />
            <Divider
                flexItem 
            />
            <Box className="page-last-child" />
        </Stack>
    )
}
