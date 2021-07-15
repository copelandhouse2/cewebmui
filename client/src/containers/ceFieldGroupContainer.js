import { connect } from "react-redux";
import { FieldGroup, DialogInspectionAddFG } from "../components/ceFieldGroup";
// import {  } from "../actions";

function mapStateToProps(state) {
  return {

    inspections: state.inspections,
    // dups: state.dups,
  };
}

function mapDispatchToProps(dispatch) {
  return {


  };
}

export const FieldGroupContainer = connect(mapStateToProps, mapDispatchToProps)(FieldGroup);

export const DialogInspectionAddFGContainer = connect(mapStateToProps, mapDispatchToProps)(DialogInspectionAddFG);
