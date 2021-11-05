import { connect } from "react-redux";
import Search from "../components/Search";
import { loadFind, loadViews, loadViewsByName, loadCurrentMenu, updateProject,
createAddress, commitAddresses, loadMessage, deleteProject,
ynDialog } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    search: state.search,
    message: state.message,
    currentViews: state.currentViews,
    currentMenu: state.currentMenu,
    currentProject: state.currentProject,
    avffControls: state.avffControls,
    dups: state.dups,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadViews: function (parent_id, scope) {
      dispatch(loadViews(parent_id, scope));
    },
    loadViewsByName: function (name) {
      dispatch(loadViewsByName(name));
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
    deleteProject: function (id) {
      dispatch(deleteProject(id));
    },
    createAddress: (project, v2, updateSearch) => {
      dispatch(createAddress(project, v2, updateSearch));
    },
    commitAddresses: (userID, projects, create, v2, updateSearch) => {
      dispatch(commitAddresses(userID, projects, create, v2, updateSearch));
    },
    loadMessage: function (message, type) {
      dispatch(loadMessage(message, type));
    },
    ynDialog: (action) => {
      dispatch(ynDialog(action));
    },
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Search);
