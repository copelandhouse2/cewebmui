import React from 'react';
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

const styles = theme => ({
  inputProps: {
    padding: '6px 0px 6px 6px',
    // margin: 0,
    fontSize: 12,      // default fontSize=16
    // backgroundColor: '#e8e8e8',
    borderRadius: '6px 0px 0px 6px',
    '&:hover': {backgroundColor: '#dedede', borderWidth: 2},
    // '&:focus': {backgroundColor: '#dedede', borderColor: theme.palette.secondary.main, borderWidth: 2},
    minHeight: 0,
    // '& .MuiOutlinedInput-multiline': {padding: 0},
    // '& .MuiInputBase-multiline': {padding: 0},
  },
  rootProps: {
    "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {  // hovered
      borderColor: theme.palette.secondary.light,
      borderWidth: 2,
    },
    "&$focused $notchedOutline": {  // focused
      borderColor: theme.palette.secondary.main,
      borderWidth: 2,
    }
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
    paddingRight: 0
  },
  disabled: {},
  focused: {},
  error: {},
  notchedOutline: {},
  multiline: {
    padding: 0
  },

});

const createSelectProps = theme => ({
  option: (provided, state) => ({ ...provided, fontSize: 12, color: 'black', backgroundColor: state.isFocused?theme.palette.secondary.light:'#fafafa' }),
  input: (provided) => ({ ...provided, color: 'black'}),
  singleValue: (provided) => ({ ...provided, color: 'black'}),  //default fontSize=14
  control: (provided, state) => ({ ...provided,  minHeight: 0, height:32, fontSize: 12, backgroundColor: 'inherit'
  , borderWidth: state.isFocused?2:1, borderColor: state.isFocused?theme.palette.secondary.main:'lightgray'
  , boxShadow: '0px 0px 0px 0px #fafafa'
  , ':hover': {backgroundColor: '#dedede', borderWidth: 2, borderColor: state.isFocused?theme.palette.secondary.main:theme.palette.secondary.light}
  }),

});

const textField = (props) => {

  const { classes, theme, field, state, arrID } = props;
  // console.log('textField', field, arrID);
  let currentValue = '';
  if (arrID||arrID===0) {
    // console.log('scope: ', field.name, arrID, state.scope[arrID]);
    if (state.scope[arrID])
      currentValue = state.scope[arrID][field.name]||'';
    // currentValue = state.scope[arrID][field.name]||''
  } else {
    // console.log('project: ', field.name, arrID);
    currentValue = state[field.name]||'';
  }

  let fieldDisabled = field.name === 'job_number' && state.jobNumUnlock? 'N':field.disabled;
  // field.name === 'job_number'?console.log('currentValue: job', field):null;
  // field.name === 'job_number'?console.log('value for disabled', fieldDisabled):null;
  return (
    <Grid item xs={12} md={field.display_width} >
      <TextField
        // inputRef={field.name === 'address1'? this.addrRef:null}
        required={field.required === 'Y'? true:false}
        disabled={fieldDisabled === 'Y'? true:false}
        // disabled={disabled}
        // select={field.list.length !== 0? true: false}
        // id={field.name}
        value={ currentValue }
        fullWidth = {field.name==='job_number'?true:true}
        variant='outlined'
        label={field.label}
        onChange={props.handleChange(field.name, arrID)}
        multiline={field.data_type === 'multilongtext'? true:false}
        rows={field.data_type === 'multilongtext'? 2:1}
        type={field.data_type === 'multilongtext' || field.data_type === 'longtext'? 'text':field.data_type}
        onKeyDown={
          (e) => {
            if (e.keyCode === 9 || e.keyCode === 13) {
              props.handleTabEnter(field.name, currentValue);
            }
          }
        }
        onFocus={
          (e) => {props.handleFocus(field.name);}
        }
        onBlur={
          (e) => {props.handleBlur(field.name);}
        }
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
          readOnly: fieldDisabled === 'Y'? true:false,
          endAdornment:field.name === 'find'?
            <InputAdornment
              position="end"
              classes={{
                root: classes.adornment
              }}
            >
              <IconButton
                aria-label='Search'
                // onClick={search}
                classes={{
                  root: classes.adornment2
                }}
                onClick={() => props.findProjects(currentValue)}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
            :
            field.name === 'job_number'?
            <IconButton
              aria-label='job-unlock'
              color='secondary'
              title='Unlock job number for editing'
              onClick={props.toggleJob}>
              {state.jobNumUnlock? <LockOpen /> : <Lock />}
            </IconButton>
            :null
        }}
        InputLabelProps={{
          shrink: true,
          style: { color: theme.palette.primary.dark, backgroundColor: '#fafafa' },
        }}
      />
    </Grid>
  )
}

const listField = (props) => {

  const { theme, field, state, arrID } = props;

  // field.name === 'billing_state_prov'||field.name === 'billing_country'? console.log('listField', field, props[field.lookup_list]): null;
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

  if (arrID||arrID===0) {
    // console.log('scope: ', field.name, arrID, state.scope[arrID]);
    if (state.scope[arrID])
      currentValue = state.scope[arrID][field.name]||'';

    if (field.name_id) {
      currentValue = state.scope[arrID][field.name_id]?
        props[field.lookup_list].find(option => option.code == state.scope[arrID][field.name_id]) :
        {code: '', name: ''};
    } else {
      currentValue = state.scope[arrID][field.name]?
        props[field.lookup_list].find(option => option.code === state.scope[arrID][field.name]) :
        {code: '', name: ''};
    }
    // currentValue = state.scope[arrID][field.name]||''
  } else {
    // console.log('project: ', field.name, arrID);
      if (field.name_id) {
        currentValue = state[field.name_id]?
          props[field.lookup_list].find(option => option.code == state[field.name_id]) :
          {code: '', name: ''};
      } else {
        currentValue = state[field.name]?
          props[field.lookup_list].find(option => option.code === state[field.name]) :
          {code: '', name: ''};
      }
  }

  // field.name === 'geo_boring_only'?console.log('currentValue', currentValue):null;

  return (
    <Grid item xs={12} md={field.display_width} style={ {zIndex: field.z_index } }>
      <FormControl fullWidth={true} variant='outlined' >
        <InputLabel shrink={true} style={ {color: theme.palette.primary.dark, backgroundColor: '#fafafa', padding: '0px 4px'} }>
          {field.label}
        </InputLabel>
        <Select styles={createSelectProps(theme)}
          isClearable
          options={props[field.lookup_list]}
          getOptionLabel={({name}) => name}
          getOptionValue={({code}) => code}
          value={currentValue}
          onChange={
            (selected) => {
              props.handleListChange(selected, field, arrID);
            }
          }
          onKeyDown={
            (e) => {
              if (e.keyCode === 9 || e.keyCode === 13) {
                props.handleTabEnter(field.name, currentValue);
              }
            }
          }
        />
      </FormControl>
    </Grid>
  )
}

const creatableListField = (props) => {

  const { theme, field, state, arrID } = props;

  // field.name === 'city'?console.log('creatableListField', field, state[field.name], state[field.name_id], props[field.lookup_list]):null;

  let currentValue = {};
  if (field.name_id) {
    currentValue = state[field.name_id]?
      props[field.lookup_list].find(option => option.id == state[field.name_id]) :
      {code: '', label: '', name: ''};
  } else {
    currentValue = state[field.name]?
      props[field.lookup_list].find(option => option.name === state[field.name]) :
      {code: '', label: '', name: ''};
  }

  currentValue.id?Object.assign(currentValue, {label: `(${currentValue.id}) ${currentValue.name}`}):null;
  // field.name === 'city'?console.log('currentValue: city', currentValue):null;
  // field.name === 'client'?console.log('currentValue: client', currentValue):null;

  return (
    <Grid item xs={12} md={field.display_width} style={ {zIndex: field.z_index } }>
      <FormControl fullWidth={true} variant='outlined' >
        <InputLabel shrink={true} style={ {color: theme.palette.primary.dark, backgroundColor: '#fafafa', padding: '0px 4px'} }>
          {field.required === 'Y'? field.label+' *':field.label }
        </InputLabel>
        <CreatableSelect styles={createSelectProps(theme)} //styles={createSelectAutoFillProps}                  isClearable
          isSearchable
          isClearable
          onChange={
            (selected) => {
              props.handleListChange(selected, field, arrID);
            }
          }
          value={currentValue}
          options={
            props[field.lookup_list]?
            props[field.lookup_list].map(choice => {
              return {
                code: choice.id,
                label: `(${choice.id}) ${choice.name}`,
                name: choice.name
              }
            }) : [{code: '', label: 'NA', name: 'NA'}]
          }
          onCreateOption={(selected) => props.createDialogValue(selected, field)}
          onFocus={
            (e) => {props.handleFocus(field.name);}
          }
          onBlur={
            (e) => {props.handleBlur(field.name);}
          }
        />
      </FormControl>

    </Grid>
  )
}

const handleChange = (name, scopeID, state, updateState) => event => {
  // name === 'jobNumUnlock'?console.log('event target', event.target):null;
  // console.log('handleChange1', name, event.target.value);
  if (scopeID||scopeID===0) {
    let updatedScope = [...state.scope];

    updatedScope[scopeID][name] =
    event.target.type === 'checkbox'? event.target.checked :
    event.target.type === 'number' && event.target.value === ''? null :
    event.target.type === 'date' && event.target.value === ''? null :
    name === 'geo_pi'? event.target.value.toUpperCase() :
    event.target.value;
    // name === 'block'?
    //   this.setState({ [name]: event.target.value, }, () => {
    //     if (this.state.subdivision && this.state.lot && this.state.block) {
    //       this.searchForExisting('LOT')
    //     }}
    //   ) :
    updateState({ scope: updatedScope, });
  } else {
    event.target.type === 'checkbox'? updateState({ [name]: event.target.checked, }) :
    event.target.type === 'number' && event.target.value === ''? updateState({ [name]: null, }) :
    event.target.type === 'date' && event.target.value === ''? updateState({ [name]: null, }) :
    name === 'geo_pi'? updateState({ [name]: event.target.value.toUpperCase(), }) :
    // name === 'block'?
    //   this.setState({ [name]: event.target.value, }, () => {
    //     if (this.state.subdivision && this.state.lot && this.state.block) {
    //       this.searchForExisting('LOT')
    //     }}
    //   ) :
    updateState({ [name]: event.target.value, });
  }

};

const handleListChange = (selected, field, updateState) => {
  console.log('in handleListChange:', field.name, selected);

  switch (field.name) {
    // case 'subdivision':
    //   this.setState({ [field.name]: selected.code }, () => {
    //     if (this.state.subdivision && this.state.lot && this.state.block) {
    //       this.searchForExisting('LOT')
    //     }}
    //   );  // fill in value.
    //   break;
    default:
      selected?  // if selected
        field.name_id?  // then if field has an id
          updateState({ [field.name_id]: selected.code, [field.name]: selected.name }) :  // fill in id and value.
          updateState({ [field.name]: selected.code }) :  // fill in value.
        field.name_id?  // else (selected is null)... now if field has an id...
          updateState({ [field.name_id]: null, [field.name]: null }) :  // clear out
          updateState({ [field.name]: null });  // clear out
  }
}

const handleTabEnter = (name, currentValue, loadFind, loadMessage) => {
  switch (name) {
    case 'find':
      if (currentValue === '') {
        loadMessage(
          { ok:false,
            status: `Empty Value`,
            statusText: 'Please include filter value for search'
          }, 'ERROR');
      } else {
        findProjects(currentValue, loadFind);
      }
      break;
    case 'geo_lab':
    case 'geo_pi':
      getGeoValues();
      break;
    default:
  }
}

const findProjects = (search, loadFind) => {
  // console.log('find projects', search);
  loadFind(search);
  // this.props.toggleDrawer('find');
}

const findFieldHelp = () => {
  return (
    <div>
    <Typography variant='h6' gutterBottom={true}>
    Functionality
    </Typography>
    <Typography variant='body1' gutterBottom={true}>
    Find field is an intelligent search field.  The user can enter
    multiple filter criteria separated with 'and' keyword.  You can
    search with keywords or without.  You can also combine the two.
    </Typography>
    <Typography variant='subtitle2' gutterBottom={true}>
    ldate:90 and 20000143<br />
    Sweetwater and block:A
    </Typography>
    <Typography variant='body1' gutterBottom={true}>
    If no keywords are provided the search element will filter across
    all the following fields...
    </Typography>
    <Typography variant='subtitle2' gutterBottom={true}>
    Job Number, Address, Story, Subdivision, City, Client
    , Requested By, Entered By, Rev Desc, Lab, Lab Report, PI
    , Soil Notes
    </Typography>
    <Typography variant='h6' gutterBottom={true}>
    Keywords Support
    </Typography>
    <Typography variant='body1' gutterBottom={true}>
    Keywords provide better filter granularity because it targets
    a particular field.  To construct a keyword search element,
    first type the keyword followed by a colon, then the value without
    any spaces after the colon.
    </Typography>
    <Typography variant='subtitle2' gutterBottom={true}>
    cli:Lennar and sub:Sweet and phase:2<br />
    NOTE: In the case of a date search, you must use the keywords.  See below.
    </Typography>
    <Typography variant='body1' gutterBottom={true}>
    The following keywords are supported
    </Typography>
    <Typography variant='subtitle2' noWrap={true}>
    job: or job_number:<br />
    story:<br />
    rev: or revision:<br />
    rdesc: or revision_desc:<br />
    addr: or address:<br />
    city:<br />
    sub: or subdivision:<br />
    phase:<br />
    sec: or section:<br />
    lot:<br />
    block:<br />
    cli: or client:<br />
    grep: or geo_report_num:<br />
    pi: or geo_pi:<br />
    snote: or soil_notes:<br />
    cdate: or creation_date:  - number.  value last x days.<br />
    ldate: or last_updated_date:  - number.  values last x days.<br />
    ent: or entered:  - Entered by<br />
    req: or requested:  - Requested by<br />
    </Typography>
    </div>
  )
}

const findDescription = (loadMessage) => {

  loadMessage(
    { ok:false,
      status: `Find Field Instructions`,
      statusText: findFieldHelp()
    }, 'INFO');
}

const getGeoValues = (state, updateState) => {
  // using this key trap as an indication that the field has been filled in.
  // using this key trap as an indication that the field has been filled in.

  // console.log('tabKeyChange ** No Action **:', field.name);

  if (state.geo_lab === 'MLALABS' && state.geo_pi) {
    const geo_id = this.props.geos.find(geo => geo.code === this.state.geo_lab).id;
    const oneGeoMaster = this.props.geoMasterData.filter(rec => rec.geotech_id === geo_id);
    const emYmValues = oneGeoMaster.find(rec => rec.pi === this.state.geo_pi);
    if (emYmValues) {
      updateState( { em_center: emYmValues.emc
        , em_edge:   emYmValues.eme
        , ym_center: emYmValues.ymc
        , ym_edge:   emYmValues.yme
      } );
    }
  }
};

const toggleJob = (updateState) => {
  updateState({ jobNumUnlock: !this.state.jobNumUnlock });
}

// saving value before changing it.
const handleFocus = (name, state, updateState) => {
  updateState({ saveValue: state[name]||null });
}

// testing for on change.  But this test for change once you leave field and not firing after each keystroke.
const handleBlur = (name, state, searchForDups ) => {
  // console.log('handleBlur:', name, this.state.saveValue, this.state[name]);
  switch (name) {
    case 'address1':
      if (state[name] !== state.saveValue && state.address1) {
        searchForExisting('ADDRESS', searchForDups);
      }
      break;
    case 'subdivision':
    case 'block':
    case 'lot':
      if (state[name] !== state.saveValue
          && (state.subdivision && state.lot && state.block)
      ) {
        searchForExisting('LOT', searchForDups);
      }
      break;
    default:
      break;
  };
}

const searchForExisting = (test, state, updateState, searchForDups) => {
  // console.log('searchForExisting', test);
  searchForDups(test, state);
  updateState({ openDupsDialog: true });
};

const dupSelectClose = (project, updateState) => {
  updateState(project);
}

const dupsDialogClose = (updateState) => {
  this.setState({ openDupsDialog: false });
}

const textField2 = (props) => {

  const { classes, theme, field, state, scopeID, updateState, loadFind, searchForDups, loadMessage } = props;
  // console.log('textField2', field, state);
  let currentValue = '';
  if (scopeID||scopeID===0) {
    // console.log('scope: ', field.name, arrID, state.scope[arrID]);
    if (state.scope[scopeID])
      currentValue = state.scope[scopeID][field.name]||'';
    // currentValue = state.scope[arrID][field.name]||''
  } else {
    // console.log('project: ', field.name, arrID);
    currentValue = state[field.name]||'';
  }

  let fieldDisabled = field.name === 'job_number' && state.jobNumUnlock? 'N':field.disabled;
  // field.name === 'job_number'?console.log('currentValue: job', field):null;
  // field.name === 'job_number'?console.log('value for disabled', fieldDisabled):null;
  return (
    <Grid item xs={12} md={field.display_width} >
      <TextField
        // inputRef={field.name === 'address1'? this.addrRef:null}
        required={field.required === 'Y'? true:false}
        disabled={fieldDisabled === 'Y'? true:false}
        // disabled={disabled}
        // select={field.list.length !== 0? true: false}
        // id={field.name}
        value={ currentValue }
        fullWidth = {true}
        variant='outlined'
        label={field.label}
        // onChange={
        //   (event) => {
        //     console.log('onChange fired', field.name, event.target.value, state);
        //     handleChange1(field.name, scopeID, state, updateState, event);
        //   }
        // }
        onChange={handleChange(field.name, scopeID, state, updateState)}
        multiline={field.data_type === 'multilongtext'? true:false}
        rows={field.data_type === 'multilongtext'? 2:1}
        type={field.data_type === 'multilongtext' || field.data_type === 'longtext'? 'text':field.data_type}
        onKeyDown={
          (e) => {
            if (e.keyCode === 9 || e.keyCode === 13) {
              handleTabEnter(field.name, currentValue, loadFind, loadMessage );
            }
          }
        }
        onFocus={
          (e) => {handleFocus(field.name, state, updateState);}
        }
        onBlur={
          (e) => {handleBlur(field.name, state, searchForDups);}
        }
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
          readOnly: fieldDisabled === 'Y'? true:false,
          endAdornment:field.name === 'find'?
            <InputAdornment
              position="end"
              classes={{
                root: classes.adornment
              }}
            >
              <IconButton
                aria-label='Search'
                // onClick={search}
                classes={{
                  root: classes.adornment2
                }}
                onClick={() => handleTabEnter(field.name, currentValue, loadFind, loadMessage )}
              >
                <SearchIcon />
              </IconButton>
              <IconButton
                aria-label='guide'
                // onClick={search}
                classes={{
                  root: classes.adornment2
                }}
                onClick={() => findDescription(loadMessage)}
              >
                <HelpIcon />
              </IconButton>
            </InputAdornment>
            :
            field.name === 'job_number'?
            <IconButton
              aria-label='job-unlock'
              color='secondary'
              title='Unlock job number for editing'
              onClick={() => toggleJob(updateState)}>
              {state.jobNumUnlock? <LockOpen /> : <Lock />}
            </IconButton>
            :null
        }}
        InputLabelProps={{
          shrink: true,
          style: { color: theme.palette.primary.dark, backgroundColor: '#fafafa' },
        }}
      />
    </Grid>
  )
}

const field = (props) => {

  const { field } = props;

  // console.log('field', field);

  // <Grid item key={id} xs={12} md={field.display_width} style={ {zIndex: field.order } }>
  // md={field.display_width}
  if (field.lookup_list && field.creatable === 'Y') {
    return creatableListField(props);
  } else if (field.lookup_list) {
    return listField(props);
  } else {
    // console.log('field');
    return textField(props);
  }

}

export const Field = withStyles(styles, { withTheme: true })(field);
export const Field2 = withStyles(styles, { withTheme: true })(textField2);
