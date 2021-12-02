import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as masterActions from '../../../store/actions/masterActions';
import ListMasters from "../../../components/content/admin-content/masters/ListMasters";

const mapStateToProps = ({masters}) => ({
    masters: masters.items,
    isReady: masters.isReady,
})

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(masterActions, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ListMasters);
