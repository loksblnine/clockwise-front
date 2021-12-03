import React from 'react';
import {useFormik} from 'formik';
import {useHistory} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {login} from "../../../../http/userAPI";
import {useDispatch, useSelector} from "react-redux";

const validate = (values) => {
    const errors = {};
    if (!values.password) {
        errors.password = 'Пароль обязателен';
    } else if (values.password.length < 8) {
        errors.password = 'Короткий пароль';
    }
    if (!values.email) {
        errors.email = 'Адрес электронный почты обязателен';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Невалидный адрес электронной почты';
    }
    return errors;
};

const LoginForm = observer(() => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.users.user)
    const formik = useFormik({
        initialValues: {
            email: 'admin@example.com',
            password: 'passwordsecret',
        },
        validate,
        onSubmit: () => {
            login(formik.values.email, formik.values.password, dispatch, history)
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
                <div className="form-group">
                    <button type="submit" className="mt-5 btn btn-primary" disabled={user.isReady}>
                        Войти
                    </button>
                </div>
            </form>
        </div>
    )
        ;
})
export default LoginForm
