import "../../Assets/Styles/ManagePatient.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {useCallback, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Moment from "moment";
import TextField from "@mui/material/TextField";
import {ThemeProvider} from "@mui/material/styles";
import {ACTIONS, appointmentsTypes, theme} from "../../Utils/constants";
import NoFound from "../../Layouts/NoFound/NoFound";
import {editNotice, editStatus, editTime, getAppointmentsList} from "../../Store/actions/appointmentActions";

export default function ManagePatientPending(props) {
    const dispatch = useDispatch();

    const {filteredItems, page, loadNext} = useSelector(state => state.appointmentReducer);

    const [rejectMessage, setRejectMessage] = useState("");
    const [notice, setNotice] = useState(null);
    const [date, setDate] = useState(null);

    useEffect(() => {
        if (props.status === "pending" && filteredItems.length) {
            dispatch({
                type: ACTIONS.APPOINTMENT.CLEAR_FILTERED_ARRAY
            })
        }
    }, []);

    useEffect(() => {
        if (props.query !== "") {
            dispatch(getAppointmentsList(props.query, 0, 3))
        }
    }, [props.query, props.status]);

    useEffect(() => {
        if (!filteredItems.length && !props.query) {
            dispatch(getAppointmentsList('', page, 3));
        }
    }, [filteredItems, props.query, props.status]);

    const handleNextAppointments = useCallback(() => {
        dispatch(getAppointmentsList("", page, 3));
    }, [page, props.status]);

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
                <div className="table-col table-col-btns">Actions</div>
            </div>
            {!filteredItems.length ?
                <NoFound/>
                :
                <Accordion>
                    {filteredItems.map((item, i) =>
                            <Card key={`${i}card`}>
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
                                        <Dropdown className="table-dropdown"
                                                  autoClose="outside"
                                        >
                                            <Dropdown.Toggle id="dropdown-basic">
                                                <img alt="pencil"
                                                     src={require("../../Assets/Images/pencil.svg").default}/>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <div className="dropdown-item">
                                                <textarea
                                                    className="dropdown-notice"
                                                    maxLength="100"
                                                    defaultValue={!item?.notice ? "" : item?.notice}
                                                    onChange={(event) => {
                                                        setNotice(event.target.value)
                                                    }}
                                                />
                                                    <div className="select-btn" onClick={() => {
                                                        dispatch(editNotice(appointmentsTypes[item?.type], item?.id, notice))
                                                    }}>
                                                        Done
                                                    </div>
                                                </div>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <div>
                                            {(!item?.notice || item?.notice === "") ?
                                                "Add notice"
                                                :
                                                item?.notice
                                            }
                                        </div>
                                    </div>
                                    <div className="table-col">
                                        <div>{Moment(new Date(item?.date)).format("DD/MM/YYYY")}</div>
                                        <div>{Moment(new Date(item?.date)).format("HH:mm")}</div>
                                        <Dropdown className="table-dropdown"
                                                  autoClose="outside">
                                            <Dropdown.Toggle id="dropdown-basic">
                                                Change time
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item>
                                                    <label className={"label-notice"}>
                                                        Hours and minutes
                                                    </label>
                                                    <ThemeProvider theme={theme}>
                                                        <TextField
                                                            id="time"
                                                            type="time"
                                                            defaultValue={Moment(new Date(item?.date)).format("HH:mm")}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            inputProps={{
                                                                step: 300,
                                                            }}
                                                            sx={{width: 150}}
                                                            onChange={(event) => {
                                                                const hours = event.target.value.slice(0, 2);
                                                                const min = event.target.value.slice(3);
                                                                setDate(new Date(item?.date).setHours(hours, min));
                                                            }}
                                                        />
                                                    </ThemeProvider>
                                                    <div className="select-btn" onClick={() => {
                                                        dispatch(editTime(appointmentsTypes[item?.type], item?.id, new Date(date).toISOString()))
                                                    }}>
                                                        Select
                                                    </div>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className="table-col">{item?.user.telephone}</div>
                                    <div className="table-col table-col-btns">
                                        <button className="success-btn btn"
                                                onClick={() => {
                                                    dispatch(editStatus(appointmentsTypes[item?.type], item?.id, 1))
                                                }}
                                        >
                                            Approve
                                        </button>
                                        <Dropdown className="table-dropdown" autoClose="outside">
                                            <Dropdown.Toggle className="warning-btn btn">Reject</Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <div className="dropdown-item dropdown-reject">
                                                    <textarea
                                                        name="reject_message"
                                                        value={rejectMessage}
                                                        maxLength="100"
                                                        placeholder="Type rejection..."
                                                        onChange={(event) => setRejectMessage(event.target.value)}
                                                    />
                                                    <div
                                                        className="btn dropdown-reject-btn"
                                                        onClick={() => {
                                                            dispatch(editStatus(appointmentsTypes[item?.type], item?.id, 2));
                                                            dispatch(editNotice(appointmentsTypes[item?.type], item?.id, rejectMessage))
                                                        }}
                                                    >
                                                        Confirm rejection
                                                    </div>
                                                    <div className="dropdown-message"
                                                         onClick={() => setRejectMessage("Not the right medicine")}>
                                                        Not the right medicine
                                                    </div>
                                                    <div className="dropdown-message"
                                                         onClick={() => setRejectMessage("Bad for patient")}>
                                                        Bad for patient
                                                    </div>
                                                    <div className="dropdown-message"
                                                         onClick={() => setRejectMessage("Not the right amount")}>
                                                        Not the right amount
                                                    </div>
                                                    <div className="dropdown-message"
                                                         onClick={() => setRejectMessage("Patient is allergic to this medicine")}>
                                                        Patient is allergic to this medicine
                                                    </div>
                                                </div>
                                            </Dropdown.Menu>
                                        </Dropdown>
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
