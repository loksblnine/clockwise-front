import React from 'react';
import {useFormik} from 'formik';
import {useHistory} from "react-router-dom";
import {registration} from "../../../../http/userAPI";
import {LinkContainer} from "react-router-bootstrap";

const validate = (values) => {
    const errors = {};
    if (!values.password) {
        errors.password = 'Пароль обязателен';
    } else if (values.password.length < 8) {
        errors.password = 'Короткий пароль';
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = 'Подтверждение пароля обязательно';
    } else if (values.confirmPassword.length < 8) {
        errors.confirmPassword = 'Короткий пароль';
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Пароли не совпадают'
    }
    if (!values.email) {
        errors.email = 'Адрес электронный почты обязателен';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Невалидный адрес электронной почты';
    }
    if (values.isAgreed === false) {
        errors.isAgreed = 'Соглашайся)'
    }
    return errors;
};

const RegistrationForm = () => {
    const history = useHistory()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            isMaster: false,
            isAgreed: false
        },
        validate,
        onSubmit: async () => {
            await registration(formik.values.email, formik.values.password, formik.values.isMaster === true ? 2 : 3)
            history.push('/registration_success', formik.values)
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
                    <label className="text" htmlFor="password">Подтвердите пароль</label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        className="form-control"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.confirmPassword ?
                        <div className="error">{formik.errors.confirmPassword}</div> : null}
                </div>

                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="agree-check" required
                           checked={formik.values.isAgreed}
                           onClick={() => formik.values.isAgreed = !formik.values.isAgreed}
                           onChange={formik.handleChange}
                    />
                    <p>Я принимаю условия&nbsp;
                        <a className="primary-link" data-toggle="modal" data-target="#show-agreement">Пользовательского
                            соглашения</a>
                    </p>
                    <input type="checkbox" className="form-check-input" id="master-check"
                           checked={formik.values.isMaster}
                           onClick={() => formik.values.isMaster = !formik.values.isMaster}
                           onChange={formik.handleChange}/>
                    <p>Хочу работать мастером и жду контракт на почту <a className="text">~</a>
                    </p>
                </div>

                <div className="form-group form-group-inline mt-5">
                    <button type="submit" className="btn btn-primary"
                            disabled={!formik.values.isAgreed || formik.errors.hasOwnProperty('password') || formik.errors.hasOwnProperty('confirmPassword')}>
                        Регистрация
                    </button>
                    <LinkContainer to='/login'>
                        <button className="btn btn-primary-outline">Есть аккаунт? Войдите!</button>
                    </LinkContainer>
                </div>
            </form>
            <div className="modal fade" id="show-agreement" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content"><p>Черным по белому - Честное предложение =) </p></div>
                </div>
            </div>
        </div>
    )
}
export default RegistrationForm
