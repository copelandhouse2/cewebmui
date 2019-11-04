import { connect } from "react-redux";
import Welcome from "../components/Welcome2";
import { loadChildControls, assignNewProjectScope } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    currentControls: state.currentControls,
    currentProject: state.currentProject,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadChildControls: function (parent_id) {
      dispatch(loadChildControls(parent_id));
    },
    assignNewProjectScope: function (scope) {
      dispatch(assignNewProjectScope(scope));
    },
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Welcome);
