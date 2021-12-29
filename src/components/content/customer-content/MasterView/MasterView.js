import React, {useEffect, useState} from 'react';
import * as constants from "../../../../utils/constants";
import {Redirect, useHistory, useLocation} from 'react-router-dom'
import '../Form.css'
import {Spinner} from "react-bootstrap";
import {getFreeMasters} from "../../getData";
import {sendConfirmationOrder} from "../../workWithData";
import {useDispatch, useSelector} from "react-redux";
import {clearPhotos} from "../../../../store/actions/userActions";

const MasterView = () => {
    const dispatch = useDispatch()
    const [masters, setMasters] = useState([])
    const [loading, setLoading] = useState(true)
    const location = useLocation()
    const history = useHistory()
    const photo = useSelector((state) => state.users.photo)
    const order = location.state.data
    const T = order.date + "T" + order.time
    const orderBody = {
        city_id: order.city,
        order_time: T,
        work_id: order.type,
    }
    useEffect(() => {
        getFreeMasters(orderBody, setMasters)
            .then(() =>
                setLoading(false))
    }, [location.state])

    const handleBack = () => {
        history.push({
            pathname: '/',
            state: location.state
        })
    }

    const handleClick = (master) => {
        sendConfirmationOrder(order, master, history, photo)
        dispatch(clearPhotos())
    }

    if (!location.state) {
        return (
            <Redirect to="/"/>
        )
    }

    if (loading) {
        return (
            <div>
                <Spinner animation="grow"/>
            </div>
        )
    }
    return (
        <div className="content">
            <div>
                <h3>Выбор мастера</h3>
                <p>Вы заказали
                    ремонт {constants.WORK_TYPES[location.state.data.type].message} на {location.state.data.date} в {location.state.data.time}</p>
            </div>
            {masters.length > 0 ?
                <div>
                    <table className="table mt-5">
                        <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Рейтинг</th>
                            <th scope="col">&nbsp;</th>
                        </tr>
                        </thead>
                        <tbody>
                        {masters?.map(master => (
                            <tr key={master.master_id}>
                                <td>{master.master_name}</td>
                                <td>{master.ranking}</td>
                                <td>
                                    <button className="btn btn-success" id={master.master_id}
                                            value={master.master_id}
                                            onClick={() => handleClick(master)}
                                    >Выбрать
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div> :
                <h4>Нет свободных мастеров</h4>}
            <div>
                <button className="btn btn-primary" onClick={handleBack}
                >Назад
                </button>
            </div>
        </div>
    );
}

export default MasterView;
