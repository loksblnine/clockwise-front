import "../../Assets/Styles/ManagePatient.css";
import {useCallback, useEffect} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import ReactRoundedImage from "react-rounded-image";
import Card from "react-bootstrap/Card";
import Moment from "moment";
import {getAppointmentsList} from "../../Store/actions/appointmentActions";
import {ACTIONS} from "../../Utils/constants";
import NoFound from "../../Layouts/NoFound/NoFound";

export default function ManagePatientDone(props) {
    const dispatch = useDispatch();

    const {items, page, loadNext, isReady} = useSelector(state => state.appointmentReducer.done);

    useEffect(() => {
        if (props.status === "done") {
            dispatch({
                type: ACTIONS.APPOINTMENT.CLEAR_ARRAY
            })
        }
    }, []);

    useEffect(() => {
        if (!isReady) {
            dispatch(getAppointmentsList(page, "1,2"));
        }
    }, [isReady]);

    const handleNextAppointments = useCallback(() => {
        dispatch(getAppointmentsList(page, "1,2"));
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
                <div className="table-col table-col-btns">Status</div>
            </div>
            {!items.length ?
                <NoFound/>
                :
                items.map((item, i) =>
                    <Card key={`/patients/${item?.user_id}${i}`}>
                        <Card.Header>
                            <Link to={`/patients/${item?.user_id}`} className="table-link">
                                <div className="table-col-user">
                                    <ReactRoundedImage
                                        image={!item?.user.photo_url ?
                                            "https://res.cloudinary.com/loksblnine/image/upload/v1663757535/PatientApp/assets_front/default_avatar_l8zadl.svg"
                                            :
                                            item?.user.photo_url
                                        }
                                        imageWidth="50"
                                        imageHeight="50"
                                        roundedSize="-2"
                                    />
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
                                        <div key={`drugToOrders${value?.drug.description}: ${value?.number}`}>
                                            {`${value?.drug.description}: ${value?.number}`}
                                        </div>
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
                                <div>{Moment(new Date(item?.date)).format("DD.MM.YYYY")}</div>
                                <div>{Moment(new Date(item?.date)).format("HH:mm")}</div>
                            </div>
                            <div className="table-col">{item?.user.telephone}</div>
                            <div className="table-col table-col-btns">
                                {item?.status_id === 1 ?
                                    <div className="status-approved">✓ Approved</div>
                                    :
                                    <div className="status-rejected">X Rejected</div>
                                }
                            </div>
                        </Card.Header>
                    </Card>
                )
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
