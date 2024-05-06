import {request} from "./user";


export const fetchUsers = () => {
    return request(`/users/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Barear '+ localStorage.getItem('accessToken') || '',
        },
    });
}