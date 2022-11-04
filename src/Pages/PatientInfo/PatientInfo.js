import "../../Assets/Styles/ManagePatient.css";
import "../../Assets/Styles/PatientInfo.css";
import {useParams} from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Moment from "moment";
import Header from "../../Layouts/Header/Header";
import {patients} from "../../mock-data/mockData";

export default function PatientInfo() {
    const {id} = useParams();

    const patient = patients.find(item => item.id === id);
    const formatDate = Moment(new Date(patient.birth)).format("MMM DD YYYY")
    let age = ((new Date().getTime() - new Date(patient.birth)) / (24 * 3600 * 365.25 * 1000)) | 0;

    return (
        <>
            <Header/>
            <main>
                <section className="sect manage-patient-sect">
                    <div className="manage-patient-heading patient-info-heading">
                        <h1>Summary of Action Taken</h1>
                        <div className="manage-patient-detail">
                            <img alt="avatar"
                                 src="https://res.cloudinary.com/loksblnine/image/upload/v1663757535/PatientApp/assets_front/default_avatar_l8zadl.svg"
                            />
                            <div>
                                <div>{`${patient.first_name} ${patient.last_name}`}</div>
                                <div>Born {formatDate} - {age} Years</div>
                                <div>{patient.location}</div>
                                <div>{patient.telephone}</div>
                            </div>
                        </div>
                    </div>
                    <div className="manage-patient-table">
                        <div className="table-heading">
                            <div className="table-col">Complete Actions</div>
                            <div className="table-col">Content</div>
                            <div className="table-col">Date Approved</div>
                            <div className="table-col">Status</div>
                        </div>
                        <Accordion>
                            {patient.content.map((item) =>
                                <Card>
                                    <Card.Header>
                                        <div className="table-col">{item.category}</div>
                                        <div className="table-col">
                                            {
                                                item.content.length > 1 ?
                                                    item.content.map((row) =>
                                                        <div>{row}</div>
                                                    ) :
                                                    <div>{item.content}</div>
                                            }
                                        </div>
                                        <div className="table-col">{item.date.date}</div>
                                        <div className="table-col check_mark">Approved</div>
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
