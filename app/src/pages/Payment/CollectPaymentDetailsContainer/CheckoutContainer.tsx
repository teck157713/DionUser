import { PaymentElement, useElements } from "@stripe/react-stripe-js";
import useStripe from "../../../hooks/stripe.hook"
import usePaymentContext from "../context";
import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import {} from "@capacitor/core"
import { useParams } from "react-router-dom";

export function CheckoutContainer() {
    const elements = useElements();

    const {
        caseId,
        specialistUID
    } = useParams();

    const {
        stripe
    } = useStripe();

    const {
        topOffset
    } = usePaymentContext();

    const [ error, setError ] = useState<string>("");
    const returnUrl = `${import.meta.env.VITE_APP_URL}/case/${caseId}/chats/${specialistUID}/payment`;

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        if (stripe && elements) {
            const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: returnUrl
                }
            });

            if (error) {
                setError(error.message || "");
            }
        }
    }

    return (
        <form>
            <Stack
                width="100%"
                p={2}
                position="absolute"
                top={topOffset}
                alignItems="center"
                spacing={2}>
                <PaymentElement />
                <Button
                    fullWidth
                    variant="contained"
                    disabled={!stripe || !elements}
                    onClick={handleSubmit}>
                    Submit
                </Button>
                {
                    error &&
                    <Typography color="error">
                        {error}
                    </Typography>
                }
            </Stack>
        </form>
    )
}