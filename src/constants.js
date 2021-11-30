import OrderForm from "./containers/content/client/OrderForm";
import MasterView from "./components/content/customer-content/MasterView/MasterView";
import ListCities from "./components/content/admin-content/cities/ListCities";
import ListOrders from "./components/content/admin-content/orders/ListOrders";
import ListMasters from "./components/content/admin-content/masters/ListMasters";
import ListCustomers from "./components/content/admin-content/customers/ListCustomers";
import LoginForm from "./components/content/customer-content/LoginForm/LoginForm";
import AdminPanel from "./components/content/admin-content/admin-panel/AdminPanel";

export const SERVER_URL = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://enigmatic-spire-58695.herokuapp.com"

export const WORK_TYPES = {
    1: {
        key: "маленькие",
        id: "1",
        message: "маленьких часов ",
        value: "1"
    },
    2: {
        key: "средние",
        id: "2",
        message: "средних часов ",
        value: "2"
    },
    3: {
        key: "большие",
        id: "3",
        message: "больших часов ",
        value: "3"
    },
}

function nowDate() {
    return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2).toISOString().split('T')[0]
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
    },
    {
        path: '/masters_choosing',
        Component: MasterView
    },
    {
        path: '/login',
        Component: LoginForm
    }
]

export const authRoutes = [
    {
        path: '/access_succeed',
        Component: AdminPanel
    },
    {
        path: '/cities',
        Component: ListCities
    },
    {
        path: '/orders',
        Component: ListOrders
    },
    {
        path: '/masters',
        Component: ListMasters
    },
    {
        path: '/customers',
        Component: ListCustomers
    }
]

export const ACTIONS = {
    CITIES: {
        SET_CITIES: "SET_CITIES",
        SET_READY_CITY: "SET_CITIES"
    },
    USER: {
        SET_USER: "SET_USER",
        SET_READY_USER: "SET_READY_USER"
    }
}