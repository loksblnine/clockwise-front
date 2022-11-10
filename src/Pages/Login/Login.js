import "../../Assets/Styles/Login.css";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Alert from '@mui/material/Alert';
import {ThemeProvider} from '@mui/material/styles';
import {Formik, Form, Field, ErrorMessage} from "formik";
import {ACTIONS, theme} from "../../Utils/constants";
import {SignupSchema} from "../../Utils/ValidationSchemas";
import {login} from "../../Store/actions/userActions";

export default function Login() {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const user_id = useSelector(state => state.userReducer.user.id);
    const {error} = useSelector(state => state.messageReducer);

    const [passwordType, setPasswordType] = useState("password");
    const [matches, setMatches] = useState(
        window.matchMedia("(max-width: 980px)").matches
    );

    const handleRememberMe = (e) => {
        localStorage.setItem("rememberMe", e.target.checked);
    };

    const [showAlert, setShowAlert] = useState(false);
    useEffect(() => {
        window
            .matchMedia("(max-width: 980px)")
            .addEventListener('change', e => setMatches(e.matches));

        if (error) {
            setShowAlert(true);

            setTimeout(() => {
                setShowAlert(false);
                dispatch({
                    type: ACTIONS.MESSAGE.SET_ERROR,
                    payload: null
                });
            }, 2000);
        }
    });

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text");
            return;
        }
        setPasswordType("password");
    };

    if (user_id) {
        return navigate("/");
    }

    return (
        <main className="auth" style={matches ? {flexDirection: "column"} : {flexDirection: "row"}}>
            <div className="starting-logo"
                 style={matches ? {width: "unset", maxWidth: "unset"} : {width: "100%"}}>
                <img alt="starting_logo"
                     src="https://res.cloudinary.com/loksblnine/image/upload/v1663757537/PatientApp/assets_front/starting_logo_igdmno.svg"
                />
            </div>
            <section className="auth-sect"
                     style={matches ?
                         {
                             padding: "40px",
                             boxSizing: "border-box",
                             alignSelf: "center"
                         }
                         :
                         {
                             padding: "0 86px",
                             boxSizing: "unset",
                             alignSelf: "unset"
                         }}
            >
                <h1 className="auth-heading">Welcome to Patient App</h1>
                <Formik
                    initialValues={{
                        email: "",
                        password: ""
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={(values) => {
                        const {email, password} = values;
                        dispatch(login(email, password, navigate));
                    }}
                >
                    {() => (
                        <Form>
                            <div className="input-container">
                                <label>Email</label>
                                <Field type="text" name="email" maxLength="40" required
                                       style={matches ? {maxWidth: "unset"} : {maxWidth: "500px"}}/>
                                <span className="error">
                                    <ErrorMessage name="email"/>
                                </span>
                            </div>
                            <div className="input-container">
                                <label>Password</label>
                                <Field type={passwordType} name="password" maxLength="40" required
                                       style={matches ? {maxWidth: "unset"} : {maxWidth: "500px"}}/>
                                <img alt="show_pw"
                                     src="https://res.cloudinary.com/loksblnine/image/upload/v1663757663/PatientApp/assets_front/view_password_cbpq1d.svg"
                                     className="auth-password_img" onClick={togglePassword}
                                />
                                <span className="error">
                                    <ErrorMessage name="password"/>
                                </span>
                            </div>
                            {showAlert ?
                                <ThemeProvider theme={theme}>
                                    <Alert variant="outlined" severity="error" id="alert">{error}</Alert>
                                </ThemeProvider>
                                :
                                null
                            }
                            <div className="input-container auth-items">
                                <label className="auth-checkbox">
                                    Remember me
                                    <input type="checkbox" name="remember_me" onClick={(e) => handleRememberMe(e)}/>
                                    <span className="checkmark"/>
                                </label>
                                <Link to="/reset/password">Forgot password</Link>
                            </div>
                            <div className="button-container">
                                <input type="submit" value="Sign in"/>
                            </div>
                        </Form>
                    )}
                </Formik>
            </section>
        </main>
    );
}
