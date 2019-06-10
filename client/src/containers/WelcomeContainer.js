import { connect } from "react-redux";
import Welcome from "../components/Welcome";
import {  } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Welcome);
