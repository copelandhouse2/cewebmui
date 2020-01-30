import App from "../components/App";
import { connect } from "react-redux";
import { loadPending, loadSession, loadCities
  , loadClients, loadSubdivisions, loadContacts, getLookup
  , authenticate, loadGeotechs, loadGeoMasterData, loadControls, loadRelationships
  , updateSettings}
  from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    cities: state.cities,
    clients: state.clients,
    subdivisions: state.subdivisions,

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
    loadControls: function () {
      dispatch(loadControls());
    },
    loadRelationships: function () {
      dispatch(loadRelationships());
    },
    updateSettings: function (session, settings) {
      dispatch(updateSettings(session, settings));
    },
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
