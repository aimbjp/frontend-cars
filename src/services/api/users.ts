import {request} from "./user";


export const fetchUsers = () => {
    return request(`/users/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Barear '+ localStorage.getItem('accessToken') || '',
        },
    });
}