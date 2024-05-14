import {
    IChangePassword,
    IForgotPassword,
    ILogin,
    ILogout,
    IProfileForm,
    IRegister,
    IResetPassword
} from "../../type/user/user-types";
import {URL_API} from "./links";
import {ApiError} from "../../type/api";


const checkResponse = (res: Response): Promise<any> => {
    return res.ok ? res.json() : res.json().then((err: any) => Promise.reject(err));
};

export const refreshToken = () => {
    return fetch(`${URL_API}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            refreshToken: localStorage.getItem("refreshToken"),
        }),
    })
        .then(checkResponse)
        .then((refreshData) => {
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("accessToken", refreshData.accessToken);
            return refreshData;
        });
};

export async function request(url: string, options?: RequestInit) {
    url = URL_API + url;

    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err: unknown) {
        const errorMessage = typeof err === "object" && err !== null && "error" in err ? (err as ApiError).error : '';

        console.log(errorMessage);

        if (errorMessage === "jwt expired" ) { //  || errorMessage === "jwt invalid"
            const refreshData = await refreshToken(); // Обновляем токен

            if (!options) {
                options = { headers: {} };
            }

            // Устанавливаем заголовок Authorization с обновленным токеном
            if (!options.headers) {
                options.headers = {};
            }

            if (options.headers instanceof Headers) {
                options.headers.set('Authorization', `Bearer ${refreshData.accessToken}`);
            } else if (Array.isArray(options.headers)) {
                // Находим индекс существующего заголовка Authorization, если он есть
                const authHeaderIndex = options.headers.findIndex(header => header[0] === 'Authorization');
                if (authHeaderIndex !== -1) {
                    // Обновляем существующий заголовок
                    options.headers[authHeaderIndex] = ['Authorization', `Bearer ${refreshData.accessToken}`];
                } else {
                    // Добавляем новый заголовок
                    options.headers.push(['Authorization', `Bearer ${refreshData.accessToken}`]);
                }
            } else {
                // Для объектов Record<string, string>
                if ( !options.headers['Authorization'] ){
                    options.headers['Authorization'] = `Bearer ${refreshData.accessToken}`;
                }
            }

            const res = await fetch(url, options);
            return await checkResponse(res);
        } else {
            // Если ошибка не связана с JWT
            return err;//Promise.reject(err);
        }
    }
}




export const fetchForgotPassword = (email: IForgotPassword) => {
    return request(`/auth/request-password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(email),
    })
}

export const fetchResetPassword = (payload: IResetPassword) => {
    return request(`/auth/reset-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
}

export const fetchRegister = (payload: IRegister) => {
    return request(`/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
}

export const fetchLogin = (payload: ILogin) => {
    return request(`/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
}

export const fetchLogout = (payload: ILogout) => {
    return request(`/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
}

export const fetchGetUserInfo = () => {
    return request(`/user/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Barear '+ localStorage.getItem('accessToken') || '',
        },
    })
}

export const fetchUpdateUserInfo = (payload: IProfileForm) => {
    return request(`/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Barear ' + localStorage.getItem('accessToken') || '',
        },
        body: JSON.stringify(payload),
    })
}

export const fetchChangePassword = (payload: IChangePassword) => {
    return request(`/user/change-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Barear ' + localStorage.getItem('accessToken') || '',
        },
        body: JSON.stringify(payload),
    })
}