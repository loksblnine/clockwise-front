import React, {useEffect, useState} from 'react';
import {Redirect, useHistory, withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Spinner} from "react-bootstrap";
import {toast} from "react-toastify";

import {setTypes} from "../../../../store/actions/typeActions";
import {instance} from "../../../../http/headerPlaceholder.instance";

import {SERVER_URL} from "../../../../utils/constants";

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
            <div>
                <div className="m-3">
                    <h2>Вы хотите оплатить заказ сейчас?</h2>
                    <h4>Вы всегда сможете оплатить заказ по ссылке в письме либо в своем кабинете.</h4>
                </div>
                <div className="justify-content-center m-3">
                    <button className="btn btn-primary m-2"
                            onClick={(e) => {
                                e.preventDefault()
                                window.location = `${SERVER_URL}/pay?order_id=${params.get('order_id')}`
                            }}>Оплатить
                        сейчас {types.find(el => Number(el.work_id) === Number(params.get('type')))?.price} USD
                    </button>
                    <button className="btn btn-outline-secondary m-2"
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
