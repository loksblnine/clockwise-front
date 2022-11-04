import "../../Assets/Styles/Header.css";
import {Link, useNavigate} from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import {useDispatch, useSelector} from "react-redux";
import {ACTIONS} from "../../Utils/constants";

export default function Header() {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userReducer.user);

    const logout = () => {
        dispatch({type: ACTIONS.USER.LOG_OUT});
        navigate("/login");
    };

    return (
        <header>
            <Link to="/">
                <img alt="logo"
                     src="https://res.cloudinary.com/loksblnine/image/upload/v1663757535/PatientApp/assets_front/Logo_agpgeb.svg"/>
            </Link>
            <div className="header-actions">
                {
                    userInfo.role !== 2 ?
                        <Link to="/feedbacks">Submit Feedback</Link>
                        :
                        <Link to="/feedbacks">All Feedbacks</Link>
                }
                <Dropdown className="header-dropdown">
                    <Dropdown.Toggle id="dropdown-basic">
                        <img className="header-avatar" alt="avatar"
                             src={
                                 !userInfo.photo_url ?
                                     "https://res.cloudinary.com/loksblnine/image/upload/v1663757535/PatientApp/assets_front/default_avatar_l8zadl.svg"
                                     :
                                     userInfo.photo_url
                             }/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">
                            <Link to={`/profile/edit`}>Manage Profile</Link>
                            {
                                userInfo.role !== 3 ?
                                    <Link to="/office/edit">Manage Office</Link>
                                    :
                                    null
                            }
                            <Link to="#">FAQ</Link>
                            <div onClick={logout}>Log Out</div>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </header>
    );
}
