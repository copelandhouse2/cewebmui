import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

import ClientDialogContainer from '../containers/ClientDialogContainer';
// import ContactDialogContainer from '../containers/ContactDialogContainer';
import CityDialogContainer from '../containers/CityDialogContainer';
import SubdivisionDialogContainer from '../containers/SubdivisionDialogContainer';
import AlertDialogContainer from '../containers/AlertDialogContainer';
import DupsDialogContainer from '../containers/DupsDialogContainer';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  container: {
    // padding: 10,
    // overflowY: 'scroll',
    // overflowX: 'hidden',
    width: '80%',
    // paddingRight: '10%',
    // paddingLeft: '20%',
    margin: 'auto',
    // flexGrow: 1,
  },
  appBar: {
    marginTop: 60,
    // width: '80%',
    // margin: 'auto',

    backgroundColor: theme.palette.secondary.light,
    padding: '10px 20px',
  },
  inputLabelProps: {
    shrink: true,
    style: {fontSize: 16, color: 'blue'}
  },
  // inputProps: { fontSize: 12 },
  inputProps: { padding: 8,
    fontSize: 14,      // default fontSize=16
    // backgroundColor: '#e8e8e8',
    borderRadius: 6,
    '&:hover': {backgroundColor: '#dedede', }

  },
  zIndexLift: { zIndex: 1000, },

  selectFieldWrapper: {
    paddingTop: 8, fontSize: 12, color: 'gray'
    , backgroundColor: '#e8e8e8', borderTopLeftRadius: 4
    , borderTopRightRadius: 4
    , '&:hover': {backgroundColor: '#dedede', color: 'black'}

  },
  selectLabel: {
    paddingLeft: 8,
    // '&:hover': {color: 'black'}
  },
  jobNumber: {
    backgroundColor: theme.palette.secondary.light,
    alignItems: 'center',
    fontWeight: 'bold',
    borderRadius: 4
  },
  titleContainer: {
    padding: '10px 10% 5px 10%',
    backgroundColor: theme.palette.secondary.light,
    // paddingLeft:'10%'
  },
  titleText: {
    color: theme.palette.secondary.contrastText
  }
//, padding: 8, minHeight: 20
});

// const createSelectProps = {
//   option: (provided) => ({ ...provided, fontSize: 14, color: 'black', }),
//   input: (provided) => ({ ...provided, color: 'black', }),
//   singleValue: (provided) => ({ ...provided, color: 'black', }),
//   label: (provided) => ({ ...provided, color: 'black', }),
//   control: (provided, state) => ({ ...provided,  minHeight: 10, height: 35, color: 'black', backgroundColor: '#e8e8e8', fontSize: 12, borderWidth: 0,
//     borderBottomWidth: state.isFocused? 2:1, borderBottomStyle: 'solid', borderBottomColor: 'black', borderRadius: 0,
//     ':hover': {borderBottomWidth: state.isFocused? 2:1, borderBottomStyle: 'solid', borderBottomColor: 'black', backgroundColor: '#dedede'},
//   }),
// };

const createSelectProps = {
  option: (provided) => ({ ...provided, fontSize: 12 }),
  input: (provided) => ({ ...provided, color: 'black'}),
  singleValue: (provided) => ({ ...provided, color: 'black'}),  //default fontSize=14
  control: (provided, state) => ({ ...provided,  minHeight: 0, height:35, fontSize: 14, borderWidth: 1, backgroundColor: 'inherit',
  ':hover': {backgroundColor: '#dedede', borderColor: 'blueGrey'},
  }),
};

//marginTop:1, minHeight: 10, height: 56,

class ProjectCreate extends Component {
  constructor(props) {
    super(props);

    this.today = new Date();
    const theMonth = this.today.getMonth()+1 < 10? `0${this.today.getMonth()+1}` : `${this.today.getMonth()+1}`;
    const theDay = this.today.getDate() < 10? `0${this.today.getDate()}` : `${this.today.getDate()}`;
    this.todayStr = `${this.today.getFullYear()}-${theMonth}-${theDay}`;

    this.state = {
      job_number: null,
      client_id: null,
      client: '',
      requestor_id: this.props.session.contact_id,  // contact_id
      requestor: this.props.session.full_name,       // contact full name
      owner_id: this.props.session.id,      // user_id
      owner: this.props.session.full_name,           // contact full name of the user_id
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
      bath1_shower_drop: '',
      geo_lab: 'MLALABS',
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
      created_by: this.props.session.id,
      last_updated_by: this.props.session.id,
      status: '',
      dialogValue: '',
      showSubDialog: false,
      due_date: null,  // actual due date of the project.
      onboard_date: this.todayStr,
      start_date: this.todayStr,
      classification: 'VOLUME',
      foundation_type: 'POST TENSION',
      scope: 'FDN',
      dwelling_type: 'PT 1 UNIT',
      // Trello and Box
      box_folder: '',
      trello_list_id: '5a908f0604afe40bdc89fb43',
      trello_list: 'FOUNDATION QUEUE',
      trello_card_id: '',
      createTrelloCard: false,
      rememberData: false,
      currentTab: 'volume',
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
      saveValue: '',

    };

    this.fields = [
      {name: 'title', title: 'Project Information', width: 12},
      // {label: 'Job Number', name: 'job_number', id: '', type: 'text', width: 12, isDisabled: true, required: false, list: []},
      {label: 'Address', name: 'address1', id: '', type: 'text', width: 3, isDisabled: false, required: true, list: []},
      {label: 'Client', name: 'client', id: 'client_id', type: 'text', width: 3, isDisabled: false, required: true, list: [], zIndex: 1000},
      {label: 'Subdivision', name: 'subdivision', id: 'subdivision_id', type: 'text', width: 3, isDisabled: true, required: false, list: [], zIndex: 990},
      {label: 'City', name: 'city', id: 'city_id', type: 'text', width: 2, isDisabled: true, required: false, list: [], zIndex: 980},
      {label: 'Due Date', name: 'due_date', id: '', type: 'date', width: 2, isDisabled: false, required: false, list: []},
      {label: 'Phase', name: 'phase', id: '', type: 'text', width: 1, isDisabled: false, required: false, list: []},
      {label: 'Section', name: 'section', id: '', type: 'text', width: 1, isDisabled: false, required: false, list: []},
      {label: 'Block', name: 'block', id: '', type: 'text', width: 1, isDisabled: false, required: false, list: []},
      {label: 'Lot', name: 'lot', id: '', type: 'text', width: 1, isDisabled: false, required: false, list: []},
      {label: 'Requestor', name: 'requestor', id: 'requestor_id', type: 'text', width: 2, isDisabled: true, required: false, list: [], zIndex: 970},

      {name: 'title', title: 'Design Details', width: 12},
      {label: 'Plan Type', name: 'plan_type', id: '', type: 'text', width: 1, isDisabled: false, required: false, list: []},
      {label: 'Elevation', name: 'elevation', id: '', type: 'text', width: 1, isDisabled: false, required: false, list: []},
      {label: 'Garage Swing', name: 'garage_swing', id: '', type: 'text', width: 2, isDisabled: false, required: false, list: this.props.garageSwingLookup, zIndex: 960},
      {label: 'Masonry', name: 'masonry', id: '', type: 'text', width: 2, isDisabled: false, required: false, list: this.props.masonryLookup, zIndex: 950},
      {label: 'Garage Type', name: 'garage_type', id: '', type: 'text', width: 2, isDisabled: false, required: false, list: this.props.garageTypeLookup, zIndex: 940},
      {label: 'Covered Patio', name: 'covered_patio', id: '', type: 'text', width: 2, isDisabled: false, required: false, list: this.props.coveredPatioLookup, zIndex: 930},
      {label: 'Bay Window', name: 'bay_window', id: '', type: 'text', width: 2, isDisabled: false, required: false, list: this.props.ynLookup, zIndex: 920},
      {label: 'Master Shower Drop', name: 'master_shower_drop', id: '', type: 'text', width: 2, isDisabled: false, required: false, list: this.props.ynLookup, zIndex: 910},
      {label: 'Garage Ext', name: 'garage_extension', id: '', type: 'number', width: 2, isDisabled: false, required: false, list: []},
      {label: 'Addl Options', name: 'additional_options', id: '', type: 'text', width: 3, isDisabled: false, required: false, list: []},
      {label: 'Notes', name: 'comments', id: '', type: 'text', width: 3, isDisabled: false, required: false, list: []},

      {name: 'title', title: 'Soils', width: 12},
      {label: 'Lab', name: 'geo_lab', id: '', type: 'text', width: 2, isDisabled: false, required: false, list: this.props.geos, zIndex: 1210},  // high z-index to clear scope below.
      {label: 'Report #', name: 'geo_report_num', id: '', type: 'text', width: 2, isDisabled: false, required: false, list: []},
      {label: 'Report Date', name: 'geo_report_date', id: '', type: 'date', width: 2, isDisabled: false, required: false, list: []},
      {label: 'PI', name: 'geo_pi', id: '', type: 'text', width: 1, isDisabled: false, required: false, list: []},
      {label: 'EmC', name: 'em_center', id: '', type: 'number', width: 1, isDisabled: false, required: false, list: []},
      {label: 'EmE', name: 'em_edge', id: '', type: 'number', width: 1, isDisabled: false, required: false, list: []},
      {label: 'YmC', name: 'ym_center', id: '', type: 'number', width: 1, isDisabled: false, required: false, list: []},
      {label: 'YmE', name: 'ym_edge', id: '', type: 'number', width: 1, isDisabled: false, required: false, list: []},
      {label: 'Soil Notes', name: 'soil_notes', id: '', type: 'text', width: 3, isDisabled: false, required: false, list: []},

      {name: 'title', title: 'Other', width: 12},
      {label: 'Dwelling', name: 'dwelling_type', id: '', type: 'text', width: 3, isDisabled: false, required: false, list: this.props.dwellingTypeLookup, zIndex: 1200},  // high z-index to get over appbar
      {label: 'Scope', name: 'scope', id: '', type: 'text', width: 3, isDisabled: false, required: false, list: this.props.scopeLookup, zIndex: 1200},  // high z-index to get over appbar
      {label: 'Trello List', name: 'trello_list', id: 'trello_list_id', type: 'text', width: 3, isDisabled: false, required: false, list: this.props.trelloListLookup, zIndex: 1200},
      {label: 'Trello Card', name: 'trello_card_id', id: '', type: 'text', width: 2, isDisabled: false, required: false, list: []},
      // {label: 'FDN Type', name: 'foundation_type', id: '', type: 'text', width: 4, isDisabled: false, required: false, list: []},
      // {label: 'Garage Entry', name: 'garage_entry', id: '', type: 'text', width: 3, isDisabled: false, required: false, list: this.props.garageEntryLookup},
      // {label: 'Garage Drop', name: 'garage_drop', id: '', type: 'number', width: 3, isDisabled: false, required: false, list: []},
      // {label: 'Bath 1', name: 'bath1_shower_drop', id: '', type: 'text', width: 3, isDisabled: false, required: false, list: this.props.ynLookup},
      // {label: 'Default List', name: 'trello_list', id: 'trello_list_id', type: 'text', width: 4, isDisabled: false, required: false, list: this.props.trelloListLookup},
    ]

  }

  handleChange = name => event => {

    // console.log('handleChange:', name);
    // name === 'scope'? console.log('field name: ', name, event.target.type, 'value: ', event.target.value, 'checked: ',event.target.checked): ''
    event.target.type === 'checkbox'? this.setState({ [name]: event.target.checked, }) :
    event.target.type === 'number' && event.target.value === ''? this.setState({ [name]: null, }) :
    event.target.type === 'date' && event.target.value === ''? this.setState({ [name]: null, }) :
    name === 'geo_pi'? this.setState({ [name]: event.target.value.toUpperCase(), }) :
    // name === 'block'?
    //   this.setState({ [name]: event.target.value, }, () => {
    //     if (this.state.subdivision && this.state.lot && this.state.block) {
    //       this.searchForExisting('LOT')
    //     }}
    //   ) :
    this.setState({ [name]: event.target.value, });
  };

  handleListChange = (selected, field) => {
    // console.log('in handleListChange:', field.name, selected);

    switch (field.name) {
      case 'subdivision':
        this.setState({ [field.name]: selected.code }, () => {
          if (this.state.subdivision && this.state.lot && this.state.block) {
            this.searchForExisting('LOT')
          }}
        );  // fill in value.
        break;
      case 'scope':
        selected? // if selected
          selected.code === 'FDN'? // was FDN selected?
              this.setState({ [field.name]: selected.code, foundation_type: 'POST TENSION' }) :  // fill in value.
              this.setState({ [field.name]: selected.code, foundation_type: null }) :  // user selected something other than FDN
          this.setState({ [field.name]: null, foundation_type: null });  // clear out

            break;
      default:
        selected?  // if selected
          field.id?  // then if field has an id
            this.setState({ [field.id]: selected.code, [field.name]: selected.name }) :  // fill in id and value.
            this.setState({ [field.name]: selected.code }) :  // fill in value.
          field.id?  // else (selected is null)... now if field has an id...
            this.setState({ [field.id]: null, [field.name]: null }) :  // clear out
            this.setState({ [field.name]: null });  // clear out
    }
  }

  handleTabChange = (event, value) => {
    // console.log('handleTabChange', value)
    this.setState({ currentTab: value });
  };

  tabKeyChange = (field) => {
    // using this key trap as an indication that the field has been filled in.
    // using this key trap as an indication that the field has been filled in.

    // console.log('tabKeyChange ** No Action **:', field.name);

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
  };

  initState = (clearAction) => {

    // rememberData toggle will assist volume entry by not erasing everything.  It will save all the values.
    // this can be a little dangerous.  Obviously clearing out address_id, job_number and setting the edit row
    // to be on the NEW ROW.
    if (this.state.rememberData && !clearAction ) {
      this.setState( {
        address_id: null,
        job_number: null,
        toggleQuickEntry: false,
      });
    }
    else {
      this.setState( {
        job_number: null,
        client_id: null,
        client: '',
        requestor_id: this.props.session.contact_id,      // contact_id
        requestor: this.props.session.full_name,  // contact full name
        owner_id: this.props.session.id,          // user_id
        owner: this.props.session.full_name,      // contact full name of the user_id
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
        bath1_shower_drop: '',
        geo_lab: 'MLALABS',
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
        created_by: this.props.session.id,
        last_updated_by: this.props.session.id,
        status: '',
        dialogValue: '',
        showSubDialog: false,
        due_date: null,  // actual due date of the project.
        foundation_type: 'POST TENSION',
        scope: 'FDN',
        dwelling_type: 'PT 1 UNIT',
        // Trello and Box
        box_folder: '',
        trello_list_id: '5a908f0604afe40bdc89fb43',
        trello_list: 'FOUNDATION QUEUE',
        trello_card_id: '',
        createTrelloCard: false,
        rememberData: false,
        currentTab: 'volume',
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
        saveValue: '',
      } );
    }

  };

  addStart = () => {
    // console.log('In add start: state', this.state);
    if (this.state.address1 !== '' && this.state.client_id !== null) {
      // console.log('In the if', this.state);

      this.setState({status: 'PENDING'}, ()=> {
        // console.log('In Save Start',this.props.session.id);
        // Passing...
        //    state - we are inserting / updating the job
        //    session id - this is the current user.  This is a filter for our pending rows
        //    PENDING - this is the load type and the status of the row in the DB.
        this.props.createAddress(this.state);
        this.initState();
      });
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

  commitPendingAddresses = () => {
    // console.log('In Commit Start',this.props.session.id);
    if (this.state.address1 !== '' && this.state.client_id !== null) {
      // console.log('In the if', this.state);

      this.setState({status: 'PENDING'}, ()=> {
        this.props.commitAddresses(this.props.session.id, [this.state], this.state.search, true);
        this.initState();
      });
    }
    else {
      this.props.loadMessage(
        { ok:false,
          status: 'Missing Data',
          statusText: "Missing Address or Client.  Please fill in"
        }, "ERROR");
    }

    // this.setState({status: 'PENDING'}, ()=> {
    //   this.props.commitAddresses(this.props.session.id, [this.state], this.state.search, true);
    //   this.initState();
    // });
    // this.initState();
  };

  createClient = (newValue) => {
    // console.log('create Client', newValue);
    this.setState({ dialogValue: newValue });
    this.props.showHideClientDialog();
  };

  createCity = (newValue) => {
    // console.log('create City', newValue);
    this.setState({ dialogValue: newValue });
    this.props.showHideCityDialog();
  };

  createSubdivision = (newValue) => {
    // console.log('create Subdivision', newValue);
    this.setState({ dialogValue: newValue });
    this.props.showHideSubdivisionDialog();
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

  // saving value before changing it.
  handleFocus = (name) => {
    // console.log('handleFocus:', name, this.state[name]);
    this.setState({ saveValue: this.state[name] });
  }

  // testing for on change.  But this test for change once you leave field and not firing after each keystroke.
  handleBlur = (name) => {
    // console.log('handleBlur:', name, this.state.saveValue, this.state[name]);
    switch (name) {
      case 'address1':
        if (this.state[name] !== this.state.saveValue && this.state.address1) {
          this.searchForExisting('ADDRESS');
        }
        break;
      case 'subdivision':
      case 'block':
      case 'lot':
        if (this.state[name] !== this.state.saveValue
            && (this.state.subdivision && this.state.lot && this.state.block)
        ) {
          this.searchForExisting('LOT');
        }
        break;
      default:
        break;
    };

  }

  getVolFieldEntry = (theState) => {
    const { classes, theme } = this.props;

    const fieldEntry = this.fields.map((field, id) => {

      switch (field.name) {
        case 'title':
          return (
            <Grid key={id} container justify='center'>
              <Grid item xs={12} style={ {marginTop: 20, marginBottom: 20, borderTop: '1px solid black'} }>
                <Typography align='left' style={{fontWeight: 500}}>
                  {field.title}
                </Typography>
              </Grid>
            </Grid>
          )
        case 'job_number':  // For job number, show it unless it is the add row.
          if (this.state.job_number) {
            return (
              <Grid item key={id} xs={12} md={field.width}>
                <Typography variant='overline' align='center' className={ classes.jobNumber }>
                  {this.state.job_number}
                </Typography>
              </Grid>
            )
          }
          return null;
        case 'client':
          return (
            <Grid item key={id} xs={12} md={field.width} style={ {zIndex: field.zIndex } } //className={classes.zIndexLift}
            >
              <FormControl fullWidth={true} variant='outlined' >
                <InputLabel shrink={true} style={ {color: theme.palette.primary.dark, backgroundColor: '#fafafa', padding: '0px 4px'} }>
                  {field.label+' *'}
                </InputLabel>
                <CreatableSelect styles={createSelectProps} //styles={createSelectAutoFillProps}                  isClearable
                  isSearchable
                  onChange={
                    (selected) => {
                      this.setState( {
                        client_id: selected?selected.value:null,
                        client: selected?selected.name:''
                      } )
                    }
                  }
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
              </FormControl>

            </Grid>
          )
        case 'requestor':
          return (
            <Grid item key={id} xs={12} md={field.width} style={ {zIndex: field.zIndex } }>
              <FormControl fullWidth={true} variant='outlined' >
                <InputLabel shrink={true} style={ {color: theme.palette.primary.dark, backgroundColor: '#fafafa', padding: '0px 4px'} }>
                  {field.label}
                </InputLabel>
                <Select styles={createSelectProps} //styles={createSelectAutoFillProps}                  id='requestor'
                  isClearable
                  isSearchable
                  options={this.props.contacts}
                  getOptionLabel={({full_name}) => full_name}
                  getOptionValue={({id}) => id}
                  // placeholder={field.label}
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
              </FormControl>
            </Grid>
          )
        case 'subdivision':
          return (
            <Grid item key={id} xs={12} md={field.width} style={ {zIndex: field.zIndex } } //className={classes.zIndexLift1}>
            >
              <FormControl fullWidth={true} variant='outlined' >
                <InputLabel shrink={true} style={ {color: theme.palette.primary.dark, backgroundColor: '#fafafa', padding: '0px 4px'} }>
                  {field.label}
                </InputLabel>
                <CreatableSelect styles={createSelectProps} //styles={createSelectAutoFillProps}                  isClearable
                  // placeholder={field.label}
                  onChange={
                    (selected) => {
                      this.setState( {
                        subdivision_id: selected?selected.value:null,
                        subdivision: selected?selected.name:''
                      });
                    }
                  }
                  onFocus={
                    (e) => {this.handleFocus(field.name);}
                  }
                  onBlur={
                    (e) => {this.handleBlur(field.name);}
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
                  // onCreateOption={this.createSubdivision}
                  onCreateOption={this.subdivisionDialog}
                  value={ {value: this.state.subdivision_id? this.state.subdivision_id.toString() : ''
                    , label: this.state.subdivision
                    , name: this.state.subdivision} }
                />
              </FormControl>
            </Grid>
          )
        case 'city':
          return (
            <Grid item key={id} xs={12} md={field.width} style={ {zIndex: field.zIndex } }>
              <FormControl fullWidth={true} variant='outlined' >
                <InputLabel shrink={true} style={ {color: theme.palette.primary.dark, backgroundColor: '#fafafa', padding: '0px 4px'} }>
                  {field.label}
                </InputLabel>
                <CreatableSelect styles={createSelectProps} //styles={createSelectAutoFillProps}
                  isClearable
                  // placeholder={field.label}
                  onChange={
                    (selected) => {
                      this.setState( {
                        city_id: selected?selected.value:null,
                        city: selected?selected.label:''
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
                  value={ {value: this.state.city_id? this.state.city_id.toString() : ''
                    , label: this.state.city
                    , name: this.state.city} }
                />
              </FormControl>
            </Grid>
          )
        case 'geo_lab':
          var currentValue = {value: '', label: ''};
          if (this.state.geo_lab) {
            const lab = this.props.geos.find(geo => geo.code === this.state.geo_lab).name;
            // console.log ('the selected lab', lab)
            currentValue = { value: this.state.geo_lab, label: lab };
          };

          return (
            <Grid item key={id} xs={12} md={field.width} style={ {zIndex: field.zIndex } }>

              <FormControl fullWidth={true} variant='outlined' >
                <InputLabel shrink={true} style={ {color: theme.palette.primary.dark, backgroundColor: '#fafafa', padding: '0px 4px'} }>
                  {field.label}
                </InputLabel>
                <CreatableSelect styles={createSelectProps} //styles={createSelectAutoFillProps}
                  isClearable
                  // placeholder={field.label}
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
                </FormControl>

            </Grid>
          )
        default:
          if (field.list.length > 0) {
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
            return (
              <Grid item key={id} xs={12} md={field.width} style={ {zIndex: field.zIndex } }>
                <FormControl fullWidth={true} variant='outlined' >
                  <InputLabel shrink={true} style={ {color: theme.palette.primary.dark, backgroundColor: '#fafafa', padding: '0px 4px'} }>
                    {field.label}
                  </InputLabel>
                  <Select styles={createSelectProps}
                    isClearable
                    options={field.list}
                    getOptionLabel={({name}) => name}
                    getOptionValue={({code}) => code}
                    value={currentValue}
                    onChange={
                      (selected) => {
                        this.handleListChange(selected, field);
                      }
                    }
                  />
                </FormControl>
              </Grid>

            )
          }
          else  // fields that do not have a list.
            return (
              <Grid item key={id} xs={12} md={field.width} >
                <TextField
                  inputRef={field.name === 'address1'? this.addrRef:null}
                  required={field.required}
                  disabled={field.disabled}
                  select={field.list.length !== 0? true: false}
                  id={field.name}
                  value={ eval(`theState.${field.name}`)||'' }
                  fullWidth = {true}
                  variant='outlined'
                  label={field.label}
                  // helperText={field.label}
                  // placeholder={field.label}
                  onChange={this.handleChange(field.name)}
                  onKeyDown={
                    (e) => {
                      if (e.keyCode === 9 || e.keyCode === 13) {
                        this.tabKeyChange(field);
                      }
                    }
                  }
                  onFocus={
                    (e) => {this.handleFocus(field.name);}
                  }
                  onBlur={
                    (e) => {this.handleBlur(field.name);}
                  }
                  type={field.type}
                  // root = {{fontSize: '8px'}}
                  InputProps={{
                    classes: {
                      input: classes.inputProps,
                    },
                    readOnly: field.isDisabled,
                  }}
                  // InputLabelProps={
                  //   classes.inputLabelProps
                  // }
                  InputLabelProps={{
                    shrink: true,
                    style: { color: theme.palette.primary.dark, backgroundColor: '#fafafa' },
                  }}
                />
              </Grid>
            )
      }  // switch stmt closure.
    });  // map loop to create tableEntry closures.
    return fieldEntry
  };    // getVolFieldEntry() closure

  render() {
    const { classes } = this.props;
    // console.log('Theme', theme.spacing.unit);

    return (
      <div>
      <Grid container
        justify='space-between'
        className={classes.titleContainer}
      >
        <Grid item xs={8}>
          <Typography variant='h6' className={classes.titleText}>
            Volume Foundation / Framing
          </Typography>
        </Grid>
        <Grid item>
          <Button title='Advanced Mode'
            variant="contained"
            color="secondary"
            size='small'
            onClick={(e) => this.props.handleQuickEntry()}
          >
            Go To Table View
          </Button>
        </Grid>
      </Grid>
        <Grid container spacing={8}
          className={classes.container}
        >

          { this.getVolFieldEntry(this.state) }
          <Grid container justify="flex-end" style={{marginTop: 20}} spacing={16}>
            <Grid item>
              <Button title='Clear the fields'
                variant="contained"
                color="secondary"
                onClick={(e) => this.initState(true)}
              >
                Clear
              </Button>
            </Grid>
            <Grid item>
              SAVE values
              <Checkbox
                onChange={this.handleChange('rememberData')}
                checked={this.state.rememberData}
              />
            </Grid>

            <Grid item>
              <Button title='Saves AND creates Trello card.  Edit via search.'
                variant="contained"
                color="secondary"
                onClick={(e) => this.commitPendingAddresses()}
              >
                Submit
              </Button>
            </Grid>
            <Grid item>
              <Button title='Adds records to left pane.  Can edit before submission'
                variant="contained"
                color="secondary"
                // onClick={(e) => this.commitPendingAddresses()}
                onClick={(e) => {
                  e.preventDefault();
                  if (this.addStart) { this.addStart(); }
                }}
              >
                Add Only
              </Button>
            </Grid>
          </Grid>
        </Grid>
      {/*</Drawer>*/}
      {this.props.showClientDialog && <ClientDialogContainer newValue = {this.state.dialogValue} />}
      {this.props.showCityDialog && <CityDialogContainer newValue = {this.state.dialogValue} />}
      {/*this.props.showSubdivisionDialog && <SubdivisionDialogContainer newValue = {this.state.dialogValue} />*/}
      {this.state.showSubDialog && <SubdivisionDialogContainer
        newValue = {this.state.dialogValue}
        open = {this.state.showSubDialog}
        closeDialog = {this.subdivisionDialog}
      />}
      {this.props.dups.length > 0  &&
      this.state.dupsDialogActivate &&
      <DupsDialogContainer
        open = {this.props.dups.length > 0}
        // onSelectAndClose = {this.editStart}
        onSelectAndClose = {null}
        onClose = {this.dupsDialogClose}
        curRec = {this.state}
        selectAllowed = {false}
      />}
      <AlertDialogContainer />
      </div>
    )
  }

} // Project Create class closure

ProjectCreate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ProjectCreate);
