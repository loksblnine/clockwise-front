import React, {useCallback, useEffect, useState} from "react";
import EditOrder from "./EditOrder";
import * as constants from "../../../../constants";
import {useDispatch, useSelector} from "react-redux";
import {Spinner} from "react-bootstrap";
import {setOrdersAdmin, deleteOrder} from "../../../../store/actions/orderActions";
import {instance} from "../../../../http/headerPlaceholder.instance";

const ListOrders = () => {
    const orders = useSelector(state => state.orders.items)
    const [masters, setMasters] = useState([])
    const {isReady, loadNext, page} = useSelector(state => state.orders)
    const dispatch = useDispatch()
    const initialState = {
        master_id: -1,
        city_id: -1,
        work_id: "",
        isDone: "",
        from: '',
        to: '',
    }
    const [queryParams, setQueryParams] = useState(initialState);
    useEffect(() => {
        if (orders.length <= 0)
            dispatch(setOrdersAdmin(page, objectToQueryString(queryParams)))
    }, [dispatch])
    const handleNextOrders = useCallback((e) => {
        e.target.disabled = true
        dispatch(setOrdersAdmin(page, objectToQueryString(queryParams)))
        e.target.disabled = false
    }, [dispatch, page, queryParams])
    const objectToQueryString = useCallback((object) => {
        let string = ""
        if (object?.work_id?.length > 0) {
            string += (`&work_id=${object?.work_id}`)
        }
        if (object?.isDone?.length > 0) {
            string += (`&isDone=${object?.isDone}`)
        }
        if (object?.master_id?.length > 0) {
            if (Number(object.master_id) > 0)
                string += (`&master_id=${object?.master_id}`)
        }
        if (object?.from?.length > 0) {
            string += (`&from=${object?.from}`)
        }
        if (object?.to?.length > 0) {
            string += (`&to=${object?.to}`)
        }
        return string
    }, [{...queryParams}])
    const handleChange = useCallback((e) => {
        const {name, value} = e.target;
        setQueryParams(prevState => ({
            ...prevState,
            [name]: value
        }));
    }, [])
    const handleSearch = useCallback((e) => {
        e.preventDefault()
        dispatch({
            type: constants.ACTIONS.ORDERS.SET_PAGE,
            payload: 0
        })
        dispatch(setOrdersAdmin(0, objectToQueryString(queryParams)))
    }, [objectToQueryString, page, dispatch])

    const hasNumber = useCallback((myString) => {
        return /\d/.test(myString);
    }, [])

    const handleMasterInput = useCallback((e) => {
        if (!hasNumber(e.target.value)) {
            e.preventDefault()
            instance({
                method: "GET",
                url: `masters/offset/0?name=${e.target.value}`
            }).then(({data}) => setMasters(data))
        } else {
            const {name, value} = e.target;
            setQueryParams(prevState => ({
                ...prevState,
                [name]: value.split("|")[0]
            }));
            e.target.value = e.target.value.replace(/[0-9|]/g, '');
        }
    }, [dispatch, setQueryParams, queryParams, hasNumber])
    if (!isReady) {
        return <Spinner animation="grow"/>
    }
    return (
        <div className="router">
            <h2 className="text-left mt-5">Список заказов</h2>
            <button className="btn" type="button" data-toggle="collapse"
                    data-target="#Filter"
                    aria-controls="Filter">Фильтрация
            </button>
            <div id="Filter" className="collapse">
                <div className="form-group">
                    <div className="form-group">

                        <label>Статус заказа</label>
                        <select className="form-control" value={queryParams.isDone} name="isDone"
                                onChange={handleChange}>
                            <option key="1" value="">---Выбрать тип работы---</option>
                            <option key="2" value="false">Не сделано</option>
                            <option key="3" value="true">Выполнено</option>
                        </select></div>
                    <div className="form-group">

                        <label>Тип работы</label>
                        <select className="form-control" value={queryParams.work_id} name="work_id"
                                onChange={handleChange}>
                            <option value="">---Выбрать тип работы---</option>
                            <option key="1" value="1">Маленькие часы</option>
                            <option key="2" value="2">Средние часы</option>
                            <option key="3" value="3">Большие часы</option>
                        </select></div>
                    <div className="form-group">

                        <label>Выбрать мастера</label>
                        <input className="form-control" list="datalistOptions" name="master_id" autoComplete="on"
                               type="text"
                               placeholder="Type to search..." onChange={(e) => handleMasterInput(e)}
                        />
                        <datalist id="datalistOptions">
                            <option key="1" value="">---Выбрать мастера---</option>
                            {masters?.map(master => {
                                return (
                                    <option key={master.master_id}
                                            value={master.master_id + "|" + master.master_name}
                                    />
                                )
                            })}
                        </datalist>
                    </div>
                    <div className="form-group d-flex">
                        <div className="col col-1"><label>Дата</label></div>
                        <div className="col col-5">
                            <label className="text" htmlFor="date">С</label>
                            <input type="date" id="date" name="from"
                                   className="form-control react-datetime-range-picker"
                                   key="date-from" required pattern="[0-9]{4}.[0-9]{2}.[0-9]{2}"
                                   value={queryParams.from}
                                   onChange={handleChange}/>
                        </div>
                        <div className="col col-1">&nbsp;</div>
                        <div className="col col-5">
                            <label className="text" htmlFor="date">По</label>
                            <input type="date" id="date" name="to"
                                   className="form-control react-datetime-range-picker"
                                   min={queryParams.from}
                                   key="date-from" required pattern="[0-9]{4}.[0-9]{2}.[0-9]{2}"
                                   value={queryParams.to}
                                   onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="form-group d-row">
                        <button className="btn btn-outline-primary" type="button"
                                onClick={(e) => handleSearch(e)}>Поиск
                        </button>
                        <button className="btn btn-outline-secondary" type="button"
                                onClick={() => {
                                    setQueryParams(initialState)
                                    dispatch(setOrdersAdmin(page, objectToQueryString(queryParams)))
                                }}>Сбросить фильтры
                        </button>
                    </div>
                </div>
            </div>
            {orders.length === 0 ?
                <h5>список заказов пуст</h5>
                :
                <table className="table mt-5 text-justify">
                    <thead>
                    <tr>
                        <th scope="col"># заказа</th>
                        <th scope="col">Мастер</th>
                        <th scope="col">Покупатель</th>
                        <th scope="col">Город</th>
                        <th scope="col">Тип работы</th>
                        <th scope="col">Дата заказа</th>
                        <th scope="col">Время заказа</th>
                        <th scope="col">&nbsp;</th>
                        <th scope="col">&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        orders?.map(order => (
                            <tr key={order.order_id}>
                                <th scope="row"> {order.order_id}</th>
                                <td>{order.master.master_name}</td>
                                <td>{order.customer.customer_name}</td>
                                <td>{order.city.city_name}</td>
                                <td>{constants.WORK_TYPES[order.work_id].key}</td>
                                <td>{order.order_time.split('T')[0]}</td>
                                <td>{order.order_time.split('T')[1].split('.')[0]}</td>
                                <td><EditOrder order={order}/></td>
                                <td>
                                    <button className="btn btn-danger"
                                            onClick={() => dispatch(deleteOrder(order.order_id))}
                                            disabled={order.order_time.split('T')[0] <= constants.DATE_FROM}>Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>}
            {
                loadNext &&
                <div className="col text-center">
                    <button className="btn btn-primary mb-5" onClick={(e) => handleNextOrders(e)}> Еще заказы...
                    </button>
                </div>
            }
        </div>
    )
}
export default ListOrders