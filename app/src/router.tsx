import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { SignInPage } from "./pages/SignIn";
import { SignUpPage } from "./pages/SignUp";
import { AuthRoute } from "./components/AuthRoute";
import { ForgetPasswordPage } from "./pages/ForgetPassword";
import { CaseDashboardPage } from "./pages/CaseDashboard";
import { CaseEditPage } from "./pages/CaseEdit";
import { CodeListProvider } from "./providers/codelist.provider";
import { BlankLayout } from "./components/BlankLayout";
import { ChatPage } from "./pages/Chat";
import { CaseChatDashboard } from "./pages/CaseChatDashboard";
import { ProfilePage } from "./pages/Profile";
import { PaymentPage } from "./pages/Payment";
import { AppUrlListener } from "./utils/AppUrlListener";

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <AuthRoute>
                <CodeListProvider>
                    <AppUrlListener />
                    <Layout />
                </CodeListProvider>
            </AuthRoute>
        ),
        children: [
            {
                path: "/",
                element: <CaseDashboardPage page="PENDING" />
            },
            {
                path: "/history",
                element: <CaseDashboardPage page="HISTORY" />
            },
            {
                path: "/profile",
                element: <ProfilePage />
            },
            {
                path: "/case",
                element: <CaseEditPage />
            },
            {
                path: "/case/:caseId/edit",
                element: <CaseEditPage />
            },
            {
                path: "/case/:caseId",
                element: <CaseChatDashboard />
            }
        ]
    },
    {
        path: "/",
        element: (
            <AuthRoute>
                <CodeListProvider>
                    <BlankLayout />
                </CodeListProvider>
            </AuthRoute>
        ),
        children: [
            {
                path: "/case/:caseId/chats/:specialistUID",
                element: <ChatPage />
            },
            {
                path: "/case/:caseId/chats/:specialistUID/payment",
                element: <PaymentPage />
            }
        ]
    },
    {
        path: "/sign-in",
        element: <SignInPage />
    },
    {
        path: "/sign-up",
        element: <SignUpPage />
    },
    {
        path: "/forget-password",
        element: <ForgetPasswordPage />
    }
]);