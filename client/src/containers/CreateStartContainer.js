import { connect } from "react-redux";
import CreateStart from "../components/CreateStart";
import { createAddress } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    clients: state.clients,
    cities: state.cities,
    subdivisions: state.subdivisions,
    jobnumberseqs: state.jobnumberseqs
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createAddress: (address)=> {
      dispatch(createAddress(address));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateStart);
