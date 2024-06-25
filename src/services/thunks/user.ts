// import {
//     fetchChangePassword,
//     fetchForgotPassword,
//     fetchGetUserInfo,
//     fetchLogin,
//     fetchLogout,
//     fetchRegister,
//     fetchResetPassword,
//     fetchUpdateUserInfo
// } from "../api/user";
// import {
//     AUTHORIZATION,
//     AUTHORIZATION_FAILED,
//     AUTHORIZATION_SUCCESS,
//     CHANGE_FORGOT_PASSWORD_EMAIL, CHANGE_PASSWORD, CHANGE_PASSWORD_FAILED, CHANGE_PASSWORD_SUCCESS,
//     CHECK_EMAIL_EXIST,
//     CHECK_EMAIL_EXIST_FAILED,
//     CHECK_EMAIL_EXIST_SUCCESS,
//     CHECK_USER_AUTH,
//     CHECK_USER_AUTH_FAILED,
//     CHECK_USER_AUTH_SUCCESS,
//     GET_USER_INFO,
//     GET_USER_INFO_FAILED,
//     GET_USER_INFO_SUCCESS,
//     LOGOUT,
//     LOGOUT_FAILED,
//     LOGOUT_SUCCESS,
//     REGISTER,
//     REGISTER_FAILED,
//     REGISTER_SUCCESS, REMIND_PASSWORD,
//     RESET_PASSWORD,
//     RESET_PASSWORD_FAILED,
//     RESET_PASSWORD_SUCCESS,
//     UPDATE_USER_INFO,
//     UPDATE_USER_INFO_FAILED,
//     UPDATE_USER_INFO_SUCCESS
// } from "../action-types/user";
//
// export function register (payload) {
//     return function (dispatch) {
//         dispatch({
//             type: REGISTER,
//         });
//         fetchRegister(payload)
//             .then(res => {
//                 if ( res.success) {
//                     dispatch({
//                         type: REGISTER_SUCCESS,
//                         email: res.user.email,
//                         name: res.user.name,
//                         username: res.user.username
//                     });
//
//                     localStorage.setItem("refreshToken", res.refreshToken);
//                     localStorage.setItem("accessToken", res.accessToken);
//                 }
//                 else {
//                     dispatch({type: REGISTER_FAILED})
//                 }
//             })
//             .catch(error => {
//                 console.error('Ошибка при регистрации: ', error)
//                 dispatch({type: REGISTER_FAILED})
//             })
//     }
// }
//
// export function login (payload) {
//     return function (dispatch) {
//         dispatch({type: AUTHORIZATION});
//         fetchLogin(payload)
//             .then(res => {
//                 if ( res.success){
//                     dispatch({
//                         type: AUTHORIZATION_SUCCESS,
//                         email: res.user.email,
//                         name: res.user.name,
//                         username: res.user.username
//                     });
//
//                     localStorage.setItem("refreshToken", res.refreshToken);
//                     localStorage.setItem("accessToken", res.accessToken);
//                 }
//                 else {
//                     dispatch({type: AUTHORIZATION_FAILED})
//                 }
//             })
//             .catch(error => {
//                 dispatch({type: AUTHORIZATION_FAILED})
//                 console.error('Ошибка при авторизации: ', error);
//             })
//     }
// }
//
// export function logout(payload) {
//     return (dispatch) => {
//         dispatch({type: LOGOUT});
//         fetchLogout(payload)
//             .then(res => {
//                 if ( res.success) {
//                     dispatch({type: LOGOUT_SUCCESS});
//                     localStorage.removeItem("refreshToken");
//                     localStorage.removeItem("accessToken");
//
//                 }
//                 else {
//                     dispatch({type: LOGOUT_FAILED});
//                 }
//             })
//             .catch(error => {
//                 console.error('Ошибка при авторизации: ', error);
//             })
//     }
// }
//
// export function getUserInfo () {
//     return async (dispatch) => {
//         dispatch({type: GET_USER_INFO});
//
//         try {
//             const res = await fetchGetUserInfo();
//             if ( res.success) {
//                 dispatch({
//                     type: GET_USER_INFO_SUCCESS,
//                     email: res.user.email,
//                     name: res.user.name,
//                     username: res.user.username
//                 });
//             } else {
//                 dispatch({type: GET_USER_INFO_FAILED});
//                 console.log("User info failed");
//             }
//         } catch (error) {
//             dispatch({type: GET_USER_INFO_FAILED});
//             throw error;
//         }
//     }
// }
//
// export function updateUserInfo (payload) {
//     return (dispatch) => {
//         dispatch({type: UPDATE_USER_INFO});
//
//         fetchUpdateUserInfo(payload)
//             .then(res => {
//                 if ( res.success) {
//                     dispatch({
//                         type: UPDATE_USER_INFO_SUCCESS,
//                         email: res.user.email,
//                         name: res.user.name,
//                         username: res.user.username
//                     })
//                 }
//                 else{
//                     dispatch({type: UPDATE_USER_INFO_FAILED});
//                 }
//             })
//     }
// }
//
//
// export const checkUserAuth = () => {
//     return (dispatch) => {
//         dispatch({type: CHECK_USER_AUTH});
//
//         if (localStorage.getItem('accessToken')){
//             dispatch(getUserInfo())
//                 .catch(() => {
//                     localStorage.removeItem("refreshToken");
//                     localStorage.removeItem("accessToken");
//                     dispatch({type: CHECK_USER_AUTH_FAILED});
//                 })
//                 .finally(() => {dispatch({type: CHECK_USER_AUTH_SUCCESS});});
//         } else {
//             dispatch({type: CHECK_USER_AUTH_SUCCESS});
//         }
//     }
// }
//
// export const resetPassword = (payload, setErrorToken, setFlag) => async (dispatch) => {
//     try {
//         dispatch({type: RESET_PASSWORD})
//
//         const res = await fetchResetPassword(payload);
//         if ( res.success) {
//             dispatch({type: RESET_PASSWORD_SUCCESS});
//         } else {
//             console.error('error: ', res.message);
//             setErrorToken('Неверный код подтверждения');
//             setFlag(true);
//             dispatch({type: RESET_PASSWORD_FAILED});
//         }
//     } catch (e) {
//         console.error('error: ', e.message);
//         setErrorToken('Неверный код подтверждения');
//         setFlag(true);
//         dispatch({type: RESET_PASSWORD_FAILED});
//     }
// };
//
// export const checkEmailExist = (email) => {
//     return (dispatch) => {
//         dispatch({type: CHECK_EMAIL_EXIST});
//
//         fetchForgotPassword(email)
//             .then(res => {
//                 if ( res.success) {
//                     dispatch({type: CHECK_EMAIL_EXIST_SUCCESS});
//                 } else {
//                     console.error('error: ', res.message);
//                     dispatch({type: CHECK_EMAIL_EXIST_FAILED});
//                 }
//             })
//             .catch(e => {
//                 console.error('error fetching: ', e)
//                 dispatch({type: CHECK_EMAIL_EXIST_FAILED});
//             })
//     }
// }
//
// export const changeForgotPasswordEmail = () => {
//     return (dispatch) => {
//         dispatch({type: CHANGE_FORGOT_PASSWORD_EMAIL})
//     }
// }
//
// export const remindPassword = () => {
//     return (dispatch) => {
//         dispatch({type: REMIND_PASSWORD})
//     }
// }
//
// export const changePassword = () => {
//     return (dispatch) => {
//         dispatch({type: CHANGE_PASSWORD})
//
//         fetchChangePassword()
//             .then(res => {
//                 if ( res.success) {
//                     dispatch({type: CHANGE_PASSWORD_SUCCESS});
//                 } else {
//                     console.error('error: ', res.message);
//                     dispatch({type: CHANGE_PASSWORD_FAILED});
//                 }
//             })
//             .catch(e => {
//                 console.error('error fetching: ', e)
//                 dispatch({type: CHANGE_PASSWORD_FAILED});
//             })
//     }
// }


import {
    fetchChangePassword,
    fetchForgotPassword,
    fetchGetUserInfo,
    fetchLogin,
    fetchLogout,
    fetchRegister, fetchResetPassword,
    fetchUpdateUserInfo
} from "../api/user";
import {
    AUTHORIZATION,
    AUTHORIZATION_FAILED,
    AUTHORIZATION_SUCCESS,
    CHANGE_FORGOT_PASSWORD_EMAIL,
    CHECK_EMAIL_EXIST,
    CHECK_EMAIL_EXIST_FAILED,
    CHECK_EMAIL_EXIST_SUCCESS,
    CHECK_USER_AUTH,
    CHECK_USER_AUTH_FAILED,
    CHECK_USER_AUTH_SUCCESS,
    GET_USER_INFO,
    GET_USER_INFO_FAILED,
    GET_USER_INFO_SUCCESS,
    LOGOUT,
    LOGOUT_FAILED,
    LOGOUT_SUCCESS,
    REGISTER,
    REGISTER_FAILED,
    REGISTER_SUCCESS, REMIND_PASSWORD,
    RESET_PASSWORD,
    RESET_PASSWORD_FAILED,
    RESET_PASSWORD_SUCCESS,
    UPDATE_USER_INFO,
    UPDATE_USER_INFO_FAILED,
    UPDATE_USER_INFO_SUCCESS,
    CHANGE_PASSWORD,
    CHANGE_PASSWORD_FAILED,
    CHANGE_PASSWORD_SUCCESS
} from "../action-types/user";
import {AppDispatch, AppThunkAction} from "../types";
import {
    IChangePassword,
    IForgotPassword,
    ILogin,
    ILogout,
    IProfileForm,
    IRegister,
    IResetPassword
} from "../../type/user/user-types";



export function register (payload: IRegister) : AppThunkAction{
    return function (dispatch: AppDispatch) {
        dispatch({
            type: REGISTER,
        });
        fetchRegister(payload)
            .then(res => {
                if ( res.success) {
                    dispatch({
                        type: REGISTER_SUCCESS,
                        email: res.user.email,
                        name: res.user.name,
                        userId: res.user.id,
                        username: res.user.username,
                    });

                    localStorage.setItem("refreshToken", res.refreshToken);
                    localStorage.setItem("accessToken", res.accessToken);
                }
                else {
                    dispatch({type: REGISTER_FAILED})
                }
            })
            .catch(error => {
                console.error('Ошибка при регистрации: ', error)
                dispatch({type: REGISTER_FAILED})
            })
    }
}

export function login (payload: ILogin): AppThunkAction {
    return function (dispatch: AppDispatch) {
        dispatch({type: AUTHORIZATION});
        fetchLogin(payload)
            .then(res => {
                if ( res.success){
                    dispatch({
                        type: AUTHORIZATION_SUCCESS,
                        email: res.user.email,
                        userId: res.user.id,
                        name: res.user.name,
                        username: res.user.username
                    });

                    localStorage.setItem("refreshToken", res.refreshToken);
                    localStorage.setItem("accessToken", res.accessToken);
                }
                else {
                    dispatch({type: AUTHORIZATION_FAILED})
                }
            })
            .catch(error => {
                console.error('Ошибка при авторизации: ', error);
                dispatch({type: AUTHORIZATION_FAILED});
            })
    }
}

export function logout(payload: ILogout): AppThunkAction {
    return (dispatch: AppDispatch) => {
        dispatch({type: LOGOUT});
        fetchLogout(payload)
            .then(res => {
                if ( res.success) {
                    dispatch({type: LOGOUT_SUCCESS});
                    localStorage.removeItem("refreshToken");
                    localStorage.removeItem("accessToken");

                }
                else {
                    dispatch({type: LOGOUT_FAILED});
                }
            })
            .catch(error => {
                console.error('Ошибка при авторизации: ', error);
                dispatch({type: LOGOUT_FAILED});
            })
    }
}

export function getUserInfo (): AppThunkAction {
    return async (dispatch: AppDispatch) => {
        dispatch({type: GET_USER_INFO});

        try {
            const res = await fetchGetUserInfo();
            if ( res.success) {
                dispatch({
                    type: GET_USER_INFO_SUCCESS,
                    email: res.user.email,
                    name: res.user.name,
                    username: res.user.username,
                    userId: res.user.id,

                });
            } else {
                dispatch({type: GET_USER_INFO_FAILED});
            }
        } catch (error) {
            dispatch({type: GET_USER_INFO_FAILED});
        }
    }
}

export function updateUserInfo (payload: IProfileForm): AppThunkAction {
    return (dispatch: AppDispatch) => {
        dispatch({type: UPDATE_USER_INFO});

        fetchUpdateUserInfo(payload)
            .then(res => {
                if ( res.success) {
                    dispatch({
                        type: UPDATE_USER_INFO_SUCCESS,
                        email: res.user.email,
                        name: res.user.name,
                        userId: res.user.id,
                        username: res.user.username,
                    })
                }
                else{
                    dispatch({type: UPDATE_USER_INFO_FAILED});
                }
            })
    }
}


export const checkUserAuth = (): AppThunkAction => {
    return async (dispatch: AppDispatch) => {
        dispatch({ type: CHECK_USER_AUTH });

        try {
            if (localStorage.getItem('accessToken')) {
                dispatch(getUserInfo());
                dispatch({ type: CHECK_USER_AUTH_SUCCESS });
            } else {
                dispatch({ type: CHECK_USER_AUTH_SUCCESS });
            }
        } catch (error) {
            console.error('Ошибка при проверке авторизации: ', error);
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("accessToken");
            dispatch({ type: CHECK_USER_AUTH_FAILED });
        }
    }
}


export const resetPassword = (payload: IResetPassword,
                              setErrorToken: React.Dispatch<React.SetStateAction<string>>,
                              setFlag: React.Dispatch<React.SetStateAction<boolean>>
): AppThunkAction => async (dispatch) => {
    try {
        dispatch({type: RESET_PASSWORD})

        const res = await fetchResetPassword(payload);
        if ( res.success) {
            dispatch({type: RESET_PASSWORD_SUCCESS});
        } else {
            console.error('error: ', res.message);
            setErrorToken('Неверный код подтверждения');
            setFlag(true);
            dispatch({type: RESET_PASSWORD_FAILED});
        }
    } catch (e: any) {
        console.error('error: ', e.message);
        setErrorToken('Неверный код подтверждения');
        setFlag(true);
        dispatch({type: RESET_PASSWORD_FAILED});
    }
};

export const checkEmailExist = (email: IForgotPassword): AppThunkAction => {

    return (dispatch: AppDispatch) => {
        dispatch({type: CHECK_EMAIL_EXIST});

        fetchForgotPassword(email)
            .then(res => {
                if ( res.success) {
                    dispatch({type: CHECK_EMAIL_EXIST_SUCCESS});
                } else {
                    console.error('error: ', res.message);
                    dispatch({type: CHECK_EMAIL_EXIST_FAILED});
                }
            })
            .catch(e => {
                console.error('error fetching: ', e)
                dispatch({type: CHECK_EMAIL_EXIST_FAILED});
            })
    }
}

export const changeForgotPasswordEmail = (): AppThunkAction => {
    return (dispatch: AppDispatch) => {
        dispatch({type: CHANGE_FORGOT_PASSWORD_EMAIL})
    }
}

export const remindPassword = (): AppThunkAction => {
    return (dispatch: AppDispatch) => {
        dispatch({type: REMIND_PASSWORD})
    }
}

export const changePassword = (payload: IChangePassword): AppThunkAction => {
    return (dispatch: AppDispatch) => {
        dispatch({type: CHANGE_PASSWORD})

        fetchChangePassword(payload)
            .then(res => {
                if ( res.success) {
                    dispatch({type: CHANGE_PASSWORD_SUCCESS});
                } else {
                    console.error('error: ', res.message);
                    dispatch({type: CHANGE_PASSWORD_FAILED});
                }
            })
            .catch(e => {
                console.error('error fetching: ', e)
                dispatch({type: CHANGE_PASSWORD_FAILED});
            })
    }
}