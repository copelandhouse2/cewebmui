import { connect } from "react-redux";
import CreateStart from "../components/CreateStart";
import { createAddress, deleteAddress, commitAddresses
  , showHideClientDialog, showHideContactDialog, showHideSubdivisionDialog
  , showHideCityDialog } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    clients: state.clients,
    cities: state.cities,
    subdivisions: state.subdivisions,
    addresses: state.addresses,
    showClientDialog: state.showClientDialog,
    showContactDialog: state.showContactDialog,
    showSubdivisionDialog: state.showSubdivisionDialog,
    showCityDialog: state.showCityDialog,

  };
}

function mapDispatchToProps(dispatch) {
  return {
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
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateStart);
