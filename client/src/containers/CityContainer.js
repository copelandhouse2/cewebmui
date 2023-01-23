import { connect } from "react-redux";
import City from "../components/City";
import { loadViewsByName, saveCities, deleteCity, findCities
, loadMessage } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    message: state.message,
    currentViews: state.currentViews,
    currentProject: state.currentProject,

    cities: state.cities,
    citySearch: state.citySearch,

  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadViewsByName: function (name) {
      dispatch(loadViewsByName(name));
    },
    saveCities: (cities) => {
      dispatch(saveCities(cities));
    },
    deleteCity: function (id) {
      dispatch(deleteCity(id));
    },
    findCities: function (findString) {
      dispatch(findCities(findString));
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

export default connect(mapStateToProps, mapDispatchToProps)(City);
