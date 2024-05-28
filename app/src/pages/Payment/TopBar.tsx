import { AppBar, Divider, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBackIos } from "@mui/icons-material";
import usePaymentContext from "./context";

export function TopBar() {
    const { caseId, specialistUID } = useParams();
    const navigate = useNavigate();

    const {
        setTopOffset
    } = usePaymentContext();

    return (
        <AppBar 
            ref={(ref) => setTopOffset(ref?.clientHeight || 0)}
            position="fixed"
            sx={{
                maxWidth: "md",
                left: "50%",
                transform: "translate(-50%, 0)",
                bgcolor: "bg",
            }}>
            <Toolbar 
                disableGutters>
                <Stack
                    width="100%"
                    direction="row"
                    alignItems="center"
                    spacing={1}>
                    <IconButton
                        onClick={() => navigate(`/case/${caseId}/chats/${specialistUID}`)}>
                        <ArrowBackIos />
                    </IconButton>
                    <Typography
                        variant="h6">
                        Payment
                    </Typography>
                </Stack>                    
            </Toolbar>
            <Divider
                sx={{
                    mt: 1
                }}
            />
        </AppBar>
    )
}