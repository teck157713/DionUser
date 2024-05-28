import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Divider, IconButton, InputAdornment, Link, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AppleIcon from "@mui/icons-material/Apple";
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import XIcon from '@mui/icons-material/X';
import useFirebase from "../../hooks/firebase.hook";
import { browserLocalPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

interface ISignInForm {
    email: string,
    password: string
}

export function SignInPage() {
    const navigate = useNavigate();
    const { auth } = useFirebase();
    const { register, handleSubmit, formState: { errors }, setError } = useForm<ISignInForm>();
    const [ showPassword, setShowPassword ] = useState<boolean>(false);

    const onSubmit = (data: ISignInForm) => {
        setPersistence(auth!, browserLocalPersistence)
            .then(() => {
                signInWithEmailAndPassword(auth!, data.email, data.password)
                    .then(() => navigate("/"))
                    .catch((error) => {
                        if (error.code === "auth/user-not-found") {
                            setError("email", {
                                type: "custom",
                                message: "Email not found"
                            })
                        }
                        else if (error.code === "auth/wrong-password") {
                            setError("password", {
                                type: "custom",
                                message: "Wrong Password"
                            })
                        }
                    });
            });
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
                        Sign In
                    </Typography>
                    
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        error={Boolean(errors.email)}
                        helperText={errors.email?.message}
                        {...register("email", { 
                            required: "Email is required" 
                        })}
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
                        Sign In
                    </Button>

                    <Stack 
                        direction="row"
                        justifyContent="space-between">
                        <Link href="/forget-password">
                            Forgot Password?
                        </Link>
                        <Link href="/sign-up">
                            Register Account
                        </Link>
                    </Stack>

                    <Stack spacing={0.5}>
                        <Divider>
                            or sign in with
                        </Divider>

                        <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="center">
                            <IconButton>
                                <GoogleIcon />
                            </IconButton>

                            <IconButton>
                                <AppleIcon />
                            </IconButton>

                            <IconButton>
                                <FacebookIcon />
                            </IconButton>

                            <IconButton>
                                <XIcon />
                            </IconButton>
                        </Stack>
                    </Stack>
                </Stack>
            </form>
        </Stack>
    )
}