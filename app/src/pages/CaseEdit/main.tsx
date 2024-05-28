import { Button, CircularProgress, Modal, Stack, Typography } from "@mui/material"
import useCaseEditContext, { ICaseEditForm } from "./context";
import { BookServicesStep } from "./steps/BookServices";
import { IssueStep } from "./steps/Issue";
import { AddressStep } from "./steps/Address";
import { TimingStep } from "./steps/Timing";
import { useBlocker, useLocation, useNavigate, useParams } from "react-router-dom";
import { useCaseAPI } from "../../apis/cases.api";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Error } from "@mui/icons-material";
import { ConfirmationStep } from "./steps/Confirmation";
import { CaseResponse } from "../../models/case.model";
import dayjs from "dayjs";

const steps: {
    label: string,
    component: any,
    watched: (keyof ICaseEditForm)[],
    showPrevious: boolean,
    showNext: boolean
} [] = [
    {
        label: "Book Services",
        component: <BookServicesStep />,
        watched: [
            "service"
        ],
        showPrevious: false,
        showNext: false
    },
    {
        label: "Select Timing",
        component: <TimingStep />,
        watched: [
            "from",
            "to"
        ],
        showPrevious: false,
        showNext: false
    },
    {
        label: "Issue",
        component: <IssueStep />,
        watched: [
            "issue"
        ],
        showPrevious: true,
        showNext: true
    },
    {
        label: "Address Information",
        component: <AddressStep />,
        watched: [
            "address1",
            "postalCode"
        ],
        showPrevious: true,
        showNext: true
    },
    {
        label: "Confirmation",
        component: <ConfirmationStep />,
        watched: [],
        showPrevious: true,
        showNext: true
    }
]

export function Main() {
    const { caseId } = useParams();
    const { state } = useLocation();
    const caseAPI = useCaseAPI();
    const navigate = useNavigate();
    const [ redirect, setRedirect ] = useState<string>("");

    const { 
        step, 
        setStep,
        form,
        setForm
    } = useCaseEditContext();

    useEffect(() => {
        if (caseId) {
            if (state) {
                const caseModel = state as CaseResponse;

                setForm?.({
                    serviceCategory: caseModel.serviceCategory,
                    service: caseModel.service,
                    from: dayjs(caseModel.from.toDate()),
                    to: dayjs(caseModel.to.toDate()),
                    address1: caseModel.address1,
                    address2: caseModel.address2,
                    postalCode: caseModel.postalCode,
                    issue: caseModel.issue
                })
            }
            else {
                // <TODO> Load case if no existing state of case found
            }
        }
    }, []);

    const blocker = useBlocker(
        ({ currentLocation, nextLocation }) =>
            currentLocation.pathname !== nextLocation.pathname &&
            !redirect
    );

    const disableNext = steps[step].watched.some(key => !form?.watch(key));

    const onSubmit = (data: ICaseEditForm) => {
        if (!caseId) {
            caseAPI
                .add(
                    data.serviceCategory,
                    data.service,
                    Timestamp.fromDate(data.from?.toDate()!),
                    Timestamp.fromDate(data.to?.toDate()!),
                    data.issue,
                    data.postalCode,
                    data.address1,
                    data.address2
                )
                .then((data: any) => {
                    console.log(data);
                    setRedirect("/");
                })
        }
    }

    if (redirect) {
        navigate(redirect);
    }

    return (
        <form onSubmit={form?.handleSubmit(onSubmit)}>
            <Stack
                className="page-root"
                p={2}>
                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center">
                    <Stack 
                        position="relative">
                        <CircularProgress
                            size="64px"
                            variant="determinate"
                            thickness={4}
                            value={((step + 1) / steps.length) * 100}
                            sx={{
                                position: "relative",
                                zIndex: 1
                            }}
                        />
                        <CircularProgress 
                            size="64px"
                            variant="determinate"
                            thickness={4}
                            value={100}
                            sx={{
                                zIndex: 0,
                                position: "absolute",
                                left: 0,
                                color: (theme) => theme.palette.grey[theme.palette.mode === 'light' ? 300 : 800],
                            }}
                        />
                        
                        <Typography
                            color="text.secondary"
                            sx={{
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: 'absolute',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            {step + 1} of {steps.length}
                        </Typography>
                    </Stack>
                    <Stack>
                        <Typography 
                            variant="h5">
                            {steps[step].label}
                        </Typography>
                        {
                            step + 1 < steps.length &&
                            <Typography 
                                variant="caption">
                                Next: {steps[step + 1].label}
                            </Typography>
                        }
                        
                    </Stack>
                </Stack>
                {
                    steps[step].component
                }
                <Stack 
                    direction="row"
                    justifyContent={step ? "space-between" : "end"}>
                    {
                        Boolean(step) && steps[step].showPrevious &&
                            <Button
                                onClick={() => setStep?.(step - 1)}>
                                Back
                            </Button>
                    }
                    {
                        step + 1 < steps.length && steps[step].showNext &&
                            <Button
                                onClick={() => setStep?.(step + 1)}
                                disabled={disableNext}>
                                Next
                            </Button>
                    }
                    {
                        step + 1 >= steps.length && steps[step].showNext &&
                            <Button
                                type="submit"
                                disabled={disableNext}>
                                Confirm
                            </Button>
                    }
                </Stack>
            </Stack>

            <Modal
                open={blocker.state === "blocked"}
                onClose={blocker.reset}>
                <Stack 
                    position="absolute"
                    left="50%"
                    top="50%"
                    bgcolor="bg"
                    p={2}
                    spacing={1}
                    sx={{
                        transform: "translate(-50%, -50%)",
                        borderRadius: "16px",
                        minWidth: "300px"
                    }}>
                    <Error 
                        color="error"
                        sx={{
                            margin: "auto!important",
                            fontSize: "64px"
                        }}
                    />
                    <Typography 
                        variant="h6"
                        textAlign="center">
                        Exit without saving?
                    </Typography>
                    <Stack
                        direction="row"
                        spacing={1}>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={blocker.reset}>
                            No
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            color="error"
                            onClick={blocker.proceed}>
                            Yes
                        </Button>
                    </Stack>
                </Stack>
            </Modal>
        </form>
    )
}