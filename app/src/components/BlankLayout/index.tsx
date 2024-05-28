import { Box, CssBaseline } from "@mui/material"
import { Outlet } from "react-router-dom"

export function BlankLayout() {
    return (
        <Box
            sx={{
                minHeight: "100dvh"
            }}>
            <CssBaseline />
            <Outlet />
        </Box>
    )
}
