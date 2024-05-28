import { Button, Paper, Stack, Typography } from "@mui/material";
import { InvoiceTable } from "../../components/InvoiceTable";
import { useParams } from "react-router-dom";
import { useInvoiceAPI } from "../../apis/invoices.api";
import { useEffect, useState } from "react";
import { ServiceResponse } from "../../models/invoice.model";
import usePaymentContext from "./context";
import { usePaymentAPI } from "../../apis/payments.api";

export function InvoiceContainer() {
    const { caseId, specialistUID } = useParams();
    const invoiceAPI = useInvoiceAPI();
    const paymentAPI = usePaymentAPI();
    const [ invoice, setInvoice ] = useState<ServiceResponse[]>();
    const total = invoice?.reduce((acc, curr) => acc += curr.price, 0) || 0;

    const {
        topOffset,
        setClientSecret
    } = usePaymentContext();

    const createPaymentIntent = () => {
        paymentAPI
            .createPaymentIntent(caseId!, specialistUID!)
            .then((data) => setClientSecret(data.clientSecret))
            .catch(() => setClientSecret(""));
    }

    useEffect(() => {
        invoiceAPI
            .getDraftInvoice(caseId!, specialistUID!)
            .then((data: ServiceResponse[]) => setInvoice(data));
    }, []);

    return (
        <Stack
            width="100%"
            p={2}
            position="absolute"
            top={topOffset}
            alignItems="center"
            spacing={2}>
            <Paper
                sx={{
                    width: "100%"
                }}>
                <Stack
                    p={1}
                    spacing={1}>
                    <Stack>
                        <Typography>
                            Invoice from Contractor
                        </Typography>
                        <Typography
                            variant="h6">
                            ${total.toFixed(2)}
                        </Typography>
                    </Stack>
                    
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={createPaymentIntent}>
                        Pay this invoice
                    </Button>
                </Stack>
            </Paper>
            <Paper
                sx={{
                    width: "100%"
                }}>
                <InvoiceTable
                    invoice={invoice || []}
                />
            </Paper>
        </Stack>
    )
}