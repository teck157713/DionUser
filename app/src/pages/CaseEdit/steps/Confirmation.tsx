import { Stack, Typography } from "@mui/material";
import useCaseEditContext from "../context";
import { useTranslation } from "react-i18next";
import React from "react";

export function ConfirmationStep() {
    const { form } = useCaseEditContext();
    const { t } = useTranslation();

    return (
        <Stack 
            mt={2}
            mb={2}
            spacing={1}>
            <Typography
                variant="h6">
                Service
            </Typography>
            <Typography>
                {t(`SERVICES.${form?.watch("service") || ""}`)}
            </Typography>
            <Typography
                variant="h6">
                Timeslot
            </Typography>
            <Typography>
                {form?.watch("from")?.format("DD/MM/YYYY HH:mm:ss")} - {form?.watch("to")?.format("DD/MM/YYYY HH:mm:ss")}
            </Typography>
            <Typography
                variant="h6">
                Issue
            </Typography>
            <Typography>
                {form?.watch("issue")}
            </Typography>
            <Typography
                variant="h6">
                Address 1
            </Typography>
            <Typography>
                {form?.watch("address1")}
            </Typography>
            {
                form?.watch("address2") &&
                    <React.Fragment>
                        <Typography
                            variant="h6">
                            Address 2
                        </Typography>
                        <Typography>
                            {form?.watch("address2")}
                        </Typography>
                    </React.Fragment>
            }
            <Typography
                variant="h6">
                Postal Code
            </Typography>
            <Typography>
                {form?.watch("postalCode")}
            </Typography>
        </Stack>
    )
}