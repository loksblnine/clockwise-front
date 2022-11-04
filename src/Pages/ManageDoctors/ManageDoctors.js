import "../../Assets/Styles/ManagePatient.css";
import {useCallback, useEffect, useMemo, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import debounce from "lodash.debounce";
import Header from "../../Layouts/Header/Header";
import NoFound from "../../Layouts/NoFound/NoFound";
import {getDoctorsList, setReadyDoctors} from "../../Store/actions/doctorActions";
import {ACTIONS} from "../../Utils/constants";

export default function ManageDoctors() {
  const dispatch = useDispatch();
  const {filteredItems, page, loadNext, isReady} = useSelector(state => state.doctorReducer);

  const [query, setQuery] = useState("");

  const changeHandler = (event) => {
    if (!event.target.value) {
      dispatch({
        type: ACTIONS.DOCTOR.SET_OLD_ITEMS
      });
    } else {
      dispatch({
        type: ACTIONS.DOCTOR.SET_PAGE,
        payload: 0
      });
    }
    setQuery(event.target.value.trim().toLowerCase());
  };

  const debouncedChangeHandler = useMemo(() => {
    return debounce(changeHandler, 300);
  }, []);

  useEffect(() => {
    if (query !== "") {
      dispatch({
        type: ACTIONS.DOCTOR.CLEAR_FILTERED_ARRAY
      });
      dispatch(getDoctorsList(query, 0));
      dispatch(getDoctorsList(query, 1));
    }
  }, [query]);

  useEffect(() => {
    if (!filteredItems.length && query === "") {
      dispatch(getDoctorsList(query, 0));
      dispatch(getDoctorsList(query, 1));
    }
  }, []);

  const handleNextDoctors = useCallback(() => {
    dispatch(setReadyDoctors(false));
    dispatch(getDoctorsList(query, page));
  }, [query, page]);

  return (
    <>
      <Header/>
      <main>
        <section className="sect manage-patient-sect">
          <div className="manage-patient-heading">
            <Link to="/doctors/add" className="manage-patient-add-btn">+ Add doctor</Link>
            <div className="search">
              <input className="search-input" placeholder="Search" maxLength="30"
                     onChange={debouncedChangeHandler}
              />
            </div>
          </div>
          <div className="manage-patient-table">
            <div
              className="table-heading"
              style={!filteredItems.length ? {borderBottom: "1px solid #343760"} : {border: "none"}}
            >
              <div className="table-col-user">Doctor</div>
              <div className="table-col">Specialization</div>
              <div className="table-col table-col-clinic">Clinic</div>
              <div className="table-col">Phone</div>
              {/*<div className="table-col">Patients</div>*/}
              {/*<div className="table-col">Feedbacks</div>*/}
            </div>
            {
              <Accordion>
                {isReady ? !filteredItems.length ? <NoFound/> : filteredItems.map((doctor, i) =>
                  <Card key={`doctorCard ${i}`}>
                    <Card.Header>
                      <Link to={`/doctors/${doctor?.user_id}/edit`} className="table-link">
                        <div className="table-col-user">
                          <img alt="avatar"
                               src={!doctor.user.photo_url ?
                                 "https://res.cloudinary.com/loksblnine/image/upload/v1663757535/PatientApp/assets_front/default_avatar_l8zadl.svg"
                                 :
                                 doctor.user.photo_url
                               }
                          />
                          <div className={"table-col"}>
                            <div>{`${doctor?.user.firstName} ${doctor?.user.lastName}`}</div>
                            <div>{`${doctor?.publicName}`}</div>
                          </div>
                        </div>
                      </Link>
                      <div className="table-col">
                        {doctor?.specialtyToDoctors.map((item) =>
                          <div key={`${item?.specialty.id} ${item?.specialty.description}`}>
                            {item?.specialty.description}
                          </div>
                        )}
                      </div>
                      <div className="table-col table-col-clinic">
                        {doctor?.clinicToDoctors.map((item) =>
                          <div key={`${item?.clinic.name} ${item?.clinic_id}`}>
                            {item?.clinic.name}
                          </div>
                        )}
                      </div>
                      <div className="table-col">
                        {doctor?.clinicToDoctors.map((item) =>
                          <div key={`${item?.clinic_id} ${item?.clinic.name}`}>
                            {item?.clinic.telephone}
                          </div>
                        )}
                      </div>
                      {/*<div className="table-col">{doctor.patients}</div>*/}
                      {/*<div className="table-col">{doctor.feedbacks}</div>*/}
                    </Card.Header>
                  </Card>
                ) : <p>Loading...</p>}
              </Accordion>
            }
          </div>
          {loadNext ?
            <div className="pagination" onMouseEnter={() => handleNextDoctors()}>
              <img alt="load_more"
                   src="https://res.cloudinary.com/loksblnine/image/upload/v1665474445/PatientApp/assets_front/load_more_mg9qmt.svg"/>
              Load More
            </div>
            :
            null
          }
        </section>
      </main>
    </>
  );
}
