import { connect } from "react-redux";
import ProjectCreate from "../components/ProjectCreate";
import { createAddress, commitAddresses
  , showHideClientDialog, showHideContactDialog, showHideSubdivisionDialog
  , showHideCityDialog, showHideGeotechDialog
  , loadMessage, searchForDups } from "../actions";

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
    masonryLookup: state.masonryLookup,
    ynLookup: state.ynLookup,
    scopeLookup: state.scopeLookup,
    fndTypeLookup: state.fndTypeLookup,
    garageTypeLookup: state.garageTypeLookup,
    garageEntryLookup: state.garageEntryLookup,
    garageSwingLookup: state.garageSwingLookup,
    coveredPatioLookup: state.coveredPatioLookup,
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
    createAddress: (address) => {
      dispatch(createAddress(address));
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
    loadMessage: function (message, type) {
      dispatch(loadMessage(message, type));
    },
    searchForDups: (test, project) => {
      dispatch(searchForDups(test, project));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCreate);
