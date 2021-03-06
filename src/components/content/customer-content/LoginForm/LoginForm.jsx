import React, {useState} from 'react';
import {useFormik} from 'formik';
import {Redirect, useHistory, withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {LinkContainer} from "react-router-bootstrap";
import {toast} from "react-toastify";

import {setUser} from "../../../../store/actions/userActions";

import {GOOGLE_SVG} from "../../../../utils/svg_constants";
import {PATH, SERVER_URL} from "../../../../utils/constants";

const validate = (values) => {
    const errors = {};
    if (!values.password) {
        errors.password = 'Пароль обязателен';
    } else if (values.password.length < 8) {
        errors.password = 'Короткий пароль';
    }
    if (!values.email) {
        errors.email = 'Адрес электронный почты обязателен';
    } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z]+\.[A-Za-z]+/i.test(values.email)) {
        errors.email = 'Невалидный адрес электронной почты';
    }
    return errors;
};

const LoginForm = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [type, setType] = useState('password')
    const user = useSelector(state => state.users.user)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
        onSubmit: async () => {
            try {
                dispatch(setUser(formik.values.email, formik.values.password, history))
            } catch (e) {
                toast("Проверьте логин или пароль")
            }
        }
    })
    const loginPageStyle = {
        margin: "32px auto 37px",
        maxWidth: "50%",
        background: "#fff",
        padding: "50px",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.15)",
    };
    if (user.role > 1) {
        return <Redirect to={PATH[user.role]}/>
    }
    return (
        <div style={loginPageStyle}>
            <form onSubmit={formik.handleSubmit} className="form">
                <div className="form-group">
                    <label className="text" htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        className="form-control"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
                </div>
                <div className="form-group">
                    <label className="text" htmlFor="password">Пароль</label>
                    <input
                        id="password"
                        name="password"
                        className="form-control"
                        type={type}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    <span
                        style={{cursor: "pointer"}}
                        onClick={(e) => {
                            e.preventDefault()
                            if (type !== 'text') {
                                setType('text')
                            } else {
                                setType('password')
                            }
                        }}>
                        {
                            type === 'password' ?
                                <img src="https://img.icons8.com/ios-filled/20/000000/closed-eye.png"/> :
                                <img src="https://img.icons8.com/ios-glyphs/20/000000/visible--v1.png"/>
                        }
                        &nbsp;
                        {
                            type === 'password' ?
                                "Посмотреть пароль" :
                                "Скрыть пароль"
                        }
                    </span>

                    {formik.errors.password ? <div className="error">{formik.errors.password}</div> : null}
                </div>
                <div className="form-group form-group-inline">
                    <button type="submit" className="btn btn-primary" disabled={user.isReady}>
                        Войти
                    </button>
                    <LinkContainer to='/registration'>
                        <button className="btn btn-primary-outline">Нет аккаунта? Зарегистрируйтесь!</button>
                    </LinkContainer>
                    <div className="d-flex p-2 mt-3 d-flex justify-content-around">
                        <button className="btn btn-primary-outline m-2 border-primary"
                                onClick={(e) => {
                                    e.preventDefault()
                                    window.location = `${SERVER_URL}/auth/google`
                                }}
                        >Войдите используя учетную запись &nbsp; {GOOGLE_SVG}

                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default withRouter(LoginForm)
