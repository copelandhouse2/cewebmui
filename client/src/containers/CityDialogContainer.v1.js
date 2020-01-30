import { connect } from "react-redux";
import CityDialog from "../components/CityDialog";
import { createCity, getLookup, showHideCityDialog } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    cities: state.cities,
    stateLookup: state.stateLookup,
    countryLookup: state.countryLookup,
    showCityDialog: state.showCityDialog
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createCity: (city)=> {
      dispatch(createCity(city));
    },
    getLookup: (type)=> {
      dispatch(getLookup(type));
    },
    showHideCityDialog: () => {
      dispatch(showHideCityDialog());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CityDialog);
