import { AddRounded } from "@mui/icons-material";
import { Box, Fab, Link, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaseResponse } from "../../models/case.model";
import { useCaseAPI } from "../../apis/cases.api";
import { Timestamp } from "firebase/firestore";
import { TopAppBar } from "../../components/TopAppBar";
import { CaseCard } from "./CaseCard";
import { MainTheme } from "../../main.theme";
import { NoDataContainer } from "./NoDataContainer";

export function CaseDashboardPage({
    page
}: {
    page: "PENDING" | "HISTORY"
}) {
    const navigate = useNavigate();
    const caseAPI = useCaseAPI();
    const [ loading, setLoading ] = useState<boolean>(false);
    const [caseDatas, setcaseDatas] = useState<CaseResponse[]>([]);
    const [topOffset, setTopOffset] = useState<number>(0);

    const title = (page: string) => {
        switch (page) {
            case "PENDING":
                return "Pending";
            case "HISTORY":
                return "History";
        }

        return "UNKNOWN";
    }

    useEffect(() => {
        setLoading(true);

        if (page === "PENDING") {
            caseAPI
                .getUserCreatedPending(20)
                .then(data => setcaseDatas(
                    data.map((val: any) => (
                        {
                            ...val,
                            from: new Timestamp(val.from.seconds, val.from.nanoseconds),
                            to: new Timestamp(val.to.seconds, val.to.nanoseconds),
                        })) || []
                ))
                .finally(() => setLoading(false));
        }
        else if (page === "HISTORY") {
            caseAPI
                .getUserCreatedHistory(20)
                .then(data => setcaseDatas(
                    data.map((val: any) => (
                        {
                            ...val,
                            from: new Timestamp(val.from.seconds, val.from.nanoseconds),
                            to: new Timestamp(val.to.seconds, val.to.nanoseconds),
                        })) || []
                ))
                .finally(() => setLoading(false));
        }
    }, [page]);

    return (
        <React.Fragment>
            <TopAppBar
                title={title(page)}
                setTopOffset={(offset) => setTopOffset(offset)}
            />

            {
                loading ?
                    <Typography>Loading</Typography>
                    :
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
                            !caseDatas.length &&
                                <NoDataContainer />
                        }
                        {
                            caseDatas.map((caseData) => (
                                <CaseCard
                                    key={caseData.id}
                                    caseData={caseData}
                                />
                            ))
                        }
                    </Stack>
            }
            
            <Fab
                className="page-last-child"
                onClick={() => navigate("/case")}
                sx={{
                    right: `calc((100dvw - ${MainTheme.breakpoints.values.md}px) / 2 + ${MainTheme.spacing(2)})`
                }}>
                <AddRounded />
            </Fab>
        </React.Fragment>
    )
}