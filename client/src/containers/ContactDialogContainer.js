import { connect } from "react-redux";
import ContactDialog from "../components/ContactDialog";
import { createContact, showHideContactDialog } from "../actions";

function mapStateToProps(state) {
  return {
    session: state.session,
    contacts: state.contacts,
    showContactDialog: state.showContactDialog
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createContact: (contact)=> {
      dispatch(createContact(contact));
    },
    showHideContactDialog: () => {
      dispatch(showHideContactDialog());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactDialog);
