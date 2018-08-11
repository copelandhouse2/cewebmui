import App from "./App";
import "./App.css";
import { connect } from "react-redux";
import { loadAddresses, loadSession, loadCities, loadClients, loadSubdivisions, loadJobNumberSeqs } from "./actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    cities: state.cities,
    clients: state.clients,
    subdivisions: state.subdivisions,
    jobnumberseqs: state.jobnumberseqs

  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadAddresses: function () {
      dispatch(loadAddresses());
    },
    loadSession: function (username) {
      dispatch(loadSession(username));
    },
    loadCities: function () {
      dispatch(loadCities());
    },
    loadClients: function () {
      dispatch(loadClients());
    },
    loadSubdivisions: function () {
      dispatch(loadSubdivisions());
    },
    loadJobNumberSeqs: function () {
      dispatch(loadJobNumberSeqs());
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
