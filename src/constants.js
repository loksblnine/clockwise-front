import OrderForm from "./components/content/customer-content/orderform/OrderForm";
import MasterView from "./components/content/customer-content/mastersview/MasterView";
import LoginForm from "./components/content/admin-content/login-form/LoginForm";
import AdminPanel from "./components/content/admin-content/login-form/AdminPanel";
import ListCities from "./components/content/admin-content/cities/ListCities";
import ListOrders from "./components/content/admin-content/orders/ListOrders";
import ListMasters from "./components/content/admin-content/masters/ListMasters";
import ListCustomers from "./components/content/admin-content/customers/ListCustomers";

export const SERVER_URL = process.env.NODE_ENV === "production"
    ? "https://enigmatic-spire-58695.herokuapp.com": "http://localhost:5000"

export const WORK_TYPES = {
    1: {
        key: "small",
        id: "1",
        message: "маленьких часов ",
        value: "1"
    },
    2: {
        key: "average",
        id: "2",
        message: "средних часов ",
        value: "2"
    },
    3: {
        key: "big",
        id: "3",
        message: "больших часов ",
        value: "3"
    },
}

export const ADMIN_LOGIN = "admin@example.com"
export const ADMIN_PASSWORD = "passwordsecret"

function nowDate() {
    return new Date().toISOString().split('T')[0]
}

function finalDate() {
    return new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()).toISOString().split('T')[0]
}

export const DATE_FROM = nowDate()
export const DATE_TO = finalDate()
export const TIME_FROM = new Date(2011, 0, 1, 8).toISOString().split('T')[1]
export const TIME_TO = new Date(2011, 0, 1, 17).toISOString().split('T')[1]

export const customerRoutes = [
    {
        path: '/',
        Component: OrderForm
    }, {
        path: '/masters_choosing',
        Component: MasterView
    }, {
        path: '/login',
        Component: LoginForm
    }
]
export const authRoutes = [
    {
        path: '/access_succeed',
        Component: AdminPanel
    }, {
        path: '/cities',
        Component: ListCities
    }, {
        path: '/orders',
        Component: ListOrders
    }, {
        path: '/masters',
        Component: ListMasters
    }, {
        path: '/customers',
        Component: ListCustomers
    }
]