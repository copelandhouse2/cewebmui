import { connect } from "react-redux";
import CePage from "../components/cePage";
// import { loadFind, loadViews, loadCurrentMenu, updateProject, setPageTitle } from "../actions";
import { setPageTitle } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    // search: state.search,
    // message: state.message,
    // currentViews: state.currentViews,
    // currentMenu: state.currentMenu,
    // currentProject: state.currentProject,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // loadViews: function (parent_id, scope) {
    //   dispatch(loadViews(parent_id, scope));
    // },
    // loadFind: function (searchFilter) {
    //   dispatch(loadFind(searchFilter));
    // },
    // loadCurrentMenu: function (parent_id) {
    //   dispatch(loadCurrentMenu(parent_id));
    // },
    // updateProject: function (project) {
    //   dispatch(updateProject(project));
    // },
    setPageTitle: function (title) {
      dispatch(setPageTitle(title));
    },
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(CePage);
