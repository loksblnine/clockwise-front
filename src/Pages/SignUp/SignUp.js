import "../../Assets/Styles/Login.css";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Formik, Form, Field, ErrorMessage} from "formik";
import {SignInSchema} from "../../Utils/ValidationSchemas";
import {signUp} from "../../Store/actions/userActions";
import {getClinicsList} from "../../Store/actions/clinicActions";
import {getSpecialtiesList} from "../../Store/actions/specialtyActions";

export default function SignUp() {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const user_id = useSelector(state => state.userReducer.user.id);
    const clinicsList = useSelector(state => state.clinicReducer.items);
    const specialtiesList = useSelector(state => state.specialtyReducer.items);

    const [passwordType, setPasswordType] = useState("password");
    const [confirmPasswordType, setConfirmPasswordType] = useState("password");
    const [matches, setMatches] = useState(
        window.matchMedia("(max-width: 980px)").matches
    );

    useEffect(() => {
        window
            .matchMedia("(max-width: 980px)")
            .addEventListener('change', e => setMatches(e.matches));

        dispatch(getClinicsList());
        dispatch(getSpecialtiesList());
    }, []);

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    };

    const toggleConfirmPassword = () => {
        if (confirmPasswordType === "password") {
            setConfirmPasswordType("text")
            return;
        }
        setConfirmPasswordType("password")
    };

    if (user_id) {
        return navigate("/");
    }

    return (
        <main className="auth" style={matches ? {flexDirection: "column"} : {flexDirection: "row"}}>
            <div className="starting-logo"
                 style={
                     matches ?
                         {width: "unset", maxWidth: "unset"}
                         :
                         {height: "unset", minHeight: "100vh", width: "100%"}
                 }
            >
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
                             padding: "40px 86px",
                             boxSizing: "unset",
                             alignSelf: "unset"
                         }}
            >
                <h1 className="auth-heading">Sign up with your email</h1>
                <Formik
                    initialValues={{
                        first_name: "",
                        last_name: "",
                        birthDate: "",
                        primarySpecialty: "",
                        secondarySpecialty: "",
                        clinic: "",
                        location: "",
                        telephone: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                        checkmark: false
                    }}
                    validationSchema={SignInSchema}
                    onSubmit={(values) => {
                        const {
                            role,
                        } = values;
                        dispatch(
                            signUp(
                                values,
                                role,
                                navigate
                            )
                        )
                    }}
                >
                    {({values}) => (
                        <Form>
                            <div className="input-container">
                                <label>First Name</label>
                                <Field
                                    type="text"
                                    name="first_name"
                                    maxLength="30" required
                                    style={matches ? {maxWidth: "unset"} : {maxWidth: "500px"}}
                                />
                                <span className="error">
                                    <ErrorMessage name="first_name"/>
                                </span>
                            </div>
                            <div className="input-container">
                                <label>Last Name</label>
                                <Field
                                    type="text"
                                    name="last_name"
                                    maxLength="30" required
                                    style={matches ? {maxWidth: "unset"} : {maxWidth: "500px"}}
                                />
                                <span className="error">
                                    <ErrorMessage name="last_name"/>
                                </span>
                            </div>
                            <div className="input-container">
                                <label>Birth date</label>
                                <Field
                                    type="text"
                                    name="birthDate"
                                    maxLength="10" required
                                    placeholder="MM/DD/YYYY"
                                    style={matches ? {maxWidth: "unset"} : {maxWidth: "500px"}}
                                />
                                <span className="error">
                                    <ErrorMessage name="birthDate"/>
                                </span>
                            </div>
                            <div className="input-container">
                                <label>Role</label>
                                <Field as="select" name="role">
                                    <option selected hidden/>
                                    <option value="2">Manager</option>
                                    <option value="3">Doctor</option>
                                </Field>
                                <span className="error">
                                    <ErrorMessage name="role"/>
                                </span>
                            </div>
                            <div className="input-container">
                                <label>Primary Specialty</label>
                                <Field as="select" name="primarySpecialty">
                                    <option selected hidden/>
                                    {specialtiesList.map(item =>
                                        <option
                                            value={item.id}
                                            key={`${item.id}${item.description}`}
                                        >
                                            {item.description}
                                        </option>
                                    )}
                                </Field>
                                <span className="error">
                                    <ErrorMessage name="primarySpecialty"/>
                                </span>
                            </div>
                            <div className="input-container">
                                <label>Secondary Specialty</label>
                                <Field as="select" name="secondarySpecialty">
                                    <option selected hidden/>
                                    {specialtiesList.map(item =>
                                        <option
                                            value={item.id}
                                            key={`${item.id}${item.description}`}
                                        >
                                            {item.description}
                                        </option>
                                    )}
                                </Field>
                                <span className="error">
                                    <ErrorMessage name="secondarySpecialty"/>
                                </span>
                            </div>
                            <div className="input-container">
                                <label>Clinic</label>
                                <Field as="select" name="clinic">
                                    <option selected hidden/>
                                    {clinicsList.map(item =>
                                        <option value={item.id} key={`${item.id}${item.name}`}>
                                            {item.name}
                                        </option>
                                    )}
                                </Field>
                                <span className="error">
                                    <ErrorMessage name="clinic"/>
                                </span>
                            </div>
                            <div className="input-container">
                                <label>Postal Code</label>
                                <Field
                                    type="text"
                                    name="location"
                                    maxLength="10" required
                                    style={matches ? {maxWidth: "unset"} : {maxWidth: "500px"}}
                                />
                                <span className="error">
                                    <ErrorMessage name="location"/>
                                </span>
                            </div>
                            <div className="input-container">
                                <label>Telephone</label>
                                <Field
                                    type="tel"
                                    name="telephone"
                                    placeholder="+49 888 888 88 88"
                                    maxLength="20" required
                                    style={matches ? {maxWidth: "unset"} : {maxWidth: "500px"}}
                                />
                                <span className="error">
                                    <ErrorMessage name="telephone"/>
                                </span>
                            </div>
                            <div className="input-container">
                                <label>Email</label>
                                <Field
                                    type="text"
                                    name="email"
                                    maxLength="40" required
                                    style={matches ? {maxWidth: "unset"} : {maxWidth: "500px"}}
                                />
                                <span className="error">
                                    <ErrorMessage name="email"/>
                                </span>
                            </div>
                            <div className="input-container">
                                <label>Password</label>
                                <Field
                                    type={passwordType}
                                    name="password"
                                    maxLength="40" required
                                    style={matches ? {maxWidth: "unset"} : {maxWidth: "500px"}}
                                />
                                <img alt="show_pw"
                                     src="https://res.cloudinary.com/loksblnine/image/upload/v1663757663/PatientApp/assets_front/view_password_cbpq1d.svg"
                                     className="auth-password_img" onClick={togglePassword}/>
                                <span className="error">
                                    <ErrorMessage name="password"/>
                                </span>
                            </div>
                            <div className="input-container">
                                <label>Confirm Password</label>
                                <Field
                                    type={confirmPasswordType}
                                    name="confirmPassword"
                                    maxLength="40" required
                                    style={matches ? {maxWidth: "unset"} : {maxWidth: "500px"}}
                                />
                                <img alt="show_pw"
                                     src="https://res.cloudinary.com/loksblnine/image/upload/v1663757663/PatientApp/assets_front/view_password_cbpq1d.svg"
                                     className="auth-password_img" onClick={toggleConfirmPassword}/>
                                <span className="error">
                                    <ErrorMessage name="confirmPassword"/>
                                </span>
                            </div>
                            <div className="input-container">
                                <label className="auth-checkbox">
                                    <Field type="checkbox" name="checkmark"/>
                                    <span className="checkmark"/>
                                </label>
                                <p className="auth-agree">I agree to the <Link to="#">Terms of Service</Link>{` and `}
                                    <Link to="#">Privacy Policy</Link></p>
                                <span className="error">
                                    <ErrorMessage name="checkmark"/>
                                </span>
                            </div>
                            <div className="button-container">
                                <button
                                    className="auth-btn"
                                    type="submit"
                                    disabled={!values.checkmark}
                                >
                                    Create Account
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </section>
        </main>
    );
}
