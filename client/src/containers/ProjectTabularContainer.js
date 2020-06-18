import { connect } from "react-redux";
import ProjectTabular from "../components/ProjectTabular";
import { loadFind, loadViews, loadCurrentMenu, updateProject } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    search: state.search,
    message: state.message,
    currentViews: state.currentViews,
    currentMenu: state.currentMenu,
    currentProject: state.currentProject,
    avffControls: state.avffControls,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadViews: function (parent_id, scope) {
      dispatch(loadViews(parent_id, scope));
    },
    loadFind: function (searchFilter, searchFields) {
      dispatch(loadFind(searchFilter, searchFields));
    },
    loadCurrentMenu: function (parent_id) {
      dispatch(loadCurrentMenu(parent_id));
    },
    updateProject: function (project) {
      dispatch(updateProject(project));
    },
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(ProjectTabular);
