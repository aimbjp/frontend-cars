export interface IUser {
    email: string;
    name: string;
    username: string;
    surname?: string;
    password?: string;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface IRegister {
    email: string;
    name: string;
    username: string;
    surname?: string;
    password: string;
}

export interface IResetPassword {
    password: string;
    token: string;
}

export interface ILogout {
    refreshToken: string;
}

export interface IForgotPassword {
    email: string;
}

export interface IChangePassword {
    oldPassword: string;
    newPassword: string;
}

export interface IProfileForm {
    email?: string;
    name?: string;
    oldPassword?: string;
    username?: string;
    newPassword?: string;
}

