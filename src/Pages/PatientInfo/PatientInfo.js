import "../../Assets/Styles/ManagePatient.css";
import "../../Assets/Styles/PatientInfo.css";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {ThemeProvider} from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import Accordion from "react-bootstrap/Accordion";
import Dropdown from "react-bootstrap/Dropdown";
import Card from "react-bootstrap/Card";
import Moment from "moment";
import Header from "../../Layouts/Header/Header";
import Loading from "../../Layouts/Loading/Loading";
import {appointmentsTypes, theme, timeBlocks} from "../../Utils/constants";
import {editNotice, editStatus, editTime, getPatientInfo} from "../../Store/actions/appointmentActions";


export default function PatientInfo() {
    const {id} = useParams();

    const dispatch = useDispatch();

    const appointmentsList = useSelector(state => state.appointmentReducer?.patient);
    const patientInfo = appointmentsList ? appointmentsList[0].user : null;
    const formatDate = Moment(new Date(patientInfo?.birth_date)).format("DD MMM YYYY");
    const age = ((new Date().getTime() - new Date(patientInfo?.birth_date)) / (24 * 3600 * 365.25 * 1000)) | 0;

    const [rejectMessage, setRejectMessage] = useState("");
    const [notice, setNotice] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);

    useEffect(() => {
        dispatch(getPatientInfo(id))
    }, [id]);

    if (!appointmentsList) {
        return <Loading/>
    }

    return (
        <>
            <Header/>
            <main>
                <section className="sect manage-patient-sect">
                    <div className="manage-patient-heading patient-info-heading">
                        <div className="manage-patient-detail">
                            <img alt="avatar"
                                 src={!patientInfo?.photo_url ?
                                     "https://res.cloudinary.com/loksblnine/image/upload/v1663757535/PatientApp/assets_front/default_avatar_l8zadl.svg"
                                     :
                                     patientInfo?.photo_url
                                 }
                            />
                            <div>
                                <div>{`${patientInfo?.firstName} ${patientInfo?.lastName}`}</div>
                                <div>Born {formatDate} - {age} Years</div>
                                <div>{patientInfo?.location}</div>
                                <div>{patientInfo?.email}</div>
                                <div>{patientInfo?.telephone}</div>
                            </div>
                        </div>
                    </div>
                    <div className="manage-patient-table">
                        <div className="table-heading">
                            <div className="table-col">Complete Actions</div>
                            <div className="table-col">Details</div>
                            <div className="table-col table-col-notice">Notice</div>
                            <div className="table-col">Date</div>
                            <div className="table-col table-col-btns">Status</div>
                        </div>
                        <Accordion>
                            {appointmentsList.map((item) =>
                                <Card key={`${item?.type}${item.id}`}>
                                    <Card.Header>
                                        <div className="table-col">{`${item?.type} #${item?.id}`}</div>
                                        <div className="table-col">
                                            {item?.drugToOrders ?
                                                item?.drugToOrders.map(value =>
                                                    <div
                                                        key={`${value?.drug.description}: ${value?.number} #${item?.id}`}>
                                                        {`${value?.drug.description}: ${value?.number}`}
                                                    </div>
                                                )
                                                :
                                                null
                                            }
                                        </div>
                                        <div className="table-col table-col-notice">
                                            {item.status_id === 3 ?
                                                <>
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
                                                                    dispatch(editNotice(appointmentsTypes[item?.type], item?.id, notice, id))
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
                                                </>
                                                :
                                                item?.status_id !== 3 && (!item?.notice || item?.notice === "") ?
                                                    "Without notice"
                                                    :
                                                    item?.notice

                                            }
                                        </div>
                                        <div className="table-col">
                                            {item?.status_id !== 3 ?
                                                <>
                                                    <div>{Moment(new Date(item?.date)).format("DD.MM.YYYY")}</div>
                                                    <div>{Moment(new Date(item?.date)).format("HH:mm")}</div>
                                                </>
                                                :
                                                <>
                                                    <div>{Moment(new Date(item?.date)).format("DD.MM.YYYY")}</div>
                                                    <div>{timeBlocks[item?.day_block_id].heading}</div>
                                                </>
                                            }
                                        </div>
                                        <div className="table-col table-col-btns">
                                            {item?.status_id === 1 ?
                                                <div className="status-approved">✓ Approved</div>
                                                :
                                                item?.status_id === 2 ?
                                                    <div className="status-rejected">X Rejected</div>
                                                    :
                                                    <>
                                                        <Dropdown
                                                            className="table-dropdown"
                                                            autoClose={showDropdown}
                                                            drop="down"
                                                            onToggle={() => {
                                                                setDate(new Date(item?.date));
                                                                setTime(timeBlocks[item?.day_block_id].time);

                                                                if (showDropdown === true) {
                                                                    setShowDropdown(false);
                                                                }
                                                            }}
                                                        >
                                                            <Dropdown.Toggle
                                                                className="success-btn btn">Approve</Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                <div className="dropdown-item">
                                                                    <label className="label-notice">
                                                                        Choose date:
                                                                    </label>
                                                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                                                        <ThemeProvider theme={theme}>
                                                                            <DatePicker
                                                                                views={['day']}
                                                                                inputFormat="DD.MM.yyyy"
                                                                                value={date}
                                                                                onChange={(value) => {
                                                                                    setDate(new Date(value._d));
                                                                                }}
                                                                                renderInput={(params) =>
                                                                                    <TextField {...params}
                                                                                               helperText={null}/>
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
                                                                            defaultValue={time}
                                                                            InputLabelProps={{
                                                                                shrink: true,
                                                                            }}
                                                                            inputProps={{
                                                                                step: 300,
                                                                            }}
                                                                            sx={{width: 150}}
                                                                            onChange={(event) => {
                                                                                setTime(event.target.value);
                                                                            }}
                                                                        />
                                                                    </ThemeProvider>
                                                                    <button
                                                                        className="success-btn btn dropdown-approve-btn"
                                                                        onClick={(event) => {
                                                                            event.preventDefault();

                                                                            const hours = time.slice(0, 2);
                                                                            const min = time.slice(3);

                                                                            const newDate = new Date(date);
                                                                            newDate.setHours(hours, min);

                                                                            dispatch(editTime(appointmentsTypes[item?.type], item?.id, newDate), id);
                                                                            setTimeout(() => {
                                                                                dispatch(editStatus(appointmentsTypes[item?.type], item?.id, 1, id));
                                                                            }, 150);
                                                                        }}
                                                                    >
                                                                        Approve
                                                                    </button>
                                                                </div>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                        <Dropdown className="table-dropdown" autoClose="outside">
                                                            <Dropdown.Toggle
                                                                className="warning-btn btn">Reject</Dropdown.Toggle>
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
                                                                            dispatch(editStatus(appointmentsTypes[item?.type], item?.id, 2, id));
                                                                            dispatch(editNotice(appointmentsTypes[item?.type], item?.id, rejectMessage, id))
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
                                                    </>
                                            }
                                        </div>
                                    </Card.Header>
                                </Card>
                            )}
                        </Accordion>
                    </div>
                </section>
            </main>
        </>
    )
}
