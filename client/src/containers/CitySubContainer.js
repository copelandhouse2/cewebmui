import { connect } from "react-redux";
import CitySub from "../components/CitySub";
import { createAddress, createCity, deleteCity, createSubdivision, deleteSubdivision, getLookup } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    clients: state.clients,
    cities: state.cities,
    subdivisions: state.subdivisions,
    jobnumberseqs: state.jobnumberseqs,
    stateLookup: state.stateLookup,
    countryLookup: state.countryLookup
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createAddress: (address)=> {
      dispatch(createAddress(address));
    },
    createCity: (city)=> {
      dispatch(createCity(city));
    },
    deleteCity: (id)=> {
      dispatch(deleteCity(id));
    },
    createSubdivision: (address)=> {
      dispatch(createSubdivision(address));
    },
    deleteSubdivision: (id)=> {
      dispatch(deleteSubdivision(id));
    },
    getLookup: (type)=> {
      dispatch(getLookup(type));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CitySub);
