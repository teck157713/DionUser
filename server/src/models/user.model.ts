export interface RegisterRequest {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export interface SignInRequest {
    email: string,
    password: string
}
