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
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {ThemeProvider} from "@mui/material/styles";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {ACTIONS, appointmentsTypes, theme, timeBlocks} from "../../Utils/constants";
import {editNotice, editStatus, editTime, getAppointmentsList} from "../../Store/actions/appointmentActions";
import NoFound from "../../Layouts/NoFound/NoFound";

export default function ManagePatientPending(props) {
    const dispatch = useDispatch();

    const {items, page, loadNext, isReady} = useSelector(state => state.appointmentReducer.pending);

    const [rejectMessage, setRejectMessage] = useState("");
    const [notice, setNotice] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [date, setDate] = useState(null);
    const [newDate, setNewDate] = useState(null);

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
                style={!items.length ? {borderBottom: "1px solid #343760"} : {border: "none"}}
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
                                            <div>{Moment(new Date(item?.user.birth_date)).format("MM.DD.YYYY")}</div>
                                        </div>
                                    </div>
                                </Link>
                                <div className="table-col">
                                    {`${item?.type} #${item?.id}`}
                                </div>
                                <div className="table-col">
                                    {item?.drugToOrders ?
                                        item?.drugToOrders.map(value =>
                                            <div key={`${value?.drug.description}: ${value?.number}drugToOrders`}>
                                                {`${value?.drug.description}: ${value?.number}`}
                                            </div>
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
                                                 src={"https://res.cloudinary.com/loksblnine/image/upload/v1665474445/PatientApp/assets_front/pencil_mkcrma.svg"}
                                            />
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
                                    <div>{Moment(new Date(item?.date)).format("MM/DD/YYYY")}</div>
                                    <div>{timeBlocks[item?.day_block_id].heading}</div>
                                </div>
                                <div className="table-col">{item?.user.telephone}</div>
                                <div className="table-col table-col-btns">
                                    <Dropdown
                                        className="table-dropdown"
                                        autoClose={showDropdown}
                                        drop="down"
                                        onToggle={() => {
                                            setDate(new Date(item?.date));
                                            setNewDate(false);

                                            if (showDropdown === true) {
                                                setShowDropdown(false);
                                            }
                                        }}
                                    >
                                        <Dropdown.Toggle className="success-btn btn">Approve</Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <div className="dropdown-item">
                                                <label className="label-notice">
                                                    Choose date:
                                                </label>
                                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                                    <ThemeProvider theme={theme}>
                                                        <DatePicker
                                                            views={['day']}
                                                            value={date}
                                                            onChange={(value) => {
                                                                const hours = new Date(item?.date).getHours();
                                                                const min = new Date(item?.date).getMinutes()
                                                                setDate(new Date(value._d).setHours(hours, min));
                                                            }}
                                                            renderInput={(params) =>
                                                                <TextField {...params} helperText={null}/>
                                                            }
                                                        />
                                                    </ThemeProvider>
                                                </LocalizationProvider>
                                                <label className="dropdown-date-item">
                                                    {`${timeBlocks[item?.day_block_id].message}:`}
                                                </label>
                                                <ThemeProvider theme={theme}>
                                                    <TextField
                                                        id="time"
                                                        type="time"
                                                        defaultValue={timeBlocks[item?.day_block_id].time}
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
                                                            if (!date) {
                                                                setNewDate(new Date(item?.date).setHours(hours, min));
                                                            } else {
                                                                setNewDate(new Date(date).setHours(hours, min));
                                                            }
                                                        }}
                                                    />
                                                </ThemeProvider>
                                                <button className="success-btn btn dropdown-approve-btn"
                                                        disabled={!newDate}
                                                        onClick={(event) => {
                                                            event.preventDefault();

                                                            dispatch(editTime(appointmentsTypes[item?.type], item?.id, new Date(newDate).toISOString()));
                                                            setTimeout(() => {
                                                                dispatch(editStatus(appointmentsTypes[item?.type], item?.id, 1));
                                                            },150);

                                                            setShowDropdown(true);
                                                        }}
                                                >
                                                    Approve
                                                </button>
                                            </div>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Dropdown className="table-dropdown" autoClose="outside">
                                        <Dropdown.Toggle className="warning-btn btn">Reject</Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <div className="dropdown-item dropdown-reject">
                                                <textarea
                                                    name="reject_message"
                                                    value={rejectMessage}
                                                    maxLength="100"
                                                    placeholder="Type rejection..."
                                                    onChange={(event) =>
                                                        setRejectMessage(event.target.value)
                                                    }
                                                />
                                                <div
                                                    className="btn dropdown-reject-btn"
                                                    onClick={() => {
                                                        dispatch(editNotice(appointmentsTypes[item?.type], item?.id, rejectMessage))
                                                        dispatch(editStatus(appointmentsTypes[item?.type], item?.id, 2));
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
