import { connect } from "react-redux";
import Welcome from "../components/Welcome";
import { loadCurrentMenu, assignNewProjectScope } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    currentMenu: state.currentMenu,
    currentProject: state.currentProject,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadCurrentMenu: function (parent_id) {
      dispatch(loadCurrentMenu(parent_id));
    },
    assignNewProjectScope: function (scope) {
      dispatch(assignNewProjectScope(scope));
    },
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Welcome);
