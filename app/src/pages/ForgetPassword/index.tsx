import { Button, Link, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

interface IForgetPasswordForm {
    email: string
}

export function ForgetPasswordPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<IForgetPasswordForm>();

    const onSubmit = (data: IForgetPasswordForm) => {
        console.log(data);
    }

    return (
        <Stack
            height="100vh"
            justifyContent="center"
            alignItems="center">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack 
                    minWidth={300}
                    p={4}
                    gap={2}>
                    <Typography textAlign="center" variant="h5">
                        Forgot Password?
                    </Typography>

                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        error={Boolean(errors.email)}
                        helperText={errors.email?.message}
                        {
                            ...register("email", { 
                                required: "Email is required" 
                            })
                        }
                    />

                    <Button 
                        onClick={handleSubmit(onSubmit)}
                        variant="contained"
                        type="submit">
                        Create Account
                    </Button>

                    <Typography textAlign="center">
                        <Link href="/sign-in">
                            Back to Sign In
                        </Link>
                    </Typography>
                    
                </Stack>
            </form>
        </Stack>
    )
}