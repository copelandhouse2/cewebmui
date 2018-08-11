import { connect } from "react-redux";
import Starts from "../components/Starts";
import { deleteAddress } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    addresses: state.addresses

  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteAddress: function (id) {
      dispatch(deleteAddress(id));
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Starts);
