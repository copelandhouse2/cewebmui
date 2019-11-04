import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Fab from '@material-ui/core/Fab';
// import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Save from '@material-ui/icons/Save';
import Cancel from '@material-ui/icons/Cancel';
import Lock from '@material-ui/icons/Lock';
import LockOpen from '@material-ui/icons/LockOpen';

// import ExpandMore from '@material-ui/icons/ExpandMore';

import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import ClientDialogContainer from '../containers/ClientDialogContainer';
import ContactDialogContainer from '../containers/ContactDialogContainer';
import CityDialogContainer from '../containers/CityDialogContainer';
import SubdivisionDialogContainer from '../containers/SubdivisionDialogContainer';
import AlertDialogContainer from '../containers/AlertDialogContainer';
import ProjectCreateContainer from '../containers/ProjectCreateContainer';
import DupsDialogContainer from '../containers/DupsDialogContainer';

// import classNames from 'classnames';

const styles = theme => ({
  // container: { marginBottom: 70, },
  bodyPaper: {
    padding: 20,
    // minHeight: '85vh',
    // marginTop: -10
  },
  Paper: { padding: 20, marginTop: 10, marginBottom: 10 },
  grow: { flexGrow: 0, },
  // rightJust: { textAlign: 'right', },
  tableWidth: { width: '100%' },  // removes the table width css style.  Now control table size by column width.
  inputLabelProps: { fontSize: 12 },
  speedInputProps: { fontSize: 12, padding: 4, fontColor: 'black', height: 15 },
  inputProps: { fontSize: 12, padding: 8, fontColor: 'black', minHeight: 19 },
  tabContainerProps: {paddingLeft: 16, paddingRight: 16},
  tableCellEntryProps: {borderLeftWidth: 1, borderLeftStyle: 'solid', borderLeftColor: 'lightgray'},
  tableCellProps: {borderLeftWidth: 1, borderLeftStyle: 'solid', borderLeftColor: 'lightgray', paddingLeft: 5},
  formControl: { margin: theme.spacing.unit, minWidth: 120, },
  panelSummaryProps: {backgroundColor: theme.palette.primary.main, color: theme.palette.secondary.main},

  content: {
    flexGrow: 1,
    // padding: theme.spacing.unit * 3,  // controls padding around top paper element.
    paddingTop:10,
    paddingLeft: 10,
    paddingRight:10,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // paddingRight: 100,
  },

});

// object property to handle the react-select control.  Had to pull it outside MUI styles function.
// Wasn't working when embedded there.
const createSelectProps = {
  option: (provided) => ({ ...provided, fontSize: 12, }),
  input: (provided) => ({ ...provided, color: 'black', }),
  singleValue: (provided) => ({ ...provided, color: 'black', }),
  placeholder: (provided) => ({ ...provided, color: 'black', }),
  control: (provided, state) => ({ ...provided, marginTop:1, minHeight: 10, height: 35, color: 'black', backgroundColor: '#e8e8e8', fontSize: 12, borderWidth: 0,
    borderBottomWidth: state.isFocused? 2:1, borderBottomStyle: 'solid', borderBottomColor: 'black', borderBottomLeftRadius: 0, borderBottomRightRadius: 0,
    ':hover': {borderBottomWidth: state.isFocused? 2:1, borderBottomStyle: 'solid', borderBottomColor: 'black', backgroundColor: '#dedede'},
  }),
};

class ProjectMgmt extends Component {
  constructor(props) {
    super(props);

    this.addrRef = React.createRef();

    this.NEW_ROW = -1;

    this.today = new Date();
    const theMonth = this.today.getMonth()+1 < 10? `0${this.today.getMonth()+1}` : `${this.today.getMonth()+1}`;
    const theDay = this.today.getDate() < 10? `0${this.today.getDate()}` : `${this.today.getDate()}`;
    this.todayStr = `${this.today.getFullYear()}-${theMonth}-${theDay}`;

    this.state = {
      address_id: null,
      job_number: null,
      jobNumUnlock: false,
      revision: '',
      revision_desc: '',
      client_id: null,
      client: '',
      requestor_id: this.props.session.contact_id,  // contact_id
      requestor: this.props.session.full_name,       // contact full name
      owner_id: null,      // user_id
      owner: '',           // contact full name of the user_id
      city_id: null,
      city: '',
      subdivision_id: null,
      subdivision: '',
      address1: '',
      address2: '',
      phase: '',
      section: '',
      lot: '',
      block: '',
      fnd_height_fr: null,
      fnd_height_fl: null,
      fnd_height_rr: null,
      fnd_height_rl: null,
      plan_type: '',
      elevation: '',
      masonry: '',
      garage_type: '',
      garage_entry: '',
      garage_swing: '',
      garage_drop: null,
      garage_extension: null,
      covered_patio: 'N',
      bay_window: 'N',
      master_shower_drop: 'N',
      bath1_shower_drop: 'N',
      bath2_shower_drop: 'N',
      bath3_shower_drop: 'N',
      geo_lab: '',
      geo_report_num: '',
      geo_report_date: null,
      geo_pi: null,
      em_center: null,
      em_edge: null,
      ym_center: null,
      ym_edge: null,
      soil_notes: '',
      additional_options: '',
      comments: '',
      created_by: null,
      last_updated_by: null,
      sequence_id: null,
      prefix: '',
      sequence: null,
      year: null,
      currentTab: 'main',
      status: '',
      editRow: this.NEW_ROW, // this is the address array id that is being edited.  If -1, new address.
      dialogValue: '',
      showSubDialog: false,
      // Custom Project fields
      project_status: '',
      scope: 'FDN',
      classification: 'VOLUME',
      onboard_date: this.todayStr,
      start_date: this.todayStr,
      due_date: null,  // actual due date of the project.
      final_due_date: null,
      transmittal_date: null,
      main_contact: '',
      billing_contact: '',
      builder_contact: '',
      foundation_type: 'POST TENSION',
      floor_type: '',
      roof_type: '',
      num_stories: null,
      square_footage: null,
      pita_factor: null,
      dwelling_type: 'PT 1 UNIT',
      // Trello and Box
      box_folder: '',
      trello_list_id: '',
      trello_list: '',
      trello_card_id: '',
      createTrelloCard: false,
      rememberData: false,
      toggleQuickEntry: true,
      search: {
        pendingOnly: true,
        jobNumber: '',
        address: '',
        dateRange: 1,
        enteredBy: this.props.session.id,
        requestedBy: '',
        client: '',
        city: '',
        subdivision: '',
        status: '',
      },
      dupsDialogActivate: false,
    };

    this.tabs = [
      {name: 'pre_key', fields: [
        {label: '', name: 'edit', id: '', type: 'text', width: '3%', isDisabled: false, required: false, list: []},
        {label: '', name: 'delete', id: '', type: 'text', width: '3%', isDisabled: false, required: false, list: []},
        {label: 'Job Number', name: 'job_number', id: '', type: 'number', width: '9%', isDisabled: true, required: false, list: []},
        {label: '', name: 'jobNumUnlock', id: '', type: 'text', width: '1%', isDisabled: false, required: false, list: []},
        {label: 'Address', name: 'address1', id: '', type: 'text', width: '14%', isDisabled: false, required: true, list: []},
      ]},
      {name: 'main', fields: [
        {label: 'Rev', name: 'revision', id: '', type: 'text', width: '3%', isDisabled: false, required: false, list: []},
        {label: 'Rev Desc', name: 'revision_desc', id: '', type: 'text', width: '12%', isDisabled: false, required: false, list: []},
        // {label: 'Address 2', name: 'address2', id: '', type: 'text', width: '10%', isDisabled: false, required: false, list: []},
        {label: 'Client', name: 'client', id: 'client_id', type: 'text', width: '10%', isDisabled: false, required: true, list: []},
        {label: 'Requestor', name: 'requestor', id: 'requestor_id', type: 'text', width: '10%', isDisabled: true, required: false, list: []},
        {label: 'Subdivision', name: 'subdivision', id: 'subdivision_id', type: 'text', width: '10%', isDisabled: true, required: false, list: []},
        {label: 'City', name: 'city', id: 'city_id', type: 'text', width: '10%', isDisabled: true, required: false, list: [], nextTab:'project'},
        {label: '', name: 'overflow', id: '', type: 'text', width: '5%', isDisabled: false, required: false, list: []},
      ]},
      {name: 'project', fields: [
        // {label: 'Proj Status', name: 'project_status', id: '', type: 'text', width: '10%', isDisabled: false, required: false, list: []},
        {label: 'Classification', name: 'classification', id: '', type: 'text', width: '10%', isDisabled: false, required: false, list: []},
        {label: 'Scope', name: 'scope', id: '', width: '10%', type: 'text', isDisabled: false, required: false, list: []},
        {label: 'Due Date', name: 'due_date', id: '', type: 'date', width: '7%', isDisabled: false, required: false, list: []},
        {label: 'Onboard Date', name: 'onboard_date', id: '', type: 'date', width: '7%', isDisabled: false, required: false, list: []},
        {label: 'Start Date', name: 'start_date', id: '', type: 'date', width: '7%', isDisabled: false, required: false, list: []},
        {label: 'Final Due Date', name: 'final_due_date', id: '', type: 'date', width: '7%', isDisabled: false, required: false, list: []},
        {label: 'Transmittal Date', name: 'transmittal_date', id: '', type: 'date', width: '7%', isDisabled: false, required: false, list: [], nextTab:'communication'},
        {label: '', name: 'overflow', id: '', type: 'text', width: '5%', isDisabled: false, required: false, list: []},
      ]},
      {name: 'communication', fields: [
        {label: 'Main Contact', name: 'main_contact', id: '', type: 'text', width: '10%', isDisabled: false, required: false, list: []},
        {label: 'Billing', name: 'billing_contact', id: '', type: 'text', width: '10%', isDisabled: false, required: false, list: []},
        {label: 'Builder', name: 'builder_contact', id: '', type: 'text', width: '10%', isDisabled: false, required: false, list: []},
        {label: 'Box Folder', name: 'box_folder', id: '', type: 'text', width: '15%', isDisabled: false, required: false, list: [], nextTab:'lot'},
        {label: '', name: 'overflow', id: '', type: 'text', width: '15%', isDisabled: false, required: false, list: []},
      ]},
      {name: 'lot', fields: [
        {label: 'Phase', name: 'phase', id: '', type: 'text', width: '5%', isDisabled: false, required: false, list: []},
        {label: 'Section', name: 'section', id: '', type: 'text', width: '5%', isDisabled: false, required: false, list: []},
        {label: 'Block', name: 'block', id: '', type: 'text', width: '5%', isDisabled: false, required: false, list: []},
        {label: 'Lot', name: 'lot', id: '', type: 'text', width: '5%', isDisabled: false, required: false, list: [], nextTab:'design'},
        {label: '', name: 'overflow', id: '', type: 'text', width: '40%', isDisabled: false, required: false, list: []},
      ]},
      {name: 'design', fields: [
        {label: 'Plan Type', name: 'plan_type', id: '', type: 'text', width: '8%', isDisabled: false, required: false, list: []},
        {label: 'Elevation', name: 'elevation', id: '', type: 'text', width: '8%', isDisabled: false, required: false, list: []},
        {label: 'Masonry', name: 'masonry', id: '', type: 'text', width: '8%', isDisabled: false, required: false, list: []},
        {label: 'Covered Patio', name: 'covered_patio', id: '', type: 'text', width: '8%', isDisabled: false, required: false, list: []},
        {label: 'Bay Window', name: 'bay_window', id: '', type: 'text', width: '8%', isDisabled: false, required: false, list: []},
        {label: 'Dwelling', name: 'dwelling_type', id: '', type: 'text', width: '8%', isDisabled: false, required: false, list: []},
        {label: 'FDN Type', name: 'foundation_type', id: '', type: 'text', width: '8%', isDisabled: false, required: false, list: [], nextTab:'garage'},
        {label: '', name: 'overflow', id: '', type: 'text', width: '4%', isDisabled: false, required: false, list: []},
      ]},
      {name: 'garage', fields: [
        {label: 'Garage Type', name: 'garage_type', id: '', type: 'text', width: '12%', isDisabled: false, required: false, list: []},
        {label: 'Garage Entry', name: 'garage_entry', id: '', type: 'text', width: '12%', isDisabled: false, required: false, list: []},
        {label: 'Garage Swing', name: 'garage_swing', id: '', type: 'text', width: '8%', isDisabled: false, required: false, list: []},
        {label: 'Garage Ext', name: 'garage_extension', id: '', type: 'number', width: '8%', isDisabled: false, required: false, list: []},
        {label: 'Garage Drop', name: 'garage_drop', id: '', type: 'number', width: '8%', isDisabled: false, required: false, list: [], nextTab:'drop'},
        {label: '', name: 'overflow', id: '', type: 'text', width: '12%', isDisabled: false, required: false, list: []},
      ]},
      {name: 'drop', fields: [
        {label: 'Master', name: 'master_shower_drop', id: '', type: 'text', width: '8%', isDisabled: false, required: false, list: []},
        {label: 'Bath 1', name: 'bath1_shower_drop', id: '', type: 'text', width: '8%', isDisabled: false, required: false, list: []},
        {label: 'Bath 2', name: 'bath2_shower_drop', id: '', type: 'text', width: '8%', isDisabled: false, required: false, list: []},
        {label: 'Bath 3', name: 'bath3_shower_drop', id: '', type: 'text', width: '8%', isDisabled: false, required: false, list: [], nextTab:'soil'},
        {label: '', name: 'overflow', id: '', type: 'text', width: '28%', isDisabled: false, required: false, list: []},
      ]},
      {name: 'soil', fields: [
        {label: 'Lab', name: 'geo_lab', id: '', type: 'text', width: '10%', isDisabled: false, required: false, list: []},
        {label: 'Report #', name: 'geo_report_num', id: '', type: 'text', width: '8%', isDisabled: false, required: false, list: []},
        {label: 'Report Date', name: 'geo_report_date', id: '', type: 'date', width: '7%', isDisabled: false, required: false, list: []},
        {label: 'PI', name: 'geo_pi', id: '', type: 'text', width: '4%', isDisabled: false, required: false, list: []},
        {label: 'EmC', name: 'em_center', id: '', type: 'number', width: '4%', isDisabled: false, required: false, list: []},
        {label: 'EmE', name: 'em_edge', id: '', type: 'number', width: '4%', isDisabled: false, required: false, list: []},
        {label: 'YmC', name: 'ym_center', id: '', type: 'number', width: '4%', isDisabled: false, required: false, list: []},
        {label: 'YmE', name: 'ym_edge', id: '', type: 'number', width: '4%', isDisabled: false, required: false, list: []},
        {label: 'Soil Notes', name: 'soil_notes', id: '', type: 'text', width: '13%', isDisabled: false, required: false, list: [], nextTab:'form'},
        {label: '', name: 'overflow', id: '', type: 'text', width: '2%', isDisabled: false, required: false, list: []},
      ]},
      {name: 'form', fields: [
        {label: 'Front RT', name: 'fnd_height_fr', id: '', type: 'number', width: '8%', isDisabled: false, required: false, list: []},
        {label: 'Front LT', name: 'fnd_height_fl', id: '', type: 'number', width: '8%', isDisabled: false, required: false, list: []},
        {label: 'Rear RT', name: 'fnd_height_rr', id: '', type: 'number', width: '8%', isDisabled: false, required: false, list: []},
        {label: 'Rear LT', name: 'fnd_height_rl', id: '', type: 'number', width: '8%', isDisabled: false, required: false, list: [], nextTab:'framing'},
        {label: '', name: 'overflow', id: '', type: 'text', width: '28%', isDisabled: false, required: false, list: []},
      ]},
      {name: 'framing', fields: [
        {label: 'FDN Type', name: 'foundation_type', id: '', type: 'text', width: '10%', isDisabled: false, required: false, list: []},
        {label: 'Floor Type', name: 'floor_type', id: '', type: 'text', width: '10%', isDisabled: false, required: false, list: []},
        {label: 'Roof Type', name: 'roof_type', id: '', type: 'text', width: '10%', isDisabled: false, required: false, list: []},
        {label: 'Stories', name: 'num_stories', id: '', type: 'number', width: '5%', isDisabled: false, required: false, list: []},
        {label: 'SQFT', name: 'square_footage', id: '', type: 'number', width: '5%', isDisabled: false, required: false, list: []},
        {label: 'PITA', name: 'pita_factor', id: '', type: 'number', width: '6%', isDisabled: false, required: false, list: [], nextTab:'notes'},
        {label: '', name: 'overflow', id: '', type: 'text', width: '14%', isDisabled: false, required: false, list: []},
      ]},
      {name: 'notes', fields: [
        {label: 'Addl Options', name: 'additional_options', id: '', type: 'text', width: '25%', isDisabled: false, required: false, list: []},
        {label: 'Notes', name: 'comments', id: '', type: 'text', width: '25%', isDisabled: false, required: false, list: [], nextTab:'trello'},
        {label: '', name: 'overflow', id: '', type: 'text', width: '10%', isDisabled: false, required: false, list: []},
      ]},
      {name: 'trello', fields: [
        {label: 'Default List', name: 'trello_list', id: 'trello_list_id', type: 'text', width: '20%', isDisabled: false, required: false, list: []},
        {label: 'Card ID', name: 'trello_card_id', id: '', type: 'text', width: '20%', isDisabled: false, required: false, list: []},
        // {label: 'Create?', name: 'createTrelloCard', id: '', type: 'checkbox', width: '3%', isDisabled: false, required: false, list: []},
        {label: '', name: 'overflow', id: '', type: 'text', width: '20%', isDisabled: false, required: false, list: []},
      ]},
      {name: 'post_key', fields: [
        {label: 'Status', name: 'status', id: '', type: 'text', width: '4%', isDisabled: false, required: false, list: []},
        {label: '', name: 'cancel', id: '', type: 'text', width: '3%', isDisabled: false, required: false, list: []},
        {label: '', name: 'add', id: '', type: 'text', width: '3%', isDisabled: false, required: false, list: []},
      ]},
    ]

  }

  componentDidMount = () => {
    // this.props.loadContacts();
    // this.props.getLookup('TRELLO_LIST');
    // this.props.getLookup('PROJECT_STATUS');
    // this.props.getLookup('SCOPE');
    // this.props.getLookup('MASONRY');
    // this.props.getLookup('YN');
    // this.props.getLookup('FND_TYPE');
    // this.props.getLookup('GARAGE_TYPE');
    // this.props.getLookup('GARAGE_ENTRY');
    // this.props.getLookup('GARAGE_SWING');
    // this.props.getLookup('FLOOR_TYPE');
    // this.props.getLookup('ROOF_TYPE');
    // this.props.getLookup('COVERED_PATIO');
    // this.props.getLookup('PITA');

  }

  initState = () => {

    // rememberData toggle will assist volume entry by not erasing everything.  It will save all the values.
    // this can be a little dangerous.  Obviously clearing out address_id, job_number and setting the edit row
    // to be on the NEW ROW.
    if (this.state.rememberData) {
      this.setState( {
        address_id: null,
        job_number: null,
        jobNumUnlock: false,
        editRow: this.NEW_ROW, // this is the address array id that is being edited.  If -1, new address.
        // toggleQuickEntry: false,
      });
    }
    else {
      this.setState( {
        address_id: null,
        job_number: null,
        jobNumUnlock: false,
        revision: '',
        revision_desc: '',
        client_id: null,
        client: '',
        requestor_id: this.props.session.contact_id,  // contact_id
        requestor: this.props.session.full_name,       // contact full name
        owner_id: null,      // user_id
        owner: '',           // contact full name of the user_id
        city_id: null,
        city: '',
        subdivision_id: null,
        subdivision: '',
        address1: '',
        address2: '',
        phase: '',
        section: '',
        lot: '',
        block: '',
        fnd_height_fr: null,
        fnd_height_fl: null,
        fnd_height_rr: null,
        fnd_height_rl: null,
        plan_type: '',
        elevation: '',
        masonry: '',
        garage_type: '',
        garage_entry: '',
        garage_swing: '',
        garage_drop: null,
        garage_extension: null,
        covered_patio: 'N',
        bay_window: 'N',
        master_shower_drop: 'N',
        bath1_shower_drop: 'N',
        bath2_shower_drop: 'N',
        bath3_shower_drop: 'N',
        geo_lab: '',
        geo_report_num: '',
        geo_report_date: null,
        geo_pi: null,
        em_center: null,
        em_edge: null,
        ym_center: null,
        ym_edge: null,
        soil_notes: '',
        additional_options: '',
        comments: '',
        created_by: null,
        last_updated_by: null,
        sequence_id: null,
        prefix: '',
        sequence: null,
        year: null,
        status: '',
        editRow: this.NEW_ROW, // this is the address array id that is being edited.  If -1, new address.
        dialogValue: '',
        showSubDialog: false,
        // Custom Project fields
        project_status: '',
        scope: 'FDN',
        classification: 'VOLUME',
        onboard_date: this.todayStr,
        start_date: this.todayStr,
        due_date: null,  // actual due date of the project.
        final_due_date: null,
        transmittal_date: null,
        main_contact: '',
        billing_contact: '',
        builder_contact: '',
        foundation_type: 'POST TENSION',
        floor_type: '',
        roof_type: '',
        num_stories: null,
        square_footage: null,
        pita_factor: null,
        dwelling_type: 'PT 1 UNIT',
        box_folder: '',
        // Trello List
        trello_list_id: '',
        trello_card_id: '',
        createTrelloCard: false,
        rememberData: false,
        // toggleQuickEntry: false,
      } );
    }

  };

  handleMuiTabChange = (event, value) => {
    // console.log('handleMuiTabChange', value)
    this.setState({ currentTab: value });
  };

  tabKeyChange = (field) => {
    // using this key trap as an indication that the field has been filled in.
    // console.log('tabKeyChange: job number', field.job_number);
    if (!this.state.job_number && field.name === 'address1' && this.state.address1) {
      this.searchForExisting('ADDRESS');
    }

    if (
        (!this.state.job_number)
        && (field.name === 'subdivision' || field.name === 'lot' || field.name === 'block')
        && this.state.subdivision && this.state.lot && this.state.block
    ) {
      this.searchForExisting('LOT');
    };

    if (field.name === 'geo_lab' || field.name === 'geo_pi') {
      if (this.state.geo_lab === 'MLALABS' && this.state.geo_pi) {
        const geo_id = this.props.geos.find(geo => geo.code === this.state.geo_lab).id;
        const oneGeoMaster = this.props.geoMasterData.filter(rec => rec.geotech_id === geo_id);
        const emYmValues = oneGeoMaster.find(rec => rec.pi === this.state.geo_pi);
        if (emYmValues) {
          this.setState( { em_center: emYmValues.emc
            , em_edge:   emYmValues.eme
            , ym_center: emYmValues.ymc
            , ym_edge:   emYmValues.yme
          } );
        }
      }
    }

    if (field.nextTab) {
      this.setState( {
        currentTab: field.nextTab
      }, () => {
        this.addrRef.current.focus();
      } )
    }

  };

  handleChange = name => event => {

    // console.log('field name: ', name, event.target.type, 'value: ', event.target.value, 'checked: ',event.target.checked);
    // console.log('field name: ', name, event.target);
    event.target.type === 'checkbox'? this.setState({ [name]: event.target.checked, }) :
    event.target.type === 'number' && event.target.value === ''? this.setState({ [name]: null, }) :
    event.target.type === 'date' && event.target.value === ''? this.setState({ [name]: null, }) :
    name === 'geo_pi'? this.setState({ [name]: event.target.value.toUpperCase(), }) :
    name === 'jobNumUnlock'? this.setState({ [name]: !this.state[name], }) :
    this.setState({ [name]: event.target.value, }, );
  };

// handleJobNumLock = name => event => {
//
// };
  handleSearchChange = (name, value) => event => {

    // console.log('handleSearchChange', name, value, event.target.value, event.target.checked)
    const theSearch = {...this.state.search};

    theSearch[name] = value? value :
      event.target.type === 'checkbox'? event.target.checked :
      event.target.value;

    this.setState({ search: {...theSearch} }, () => {
      this.state.search.pendingOnly? this.props.loadProjects(this.state.search) : null;
    });

  };

  handleQuickEntry = () => {
    this.setState({ toggleQuickEntry: !this.state.toggleQuickEntry });
  };

  searchProjects = () => {
    this.props.loadProjects(this.state.search);
  };

  addStart = () => {
    // console.log('In add start: state', this.state);
    if (this.state.address1 !== '' && this.state.client_id !== null) {
      // console.log('In the if', this.state);

      this.setState({
        owner_id: this.props.session.id,
        owner: this.props.session.full_name,
        created_by: this.props.session.id,
        last_updated_by: this.props.session.id,
        status: 'PENDING'
      }, ()=> {
          // console.log('In Save Start',this.props.session.id);
          // Passing...
          //    state - we are inserting / updating the job
          //    session id - this is the current user.  This is a filter for our pending rows
          //    PENDING - this is the load type and the status of the row in the DB.
          this.props.createAddress(this.state);
          this.initState();
        }
      );
    }
    else {
      this.props.loadMessage(
        { ok:false,
          status: 'Missing Data',
          statusText: "Missing Address or Client.  Please fill in"
        }, "ERROR");
    }
    // console.log("staged starts", this.stagedStarts);
  };

  updateStart = () => {
    this.setState({
      owner_id: this.props.session.id,
      owner: this.props.session.full_name,
      last_updated_by: this.props.session.id,
      status: 'PENDING'
    }, ()=> {
        // console.log('In update Start',this.props.session.id);
        // Passing...
        //    state - we are inserting / updating the job
        //    session id - this is the current user.  This is a filter for our pending rows
        //    PENDING - this is the load type and the status of the row in the DB.
        this.props.createAddress(this.state);
        this.initState();
      }
    );
    // console.log("staged starts", this.stagedStarts);
  };

  commitPendingAddresses = () => {
    // console.log('In Commit Start',this.props.session.id);
    this.props.commitAddresses(this.props.session.id, this.props.addresses, this.state.search, false);
    // this.initState();
  };

  // editStart = (id) => {
  //   this.setState({
  //     address_id: this.props.addresses[id].id,
  //     job_number: this.props.addresses[id].job_number,
  //     jobNumUnlock: false,
  //     revision: this.props.addresses[id].revision,
  //     revision_desc: this.props.addresses[id].revision_desc,
  //     client_id: this.props.addresses[id].client_id,
  //     client: this.props.addresses[id].client,
  //     requestor_id: this.props.addresses[id].contact_id,   // contact_id
  //     requestor: this.props.addresses[id].requestor,       // contact full name
  //     owner_id: this.props.session.id,      // user_id
  //     owner: this.props.session.full_name,  // contact full name of the user_id
  //     city_id: null,  // query getting addresses does not get id.  starts table does not capture it.
  //     city: this.props.addresses[id].city,
  //     subdivision_id: null,  // query getting addresses does not get id.  starts table does not capture it.
  //     subdivision: this.props.addresses[id].subdivision,
  //     address1: this.props.addresses[id].address1,
  //     address2: this.props.addresses[id].address2,
  //     phase: this.props.addresses[id].phase,
  //     section: this.props.addresses[id].section,
  //     lot: this.props.addresses[id].lot,
  //     block: this.props.addresses[id].block,
  //     fnd_height_fr: this.props.addresses[id].fnd_height_fr,
  //     fnd_height_fl: this.props.addresses[id].fnd_height_fl,
  //     fnd_height_rr: this.props.addresses[id].fnd_height_rr,
  //     fnd_height_rl: this.props.addresses[id].fnd_height_rl,
  //     plan_type: this.props.addresses[id].plan_type,
  //     elevation: this.props.addresses[id].elevation,
  //     masonry: this.props.addresses[id].masonry,
  //     garage_type: this.props.addresses[id].garage_type,
  //     garage_entry: this.props.addresses[id].garage_entry,
  //     garage_swing: this.props.addresses[id].garage_swing,
  //     garage_drop: this.props.addresses[id].garage_drop,
  //     garage_extension: this.props.addresses[id].garage_extension,
  //     covered_patio: this.props.addresses[id].covered_patio,
  //     bay_window: this.props.addresses[id].bay_window,
  //     master_shower_drop: this.props.addresses[id].master_shower_drop,
  //     bath1_shower_drop: this.props.addresses[id].bath1_shower_drop,
  //     bath2_shower_drop: this.props.addresses[id].bath2_shower_drop,
  //     bath3_shower_drop: this.props.addresses[id].bath3_shower_drop,
  //     geo_lab: this.props.addresses[id].geo_lab,
  //     geo_report_num: this.props.addresses[id].geo_report_num,
  //     geo_report_date: this.props.addresses[id].geo_report_date,
  //     geo_pi: this.props.addresses[id].geo_pi,
  //     em_center: this.props.addresses[id].em_center,
  //     em_edge: this.props.addresses[id].em_edge,
  //     ym_center: this.props.addresses[id].ym_center,
  //     ym_edge: this.props.addresses[id].ym_edge,
  //     soil_notes: this.props.addresses[id].soil_notes,
  //     additional_options: this.props.addresses[id].additional_options,
  //     comments: this.props.addresses[id].comments,
  //     // Custom Project fields
  //     project_status: this.props.addresses[id].project_status,
  //     scope: this.props.addresses[id].scope,
  //     classification: this.props.addresses[id].classification,
  //     onboard_date: this.props.addresses[id].onboard_date,
  //     start_date: this.props.addresses[id].start_date,
  //     due_date: this.props.addresses[id].due_date,
  //     final_due_date: this.props.addresses[id].final_due_date,
  //     transmittal_date: this.props.addresses[id].transmittal_date,
  //     main_contact: this.props.addresses[id].main_contact,
  //     billing_contact: this.props.addresses[id].billing_contact,
  //     builder_contact: this.props.addresses[id].builder_contact,
  //     foundation_type: this.props.addresses[id].foundation_type,
  //     floor_type: this.props.addresses[id].floor_type,
  //     roof_type: this.props.addresses[id].roof_type,
  //     num_stories: this.props.addresses[id].num_stories,
  //     square_footage: this.props.addresses[id].square_footage,
  //     pita_factor: this.props.addresses[id].pita_factor,
  //     // Trello and Box
  //     box_folder: this.props.addresses[id].box_folder,
  //     trello_list_id: this.props.addresses[id].trello_list_id,
  //     trello_list: this.props.addresses[id].trello_list,
  //     trello_card_id: this.props.addresses[id].trello_card_id,
  //
  //     created_by: this.props.addresses[id].created_by,
  //     last_updated_by: this.props.addresses[id].last_updated_by,
  //     status: this.props.addresses[id].status,
  //     editRow: id, // this is the address array id that is being edited.  If -1, new address.
  //     createTrelloCard: false,
  //     rememberData: false,
  //   });
  // };

  editStart = (project, id) => {
    this.setState({
      address_id: project.id,
      job_number: project.job_number,
      jobNumUnlock: false,
      revision: project.revision,
      revision_desc: project.revision_desc,
      client_id: project.client_id,
      client: project.client,
      requestor_id: project.contact_id,   // contact_id
      requestor: project.requestor,       // contact full name
      owner_id: this.props.session.id,      // user_id
      owner: this.props.session.full_name,  // contact full name of the user_id
      city_id: null,  // query getting addresses does not get id.  starts table does not capture it.
      city: project.city,
      subdivision_id: null,  // query getting addresses does not get id.  starts table does not capture it.
      subdivision: project.subdivision,
      address1: project.address1,
      address2: project.address2,
      phase: project.phase,
      section: project.section,
      lot: project.lot,
      block: project.block,
      fnd_height_fr: project.fnd_height_fr,
      fnd_height_fl: project.fnd_height_fl,
      fnd_height_rr: project.fnd_height_rr,
      fnd_height_rl: project.fnd_height_rl,
      plan_type: project.plan_type,
      elevation: project.elevation,
      masonry: project.masonry,
      garage_type: project.garage_type,
      garage_entry: project.garage_entry,
      garage_swing: project.garage_swing,
      garage_drop: project.garage_drop,
      garage_extension: project.garage_extension,
      covered_patio: project.covered_patio,
      bay_window: project.bay_window,
      master_shower_drop: project.master_shower_drop,
      bath1_shower_drop: project.bath1_shower_drop,
      bath2_shower_drop: project.bath2_shower_drop,
      bath3_shower_drop: project.bath3_shower_drop,
      geo_lab: project.geo_lab,
      geo_report_num: project.geo_report_num,
      geo_report_date: project.geo_report_date,
      geo_pi: project.geo_pi,
      em_center: project.em_center,
      em_edge: project.em_edge,
      ym_center: project.ym_center,
      ym_edge: project.ym_edge,
      soil_notes: project.soil_notes,
      additional_options: project.additional_options,
      comments: project.comments,
      // Custom Project fields
      project_status: project.project_status,
      scope: project.scope,
      classification: project.classification,
      onboard_date: project.onboard_date,
      start_date: project.start_date,
      due_date: project.due_date,
      final_due_date: project.final_due_date,
      transmittal_date: project.transmittal_date,
      main_contact: project.main_contact,
      billing_contact: project.billing_contact,
      builder_contact: project.builder_contact,
      foundation_type: project.foundation_type,
      floor_type: project.floor_type,
      roof_type: project.roof_type,
      num_stories: project.num_stories,
      square_footage: project.square_footage,
      pita_factor: project.pita_factor,
      dwelling_type: project.dwelling_type,
      // Trello and Box
      box_folder: project.box_folder,
      trello_list_id: project.trello_list_id,
      trello_list: project.trello_list,
      trello_card_id: project.trello_card_id,

      created_by: project.created_by,
      last_updated_by: project.last_updated_by,
      status: project.status,
      editRow: id, // this is the address array id that is being edited.  If -1, new address.
      createTrelloCard: false,
      rememberData: false,
      dupsDialogActivate: false,
    });
  };

  deleteStart = (id) => {
    // console.log("staged starts", id, this.stagedStarts);
    this.props.deleteAddress(id, this.state.search);
    // console.log("staged starts", id, this.stagedStarts);
  };

  cancelStart = () => {
    // this.setState({ editRow: this.NEW_ROW });
    this.initState();
  };

  // createClient = (newValue: any, actionMeta: any) => {
  //   console.group('Value Changed');
  //   console.log(newValue);
  //   // console.log(`action: ${actionMeta.action}`);
  //   console.groupEnd();
  //   // this.setState({ value: newValue });
  // };

  createClient = (newValue) => {
    // console.log('create Client', newValue);
    this.setState({ dialogValue: newValue });
    this.props.showHideClientDialog();
  };

  createContact = (newValue) => {
    // console.log('create Contact', newValue);
    this.setState({ dialogValue: newValue });
    this.props.showHideContactDialog();
  };

  createCity = (newValue) => {
    // console.log('create City', newValue);
    this.setState({ dialogValue: newValue });
    this.props.showHideCityDialog();
  };

  subdivisionDialog = (newValue = '', sub_id = this.state.subdivision_id, sub = this.state.subdivision) => {
    // console.log('create Subdivision', newValue, sub_id, sub);
    this.setState({ dialogValue: newValue, subdivision_id: sub_id, subdivision: sub, showSubDialog: !this.state.showSubDialog });
    // this.props.showHideSubdivisionDialog();
  };

  searchForExisting = (test) => {
    // console.log('searchForExisting', test);
    this.props.searchForDups(test, this.state);
    this.setState({ dupsDialogActivate: true });
  };

  dupsDialogClose = () => {
    this.setState({ dupsDialogActivate: false });
  }

  /******** getTableHeader ***************
  Action: This function generates the header columns of the table.  It is a main driver function
  It handles the header and the width of the columns.
  Called by: Render function
  Calls: NA
  Parameters: none
  ****************************************/
  getTableHeader = () => {

    const { classes } = this.props;

    const fields = [].concat(
      this.tabs.find(tab => tab.name === 'pre_key').fields,
      this.tabs.find(tab => tab.name === this.state.currentTab).fields,
      this.tabs.find(tab => tab.name === 'post_key').fields,

    );

    const colGroup = fields.map((field, id) => {
      return <col key={id} style={{width: field.width }}/>
    });

    const tableHeader = fields.map((field, id) => {

      // case 'overflow':
      // case 'job_number':

      switch (field.name) {
        case 'edit':
        case 'delete':
        case 'cancel':
        case 'save':
        case 'status':
        case 'add':
        case 'jobNumUnlock':
          return (
            <TableCell key={id} padding='none' style={{fontWeight: 'bold', fontSize: 13}}>
              {field.label}
            </TableCell>
          );
        default:
          return (
            <TableCell key={id} padding='none' classes={{root: classes.tableCellProps}}  style={{fontWeight: 'bold', fontSize: 13}}>
              {field.label}
            </TableCell>
          );
      };
    });

    return (
      <Fragment>
        <colgroup>
          {colGroup}
        </colgroup>
        <TableHead>
          <TableRow>
            {tableHeader}
          </TableRow>
      </TableHead>
    </Fragment>

    );
  };

  /******** getTableEntry ***************
  Action: This function generates the columns of the table.  It is a main driver function
  It handles the entry row, and it handles the formatting of the pending rows.
  Called by: Render function, displayPending
  Calls: Within JSX: addStart, EditStart, deleteStart, handleChange
  Parameters: theState: either this.state or a record from stagedStarts
              displayOnly - This variable helps code to determine if row should
                be an entry row or a display row
  ****************************************/
  getTableEntry = (theState, currentRow = this.NEW_ROW) => {

    const { classes } = this.props;

    const fields = [].concat(
      this.tabs.find(tab => tab.name === 'pre_key').fields,
      this.tabs.find(tab => tab.name === this.state.currentTab).fields,
      this.tabs.find(tab => tab.name === 'post_key').fields,

    );

    // console.log('Row numbers: Edit, Current', this.state.editRow, currentRow)
    const tableEntry = fields.map((field, id) => {

      // console.log("local state", `theState.${field.name}`);
      // console.log("state value", eval(`theState.${field.name}`));

      switch (field.name) {
        case 'project_status':
          field.list = this.props.projectStatusLookup;
          break;
        case 'scope':
          field.list = this.props.scopeLookup;
          break;
        case 'classification':
          field.list = this.props.classificationLookup;
          break;
        case 'masonry':
          field.list = this.props.masonryLookup;
          break;
        case 'covered_patio':
          field.list = this.props.coveredPatioLookup;
          break;
        case 'bay_window':
        case 'master_shower_drop':
        case 'bath1_shower_drop':
        case 'bath2_shower_drop':
        case 'bath3_shower_drop':
          field.list = this.props.ynLookup;
          break;
        case 'garage_type':
          field.list = this.props.garageTypeLookup;
          break;
        case 'garage_entry':
          field.list = this.props.garageEntryLookup;
          break;
        case 'garage_swing':
          field.list = this.props.garageSwingLookup;
          break;
        case 'foundation_type':
          field.list = this.props.fndTypeLookup;
          break;
        case 'floor_type':
          field.list = this.props.floorTypeLookup;
          break;
        case 'roof_type':
          field.list = this.props.roofTypeLookup;
          break;
        case 'dwelling_type':
          field.list = this.props.dwellingTypeLookup;
          break;
        // case 'pita_factor':
        //   field.list = this.props.pitaLookup;
        //   break;
        case 'trello_list':
          field.list = this.props.trelloListLookup;
          break;
        case 'geo_lab':
          field.list = this.props.geos;
          break;
        default:
          break;
      };

      switch (field.name) {
        case 'edit':
          if (currentRow !== this.state.editRow)
            return (
              <TableCell key={id} padding='none'>
                <IconButton
                  aria-label='Edit'
                  color='secondary'
                  title='Edit record'
                  onClick={(e) => {
                  e.preventDefault();
                  if (this.editStart) {
                    this.editStart(this.props.addresses[currentRow], currentRow);
                  }
                }}>
                  <Edit fontSize='small' />
                </IconButton>
              </TableCell>
            );
          else
            return (
              <TableCell key={id} padding='none' />
            );
          // break;  // unreachable code.  Commenting out.  I removed the others.
        case 'delete':
          if (currentRow !== this.state.editRow)
            return (
              <TableCell key={id} padding='none'>
                <IconButton
                  aria-label='Delete'
                  color='secondary'
                  title='Delete record'
                  onClick={(e) => {
                  e.preventDefault();
                  if (this.deleteStart) {
                    this.deleteStart(theState.id);
                  }
                }}>
                  <Delete fontSize='small' />
                </IconButton>
              </TableCell>
            )
          else
            return (
              <TableCell key={id} padding='none' />
            )
        case 'overflow':
          return (
            <TableCell key={id} padding='none' classes={{root: classes.tableCellProps}}/>
          )
        case 'job_number':  // For job number, show it unless it is the add row.
          if (currentRow !== this.state.editRow)
            return (
              <TableCell key={id} padding='none' classes={{root: classes.tableCellProps}}>
                {eval(`theState.${field.name}`)||''}
              </TableCell>
            )
          else
            return (
              <TableCell key={id} padding='none' classes={{root: classes.tableCellEntryProps}}>
                <TextField
                  required={field.required}
                  id={field.name}
                  disabled={!this.state.jobNumUnlock}
                  value={ eval(`theState.${field.name}`)||'' }
                  fullWidth = {true}
                  variant='filled'
                  onChange={this.handleChange(field.name)}
                  onKeyDown={
                    (e) => {
                      if (e.keyCode === 9 || e.keyCode === 13) { this.tabKeyChange(field); }
                    }
                  }
                  type={field.type}
                  // root = {{fontSize: '8px'}}
                  InputProps={{
                    classes: {
                      input: classes.inputProps,
                    },
                    // readOnly: field.isDisabled,
                  }}
                />
              </TableCell>
            )
        case 'jobNumUnlock':
          if (currentRow !== this.state.editRow)
            return (
              <TableCell key={id} padding='none' />
            )
          else
            return (
              <TableCell key={id} padding='none' >
                <IconButton
                  aria-label='job-unlock'
                  color='secondary'
                  title='Unlock job number for editing'
                  onClick={this.handleChange('jobNumUnlock')}>
                  {this.state.jobNumUnlock? <LockOpen /> : <Lock />}
                </IconButton>
              </TableCell>
            )
        case 'client':
          if (currentRow !== this.state.editRow)
            return (
              <TableCell key={id} padding='none' classes={{root: classes.tableCellProps}}>
                {eval(`theState.${field.name}`)||''}
              </TableCell>
            )
          else
            return (
              <TableCell key={id} padding='none' classes={{root: classes.tableCellEntryProps}}>
                <CreatableSelect styles={createSelectProps}
                  isClearable
                  isSearchable
                  // getOptionLabel={({name}) => name}
                  // getOptionValue={({id}) => id}
                  placeholder=''
                  onChange={
                    (selected) => {
                      this.setState( {
                        client_id: selected?selected.value:null,
                        client: selected?selected.name:''
                      } )
                    }
                  }
                  // onInputChange={this.handleInputChange}
                  options={
                    this.props.clients.map(client => {
                      return {
                        value: client.id.toString(),
                        label: `(${client.id}) ${client.name}`,
                        name: client.name
                      }
                    })
                  }
                  onCreateOption={this.createClient}
                  value={ {value: this.state.client_id?this.state.client_id.toString() : ''
                    , label: this.state.client
                    , name: this.state.client} }
                />
              </TableCell>
            )
        case 'requestor':
          if (currentRow !== this.state.editRow)
            return (
              <TableCell key={id} padding='none' classes={{root: classes.tableCellProps}}>
                {eval(`theState.${field.name}`)||''}
              </TableCell>
            )
          else
            return (
              <TableCell key={id} padding='none' classes={{root: classes.tableCellEntryProps}}>
                <Select styles={createSelectProps}
                  id='requestor'
                  isClearable
                  isSearchable
                  options={this.props.contacts}
                  getOptionLabel={({full_name}) => full_name}
                  getOptionValue={({id}) => id}
                  placeholder=''
                  onChange={
                    (selected) => {
                      this.setState( {
                        requestor_id: selected?selected.id:null,
                        requestor: selected?selected.full_name:null
                      } )
                    }
                  }
                  value={ {id: this.state.requestor_id? this.state.requestor_id.toString() : ''
                    , full_name: this.state.requestor} }
                />
              </TableCell>
            )
        case 'subdivision':
          if (currentRow !== this.state.editRow)
            return (
              <TableCell key={id} padding='none' classes={{root: classes.tableCellProps}}>
                {eval(`theState.${field.name}`)||''}
              </TableCell>
            )
          else
            return (
              <TableCell key={id} padding='none' classes={{root: classes.tableCellEntryProps}}>
                <CreatableSelect styles={createSelectProps}
                  isClearable
                  placeholder=''
                  onChange={
                    (selected) => {
                      this.setState( {
                        subdivision_id: selected?selected.value:null,
                        subdivision: selected?selected.name:''
                      } )
                    }
                  }
                  onKeyDown={
                    (e) => {
                      if (e.keyCode == 9 || e.keyCode == 13) { this.tabKeyChange(field); }
                    }
                  }
                  options={
                    this.props.subdivisions.map(sub => {
                      return {
                        value: sub.id.toString(),
                        label: `(${sub.id}) ${sub.subdivision}`,
                        name: sub.subdivision

                      }
                    })
                  }
                  onCreateOption={this.subdivisionDialog}
                  value={ {value: this.state.subdivision_id? this.state.subdivision_id.toString() : ''
                    , label: this.state.subdivision
                    , name: this.state.subdivision} }
                />
              </TableCell>
            )
        case 'city':
          if (currentRow !== this.state.editRow)
            return (
              <TableCell key={id} padding='none' classes={{root: classes.tableCellProps}}>
                {eval(`theState.${field.name}`)||''}
              </TableCell>
            )
          else
            return (
              <TableCell key={id} padding='none' classes={{root: classes.tableCellEntryProps}}>
                <CreatableSelect styles={createSelectProps}
                  isClearable
                  placeholder=''
                  onChange={
                    (selected) => {
                      this.setState( {
                        city_id: selected?selected.value:null,
                        city: selected?selected.label:''
                      } )
                    }
                  }
                  onKeyDown={
                    (e) => {
                      if (e.keyCode == 9 || e.keyCode == 13) { this.tabKeyChange(field); }
                    }
                  }
                  options={
                    this.props.cities.map(city => {
                      return {
                        value: city.id.toString(),
                        label: city.city
                      }
                    })
                  }
                  onCreateOption={this.createCity}
                  value={ {value: this.state.city_id? this.state.city_id.toString() : ''
                    , label: this.state.city
                    , name: this.state.city} }
                />
              </TableCell>
            )
        case 'geo_lab':
          if (currentRow !== this.state.editRow)
            return (
              <TableCell key={id} padding='none' classes={{root: classes.tableCellProps}}>
                {eval(`theState.${field.name}`)||''}
              </TableCell>
            )
          else
            var currentValue = {value: '', label: ''};
            if (this.state.geo_lab) {
              const lab = this.props.geos.find(geo => geo.code === this.state.geo_lab).name;
              // console.log ('the selected lab', lab)
              currentValue = { value: this.state.geo_lab, label: lab };
            };

            return (
              <TableCell key={id} padding='none' classes={{root: classes.tableCellEntryProps}}>
                <CreatableSelect styles={createSelectProps}
                  isClearable
                  placeholder=''
                  onChange={
                    (selected) => {
                      this.setState( {
                        geo_lab: selected?selected.value:null
                      } )
                    }
                  }
                  options={
                    this.props.geos.map(geo => {
                      return {
                        value: geo.code,
                        label: geo.name
                      }
                    })
                  }
                  onKeyDown={
                    (e) => {
                      if (e.keyCode == 9 || e.keyCode == 13) { this.tabKeyChange(field); }
                    }
                  }
                  onCreateOption={this.createCity}
                  value={ currentValue }
                />
              </TableCell>
            )
        case 'status':
          if (currentRow !== this.state.editRow)
            return (
              <TableCell key={id} padding='none'>
                {eval(`theState.${field.name}`)||''}
              </TableCell>
            )
          else
            return (
              <TableCell key={id} padding='none'>
                <Grid container direction='column' justify='center' alignItems='center'>
                  <Grid item>Remember?</Grid>
                  <Grid item>
                  <Checkbox
                    onChange={this.handleChange('rememberData')}
                    checked={this.state.rememberData}
                  />
                  </Grid>
                </Grid>
              </TableCell>
            )
        case 'cancel':
          if (currentRow !== this.state.editRow || currentRow === this.NEW_ROW)
            return (
              <TableCell key={id} padding='none' />
            );
          else
            return (
              <TableCell key={id} padding='none'>
                <IconButton
                  aria-label='Cancel'
                  color='secondary'
                  title='Cancel edits made to record'
                  onClick={(e) => {
                  e.preventDefault();
                  if (this.cancelStart) {
                    this.cancelStart();
                  }
                }}>
                  <Cancel fontSize='small' />
                </IconButton>
              </TableCell>
            );
        case 'add':
          if (currentRow !== this.state.editRow)
            return (
              <TableCell key={id} padding='none' />
            )
          else if (this.state.editRow === this.NEW_ROW)
            return (
              <TableCell key={id} padding='none'>
                <Fab
                  size='small'
                  color='secondary'
                  aria-label='Add'
                  title='Add record to pending queue for submission later'
                  onClick={(e) => {
                  e.preventDefault();
                  if (this.addStart) {
                    this.setState({ created_by: this.props.session.id,
                      last_updated_by: this.props.session.id }, ()=> {
                        this.addStart();
                      }
                    );
                  }
                }}>
                  <Add fontSize='small' />
                </Fab>
              </TableCell>
            )
          else
            return (
              <TableCell key={id} padding='none'>
                <IconButton
                  color='secondary'
                  aria-label='Save'
                  title='Save record'
                  onClick={(e) => {
                  e.preventDefault();
                  if (this.updateStart) {
                    this.setState({ last_updated_by: this.props.session.id },
                       ()=> { this.updateStart(); }
                    );
                  }
                }}>
                  <Save />
                </IconButton>
              </TableCell>
            )
        case 'createTrelloCard':
          if (this.state.editRow !== currentRow)
            return (
              <TableCell key={id} padding='none' classes={{root: classes.tableCellEntryProps}}>
                <Checkbox
                  checked={eval(`theState.${field.name}`)||false}
                  disabled
                />
              </TableCell>
            )
          return (
            <TableCell key={id} padding='none' classes={{root: classes.tableCellEntryProps}}>
              <Checkbox
                onChange={this.handleChange(field.name)}
                checked={eval(`theState.${field.name}`)}
              />
            </TableCell>
          )
        default:
          if (this.state.editRow !== currentRow)
            return (
              <TableCell key={id} padding='none' classes={{root: classes.tableCellProps}}>
                {eval(`theState.${field.name}`)||''}
              </TableCell>
            )
          else if (field.list.length > 0) {
            // console.log('field.list', field.list);
            let currentValue;
            if (field.id) {
              currentValue = theState[field.id]?
                field.list.find(option => option.code === theState[field.id]) :
                {code: '', name: ''};
            } else {
              currentValue = theState[field.name]?
                field.list.find(option => option.code === theState[field.name]) :
                {code: '', name: ''};
            }

            // console.log('switch stmt, field: '+field.name, currentValue);
            return (
              <TableCell key={id} padding='none' classes={{root: classes.tableCellEntryProps}}>
                <Select styles={createSelectProps}
                  isClearable
                  // isSearchable
                  options={field.list}
                  getOptionLabel={({name}) => name}
                  getOptionValue={({code}) => code}
                  // placeholder='Date Range...'
                  value={ currentValue }
                  // value={ {code: eval(`theState.${field.name}`)||'', name: curName} }
                  onChange={
                    (selected) => {
                      selected?
                        field.id?
                          this.setState({ [field.id]: selected.code, [field.name]: selected.name }) :
                          this.setState({ [field.name]: selected.code }) :
                        field.id?
                          this.setState({ [field.id]: null, [field.name]: null }) :
                          this.setState({ [field.name]: null });
                    }
                  }
                  onKeyDown={
                    (e) => {
                      // console.log('on key down');
                      if (e.keyCode === 9 || e.keyCode === 13) { this.tabKeyChange(field); }
                    }
                  }
                  // onBlur={
                  //   (e) => {
                  //     console.log('on blur');
                  //     if (e.keyCode === 9 || e.keyCode === 13) { this.tabKeyChange(field); }
                  //   }
                  // }
                />
              </TableCell>
            )
          }
          else

            return (
              <TableCell key={id} padding='none' classes={{root: classes.tableCellEntryProps}}>
                <TextField
                  inputRef={field.name === 'address1'? this.addrRef:null}
                  required={field.required}
                  select={field.list.length !== 0? true: false}
                  id={field.name}
                  value={ eval(`theState.${field.name}`)||'' }
                  fullWidth = {true}
                  variant='filled'
                  onChange={this.handleChange(field.name)}
                  onKeyDown={
                    (e) => {
                      // console.log('on key down: ', e.type, e.target.id, e.keyCode);
                      if (e.keyCode === 9 || e.keyCode === 13) { this.tabKeyChange(field); }
                    }
                  }
                  // onBlur={
                  //   (e) => {
                  //     console.log('on blur: ', e.type, e.target.id);
                  //     if (e.keyCode === 9 || e.keyCode === 13) { this.tabKeyChange(field); }
                  //   }
                  // }
                  type={field.type}
                  // root = {{fontSize: '8px'}}
                  InputProps={{
                    classes: {
                      input: classes.inputProps,
                    },
                    readOnly: field.isDisabled,
                  }}
                >
                  <MenuItem key={''} value={null}>NA</MenuItem>
                  {field.list.map(option => (
                     <MenuItem key={option.code} value={option.code}>
                       {option.name}
                     </MenuItem>
                   ))}
                </TextField>
              </TableCell>
            )
      }  // switch stmt closure.
    });  // map loop to create tableEntry closures.
    return tableEntry
  };    // getTableEntry() closure

  /******** displayPending ***************
  Action: This function generates the pending starts that have been created so far.
  These rows have status of pending.  Once committed, Status = Active, Trello card created.
  Called by: Render function
  Calls: getTableEntry
  ****************************************/
  displayRows = () => {
    // console.log('displayPending', this.props.addresses);
    const pending = this.props.addresses.map((start,id) => {
      if (id !== this.state.editRow)
        return (
          <TableRow key={id}>
            {this.getTableEntry(start, id)}
          </TableRow>
        )
      else  // id equals
        return (
          <TableRow key={id}>
            {this.getTableEntry(this.state, id)}
          </TableRow>
        )
    });

    return pending;
  };

  render() {
    const { classes } = this.props;

    // console.log('session', this.props.session);
    // console.log('Create Start Render: state', this.state);
    // console.log('starts', this.props.addresses);
    // console.log('trelloList', this.props.trelloListLookup);
    // this.props.dups.length > 0? console.log('possible dups', this.props.dups) : null;

    // console.log('client: ', this.state.client, this.state.client_id);
    // console.log('owner: ', this.state.owner, this.state.owner_id);
    // console.log('job number', this.state.job_number);
    // console.log('state', this.state);
    // console.log('jobNumber:', this.getJobNumber());
    // console.log('create Select props',createSelectProps, this.createSelectProps);
    // console.log('project status', this.props.projectStatusLookup);
    // console.log('scope', this.props.scopeLookup);
    // console.log('masonry', this.props.masonryLookup);
    // console.log('yn', this.props.ynLookup);
    // console.log('fnd type', this.props.fndTypeLookup);
    // console.log('garage type', this.props.garageTypeLookup);
    // console.log('garage entry', this.props.garageEntryLookup);
    // console.log('garage swing', this.props.garageSwingLookup);
    // console.log('floor type', this.props.floorTypeLookup);
    // console.log('roof type', this.props.roofTypeLookup);

    const dates = [
      {value:  '1', name: 'Past 24 hours'},
      {value:  '7', name: 'Past 7 days'},
      {value: '30', name: 'Past 30 days'},
      {value: '90', name: 'Past 90 days'},
      {value: '180', name: 'Past 180 days'},
      {value: 'CURYEAR', name: 'This Year'},
      {value: 'LASTYEAR', name: 'Last Year'},
      {value: 'ALLTIME', name: 'All Time'},
    ];

    return (
      <div>
      {!this.state.toggleQuickEntry &&
      <Paper className={classes.bodyPaper}>
        <Grid container justify='space-between'>
          <Grid item >
            <Typography variant='h5'>Project Management</Typography>
          </Grid>
          <Grid item >
            <Button
              aria-label='Switch Mode'
              variant="contained"
              color="secondary"
              onClick={ this.handleQuickEntry }
            >
              Easy Mode
            </Button>
          </Grid>
        </Grid>

            <Grid container className={classes.container}>
              <Grid item xs={12}>
                <Paper className={classes.Paper}>
                  Search By
                  <Grid container justify='space-around'>
                    <Grid item xs={12} md={2}>
                      <TextField
                        id='jobNumber'
                        fullWidth = {true}
                        disabled={this.state.search.pendingOnly}
                        variant='filled'
                        onChange={this.handleSearchChange('jobNumber')}
                        type='text'
                        placeholder=''
                        label={this.state.search.jobNumber? '': 'Job Number...'}
                        // root = {{fontSize: '8px'}}
                        InputProps={{
                          classes: {
                            input: classes.inputProps,
                          },
                          readOnly: false,
                        }}
                        InputLabelProps={{
                          style: {
                            color: 'black',
                            fontSize: 12
                          } }}
                      />
                      <TextField
                        id='address'
                        fullWidth = {true}
                        disabled={this.state.search.pendingOnly}
                        variant='filled'
                        onChange={this.handleSearchChange('address')}
                        type='text'
                        placeholder=''
                        label={this.state.search.address? '': 'Address...'}
                        // root = {{fontSize: '8px'}}
                        InputProps={{
                          classes: {
                            input: classes.inputProps,
                          },
                          readOnly: false,
                        }}
                        InputLabelProps={{
                          style: {
                            color: 'black',
                            fontSize: 12
                          } }}
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <Select styles={createSelectProps}
                        isClearable
                        // isSearchable
                        isDisabled={this.state.search.pendingOnly}
                        options={dates}
                        getOptionLabel={({name}) => name}
                        getOptionValue={({value}) => value}
                        placeholder='Date Range...'
                        defaultValue={ {value:  '1', name: 'Past 24 hours'} }
                        onChange={
                          (selected) => {
                            const name = 'dateRange';
                            const value = selected?selected.value:null;
                            const theSearch = {...this.state.search};
                            theSearch[name] = value;
                            this.setState({ search: {...theSearch} });
                          }
                        }
                      />
                      <Select styles={createSelectProps}
                        isClearable
                        // isSearchable
                        isDisabled={this.state.search.pendingOnly}
                        options={this.props.projectStatusLookup}
                        getOptionLabel={({name}) => name}
                        getOptionValue={({code}) => code}
                        placeholder='Status...'
                        onChange={
                          (selected) => {
                            const name = 'status';
                            const value = selected?selected.code:null;
                            const theSearch = {...this.state.search};
                            theSearch[name] = value;
                            this.setState({ search: {...theSearch} });
                          }
                        }
                        // onInputChange={this.handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <Select styles={createSelectProps}
                        isClearable
                        // isSearchable
                        isDisabled={this.state.search.pendingOnly}
                        options={this.props.clients}
                        getOptionLabel={({name}) => name}
                        getOptionValue={({id}) => id}
                        placeholder='Client...'
                        onChange={
                          (selected) => {
                            const name = 'client';
                            const value = selected?selected.id:null;
                            this.handleSearchChange('client', value);
                            const theSearch = {...this.state.search};
                            theSearch[name] = value;
                            this.setState({ search: {...theSearch} });
                          }
                        }
                        // onInputChange={this.handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <Select styles={createSelectProps}
                        isClearable
                        isDisabled={this.state.search.pendingOnly}
                        options={this.props.cities}
                        getOptionLabel={({city}) => city}
                        getOptionValue={({id}) => id}
                        placeholder='City...'
                        onChange={
                          (selected) => {
                            const name = 'city';
                            const value = selected?selected.city:null;
                            const theSearch = {...this.state.search};
                            theSearch[name] = value;
                            this.setState({ search: {...theSearch} });
                          }
                        }
                      />
                      <Select styles={createSelectProps}
                        isClearable
                        isDisabled={this.state.search.pendingOnly}
                        options={this.props.subdivisions}
                        getOptionLabel={({subdivision}) => subdivision}
                        getOptionValue={({id}) => id}
                        placeholder='Subdivision...'
                        onChange={
                          (selected) => {
                            const name = 'subdivision';
                            const value = selected?selected.subdivision:null;
                            const theSearch = {...this.state.search};
                            theSearch[name] = value;
                            this.setState({ search: {...theSearch} });
                          }
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <Select styles={createSelectProps}
                        id='enteredBy'
                        isClearable
                        isSearchable
                        isDisabled={ this.state.search.pendingOnly }
                        defaultValue={ {user_id: this.props.session.id, full_name: this.props.session.full_name} }
                        options={this.props.contacts}
                        getOptionLabel={({full_name}) => full_name}
                        getOptionValue={({user_id}) => user_id}
                        placeholder='Entered By...'
                        onChange={
                          (selected) => {
                            const name = 'enteredBy';
                            const value = selected?selected.user_id:null;
                            const theSearch = {...this.state.search};
                            theSearch[name] = value;
                            this.setState({ search: {...theSearch} });
                          }
                        }
                      />
                      <Select styles={createSelectProps}
                        id='requestedBy'
                        isClearable
                        isSearchable
                        isDisabled={this.state.search.pendingOnly}
                        options={this.props.contacts}
                        getOptionLabel={({full_name}) => full_name}
                        getOptionValue={({id}) => id}
                        placeholder='Requested By...'
                        onChange={
                          (selected) => {
                            const name = 'requestedBy';
                            const value = selected?selected.id:null;
                            const theSearch = {...this.state.search};
                            theSearch[name] = value;
                            this.setState({ search: {...theSearch} });
                          }
                        }
                      />
                    </Grid>
                    <Grid item>
                      <Grid container direction='column' justify='center' alignItems='flex-end'>
                        <Grid item>
                          <Button
                            variant="contained"
                            color="secondary"
                            disabled={this.state.search.pendingOnly}
                            onClick={(e) => this.searchProjects()}
                          >
                            Search
                          </Button>
                        </Grid>
                        <Grid item>
                          <Checkbox
                            onChange={this.handleSearchChange('pendingOnly')}
                            checked={this.state.search.pendingOnly}
                          />
                          PENDING Only
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item  xs={12}>
                <AppBar position='static' >
                  <Grid container justify='space-around'>
                    <Grid item xs={12}>
                      <Tabs
                        value = {this.state.currentTab}
                        onChange={this.handleMuiTabChange}
                        // indicatorColor='primary'
                        // textColor='primary'
                        variant='fullWidth'
                      >
                          <Tab value='main' label='Main Info'
                            classes={{ labelContainer: classes.tabContainerProps, }}
                          />
                          <Tab value='project' label='Project Info'
                            classes={{ labelContainer: classes.tabContainerProps, }}
                          />
                          <Tab value='communication' label='Comm'
                            classes={{ labelContainer: classes.tabContainerProps, }}
                          />
                          <Tab value='lot' label='Lot Details'
                            classes={{ labelContainer: classes.tabContainerProps, }}
                          />
                          <Tab value='design' label='Design Details'
                            classes={{ labelContainer: classes.tabContainerProps, }}
                          />
                          <Tab value='garage' label='Garage Info'
                            classes={{ labelContainer: classes.tabContainerProps, }}
                          />
                          <Tab value='drop' label='Shower Drops'
                            classes={{ labelContainer: classes.tabContainerProps, }}
                          />
                          <Tab value='soil' label='Soil Details'
                            classes={{ labelContainer: classes.tabContainerProps, }}
                          />
                          <Tab value='form' label='Form Heights'
                            classes={{ labelContainer: classes.tabContainerProps, }}
                          />
                          <Tab value='framing' label='Framing'
                            classes={{ labelContainer: classes.tabContainerProps, }}
                          />
                          <Tab value='notes' label='Notes'
                            classes={{ labelContainer: classes.tabContainerProps, }}
                          />
                          <Tab value='trello' label='Trello'
                            classes={{ labelContainer: classes.tabContainerProps, }}
                          />
                      </Tabs>
                    </Grid>
                  </Grid>
                </AppBar>
              </Grid>

              <Grid item xs={12}>
                <Table className = {classes.tableWidth}>
                {/* <Table fixedHeader={false} style={{ width: 'auto', tableLayout: 'auto' }}> */}
                  {this.getTableHeader()}

                  <TableBody>

                    {this.state.editRow === this.NEW_ROW &&
                      <TableRow>{this.getTableEntry(this.state)}</TableRow>
                    }

                    {this.displayRows(this.state)}

                  </TableBody>
                </Table>
                <Grid container justify="flex-end" style={{marginTop: 10}}>
                  <Grid item>
                    <Button
                      disabled={!this.state.search.pendingOnly}
                      variant="contained"
                      color="secondary"
                      title='Commits the pending record(s)... Changes record status to ACTIVE, and creates Trello cards'
                      onClick={(e) => this.commitPendingAddresses()}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
      </Paper>
    }
    { this.state.toggleQuickEntry &&
      <ProjectCreateContainer toggleQuickEntry = {this.state.toggleQuickEntry} handleQuickEntry = {this.handleQuickEntry}/>
    }
      {this.props.showClientDialog && <ClientDialogContainer
        newValue = {this.state.dialogValue}
      />}
      {this.props.showContactDialog && <ContactDialogContainer
        newValue = {this.state.dialogValue}
      />}
      {this.props.showCityDialog && <CityDialogContainer
        newValue = {this.state.dialogValue}
      />}
      {this.state.showSubDialog && <SubdivisionDialogContainer
        newValue = {this.state.dialogValue}
        open = {this.state.showSubDialog}
        closeDialog = {this.subdivisionDialog}
      />}
      {this.props.dups.length > 0 &&
      this.state.dupsDialogActivate &&
      <DupsDialogContainer
        open = {this.props.dups.length > 0}
        onSelectAndClose = {this.editStart}
        onClose = {this.dupsDialogClose}
        curRec = {this.state}
        selectAllowed = {true}
      />}
      <AlertDialogContainer />

      </div>
    );
  }

}

ProjectMgmt.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjectMgmt);
