import { useEffect, useState } from "react";
import { CodeListContext } from "../contexts/codelist.context";
import { CodeListValue } from "../models/codelist.model";
import { useCodeListAPI } from "../apis/codelist.api";

export function CodeListProvider({ children }: any) {
    const codelistAPI = useCodeListAPI();
    const [ codelist, setCodelist ] = useState<CodeListValue[]>([]);

    useEffect(() => {
        codelistAPI
            .getCodeList()
            .then(data => setCodelist(data));
    }, []);

    return (
        <CodeListContext.Provider value={codelist}>
            { Boolean(codelist?.length) && children }
        </CodeListContext.Provider>
    );
}