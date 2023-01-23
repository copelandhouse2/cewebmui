import { connect } from "react-redux";
import TrelloTokenDialog from "../components/TrelloTokenDialog";
import { loadMessage, loadLocalView, ynDialog } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    search: state.search,
    message: state.message,
    localView: state.localView,
    preferences: state.preferences,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadMessage: function (message, type) {
      dispatch(loadMessage(message, type));
    },
    loadLocalView: function (name, clear) {
      dispatch(loadLocalView(name, clear));
    },
    ynDialog: (action) => {
      dispatch(ynDialog(action));
    },
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(TrelloTokenDialog);
