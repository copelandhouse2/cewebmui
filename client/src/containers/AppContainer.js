import App from "../components/App";
import { connect } from "react-redux";
import { loadPending, loadSession, loadCities
  , loadClients, loadSubdivisions, loadContacts, getLookup
  , authenticate, loadGeotechs, loadGeoMasterData, loadControls, loadRelationships
  , updateSettings, updatePreferences, loadUsers, loadScope, ynDialog
  , loadOrganizations, authenticateTrello }
  from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    cities: state.cities,
    clients: state.clients,
    subdivisions: state.subdivisions,
    avffControls: state.avffControls,
    avffRelationships: state.avffRelationships,
    designers: state.designers,
    inspectors: state.inspectors,
    preferences: state.preferences,
    organizations: state.organizations
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
    loadUsers: function () {
      dispatch(loadUsers());
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
    updatePreferences: function (prefs) {
      dispatch(updatePreferences(prefs));
    },
    loadScope: function () {
      dispatch(loadScope());
    },
    ynDialog: function () {
      dispatch(ynDialog());
    },
    loadOrganizations: function () {
      dispatch(loadOrganizations());
    },
    authenticateTrello: function (token) {
      dispatch(authenticateTrello(token));
    },
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
