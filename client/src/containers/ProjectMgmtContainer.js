import { connect } from "react-redux";
import ProjectMgmt from "../components/ProjectMgmt";
import { loadProjects, createAddress, deleteAddress, commitAddresses
  , showHideClientDialog, showHideContactDialog, showHideSubdivisionDialog
  , showHideCityDialog, showHideGeotechDialog, loadContacts
  , getLookup, loadMessage, searchForDups } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    clients: state.clients,
    cities: state.cities,
    subdivisions: state.subdivisions,
    addresses: state.addresses,
    dups: state.dups,
    contacts: state.contacts,
    trelloListLookup: state.trelloListLookup,
    projectStatusLookup: state.projectStatusLookup,
    scopeLookup: state.scopeLookup,
    classificationLookup: state.classificationLookup,
    masonryLookup: state.masonryLookup,
    ynLookup: state.ynLookup,
    fndTypeLookup: state.fndTypeLookup,
    garageTypeLookup: state.garageTypeLookup,
    garageEntryLookup: state.garageEntryLookup,
    garageSwingLookup: state.garageSwingLookup,
    floorTypeLookup: state.floorTypeLookup,
    roofTypeLookup: state.roofTypeLookup,
    coveredPatioLookup: state.coveredPatioLookup,
    pitaLookup: state.pitaLookup,
    dwellingTypeLookup: state.dwellingTypeLookup,
    showClientDialog: state.showClientDialog,
    showContactDialog: state.showContactDialog,
    showSubdivisionDialog: state.showSubdivisionDialog,
    showCityDialog: state.showCityDialog,
    message: state.message,
    geos: state.geos,
    geoMasterData: state.geoMasterData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadProjects: (search) => {
      dispatch(loadProjects(search));
    },
    createAddress: (address) => {
      dispatch(createAddress(address));
    },
    deleteAddress: (id, userID, loadType) => {
      dispatch(deleteAddress(id, userID, loadType));
    },
    commitAddresses: (userID, addresses, search, create) => {
      dispatch(commitAddresses(userID, addresses, search, create));
    },
    showHideClientDialog: () => {
      dispatch(showHideClientDialog());
    },
    showHideContactDialog: () => {
      dispatch(showHideContactDialog());
    },
    showHideSubdivisionDialog: () => {
      dispatch(showHideSubdivisionDialog());
    },
    showHideCityDialog: () => {
      dispatch(showHideCityDialog());
    },
    showHideGeotechDialog: () => {
      dispatch(showHideGeotechDialog());
    },
    loadContacts: function () {
      dispatch(loadContacts());
    },
    getLookup: function (lookup) {
      dispatch(getLookup(lookup));
    },
    loadMessage: function (message, type) {
      dispatch(loadMessage(message, type));
    },
    searchForDups: (test, project) => {
      dispatch(searchForDups(test, project));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMgmt);
