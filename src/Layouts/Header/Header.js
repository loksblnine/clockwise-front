import "../../Assets/Styles/Header.css";
import {Link, useNavigate} from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import ReactRoundedImage from "react-rounded-image";
import {useDispatch, useSelector} from "react-redux";
import {ACTIONS} from "../../Utils/constants";

export default function Header() {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userReducer.user);
    const clinicsList = useSelector(state => state.clinicReducer.items);

    const logout = () => {
        dispatch({type: ACTIONS.USER.LOG_OUT});
        navigate("/login");
    };

    return (
        <header>
            <Link to="/">
                <img alt="logo"
                     src="https://res.cloudinary.com/loksblnine/image/upload/v1663757535/PatientApp/assets_front/Logo_agpgeb.svg"
                />
            </Link>
            <div className="header-actions">
                {
                    userInfo.role === 3 ?
                        <Link to="/feedbacks" className="header-actions-item">Submit Feedback</Link>
                        :
                        userInfo.role === 2 ?
                            <div className="header-actions-items">
                                <Link to="/" className="header-actions-item">All Doctors</Link>
                                <Link to="/requests" className="header-actions-item">All Requests</Link>
                                <Link to="/feedbacks" className="header-actions-item">All Feedbacks</Link>
                            </div>
                            :
                            <div className="header-actions-items">
                                <Link to="/" className="header-actions-item">All Managers</Link>
                                <Link to="/doctors" className="header-actions-item">All Doctors</Link>
                                <Link to="/feedbacks" className="header-actions-item">All Feedbacks</Link>
                            </div>
                }
                <Dropdown className="header-dropdown">
                    <Dropdown.Toggle id="dropdown-basic">
                        <ReactRoundedImage
                            image={
                                !userInfo.photo_url ?
                                    "https://res.cloudinary.com/loksblnine/image/upload/v1663757535/PatientApp/assets_front/default_avatar_l8zadl.svg"
                                    :
                                    userInfo.photo_url
                            }
                            imageWidth="50"
                            imageHeight="50"
                            roundedSize="-3"
                        />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">
                            <Link to={`/profile/edit`} className="header-dropdown-item">Manage Profile</Link>
                            {userInfo.role === 1 ?
                                clinicsList.map((clinic, i) =>
                                    <Link
                                        key={`${clinic.id}-${clinic.name}-${i}`}
                                        to={`/office/${clinic.id}/edit`}
                                        className="header-dropdown-item"
                                    >
                                        Manage {clinic.name}
                                    </Link>
                                )
                                : userInfo.role === 2 ?
                                    <Link to="/office/edit" className="header-dropdown-item">Manage Office</Link>
                                    :
                                    null
                            }
                            <div onClick={logout} className="header-dropdown-item">Log Out</div>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </header>
    );
}
