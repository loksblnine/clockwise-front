import "../../Assets/Styles/ManagePatient.css";
import "../../Assets/Styles/Feedback.css";
import {useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Card from "react-bootstrap/Card";
import Moment from "moment";
import debounce from "lodash.debounce";
import Header from "../../Layouts/Header/Header";
import NoFound from "../../Layouts/NoFound/NoFound";
import {ACTIONS} from "../../Utils/constants";
import {getFeedbackList} from "../../Store/actions/feedbackActions";

export default function ListOfFeedbacks() {
    const dispatch = useDispatch();
    const {role} = useSelector(state => state.userReducer.user);
    const {filteredItems, page, loadNext, isReady} = useSelector(state => state.feedbackReducer);

    const [query, setQuery] = useState("");
    const [colHeading, setColHeading] = useState(null);
    const [order, setOrder] = useState("ASC");

    useEffect(() => {
        if (role === 1) {
            setColHeading("feedbacks")
        } else {
            setColHeading("doctor-feedbacks")
        }
    }, []);

    useEffect(() => {
        if (query) {
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
        if (!isReady && !query) {
            dispatch(getFeedbackList(colHeading, order, query, 0));
            setTimeout(() => {
                dispatch(getFeedbackList(colHeading, order, query, 1));
            }, 150);
        }
    }, [colHeading, order, query]);

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

    const handleNextFeedbacks = useCallback(() => {
        dispatch(getFeedbackList(colHeading, order, query, page));
    }, [query, order, page]);

    return (
        <>
            <Header/>
            <main>
                <section className="sect manage-patient-sect">
                    <div className="manage-patient-heading">
                        <h1>{role === 1 ? "Application" : "Doctor's"} Feedbacks</h1>
                        <div className="search">
                            <input className="search-input" placeholder="Search" maxLength="30"
                                   onChange={debouncedChangeHandler}
                            />
                        </div>
                    </div>
                    <div className="manage-patient-table">
                        <div
                            className="table-heading"
                            style={!filteredItems.length ? {borderBottom: "1px solid rgba(0, 0, 0, 0.175)"} : {border: "none"}}
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
                            filteredItems.map((item, i) =>
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
                            )
                        }
                    </div>
                    {filteredItems.length && loadNext ?
                        <div className="pagination" onClick={() => handleNextFeedbacks()}>
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