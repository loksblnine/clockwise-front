import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as customerActions from '../../../store/actions/customerActions';
import ListCustomers from "../../../components/content/admin-content/customers/ListCustomers";

const mapStateToProps = ({customers}) => ({
    customers: customers.items,
    isReady: customers.isReady,
})

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(customerActions, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ListCustomers);
