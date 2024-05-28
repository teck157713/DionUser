import { Elements } from "@stripe/react-stripe-js";
import useStripe from "../../../hooks/stripe.hook"
import usePaymentContext from "../context";
import { CheckoutContainer } from "./CheckoutContainer";

export function CollectPaymentDetailsContainer() {
    const {
        stripe
    } = useStripe();

    const {
        clientSecret
    } = usePaymentContext();

    const options = {
        clientSecret,
        appearances: {}
    }

    return (
        <Elements stripe={stripe} options={options}>
            <CheckoutContainer />
        </Elements>
    )
}