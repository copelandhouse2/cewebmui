import { connect } from "react-redux";
import InspectionDialog from "../components/InspectionDialog";
import { loadMessage, loadLocalView, filterChoices
  , filterProjects, saveInspections, deleteInspection, ynDialog
  , loadPrevProjectInspections, getTrelloCard} from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    search: state.search,
    message: state.message,
    localView: state.localView,
    preferences: state.preferences,
    inspections: state.inspections,
    trelloInfo: state.trelloInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadMessage: function (message, type) {
      dispatch(loadMessage(message, type));
    },
    loadLocalView: function (name, clear) {
      dispatch(loadLocalView(name, clear));
    },
    filterChoices: (findString) => {
      dispatch(filterChoices(findString));
    },
    filterProjects: (findString) => {
      dispatch(filterProjects(findString));
    },
    saveInspections: (inspections) => {
      dispatch(saveInspections(inspections));
    },
    deleteInspection: (id) => {
      dispatch(deleteInspection(id));
    },
    ynDialog: (action) => {
      dispatch(ynDialog(action));
    },
    loadPrevProjectInspections: (insp_id, cur_insp_id) => {
      dispatch(loadPrevProjectInspections(insp_id, cur_insp_id));
    },
    // getTrelloCard: (card_id) => {
    //   dispatch(getTrelloCard(card_id));
    // },
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(InspectionDialog);
