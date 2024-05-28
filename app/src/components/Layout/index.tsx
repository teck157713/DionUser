import { BottomNavigation, BottomNavigationAction, Box, Container, CssBaseline, Paper } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AccountCircle, History, PendingActions } from "@mui/icons-material";
import { useRef } from "react";

const tabs = [
    {
        path: "/",
        label: "Pending",
        icon: <PendingActions />
    },
    {
        path: "/history",
        label: "History",
        icon: <History />
    },
    {
        path: "/profile",
        label: "My Profile",
        icon: <AccountCircle />
    }
]

export function Layout() {
    const location = useLocation();
    const navigate = useNavigate();
    const ref = useRef<HTMLDivElement>(null);

    return (
        <Container
            disableGutters
            maxWidth="md">
            <Box
                sx={{
                    minHeight: "100dvh"
                }}>
                <CssBaseline />
                <Outlet />
            </Box>
            <Paper 
                sx={{
                    position: "fixed",
                    width: "100%",
                    maxWidth: "md",
                    bottom: 0
                }}>
                <BottomNavigation
                    ref={ref}
                    showLabels
                    value={tabs.findIndex(tab => tab.path.toLowerCase() === location.pathname.toLowerCase())}>
                    {
                        tabs.map(tab => (
                            <BottomNavigationAction 
                                key={tab.path}
                                label={tab.label} 
                                icon={tab.icon}
                                onClick={() => navigate(tab.path)}
                            />
                        ))
                    }
                </BottomNavigation>
            </Paper>
        </Container>
    )
}