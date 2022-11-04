import "../../Assets/Styles/ManagePatient.css";
import "../../Assets/Styles/Feedback.css";
import {Link} from "react-router-dom";

export default function FeedbackSuccess() {
    return (
        <>
            <section className="sect feedback-success-sect">
                <div className="feedback-success">
                    <div>
                        <p>Thank You!</p>
                        <div>Your feedback has been sent successfully.</div>
                    </div>
                    <img alt="success"
                         src="https://res.cloudinary.com/loksblnine/image/upload/v1663757537/PatientApp/assets_front/Success_uisuzc.svg"/>
                    <Link className="feedback-success-btn" to="/">Ok</Link>
                </div>
            </section>
        </>
    )
}
