import {makeAutoObservable} from "mobx";

export default class DBStore {
    constructor() {
        this._masters = []
        this._orders = []
        this._cities = []
        this._customers = []
        this._depsMasterCity = []
        this._ordersNext = []
        this._mastersNext = []
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
    setMastersNext(mastersNext) {
        this._mastersNext = mastersNext
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
    get mastersNext() {
        return this._mastersNext
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