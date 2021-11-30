import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as cityActions from '../../../store/actions/cityActions';
import ListCities from "../../../components/content/admin-content/cities/ListCities";

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
)(ListCities);
