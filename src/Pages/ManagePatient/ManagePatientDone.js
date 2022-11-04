import "../../Assets/Styles/ManagePatient.css";
import {useCallback, useEffect} from "react";
import {Link} from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import NoFound from "../../Layouts/NoFound/NoFound";
import {useDispatch, useSelector} from "react-redux";
import {editNotice, editStatus, getAppointmentsList} from "../../Store/actions/appointmentActions";
import Moment from "moment";
import {ACTIONS, appointmentsTypes} from "../../Utils/constants";
import Dropdown from "react-bootstrap/Dropdown";

export default function ManagePatientDone(props) {
    const dispatch = useDispatch();

    const {filteredItems, page, loadNext} = useSelector(state => state.appointmentReducer);

    useEffect(() => {
        if (props.status === "done") {
            dispatch({
                type: ACTIONS.APPOINTMENT.CLEAR_FILTERED_ARRAY
            })
        }
    }, []);

    useEffect(() => {
        if (props.query !== "") {
            dispatch(getAppointmentsList(props.query, 0, "1,2"))
        }
    }, [props.query]);

    useEffect(() => {
        if (!filteredItems.length && !props.query) {
            dispatch(getAppointmentsList('', page, "1,2"));
        }
    }, [filteredItems, props.query]);

    const handleNextAppointments = useCallback(() => {
        dispatch(getAppointmentsList("", page, "1,2"));
    }, [page]);

    return (
        <>
            <div
                className="table-heading"
                style={!filteredItems.length ? {borderBottom: "1px solid #343760"} : {border: "none"}}
            >
                <div className="table-col-user">Patient</div>
                <div className="table-col table-col-category">Category</div>
                <div className="table-col">Details</div>
                <div className="table-col table-col-notice">Notice</div>
                <div className="table-col">Date</div>
                <div className="table-col">Phone</div>
                <div className="table-col table-col-btns">Status</div>
            </div>
            {!filteredItems.length ?
                <NoFound/>
                :
                <Accordion>
                    {filteredItems.map((item, i) =>
                        <Card>
                            <Card.Header>
                                <Link to={`/patients/${item?.user_id}`} className="table-link">
                                    <div className="table-col-user">
                                        <img alt="avatar"
                                             src={!item?.user.photo_url ?
                                                 "https://res.cloudinary.com/loksblnine/image/upload/v1663757535/PatientApp/assets_front/default_avatar_l8zadl.svg"
                                                 :
                                                 item?.user.photo_url
                                             }/>
                                        <div className="table-col">
                                            <div>{`${item?.user.firstName} ${item?.user.lastName}`}</div>
                                            <div>{Moment(new Date(item?.user.birth_date)).format("DD.MM.YYYY")}</div>
                                        </div>
                                    </div>
                                </Link>
                                <div className="table-col">
                                    {`${item?.type} #${item?.id}`}
                                </div>
                                <div className="table-col">
                                    {item?.drugToOrders ?
                                        item?.drugToOrders.map(value =>
                                            <div>{`${value?.drug.description}: ${value?.number}`}</div>
                                        )
                                        :
                                        null
                                    }
                                </div>
                                <div className="table-col table-col-notice">
                                    {(!item?.notice || item?.notice === "") ?
                                        "Without notice"
                                        :
                                        item?.notice
                                    }
                                </div>
                                <div className="table-col">
                                    <div>{Moment(new Date(item?.date)).format("DD/MM/YYYY")}</div>
                                    <div>{Moment(new Date(item?.date)).format("HH:mm")}</div>
                                </div>
                                <div className="table-col">{item?.user.telephone}</div>
                                <div className="table-col table-col-btns">
                                    {item?.status_id === 1 ?
                                        <div className="success-btn btn">Approved</div>
                                        :
                                        <div className="warning-btn btn">Rejected</div>
                                    }
                                </div>
                            </Card.Header>
                        </Card>
                    )}
                </Accordion>
            }

            {filteredItems.length && loadNext ?
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
