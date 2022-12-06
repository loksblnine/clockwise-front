import "../../Assets/Styles/ManageProfile.css";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Formik, Form, Field, ErrorMessage} from "formik";
import {DoctorsSignInSchema} from "../../Utils/ValidationSchemas";
import Header from "../../Layouts/Header/Header";
import Loading from "../../Layouts/Loading/Loading";
import {getClinicsList} from "../../Store/actions/clinicActions";
import {getSpecialtiesList} from "../../Store/actions/specialtyActions";
import {registerDoctor} from "../../Store/actions/doctorActions";

export default function AddDoctor() {
    const dispatch = useDispatch();

    const {role} = useSelector(state => state.userReducer.user);
    const clinicsList = useSelector(state => state.clinicReducer.items);
    const specialtiesList = useSelector(state => state.specialtyReducer.items);
    const managerClinic = useSelector(state => state.userReducer.user?.clinic_id_clinics_managerToClinics);

    const [matches, setMatches] = useState(
        window.matchMedia("(max-width: 1200px)").matches
    );
    const [disableClinic, setDisableClinic] = useState(true);

    useEffect(() => {
        window
            .matchMedia("(max-width: 980px)")
            .addEventListener('change', e => setMatches(e.matches));

        dispatch(getClinicsList());
        dispatch(getSpecialtiesList());
    }, []);

    useEffect(() => {
        if (role === 1) {
            setDisableClinic(false)
        } else {
            setDisableClinic(true)
        }
    }, []);

    if (role !== 1 && !managerClinic) {
        return <Loading/>
    }

    return (
        <>
            <Header/>
            <main>
                <section className={"sect"}>
                    <h1>Add Doctor</h1>
                    <div className="manage-form">
                        <Formik
                            initialValues={{
                                first_name: "",
                                last_name: "",
                                birthDate: "",
                                primarySpecialty: "",
                                secondarySpecialty: "",
                                clinic: role === 1 ? "" : managerClinic[0]?.id,
                                location: "",
                                telephone: "",
                                email: "",
                            }}
                            validationSchema={DoctorsSignInSchema}
                            onSubmit={values => {
                                const data = {
                                    first_name: values.first_name,
                                    last_name: values.last_name,
                                    birthDate: values.birthDate,
                                    primarySpecialty: values.primarySpecialty,
                                    clinic: values.clinic,
                                    location: values.location,
                                    telephone: values.telephone,
                                    email: values.email,
                                };

                                if (values.secondarySpecialty === "") {
                                    dispatch(registerDoctor(data))
                                } else {
                                    dispatch(registerDoctor(values))
                                }
                            }}
                        >
                            {({values}) => (
                                <Form className="manage-form-col">
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
                                            placeholder="DD.MM.YYYY"
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
                                        <Field as="select" name="clinic" disabled={disableClinic}>
                                            {role === 1 ?
                                                <option value=""/>
                                                :
                                                null
                                            }
                                            {clinicsList.map(item =>
                                                <option value={item.id}
                                                        key={`${item.id}${item.name}`}>{item.name}</option>
                                            )}
                                        </Field>
                                        {role !== 1 ?
                                            <img alt="show_pw"
                                                 src="https://res.cloudinary.com/loksblnine/image/upload/v1666939698/PatientApp/assets_front/disabled_input_pxhxmp.svg"
                                                 className="auth-password_img"
                                            />
                                            :
                                            null
                                        }
                                        <span className="error">
                                            <ErrorMessage name="clinic"/>
                                        </span>
                                    </div>
                                    <div className="input-container">
                                        <label>Postal Code</label>
                                        <Field
                                            type="text"
                                            name="location"
                                            maxLength="5" required
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
                                    <div className="button-container manage-btn">
                                        <input type="submit" value="Create Account" className="input-submit"/>
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
