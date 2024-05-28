import { Avatar } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import useChatContext from "./context";
import { TopBarMenu } from "./TopBarMenu";
import { TopAppBar } from "../../components/TopAppBar";

export function TopBar() {
    const { caseId } = useParams();
    const navigate = useNavigate();

    const {
        setTopOffset,
        caseData,
        specialist
    } = useChatContext();

    return (
        <TopAppBar
            title={specialist?.displayName || ""}
            startAdornment={(
                <Avatar 
                    src={specialist?.photoURL || ""}
                />
            )}
            endAdornment={(
                <TopBarMenu />
            )}
            setTopOffset={(offset) => setTopOffset(offset)}
            onBack={() => navigate(caseData?.status === "PENDING" || !caseData ? `/case/${caseId}` : "/")}
        />
    )
}