import { connect } from "react-redux";
import SignUpSignIn from "../components/SignUpSignIn";
import { loadSession } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadSession: function (username) {
      dispatch(loadSession(username));
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUpSignIn);