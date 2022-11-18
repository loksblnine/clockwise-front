import "../../Assets/Styles/ManagePatient.css";
import {useCallback, useEffect, useMemo, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Card from "react-bootstrap/Card";
import debounce from "lodash.debounce";
import Header from "../../Layouts/Header/Header";
import NoFound from "../../Layouts/NoFound/NoFound";
import Loading from "../../Layouts/Loading/Loading";
import {getDoctorsList} from "../../Store/actions/doctorActions";
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
                type: ACTIONS.DOCTOR.SET_PAGE, payload: 0
            });
        }
        setQuery(event.target.value.trim().toLowerCase());
    };

    const debouncedChangeHandler = useMemo(() => {
        return debounce(changeHandler, 300);
    }, []);

    useEffect(() => {
        if (query) {
            dispatch({
                type: ACTIONS.DOCTOR.CLEAR_FILTERED_ARRAY
            });
            dispatch(getDoctorsList(query, 0));
            setTimeout(() => {
                dispatch(getDoctorsList(query, 1));
            }, 150);
        }
    }, [query]);

    useEffect(() => {
        if (!isReady && !query) {
            dispatch(getDoctorsList(query, 0));
            setTimeout(() => {
                dispatch(getDoctorsList(query, 1));
            }, 150);
        }
    }, [isReady, query]);

    const handleNextDoctors = useCallback(() => {
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
                            style={!filteredItems.length ? {borderBottom: "1px solid rgba(0, 0, 0, 0.175)"} : {border: "none"}}
                        >
                            <div className="table-col-user">Doctor</div>
                            <div className="table-col">Specialization</div>
                            <div className="table-col table-col-clinic">Clinic</div>
                            <div className="table-col">Phone</div>
                        </div>
                        {isReady ?
                            !filteredItems.length ?
                                <NoFound/>
                                :
                                filteredItems.map((doctor, i) =>
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
                                                    <div
                                                        key={`${item?.specialty.id} ${item?.specialty.description}`}>
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
                                                        {doctor?.user.telephone}
                                                    </div>
                                                )}
                                            </div>
                                        </Card.Header>
                                    </Card>
                                )
                            :
                            <Loading/>
                        }
                    </div>

                    {filteredItems.length && loadNext ? <div className="pagination" onClick={() => handleNextDoctors()}>
                        <img alt="load_more"
                             src="https://res.cloudinary.com/loksblnine/image/upload/v1665474445/PatientApp/assets_front/load_more_mg9qmt.svg"/>
                        Load More
                    </div> : null}
                </section>
            </main>
        </>);
}
