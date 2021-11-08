import React, {useContext, useEffect} from 'react';
import {useFormik} from 'formik';
import * as constants from "../../../../constants";
import {withRouter, useHistory, useLocation} from "react-router-dom";
import './OrderStyles.css'
import {observer} from "mobx-react-lite";
import {toast} from "react-toastify";
import {Context} from "../../../../index";
import axios from "axios";
import {SERVER_URL} from "../../../../constants";

const validate = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Имя обязательно';
    } else if (values.name.length < 3) {
        errors.name = 'Короткое имя)';
    }
    if (values.name === "Ян") {
        errors.name = 'Извините, станьте Яной)';
    }

    if (!values.email) {
        errors.email = 'Адрес электронный почты обязателен';
    } else if (!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i.test(values.email)) {
        errors.email = 'Невалидный адрес электронной почты';
    }
    if (!values.city) {
        toast.info("На данный момент сервер недоступен, попробуйте перезагрузить страницу, если это не помогло обратитесь к нам на прямую admin@example.com")
    }
    return errors;
};

const orderPageStyle = {
    margin: "32px auto 37px",
    maxWidth: "1000px",
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.15)"
};

const OrderForm = observer((props) => {
        const history = useHistory()
        const location = useLocation()
        const {DB} = useContext(Context);
        useEffect(() => {
            if (DB.cities.length <= 0) {
                axios.get(SERVER_URL + `/cities`)
                    .then(resp => DB.setCities(resp.data))
            }
        }, [DB.cities])
        const formik = useFormik({
            initialValues: {
                name: location?.state?.data?.name || '',
                email: location?.state?.data?.email || '',
                city: location?.state?.data?.city || '-1',
                date: location?.state?.data?.date || constants.DATE_FROM,
                time: location?.state?.data?.time || "14:00",
                type: location?.state?.data?.type || '1'
            },
            validate,
            onSubmit: (values) => {
                history.push({
                    pathname: '/masters_choosing',
                    state: {data: values}
                })
            },
        });
        return (
            <div style={orderPageStyle}>
                <form onSubmit={formik.handleSubmit} className="form">
                    <div className="form-group">
                        <label className="text" htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" key="email"
                               value={formik.values.email} onChange={formik.handleChange}
                               className="form-control" placeholder="Email"
                               required/>
                        {formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
                    </div>
                    <div className="form-group">
                        <label className="text" htmlFor="name">Имя</label>
                        <input type="name" id="name" name="name" key="name"
                               value={formik.values.name}
                               onChange={formik.handleChange}
                               className="form-control" placeholder="Имя"
                               required/>
                        {formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}
                    </div>
                    <div className="form-group">
                        <label className="text" htmlFor="city">Город</label>
                        <select id="city" name="city" key="city"
                                value={formik.values.city} onChange={formik.handleChange}
                                className="form-control"
                                placeholder="Выберите ваш город"
                                required>
                            <option key="choose-city" value="-1" disabled>---Выберете город---</option>
                            )
                            {DB.cities?.map(city =>
                                <option key={city.city_id} value={city.city_id}>{city.city_name} </option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="text" htmlFor="date">Введите дату заказа </label>
                        <input type="date" id="date" name="date" className="form-control react-datetime-picker"
                               min={constants.DATE_FROM} max={constants.DATE_TO} key="date"
                               required pattern="[0-9]{4}.[0-9]{2}.[0-9]{2}"
                               value={formik.values.date}
                               onChange={formik.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label className="text" htmlFor="time">Время заказа (8:00 - 17:00) </label>
                        <input type="time" name="time" className="form-control timepicker"
                               min={constants.TIME_FROM} max={constants.TIME_TO} key="time"
                               required step="3600" value={formik.values.time}
                               pattern="([01]?[0-9]|2[0-3]):[0][0]" id="24h"
                               onChange={formik.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label className="text" htmlFor="type"> Выберите тип поломки </label>
                        <div role="group" aria-labelledby="my-radio-group" className="radio-toolbar">
                            <label className="miro-radiobutton">
                                <input type="radio" value="1" name="type"
                                       id="radio1"
                                       key="radio1"
                                       checked={formik.values.type === '1'}
                                       onChange={formik.handleChange}/>
                                <span>Маленькие часы </span>
                            </label>
                            <label className="miro-radiobutton">
                                <input type="radio" value="2" name="type"
                                       id="radio2"
                                       key="radio2"
                                       checked={formik.values.type === '2'}
                                       onChange={formik.handleChange}/>
                                <span>Средние часы </span>
                            </label>
                            <label className="miro-radiobutton">
                                <input type="radio" value="3" name="type"
                                       id="radio3"
                                       key="radio3"
                                       checked={formik.values.type === '3'}
                                       onChange={formik.handleChange}/>
                                <span>Большие часы </span>
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Выбрать мастера</button>
                </form>
            </div>
        );
    }
)
export default withRouter(OrderForm);