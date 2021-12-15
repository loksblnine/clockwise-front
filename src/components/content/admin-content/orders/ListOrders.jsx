import React, {useCallback, useEffect, useState} from "react";
import EditOrder from "./EditOrder";
import * as constants from "../../../../constants";
import {useDispatch, useSelector} from "react-redux";
import {Spinner} from "react-bootstrap";
import {setOrdersAdmin, deleteOrder} from "../../../../store/actions/orderActions";

const ListOrders = () => {
    const orders = useSelector((state => state.orders.items))
    const {isReady, loadNext, page} = useSelector(state => state.orders)
    const dispatch = useDispatch()
    const [queryParams, setQueryParams] = useState({
        master_id: -1,
        city_id: -1,
        work_id: "",
        isDone: "",
        from: '',
        to: '',
    });
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
        return string
    }, [{...queryParams}])

    const handleChange = useCallback((e) => {
        const {name, value} = e.target;
        console.log(name, value)
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
    if (!isReady) {
        return <Spinner animation="grow"/>
    }
    return (
        <div className="router">
            <h2 className="text-left mt-5">Список заказов</h2>
            <div>
                <form>
                    <div className="form-group">
                        <label>Тип работы</label>
                        <select className="form-control" value={queryParams.work_id} name="work_id"
                                onChange={handleChange}>
                            <option value="">---Выбрать тип работы---</option>
                            <option key="1" value="1">Маленькие часы</option>
                            <option key="2" value="2">Средние часы</option>
                            <option key="3" value="3">Большие часы</option>
                        </select>
                        <label>Статус заказа</label>
                        <select className="form-control" value={queryParams.isDone} name="isDone"
                                onChange={handleChange}>
                            <option key="1" value="">---Выбрать тип работы---</option>
                            <option key="2" value="false">Не сделано</option>
                            <option key="3" value="true">Выполнено</option>
                        </select>

                        <div className="form-group">
                            <button className="btn btn-search" type="button"
                                    onClick={(e) => handleSearch(e)}>Поиск
                            </button>
                        </div>
                    </div>
                </form>
            </div>
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
                {orders?.map(order => (
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
            </table>
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