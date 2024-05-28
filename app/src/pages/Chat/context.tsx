import { createContext, useContext } from "react";
import { CaseResponse } from "../../models/case.model";
import { User } from "firebase/auth";

export interface IChat {
    topOffset: number,
    setTopOffset: (value: number) => void,
    bottomOffset: number,
    setBottomOffset: (value: number) => void,
    caseData: CaseResponse | null,
    specialist : User | null
}

const value: IChat = {
    topOffset: 0,
    setTopOffset: (_: number) => {},
    bottomOffset: 0,
    setBottomOffset: (_: number) => {},
    caseData: null,
    specialist : null
};

export const ChatContext = createContext(value);

export default function useChatContext() {
    return useContext(ChatContext);
}
