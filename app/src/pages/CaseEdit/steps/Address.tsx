import { Stack, TextField } from "@mui/material";
import useCaseEditContext from "../context"

export function AddressStep() {
    const { form } = useCaseEditContext();

    return (
        <Stack
            mt={2}
            mb={2}
            spacing={2}>
            <TextField
                label="Address 1"
                {
                    ...form?.register("address1")
                }
            />
            <TextField
                label="Address 2 (Optional)"
                {
                    ...form?.register("address2")
                }
            />
            <TextField
                type="number"
                label="Postal Code"
                InputProps={{
                    endAdornment: null
                }}
                {
                    ...form?.register("postalCode")
                }
            />
        </Stack>
    )
}