import { connect } from "react-redux";
import JobNumberSeq from "../components/JobNumberSeq";
import { createJobNumberSeq, deleteJobNumberSeq } from "../actions";

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
    },
    deleteJobNumberSeq: (id)=> {
      dispatch(deleteJobNumberSeq(id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(JobNumberSeq);
