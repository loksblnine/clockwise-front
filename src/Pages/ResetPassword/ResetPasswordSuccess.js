import "../../Assets/Styles/Login.css";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function ResetPasswordSuccess() {
    const [matches, setMatches] = useState(
        window.matchMedia("(max-width: 1000px)").matches
    );

    useEffect(() => {
        window
            .matchMedia("(max-width: 1000px)")
            .addEventListener('change', e => setMatches(e.matches));
    })

    return (
        <main className="auth" style={matches ? {flexDirection: "column"} : {flexDirection: "row"}}>
            <div className="starting-logo" style={matches ? {width: "unset", maxWidth: "unset"} : {width: "100%"}}>
                <img alt="starting_logo"
                     src="https://res.cloudinary.com/loksblnine/image/upload/v1663757537/PatientApp/assets_front/starting_logo_igdmno.svg"
                />
            </div>
            <section className="auth-sect"
                     style={matches ?
                         {padding: "40px", boxSizing: "border-box", maxWidth: "unset"}
                         :
                         {padding: "0 86px", boxSizing: "unset"}}
            >
                <h1 className="auth-heading">Password Recovery<br/>has been sent</h1>
                <p className="auth-subtitle">Your password request has been<br/>sent we will reply to you asap</p>
                <img className="auth-reset_img" alt="reset_pw_key"
                     src="https://res.cloudinary.com/loksblnine/image/upload/v1663757663/PatientApp/assets_front/reset_pw_key_iknzuc.svg"
                />
                <Link to="/login" className="auth-btn"
                      style={matches ? {maxWidth: "500px"} : {maxWidth: "unset"}}
                >
                    Sign in
                </Link>
            </section>
        </main>
    );
}
