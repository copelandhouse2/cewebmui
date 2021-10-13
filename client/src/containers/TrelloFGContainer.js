import { connect } from "react-redux";
import { TrelloFG } from "../components/ceFieldGroupTrello";
// import { } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    trelloInfo: state.trelloInfo,
    inspectors: state.contacts,  // I know this is using all contacts.  That is only for validation in case scheduler is not inspector.
  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TrelloFG);
