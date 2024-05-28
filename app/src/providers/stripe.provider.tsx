
import { useEffect, useState } from "react";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import { StripeContext } from "../contexts/stripe.context";

export function StripeProvider({ children }: any) {
    const [ stripe, setStripe ] = useState<Stripe | null>(null);

    useEffect(() => {
        loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
            .then(setStripe)
    }, []);

    return (
        <StripeContext.Provider value={{
            stripe
        }}>
            { children }
        </StripeContext.Provider>
    );
}