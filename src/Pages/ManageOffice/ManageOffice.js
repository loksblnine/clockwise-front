import "../../Assets/Styles/ManagePatient.css";
import "../../Assets/Styles/ManageOffice.css";
import Header from "../../Layouts/Header/Header";
import ToggleSwitch from "../../Components/ToggleSwitch";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {
    getAppointmentTypesList,
    getClinicAppointmentTypesList,
    updateClinicAppointmentTypesList
} from "../../Store/actions/clinicActions";

export default function ManageOffice() {
    const dispatch = useDispatch();
    const clinicId = useSelector((state) => state.userReducer.user.clinic_id_clinics_managerToClinics[0].id);
    const appointmentTypesList = useSelector((state) => state.clinicReducer.appointmentTypesList);
    const clinicAppointmentTypesList = useSelector((state) => state.clinicReducer.clinicAppointmentTypesList);

    useEffect(() => {
        if (!appointmentTypesList.length) {
            dispatch(getAppointmentTypesList());
        }
        if (!clinicAppointmentTypesList.length) {
            dispatch(getClinicAppointmentTypesList(clinicId));
        }
    }, []);

    const saveChanges = () => {
        dispatch(updateClinicAppointmentTypesList(clinicId, clinicAppointmentTypesList));
    };

    return (
      <>
          <Header/>
          <main>
              <section className="sect manage-patient-sect">
                  <div className="manage-patient-heading manage-office-heading">
                      <h1>Manage Office</h1>
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
                                <ToggleSwitch key={`manage-appointment-type-${el.id}`} element={el}
                                              checked={Boolean(clinicAppointmentTypesList.find(appT => appT.id === el.id))}/>
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
