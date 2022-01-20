import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Spinner} from "react-bootstrap";

import {instance} from "../../../../http/headerPlaceholder.instance";
import PaymentDetails from "../../customer-content/Payment/PaymentDetails";
import {deleteOrder, setOrdersAdmin} from "../../../../store/actions/orderActions";
import {hasNumber, objectToQueryString} from "../../../../utils/utils";
import {COLLAPSE_ARROWS, EXPAND_ARROWS} from "../../../../utils/svg_constants";
import * as constants from "../../../../utils/constants";
import {datePattern} from "../../../../utils/constants";

const ListOrders = () => {
    const orders = useSelector(state => state.orders.items)
    const [masters, setMasters] = useState([])
    const {isReady, loadNext, page} = useSelector(state => state.orders)
    const [openFilter, setOpenFilter] = useState(false)
    const dispatch = useDispatch()
    const initialState = {
        master_name: "",
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

    const handleChange = (e) => {
        const {name, value} = e.target;
        setQueryParams(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSearch = (e) => {
        e.preventDefault()
        dispatch({
            type: constants.ACTIONS.ORDERS.SET_PAGE,
            payload: 0
        })
        dispatch(setOrdersAdmin(0, objectToQueryString(queryParams)))
    }

    const handleMasterInput = useCallback((e) => {
        e.preventDefault()
        const {name, value} = e.target;
        if (!hasNumber(value)) {
            instance({
                method: "get",
                url: `masters/offset/0?name=${value}`
            }).then(({data}) => setMasters(data))
            setQueryParams(prevState => ({
                ...prevState,
                [name]: "",
                master_name: value
            }))
        } else {
            setQueryParams(prevState => ({
                ...prevState,
                [name]: value.split("|")[0],
                master_name: value.split("|")[1]
            }))
            e.target.value = value.replace(/[0-9|]/g, '')
        }
    }, [setQueryParams])
    if (!isReady) {
        return <Spinner animation="grow"/>
    }
    return (
        <div>
            <h2 className="text-left mt-5">Список заказов</h2>
            <button className="btn" type="button" data-toggle="collapse"
                    data-target="#Filter" onClick={(e) => {
                e.preventDefault()
                setOpenFilter(!openFilter)
            }}
                    aria-controls="Filter">Фильтрация &nbsp;
                {!openFilter ? EXPAND_ARROWS : COLLAPSE_ARROWS}
            </button>
            {openFilter && <div id="Filter">
                <div className="form-group">
                    <div className="form-group">
                        <label>Статус заказа</label>
                        <select className="form-control" value={queryParams.isDone} name="isDone"
                                onChange={handleChange}>
                            <option key="1" value="">---Выбрать тип работы---</option>
                            <option key="2" value="false">Не сделано</option>
                            <option key="3" value="true">Выполнено</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Тип работы</label>
                        <select className="form-control" value={queryParams.work_id} name="work_id"
                                onChange={handleChange}>
                            <option value="">---Выбрать тип работы---</option>
                            <option key="1" value="1">Маленькие часы</option>
                            <option key="2" value="2">Средние часы</option>
                            <option key="3" value="3">Большие часы</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Выбрать мастера</label>
                        <input className="form-control" list="datalistOptions" name="master_id" autoComplete="on"
                               type="text" value={queryParams.master_name}
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
                                   key="date-from" required pattern={datePattern}
                                   value={queryParams.from}
                                   onChange={handleChange}/>
                        </div>
                        <div className="col col-1">&nbsp;</div>
                        <div className="col col-5">
                            <label className="text" htmlFor="date">По</label>
                            <input type="date" id="date" name="to"
                                   className="form-control react-datetime-range-picker"
                                   min={queryParams.from}
                                   key="date-from" required pattern={datePattern}
                                   value={queryParams.to}
                                   onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="form-group d-row">
                        <button className="btn btn-outline-primary" type="button"
                                onClick={(e) => handleSearch(e)}>Поиск
                        </button>
                        <button className="btn btn-outline-secondary"
                                onClick={() => {
                                    setQueryParams(initialState)
                                }}>Сбросить фильтры
                        </button>
                    </div>
                </div>
            </div>}
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
                        <th scope="col">Статус оплаты</th>
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
                                <td>&nbsp;{/*<EditOrder order={order}/>*/}</td>
                                <td>
                                    <button className="btn btn-danger"
                                            onClick={() => dispatch(deleteOrder(order.order_id))}
                                            disabled={!order.isDone || order.order_time.split('T')[0] <= constants.DATE_FROM}>Удалить
                                    </button>
                                </td>
                                <td>
                                    {
                                        !order?.isPaid ?
                                            "Не оплачено"
                                            : <PaymentDetails order={order}/>
                                    }
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
