import { CheckCircleOutline, Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, Link, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUserAPI } from "../../apis/users.api";

interface ISignUpForm {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export function SignUpPage() {
    const navigate = useNavigate();
    const userAPI = useUserAPI();
    const { register, handleSubmit, setError, formState: { errors } } = useForm<ISignUpForm>();
    const [ showPassword, setShowPassword ] = useState<boolean>(false);
    const [ registered, setRegistered ] = useState<boolean>(false);

    const onSubmit = (data: ISignUpForm) => {
        userAPI
            .add(
                data.firstName, 
                data.lastName,
                data.email,
                data.password,
            )
            .then(() => setRegistered(true))
            .catch((error) => {
                console.log(error)
                switch (error?.code) {
                    case "auth/invalid-email":
                        setError("email", {
                            message: error.message
                        });
                        break;
                    case "auth/email-already-exists":
                        setError("email", {
                            message: error.message
                        });
                        break;
                    case "auth/invalid-password":
                        setError("password", {
                            message: error.message
                        });
                        break;
                }
            });
    }

    return (
        <Stack
            height="100vh"
            justifyContent="center"
            alignItems="center">
            {
                !registered ?
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack 
                            minWidth={300}
                            p={4}
                            gap={2}>
                            <Typography textAlign="center" variant="h5">
                                Sign Up
                            </Typography>

                            <TextField
                                label="First Name"
                                variant="outlined"
                                fullWidth
                                error={Boolean(errors.firstName)}
                                helperText={errors.firstName?.message}
                                {
                                    ...register("firstName", { 
                                        required: "First Name is required" 
                                    })
                                }
                            />
                            
                            <TextField
                                label="Last Name"
                                variant="outlined"
                                fullWidth
                                error={Boolean(errors.lastName)}
                                helperText={errors.lastName?.message}
                                {
                                    ...register("lastName", { 
                                        required: "Last Name is required" 
                                    })
                                }
                            />

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

                            <TextField
                                autoComplete="username"
                                label="Password"
                                variant="outlined"
                                type={showPassword ? "text" : "password"}
                                fullWidth
                                error={Boolean(errors.password)}
                                helperText={errors.password?.message}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visiblity"
                                                onClick={() => setShowPassword(!showPassword)}>
                                                {
                                                    showPassword ?
                                                        <Visibility /> :
                                                        <VisibilityOff />
                                                }
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                {
                                    ...register("password", { 
                                        required: "Password is required"
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
                                Already registered?&nbsp;
                                <Link href="/sign-in">
                                    Sign In
                                </Link>
                            </Typography>
                        </Stack>
                    </form>
                    :
                    <Stack 
                        alignItems="center"
                        maxWidth={300}
                        p={4}
                        gap={2}>
                        <CheckCircleOutline 
                            color="success"
                            style={{
                                fontSize: 128
                            }}
                        />
                        
                        <Typography 
                            variant="h6"
                            textAlign="center">
                            Congratulations, your account has been successfully created.
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => navigate("/sign-in")}>
                            Continue
                        </Button>
                    </Stack>
            }
            
        </Stack>
    )
}