import App from "../components/App";
import { connect } from "react-redux";
import { loadPending, loadSession, loadCities
  , loadClients, loadSubdivisions, loadJobNumberSeqs, loadContacts, getLookup
  , authenticate, loadGeotechs, loadGeoMasterData }
  from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    settings: state.settings,
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
    loadContacts: function () {
      dispatch(loadContacts());
    },
    getLookup: function (lookup) {
      dispatch(getLookup(lookup));
    },
    authenticate: function () {
      dispatch(authenticate());
    },
    loadGeotechs: function () {
      dispatch(loadGeotechs());
    },
    loadGeoMasterData: function (id) {
      dispatch(loadGeoMasterData(id));
    },
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
