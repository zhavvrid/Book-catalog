import {$authHost, $host} from "./index";
import {jwtDecode} from "jwt-decode";

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'USER'})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const fetchAllUsersWithOrders = async () => {
    try {
        const { data } = await $host.get('api/user/all');
        return data;
    } catch (error) {
        console.error('Ошибка при получении всех пользователей и их заказов:', error);
        throw error;
    }
}

export const updateUser = async (userId, updatedData) => {
    const { data } = await $host.put(`api/user/${userId}`, updatedData);
    return data;
};

export const deleteUser = async (userId) => {
    const { data } = await $host.delete(`api/user/${userId}`);
    return data;
};

