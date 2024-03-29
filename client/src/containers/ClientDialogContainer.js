import { connect } from "react-redux";
import ClientDialog from "../components/ClientDialog";
import { createClient, saveClients, showHideClientDialog } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    clients: state.clients,
    showClientDialog: state.showClientDialog
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createClient: (client)=> {
      dispatch(createClient(client));
    },
    saveClients: (clients)=> {
      dispatch(saveClients(clients));
    },
    showHideClientDialog: () => {
      dispatch(showHideClientDialog());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientDialog);
