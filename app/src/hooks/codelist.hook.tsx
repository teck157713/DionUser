import { useContext } from "react";
import { CodeListContext } from "../contexts/codelist.context";

export default function useCodeList() {
    return useContext(CodeListContext);
}
