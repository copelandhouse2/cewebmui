import { connect } from "react-redux";
import ClientDashboard from "../components/ClientDashboard";
import { loadMessage, ynDialog } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    currentClient: state.currentClient,
    reportTypesLookup: state.reportTypesLookup,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // saveClients: (clients) => {
    //   dispatch(saveClients(clients));
    // },
    loadMessage: function (message, type) {
      dispatch(loadMessage(message, type));
    },
    ynDialog: function (action) {
      dispatch(ynDialog(action));
    },

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientDashboard);
