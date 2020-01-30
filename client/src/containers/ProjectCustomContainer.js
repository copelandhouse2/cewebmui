import { connect } from "react-redux";
import ProjectCustom from "../components/ProjectCustom";
import { loadViews } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    message: state.message,
    currentViews: state.currentViews,
    currentMenu: state.currentMenu,
    currentProject: state.currentProject,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadViews: function (parent_id, scope) {
      dispatch(loadViews(parent_id, scope));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCustom);
