import { connect } from "react-redux";
import Client from "../components/Client";
import { createClient, deleteClient } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    clients: state.clients
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createClient: (client)=> {
      dispatch(createClient(client));
    },
    deleteClient: (id)=> {
      dispatch(deleteClient(id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Client);
