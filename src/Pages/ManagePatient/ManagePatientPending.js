import "../../Assets/Styles/ManagePatient.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import {ACTIONS} from "../../Utils/constants";
import {getAppointmentsList} from "../../Store/actions/appointmentActions";
import NoFound from "../../Layouts/NoFound/NoFound";
import PendingAppointment from "../../Components/PendingAppointment";

export default function ManagePatientPending(props) {
    const dispatch = useDispatch();

    const {items, page, loadNext, isReady} = useSelector(state => state.appointmentReducer.pending);

    useEffect(() => {
        if (props.status === "pending") {
            dispatch({
                type: ACTIONS.APPOINTMENT.CLEAR_ARRAY
            })
        }
    }, []);

    useEffect(() => {
        if (!isReady) {
            dispatch(getAppointmentsList(page, 3));
        }
    }, [isReady]);

    const handleNextAppointments = useCallback(() => {
        dispatch(getAppointmentsList(page, 3));
    }, [page]);

    return (
        <>
            <div
                className="table-heading"
                style={!items.length ? {borderBottom: "1px solid rgba(0, 0, 0, 0.175)"} : {border: "none"}}
            >
                <div className="table-col-user">Patient</div>
                <div className="table-col table-col-category">Category</div>
                <div className="table-col">Details</div>
                <div className="table-col table-col-notice">Notice</div>
                <div className="table-col">Date</div>
                <div className="table-col">Phone</div>
                <div className="table-col table-col-btns">Actions</div>
            </div>
            {!items.length ?
                <NoFound/>
                :
                <Accordion>
                    {items.map((item, i) =>
                        <PendingAppointment i={i} item={item} key={`${i}pending_appointment`}/>
                    )}
                </Accordion>

            }

            {items.length && loadNext ?
                <div className="pagination" onClick={() => handleNextAppointments()}>
                    <img alt="load_more"
                         src="https://res.cloudinary.com/loksblnine/image/upload/v1665474445/PatientApp/assets_front/load_more_mg9qmt.svg"/>
                    Load More
                </div>
                :
                null
            }
        </>
    );
}
