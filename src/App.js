import {useEffect} from "react";
import {BrowserRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import ScrollToTop from "./Components/ScrollToTop";
import AppRouter from "./AppRouter";
import {checkAuth, getUserInfo} from "./Store/actions/userActions";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.user);

  useEffect(() => {
    if (user?.id && !user?.first_name) {
      dispatch(getUserInfo(user?.id));
    }
    if (!user.id) {
      dispatch(checkAuth());
    }
  }, [user?.id, user?.first_name]);

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop>
          <AppRouter/>
        </ScrollToTop>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  );
}

export default App;