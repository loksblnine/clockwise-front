import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Spinner} from "react-bootstrap";
import EditOrder from "./EditOrder";

import {ACTIONS, datePattern, WORK_TYPES} from "../../../../utils/constants";
import {deleteOrder, setOrdersAdmin} from "../../../../store/actions/orderActions";
import {handleMasterInput, objectToQueryString, saveExcelFile} from "../../../../utils/utils";
import {COLLAPSE_ARROWS, EXCEL_SVG, EXPAND_ARROWS} from "../../../../utils/svg_constants";
import {setCities} from "../../../../store/actions/cityActions";
import {setMasters} from "../../../../store/actions/masterActions";
import {setTypes} from "../../../../store/actions/typeActions";


const ListOrders = () => {
    const orders = useSelector(state => state.orders.items)
    const cities = useSelector(state => state.cities.items)
    const masters = useSelector(state => state.masters.items)
    const types = useSelector(state => state.types.items)
    const [mastersList, setMastersList] = useState([])
    const {isReady, loadNext, page} = useSelector(state => state.orders)
    const [openFilter, setOpenFilter] = useState(false)
    const dispatch = useDispatch()
    const initialState = {
        master_name: "",
        master_id: -1,
        city_id: -1,
        masters: [],
        work_id: "",
        isDone: "",
        from: '',
        to: '',
    }
    const [queryParams, setQueryParams] = useState(initialState);
    useEffect(() => {
        if (orders.length <= 0) {
            dispatch(setOrdersAdmin(page, objectToQueryString(queryParams)))
        }
        if (types.length <= 0) {
            dispatch(setTypes())
        }
        if (cities.length <= 0) {
            dispatch(setCities())
        }
        if (masters.length <= 0) {
            dispatch(setMasters(0))
        }
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
            type: ACTIONS.ORDERS.SET_PAGE,
            payload: 0
        })
        dispatch(setOrdersAdmin(0, objectToQueryString(queryParams)))
    }

    if (!isReady) {
        return <Spinner animation="grow"/>
    }
    return (
        <div>
            <h2 className="text-left">Список заказов</h2>
            <div className="d-flex mt-5 justify-content-between">
                <button className="btn" type="button" data-toggle="collapse"
                        data-target="#Filter" onClick={(e) => {
                    e.preventDefault()
                    setOpenFilter(!openFilter)
                }}
                        aria-controls="Filter">Фильтрация &nbsp;
                    {!openFilter ? EXPAND_ARROWS : COLLAPSE_ARROWS}
                </button>
                <div>
                    <button className="btn" onClick={() => saveExcelFile(queryParams, localStorage.getItem('token'))}>
                        Экспорт в {EXCEL_SVG}
                    </button>
                </div>
            </div>
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
                            {types?.map((item) => {
                                return (
                                    <option key={item.work_id} value={item.work_id}>{item.description}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Выбрать мастера</label>
                        <input className="form-control" list="datalistOptions" name="master_id" autoComplete="on"
                               type="text" value={queryParams.master_name}
                               placeholder="Type to search..."
                               onChange={(e) => handleMasterInput(e, setQueryParams, setMastersList, dispatch)}
                        />
                        <datalist id="datalistOptions">
                            <option key="1" value="">---Выбрать мастера---</option>
                            {mastersList?.map(master => {
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
                        <th scope="col">Показать полностью</th>
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
                                <td>{types.filter(t=> Number(t.work_id) === Number(location.state.data.type))[0].description}</td>
                                <td>{order.order_time.split('T')[0]}</td>
                                <td>{order.order_time.split('T')[1].split('.')[0]}</td>
                                <td>&nbsp;</td>
                                <td>
                                    <button className="btn btn-danger"
                                            onClick={() => dispatch(deleteOrder(order.order_id))}
                                            disabled={(order?.isPaid?.length || order.isDone || Number(new Date(order.order_time)) < Number(new Date()))
                                            }>Удалить
                                    </button>
                                </td>
                                <td>
                                    <EditOrder order={order}/>
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
