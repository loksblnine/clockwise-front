import "../../Assets/Styles/ManageProfile.css";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Moment from "moment";
import Alert from '@mui/material/Alert';
import {ThemeProvider} from '@mui/material/styles';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {EditUserSchema} from "../../Utils/ValidationSchemas";
import {ACTIONS, theme} from "../../Utils/constants";
import Header from "../../Layouts/Header/Header";
import Loading from "../../Layouts/Loading/Loading";
import {updateUserInfo, updateUserPhoto} from "../../Store/actions/userActions";
import {getClinicsList} from "../../Store/actions/clinicActions";
import {getSpecialtiesList} from "../../Store/actions/specialtyActions";
import {addDoctorSpecialty, removeDoctorSpecialty} from "../../Store/actions/doctorActions";

export default function ManageProfile() {
    const [matches, setMatches] = useState(
        window.matchMedia("(max-width: 1200px)").matches
    );
    const [showAlert, setShowAlert] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userReducer.user);
    const {message} = useSelector(state => state.messageReducer);
    const clinicsList = useSelector(state => state.clinicReducer.items);
    const specialtiesList = useSelector(state => state.specialtyReducer.items);
    const isClinicsReady = useSelector(state => state.clinicReducer.isReady);
    const isSpecialtiesReady = useSelector(state => state.specialtyReducer.isReady);

    const {firstName, lastName, location, telephone, email, birth_date, photo_url, role} = userInfo;
    const primarySpecialty = userInfo?.doctor?.specialty_id_specialties.find(item => item?.SpecialtyToDoctor?.is_main);
    const secondarySpecialty = userInfo?.doctor?.specialty_id_specialties.find(item => !item?.SpecialtyToDoctor?.is_main);
    const formatDate = Moment(new Date(birth_date)).format("DD/MM/YYYY");

    useEffect(() => {
        window
            .matchMedia("(max-width: 1200px)")
            .addEventListener('change', e => setMatches(e.matches));

        if (message) {
            setShowAlert(true);

            setTimeout(() => {
                setShowAlert(false);
                dispatch({
                    type: ACTIONS.MESSAGE.SET_MESSAGE,
                    payload: null
                })
            }, 2000);
        }
    });

    useEffect(() => {
        if (!isClinicsReady) {
            dispatch(getClinicsList());
        }
        if (!isSpecialtiesReady) {
            dispatch(getSpecialtiesList());
        }
    }, []);

    const forgotPw = () => {
        dispatch({type: ACTIONS.USER.LOG_OUT});
        navigate("/reset/password");
    };

    if (!userInfo.firstName) {
        return <Loading/>;
    }

    return (
        <>
            <Header/>
            <main>
                <section className="sect">
                    {showAlert ?
                        <ThemeProvider theme={theme}>
                            <Alert variant="outlined" severity="success" id="alert">{message}</Alert>
                        </ThemeProvider>
                        :
                        null
                    }
                    <h1>Manage Profile</h1>
                    <div className="manage-img">
                        <img className="manage-avatar" alt="avatar"
                             src={!photo_url ?
                                 "https://res.cloudinary.com/loksblnine/image/upload/v1663757535/PatientApp/assets_front/default_avatar_l8zadl.svg"
                                 :
                                 photo_url
                             }
                        />
                        <label htmlFor="files" className={"manage-upload_file"}/>
                        <input
                            name="attachment"
                            type="file"
                            id="files"
                            accept="image/*"
                            hidden
                            onChange={(e) => {
                                const reader = new FileReader();
                                reader.readAsDataURL(e.target.files[0]);
                                reader.onloadend = () => {
                                    dispatch(updateUserPhoto(reader.result))
                                };
                            }}
                        />
                    </div>
                    <div className="manage-form">
                        <Formik
                            initialValues={{
                                first_name: firstName,
                                last_name: lastName,
                                birthDate: formatDate,
                                primarySpecialty: primarySpecialty?.id,
                                secondarySpecialty: secondarySpecialty?.id || "",
                                clinic: userInfo?.doctor?.clinic_id_clinics_clinicToDoctors[0].id,
                                location: location,
                                telephone: telephone,
                                email: email
                            }}
                            validationSchema={EditUserSchema}
                            onSubmit={(values) => {
                                const {
                                    first_name,
                                    last_name,
                                    birthDate,
                                    location,
                                    telephone
                                } = values;
                                dispatch(updateUserInfo(
                                    userInfo.id,
                                    first_name,
                                    last_name,
                                    birthDate,
                                    location,
                                    telephone,
                                    primarySpecialty?.id,
                                    values.primarySpecialty,
                                    secondarySpecialty?.id,
                                    values.secondarySpecialty,
                                    role
                                ));
                            }}
                        >
                            {() => (
                                <Form className="manage-form-col">
                                    <h2>{`${firstName} ${lastName}`}</h2>
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
                                            placeholder="DD/MM/YYYY"
                                            style={matches ? {maxWidth: "unset"} : {maxWidth: "500px"}}
                                        />
                                        <span className="error">
                                            <ErrorMessage name="birthDate"/>
                                        </span>
                                    </div>
                                    {role === 3 ?
                                        <>
                                            <div className="input-container">
                                                <label>Primary Specialty</label>
                                                <Field as="select" name="primarySpecialty">
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
                                                    <option value="-1"/>
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
                                        </>
                                        :
                                        null
                                    }
                                    {role !== 1 ?
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
                                        :
                                        null
                                    }
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
                                            maxLength="40" required disabled
                                            style={matches ? {maxWidth: "unset"} : {maxWidth: "500px"}}
                                        />
                                        <img alt="show_pw"
                                             src="https://res.cloudinary.com/loksblnine/image/upload/v1666939698/PatientApp/assets_front/disabled_input_pxhxmp.svg"
                                             className="auth-password_img"
                                        />
                                        <span className="error">
                                            <ErrorMessage name="email"/>
                                        </span>
                                    </div>
                                    <p className="link" onClick={forgotPw}>Forgot password</p>
                                    <div className="button-container manage-btn">
                                        <input type="submit" value="Save Changes" className="input-submit"/>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </section>
            </main>
        </>
    );
}
