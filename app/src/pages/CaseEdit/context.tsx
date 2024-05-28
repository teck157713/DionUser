import { Dayjs } from "dayjs";
import { createContext, useContext } from "react";
import { UseFormReturn } from "react-hook-form";

export interface ICaseEditForm {
    service: string,
    from: Dayjs | null,
    to: Dayjs | null,
    issue: string,
    address1: string,
    address2?: string,
    postalCode: string
}

interface ICaseEditContext {
    step: number,
    setStep: (value: number) => void,
    form?: UseFormReturn<ICaseEditForm>,
    setForm?: (value: ICaseEditForm) => void
}

const value: ICaseEditContext = {
    step: 0,
    setStep: () => {},
};

export const CaseEditContext = createContext(value);

export default function useCaseEditContext() {
    return useContext(CaseEditContext);
}
