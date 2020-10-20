import { connect } from "react-redux";
import Geotech from "../components/Geotech";
import { loadViewsByName, saveGeotechs, deleteGeotech
  , findGeotechs, loadMessage } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    message: state.message,
    currentViews: state.currentViews,
    currentProject: state.currentProject,
    geos: state.geos,
    geoSearch: state.geoSearch,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadViewsByName: function (name) {
      dispatch(loadViewsByName(name));
    },
    saveGeotechs: (geos) => {
      dispatch(saveGeotechs(geos));
    },
    deleteGeotech: function (id) {
      dispatch(deleteGeotech(id));
    },
    findGeotechs: function (findString) {
      dispatch(findGeotechs(findString));
    },
    loadMessage: function (message, type) {
      dispatch(loadMessage(message, type));
    },
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Geotech);
