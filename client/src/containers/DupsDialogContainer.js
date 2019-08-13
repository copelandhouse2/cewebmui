import { connect } from "react-redux";
import DupsDialog from "../components/DupsDialog";
import { clearDups } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    dups: state.dups,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clearDups: () => {
      dispatch(clearDups());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DupsDialog);
