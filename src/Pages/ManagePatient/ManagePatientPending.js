import "../../Assets/Styles/ManagePatient.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import {ACTIONS} from "../../Utils/constants";
import {getAppointmentsList, getUsersHavingPending} from "../../Store/actions/appointmentActions";
import NoFound from "../../Layouts/NoFound/NoFound";
import PendingAppointment from "../../Components/PendingAppointment";
import RenderUsersHavingPending from "./RenderUsersHavingPending";
import debounce from "lodash.debounce";

export default function ManagePatientPending(props) {
    const dispatch = useDispatch();

    const [query, setQuery] = useState("");
    const {items, page, loadNext, isReady} = useSelector((state) => state.appointmentReducer.users);

    useEffect(() => {
        if (!isReady || query) {
            dispatch(getUsersHavingPending(query, 0));
        }
    }, [query]);

    const changeHandler = (event) => {
        dispatch({
            type: ACTIONS.APPOINTMENT.CLEAR_USERS
        });
        setQuery(event.target.value.trim().toLowerCase());
    };

    const debouncedChangeHandler = useMemo(() => {
        return debounce(changeHandler, 300);
    }, []);

    const handleNextUsers = useCallback(() => {
        dispatch(getUsersHavingPending(query, page));
    }, [page]);

    return (
        <>
            <div className="search">
                <input className="search-input" placeholder="Search" maxLength="30"
                       onChange={debouncedChangeHandler}
                />
            </div>
            <div
                className="table-heading"
                style={!items.length ? {borderBottom: "1px solid rgba(0, 0, 0, 0.175)"} : {border: "none"}}
            >
                <div className="table-col-user">Patient</div>
                <div className="table-col">Email</div>
                <div className="table-col">Phone</div>
                <div className="table-col table-col-btns"></div>
            </div>
            {!items.length ?
                <NoFound/>
                :
                <RenderUsersHavingPending items={items}/>
            }

            {items.length && loadNext ?
                <div className="pagination" onClick={() => handleNextUsers()}>
                    <img alt="load_more"
                         src="https://res.cloudinary.com/loksblnine/image/upload/v1665474445/PatientApp/assets_front/load_more_mg9qmt.svg"
                    />
                    Load More
                </div>
                :
                null
            }
        </>
    );
}
