import "../../Assets/Styles/Login.css";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Formik, Form, Field, ErrorMessage} from "formik";
import {ChangePasswordSchema} from "../../Utils/ValidationSchemas";
import {updatePassword} from "../../Store/actions/userActions";

export default function NewPassword() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [matches, setMatches] = useState(
    window.matchMedia("(max-width: 980px)").matches
  );
  const [newPasswordType, setNewPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const token = params.get("token");

  useEffect(() => {
    window
      .matchMedia("(max-width: 980px)")
      .addEventListener('change', e => setMatches(e.matches));
  });

  const toggleNewPassword = () => {
    if (newPasswordType === "password") {
      setNewPasswordType("text");
      return;
    }
    setNewPasswordType("password");
  };

  const toggleConfirmPassword = () => {
    if (confirmPasswordType === "password") {
      setConfirmPasswordType("text");
      return;
    }
    setConfirmPasswordType("password");
  };

  if (token) {
    localStorage.setItem("accessToken", token);
  } else {
    return window.location = "/";
  }
  return (
    <main className="auth" style={matches ? {flexDirection: "column"} : {flexDirection: "row"}}>
      <div className="starting-logo" style={matches ? {width: "unset", maxWidth: "unset"} : {width: "100%"}}>
        <img alt="starting_logo"
             src="https://res.cloudinary.com/loksblnine/image/upload/v1663757537/PatientApp/assets_front/starting_logo_igdmno.svg"
        />
      </div>
      <section className="auth-sect"
               style={matches ?
                 {
                   padding: "40px",
                   boxSizing: "border-box",
                   alignSelf: "center"
                 }
                 :
                 {
                   padding: "0 86px",
                   boxSizing: "unset",
                   alignSelf: "unset"
                 }}
      >
        <h1 className="auth-heading">Please enter your email</h1>
        <Formik
          initialValues={{
            newPassword: "",
            confirmPassword: ""
          }}
          validationSchema={ChangePasswordSchema}
          onSubmit={values => {
            dispatch(updatePassword(values.newPassword, navigate));
          }}
        >
          {() => (
            <Form>
              <div className="input-container">
                <label>New Password</label>
                <Field
                  type={newPasswordType}
                  name="newPassword"
                  maxLength="40" required
                  style={matches ? {maxWidth: "unset"} : {maxWidth: "500px"}}
                />
                <img alt="show_pw"
                     src="https://res.cloudinary.com/loksblnine/image/upload/v1663757663/PatientApp/assets_front/view_password_cbpq1d.svg"
                     className="auth-password_img" onClick={toggleNewPassword}
                />
                <span className="error">
                                    <ErrorMessage name="new_password"/>
                                </span>
              </div>
              <div className="input-container">
                <label>Confirm Password</label>
                <Field
                  type={confirmPasswordType}
                  name="confirmPassword"
                  maxLength="40" required
                  style={matches ? {maxWidth: "unset"} : {maxWidth: "500px"}}
                />
                <img alt="show_pw"
                     src="https://res.cloudinary.com/loksblnine/image/upload/v1663757663/PatientApp/assets_front/view_password_cbpq1d.svg"
                     className="auth-password_img" onClick={toggleConfirmPassword}
                />
                <span className="error">
                                    <ErrorMessage name="confirmPassword"/>
                                </span>
              </div>
              <div className="button-container">
                <input type="submit" value="Reset Password"/>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </main>
  );
}
