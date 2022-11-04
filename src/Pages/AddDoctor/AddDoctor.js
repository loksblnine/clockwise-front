import "../../Assets/Styles/ManageProfile.css";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Formik, Form, Field, ErrorMessage} from "formik";
import {DoctorsSignInSchema} from "../../Utils/ValidationSchemas";
import Header from "../../Layouts/Header/Header";
import {signUp} from "../../Store/actions/userActions";
import {getClinicsList} from "../../Store/actions/clinicActions";
import {getSpecialtiesList} from "../../Store/actions/specialtyActions";

export default function AddDoctor() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const clinicsList = useSelector(state => state.clinicReducer.items);
    const specialtiesList = useSelector(state => state.specialtyReducer.items);
    const managerClinic = useSelector(state => state.userReducer.user?.clinic_id_clinics_managerToClinics);

    const [matches, setMatches] = useState(
        window.matchMedia("(max-width: 1200px)").matches
    );
    const [passwordType, setPasswordType] = useState("password");
    const [confirmPasswordType, setConfirmPasswordType] = useState("password");

    useEffect(() => {
        window
            .matchMedia("(max-width: 980px)")
            .addEventListener('change', e => setMatches(e.matches));

        dispatch(getClinicsList());
        dispatch(getSpecialtiesList());
    }, []);


    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text");
            return;
        }
        setPasswordType("password");
    };

    const toggleConfirmPassword = () => {
        if (confirmPasswordType === "password") {
            setConfirmPasswordType("text");
            return;
        }
        setConfirmPasswordType("password");
    };

    if (!managerClinic) {
        return <></>
    }

    return (
        <>
            <Header/>
            <main>
                <section className={"sect"}>
                    <h1>Add Doctor</h1>
                    <div className={"manage-form"}>
                        <Formik
                            initialValues={{
                                first_name: "",
                                last_name: "",
                                birthDate: "",
                                primarySpecialty: "",
                                secondarySpecialty: "",
                                clinic: managerClinic[0]?.id,
                                location: "",
                                telephone: "",
                                email: "",
                                password: "",
                                confirmPassword: "",
                                checkmark: false
                            }}
                            validationSchema={DoctorsSignInSchema}
                            onSubmit={values => {
                                dispatch(
                                    signUp(
                                        values,
                                        3,
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
                                        <label>Primary Specialty</label>
                                        <Field as="select" name="primarySpecialty">
                                            <option value="" hidden/>
                                            {specialtiesList.map(item =>
                                                <option value={item.id}
                                                        key={`${item.id}${item.description}`}>{item.description}</option>
                                            )}
                                        </Field>
                                        <span className="error">
                                            <ErrorMessage name="primarySpecialty"/>
                                        </span>
                                    </div>
                                    <div className="input-container">
                                        <label>Secondary Specialty</label>
                                        <Field as="select" name="secondarySpecialty">
                                            <option value="" hidden/>
                                            {specialtiesList.map(item =>
                                                <option value={item.id}
                                                        key={`${item.id}${item.description}`}>{item.description}</option>
                                            )}
                                        </Field>
                                        <span className="error">
                                            <ErrorMessage name="secondarySpecialty"/>
                                        </span>
                                    </div>
                                    <div className="input-container">
                                        <label>Clinic</label>
                                        <Field as="select" name="clinic" disabled>
                                            {clinicsList.map(item =>
                                                <option value={item.id}
                                                        key={`${item.id}${item.name}`}>{item.name}</option>
                                            )}
                                        </Field>
                                        <img alt="show_pw"
                                             src="https://res.cloudinary.com/loksblnine/image/upload/v1666939698/PatientApp/assets_front/disabled_input_pxhxmp.svg"
                                             className="auth-password_img"
                                        />
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
                                            pattern="^[+]{1}[0-9]{2} [0-9]{3} [0-9]{3} [0-9]{2} [0-9]{2}$"
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
                                        <p className="auth-agree">
                                            I agree to the <Link to="#">Terms of Service</Link>
                                            {` and `}<Link to="#">Privacy Policy</Link>
                                        </p>
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
                    </div>
                </section>
            </main>
        </>
    )
}
