import { MessageContainer } from "./MessageContainer";
import { ChatProvider } from "./provider";
import { TopBar } from "./TopBar";

export function ChatPage() {
    return (
        <ChatProvider>
            <TopBar />
            <MessageContainer />
        </ChatProvider>
    )
}