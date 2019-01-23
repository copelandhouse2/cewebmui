import { connect } from "react-redux";
import SubdivisionDialog from "../components/SubdivisionDialog";
import { createSubdivision, showHideSubdivisionDialog } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    subdivisions: state.subdivisions,
    cities: state.cities,
    showSubdivisionDialog: state.showSubdivisionDialog
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createSubdivision: (subdivision)=> {
      dispatch(createSubdivision(subdivision));
    },
    showHideSubdivisionDialog: () => {
      dispatch(showHideSubdivisionDialog());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubdivisionDialog);
