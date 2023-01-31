import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import { useTheme } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

import Lock from '@material-ui/icons/Lock';
import LockOpen from '@material-ui/icons/LockOpen';
import HelpIcon from '@material-ui/icons/Help';
import ClearIcon from '@material-ui/icons/Clear';

const styles = (theme) => ({
  inputProps: {
    padding: '6px 0px 6px 6px',
    // margin: 0,
    fontSize: 12, // default fontSize=16
    // backgroundColor: '#e8e8e8',
    borderRadius: '6px 0px 0px 6px',
    '&:hover': { backgroundColor: '#dedede', borderWidth: 2 },
    // '&:focus': {backgroundColor: '#dedede', borderColor: theme.palette.secondary.main, borderWidth: 2},
    minHeight: 19, // this makes text, number, date fields match in height.
    // '& .MuiOutlinedInput-multiline': {padding: 0},
    // '& .MuiInputBase-multiline': {padding: 0},
  },
  rootProps: {
    '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
      // hovered
      borderColor: theme.palette.secondary.light,
      borderWidth: 2,
    },
    '&$focused $notchedOutline': {
      // focused
      borderColor: theme.palette.secondary.main,
      borderWidth: 2,
    },
  },
  adornment: {
    backgroundColor: theme.palette.secondary.main,
    // color: theme.palette.secondary.contrastText,
    padding: 0,
    margin: 0,
    height: 50,
    borderRadius: '0px 6px 6px 0px',
  },
  adornment2: {
    // backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    padding: 2,
    margin: 0,
  },
  adornment3: {
    paddingRight: 0,
  },
  disabled: {},
  focused: {},
  error: {},
  notchedOutline: {},
  multiline: {
    padding: 0,
  },
  colInputProps: {
    borderRadius: 4,
  },
  lock: {
    height: 24,
    width: 24,
  },
});

const createSelectProps = (theme) => ({
  option: (provided, state) => ({
    ...provided,
    fontSize: 12,
    color: 'black',
    backgroundColor: state.isFocused ? theme.palette.secondary.light : '#fafafa',
  }),
  input: (provided) => ({ ...provided, color: 'black' }),
  menu: (provided) => ({ ...provided, zIndex: 6000 }),
  singleValue: (provided) => ({ ...provided, color: 'black' }), //default fontSize=14
  control: (provided, state) => ({
    ...provided,
    minHeight: 0,
    height: 32,
    fontSize: 12,
    backgroundColor: 'inherit',
    borderWidth: state.isFocused ? 2 : 1,
    borderColor: state.isFocused ? theme.palette.secondary.main : 'lightgray',
    boxShadow: '0px 0px 0px 0px #fafafa',
    ':hover': {
      backgroundColor: '#dedede',
      borderWidth: 2,
      borderColor: state.isFocused ? theme.palette.secondary.main : theme.palette.secondary.light,
    },
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    padding: 0,
    '& .css-tlfecz-indicatorContainer': { padding: 0 },
    '& .css-1gtu0rj-indicatorContainer': { padding: 0 },
  }),
});

const createSelectPropsAltBkg = (theme) => ({
  option: (provided, state) => ({
    ...provided,
    fontSize: 12,
    color: 'black',
    backgroundColor: state.isFocused ? theme.palette.secondary.light : '#fafafa',
  }),
  input: (provided) => ({ ...provided, color: 'black' }),
  menu: (provided) => ({ ...provided, zIndex: 6000 }),
  singleValue: (provided) => ({ ...provided, color: 'black' }), //default fontSize=14
  control: (provided, state) => ({
    ...provided,
    minHeight: 0,
    height: 36,
    [theme.breakpoints.up('xs')]: {
      fontSize: 13,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 15,
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 18,
    },
    // , fontSize: 18
    backgroundColor: 'inherit',
    borderWidth: state.isFocused ? 3 : 2,
    borderColor: theme.palette.secondary.main,
    boxShadow: '0px 0px 0px 0px #fafafa',
    ':hover': { backgroundColor: '#dedede', borderWidth: 3, borderColor: theme.palette.secondary.main },
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    padding: 0,
    '& .css-tlfecz-indicatorContainer': { padding: 0, color: theme.palette.secondary.dark },
    '& .css-1gtu0rj-indicatorContainer': { padding: 0, color: theme.palette.secondary.dark },
  }),
});

const colSelectProps = (theme) => ({
  option: (provided, state) => ({
    ...provided,
    fontSize: 12,
    color: 'black',
    backgroundColor: state.isFocused ? theme.palette.secondary.light : '#fafafa',
  }),
  input: (provided) => ({ ...provided, color: 'black' }),
  menu: (provided) => ({ ...provided, zIndex: 6000 }),
  singleValue: (provided) => ({ ...provided, color: 'black' }), //default fontSize=14
  indicatorsContainer: (provided, state) => ({
    ...provided,
    padding: 0,
    '& .css-tlfecz-indicatorContainer': { padding: 0 },
    '& .css-1gtu0rj-indicatorContainer': { padding: 0 },
  }),
  control: (provided, state) => ({
    ...provided,
    minHeight: 0,
    height: 32,
    fontSize: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.09)',
    boxShadow: '0px 0px 0px 0px #fafafa',
    borderWidth: 0,
    ':hover': { backgroundColor: '#dedede', borderWidth: 0 },
  }),
});

const handleChange =
  (name, arrID, state, updateState, clear = false) =>
  (event) => {
    // name === 'jobNumUnlock'?console.log('event target', event.target):null;
    // console.log('ceField handleChange', name, state);
    // console.log('handleChange', name, event.target.value);

    if (arrID || arrID === 0) {
      let updatedScope = [...state.scope];

      updatedScope[arrID][name] =
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.type === 'number' && event.target.value === ''
          ? null
          : event.target.type === 'date' && event.target.value === ''
          ? null
          : name === 'geo_pi'
          ? event.target.value.toUpperCase()
          : name === 'geo_code'
          ? event.target.value.replace(/[^A-Z0-9]/gi, '').toUpperCase()
          : name === 'revision'
          ? event.target.value.replace(/[^A-Z]/gi, '').toUpperCase()
          : name === 'trello_card_id' && event.target.value.startsWith('https://trello.com/c/')
          ? event.target.value.slice(21)
          : event.target.value;
      // name === 'block'?
      //   this.setState({ [name]: event.target.value, }, () => {
      //     if (this.state.subdivision && this.state.lot && this.state.block) {
      //       this.searchForExisting('LOT')
      //     }}
      //   ) :
      updateState({ scope: updatedScope });
    } else {
      event.target.type === 'checkbox'
        ? updateState({ [name]: event.target.checked })
        : event.target.type === 'number' && event.target.value === ''
        ? updateState({ [name]: null })
        : event.target.type === 'date' && event.target.value === ''
        ? updateState({ [name]: null })
        : name === 'geo_pi'
        ? updateState({ [name]: event.target.value.toUpperCase() })
        : name === 'geo_code'
        ? updateState({ [name]: event.target.value.replace(/[^A-Z0-9]/gi, '').toUpperCase() })
        : name === 'revision'
        ? updateState({ [name]: event.target.value.replace(/[^A-Z]/gi, '').toUpperCase() })
        : name === 'trello_card_id' && event.target.value.startsWith('https://trello.com/c/')
        ? updateState({ [name]: event.target.value.slice(21) })
        : // name === 'block'?
          //   this.setState({ [name]: event.target.value, }, () => {
          //     if (this.state.subdivision && this.state.lot && this.state.block) {
          //       this.searchForExisting('LOT')
          //     }}
          //   ) :
          updateState({ [name]: clear ? null : event.target.value });
    }
  };

const handleListChange = (selected, field, arrID, state, updateState, altList = null) => {
  // console.log('in handleListChange:', updateState);
  if (state.object === 'INSPECTION' && field.name === 'find') {
    if (selected) {
      updateState({ find: selected });
    }
    return true;
  }

  if (arrID || arrID === 0) {
    switch (field.name) {
      default:
        let updatedScope = [...state.scope];

        if (selected) {
          if (field.name_id) {
            // fill in id and value
            updatedScope[arrID][field.name_id] = selected.code;
            updatedScope[arrID][field.name] = selected.name;
          } else {
            // fill in value
            updatedScope[arrID][field.name] = selected.code;
          }
        } else {
          // it is null so...
          if (field.name_id) {
            // NULL out id and value
            updatedScope[arrID][field.name_id] = null;
            updatedScope[arrID][field.name] = null;
          } else {
            // just NULL out value.
            updatedScope[arrID][field.name] = null;
          }
        }
        updateState({ scope: updatedScope });
    }
  } else {
    switch (field.name) {
      case altList ? altList.name : '':
        // field.name === 'address1'?console.log('handleListChange alt 1', field, selected, altList):null;
        selected // if selected
          ? altList.name_id // then if field has an id
            ? updateState({ [altList.name_id]: selected.code, [field.name]: selected.name }) // fill in id and value.
            : updateState({ [field.name]: selected.code }) // fill in value.
          : altList.name_id // else (selected is null)... now if field has an id...
          ? updateState({ [altList.name_id]: null, [field.name]: null }) // clear out
          : updateState({ [field.name]: null }); // clear out
        break;
      default:
        // field.name === 'city'?console.log('handleListChange dft 1', field, selected, altList):null;
        // field.name === 'billing_city'?console.log('handleListChange billing_city', field, selected, altList):null;
        selected // if selected
          ? field.name_id // then if field has an id
            ? updateState({ [field.name_id]: selected.code, [field.name]: selected.name }) // fill in id and value.
            : updateState({ [field.name]: selected.code }) // fill in value.
          : field.name_id // else (selected is null)... now if field has an id...
          ? updateState({ [field.name_id]: null, [field.name]: null }) // clear out
          : updateState({ [field.name]: null }); // clear out
    } // switch
  } // else portion of inside if
};

// const handleChangeCustomized = (selected, field, props) => event => {
//   const { handleChangeCustomized } = props;
//   console.log('handleChangeCustomized');
//   if (selected) {
//     handleChangeCustomized(field,selected);
//   } else {
//     handleChangeCustomized(field,event);
//   }
// }

const handleTabEnter = (name, currentValue, key, props) => {
  const { loadFind, loadMessage, updateState, findAction, asYouType, state } = props;
  // console.log('handleTabEnter', name);
  switch (name) {
    case 'find':
      if (state.object === 'PROJECT' && currentValue === '') {
        loadMessage({ ok: false, status: `Empty Value`, statusText: 'Please include filter value for search' }, 'ERROR');
      } else {
        if (findAction && !asYouType) {
          // console.log('findAction exists');
          findAction();
        } else {
          // console.log('findAction does not exist');
          findProjects(currentValue, loadFind, updateState);
        }
      }
      break;
    case 'geo_lab':
    case 'geo_pi':
      if (key === 13) getGeoValues(props); // TAB is handled via blur event.
      break;
    default:
      if (findAction) findAction();
  }
};

const findProjects = (search, loadFind, updateState) => {
  // console.log('find projects', search);
  loadFind(search);
  // this.props.toggleDrawer('find');
  updateState({ findDrawerOpen: true });
};

const findProjectHelp = () => {
  return (
    <div>
      <Typography variant='h6' gutterBottom={true}>
        Functionality
      </Typography>
      <Typography variant='body1' gutterBottom={true}>
        Find field is an intelligent search field. The user can enter multiple filter criteria separated with 'and' keyword. You can search with
        keywords or without. You can also combine the two. Also, values are case insensitive. You can use uppercase or lowercase.
      </Typography>
      <Typography variant='subtitle2' gutterBottom={true}>
        ldate:90 and 20000143
        <br />
        Sweetwater and block:A
      </Typography>
      <Typography variant='body1' gutterBottom={true}>
        If no keywords are provided the search element will filter across all the following fields...
      </Typography>
      <Typography variant='subtitle2' gutterBottom={true}>
        Job Number, Address, Story, Subdivision, City, Client , Requested By, Entered By, Rev Desc, Lab, Lab Report, PI , Soil Notes, Status
        <br />
        <br />
        and Scope Level: Scope, Scope Rev Desc, Plan Type, Garage Type , Garage Swing, FDN Type, Floor Type, Roof Type
      </Typography>

      <Typography variant='h6' gutterBottom={true}>
        Limit
      </Typography>
      <Typography variant='body1' gutterBottom={true}>
        The default limit of rows returned is 200. You can override this value by using the "limit" keyword
      </Typography>
      <Typography variant='subtitle2' gutterBottom={true}>
        limit:500 - Return up to 500 rows.
        <br />
        limit:no - No limit. Return everything.
      </Typography>

      <Typography variant='h6' gutterBottom={true}>
        Keywords Support
      </Typography>
      <Typography variant='body1' gutterBottom={true}>
        Keywords provide better filter granularity because it targets a particular field. To construct a keyword search element, first type the
        keyword followed by a colon, then the value without any spaces after the colon.
      </Typography>
      <Typography variant='subtitle2' gutterBottom={true}>
        cli:Lennar and sub:Sweet and phase:2
        <br />
        NOTE: In the case of a date search, you must use the keywords. See below.
      </Typography>
      <Typography variant='body1' gutterBottom={true}>
        The following keywords are supported
      </Typography>
      <Typography variant='subtitle2' noWrap={true} gutterBottom={true}>
        job: or job_number:
        <br />
        story:
        <br />
        rev: or revision:
        <br />
        rdesc: or revision_desc:
        <br />
        addr: or address:
        <br />
        city:
        <br />
        sub: or subdivision:
        <br />
        phase:
        <br />
        sec: or section:
        <br />
        lot:
        <br />
        block:
        <br />
        cli: or client:
        <br />
        grep: or geo_report_num:
        <br />
        pi: or geo_pi:
        <br />
        snote: or soil_notes:
        <br />
        cdate: or creation_date: - number. value last x days.
        <br />
        ldate: or last_updated_date: - number. values last x days.
        <br />
        ent: or entered: - Entered by
        <br />
        req: or requested: - Requested by
        <br />
        status: - Status: PENDING or ACTIVE
        <br />
      </Typography>
      <Typography variant='body1' gutterBottom={true}>
        You can also search the scope of each project for specific values.
      </Typography>
      <Typography variant='subtitle2' noWrap={true}>
        rdescs: or revision_desc_scope:
        <br />
        pt: or plan_type:
        <br />
        gt: or garage_type:
        <br />
        gs: or garage_swing:
        <br />
        ft: or foundation_type:
        <br />
        flrt: or floor_type:
        <br />
        rt: or roof_type:
        <br />
        scope: <i>Scope keywords to use:</i>
        <br />
        <li>lotshell - Lot Shells</li>
        <li>acetate - Acetates</li>
        <li>lfa - lot fit analysis</li>
        <li>sslfa - Single Site Lot Fit Analysis</li>
        <li>plot - Plot Plan</li>
        <li>volmf - Volume Master Frame</li>
        <li>volssf - Volume Single Site Frame</li>
        <li>volssa - Volume Single Site Archs</li>
        <li>volfoundation - Foundation on volume projects</li>
        <li>cusfoundation - Foundation on custom projects</li>
        <li>cusframing - Framing on custom projects</li>
        <li>gravretwall - Gravity Retaining Wall for custom projects</li>
        <li>volgravretwall - Gravity Retaining Wall for volume projects</li>
        <li>cantretwall - Cantilevered Retaining Wall</li>
        <li>pool</li>
        <li>splitter</li>
        <li>detpond - Detention Pond</li>
        <li>retpond - Retention Pond</li>
        <li>culvert</li>
        <li>amenity - Amenity Center</li>
        <li>bball - Basketball Court</li>
        <li>tennis - Tennis Court</li>
        <li>monument - Entry Monument</li>
        <li>wall</li>
        <li>column</li>
        <li>trellis</li>
        <li>rain - Rain Garden</li>
        <li>voldeck - Deck for volume projects</li>
        <li>cusdeck - Deck for custom projects</li>
        <li>voldrain - Drain for volume projects</li>
        <li>cusdrain - Drain for custom projects</li>
        <li>volother - Other scope for volume projects</li>
        <li>cusother - Other scope for custom projects</li>
      </Typography>
    </div>
  );
};

const findClientHelp = () => {
  return (
    <div>
      <Typography variant='h6' gutterBottom={true}>
        Functionality
      </Typography>
      <Typography variant='body1' gutterBottom={true}>
        Client Find field is an intelligent search field. The search element will filter across the following fields...
      </Typography>
      <Typography variant='subtitle2' gutterBottom={true}>
        Name, Full Name, Address1, City, State, Zip
      </Typography>
    </div>
  );
};
const findCityHelp = () => {
  return (
    <div>
      <Typography variant='h6' gutterBottom={true}>
        Functionality
      </Typography>
      <Typography variant='body1' gutterBottom={true}>
        City Find field is an intelligent search field. The search element will filter across the following fields...
      </Typography>
      <Typography variant='subtitle2' gutterBottom={true}>
        ID, City, State, Country
      </Typography>
    </div>
  );
};
const findSubHelp = () => {
  return (
    <div>
      <Typography variant='h6' gutterBottom={true}>
        Functionality
      </Typography>
      <Typography variant='body1' gutterBottom={true}>
        Subdivision Find field is an intelligent search field. The search element will filter across the following fields...
      </Typography>
      <Typography variant='subtitle2' gutterBottom={true}>
        ID, Subdivision, City
      </Typography>
    </div>
  );
};
const findGeotechHelp = () => {
  return (
    <div>
      <Typography variant='h6' gutterBottom={true}>
        Functionality
      </Typography>
      <Typography variant='body1' gutterBottom={true}>
        Geotech Find field is an intelligent search field. The search element will filter across the following fields...
      </Typography>
      <Typography variant='subtitle2' gutterBottom={true}>
        Lab Code, Lab, Firm Num, Main Contact, Main Email
      </Typography>
    </div>
  );
};
const findDescription = (findObject, loadMessage) => {
  // console.log('findDescription', findObject);
  switch (findObject) {
    case 'PROJECT':
      loadMessage({ ok: false, status: `Find Field Instructions`, statusText: findProjectHelp() }, 'INFO');
      break;
    case 'CLIENT':
      loadMessage({ ok: false, status: `Find Field Instructions`, statusText: findClientHelp() }, 'INFO');
      break;
    case 'CITY':
      loadMessage({ ok: false, status: `Find Field Instructions`, statusText: findCityHelp() }, 'INFO');
      break;
    case 'SUBDIVISION':
      loadMessage({ ok: false, status: `Find Field Instructions`, statusText: findSubHelp() }, 'INFO');
      break;
    case 'GEOTECH':
      loadMessage({ ok: false, status: `Find Field Instructions`, statusText: findGeotechHelp() }, 'INFO');
      break;

    default:
  }
};

const getGeoValues = (props) => {
  const { state, updateState, geos, geoMasterData } = props;
  // using this key trap as an indication that the field has been filled in.
  // using this key trap as an indication that the field has been filled in.

  // console.log('getGeoValues 2:', state.geo_lab, state.geo_pi);

  if (state.geo_lab === 'MLALABS' && state.geo_pi) {
    const geo_id = geos.find((geo) => geo.code === state.geo_lab).id;
    const oneGeoMaster = geoMasterData.filter((rec) => rec.geotech_id === geo_id);
    const emYmValues = oneGeoMaster.find((rec) => rec.pi === state.geo_pi);
    if (emYmValues) {
      updateState({ em_center: emYmValues.emc, em_edge: emYmValues.eme, ym_center: emYmValues.ymc, ym_edge: emYmValues.yme });
    }
  }
};

const toggleJob = (updateState, state) => {
  updateState({ jobNumUnlock: !state.jobNumUnlock });
};

const toggleID = (updateState, state) => {
  updateState({ idUnlock: !state.idUnlock });
};

// saving value before changing it.
const handleFocus = (name, state, updateState) => {
  // console.log('ceField handleFocus', name, state);
  updateState({ saveValue: state[name] || null });
};

// testing for on change.  But this test for change once you leave field and not firing after each keystroke.
// field.name, state, searchForDups, updateState, searchMode
const handleBlur = (name, props) => {
  const { state, searchForDups, updateState, dupCheck } = props;
  // console.log('ceField handleBlur', name, state, dupCheck);

  switch (name) {
    case 'address1':
      if (dupCheck && state[name] !== state.saveValue && state.address1) {
        searchForExisting('ADDRESS', state, updateState, searchForDups);
      }
      break;
    case 'subdivision':
    case 'block':
    case 'lot':
      if (dupCheck && state[name] !== state.saveValue && state.subdivision && state.lot && state.block) {
        searchForExisting('LOT', state, updateState, searchForDups);
      }
      break;
    case 'geo_lab':
    case 'geo_pi':
      getGeoValues(props);
      break;
    default:
  }
};

const searchForExisting = (test, state, updateState, searchForDups) => {
  // console.log('searchForExisting', test);
  searchForDups(test, state);
  updateState({ openDupsDialog: true });
};

// Textfield templates
const textField = (props) => {
  const { classes, theme, field, state, arrID } = props; // pass thru call.
  // console.log('textField', field, arrID);
  let currentValue = '';
  if (arrID || arrID === 0) {
    // console.log('scope: ', field.name, arrID, state.scope[arrID]);
    if (state.scope[arrID]) currentValue = state.scope[arrID][field.name] || '';
    // currentValue = state.scope[arrID][field.name]||''
  } else {
    currentValue = state[field.name] || '';
  }

  let fieldDisabled = field.name === 'job_number' && state.jobNumUnlock ? 'N' : field.disabled;
  // console.log('field', field);
  // field.name === 'job_number'?console.log('currentValue: job', field):null;
  // field.name === 'job_number'?console.log('value for disabled', fieldDisabled):null;
  return (
    <Grid item xs={12} md={field.display_width}>
      <TextField
        // inputRef={field.name === 'address1'? this.addrRef:null}
        required={field.required === 'Y' ? true : false}
        disabled={fieldDisabled === 'Y' ? true : false}
        // disabled={disabled}
        // select={field.list.length !== 0? true: false}
        // id={field.name}
        value={currentValue}
        fullWidth={field.name === 'job_number' ? true : true}
        variant='outlined'
        label={field.label}
        onChange={props.handleChange(field.name, arrID)}
        multiline={field.data_type === 'multilongtext' ? true : false}
        rows={field.data_type === 'multilongtext' ? 2 : 1}
        type={field.data_type === 'multilongtext' || field.data_type === 'longtext' ? 'text' : field.data_type}
        onKeyDown={(e) => {
          if (e.keyCode === 9 || e.keyCode === 13) {
            props.handleTabEnter(field.name, currentValue);
          }
        }}
        onFocus={(e) => {
          props.handleFocus(field.name);
        }}
        onBlur={(e) => {
          props.handleBlur(field.name);
        }}
        // inputProps={{ style: {padding:0} }}
        InputProps={{
          classes: {
            input: `${props.addStyle} ${classes.inputProps}`,
            root: classes.rootProps,
            disabled: classes.disabled,
            focused: classes.focused,
            error: classes.error,
            notchedOutline: classes.notchedOutline,
            multiline: classes.multiline,
            adornedEnd: classes.adornment3,
          },
          readOnly: field.readonly === 'Y' ? true : false,
          endAdornment:
            field.name === 'find' ? (
              <InputAdornment
                position='end'
                classes={{
                  root: classes.adornment,
                }}>
                <IconButton
                  aria-label='Search'
                  // onClick={search}
                  classes={{
                    root: classes.adornment2,
                  }}
                  onClick={() => props.findProjects(currentValue)}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ) : field.name === 'job_number' ? (
              <IconButton
                aria-label='job-unlock'
                color='secondary'
                title='Unlock job number for editing'
                style={{ padding: 2 }}
                onClick={props.toggleJob}>
                {state.jobNumUnlock ? <LockOpen fontSize='small' /> : <Lock fontSize='small' />}
              </IconButton>
            ) : null,
        }}
        InputLabelProps={{
          shrink: true,
          style: { color: theme.palette.primary.dark, backgroundColor: '#fafafa' },
        }}
      />
    </Grid>
  );
};

const listField = (props) => {
  const { theme, field, state, arrID, updateState, altLookups } = props; // passed thru call
  // const { loadFind, loadMessage } = props;  // passed thru container
  // console.info('listField', props.position);
  // field.name === 'find'? console.log('listField', field, altLookups): null;
  // field.name === 'entered_by'? console.log('listField', field, props[field.lookup_list]): null;
  // field.name === 'billing_city'? console.log('listField', field, props[field.lookup_list]): null;
  // console.log('listField', field, props[field.lookup_list]);
  let currentValue;

  // field.name === 'inspector'?console.info('field',field.lookup_list):null;
  // field.name === 'inspection_type'?console.log('lookups',altLookups):null;

  // if (field.name_id) {
  //   currentValue = state[field.name_id]?
  //     props[field.lookup_list].find(option => option.code == state[field.name_id]) :
  //     {code: '', name: ''};
  // } else {
  //   currentValue = state[field.name]?
  //     props[field.lookup_list].find(option => option.code === state[field.name]) :
  //     {code: '', name: ''};
  // }
  let altList = null;
  if (arrID || arrID === 0) {
    // console.log('scope: ', field.name, arrID, state.scope[arrID]);
    if (state.scope[arrID]) currentValue = state.scope[arrID][field.name] || '';

    if (field.name_id) {
      currentValue = state.scope[arrID][field.name_id]
        ? props[field.lookup_list].find((option) => option.code == state.scope[arrID][field.name_id])
        : { code: '', name: '' };
    } else {
      currentValue = state.scope[arrID][field.name]
        ? props[field.lookup_list].find((option) => option.code === state.scope[arrID][field.name])
        : { code: '', name: '' };
    }
    // currentValue = state.scope[arrID][field.name]||''
  } else {
    // field.name === 'date_search'?console.log('listField: field, altlookups: ', field, altLookups):null;

    // code has ability to pass a different "alternate" lookup list. Ex
    // when selecting scope for a project, select from default list.
    // For a revision, only want to select from the scope records assigned to project
    if (altLookups) {
      altList = altLookups.find((lkp) => {
        return lkp.name === field.name;
      });
      // field.name === 'address1'?console.log('listField address1: altlist:', altList):null;
    }
    if (altList) {
      // field.name === 'cable_company'?console.log('listField state, altList: ', state, altList):null;
      if (altList.name_id) {
        currentValue = state[altList.name_id] ? altList.lookup_list.find((option) => option.code == state[altList.name_id]) : null;
      } else {
        currentValue = state[field.name] ? altList.lookup_list.find((option) => option.code === state[field.name]) : null;
      }
    } else {
      if (field.name_id) {
        currentValue = state[field.name_id] ? props[field.lookup_list].find((option) => option.code == state[field.name_id]) : null;
      } else {
        // field.name === 'date_search'?console.log('listField lookup list: ', props[field.lookup_list]):null;
        // console.log('listField lookup list: ', field, props[field.lookup_list]);
        currentValue = state[field.name] ? props[field.lookup_list].find((option) => option.code === state[field.name]) : null;
      }
    }
  }
  // field.name === 'inspection_type'?console.log('listField currentValue: ', currentValue):null;
  // field.name === 'cable_company'?console.log('listField currentValue: ', currentValue):null;

  let lookup = altList ? [...altList.lookup_list] : [...props[field.lookup_list]];
  // field.name === 'cable_company'?console.log('WOAH NELLY',field,lookup,props.lookup_key,state):null;
  // field.name === 'inspector'?console.info('WOAH NELLY',lookup):null;

  if (props.lookup_key) {
    // field.name === 'cable_company'?console.log('1',state[props.lookup_key]):null;
    lookup = [
      ...lookup.filter((l) => {
        if (l.key) {
          // field.name === 'cable_company'?console.log('2',l.key):null;
          if (l.key.includes(state[props.lookup_key])) {
            // field.name === 'cable_company'?console.log('3'):null;
            return l;
          }
        } else if (l.key === null) {
          // field.name === 'inspection_type'?console.log('4',l.key):null;
          return l;
        }
      }),
    ];
  }
  // field.name === 'cable_company'?console.log('listField lookup: ', lookup):null;

  // field.name === 'address1'?console.log('address1 2',currentValue,state):null;
  // field.name === 'address1'?console.log('address1 3',altLookups, field):null;

  // field.name === 'inspection_type'?console.log('inspection_type', lookup):null;
  // field.name === 'trello_board'?console.info('trello_board', altLookups, field):null;

  const theTextfield = (
    <FormControl fullWidth={true} variant='outlined' style={props.position}>
      <InputLabel shrink={true} style={{ color: theme.palette.primary.dark, backgroundColor: '#fafafa', padding: '0px 4px' }}>
        {field.label}
      </InputLabel>
      <Select
        styles={props.altBkg ? createSelectPropsAltBkg(theme) : createSelectProps(theme)}
        // styles={createSelectProps(theme)}
        isClearable
        // options={altList?altList.lookup_list:props[field.lookup_list]}
        options={lookup}
        getOptionLabel={({ name, label }) => (label ? label : name)}
        getOptionValue={({ code }) => code}
        // value={currentValue.code === ''?{code:'',name:'Find Address/Inspector'}:currentValue}
        value={currentValue}
        placeholder={props.placeholder || null}
        onChange={(selected) => {
          // console.log('onChange',field,selected, props.handleChangeCustomized);
          props.handleListChange
            ? props.handleListChange(selected, field, arrID)
            : props.handleChangeCustomized
            ? props.handleChangeCustomized(field, selected)
            : handleListChange(selected, field, arrID, state, updateState, altList); // use local
        }}
        onKeyDown={(e) => {
          // console.log('onKeyDown', e.target.value+e.key, props.asYouType, e.target.value.length, altList.lookup_list.length, e.keyCode);
          if (e.keyCode === 9 || e.keyCode === 13) {
            // console.log('Enter,tab');
            props.handleTabEnter ? props.handleTabEnter(field.name, currentValue) : handleTabEnter(field.name, currentValue, e.keyCode, props);
            // e.target.value hasn't been updated with the new character: e.key.  So add 1 to string length
          } else if (props.asYouType && e.target.value.length + 1 === props.asYouType) {
            // console.log('keydown populate filter');
            props.findAction(e.target.value + e.key);
            // trap for backspaces
          } else if (
            props.asYouType &&
            (e.keyCode === 8 || e.keyCode === 46) &&
            e.target.value.length === props.asYouType &&
            altList.lookup_list.length > 0
          ) {
            // console.log('keydown, clear filter');
            props.findAction(null);
          }
        }}
      />
    </FormControl>
  );

  return props.noGridWrap ? (
    theTextfield
  ) : (
    <Grid item xs={12} md={field.display_width} style={{ zIndex: field.z_index }}>
      {theTextfield}
    </Grid>
  );
};

const creatableListField = (props) => {
  const { theme, field, state, arrID, updateState } = props; // passed thru call
  // const { theme, field, state, arrID, updateState, searchMode, dupCheck } = props;// passed thru call
  // const { searchForDups } = props;  // passed thru container

  let currentValue = {};
  if (field.name_id) {
    // field.name === 'city'?console.log('city', state[field.name_id], state[field.name]):null;
    currentValue =
      state[field.name_id] !== null && state[field.name_id] >= 0
        ? props[field.lookup_list].find((option) => {
            // field.name === 'city'?console.log('option',option):null;
            return option.id === state[field.name_id];
          })
        : { code: '', label: '', name: '' };
  } else {
    currentValue = state[field.name]
      ? props[field.lookup_list].find((option) => option.name === state[field.name])
      : { code: '', label: '', name: '' };
  }

  // field.name === 'city'?console.log('currentValue: city', currentValue):null;

  // field.name === 'city'?console.log('project: ', field.name, state[field.name]):null;
  // field.name === 'city_name'?console.log('project: ', field.name, state[field.name]):null;
  // field.name === 'city_id'?console.log('project: ', field.name, state[field.name]):null;

  // field.name === 'client'?console.log('creatableListField', field, state[field.name], state[field.name_id], props[field.lookup_list], currentValue):null;

  if (currentValue && currentValue.id >= 0) Object.assign(currentValue, { label: `(${currentValue.id}) ${currentValue.name}` });
  // field.name === 'city'?console.log('currentValue: city', currentValue):null;
  // field.name === 'client'?console.log('currentValue: client', currentValue):null;
  // field.name === 'subdivision'?console.log('subdivision info: curVal, list', currentValue, props[field.lookup_list]):null;

  return (
    <Grid item xs={12} md={field.display_width} style={{ zIndex: field.z_index }}>
      <FormControl fullWidth={true} variant='outlined'>
        <InputLabel shrink={true} style={{ color: theme.palette.primary.dark, backgroundColor: '#fafafa', padding: '0px 4px' }}>
          {field.required === 'Y' ? field.label + ' *' : field.label}
        </InputLabel>
        <CreatableSelect
          styles={createSelectProps(theme)} //styles={createSelectAutoFillProps}                  isClearable
          isSearchable
          isClearable
          onChange={(selected) => {
            props.handleListChange
              ? props.handleListChange(selected, field, arrID) // use props
              : handleListChange(selected, field, arrID, updateState); // use local
          }}
          value={currentValue}
          options={
            props[field.lookup_list]
              ? props[field.lookup_list].map((choice) => {
                  return {
                    ...choice,
                    code: choice.id,
                    label: `(${choice.id}) ${choice.name}`,
                    // name: choice.name
                  };
                })
              : [{ code: '', label: 'NA', name: 'NA' }]
          }
          onCreateOption={(selected) => {
            props.createDialogValue ? props.createDialogValue(selected, field) : false;
          }}
          onFocus={(e) => {
            props.handleFocus
              ? props.handleFocus(field.name) // use props
              : handleFocus(field.name, state, updateState); // use local
          }}
          onBlur={(e) => {
            props.handleBlur
              ? props.handleBlur(field.name) // use props
              : handleBlur(field.name, props); // use local
          }}
        />
      </FormControl>
    </Grid>
  );
};

const textField2 = (props) => {
  // const { classes, theme, field, state, arrID, updateState, searchMode, dupCheck } = props;  // passed thru call.
  // const { loadFind, searchForDups, loadMessage } = props;  // passed thru container
  const { classes, theme, field, state, arrID, updateState, searchMode } = props; // passed thru call.
  const { loadMessage, endAdornment } = props; // passed thru container
  // console.log('textField2', state);
  let currentValue = '';
  if (arrID || arrID === 0) {
    // console.log('scope: ', field.name, arrID, state.scope[arrID]);
    if (state.scope[arrID]) currentValue = state.scope[arrID][field.name] || '';
    // currentValue = state.scope[arrID][field.name]||''
  } else {
    // console.log('I AM HERE: ', field.name, state);
    currentValue = state[field.name] || '';
  }

  let fieldDisabled = field.name === 'job_number' && state.jobNumUnlock ? 'N' : field.name === 'id' && state.idUnlock ? 'N' : field.disabled;
  // field.name === 'id'?console.log('currentValue: id', field, fieldDisabled):null;

  // field.name === 'job_number'?console.log('currentValue: job', field):null;
  // field.name === 'job_number'?console.log('value for disabled', fieldDisabled):null;
  // field.name === 'inspector'?console.log('field',field):null;
  const theTextfield = (
    <TextField
      style={props.position}
      // inputRef={field.name === 'address1'? this.addrRef:null}
      required={field.required === 'Y' ? true : false}
      disabled={fieldDisabled === 'Y' ? true : false}
      // placeholder={'Write a comment...'}
      // disabled={disabled}
      // select={field.list.length !== 0? true: false}
      // id={field.name}
      value={currentValue}
      fullWidth={true}
      variant='outlined'
      label={field.hide_label === 'Y' ? '' : field.label}
      // onChange={
      //   (event) => {
      //     console.log('onChange fired', field.name, event.target.value, state);
      //     handleChange1(field.name, arrID, state, updateState, event);
      //   }
      // }
      onChange={props.handleChangeCustomized ? (e) => props.handleChangeCustomized(field, e) : handleChange(field.name, arrID, state, updateState)}
      multiline={field.data_type === 'multilongtext' ? true : false}
      rows={field.data_type === 'multilongtext' ? 2 : 1}
      type={field.data_type === 'multilongtext' || field.data_type === 'longtext' ? 'text' : field.data_type}
      onKeyDown={(e) => {
        if (e.keyCode === 9 || e.keyCode === 13) {
          handleTabEnter(field.name, currentValue, e.keyCode, props);
        }
      }}
      onFocus={(e) => {
        handleFocus(field.name, state, updateState);
      }}
      onBlur={(e) => {
        handleBlur(field.name, props);
      }}
      // inputProps={{ style: {padding:0} }}
      InputProps={{
        classes: {
          input: `${props.addStyle} ${classes.inputProps}`,
          root: `${classes.rootProps}`,
          disabled: classes.disabled,
          focused: classes.focused,
          error: classes.error,
          notchedOutline: classes.notchedOutline,
          multiline: classes.multiline,
          adornedEnd: classes.adornment3,
        },
        readOnly: field.readonly === 'Y' ? true : false,
        endAdornment:
          field.name === 'find' ? (
            <InputAdornment
              position='end'
              classes={{
                root: classes.adornment,
              }}>
              <IconButton
                size='small'
                aria-label='Clear'
                // onClick={search}
                classes={{
                  root: classes.adornment2,
                }}
                onClick={handleChange(field.name, arrID, state, updateState, true)}>
                <ClearIcon />
              </IconButton>
              <IconButton
                size='small'
                aria-label='Search'
                // onClick={search}
                classes={{
                  root: classes.adornment2,
                }}
                onClick={(e) => handleTabEnter(field.name, currentValue, e.keyCode, props)}>
                <SearchIcon />
              </IconButton>
              <IconButton
                size='small'
                aria-label='guide'
                // onClick={search}
                classes={{
                  root: classes.adornment2,
                }}
                onClick={() => findDescription(state.object, loadMessage)}>
                <HelpIcon />
              </IconButton>
            </InputAdornment>
          ) : field.name === 'job_number' && !searchMode ? (
            <IconButton
              size='small'
              aria-label='job-unlock'
              color='secondary'
              title='Unlock job number for editing'
              style={{ padding: 2 }}
              onClick={() => toggleJob(updateState, state)}>
              {state.jobNumUnlock ? <LockOpen fontSize='small' /> : <Lock fontSize='small' />}
            </IconButton>
          ) : field.name === 'id' ? (
            <IconButton
              size='small'
              aria-label='id-unlock'
              color='secondary'
              title='Unlock id for editing'
              style={{ padding: 2 }}
              onClick={() => toggleID(updateState, state)}>
              {state.idUnlock ? <LockOpen fontSize='small' /> : <Lock fontSize='small' />}
            </IconButton>
          ) : endAdornment ? (
            <Fragment>{endAdornment()}</Fragment>
          ) : null,
      }}
      InputLabelProps={{
        shrink: true,
        style: { color: theme.palette.primary.dark, backgroundColor: '#fafafa' },
      }}
    />
  );

  return props.noGridWrap ? (
    theTextfield
  ) : (
    <Grid item xs={12} md={field.display_width}>
      {theTextfield}
    </Grid>
  );
};

const colField = (props) => {
  // const { classes, theme, field, state, childArrID, updateState, searchMode, dupCheck } = props;  // passed thru call.
  // const { loadFind, searchForDups, loadMessage } = props;  // passed thru container
  const { classes, field, state, childArrID, updateState, searchMode } = props; // passed thru call.
  // console.log('columnField', field.name, childArrID);
  let currentValue = '';
  if (childArrID || childArrID === 0) {
    // console.log('scope: ', field.name, arrID, state.scope[arrID]);
    if (state.scope[childArrID]) currentValue = state.scope[childArrID][field.name] || '';
    // currentValue = state.scope[arrID][field.name]||''
  } else {
    // console.log('project: ', field.name, arrID);
    currentValue = state[field.name] || '';
  }

  let fieldDisabled = field.name === 'job_number' && state.jobNumUnlock ? 'N' : field.name === 'id' && state.idUnlock ? 'N' : field.disabled;

  // field.name === 'revision_price' ? console.log('currentValue: rev price', field, state) : null;
  // field.name === 'id'?console.log('value for disabled', fieldDisabled):null;

  return (
    <TextField
      // id={field.name}
      required={field.required === 'Y' ? true : false}
      disabled={fieldDisabled === 'Y' ? true : false}
      value={currentValue}
      fullWidth={true}
      variant='filled'
      // label={field.label}
      onChange={handleChange(field.name, childArrID, state, updateState)}
      multiline={field.data_type === 'multilongtext' ? true : false}
      rows={field.data_type === 'multilongtext' ? 2 : 1}
      type={field.data_type === 'multilongtext' || field.data_type === 'longtext' ? 'text' : field.data_type}
      onKeyDown={(e) => {
        if (e.keyCode === 9 || e.keyCode === 13) {
          // handleTabEnter(field.name, currentValue, loadFind, loadMessage, state, updateState );
          handleTabEnter(field.name, currentValue, e.keyCode, props);
        }
      }}
      onFocus={(e) => {
        handleFocus(field.name, state, updateState);
      }}
      onBlur={(e) => {
        handleBlur(field.name, props);
      }}
      // inputProps={{ style: {padding:0} }}
      InputProps={{
        classes: {
          input: `${props.addStyle} ${classes.inputProps} ${classes.colInputProps}`,
          root: classes.colInputProps,
          // disabled: classes.disabled,
          // focused: classes.focused,
          // error: classes.error,
          // notchedOutline: classes.notchedOutline,
          multiline: classes.multiline,
          adornedEnd: classes.adornment3,
        },
        readOnly: field.readonly === 'Y' ? true : false,
        disableUnderline: true,
        endAdornment:
          field.name === 'job_number' && !searchMode ? (
            <IconButton aria-label='job-unlock' color='secondary' title='Unlock job number for editing' onClick={() => toggleJob(updateState, state)}>
              {state.jobNumUnlock ? <LockOpen /> : <Lock />}
            </IconButton>
          ) : field.name === 'id' ? (
            <IconButton
              className={classes.lock}
              aria-label='unlock'
              color='secondary'
              title='Unlock id for editing'
              onClick={() => toggleID(updateState, state)}>
              {state.idUnlock ? <LockOpen /> : <Lock />}
            </IconButton>
          ) : null,
      }}
      // InputLabelProps={{
      //   shrink: true,
      //   style: { color: theme.palette.primary.dark, backgroundColor: '#fafafa' },
      // }}
    />
  );
};

const colListField = (props) => {
  // const { theme, field, state, childArrID, updateState, searchMode, dupCheck } = props;  // passed thru call
  const { theme, field, state, childArrID, updateState, altLookups } = props; // passed thru call
  // const { loadFind, searchForDups, loadMessage } = props;  // passed thru container

  // field.name === 'entered_by'? console.log('listField', field, props[field.lookup_list]): null;
  // field.name === 'requestor'? console.log('listField', field, props[field.lookup_list]): null;
  let currentValue;

  // if (field.name_id) {
  //   currentValue = state[field.name_id]?
  //     props[field.lookup_list].find(option => option.code == state[field.name_id]) :
  //     {code: '', name: ''};
  // } else {
  //   currentValue = state[field.name]?
  //     props[field.lookup_list].find(option => option.code === state[field.name]) :
  //     {code: '', name: ''};
  // }

  let altList = null;
  if (childArrID || childArrID === 0) {
    // console.log('scope: ', field.name, arrID, state.scope[arrID]);
    if (state.scope[childArrID]) currentValue = state.scope[childArrID][field.name] || '';

    if (field.name_id) {
      currentValue = state.scope[childArrID][field.name_id]
        ? props[field.lookup_list].find((option) => option.code == state.scope[childArrID][field.name_id])
        : { code: '', name: '' };
    } else {
      currentValue = state.scope[childArrID][field.name]
        ? props[field.lookup_list].find((option) => option.code === state.scope[childArrID][field.name])
        : { code: '', name: '' };
    }
    // currentValue = state.scope[arrID][field.name]||''
  } else {
    // console.log('project: ', field.name, arrID);
    if (altLookups) {
      altList = altLookups.find((lkp) => {
        return lkp.name === field.name;
      });
      // altList?console.log('altList, state', altList, state):null;
    }
    if (altList) {
      if (altList.name_id) {
        // console.log('before setting currentValue', altList, state);
        currentValue = state[altList.name_id]
          ? altList.lookup_list.find((option) => {
              // console.log('option and state value', option, state[altList.name_id]);
              return option.code == state[altList.name_id];
            })
          : { code: '', name: '' };
        // console.log('after setting currentValue', currentValue);
      } else {
        currentValue = state[field.name] ? altList.lookup_list.find((option) => option.code === state[field.name]) : { code: '', name: '' };
      }
    } else {
      if (field.name_id) {
        currentValue = state[field.name_id] ? props[field.lookup_list].find((option) => option.code == state[field.name_id]) : { code: '', name: '' };
      } else {
        currentValue = state[field.name] ? props[field.lookup_list].find((option) => option.code === state[field.name]) : { code: '', name: '' };
      }
    }
    // altList?console.log('current value', currentValue):null;
  }

  // field.name === 'geo_boring_only'?console.log('currentValue', currentValue):null;

  return (
    <FormControl fullWidth={true} variant='outlined' style={{ zIndex: field.z_index }}>
      <Select
        styles={colSelectProps(theme)}
        isClearable
        isDisabled={field.disabled === 'Y' ? true : field.readonly === 'Y' ? true : false}
        options={altList ? altList.lookup_list : props[field.lookup_list]}
        getOptionLabel={({ name }) => name}
        getOptionValue={({ code }) => code}
        value={currentValue}
        onChange={(selected) => {
          props.handleListChange
            ? props.handleListChange(selected, field, childArrID)
            : handleListChange(selected, field, childArrID, state, updateState, altList); // use local
        }}
        onKeyDown={(e) => {
          if (e.keyCode === 9 || e.keyCode === 13) {
            props.handleTabEnter ? props.handleTabEnter(field.name, currentValue) : handleTabEnter(field.name, currentValue, e.keyCode, props);
          }
        }}
        onFocus={(e) => {
          handleFocus(field.name, state, updateState);
        }}
        onBlur={(e) => {
          handleBlur(field.name, props);
        }}
      />
    </FormControl>
  );
};

// Textfield that is exposed to the outside.  Directs to textfield, Listfield, createableListField.
export const Field = withStyles(styles, { withTheme: true })((props) => {
  const { field } = props;
  // console.log('field', field);
  if (field.lookup_list && field.creatable === 'Y') {
    return creatableListField(props);
  } else if (field.lookup_list) {
    return listField(props);
  } else {
    return textField(props);
  }
});

export const Field2 = withStyles(styles, { withTheme: true })((props) => {
  const { field, altLookups } = props;
  // console.log('field', field.name, field.lookup_list, altLookups);
  // console.log('field', field);
  if ((field.lookup_list || altLookups) && field.creatable === 'Y' && !props.searchMode) {
    // console.log('calling creatable list field', field);
    return creatableListField(props);
  } else if (field.lookup_list || altLookups) {
    // console.log('calling list field', field);
    return listField(props);
  } else {
    // console.log('calling textfield2', field);
    return textField2(props);
  }
});

export const ColumnField = withStyles(styles, { withTheme: true })((props) => {
  const { field } = props;
  // console.log('field', field);
  if (field.lookup_list) {
    return colListField(props);
  } else {
    // console.log('field');
    return colField(props);
  }
});
