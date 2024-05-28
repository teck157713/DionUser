import { useEffect, useState } from "react";
import { ChatContext } from "./context";
import { useLocation, useParams } from "react-router-dom";
import { CaseResponse } from "../../models/case.model";
import { User } from "firebase/auth";

export function ChatProvider({ children }: any) {
    const location = useLocation();
    const { caseId } = useParams();
    const [ topOffset, setTopOffset ] = useState<number>(0);
    const [ bottomOffset, setBottomOffset ] = useState<number>(0);
    const [ caseData ] = useState<CaseResponse>(location.state?.caseData || null);
    const [ specialist ] = useState<User | null>(location.state?.caseData?.acceptedBy || location.state?.specialist || null);

    useEffect(() => {
        if (caseId && !location.state?.caseData) {
            // <TODO> Load case here
        }
    });

    return (
        <ChatContext.Provider 
            value={{
                topOffset,
                setTopOffset,
                bottomOffset,
                setBottomOffset,
                caseData,
                specialist
            }}>
            { children }
        </ChatContext.Provider>
    )
}