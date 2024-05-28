import { Stripe } from "@stripe/stripe-js";
import { createContext } from "react";

interface IStripeContext {
    stripe: Stripe | null
}

const value: IStripeContext = {
    stripe: null
};

export const StripeContext = createContext(value);