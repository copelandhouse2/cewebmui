import { connect } from "react-redux";
import Header from "../components/Header";
import { signOut } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signOut: function () {
      dispatch(signOut());
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);
