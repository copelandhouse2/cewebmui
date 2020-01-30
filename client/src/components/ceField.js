import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import { useTheme } from '@material-ui/styles';


import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

import Lock from '@material-ui/icons/Lock';
import LockOpen from '@material-ui/icons/LockOpen';

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
    padding: 0,
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

  const { classes, theme, field, state, arrID, search } = props;
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
          endAdornment:field.name === 'search'?
            <InputAdornment
              position="end"
              classes={{
                root: classes.adornment
              }}
            >
              <IconButton
                aria-label='Search'
                onClick={search}
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

  const { theme, field, state } = props;

  // field.name === 'save_type'||field.name === 'geo_lab'? console.log('listField', field): null;
  let currentValue;
  if (field.name_id) {
    currentValue = state[field.name_id]?
      props[field.lookup_list].find(option => option.code == state[field.name_id]) :
      {code: '', name: ''};
  } else {
    currentValue = state[field.name]?
      props[field.lookup_list].find(option => option.code === state[field.name]) :
      {code: '', name: ''};
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
              props.handleListChange(selected, field);
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

  const { theme, field, state } = props;

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
              props.handleListChange(selected, field);
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

const field = (props) => {

  const { field } = props;

  // console.log('field', field);

  // <Grid item key={id} xs={12} md={field.display_width} style={ {zIndex: field.order } }>
  // md={field.display_width}
  if (field.lookup_list && field.creatable === 'Y') {
    field.name === 'save_type'? console.log('creatable'): null;
    return creatableListField(props);
  } else if (field.lookup_list) {
    field.name === 'save_type'? console.log('list'): null;
    return listField(props);
  } else {
    // console.log('field');
    return textField(props);
  }

}

export const Field = withStyles(styles, { withTheme: true })(field);
