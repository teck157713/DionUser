import { createContext, useContext } from "react";

export interface IPayment {
    topOffset: number,
    setTopOffset: (value: number) => void,
    clientSecret: string,
    setClientSecret: (value: string) => void
}

const value: IPayment = {
    topOffset: 0,
    setTopOffset: (_: number) => {},
    clientSecret: "",
    setClientSecret: (_: string) => {}
};

export const PaymentContext = createContext(value);

export default function usePaymentContext() {
    return useContext(PaymentContext);
}
