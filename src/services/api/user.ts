const URL_API = 'http://localhost:3000/api';

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
            token: localStorage.getItem("refreshToken"),
        }),
    })
        .then(checkResponse)
        .then((refreshData) => {
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem("accessToken", refreshData.accessToken);
            return refreshData;
        });
};

async function request(url: string, options?: RequestInit | undefined) {
    url = URL_API + url;

    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err: any) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken(); // Обновляем токен

            if (!options) {
                options = {};
            }

            if (!options.headers) {
                options.headers = new Headers();
            }

            if (options.headers instanceof Headers) {
                options.headers.set('authorization', `Bearer ${refreshData.accessToken}`);
            } else if (Array.isArray(options.headers)) {
                options.headers.push(['authorization', `Bearer ${refreshData.accessToken}`]);
            } else {
                options.headers['authorization'] = `Bearer ${refreshData.accessToken}`;
            }

            const res = await fetch(url, options);
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
}

export const fetchForgotPassword = (email: string) => {
    return request(`auth/request-password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: email,
    })
}

export const fetchResetPassword = (payload: string) => {
    return request(`/auth/reset-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: payload,
    })
}

export const fetchRegister = (payload: string) => {
    return request(`/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: payload,
    })
}

export const fetchLogin = (payload: string) => {
    return request(`/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: payload,
    })
}

export const fetchLogout = (payload: string) => {
    return request(`/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: payload,
    })
}

export const fetchGetUserInfo = () => {
    return request(`/user/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem('accessToken') || '',
        },
    })
}

export const fetchUpdateUserInfo = (payload: string) => {
    return request(`/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem('accessToken') || '',
        },
        body: payload,
    })
}

export const fetchChangePassword = (payload: string) => {
    return request(`/user/change-password`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem('accessToken') || '',
        },
        body: payload,
    })
}