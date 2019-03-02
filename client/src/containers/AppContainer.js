import App from "../components/App";
import { connect } from "react-redux";
import { loadPending, loadSession, loadCities
  , loadClients, loadSubdivisions, loadJobNumberSeqs, authenticate }
  from "../actions";

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
    loadPending: function (userID) {
      dispatch(loadPending(userID));
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
    },
    authenticate: function () {
      dispatch(authenticate());
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
