import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as orderActions from '../../../store/actions/orderActions';
import ListOrders from "../../../components/content/admin-content/orders/ListOrders";

const mapStateToProps = ({orders}) => ({
    orders: orders.items,
    isReady: orders.isReady,
})

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(orderActions, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ListOrders);
