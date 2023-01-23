import { connect } from "react-redux";
import Inspection from "../components/Inspection";
import { loadViewsByName, loadMessage, loadInspections,
  filterChoices, filterProjects, saveInspections,
  deleteInspection, editInspection } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    message: state.message,
    currentViews: state.currentViews,
    currentProject: state.currentProject,
    inspections: state.inspections,
    preferences: state.preferences,
    trelloToken: state.trelloToken,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadViewsByName: function (name) {
      dispatch(loadViewsByName(name));
    },
    loadMessage: function (message, type) {
      dispatch(loadMessage(message, type));
    },

    loadInspections: (choice_type, choice_id, date_range) => {
      dispatch(loadInspections(choice_type, choice_id, date_range));
    },
    filterChoices: (findString) => {
      dispatch(filterChoices(findString));
    },
    filterProjects: (findString) => {
      dispatch(filterProjects(findString));
    },
    saveInspections: (inspection) => {
      dispatch(saveInspections(inspection));
    },
    editInspection: (project, insp_id) => {
      dispatch(editInspection(project, insp_id));
    },
    deleteInspection: (id) => {
      dispatch(deleteInspection(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Inspection);
