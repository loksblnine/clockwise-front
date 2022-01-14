import OrderForm from "../components/content/customer-content/OrderForm/OrderForm";
import MasterView from "../components/content/customer-content/MasterView/MasterView";
import ListOrders from "../components/content/admin-content/orders/ListOrders";
import ListCustomers from "../components/content/admin-content/customers/ListCustomers";
import ListMasters from "../components/content/admin-content/masters/ListMasters";
import ListCities from "../components/content/admin-content/cities/ListCities";
import LoginForm from "../components/content/customer-content/LoginForm/LoginForm";
import AdminPanel from "../components/content/admin-content/admin-panel/AdminPanel";
import MasterPanel from "../components/content/master-content/MasterPanel";
import RegistrationForm from "../components/content/customer-content/RegistrationForm/RegistrationForm";
import ClientPanel from "../components/content/client-content/ClientPanel";
import SuccessRegister from "../components/content/customer-content/RegistrationForm/SuccessRegister";
import SuccessActivate from "../components/content/customer-content/RegistrationForm/SuccessActivate";
import Blog from "../components/content/customer-content/Blog/Blog";
import CreateArticle from "../components/content/admin-content/blog/CreateArticle";
import RedirectingPage from "../components/content/customer-content/LoginForm/Redirect";
import EditArticle from "../components/content/admin-content/blog/EditArticle";
import PayPalRedirect from "../components/content/customer-content/Payment/PayPalRedirect";
import SuccessfulPayment from "../components/content/customer-content/Payment/SuccessfulPayment";
import ListTypes from "../components/content/admin-content/types/ListTypes";
import FailedPayment from "../components/content/customer-content/Payment/FailedPayment";
import Article from "../components/content/customer-content/Blog/Article";

//todo remove this garbage =))
//todo use ENUM with TS
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

export const ONE_MEGABYTE = 8 * 1024 * 1024
export const DATE_FROM = nowDate()
export const DATE_TO = finalDate()

export const customerRoutes = [
    {
        path: '/',
        Component: OrderForm
    },
    {
        path: '/article',
        Component: Article
    },
    {
        path: '/blog',
        Component: Blog
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
        path: '/login/token/*',
        Component: RedirectingPage
    },
    {
        path: '/registration',
        Component: RegistrationForm
    },
    {
        path: '/registration_success',
        Component: SuccessRegister
    },
    {
        path: '/activate/:token',
        Component: SuccessActivate
    },
    {
        path: '/pay',
        Component: PayPalRedirect
    },
    {
        path: '/payment/success',
        Component: SuccessfulPayment
    },
    {
        path: '/payment/failed',
        Component: FailedPayment
    }
]
export const authMasterRoutes = [
    {
        path: '/access_succeed_master',
        Component: MasterPanel
    }
    //todo
    // 3. see comments
]
export const authClientRoutes = [
    {
        path: '/access_succeed_client',
        Component: ClientPanel
    }
    //todo
    // 1. how to become a master
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
        path: '/types',
        Component: ListTypes
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
    },
    {
        path: '/blog/create',
        Component: CreateArticle
    },
    {
        path: '/blog/edit',
        Component: EditArticle
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
        SET_PAGE: "SET_PAGE",
        DELETE_ORDER: "DELETE_ORDER",
        UPDATE_ORDER: "UPDATE_ORDER",
        ADD_ORDER: "ADD_ORDER",
        SORT: "SORT"
    },
    USER: {
        SET_USER: "SET_USER",
        SET_DATA: "SET_DATA",
        ADD_PHOTO: "ADD_PHOTO",
        REMOVE_PHOTO: "REMOVE_PHOTO",
        CLEAR_PHOTOS: "CLEAR_PHOTOS",
        SET_READY_USER: "SET_READY_USER",
        SET_JSON_WEB_TOKEN: "SET_JSON_WEB_TOKEN",
        REMOVE_JSON_WEB_TOKEN: "REMOVE_JSON_WEB_TOKEN",
        LOG_OUT: "LOG_OUT",
        MASTER: {
            ADD_CITY: "MASTER.ADD_CITY",
            DELETE_CITY: "MASTER.DELETE_CITY",
            CHANGE_PROFILE: "CHANGE_PROFILE",
        },
        CUSTOMER: {
            SET_MARK: "CUSTOMER.SET_MARK",
            CHANGE_PROFILE: "CHANGE_PROFILE",
        },
        ADMIN: {
            APPROVE_MASTER: "ADMIN.APPROVE_MASTER"
        }
    },
    BLOG: {
        SET_ARTICLES: "SET_ARTICLES",
        SET_READY_ARTICLES: "SET_READY_ARTICLES",
        DELETE_ARTICLE: "DELETE_ARTICLE",
        UPDATE_ARTICLE: "UPDATE_ARTICLE",
        ADD_ARTICLE: "ADD_ARTICLE",
        SET_ARTICLE_PHOTO: "SET_ARTICLE_PHOTO",
        REMOVE_ARTICLE_PHOTO: "REMOVE_ARTICLE_PHOTO"
    },
    WEATHER: {
        SET_WINTER: "SET_WINTER"
    },
    TYPES: {
        SET_TYPES: "SET_TYPES",
        SET_READY_TYPES: "SET_READY_TYPES",
        DELETE_TYPE: "DELETE_TYPE",
        UPDATE_TYPE: "UPDATE_TYPE",
        ADD_TYPE: "ADD_TYPE"
    },
}

export const PATH = [
    '/',
    '/access_succeed_admin',
    '/access_succeed_master',
    '/access_succeed_client'
]

export const SERVER_URL = process.env.NODE_ENV === "production" ? "https://enigmatic-spire-58695.herokuapp.com" : "http://localhost:5000"

export const datePattern = "[0-9]{4}.[0-9]{2}.[0-9]{2}"
export const stringPattern = "[A-ZА-Яa-zа-я -]+"
export const emailPattern = "[A-Za-z0-9._%+-]+@[A-Za-z]+\.[A-Za-z]+"
export const rankingPattern = "([1-5])|([1-4].[05])|(5.0)"
