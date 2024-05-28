import { ArrowBackIos } from "@mui/icons-material"
import { AppBar, Divider, IconButton, Stack, Toolbar, Typography } from "@mui/material"

export function TopAppBar({
    title,
    startAdornment,
    endAdornment,
    setTopOffset,
    onBack
}: {
    title: string,
    startAdornment?: any,
    endAdornment?: any,
    setTopOffset?: (offset: number) => void,
    onBack?: () => void
}) {
    return (
        <AppBar
            ref={(ref) => setTopOffset?.(ref?.clientHeight || 0)}
            position="fixed"
            sx={{
                maxWidth: "md",
                left: "50%",
                transform: "translate(-50%, 0)",
                bgcolor: "bg"
            }}>
            <Toolbar 
                disableGutters>
                <Stack
                    width="100%"
                    direction="row"
                    alignItems="center"
                    justifyContent={endAdornment ? "space-between" : "start"}>
                    {
                        onBack &&
                            <IconButton
                                onClick={onBack}>
                                <ArrowBackIos />
                            </IconButton>
                    }
                    
                    <Stack
                        width="100%"
                        direction="row"
                        alignItems="center"
                        spacing={1}>
                        {
                            startAdornment
                        }

                        <Typography
                            variant="h6">
                            { title }
                        </Typography>
                    </Stack>

                    {
                        endAdornment
                    }
                </Stack>             
            </Toolbar>
            <Divider />
        </AppBar>
    )
}