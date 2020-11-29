import { connect } from "react-redux";
import Inspection from "../components/Inspection";
import { loadViewsByName, saveSubdivisions, deleteSubdivision
  , findSubdivisions, loadMessage } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    message: state.message,
    currentViews: state.currentViews,
    currentProject: state.currentProject,

    subdivisions: state.subdivisions,
    subSearch: state.subSearch,

  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadViewsByName: function (name) {
      dispatch(loadViewsByName(name));
    },
    saveSubdivisions: (subs) => {
      dispatch(saveSubdivisions(subs));
    },
    deleteSubdivision: function (id) {
      dispatch(deleteSubdivision(id));
    },
    findSubdivisions: function (findString) {
      dispatch(findSubdivisions(findString));
    },

    loadMessage: function (message, type) {
      dispatch(loadMessage(message, type));
    },

    // createAddress: (address)=> {
    //   dispatch(createAddress(address));
    // },
    // createCity: (city)=> {
    //   dispatch(createCity(city));
    // },
    // deleteCity: (id)=> {
    //   dispatch(deleteCity(id));
    // },
    // createSubdivision: (address)=> {
    //   dispatch(createSubdivision(address));
    // },
    // deleteSubdivision: (id)=> {
    //   dispatch(deleteSubdivision(id));
    // },
    // getLookup: (type)=> {
    //   dispatch(getLookup(type));
    // }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Inspection);
