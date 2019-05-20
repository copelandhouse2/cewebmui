import { connect } from "react-redux";
import ProjectCreate from "../components/ProjectCreate";
import { createAddress
  , showHideClientDialog, showHideContactDialog, showHideSubdivisionDialog
  , showHideCityDialog, showHideGeotechDialog
  , loadMessage } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    clients: state.clients,
    cities: state.cities,
    subdivisions: state.subdivisions,
    addresses: state.addresses,
    contacts: state.contacts,
    trelloListLookup: state.trelloListLookup,
    masonryLookup: state.masonryLookup,
    ynLookup: state.ynLookup,
    fndTypeLookup: state.fndTypeLookup,
    garageTypeLookup: state.garageTypeLookup,
    garageEntryLookup: state.garageEntryLookup,
    garageSwingLookup: state.garageSwingLookup,
    coveredPatioLookup: state.coveredPatioLookup,
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
    createAddress: (address, userID, loadType) => {
      dispatch(createAddress(address, userID, loadType));
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCreate);
