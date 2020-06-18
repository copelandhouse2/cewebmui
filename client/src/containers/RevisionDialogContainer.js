import { connect } from "react-redux";
import RevisionDialog from "../components/RevisionDialog";
import { loadMessage, loadLocalView, loadProjectHistory } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    search: state.search,
    message: state.message,
    localView: state.localView,
    projectHistory: state.projectHistory,
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
    loadProjectHistory: function (project_id) {
      dispatch(loadProjectHistory(project_id));
    },
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(RevisionDialog);
