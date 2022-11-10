import "../../Assets/Styles/ManagePatient.css";
import "../../Assets/Styles/Feedback.css";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Header from "../../Layouts/Header/Header";
import FeedbackSuccess from "./FeedbackSuccess";
import {postFeedback} from "../../Store/actions/feedbackActions";

export default function Feedback() {
    const dispatch = useDispatch();

    const {id} = useSelector(state => state.userReducer.user)

    const [matches, setMatches] = useState(
        window.matchMedia("(max-width: 1200px)").matches
    );
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    useEffect(() => {
        window
            .matchMedia("(max-width: 1200px)")
            .addEventListener('change', e => setMatches(e.matches));

        if (message) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    });

    return (
        <>
            <Header/>
            <main>
                {
                    success ?
                        <FeedbackSuccess/>
                        :
                        <section className="sect">
                            <div className="manage-patient-heading"/>
                            <div className="feedback" style={matches ? {flexWrap: "wrap"} : {flexWrap: "nowrap"}}>
                                <div className="feedback-col"
                                     style={matches ? {marginBottom: "50px"} : {marginBottom: "0"}}
                                >
                                    <h1 className="feedback-heading">Feel free to give us<br/>your feedback</h1>
                                    <img alt="icon"
                                         src="https://res.cloudinary.com/loksblnine/image/upload/v1663757535/PatientApp/assets_front/Feedback_icon_vi42j6.svg"
                                    />
                                </div>
                                <div className="feedback-form">
                                    <div className="star-rating">
                                        {[...Array(5)].map((star, index) => {
                                            index += 1;
                                            return (
                                                <button
                                                    type="button"
                                                    key={index}
                                                    className={index <= (hover || rating) ? "star-btn on" : "star-btn off"}
                                                    onClick={() => {
                                                        setRating(index)

                                                    }}
                                                    onMouseEnter={() => setHover(index)}
                                                    onMouseLeave={() => setHover(rating)}
                                                >
                                                    <span className="star">&#9733;</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <textarea
                                        className="feedback-textarea"
                                        placeholder="Please write your feedback"
                                        required
                                        onChange={(event) => setMessage(event.target.value)}
                                    />
                                    <button
                                        className="feedback-btn"
                                        onClick={() => {
                                            dispatch(postFeedback(id, message, rating))
                                            setSuccess(true);
                                        }}
                                        disabled={disabled}
                                    >
                                        Send Feedback
                                    </button>
                                </div>
                            </div>
                        </section>
                }
            </main>
        </>
    )
}
