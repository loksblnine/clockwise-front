import React, {useContext} from 'react';
import {useFormik} from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Context} from "../../../../index";
import {useHistory} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {login} from "../../../../http/userAPI";

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
        const {user} = useContext(Context)
        const history = useHistory()
        const formik = useFormik({
            initialValues: {
                email: '',
                password: '',
            },
            validate,
            onSubmit:  async (values) => {
                try {
                    const resp = await login(formik.values.email, formik.values.password)
                    const token = localStorage.getItem('token')
                    if (token) {
                        user.setUser(user)
                        user.setIsAuth(true)
                        history.push('/access_succeed')
                    }
                } catch (e) {
                    alert(e.response.data.message)
                }

            }
        })
        const loginPageStyle = {
            margin: "32px auto 37px",
            maxWidth: "40%",
            background: "#fff",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.15)",
            fontWeight: 500
        };

        return (
            <div style={loginPageStyle}>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="Пароль"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <Button color="primary" variant="contained" fullWidth type="submit" className={"mt-5"}>
                        Войти
                    </Button>
                </form>
            </div>
        );
    }
)
export default LoginForm