import OrderForm from "./containers/content/client/OrderForm";
import MasterView from "./components/content/customer-content/MasterView/MasterView";
import ListCities from "./containers/content/admin/ListCities";
import ListOrders from "./containers/content/admin/ListOrders";
import ListMasters from "./containers/content/admin/ListMasters";
import ListCustomers from "./containers/content/admin/ListCustomers";
import LoginForm from "./components/content/customer-content/LoginForm/LoginForm";
import AdminPanel from "./components/content/admin-content/admin-panel/AdminPanel";
import MasterPanel from "./components/content/master-content/MasterPanel";
import RegistrationForm from "./components/content/customer-content/RegistrationForm/RegistrationForm";
import ClientPanel from "./components/content/client-content/ClientPanel";
import SuccessRegister from "./components/content/customer-content/RegistrationForm/SuccessRegister";

//todo remove this trash))
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
    },
    {
        path: '/registration',
        Component: RegistrationForm
    },
    {
        path: '/registration_success',
        Component: SuccessRegister
    }
]
export const authMasterRoutes = [
    {
        path: '/access_succeed_master',
        Component: MasterPanel
    }
    //todo
    // 1. see orders as a client
    // 2. edit info
    // 3. see comments
]
export const authClientRoutes = [
    {
        path: '/access_succeed_client',
        Component: ClientPanel
    }
    //todo
    // 1. how to become a master
    // 2. edit info
    // 3. leave a comment as client
]
export const authAdminRoutes = [
    {
        path: '/access_succeed_admin',
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
        SET_READY_CITIES: "SET_READY_CITIES",
        DELETE_CITY: "DELETE_CITY",
        UPDATE_CITY: "UPDATE_CITY",
        ADD_CITY: "ADD_CITY"
    },
    CUSTOMERS: {
        SET_CUSTOMERS: "SET_CUSTOMERS",
        SET_READY_CUSTOMERS: "SET_READY_CUSTOMERS",
        DELETE_CUSTOMER: "DELETE_CUSTOMER",
        UPDATE_CUSTOMER: "UPDATE_CUSTOMER",
        ADD_CUSTOMER: "ADD_CUSTOMER"
    },
    MASTERS: {
        SET_MASTERS: "SET_MASTERS",
        SET_READY_MASTERS: "SET_READY_MASTERS",
        DELETE_MASTER: "DELETE_MASTER",
        DELETE_CITY_AT_MASTER: "DELETE_CITY_AT_MASTER",
        UPDATE_MASTER: "UPDATE_MASTER",
        ADD_MASTER: "ADD_MASTER",
        ADD_CITY_AT_MASTER: "ADD_CITY_AT_MASTER",
        APPROVE_ORDER: "APPROVE_ORDER"
    },
    ORDERS: {
        SET_ORDERS: "SET_ORDERS",
        SET_READY_ORDERS: "SET_READY_ORDERS",
        DELETE_ORDER: "DELETE_ORDER",
        UPDATE_ORDER: "UPDATE_ORDER",
        ADD_ORDER: "ADD_ORDER"
    },
    USER: {
        SET_USER: "SET_USER",
        SET_DATA: "SET_DATA",
        SET_READY_USER: "SET_READY_USER",
        SET_JSON_WEB_TOKEN: "SET_JSON_WEB_TOKEN",
        REMOVE_JSON_WEB_TOKEN: "REMOVE_JSON_WEB_TOKEN",
        LOG_OUT: "LOG_OUT"
    }
}

export const PATH = [
    '/',
    '/access_succeed_admin',
    '/access_succeed_master',
    '/access_succeed_client'
]