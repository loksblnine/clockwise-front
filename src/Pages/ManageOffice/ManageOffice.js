import "../../Assets/Styles/ManagePatient.css";
import "../../Assets/Styles/ManageOffice.css";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Header from "../../Layouts/Header/Header";
import ToggleSwitch from "../../Components/ToggleSwitch";
import {
    getAppointmentTypesList,
    getClinicAppointmentTypesList,
    updateClinicAppointmentTypesList
} from "../../Store/actions/clinicActions";
import {ACTIONS} from "../../Utils/constants";

export default function ManageOffice() {
    const {id} = useParams();

    const dispatch = useDispatch();

    const user = useSelector(state => state.userReducer.user);
    const userClinic = useSelector((state) => state.userReducer.user?.clinic_id_clinics_managerToClinics);
    const appointmentTypesList = useSelector((state) => state.clinicReducer.appointmentTypesList);
    const clinicsList = useSelector((state) => state.clinicReducer.items);
    const clinicAppointmentTypesList = useSelector((state) => state.clinicReducer.clinicAppointmentTypesList);

    const [clinicNameById, setClinicNameById] = useState(null);

    useEffect(() => {
        if (!appointmentTypesList.length) {
            dispatch(getAppointmentTypesList());
        }

        if (!clinicAppointmentTypesList.length && user.role !== 1) {
            dispatch(getClinicAppointmentTypesList(userClinic[0].id));
        }
    }, []);

    useEffect(() => {
        if (id && user.role === 1) {
            dispatch({
                type: ACTIONS.CLINIC.CLEAR_CLINIC_APPOINTMENT_TYPES_LIST
            });

            dispatch(getClinicAppointmentTypesList(id));
        }

        if (clinicsList.length && id) {
            const clinic = clinicsList.find(el => el.id === parseInt(id))
            setClinicNameById(clinic?.name);
        }
    }, [id]);

    const saveChanges = () => {
        if (user.role === 1) {
            dispatch(updateClinicAppointmentTypesList(id, clinicAppointmentTypesList));
        } else if (user.role !== 1) {
            dispatch(updateClinicAppointmentTypesList(userClinic[0].id, clinicAppointmentTypesList));
        }
    };

    return (
        <>
            <Header/>
            <main>
                <section className="sect manage-patient-sect">
                    <div className="manage-patient-heading manage-office-heading">
                        <h1>
                            {user.role === 1 ?
                                `Manage ${clinicNameById} Office`
                                :
                                "Manage Office"
                            }
                        </h1>
                        {/*<h3>On holiday</h3>*/}
                    </div>
                    {/*<div className="manage-patient-buttons">*/}
                    {/*    <div*/}
                    {/*        id="pending"*/}
                    {/*        className="manage-patient-btn active-btn"*/}
                    {/*        onClick={(event) => {*/}
                    {/*            activeBtn(event);*/}
                    {/*        }}*/}
                    {/*    >*/}
                    {/*        Yes*/}
                    {/*    </div>*/}
                    {/*    <div*/}
                    {/*        id="done"*/}
                    {/*        className="manage-patient-btn"*/}
                    {/*        onClick={(event) => {*/}
                    {/*            activeBtn(event);*/}
                    {/*        }}*/}
                    {/*    >*/}
                    {/*        No*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className="manage-office-comment">Appointment Types</div>
                    <div className="manage-office-panel">
                        <div className="manage-office-col">
                            {appointmentTypesList.map((el) => {
                                return (
                                    <ToggleSwitch
                                        key={`manage-appointment-type-${el.id}`}
                                        element={el}
                                        checked={Boolean(clinicAppointmentTypesList.find(appT => appT.id === el.id))}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className="manage-office-col">
                        <button
                            className="auth-btn mt-3"
                            onClick={() => saveChanges()}
                        >
                            Save Changes
                        </button>
                    </div>
                </section>
            </main>
        </>
    );
}
