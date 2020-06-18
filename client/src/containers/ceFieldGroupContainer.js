import { connect } from "react-redux";
import { FieldGroup } from "../components/ceFieldGroup";
// import {  } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    currentViews: state.currentViews,
    currentProject: state.currentProject,
    // dups: state.dups,
  };
}

function mapDispatchToProps(dispatch) {
  return {


  };
}

export const FieldGroupContainer = connect(mapStateToProps, mapDispatchToProps)(FieldGroup);
