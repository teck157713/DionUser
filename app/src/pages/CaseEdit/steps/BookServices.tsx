import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, List, ListItem, ListItemText } from "@mui/material";
import useCaseEditContext from "../context";
import { useTranslation } from "react-i18next";
import useCodeList from "../../../hooks/codelist.hook";
import { ExpandMore } from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import React, { useState } from "react";

export function BookServicesStep() {
    const { form, step, setStep } = useCaseEditContext();
    const codelist = useCodeList();
    const { t } = useTranslation();
    const [ expanded, setExpanded ] = useState<number>(-1);

    const onServiceSelected = (value: string) => {
        form?.setValue("service", value);
        setStep(step + 1);
    }

    return (
        <Box 
            mt={2}
            gap={2}>
            {
                codelist
                    .filter(val => val.type === "SERVICE_CATEGORY")
                    .map((service, i) => (
                        <Accordion
                            disableGutters
                            expanded={expanded === i}
                            onChange={() => setExpanded(expanded === i ? -1 : i)}>
                            <AccordionSummary
                                key={i}
                                expandIcon={<ExpandMore />}
                                aria-controls={`panel${i}-content`}
                                sx={{
                                    bgcolor: "bg"
                                }}>
                                { t(`SERVICE_CATEGORY.${service.value}`) }
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{
                                    cursor: "pointer"
                                }}>
                                <List disablePadding>
                                    {
                                        codelist
                                            .filter(val => val.type === service.value)
                                            .map((service, i, arr) => (
                                                <React.Fragment
                                                    key={i}>
                                                    <ListItem 
                                                        alignItems="flex-start"
                                                        onClick={() => onServiceSelected(service.value)}>
                                                        <ListItemText
                                                            primary={ t(`SERVICES.${service.value}`) }
                                                            secondary="30min - 2h"
                                                        />
                                                    </ListItem>
                                                    { i !== arr.length - 1 && <Divider /> }
                                                </React.Fragment>
                                            ))
                                    }
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    ))
            }
        </Box>
    )
}