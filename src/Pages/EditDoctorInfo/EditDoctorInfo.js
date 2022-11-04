import "../../Assets/Styles/ManageProfile.css";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Modal from "react-bootstrap/Modal";
import Moment from "moment";
import Alert from '@mui/material/Alert';
import {ThemeProvider} from '@mui/material/styles';
import {Formik, Form, Field, ErrorMessage} from "formik";
import {EditUserSchema} from "../../Utils/ValidationSchemas";
import Header from "../../Layouts/Header/Header";
import {deleteDoctor, editDoctorInfo, getDoctorById, updateDoctorPhoto} from "../../Store/actions/doctorActions";
import {getClinicsList} from "../../Store/actions/clinicActions";
import {getSpecialtiesList} from "../../Store/actions/specialtyActions";
import {ACTIONS, theme} from "../../Utils/constants";

export default function EditDoctorInfo() {
    const {id} = useParams();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const doctorInfo = useSelector(state => state.doctorReducer.doctorToEdit);
    const clinicsList = useSelector(state => state.clinicReducer.items);
    const specialtiesList = useSelector(state => state.specialtyReducer.items);
    const {message} = useSelector(state => state.messageReducer);

    const formatDate = Moment(new Date(doctorInfo?.user.birth_date)).format("MM/DD/YYYY");

    const primarySpecialty = doctorInfo?.specialtyToDoctors.find(item => item.is_main);
    const secondarySpecialty = doctorInfo?.specialtyToDoctors.filter(item => !item.is_main);

    const [matches, setMatches] = useState(
        window.matchMedia("(max-width: 1200px)").matches
    );
    const [show, setShow] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        window
            .matchMedia("(max-width: 1200px)")
            .addEventListener('change', e => setMatches(e.matches));

        dispatch(getClinicsList());
        dispatch(getSpecialtiesList());
    }, []);

    useEffect(() => {
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
    })

    useEffect(() => {
        dispatch(getDoctorById(id));
    }, [id]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (!doctorInfo?.user.birth_date || !secondarySpecialty) {
        return <></>;
    }

    console.log(doctorInfo)

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
                    <h1>Doctor Profile</h1>
                    <div className="manage-img">
                        <img className="manage-avatar" alt="avatar"
                             src={!doctorInfo?.user.photo_url ?
                                 "https://res.cloudinary.com/loksblnine/image/upload/v1663757535/PatientApp/assets_front/default_avatar_l8zadl.svg"
                                 :
                                 doctorInfo?.user.photo_url
                             }
                        />
                        <label htmlFor="files" className="manage-upload_file"/>
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
                                    dispatch(updateDoctorPhoto(doctorInfo?.user_id, reader.result))
                                }
                            }}
                        />
                    </div>
                    <div className="manage-form">
                        <Formik
                            initialValues={{
                                first_name: doctorInfo?.user.firstName,
                                last_name: doctorInfo?.user.lastName,
                                birthDate: formatDate,
                                primarySpecialty: primarySpecialty?.id,
                                secondarySpecialty: secondarySpecialty[0]?.id,
                                clinic: doctorInfo?.clinicToDoctors?.clinic_id,
                                location: doctorInfo?.user.location,
                                telephone: doctorInfo?.user.telephone,
                                email: doctorInfo?.user.email
                            }}
                            validationSchema={EditUserSchema}
                            onSubmit={values => {
                                dispatch(editDoctorInfo(values, id))
                            }}
                        >
                            {() => (
                                <Form className="manage-form-col">
                                    <h2>{`${doctorInfo?.user.firstName} ${doctorInfo?.user.lastName}`}</h2>
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
                                        <Field as="select" name="clinic" disabled>
                                            {clinicsList.map(item =>
                                                <option
                                                    value={item.id}
                                                    key={`${item.id}${item.name}`}
                                                >
                                                    {item.name}
                                                </option>
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
                                    <div className="button-container manage-btn">
                                        <input type="submit" value="Save Changes"/>
                                    </div>
                                    <p
                                        className="warning-btn form-btn"
                                        onClick={() => handleShow()}
                                    >
                                        Delete Account
                                    </p>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </section>
            </main>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <div className="modal-approve-heading">Delete Account?</div>
                    <div>Are you sure you want to delete doctor`s account?</div>
                    <div className="modal-btns">
                        <div className="modal-approve-btn" onClick={handleClose}>Cancel</div>
                        <div className="modal-delete-btn" onClick={() => {
                            dispatch(deleteDoctor(id, handleClose, navigate))
                        }}>
                            Delete
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        </>
    );
}
