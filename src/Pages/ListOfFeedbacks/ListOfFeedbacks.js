import "../../Assets/Styles/ManagePatient.css";
import "../../Assets/Styles/Feedback.css";
import {useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Moment from "moment";
import debounce from "lodash.debounce";
import Header from "../../Layouts/Header/Header";
import NoFound from "../../Layouts/NoFound/NoFound";
import {ACTIONS} from "../../Utils/constants";
import {getFeedbackList} from "../../Store/actions/feedbackActions";

export default function ListOfFeedbacks() {
    const dispatch = useDispatch();
    const {filteredItems, page, loadNext} = useSelector(state => state.feedbackReducer);

    const [query, setQuery] = useState("");
    const [colHeading, setColHeading] = useState("doctor-feedbacks");
    const [order, setOrder] = useState("ASC");

    const changeHandler = (event) => {
        if (!event.target.value) {
            dispatch({
                type: ACTIONS.FEEDBACK.SET_OLD_ITEMS
            });
        } else {
            dispatch({
                type: ACTIONS.FEEDBACK.SET_PAGE,
                payload: 0
            });
        }
        setQuery(event.target.value.trim().toLowerCase());
    };

    const debouncedChangeHandler = useMemo(() => {
        return debounce(changeHandler, 300);
    }, []);

    useEffect(() => {
        if (query !== "") {
            dispatch({
                type: ACTIONS.FEEDBACK.CLEAR_ARRAY
            });
            dispatch(getFeedbackList(colHeading, order, query, 0));
            setTimeout(() => {
                dispatch(getFeedbackList(colHeading, order, query, 1));
            }, 150);
        }
    }, [colHeading, order, query]);

    useEffect(() => {
        if (!filteredItems.length && query === "") {
            dispatch(getFeedbackList(colHeading, order, query, 0));
            setTimeout(() => {
                dispatch(getFeedbackList(colHeading, order, query, 1));
            }, 150);
        }
    }, [colHeading, order, query]);

    const handleNextFeedbacks = useCallback(() => {
        dispatch(getFeedbackList(colHeading, order, query, page));
    }, [query, order, page]);

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
                                    if (order === "DESC") {
                                        setOrder("ASC")
                                    }
                                    setColHeading("doctor-feedbacks");
                                    dispatch({
                                        type: ACTIONS.FEEDBACK.CLEAR_ARRAY
                                    });
                                    activeBtn(event);
                                }}
                            >
                                Doctors Feedbacks
                            </div>
                            <div
                                id="Patients_Feedbacks"
                                className="manage-patient-btn"
                                onClick={(event) => {
                                    if (order === "DESC") {
                                        setOrder("ASC")
                                    }
                                    setColHeading("feedbacks");
                                    dispatch({
                                        type: ACTIONS.FEEDBACK.CLEAR_ARRAY
                                    });
                                    activeBtn(event);
                                }}
                            >
                                Application Feedbacks
                            </div>
                        </div>
                        <div className="search">
                            <input className="search-input" placeholder="Search" maxLength="30"
                                   onChange={debouncedChangeHandler}
                            />
                        </div>
                    </div>
                    <div className="manage-patient-table">
                        <div
                            className="table-heading"
                            style={!filteredItems.length ? {borderBottom: "1px solid #343760"} : {border: "none"}}
                        >
                            <div className="table-col-user">User</div>
                            <div className="table-col table-col-feedback">Feedback</div>
                            <div
                                className="table-col table-col-date"
                                onClick={() => {
                                    order === "ASC" ? setOrder("DESC") : setOrder("ASC");
                                    dispatch({
                                        type: ACTIONS.FEEDBACK.CLEAR_ARRAY
                                    });
                                }}
                            >
                                Date
                            </div>
                        </div>
                        {!filteredItems.length ? <NoFound/> :
                            <Accordion>
                                {filteredItems.map((item, i) =>
                                    <Card key={`${item.id} ${item?.date}`}>
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
                    {filteredItems.length && loadNext ?
                        <div className="pagination" onMouseEnter={() => handleNextFeedbacks()}>
                            <img alt="load_more"
                                 src="https://res.cloudinary.com/loksblnine/image/upload/v1665474445/PatientApp/assets_front/load_more_mg9qmt.svg"/>
                            Load More
                        </div>
                        :
                        null
                    }
                </section>
            </main>
        </>
    )
}