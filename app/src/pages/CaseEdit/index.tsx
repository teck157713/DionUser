
import { Main } from "./main";
import { CaseEditProvider } from "./provider";

export function CaseEditPage() {
    return (
        <CaseEditProvider>
            <Main />
        </CaseEditProvider>
    )
}