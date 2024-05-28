import usePaymentContext from "./context";
import { InvoiceContainer } from "./InvoiceContainer";
import { CollectPaymentDetailsContainer } from "./CollectPaymentDetailsContainer";
import { useSearchParams } from "react-router-dom";
import { CompletePaymentContainer } from "./CompletePaymentContainer";

export function PaymentContainer() {
    const {
        clientSecret
    } = usePaymentContext();

    const [ searchParams ] = useSearchParams();

    return (
        clientSecret ?
            <CollectPaymentDetailsContainer />
            :
            (
                searchParams.get("redirect_status") ?
                    <CompletePaymentContainer />
                    :
                    <InvoiceContainer />
            )
    )
}