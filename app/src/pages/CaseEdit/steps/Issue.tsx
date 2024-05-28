import { Stack, TextField, Typography } from "@mui/material";
import useCaseEditContext from "../context";

export function IssueStep() {
    const maxLength = 1000;
    const { form } = useCaseEditContext();

    return (
        <Stack
            mt={2}
            mb={1}
            spacing={1}>
            <TextField
                multiline={true}
                minRows={10}
                InputProps={{
                    inputProps: {
                        max: maxLength
                    }
                }}
                {
                    ...form?.register("issue")
                }
            />
            <Typography
                variant="caption"
                textAlign="right">
                { form?.getValues("issue")?.length || 0 } / { maxLength } Characters
            </Typography>
        </Stack>
        
    )
}