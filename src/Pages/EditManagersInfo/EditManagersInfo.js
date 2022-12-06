import "../../Assets/Styles/ManageProfile.css";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Modal from "react-bootstrap/Modal";
import Moment from "moment";
import {Formik, Form, Field, ErrorMessage} from "formik";
import {ManagerSignInSchema} from "../../Utils/ValidationSchemas";
import {getClinicsList} from "../../Store/actions/clinicActions";
import Header from "../../Layouts/Header/Header";
import Loading from "../../Layouts/Loading/Loading";
import {deleteUser, editManagerInfo, getManagerById, updateManagerPhoto} from "../../Store/actions/adminActions";
import ReactRoundedImage from "react-rounded-image";

export default function EditManagersInfo() {
    const {id} = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const managerInfo = useSelector(state => state.adminReducer.managerToEdit);
    const clinicsList = useSelector(state => state.clinicReducer.items);
    const isClinicsReady = useSelector(state => state.clinicReducer.isReady);

    const formatDate = Moment(new Date(managerInfo?.birth_date)).format("DD.MM.YYYY");

    const [matches, setMatches] = useState(
        window.matchMedia("(max-width: 1200px)").matches
    );
    const [show, setShow] = useState(false);

    useEffect(() => {
        window
            .matchMedia("(max-width: 1200px)")
            .addEventListener('change', e => setMatches(e.matches));
        if (!isClinicsReady) {
            dispatch(getClinicsList());
        }
    }, []);

    useEffect(() => {
        dispatch(getManagerById(id));
    }, []);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (!managerInfo) {
        return <Loading/>;
    }

    return (
        <>
            <Header/>
            <main>
                <section className="sect">
                    <h1>Manager Profile</h1>
                    <div className="manage-img">
                        <ReactRoundedImage
                            image={
                                !managerInfo?.photo_url ?
                                    "https://res.cloudinary.com/loksblnine/image/upload/v1663757535/PatientApp/assets_front/default_avatar_l8zadl.svg"
                                    :
                                    managerInfo?.photo_url
                            }
                            imageWidth="150"
                            imageHeight="150"
                            roundedSize="-3"
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
                                    dispatch(updateManagerPhoto(id, reader.result))
                                }
                            }}
                        />
                    </div>
                    <div className="manage-form">
                        <Formik
                            initialValues={{
                                first_name: managerInfo?.firstName,
                                last_name: managerInfo?.lastName,
                                birthDate: formatDate,
                                clinic: managerInfo?.clinic_id,
                                location: managerInfo?.location,
                                telephone: managerInfo?.telephone,
                                email: managerInfo?.email
                            }}
                            validationSchema={ManagerSignInSchema}
                            onSubmit={values => {
                                dispatch(editManagerInfo(values, id));
                            }}
                        >
                            {() => (
                                <Form className="manage-form-col">
                                    <h2>{`${managerInfo?.firstName} ${managerInfo?.lastName}`}</h2>
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
                                        <input type="submit" value="Save Changes" className="input-submit"/>
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
                            dispatch(deleteUser(id, navigate))
                        }}>
                            Delete
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        </>
    );
}
