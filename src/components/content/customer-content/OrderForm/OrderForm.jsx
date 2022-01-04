import React, {useCallback, useEffect, useMemo} from 'react';
import {useFormik} from 'formik';
import * as constants from "../../../../utils/constants";
import {useHistory, useLocation, withRouter} from "react-router-dom";
import './OrderStyles.css'
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {Spinner} from "react-bootstrap";
import {setCities} from "../../../../store/actions/cityActions";
import {removePhoto, setPhotos} from "../../../../store/actions/userActions";
import santasHat from "../../../../images/santashat.png";

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
    if (values.time.split(":")[1] !== "00") {
        errors.time = 'Заказать ремонт можно только в целый час'
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
    margin: "5% 8%  auto 8%",
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.15)"
};

const OrderForm = () => {
    const history = useHistory()
    const location = useLocation()

    const cities = useSelector((state) => state.cities.items)
    const isReady = useSelector((state) => state.cities.isReady)
    const user = useSelector((state) => state.users.user)
    const data = useSelector((state) => state.users.data)
    const photo = useSelector((state) => state.users.photo)
    const isWinter = useSelector((state) => state.weather.letItSnow)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!isReady) {
            dispatch(setCities())
        }
    }, [dispatch, isReady])

    const handleChooseFile = useCallback((e) => {
        if (e?.target?.files[0]?.size < constants.ONE_MEGABYTE) {
            if (e.target?.files[0]?.type.split('/')[0] === "image") {
                const reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onloadend = () => {
                    if (photo.length <= 4) {
                        e.target.value = ""
                        dispatch(setPhotos(reader.result))
                    } else {
                        e.target.disabled = true
                    }
                };
            } else {
                toast.info("Только фотографии")
            }
        } else {
            toast.info("Файл неприлично много весит!")
        }
    }, [dispatch, photo.length])

    const handleRemovePhoto = useCallback((index) => {
        dispatch(removePhoto(index))
    }, [dispatch])
    const formik = useFormik({
        initialValues: useMemo(() => {
            return {
                name: location?.state?.data?.name || data?.customer?.customer_name || data?.master?.master_name || '',
                email: location?.state?.data?.email || user?.email || '',
                city: location?.state?.data?.city || -1,
                date: location?.state?.data?.date || constants.DATE_FROM,
                time: location?.state?.data?.time || "08:00",
                type: location?.state?.data?.type || "1",
            }
        }, []),
        validate,
        onSubmit: (values) => {
            history.push({
                pathname: '/masters_choosing',
                state: {data: values}
            })
        },
    });

    if (!isReady) {
        return <Spinner animation="grow"/>
    }
    return (
        <div>
            {isWinter &&
                <div className="hatStyles">
                    <img src={santasHat} alt="SANTA yo ho ho"/>
                </div>}
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
                            {cities?.map(city =>
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
                               pattern="([01]?[0-9]|2[0-3]):00" id="24h"
                               onChange={formik.handleChange}/>
                        {formik.errors.time ? <div className="error">{formik.errors.time}</div> : null}
                    </div>
                    <div className="form-group">
                        <label className="text" htmlFor="type"> Выберите тип поломки </label>
                        <div role="group" aria-labelledby="my-radio-group" className="radio-toolbar">
                            <label className="miro-radiobutton">
                                <input type="radio" value="1" name="type"
                                       id="radio1"
                                       key="radio1"
                                       checked={formik.values.type === "1"}
                                       onChange={formik.handleChange}/>
                                <span>Маленькие часы </span>
                            </label>
                            <label className="miro-radiobutton">
                                <input type="radio" value="2" name="type"
                                       id="radio2"
                                       key="radio2"
                                       checked={formik.values.type === "2"}
                                       onChange={formik.handleChange}/>
                                <span>Средние часы </span>
                            </label>
                            <label className="miro-radiobutton">
                                <input type="radio" value="3" name="type"
                                       id="radio3"
                                       key="radio3"
                                       checked={formik.values.type === "3"}
                                       onChange={formik.handleChange}/>
                                <span>Большие часы </span>
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Прикрепите фото</label> <p>Не более 1 МБ, не более 5 штук, только форматы фотографий</p>
                        <input type="file" className="form-control" onInput={e => handleChooseFile(e)}
                               onChange={formik.handleChange} onBlur={formik.handleChange}
                               id="file-input" key="file-input" disabled={photo.length >= 5}
                               accept="image/*"/>
                        <div className="row mb-5 w-60" key="show-preview">
                            {
                                photo?.length > 0 &&
                                photo.map((item, i) => {
                                    return (
                                        <div
                                            className={`d-flex align-items-start  col-md-3 m-3`}
                                            key={i}>
                                            <img
                                                src={item}
                                                alt="chosen"
                                                style={{height: '150px', width: '150px'}}
                                            />
                                            <button className="btn" type="button"
                                                    onClick={() => {
                                                        handleRemovePhoto(i)
                                                    }}
                                            >
                                                <span>&times;</span>
                                            </button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary"
                                disabled={formik.values.city === -1 || photo.length === 0}>Выбрать
                            мастера
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default withRouter(OrderForm);
