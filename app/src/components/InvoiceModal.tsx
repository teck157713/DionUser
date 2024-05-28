import { Box, Modal } from "@mui/material";
import { ServiceResponse } from "../models/invoice.model";
import { InvoiceTable } from "./InvoiceTable";
import React from "react";

export function InvoiceModal({
    open,
    setOpen,
    invoice
}: {
    open: boolean,
    setOpen: (value: boolean) => void,
    invoice?: ServiceResponse[]
}) {
    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}>
            <React.Fragment>
                <Box 
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "bg",
                        borderRadius: 2,
                        maxWidth: "90%"
                    }}>
                    <InvoiceTable 
                        invoice={invoice || []}
                    />
                </Box>
            </React.Fragment>
        </Modal>
    )
}