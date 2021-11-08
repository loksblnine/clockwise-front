import {makeAutoObservable} from "mobx";

export default class DBStore {
    constructor() {
        this._masters = []
        this._orders = []
        this._cities = []
        this._customers = []
        this._depsMasterCity = []
        this._ordersNext = []
       makeAutoObservable(this)
    }

    setMasters(masters) {
        this._masters = masters
    }
    setOrders(orders) {
        this._orders = orders
    }
    setOrdersNext(orders) {
        this._ordersNext = orders
    }
    setCities(cities) {
        this._cities = cities
    }
    setCustomers(customers) {
        this._customers = customers
    }
    setDepsMasterCity(deps) {
        this._depsMasterCity = deps
    }

    get masters() {
        return this._masters
    }
    get orders() {
        return this._orders
    }
    get ordersNext() {
        return this._ordersNext
    }
    get cities() {
        return this._cities
    }
    get customers() {
        return this._customers
    }
    get depsMasterCity(){
        return this._depsMasterCity
    }
}