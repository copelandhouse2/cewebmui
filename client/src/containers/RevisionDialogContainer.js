import { connect } from "react-redux";
import RevisionDialog from "../components/RevisionDialog";
import { loadMessage, loadLocalView, loadProjectRevisions
  , saveRevisions, deleteRevision } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    search: state.search,
    message: state.message,
    localView: state.localView,
    projectRevisions: state.projectRevisions,
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
    loadProjectRevisions: function (project_id) {
      dispatch(loadProjectRevisions(project_id));
    },
    saveRevisions: function (project_id, revs) {
      dispatch(saveRevisions(project_id, revs));
    },
    deleteRevision: function (project_id, revs) {
      dispatch(deleteRevision(project_id, revs));
    },
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(RevisionDialog);
