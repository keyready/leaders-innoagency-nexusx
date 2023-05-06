export interface LoginProps {
    email: string;
    password: string;
    phoneNumber: string;
}

export interface LoginPageSchema {
    data?: LoginProps;
    isLoading: boolean;
    error?: string
}
