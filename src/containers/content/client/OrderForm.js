import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as cityActions from '../../../store/actions/cityActions';
import OrderForm from "../../../components/content/customer-content/OrderForm/OrderForm";

const mapStateToProps = ({cities}) => ({
    cities: cities.items,
    isReady: cities.isReady,
})

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(cityActions, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(OrderForm);
