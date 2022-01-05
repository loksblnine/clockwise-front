import React from 'react';
import {useFormik} from 'formik';
import {useHistory, withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {LinkContainer} from "react-router-bootstrap";
import {setUser} from "../../../../store/actions/userActions";
import {toast} from "react-toastify";
import {SERVER_URL} from "../../../../utils/constants";

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
                        type="password"
                        className="form-control"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.password ? <div className="error">{formik.errors.password}</div> : null}
                </div>
                <div className="form-group form-group-inline">
                    <button type="submit" className="btn btn-primary" disabled={user.isReady}>
                        Войти
                    </button>
                    <LinkContainer to='/registration'>
                        <button className="btn btn-primary-outline">Нет аккаунта? Зарегистрируйтесь!</button>
                    </LinkContainer>
                    <div className="d-flex p-2">
                        <button className="btn btn-primary-outline m-2"
                                onClick={(e) => {
                                    e.preventDefault()
                                    window.location = `${SERVER_URL}/auth/google`
                                }}
                        >Войдите используя учетную запись &nbsp;
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-google" viewBox="0 0 16 16">
                                <path
                                    d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default withRouter(LoginForm)
