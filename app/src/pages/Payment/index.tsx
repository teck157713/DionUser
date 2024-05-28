import { TopBar } from "./TopBar";
import { PaymentProvider } from "./provider";
import { PaymentContainer } from "./PaymentContainer";

export function PaymentPage() {
    return (
        <PaymentProvider>
            <TopBar />
            <PaymentContainer />
        </PaymentProvider>
    )
}