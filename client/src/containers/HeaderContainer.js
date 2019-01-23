import Header from "../components/Header";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    session: state.session,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);
