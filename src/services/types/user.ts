import {
    REGISTER,
    REGISTER_FAILED,
    REGISTER_SUCCESS,
    CHECK_USER_AUTH,
    CHECK_USER_AUTH_FAILED,
    CHECK_USER_AUTH_SUCCESS,
    LOGOUT,
    LOGOUT_FAILED,
    LOGOUT_SUCCESS,
    AUTHORIZATION,
    AUTHORIZATION_FAILED,
    AUTHORIZATION_SUCCESS,
    GET_USER_INFO,
    GET_USER_INFO_FAILED,
    GET_USER_INFO_SUCCESS,
    UPDATE_USER_INFO,
    UPDATE_USER_INFO_SUCCESS,
    UPDATE_USER_INFO_FAILED,
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
    CHECK_EMAIL_EXIST,
    CHECK_EMAIL_EXIST_SUCCESS,
    CHECK_EMAIL_EXIST_FAILED,
    CHANGE_FORGOT_PASSWORD_EMAIL,
    REMIND_PASSWORD, CHANGE_PASSWORD, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILED, CHANGE_PASSWORD_RELOAD
} from "../action-types/user";


export interface ICheckUserAuthAction {
    readonly type: typeof CHECK_USER_AUTH;
}
export interface ICheckUserAuthSuccessAction {
    readonly type: typeof CHECK_USER_AUTH_SUCCESS;
}
export interface ICheckUserAuthFailedAction {
    readonly type: typeof CHECK_USER_AUTH_FAILED;
}

export interface ILogoutAction {
    readonly type: typeof LOGOUT;
}
export interface ILogoutSuccessAction {
    readonly type: typeof LOGOUT_SUCCESS;
}
export interface ILogoutFailedAction {
    readonly type: typeof LOGOUT_FAILED;
}

export interface IRegisterAction {
    readonly type: typeof REGISTER;
}
export interface IRegisterSuccessAction {
    readonly type: typeof REGISTER_SUCCESS;
    email: string;
    name: string;
    userId?: string;
    username: string;
}
export interface IRegisterFailedAction {
    readonly type: typeof REGISTER_FAILED;
}

export interface IAuthorizationAction {
    readonly type: typeof AUTHORIZATION;
}
export interface IAuthorizationSuccessAction {
    readonly type: typeof AUTHORIZATION_SUCCESS;
    email: string;
    name: string;
    userId?: string;
    username: string;
}
export interface IAuthorizationFailedAction {
    readonly type: typeof AUTHORIZATION_FAILED;
}

export interface IResetPasswordAction {
    readonly type: typeof RESET_PASSWORD;
}
export interface IResetPasswordSuccessAction {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
}
export interface IResetPasswordFailedAction {
    readonly type: typeof RESET_PASSWORD_FAILED;
}

export interface ICheckEmailExistAction {
    readonly type: typeof CHECK_EMAIL_EXIST;
}
export interface ICheckEmailExistSuccessAction {
    readonly type: typeof CHECK_EMAIL_EXIST_SUCCESS;
}
export interface ICheckEmailExistFailedAction {
    readonly type: typeof CHECK_EMAIL_EXIST_FAILED;
}

export interface IGetUserInfoAction {
    readonly type: typeof GET_USER_INFO;
}
export interface IGetUserInfoSuccessAction {
    readonly type: typeof GET_USER_INFO_SUCCESS;
    email: string;
    name: string;
    username: string;
    userId?: string;
}
export interface IGetUserInfoFailedAction {
    readonly type: typeof GET_USER_INFO_FAILED;
}

export interface IUpdateUserInfoAction {
    readonly type: typeof UPDATE_USER_INFO;
}
export interface IUpdateUserInfoSuccessAction {
    readonly type: typeof UPDATE_USER_INFO_SUCCESS;
    email: string;
    name: string;
    userId?: string;
    username: string;
}
export interface IUpdateUserInfoFailedAction {
    readonly type: typeof UPDATE_USER_INFO_FAILED;
}

export interface IChangeForgotPasswordEmailAction {
    readonly type: typeof CHANGE_FORGOT_PASSWORD_EMAIL;
}

export interface IRemindPasswordAction {
    readonly type: typeof REMIND_PASSWORD;
}

export interface IChangePasswordAction {
    readonly type: typeof CHANGE_PASSWORD;
}

export interface IChangePasswordSuccessAction {
    readonly type: typeof CHANGE_PASSWORD_SUCCESS;
}

export interface IChangePasswordFailedAction {
    readonly type: typeof CHANGE_PASSWORD_FAILED;
}

export interface IChangePasswordReloadAction {
    readonly type: typeof CHANGE_PASSWORD_RELOAD;
}

export type TActionUserType =
    | ICheckUserAuthAction
    | ICheckUserAuthSuccessAction
    | ICheckUserAuthFailedAction
    | ILogoutAction
    | ILogoutSuccessAction
    | ILogoutFailedAction
    | IRegisterAction
    | IRegisterSuccessAction
    | IRegisterFailedAction
    | IAuthorizationAction
    | IAuthorizationSuccessAction
    | IAuthorizationFailedAction
    | IResetPasswordAction
    | IResetPasswordSuccessAction
    | IResetPasswordFailedAction
    | ICheckEmailExistAction
    | ICheckEmailExistSuccessAction
    | ICheckEmailExistFailedAction
    | IGetUserInfoAction
    | IGetUserInfoSuccessAction
    | IGetUserInfoFailedAction
    | IUpdateUserInfoAction
    | IUpdateUserInfoSuccessAction
    | IUpdateUserInfoFailedAction
    | IChangeForgotPasswordEmailAction
    | IRemindPasswordAction
    | IChangePasswordAction
    | IChangePasswordFailedAction
    | IChangePasswordSuccessAction
    | IChangePasswordReloadAction;

