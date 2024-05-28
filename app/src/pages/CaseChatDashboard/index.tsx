import { Avatar, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { User } from "firebase/auth";
import { useChatAPI } from "../../apis/chats.api";
import { ServiceResponse } from "../../models/invoice.model";
import { useInvoiceAPI } from "../../apis/invoices.api";
import { TopAppBar } from "../../components/TopAppBar";

interface CaseChatInvoice {
    [key: string]: ServiceResponse[]
}

export function CaseChatDashboard() {
    const navigate = useNavigate();
    const invoiceAPI = useInvoiceAPI();
    const chatAPI = useChatAPI();
    const { caseId } = useParams();
    const { state } = useLocation();
    const [ topOffset, setTopOffset ] = useState<number>(0);
    const [ specialists, setSpecialists ] = useState<User[]>([]);
    const [ invoices, setInvoices ] = useState<CaseChatInvoice>({});

    useEffect(() => {
        if (state?.caseData?.status === "IN_PROGRESS") {
            const specialist = state.caseData.acceptedBy;
            navigate(`/case/${caseId}/chats/${specialist.uid}`, { state: { caseData: state.caseData }, replace: true });
        }

        if (caseId && !state) {
            // <TODO> Load case if no existing state of case found
            
        }

        chatAPI
            .getChatUsers(caseId!)
                .then(data => setSpecialists(data))
                .catch(() => {});
    }, []);

    useEffect(() => {
        Promise.all(
            specialists
                .map(async (specialist) => {
                    try {
                        const invoice = await invoiceAPI.getDraftInvoice(caseId!, specialist.uid);
                        return {
                            [specialist.uid]: invoice
                        };
                    }
                    catch {
                        return {};
                    }
                })
        ).then((values) => setInvoices(values.reduce((acc, curr) => acc = {...acc, ...curr }, {})))
    }, [specialists]);

    return (
        <React.Fragment>
            <TopAppBar
                title="Chats"
                setTopOffset={(offset) => setTopOffset(offset)}
                onBack={() => navigate("/")}
            />
            <Stack
                p={1}
                gap={1}
                sx={{
                    bgcolor: "bg",
                    position: "absolute",
                    maxHeight: `calc(100dvh - ${topOffset}px)`,
                    width: "100%",
                    maxWidth: "md",
                    top: topOffset,
                    bottom: 0,
                    overflow: "auto"
                }}>
                {
                    !specialists.length &&
                        <Stack
                            sx={{
                                display: "flex",
                                position: "relative",
                                width: "100%",
                                height: "100%",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                            <Stack
                                alignItems="center"
                                spacing={2}>
                                <CircularProgress />
                                <Typography variant="h5">
                                    Looking for specialists...
                                </Typography>
                            </Stack>
                        </Stack>
                }
                {
                    specialists.map(specialist => (
                        <Paper
                            key={specialist.uid}
                            onClick={() => navigate(`/case/${caseId}/chats/${specialist.uid}`, { state: { specialist } })}>
                            <Stack
                                direction="row"
                                p={1}
                                gap={2}
                                alignItems="center">
                                <Avatar src={specialist.photoURL || ""} />
                                <Stack
                                    width="100%"
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between">
                                    <Typography
                                        variant="body1">
                                        {specialist.displayName}
                                    </Typography>
                                    {
                                        Boolean(invoices?.[specialist.uid]?.length) &&
                                        <Typography>
                                            ${invoices?.[specialist.uid]?.reduce((acc, curr) => acc += curr.price, 0)}
                                        </Typography>
                                    }
                                </Stack>
                            </Stack>
                        </Paper>
                    ))
                }
            </Stack>
        </React.Fragment>
    )
}