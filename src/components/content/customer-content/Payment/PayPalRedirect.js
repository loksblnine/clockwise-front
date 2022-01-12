import React, {useEffect, useState} from 'react';
import {SERVER_URL} from "../../../../utils/constants";
import {Redirect, useHistory, useLocation, withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setTypes} from "../../../../store/actions/typeActions";
import {Spinner} from "react-bootstrap";
import {toast} from "react-toastify";
import {instance} from "../../../../http/headerPlaceholder.instance";

const PayPalRedirect = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const types = useSelector(state => state.types.items)
    const params = new URLSearchParams(window.location.search)
    const [isPaid, setIsPaid] = useState(false)

    useEffect(() => {
        if (types.length <= 0) {
            dispatch(setTypes())
        }
        if (params.get('order_id')) {
            instance({
                method: "GET",
                url: `/pay/isPaid/${params.get('order_id')}`
            }).then(({data}) => {
                setIsPaid(data)
            })
        }
    }, [])

    if (types.isReady) {
        return <Spinner animation="grow"/>
    }
    if (isPaid) {
        return (
            <div>
                {toast.success("Заказ уже оплачен")}
                <Redirect to="/"/>
            </div>
        )
    }
    if (params.get('order_id') && params.get('type') && !isPaid)
        return (
            <div className="d-flex justify-content-center">
                <div>
                    <h2>Вы хотите оплатить заказ сейчас?</h2>
                    <h4>Вы всегда сможете оплатить заказ по ссылке в письме либо в своем кабинете</h4>
                </div>
                <div className="row d-grid justify-content-center">
                    <button className="btn btn-primary"
                            onClick={(e) => {
                                e.preventDefault()
                                window.location = `${SERVER_URL}/pay?order_id=${params.get('order_id')}`
                            }}>Оплатить
                        сейчас {types.find(el => Number(el.work_id) === Number(params.get('type')))?.price} USD
                    </button>
                    <button className="btn btn-outline-secondary"
                            onClick={(e) => {
                                e.preventDefault()
                                history.push('/')
                            }}
                    >Оплатить позже
                    </button>
                </div>
            </div>
        );
    return (
        <div>
            {toast.error("Возникла ошибка")}
            <Redirect to="/"/>
        </div>
    )
};

export default withRouter(PayPalRedirect);
