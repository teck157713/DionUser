import { Button, Card, CardActions, CardContent, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CaseResponse } from "../../models/case.model";
import { PendingActionsRounded } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import React from "react";

export function CaseCard({
    caseData
}: {
    caseData: CaseResponse
}) {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <Card
            key={caseData.id}>
            <CardContent
                onClick={() => navigate(caseData.status === "PENDING" ? `/case/${caseData.id}` : `/case/${caseData.id}/chats/${caseData.acceptedBy?.uid}`, { state: { caseData } })}>
                <Stack
                    width="100%"
                    direction="row"
                    spacing={2}>
                    <PendingActionsRounded
                        sx={{
                            fontSize: 128
                        }}
                    />
                    <Stack
                        spacing={1}
                        width="100%">
                        <Typography
                            variant="body1">
                            {t(`SERVICES.${caseData.service}`)}
                        </Typography>
                        <Typography
                            variant="subtitle2">
                            {t(`STATUSES.${caseData.status}`)}
                        </Typography>
                    </Stack>
                    {
                        caseData.invoice &&
                        <Stack
                            alignItems="end">
                            <Typography
                                variant="h6">
                                ${caseData.invoice.reduce((acc, curr) => acc += curr.price, 0)}
                            </Typography>
                        </Stack>
                    }
                </Stack>
            </CardContent>
            <CardActions>
                <Stack
                    width="100%"
                    direction="row"
                    justifyContent="end">
                    {
                        caseData.status === "PENDING" &&
                        <React.Fragment>
                            <Button
                                onClick={() => navigate(`/case/${caseData.id}/edit`, { state: caseData })}>
                                Edit
                            </Button>
                        </React.Fragment>
                    }
                    {
                        caseData.status === "IN_PROGRESS" &&
                        <React.Fragment>
                            <Button>
                                Report
                            </Button>
                        </React.Fragment>
                    }
                    <Button>
                        Cancel
                    </Button>
                </Stack>
            </CardActions>
        </Card>
    )
}