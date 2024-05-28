import { Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ServiceResponse } from "../../models/invoice.model";
import { InvoiceModal } from "../../components/InvoiceModal";
import { useInvoiceAPI } from "../../apis/invoices.api";
import { useNavigate, useParams } from "react-router-dom";
import useChatContext from "./context";

export function InvoiceContainer() {
    const navigate = useNavigate();
    const invoiceAPI = useInvoiceAPI();
    const { caseId, specialistUID } = useParams();
    const [ total, setTotal ] = useState<number>(0);
    const [ invoice, setInvoice ] = useState<ServiceResponse[]>();
    const [ openInvoice, setOpenInvoice ] = useState<boolean>(false);

    const {
        caseData
    } = useChatContext();

    const acceptCase = () => {
        navigate("payment");
    }

    useEffect(() => {
        invoiceAPI
            .getDraftInvoice(caseId!, specialistUID!)
            .then((data: ServiceResponse[]) => {
                setTotal(data.reduce((curr, acc) => curr + acc.price, 0) || 0);
                setInvoice(data);
            });
    }, [])

    return invoice?.length && total ?
        (
            <React.Fragment>
                <Typography
                    variant="h4"
                    mt={1}>
                    ${total.toFixed(2)}
                </Typography>
                <Stack 
                    mt={1}
                    direction="row"
                    justifyContent="space-between"
                    spacing={1}>
                    <Button
                        onClick={() => setOpenInvoice(true)}>
                        View Invoice
                    </Button>
                    {
                        caseData?.status === "PENDING" &&
                            <Button
                                variant="contained"
                                onClick={acceptCase}>
                                Accept
                            </Button>
                    }
                </Stack>
                <InvoiceModal
                    open={openInvoice}
                    setOpen={setOpenInvoice}
                    invoice={invoice}
                />
            </React.Fragment>
        )
        : 
        <React.Fragment />
}