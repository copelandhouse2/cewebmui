import { connect } from 'react-redux';
import Settings from '../components/Settings';
import { updatePreferences } from '../actions';

function mapStateToProps(state) {
  return {
    session: state.session,
    preferences: state.preferences,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updatePreferences: function (prefs) {
      dispatch(updatePreferences(prefs));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
