import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  TextField,
  Input,
  Typography,
  withStyles,
  Tabs,
  Tab,
  Table,
  TableHead,
  TableRow,
  TableCell,
  AppBar,
  MenuItem,
  IconButton,
  Tooltip,
  TableBody,
  Fab,
  Button
} from '@material-ui/core';
import { Add, Delete, Edit, Save, Cancel } from '@material-ui/icons';
import red from '@material-ui/core/colors/red';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';
import MuiSelect from '@material-ui/core/Select';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ClientDialogContainer from '../containers/ClientDialogContainer';
import ContactDialogContainer from '../containers/ContactDialogContainer';
import CityDialogContainer from '../containers/CityDialogContainer';
import SubdivisionDialogContainer from '../containers/SubdivisionDialogContainer';

const styles = tabTheme => ({
  bodyPaper: { padding: 20, minHeight: '84vh'},
  Paper: { padding: 20, marginTop: 10, marginBottom: 10 },
  grow: { flexGrow: 0, },
  // rightJust: { textAlign: 'right', },
  tableWidth: { width: '100%' },  // removes the table width css style.  Now control table size by column width.
  inputProps: { fontSize: 12, padding: 8, fontColor: 'black' },
  tabContainerProps: {paddingLeft: 16, paddingRight: 16},
});

class CreateStart extends Component {
  constructor() {
    super();

    this.NEW_ROW = -1;

    this.state = {
      address_id: null,
      job_number: null,
      client_id: null,
      client: '',
      requestor_id: null,  // contact_id
      requestor: '',       // contact full name
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
      masonry: null,
      garage_type: '',
      garage_entry: '',
      garage_swing: '',
      garage_drop: null,
      garage_extension: null,
      covered_patio: '',
      bay_window: '',
      master_shower_drop: '',
      bath1_shower_drop: '',
      bath2_shower_drop: '',
      bath3_shower_drop: '',
      geo_lab: '',
      geo_report_num: '',
      geo_report_date: null,
      geo_pi: null,
      em_center: null,
      em_edge: null,
      ym_center: null,
      ym_edge: null,
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
      clientDialog: false,
    };

    this.tabs = [
      {name: 'pre_key', fields: [
        {label: '', name: 'edit', id: '', width: '3%', isDisabled: false},
        {label: '', name: 'delete', id: '', width: '3%', isDisabled: false},
        {label: 'Job Number', name: 'job_number', id: '', width: '10%', isDisabled: true},
        {label: 'Address', name: 'address1', id: '', width: '14%', isDisabled: false},

      ]},
      {name: 'main', fields: [
        {label: 'Address 2', name: 'address2', id: '', width: '10%', isDisabled: false},
        {label: 'Client', name: 'client', id: 'client_id', width: '10%', isDisabled: true},
        {label: 'Requestor', name: 'requestor', id: 'requestor_id', width: '10%', isDisabled: true},
        {label: 'Subdivision', name: 'subdivision', id: 'subdivision_id', width: '10%', isDisabled: true},
        {label: 'City', name: 'city', id: 'city_id', width: '10%', isDisabled: true},
        {label: '', name: 'overflow', id: '', width: '10%', isDisabled: false},
      ]},
      {name: 'project', fields: [
        {label: 'Prj Status', name: 'proj_status', id: '', width: '10%', isDisabled: false},
        {label: 'Scope', name: 'scope', id: '', width: '10%', isDisabled: false},
        {label: 'Design Date', name: 'design_date', id: '', width: '10%', isDisabled: false},
        {label: 'Start Date', name: 'start_date', id: '', width: '10%', isDisabled: false},
        {label: 'On-Board Date', name: 'onboard_date', id: '', width: '10%', isDisabled: false},
        {label: 'Orig Due Date', name: 'orig_due_date', id: '', width: '10%', isDisabled: false},
        {label: '', name: 'overflow', id: '', width: '0%', isDisabled: false},
      ]},
      {name: 'communication', fields: [
        {label: 'Main Contact', name: 'job_contact', id: '', width: '10%', isDisabled: false},
        {label: 'Billing', name: 'billing_contact', id: '', width: '10%', isDisabled: false},
        {label: 'Builder', name: 'builder_contact', id: '', width: '10%', isDisabled: false},
        {label: 'Box Folder', name: 'box_folder', id: '', width: '15%', isDisabled: false},
        {label: '', name: 'overflow', id: '', width: '15%', isDisabled: false},
      ]},
      {name: 'lot', fields: [
        {label: 'Phase', name: 'phase', id: '', width: '5%', isDisabled: false},
        {label: 'Section', name: 'section', id: '', width: '5%', isDisabled: false},
        {label: 'Lot', name: 'lot', id: '', width: '5%', isDisabled: false},
        {label: 'Block', name: 'block', id: '', width: '5%', isDisabled: false},
        {label: '', name: 'overflow', id: '', width: '40%', isDisabled: false},
      ]},
      {name: 'design', fields: [
        {label: 'Plan Type', name: 'plan_type', id: '', width: '8%', isDisabled: false},
        {label: 'Elevation', name: 'elevation', id: '', width: '8%', isDisabled: false},
        {label: 'Masonry', name: 'masonry', id: '', width: '8%', isDisabled: false},
        {label: 'Covered Patio', name: 'covered_patio', id: '', width: '8%', isDisabled: false},
        {label: 'Bay Window', name: 'bay_window', id: '', width: '8%', isDisabled: false},
        {label: 'FND Type', name: 'fnd_type', id: '', width: '8%', isDisabled: false},
        {label: '', name: 'overflow', id: '', width: '12%', isDisabled: false},
      ]},
      {name: 'garage', fields: [
        {label: 'Garage Type', name: 'garage_type', id: '', width: '8%', isDisabled: false},
        {label: 'Garage Entry', name: 'garage_entry', id: '', width: '8%', isDisabled: false},
        {label: 'Garage Swing', name: 'garage_swing', id: '', width: '8%', isDisabled: false},
        {label: 'Garage Drop', name: 'garage_drop', id: '', width: '8%', isDisabled: false},
        {label: 'Garage Ext', name: 'garage_extension', id: '', width: '8%', isDisabled: false},
        {label: '', name: 'overflow', id: '', width: '20%', isDisabled: false},
      ]},
      {name: 'drop', fields: [
        {label: 'Master', name: 'master_shower_drop', id: '', width: '8%', isDisabled: false},
        {label: 'Bath 1', name: 'bath1_shower_drop', id: '', width: '8%', isDisabled: false},
        {label: 'Bath 2', name: 'bath2_shower_drop', id: '', width: '8%', isDisabled: false},
        {label: 'Bath 3', name: 'bath3_shower_drop', id: '', width: '8%', isDisabled: false, isDisabled: false},
        {label: '', name: 'overflow', id: '', width: '28%', isDisabled: false},
      ]},
      {name: 'soil', fields: [
        {label: 'Lab', name: 'geo_lab', id: '', width: '10%', isDisabled: false},
        {label: 'Report #', name: 'geo_report_num', id: '', width: '10%', isDisabled: false},
        {label: 'Report Date', name: 'geo_report_date', id: '', width: '10%', isDisabled: false},
        {label: 'PI', name: 'geo_pi', id: '', width: '5%', isDisabled: false},
        {label: 'EmC', name: 'em_center', id: '', width: '5%', isDisabled: false},
        {label: 'EmE', name: 'em_edge', id: '', width: '5%', isDisabled: false},
        {label: 'YmC', name: 'ym_center', id: '', width: '5%', isDisabled: false},
        {label: 'YmE', name: 'ym_edge', id: '', width: '5%', isDisabled: false},
        {label: '', name: 'overflow', id: '', width: '5%', isDisabled: false},
      ]},
      {name: 'form', fields: [
        {label: 'Front RT', name: 'fnd_height_fr', id: '', width: '8%', isDisabled: false},
        {label: 'Front LT', name: 'fnd_height_fl', id: '', width: '8%', isDisabled: false},
        {label: 'Rear RT', name: 'fnd_height_rr', id: '', width: '8%', isDisabled: false},
        {label: 'Rear LT', name: 'fnd_height_rl', id: '', width: '8%', isDisabled: false},
        {label: '', name: 'overflow', id: '', width: '28%', isDisabled: false},
      ]},
      {name: 'framing', fields: [
        {label: 'FND Type', name: 'fnd_type', id: '', width: '8%', isDisabled: false},
        {label: 'Floor Type', name: 'floor_type', id: '', width: '8%', isDisabled: false},
        {label: 'Roof Type', name: 'roof_type', id: '', width: '8%', isDisabled: false},
        {label: 'Stories', name: 'num_stories', id: '', width: '5%', isDisabled: false},
        {label: 'SQFT', name: 'square_footage', id: '', width: '5%', isDisabled: false},
        {label: 'PITA', name: 'pita_factor', id: '', width: '6%', isDisabled: false},
        {label: '', name: 'overflow', id: '', width: '20%', isDisabled: false},
      ]},
      {name: 'notes', fields: [
        {label: 'Addl Options', name: 'additional_options', id: '', width: '25%', isDisabled: false},
        {label: 'Notes', name: 'comments', id: '', width: '25%', isDisabled: false},
        {label: '', name: 'overflow', id: '', width: '10%', isDisabled: false},
      ]},
      {name: 'post_key', fields: [
        {label: 'Status', name: 'status', id: '', width: '4%', isDisabled: false},
        {label: '', name: 'cancel', id: '', width: '3%', isDisabled: false},
        {label: '', name: 'add', id: '', width: '3%', isDisabled: false},
      ]},
    ]

  }

  componentDidMount = () => {

  }

  initState = () => {
    this.setState( {
      address_id: null,
      job_number: null,
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
      masonry: null,
      garage_type: '',
      garage_entry: '',
      garage_swing: '',
      garage_drop: null,
      garage_extension: null,
      covered_patio: '',
      bay_window: '',
      master_shower_drop: '',
      bath1_shower_drop: '',
      bath2_shower_drop: '',
      bath3_shower_drop: '',
      geo_lab: '',
      geo_report_num: '',
      geo_report_date: null,
      geo_pi: null,
      em_center: null,
      em_edge: null,
      ym_center: null,
      ym_edge: null,
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
    } );

  };

  handleTabChange = (event, value) => {
    // console.log('handleTabChange', value)
    this.setState({ currentTab: value });
  };

  handleChange = name => event => {
    console.log('field name: ', name);
    this.setState({ [name]: event.target.value, });
  };

  addStart = () => {
    this.setState({
      owner_id: this.props.session.id,
      owner: this.props.session.full_name,
      created_by: this.props.session.id,
      last_updated_by: this.props.session.id,
      status: 'PENDING'
    }, ()=> {
        console.log('In Save Start',this.props.session.id);
        // Passing...
        //    state - we are inserting / updating the job
        //    session id - this is the current user.  This is a filter for our pending rows
        //    PENDING - this is the load type and the status of the row in the DB.
        this.props.createAddress(this.state, this.props.session.id, 'PENDING');
        this.initState();
      }
    );
    console.log("staged starts", this.stagedStarts);
  };

  updateStart = () => {
    this.setState({
      owner_id: this.props.session.id,
      owner: this.props.session.full_name,
      last_updated_by: this.props.session.id,
    }, ()=> {
        console.log('In update Start',this.props.session.id);
        // Passing...
        //    state - we are inserting / updating the job
        //    session id - this is the current user.  This is a filter for our pending rows
        //    PENDING - this is the load type and the status of the row in the DB.
        this.props.createAddress(this.state, this.props.session.id, 'PENDING');
        this.initState();
      }
    );
    console.log("staged starts", this.stagedStarts);
  };

  commitPendingAddresses = () => {
    console.log('In Commit Start',this.props.session.id);
    this.props.commitAddresses(this.props.addresses, this.props.session.id, 'PENDING');
    // this.initState();
  };

  editStart = (id) => {
    this.setState({
      address_id: this.props.addresses[id].id,
      job_number: this.props.addresses[id].job_number,
      client_id: this.props.addresses[id].client_id,
      client: this.props.addresses[id].client,
      requestor_id: this.props.addresses[id].contact_id,   // contact_id
      requestor: this.props.addresses[id].requestor,       // contact full name
      owner_id: this.props.session.id,      // user_id
      owner: this.props.session.full_name,  // contact full name of the user_id
      city_id: null,  // query getting addresses does not get id.  starts table does not capture it.
      city: this.props.addresses[id].city,
      subdivision_id: null,  // query getting addresses does not get id.  starts table does not capture it.
      subdivision: this.props.addresses[id].subdivision,
      address1: this.props.addresses[id].address1,
      address2: this.props.addresses[id].address2,
      phase: this.props.addresses[id].phase,
      section: this.props.addresses[id].section,
      lot: this.props.addresses[id].lot,
      block: this.props.addresses[id].block,
      fnd_height_fr: this.props.addresses[id].fnd_height_fr,
      fnd_height_fl: this.props.addresses[id].fnd_height_fl,
      fnd_height_rr: this.props.addresses[id].fnd_height_rr,
      fnd_height_rl: this.props.addresses[id].fnd_height_rl,
      plan_type: this.props.addresses[id].plan_type,
      elevation: this.props.addresses[id].elevation,
      masonry: this.props.addresses[id].masonry,
      garage_type: this.props.addresses[id].garage_type,
      garage_entry: this.props.addresses[id].garage_entry,
      garage_swing: this.props.addresses[id].swing,
      garage_drop: this.props.addresses[id].garage_drop,
      garage_extension: this.props.addresses[id].garage_extension,
      covered_patio: this.props.addresses[id].covered_patio,
      bay_window: this.props.addresses[id].bay_window,
      master_shower_drop: this.props.addresses[id].master_shower_drop,
      bath1_shower_drop: this.props.addresses[id].bath1_shower_drop,
      bath2_shower_drop: this.props.addresses[id].bath2_shower_drop,
      bath3_shower_drop: this.props.addresses[id].bath3_shower_drop,
      geo_lab: this.props.addresses[id].geo_lab,
      geo_report_num: this.props.addresses[id].geo_report_num,
      geo_report_date: this.props.addresses[id].geo_report_date,
      geo_pi: this.props.addresses[id].geo_pi,
      em_center: this.props.addresses[id].em_center,
      em_edge: this.props.addresses[id].em_edge,
      ym_center: this.props.addresses[id].ym_center,
      ym_edge: this.props.addresses[id].ym_edge,
      additional_options: this.props.addresses[id].additional_options,
      comments: this.props.addresses[id].comments,
      created_by: this.props.addresses[id].created_by,
      last_updated_by: this.props.addresses[id].last_updated_by,
      status: this.props.addresses[id].status,
      editRow: id, // this is the address array id that is being edited.  If -1, new address.
    });
  };

  deleteStart = (id) => {
    console.log("staged starts", id, this.stagedStarts);
    this.props.deleteAddress(id, this.props.session.id, 'PENDING');
    console.log("staged starts", id, this.stagedStarts);
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
    console.log('create Client', newValue);
    this.setState({ dialogValue: newValue });
    this.props.showHideClientDialog();
  };

  createContact = (newValue) => {
    console.log('create Contact', newValue);
    this.setState({ dialogValue: newValue });
    this.props.showHideContactDialog();
  };

  createCity = (newValue) => {
    console.log('create City', newValue);
    this.setState({ dialogValue: newValue });
    this.props.showHideCityDialog();
  };

  createSubdivision = (newValue) => {
    console.log('create Subdivision', newValue);
    this.setState({ dialogValue: newValue });
    this.props.showHideSubdivisionDialog();
  };
  /******** getTableHeader ***************
  Action: This function generates the header columns of the table.  It is a main driver function
  It handles the header and the width of the columns.
  Called by: Render function
  Calls: NA
  Parameters: none
  ****************************************/
  getTableHeader = () => {

    const fields = [].concat(
      this.tabs.find(tab => tab.name == 'pre_key').fields,
      this.tabs.find(tab => tab.name == this.state.currentTab).fields,
      this.tabs.find(tab => tab.name == 'post_key').fields,

    );

    const colGroup = fields.map((field, id) => {
      return <col key={id} style={{width: field.width }}/>
    });

    const tableHeader = fields.map((field, id) => {
        return (
        <TableCell key={id} padding='none' >
          {field.label}
        </TableCell>
        )
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
      this.tabs.find(tab => tab.name == 'pre_key').fields,
      this.tabs.find(tab => tab.name == this.state.currentTab).fields,
      this.tabs.find(tab => tab.name == 'post_key').fields,

    );

    // console.log('Row numbers: Edit, Current', this.state.editRow, currentRow)
    const tableEntry = fields.map((field, id) => {

      // console.log("local state", `theState.${field.name}`);
      // console.log("state value", eval(`theState.${field.name}`));

      switch (field.name) {
        case 'edit':
          if (currentRow !== this.state.editRow)
            return (
              <TableCell key={id} padding='none'>
                <IconButton
                  aria-label='Delete'
                  color='secondary'
                  onClick={(e) => {
                  e.preventDefault();
                  if (this.editStart) {
                    this.editStart(currentRow);
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
          break;
        case 'delete':
          if (currentRow !== this.state.editRow)
            return (
              <TableCell key={id} padding='none'>
                <IconButton
                  aria-label='Delete'
                  color='secondary'
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
          break;
        case 'overflow':
          return (
            <TableCell key={id} padding='none' />
          )
          break;
        case 'job_number':  // For job number, show it unless it is the add row.
          if (currentRow !== this.NEW_ROW)
            return (
              <TableCell key={id} padding='none'>
                {eval(`theState.${field.name}`)||''}
              </TableCell>
            )
          else
            return (
              <TableCell key={id} padding='none' />
            )
          break;
        case 'status':
          if (currentRow !== this.state.editRow)
            return (
              <TableCell key={id} padding='none'>
                {eval(`theState.${field.name}`)||''}
              </TableCell>
            )
          else
            return (
              <TableCell key={id} padding='none' />
            )
          break;
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
          break;
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
          break;
        default:
          if (this.state.editRow !== currentRow)
            return (
              <TableCell key={id} padding='none'>
                {eval(`theState.${field.name}`)||''}
              </TableCell>
            )
          else
            return (
              <TableCell key={id} padding='none'>
                <TextField
                  // key={id}
                  id={field.name}
                  // label={field.label}
                  // className={}
                  value={eval(`theState.${field.name}`)||''}
                  fullWidth = {true}
                  variant='outlined'
                  onChange={this.handleChange(field.name)}
                  // width='20px'
                  type='text'
                  // root = {{fontSize: '8px'}}
                  InputProps={{
                    classes: {
                      input: classes.inputProps,
                    },
                    readOnly: field.isDisabled,
                  }}

                />
              </TableCell>
            )
          break;
      }
    });

    return tableEntry
  };

  /******** displayPending ***************
  Action: This function generates the pending starts that have been created so far.
  These rows have status of pending.  Once committed, Status = Active, Trello card created.
  Called by: Render function
  Calls: getTableEntry
  ****************************************/
  displayRows = () => {
    // this.forceUpdate();

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
    // console.log('clients', this.props.clients);

    const requestorList = [
      {id: 1, name: 'Chris'},
      {id: 2, name: 'Craig'},
      {id: 3, name: 'Merideth'},
      {id: 4, name: 'Ralph'}
    ];
    // console.log('client: ', this.state.client, this.state.client_id);
    // console.log('owner: ', this.state.owner, this.state.owner_id);
    // console.log('job number', this.state.job_number);
    // console.log('state', this.state);
    // console.log('jobNumber:', this.getJobNumber());


    return (
      <Fragment>
      <Paper className={classes.bodyPaper}>
        <Typography variant='h5'>Starts Entry</Typography>

        <Paper className={classes.Paper}>
          <form>
          <Grid container spacing={24}>
            <Grid item xs={12} md={3}>
              <CreatableSelect
                isClearable
                // isSearchable
                // getOptionLabel={({name}) => name}
                // getOptionValue={({id}) => id}
                placeholder='Select Client...'
                onChange={
                  (selected) => {
                    this.setState( {
                      client_id: selected?selected.value:null,
                      client: selected?selected.label:null
                    } )
                  }
                }
                // onInputChange={this.handleInputChange}
                options={
                  this.props.clients.map(client => {
                    return {
                      value: client.id.toString(),
                      label: client.name
                    }
                  })
                }
                onCreateOption={this.createClient}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Select
                id='requestor'
                isClearable
                isSearchable
                options={requestorList}
                getOptionLabel={({name}) => name}
                getOptionValue={({id}) => id}
                placeholder='Select Requestor...'
                onChange={
                  (selected) => {
                    this.setState( {
                      requestor_id: selected?selected.id:null,
                      requestor: selected?selected.name:null
                    } )
                  }
                }
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <CreatableSelect
                isClearable
                placeholder='Select Subdivision...'
                onChange={
                  (selected) => {
                    this.setState( {
                      subdivision_id: selected?selected.value:null,
                      subdivision: selected?selected.label:null
                    } )
                  }
                }
                options={
                  this.props.subdivisions.map(sub => {
                    return {
                      value: sub.id.toString(),
                      label: sub.subdivision
                    }
                  })
                }
                onCreateOption={this.createSubdivision}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <CreatableSelect
                isClearable
                placeholder='Select City...'
                onChange={
                  (selected) => {
                    this.setState( {
                      city_id: selected?selected.value:null,
                      city: selected?selected.label:null
                    } )
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
              />
            </Grid>
          </Grid>

          </form>
        </Paper>
        <Paper className={classes.Paper}>
          <AppBar position='static' color='secondary'>
            <Grid container>
              <Grid item xs={12}>
                <Tabs
                  value = {this.state.currentTab}
                  onChange={this.handleTabChange}
                  indicatorColor='secondary'
                  textColor='primary'
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
                </Tabs>
              </Grid>
            </Grid>
          </AppBar>

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

        </Paper>
          <Grid container justify="flex-end">
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={(e) => this.commitPendingAddresses()}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
      </Paper>
      {this.props.showClientDialog && <ClientDialogContainer newValue = {this.state.dialogValue} />}
      {this.props.showContactDialog && <ContactDialogContainer newValue = {this.state.dialogValue} />}
      {this.props.showCityDialog && <CityDialogContainer newValue = {this.state.dialogValue} />}
      {this.props.showSubdivisionDialog && <SubdivisionDialogContainer newValue = {this.state.dialogValue} />}
      </Fragment>

    );
  }

}

CreateStart.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateStart);

//
// pad(n, width, z) {
//   z = z || '0';
//   n = !n? '0': n + '';
//   return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
// }


        // <Paper className={classes.Paper}>
        //   <Grid container>
        //     <Grid item xs={12} md>
        //       <Paper className={classes.Paper}>
        //         Trello
        //       </Paper>
        //     </Grid>
        //     <Grid item xs={12} md>
        //       <Paper className={classes.Paper}>
        //         Box
        //       </Paper>
        //     </Grid>
        //   </Grid>
        // </Paper>

        // <Select
        //   id='client'
        //   // isClearable
        //   // isSearchable
        //   options={this.props.clients}
        //   getOptionLabel={({name}) => name}
        //   getOptionValue={({id}) => id}
        //   placeholder='Select Client...'
        //   onChange={
        //     (selected) => {
        //       this.setState( {
        //         client_id: selected?selected.id:null,
        //         client: selected?selected.name:null
        //       } )
        //     }
        //   }
        //   onCreateOption={this.createClient}
        // />
