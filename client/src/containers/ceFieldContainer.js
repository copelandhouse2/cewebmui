import { connect } from "react-redux";
import { Field, Field2, ColumnField } from "../components/ceField";
import { searchForDups, loadFind, loadMessage  } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    currentViews: state.currentViews,
    currentProject: state.currentProject,
    clients: state.clients,
    cities: state.cities,
    stateLookup: state.stateLookup,
    countryLookup: state.countryLookup,
    subdivisions: state.subdivisions,
    addresses: state.addresses,
    dups: state.dups,
    contacts: state.contacts,
    users: state.users,
    requestors: state.requestors,
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
    dateSearchLookup: state.dateSearchLookup,
    showClientDialog: state.showClientDialog,
    showContactDialog: state.showContactDialog,
    showSubdivisionDialog: state.showSubdivisionDialog,
    showCityDialog: state.showCityDialog,
    message: state.message,
    geos: state.geos,
    geoMasterData: state.geoMasterData,
    saveType: state.saveType,
    revReasonLookup: state.revReasonLookup,
    revRespLookup: state.revRespLookup,
    designers: state.designers,
    inspectors: state.inspectors,
    inspTypeLookup: state.inspTypeLookup,
    inspReasonLookup: state.inspReasonLookup,
    organizations: state.organizations,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchForDups: (test, project) => {
      dispatch(searchForDups(test, project));
    },
    loadFind: (search) => {
      dispatch(loadFind(search));
    },
    loadMessage: function (message, type) {
      dispatch(loadMessage(message, type));
    },
  };
}

export const FieldContainer = connect(mapStateToProps, mapDispatchToProps)(Field);

export const Field2Container = connect(mapStateToProps, mapDispatchToProps)(Field2);

export const ColumnContainer = connect(mapStateToProps, mapDispatchToProps)(ColumnField);
