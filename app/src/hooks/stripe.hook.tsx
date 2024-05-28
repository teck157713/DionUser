import { useContext } from "react";
import { StripeContext } from "../contexts/stripe.context";

export default function useStripe() {
    return useContext(StripeContext);
}
