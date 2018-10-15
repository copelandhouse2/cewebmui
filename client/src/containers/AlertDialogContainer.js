import { connect } from "react-redux";
import AlertDialog from "../components/AlertDialog";
import { loadSession, ackMessage } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    message: state.message
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadSession: function (username) {
      dispatch(loadSession(username));
    },
    ackMessage: function () {
      dispatch(ackMessage());
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(AlertDialog);