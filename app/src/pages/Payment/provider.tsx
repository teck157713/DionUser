import { useState } from "react";
import { PaymentContext } from "./context";

export function PaymentProvider({ children }: any) {
    const [ topOffset, setTopOffset ] = useState<number>(0);
    const [ clientSecret, setClientSecret ] = useState<string>("");

    return (
        <PaymentContext.Provider 
            value={{
                topOffset,
                setTopOffset,
                clientSecret,
                setClientSecret
            }}>
            { children }
        </PaymentContext.Provider>
    )
}