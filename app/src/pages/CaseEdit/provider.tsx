import { useState } from "react";
import { CaseEditContext, ICaseEditForm } from "./context";
import { useForm } from "react-hook-form";

export function CaseEditProvider({ children }: any) {
    const [ step, setStep ] = useState<number>(0);

    const form = useForm<ICaseEditForm>({
        defaultValues: {
            service: "",
            from: null,
            to: null,
            issue: "",
            address1: "",
            address2: "",
            postalCode: ""
        }
    });

    const setForm = (value: ICaseEditForm) => {
        form.reset(value);
    }

    return (
        <CaseEditContext.Provider 
            value={{
                step,
                setStep,
                form,
                setForm
            }}>
            { children }
        </CaseEditContext.Provider>
    )
}