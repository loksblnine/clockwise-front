import "../../Assets/Styles/ManagePatient.css";
import "../../Assets/Styles/Feedback.css";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Moment from "moment";
import Header from "../../Layouts/Header/Header";
import NoFound from "../../Layouts/NoFound/NoFound";
import {getDoctorsFeedbackList, getPatientsFeedbackList} from "../../Store/actions/feedbackActions";

export default function ListOfFeedbacks() {
    const dispatch = useDispatch();
    const {isReady, doctorsFeedbacks, patientsFeedbacks} = useSelector(state => state.feedbackReducer);

    const [query, setQuery] = useState("");
    const [colHeading, setColHeading] = useState("Doctor");
    const [feedbackList, setFeedbackList] = useState([]);

    const filteredData = feedbackList.filter((feedback) => {
        if (query === '') {
            return feedback;
        } else {
            return (feedback.user.firstName.toLowerCase().includes(query) || feedback.user.lastName.toLowerCase().includes(query))
        }
    });

    useEffect(() => {
        if (isReady === false) {
            dispatch(getDoctorsFeedbackList());
            dispatch(getPatientsFeedbackList());
        }

        if (colHeading === "Doctor") {
            setFeedbackList(doctorsFeedbacks)
        }
    })

    const activeBtn = (event) => {
        const elements = document.getElementsByClassName("active-btn");
        for (let el of elements) {
            el.classList.remove("active-btn")
        }
        event.currentTarget.classList.add("active-btn");
    }

    return (
        <>
            <Header/>
            <main>
                <section className="sect manage-patient-sect">
                    <div className="manage-patient-heading">
                        <div className="manage-patient-buttons feedback-buttons">
                            <div
                                id="Doctors_Feedbacks"
                                className="manage-patient-btn active-btn"
                                onClick={(event) => {
                                    setFeedbackList(doctorsFeedbacks)
                                    setColHeading("Doctor");
                                    activeBtn(event);
                                }}
                            >
                                Doctors Feedbacks
                            </div>
                            <div
                                id="Patients_Feedbacks"
                                className="manage-patient-btn"
                                onClick={(event) => {
                                    setFeedbackList(patientsFeedbacks)
                                    setColHeading("Application");
                                    activeBtn(event);
                                }}
                            >
                                Application Feedbacks
                            </div>
                        </div>
                        <div className="search">
                            <input className="search-input" placeholder="Search" maxLength="30"
                                   onChange={event => setQuery(event.target.value.toLowerCase())}
                            />
                        </div>
                    </div>
                    <div className="manage-patient-table">
                        <div
                            className="table-heading"
                            style={filteredData.length < 1 ? {borderBottom: "1px solid #343760"} : {border: "none"}}
                        >
                            <div className="table-col-user">{colHeading}</div>
                            <div className="table-col table-col-feedback">Feedback</div>
                            <div className="table-col table-col-date">Date</div>
                        </div>
                        {filteredData.length < 1 ?
                            <NoFound/>
                            :
                            <Accordion>
                                {filteredData.map((item, i) =>
                                    <Card>
                                        <Card.Header>
                                            {/*<Link to={`/patients/${patient.id}`} className={"table-link"}>*/}
                                            <div className="table-col-user">
                                                <img alt="avatar"
                                                     src={!item?.user.photo_url ?
                                                         "https://res.cloudinary.com/loksblnine/image/upload/v1663757535/PatientApp/assets_front/default_avatar_l8zadl.svg"
                                                         :
                                                         item?.user.photo_url
                                                     }/>
                                                <div className="table-col">
                                                    <div>{item.user?.firstName} {item.user?.lastName}</div>
                                                </div>
                                            </div>
                                            {/*</Link>*/}
                                            <div className="table-col table-col-feedback">
                                                <div className="star-rating">
                                                    {[...Array(item?.stars)].map((star, index) => {
                                                        index += 1;
                                                        return (
                                                            <img alt="star" key={index}
                                                                 src={require("../../Assets/Images/filled_Star.svg").default}
                                                            />
                                                        );
                                                    })}
                                                </div>
                                                <div>{item.message}</div>
                                            </div>
                                            <div className="table-col">
                                                <div>{Moment(new Date(item.date)).format("DD/MM/YYYY")}</div>
                                                <div>{Moment(new Date(item.date)).format("HH:mm")}</div>
                                            </div>
                                        </Card.Header>
                                    </Card>
                                )}
                            </Accordion>
                        }
                    </div>
                    {/*<div className="pagination">*/}
                    {/*    <img alt="load_more" src="https://res.cloudinary.com/loksblnine/image/upload/v1665474445/PatientApp/assets_front/load_more_mg9qmt.svg"/>*/}
                    {/*    Load More*/}
                    {/*</div>*/}
                </section>
            </main>
        </>
    )
}