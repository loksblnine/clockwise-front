import {useEffect} from "react";
import {useLocation} from "react-router-dom";

const ScrollToTop = (props) => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo((0, 0), { behaviour: 'smooth' });
    }, [location]);

    return <>{props.children}</>
};

export default ScrollToTop;