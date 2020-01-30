import { connect } from "react-redux";
import { SingleView, TabularView, GuidedView } from "../components/ceViews";
import { createAddress, commitAddresses
  , showHideClientDialog, showHideContactDialog, showHideSubdivisionDialog
  , showHideCityDialog, showHideGeotechDialog
  , loadMessage, searchForDups, clearProject, updateProject
  , loadFind } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    currentViews: state.currentViews,
    currentProject: state.currentProject,
    geos: state.geos,
    geoMasterData: state.geoMasterData,
    dups: state.dups,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clearProject: () => {
      dispatch(clearProject());
    },
    updateProject: (project) => {
      dispatch(updateProject(project));
    },
    createAddress: (project, v2) => {
      dispatch(createAddress(project, v2));
    },
    commitAddresses: (userID, addresses, search, create, v2) => {
      dispatch(commitAddresses(userID, addresses, search, create, v2));
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
    loadFind: (search) => {
      dispatch(loadFind(search));
    },
  };
}

export const SingleViewContainer = connect(mapStateToProps, mapDispatchToProps)(SingleView);
export const TabularViewContainer = connect(mapStateToProps, mapDispatchToProps)(TabularView);
export const GuidedViewContainer = connect(mapStateToProps, mapDispatchToProps)(GuidedView);
