import { connect } from "react-redux";
import { ScopeSelection } from "../components/ceScopeSelection";
// import {  } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    currentMenu: state.currentMenu,
    currentViews: state.currentViews,
    currentProject: state.currentProject,
    avffControls: state.avffControls,
    avffRelationships: state.avffRelationships,
  };
}

function mapDispatchToProps(dispatch) {
  return {


  };
}

export const ScopeSelectionContainer = connect(mapStateToProps, mapDispatchToProps)(ScopeSelection);
