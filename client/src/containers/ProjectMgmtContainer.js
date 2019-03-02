import { connect } from "react-redux";
import ProjectMgmt from "../components/ProjectMgmt";
import { loadProjects, createAddress, deleteAddress, commitAddresses
  , showHideClientDialog, showHideContactDialog, showHideSubdivisionDialog
  , showHideCityDialog, loadContacts, getLookup, loadMessage } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    clients: state.clients,
    cities: state.cities,
    subdivisions: state.subdivisions,
    addresses: state.addresses,
    contacts: state.contacts,
    trelloListLookup: state.trelloListLookup,
    projectStatusLookup: state.projectStatusLookup,
    scopeLookup: state.scopeLookup,
    masonryLookup: state.masonryLookup,
    ynLookup: state.ynLookup,
    fndTypeLookup: state.fndTypeLookup,
    garageTypeLookup: state.garageTypeLookup,
    garageEntryLookup: state.garageEntryLookup,
    garageSwingLookup: state.garageSwingLookup,
    floorTypeLookup: state.floorTypeLookup,
    roofTypeLookup: state.roofTypeLookup,
    showClientDialog: state.showClientDialog,
    showContactDialog: state.showContactDialog,
    showSubdivisionDialog: state.showSubdivisionDialog,
    showCityDialog: state.showCityDialog,
    message: state.message,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadProjects: (search) => {
      dispatch(loadProjects(search));
    },
    createAddress: (address, userID, loadType) => {
      dispatch(createAddress(address, userID, loadType));
    },
    deleteAddress: (id, userID, loadType) => {
      dispatch(deleteAddress(id, userID, loadType));
    },
    commitAddresses: (addresses, userID, loadType) => {
      dispatch(commitAddresses(addresses, userID, loadType));
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
    loadContacts: function () {
      dispatch(loadContacts());
    },
    getLookup: function (lookup) {
      dispatch(getLookup(lookup));
    },
    loadMessage: function (message, type) {
      dispatch(loadMessage(message, type));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMgmt);
