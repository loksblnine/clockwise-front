import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../store/actions/userActions';
import App from '../components/App';

const mapStateToProps = ({user}) => ({
    user: user.user,
    isReady: user.isReady,
})

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(userActions, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
