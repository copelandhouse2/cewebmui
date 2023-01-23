import { connect } from "react-redux";
import Client from "../components/Client";
import { loadViewsByName, saveClients, deleteClient, findClients
, loadMessage, getClientData, ynDialog } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    message: state.message,
    currentViews: state.currentViews,
    currentProject: state.currentProject,
    clients: state.clients,
    currentClient: state.currentClient,
    clientSearch: state.clientSearch,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadViewsByName: function (name) {
      dispatch(loadViewsByName(name));
    },
    saveClients: (clients) => {
      dispatch(saveClients(clients));
    },
    deleteClient: function (id) {
      dispatch(deleteClient(id));
    },
    findClients: function (findString) {
      dispatch(findClients(findString));
    },
    loadMessage: function (message, type) {
      dispatch(loadMessage(message, type));
    },
    getClientData: function (client_id) {
      dispatch(getClientData(client_id));
    },
    ynDialog: function (action) {
      dispatch(ynDialog(action));
    },

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Client);
