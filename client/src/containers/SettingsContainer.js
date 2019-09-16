import { connect } from "react-redux";
import Settings from "../components/Settings";
import { updateSettings } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateSettings: function (settings) {
      dispatch(updateSettings(settings));
    },
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Settings);
