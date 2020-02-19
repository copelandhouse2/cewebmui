import { connect } from "react-redux";
import Search from "../components/Search";
import { loadFind, loadViews, loadCurrentMenu, updateProject } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    search: state.search,
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
    loadFind: function (searchFilter) {
      dispatch(loadFind(searchFilter));
    },
    loadCurrentMenu: function (parent_id) {
      dispatch(loadCurrentMenu(parent_id));
    },
    updateProject: function (project) {
      dispatch(updateProject(project));
    },
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Search);
