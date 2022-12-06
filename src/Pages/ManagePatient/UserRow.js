import React, {useEffect, useState} from 'react';
import ReactRoundedImage from "react-rounded-image";
import Moment from "moment/moment";
import Card from "react-bootstrap/Card";
import {getUserPendingAppointmentsList} from "../../Store/actions/appointmentActions";
import PendingAppointment from "../../Components/PendingAppointment";
import {useDispatch} from "react-redux";
import {ARROWS} from "../../Utils/svg";

const UserRow = ({item}) => {
    const dispatch = useDispatch();
    const [pendingItems, setPendingItems] = useState([]);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        dispatch(getUserPendingAppointmentsList(item.user.id, setPendingItems));
    }, []);

    useEffect(() => {
        if (pendingItems.length === 1) {
             setOpen(true)
        }
    }, [pendingItems.length])

    if (pendingItems.length === 0) {
        return null;
    }
    return (
        <Card key={`${item.user.id}card`} className="mb-2">
            <Card.Header>
                <div className="table-col-user">
                    <ReactRoundedImage
                        image={
                            !item?.user.photo_url ?
                                "https://res.cloudinary.com/loksblnine/image/upload/v1663757535/PatientApp/assets_front/default_avatar_l8zadl.svg"
                                :
                                item?.user.photo_url
                        }
                        imageWidth="50"
                        imageHeight="50"
                        roundedSize="-3"
                    />
                    <div className="table-col ml-10">
                        <div>{`${item?.user.firstName} ${item?.user.lastName}`}</div>
                        <div>{Moment(new Date(item?.user.birth_date)).format("DD.MM.YYYY")}</div>
                    </div>
                </div>
                <div className="table-col">
                    {`${item?.user.email}`}
                </div>
                <div className="table-col">
                    {`${item?.user.telephone}`}
                </div>
                <div className="table-col" onClick={() => setOpen(!open)}
                     style={{cursor: "pointer", userSelect: 'none'}}>
                    <p>{pendingItems.length} request(s) {open ? ARROWS.TOP : ARROWS.BOTTOM}</p>
                </div>
            </Card.Header>
            {open && (
                <div className="table-heading" style={{borderTop: 1}}>
                    <div className="table-col">ID</div>
                    <div className="table-col">Appointment Type</div>
                    <div className="table-col">Details</div>
                    <div className="table-col table-col-notice">Notice</div>
                    <div className="table-col">Date</div>
                    <div className="table-col table-col-btns">Action</div>
                </div>
            )}
            {open &&
                pendingItems?.map((el, index) => {
                    return (
                        <PendingAppointment key={`pending-${el.type}-${el.id}`} item={el} i={index} pendingItems={pendingItems} setPendingItems={setPendingItems}/>
                    );
                })}
        </Card>
    );
};

export default UserRow;
