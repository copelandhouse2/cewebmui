import { connect } from "react-redux";
import { CeCard } from "../components/ceCard";
import { updateProject } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateProject: function (project) {
      dispatch(updateProject(project));
    },

  };
}

export const CardContainer = connect(mapStateToProps, mapDispatchToProps)(CeCard);
