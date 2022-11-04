import "../../Assets/Styles/Login.css";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Formik, Form, Field, ErrorMessage} from "formik";
import {ResetPasswordSchema} from "../../Utils/ValidationSchemas";
import {sendRecoverPwEmail} from "../../Store/actions/userActions";

export default function ResetPassword() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [matches, setMatches] = useState(
        window.matchMedia("(max-width: 980px)").matches
    );

    useEffect(() => {
        window
            .matchMedia("(max-width: 980px)")
            .addEventListener('change', e => setMatches(e.matches));
    })

    return (
        <main className="auth" style={matches ? {flexDirection: "column"} : {flexDirection: "row"}}>
            <div className="starting-logo" style={matches ? {width: "unset", maxWidth: "unset"} : {width: "100%"}}>
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
                         } :
                         {
                             padding: "0 86px",
                             boxSizing: "unset",
                             alignSelf: "unset"
                         }}
            >
                <h1 className="auth-heading">Please enter your email</h1>
                <Formik
                    initialValues={{
                        email: ""
                    }}
                    validationSchema={ResetPasswordSchema}
                    onSubmit={values => {
                        dispatch(sendRecoverPwEmail(values.email, navigate))
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
                            <div className="button-container">
                                <input type="submit" value="Recover"/>
                            </div>
                        </Form>
                    )}
                </Formik>
            </section>
        </main>
    );
}
