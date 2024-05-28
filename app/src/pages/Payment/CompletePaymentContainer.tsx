import { Button, Stack, Typography } from "@mui/material";
import usePaymentContext from "./context";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useCaseAPI } from "../../apis/cases.api";

export function CompletePaymentContainer() {
    const {
        topOffset
    } = usePaymentContext();

    const { caseId, specialistUID } = useParams();
    const [ searchParams ] = useSearchParams();
    
    const navigate = useNavigate();
    const caseAPI = useCaseAPI();
    const redirectStatus = searchParams.get("redirect_status");

    useEffect(() => {
        if (caseId && redirectStatus === "pending") {
            caseAPI
                .setPaymentPending(caseId)
                .catch(() => {});
        }
    }, [
        caseId, 
        redirectStatus
    ]);

    const getRedirectButtons = () => {
        switch (redirectStatus) {
            case "succeeded":
            case "pending": {
                return (
                    <Button
                        variant="contained"
                        onClick={() => navigate(`/case/${caseId}/chats/${specialistUID}`)}>
                        Return to chat
                    </Button>
                );
            }
            case "payment_failed": {
                return (
                    <Button
                        variant="contained"
                        onClick={() => navigate(`/case/${caseId}/chats/${specialistUID}/payment`)}>
                        Return to payment
                    </Button>
                )
            }
        }

        return null;
    }

    return (
        <Stack
            width="100%"
            p={2}
            position="absolute"
            top={topOffset}
            alignItems="center"
            spacing={2}>
            <Typography 
                variant="h5">
                {redirectStatus && (redirectStatus?.charAt(0).toUpperCase() + redirectStatus?.substring(1).replace("_", " "))}
            </Typography>
            {
                getRedirectButtons()
            }
        </Stack>
    )
}