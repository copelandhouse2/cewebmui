import { connect } from "react-redux";
import Find from "../components/Find";
import { loadFind } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    search: state.search

  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadFind: function (searchFilter) {
      dispatch(loadFind(searchFilter));
    },
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Find);
