import {makeAutoObservable} from "mobx";

export default class DBStore {
    constructor() {
        this._masters = []
        this._orders = []
        this._cities = []
        this._customers = []
       makeAutoObservable(this)
    }

    setMasters(masters) {
        this._masters = masters
    }
    setOrders(orders) {
        this._orders = orders
    }
    setCities(cities) {
        this._cities = cities
    }
    setCustomers(customers) {
        this._customers = customers
    }

    get masters() {
        return this._masters
    }
    get orders() {
        return this._orders
    }
    get cities() {
        return this._cities
    }
    get customers() {
        return this._customers
    }
}