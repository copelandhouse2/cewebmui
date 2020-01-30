import { connect } from "react-redux";
import Recents from "../components/Recents";
import { loadRecents } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    search: state.search

  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadRecents: function (searchFilter) {
      dispatch(loadRecents(searchFilter));
    },
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Recents);
