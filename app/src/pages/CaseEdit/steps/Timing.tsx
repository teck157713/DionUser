import { Button, Stack } from "@mui/material";
import { DateTimePicker, DateTimeValidationError } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import useCaseEditContext from "../context";

export function TimingStep() {
    const { form, step, setStep } = useCaseEditContext();

    return (
        <Stack 
            spacing={2}
            mt={2}>            
            <DateTimePicker 
                label="From"
                value={form?.getValues("from")}
                onAccept={(value: Dayjs | null) => form?.setValue("from", value)}
                onError={(error: DateTimeValidationError) => error ? form?.setError("from", { type: error || "", message: "Error" }) : form?.clearErrors("from")}
                minDateTime={dayjs().set("minute", 0).set("second", 0).set("millisecond", 0)}
                maxDate={dayjs().add(3, "month")}
                minutesStep={60}
                views={["month", "day", "hours"]}
                format="DD/MM/YYYY h:mm A"
            />

            <DateTimePicker 
                label="To"
                value={form?.getValues("to")}
                onAccept={(value: Dayjs | null) => form?.setValue("to", value)}
                onError={(error: DateTimeValidationError) => error ? form?.setError("to", { type: error || "", message: "Error" }) : form?.clearErrors("to")}
                minDateTime={form?.watch("from")?.add(2, "hour")}
                maxDate={dayjs().add(3, "month")}
                minutesStep={60}
                views={["month", "day", "hours"]}
                format="DD/MM/YYYY h:mm A"
            />
            {
                <Stack
                    direction="row"
                    justifyContent="space-between">
                    <Button 
                        onClick={() => setStep(step - 1)}>
                        Back
                    </Button>
                    <Button
                        onClick={() => setStep(step + 1)}
                        disabled={!form?.watch("from") || !form?.watch("to") || form?.getFieldState("from").invalid || form?.getFieldState("to").invalid}>
                        Next
                    </Button>
                </Stack>
            }
        </Stack>
    )
}