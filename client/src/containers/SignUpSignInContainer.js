import { connect } from "react-redux";
import SignUpSignIn from "../components/SignUpSignIn";
import { loadSession, getLookup, loadMessage, signUp, signIn } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    message: state.message,
    roleLookup: state.roleLookup
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signUp: (user)=> {
      dispatch(signUp(user));
    },
    signIn: (user)=> {
      dispatch(signIn(user));
    },
    loadSession: function (username) {
      dispatch(loadSession(username));
    },
    loadMessage: function (message, type) {
      dispatch(loadMessage(message, type));
    },
    getLookup: (type)=> {
      dispatch(getLookup(type));
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUpSignIn);