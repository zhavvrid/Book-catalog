import {$authHost, $host} from "./index";

export const createJanr = async (janr) => {
    const {data} = await $authHost.post('api/janr', janr)
    return data
}

export const fetchJanrs = async () => {
    const {data} = await $host.get('api/janr')
    return data
}

export const fetchAuthors = async () => {
    const {data} = await $host.get('api/author')
    return data
}

export const createBook = async (book) => {
    const {data} = await $authHost.post('api/book', book )
    return data
}

export const createOrder = async (userId, bookId, quantity, price) => {
    const {data} = await $host.post('api/order', {userId, bookId, quantity, price})
    return data
}

export const fetchBooks = async (janrId) => {
    const {data} = await $host.get('api/book', {params: {
            janrId
        }})
    return data
}

export const fetchOneBook = async (id) => {
    const {data} = await $host.get('api/book/' + id)
    return data
}

export const fetchOrdersByUserId = async (userId) => {
    try {
        const { data } = await $host.get(`api/order?userId=${userId}`);
        return data;
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        throw error;
    }
};
 
export const fetchBookByOrderId = async (orderId) => {
    try {
        const { data } = await $host.get(`api/order_book?orderId=${orderId}`);
        return data;
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        throw error; 
    }
};