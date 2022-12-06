import "../../Assets/Styles/ManagePatient.css";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import ReactRoundedImage from "react-rounded-image";
import Card from "react-bootstrap/Card";
import Header from "../../Layouts/Header/Header";
import NoFound from "../../Layouts/NoFound/NoFound";
import Loading from "../../Layouts/Loading/Loading";
import {getManagersList} from "../../Store/actions/adminActions";

export default function ManageManagers() {
    const dispatch = useDispatch();
    const {items, isReady} = useSelector(state => state.adminReducer);

    useEffect(() => {
        if (!isReady) {
            dispatch(getManagersList());
        }
    }, [isReady]);

    return (
        <>
            <Header/>
            <main>
                <section className="sect manage-patient-sect">
                    <div className="manage-patient-heading">
                        <Link to="/managers/add" className="manage-patient-add-btn">+ Add manager</Link>
                    </div>
                    <div className="manage-patient-table">
                        <div
                            className="table-heading"
                            style={!items.length ? {borderBottom: "1px solid #343760"} : {border: "none"}}
                        >
                            <div className="table-col-user">Manager</div>
                            <div className="table-col table-col-clinic">Clinic</div>
                            <div className="table-col">Phone</div>
                        </div>
                        {isReady ?
                            !items.length ?
                                <NoFound/>
                                :
                                items.map((manager, i) =>
                                    <Card key={`doctorCard ${i}`}>
                                        <Card.Header>
                                            <Link to={`managers/${manager?.manager_id}/edit`} className="table-link">
                                                <div className="table-col-user">
                                                    <ReactRoundedImage
                                                        image={
                                                            !manager.user.photo_url?
                                                                "https://res.cloudinary.com/loksblnine/image/upload/v1663757535/PatientApp/assets_front/default_avatar_l8zadl.svg"
                                                                :
                                                                manager.user.photo_url
                                                        }
                                                        imageWidth="50"
                                                        imageHeight="50"
                                                        roundedSize="-3"
                                                    />
                                                    <div className="table-col ml-10">
                                                        <div>{`${manager?.user.firstName} ${manager?.user.lastName}`}</div>
                                                    </div>
                                                </div>
                                            </Link>
                                            <div className="table-col">
                                                <div>{manager?.clinic.name}</div>
                                                <div>{manager?.clinic.telephone}</div>
                                            </div>
                                            <div className="table-col">{manager?.user.telephone}</div>
                                        </Card.Header>
                                    </Card>
                                )
                            :
                            <Loading/>
                        }
                    </div>
                </section>
            </main>
        </>
    );
}
