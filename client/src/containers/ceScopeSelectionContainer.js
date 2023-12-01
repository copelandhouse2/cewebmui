import { connect } from 'react-redux';
import { ScopeSelection } from '../components/ceScopeSelection';
import { loadLocalView, loadProjectRevisions, saveScopeRev } from '../actions';

function mapStateToProps(state) {
  return {
    session: state.session,
    currentMenu: state.currentMenu,
    currentViews: state.currentViews,
    currentProject: state.currentProject,
    avffControls: state.avffControls,
    avffRelationships: state.avffRelationships,
    localView: state.localView,
    projectRevisions: state.projectRevisions,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadLocalView: function (name, clear) {
      dispatch(loadLocalView(name, clear));
    },
    loadProjectRevisions: function (project_id) {
      dispatch(loadProjectRevisions(project_id));
    },
    saveScopeRev: function (project) {
      dispatch(saveScopeRev(project));
    },
  };
}

export const ScopeSelectionContainer = connect(mapStateToProps, mapDispatchToProps)(ScopeSelection);
