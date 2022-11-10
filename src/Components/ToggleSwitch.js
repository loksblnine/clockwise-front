import Switch from "react-switch";
import {useDispatch} from "react-redux";
import {ACTIONS} from "../Utils/constants";

export default function ToggleSwitch(props) {
    const dispatch = useDispatch();
    const handleChange = (value) => {
        if (value) {
            dispatch({
                type: ACTIONS.CLINIC.ADD_TO_CLINIC_APPOINTMENT_TYPES_LIST,
                payload: props.element
            });
        } else {
            dispatch({
                type: ACTIONS.CLINIC.REMOVE_FROM_CLINIC_APPOINTMENT_TYPES_LIST,
                payload: props.element
            });
        }
    };

    return (
        <>
            <label className="toggle-label">
                <div>{props.element.description}</div>
                <Switch onChange={(e) => handleChange(e)} checked={props.checked}
                        onColor={"#47C0C1"} offColor={"#fff"}
                        offHandleColor={"#47C0C1"}
                        checkedIcon={false} uncheckedIcon={false}
                />
            </label>
        </>
    );
}
