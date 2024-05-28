import { Box, Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export function NoDataContainer() {
    return (
        <Stack
            position="absolute"
            display="flex"
            top={0}
            bottom={0}
            left={0}
            right={0}
            justifyContent="center"
            alignContent="center">
            <Box>
                <Typography
                    variant="h5"
                    textAlign="center">
                    No case found
                </Typography>
                <Typography
                    variant="h6"
                    textAlign="center">
                    <Link
                        component={RouterLink}
                        to="/case">
                        Find Specialist Today
                    </Link>
                </Typography>
            </Box>
        </Stack>
    )
}