import {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import Card from "react-bootstrap/Card";
import Moment from "moment";
import TextField from "@mui/material/TextField";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {ThemeProvider} from "@mui/material/styles";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {editNotice, editStatus, editTime} from "../Store/actions/appointmentActions";
import {appointmentsTypes, theme, timeBlocks} from "../Utils/constants";

export default function PendingAppointment({item, i, pendingItems, setPendingItems}) {
    const dispatch = useDispatch();

    const toggleNoticeRef = useRef(null);
    const toggleApproveRef = useRef(null);
    const toggleRejectRef = useRef(null);

    const [rejectMessage, setRejectMessage] = useState("");
    const [notice, setNotice] = useState(null);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);

    return (
        <>
            <Card key={`${i}card`} style={{border: '0px'}}>
                <Card.Header>
                    <div className="table-col">
                        {`#${item?.id}`}
                    </div>
                    <div className="table-col">
                        {`${item?.type} ${item?.type === 'appointment' ? item?.appointment_type.description : ''}`}
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
                                  ref={toggleNoticeRef}
                                  id={`notice-${item?.id}`}
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
                                            setNotice(event.target.value);
                                        }}
                                    />
                                    <div className="select-btn"
                                         onClick={() => {
                                             dispatch(editNotice(appointmentsTypes[item?.type], item?.id, notice));
                                             toggleNoticeRef.current.click();
                                         }}
                                    >
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
                        <div>{Moment(new Date(item?.date)).format("DD.MM.YYYY")}</div>
                        <div>{timeBlocks[item?.day_block_id].heading}</div>
                    </div>
                    <div className="table-col table-col-btns">
                        <Dropdown
                            className="table-dropdown"
                            drop="down"
                            autoClose={false}
                            onToggle={() => {
                                setDate(new Date(item?.date));
                                setTime(timeBlocks[item?.day_block_id].time);
                            }}
                        >
                            <Dropdown.Toggle
                                className="success-btn btn"
                                ref={toggleApproveRef}
                                id={`approve-${item?.id}`}
                            >
                                Approve
                            </Dropdown.Toggle>
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
                                    <div className="dropdown-btns">
                                        <button className="cancel-btn btn dropdown-approve-btn"
                                                onClick={(event) => {
                                                    event.preventDefault();

                                                    toggleApproveRef.current.click();
                                                }}
                                        >
                                            Cancel
                                        </button>
                                        <button className="success-btn btn dropdown-approve-btn"
                                                onClick={(event) => {
                                                    event.preventDefault();

                                                    const hours = time.slice(0, 2);
                                                    const min = time.slice(3);

                                                    const newDate = new Date(date);
                                                    newDate.setHours(hours, min);

                                                    dispatch(editTime(appointmentsTypes[item?.type], item?.id, newDate));
                                                    setTimeout(() => {
                                                        dispatch(editStatus(appointmentsTypes[item?.type], item?.id, 1));
                                                    }, 150);
                                                    toggleApproveRef.current.click();
                                                    setPendingItems(pendingItems.filter((el) => el.id !== item.id))
                                                }}
                                        >
                                            Approve
                                        </button>
                                    </div>
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown
                            className="table-dropdown"
                            drop="down"
                            autoClose="outside"
                            ref={toggleRejectRef}
                            id={`reject-${item?.id}`}
                        >
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
                                    <div className="dropdown-btns">
                                        <div
                                            className="btn cancel-btn"
                                            onClick={() => {
                                                toggleRejectRef.current.click();
                                            }}
                                        >
                                            Cancel
                                        </div>
                                        <div
                                            className="btn dropdown-reject-btn"
                                            onClick={() => {
                                                dispatch(editNotice(appointmentsTypes[item?.type], item?.id, rejectMessage));
                                                dispatch(editStatus(appointmentsTypes[item?.type], item?.id, 2));
                                                toggleRejectRef.current.click();
                                                setPendingItems(pendingItems.filter((el) => el.id !== item.id && item.type === el.type))
                                            }}
                                        >
                                            Confirm rejection
                                        </div>
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
        </>
    );
}
