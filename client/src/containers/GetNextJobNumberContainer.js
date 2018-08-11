import { connect } from "react-redux";
import GetNextJobNumber from "../components/GetNextJobNumber";
import { createJobNumberSeq } from "../actions";

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
    createJobNumberSeq: (jobNumberSeq)=> {
      dispatch(createJobNumberSeq(jobNumberSeq));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GetNextJobNumber);
