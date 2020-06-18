import { connect } from "react-redux";
import Header from "../components/Header";
import { signOut } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    currentMenu: state.currentMenu,
    currentViews: state.currentViews,
    currentProject: state.currentProject,
    pageTitle: state.pageTitle,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signOut: function () {
      dispatch(signOut());
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);
