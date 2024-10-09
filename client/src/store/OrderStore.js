import { makeAutoObservable } from "mobx";

export default class OrderStore {

    constructor() {
        this._orders = []
        makeAutoObservable(this) 
    }
    get order() {
        return this._orders
    }
    setOrders(orders) {
        this._orders= orders
    }
    addOrder(order) {
        this._orders.push(order);
    }
    getOrders() {
        return this._orders;
    }
 deleteOrder(orderId) {
        this._orders = this._orders.filter(order => order.id !== orderId);
    }
    clearCart() {
        this._orders = [];
    }
}
