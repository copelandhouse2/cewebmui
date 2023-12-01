import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import Paper from '@material-ui/core/Paper';

import Fab from '@material-ui/core/Fab';

import Tooltip from '@material-ui/core/Tooltip';

import { Field2Container } from '../containers/ceFieldContainer';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ClearIcon from '@material-ui/icons/Clear';
import { AddIcon } from '../img/addIcon.js';

import IconButton from '@material-ui/core/IconButton';

const styles = (theme) => ({});

const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const RevUpdateFG = withStyles(styles, { withTheme: true })(
  class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        open: false,
        emailOpen: false,
      };

      this.initState = { ...this.state };
      this.fEmailSend = {};
      this.fEmailRecipients = {};
      this.fEmailBody = {};
    }

    componentDidMount = () => {
      // console.log('revision CDM: local state', this.state, 'parent state:', this.props.parentState);
      this.fEmailSend = this.props.fieldGroup.children.find((f) => f.name === 'emailSend');
      this.fEmailRecipients = this.props.fieldGroup.children.find((f) => f.name === 'emailRecipients');
      this.fEmailBody = this.props.fieldGroup.children.find((f) => f.name === 'emailBody');
      this.resetScope();
    };

    resetScope = () => {
      let scopeList = {};
      this.props.parentState.altLookups
        .find((f) => f.name === 'scope')
        .lookup_list.forEach((s, i) => {
          scopeList[s.code] = false;
        });
      this.setState({ ...scopeList });
    };

    // handleChange = (name) => (e) => {
    //   this.setState({ [name]: e.target.checked });
    // };
    handleChange = (updatedValues, overrideCascade = false) => {
      // console.log('updatedValues', updatedValues);
      this.setState(updatedValues);
    };

    handleChangeLocal = (name) => (e) => {
      // console.log('handleChange', name, e.target.value);

      e.target.type === 'checkbox'
        ? this.setState({ [name]: e.target.checked })
        : this.setState({ [name]: e.target.value === '' ? null : e.target.value });
    };

    handleOpen = () => {
      // console.log('I am here');
      this.setState({ emailOpen: !this.state.emailOpen });
    };
    handleClear = () => {
      // console.log('In handleClear');
      // this.setState({ open: !this.state.open })
      this.props.clearState();
      this.resetScope();
    };

    handleSave = () => {
      // console.log('In handleSave', this.state);
      // this.setState({ open: !this.state.open });

      // the save function passed takes an array to allow saving multiple
      // rows at a time.
      const rows = [];
      this.props.parentState.altLookups
        .find((f) => f.name === 'scope')
        .lookup_list.forEach((s, i) => {
          if (this.state[s.code]) {
            // console.log('selected scopes', s);
            rows.push({
              ...this.props.parentState,
              scope_id: s.code,
              scope_label: s.name,
              emailSend: this.state.emailSend,
              emailRecipients: this.state.emailRecipients,
              emailBody: this.state.emailBody,
            });
          }
        });
      // rows.push(this.props.parentState);
      // console.log('the rows', rows);
      this.props.saveState(rows);
    };

    toggleCheckbox = () => {
      const { parentState, updateState } = this.props;
      updateState({ checkboxCopyDesc: !parentState.checkboxCopyDesc });
    };

    render() {
      const { fieldGroup, parentState, updateState } = this.props;
      // const { classes, theme, fieldGroup, dialogState, updateState } = this.props;
      // const { classes, theme, fieldGroup, toggleScopeDialog, removeScope, dialogState, scopeID, updateState } = props;
      // console.log('RevUpdateFG', dialogState.altLookups);
      // console.log('parentState', parentState);
      // console.log('state', this.state);

      let i = 0;
      return (
        <Grid container>
          <Grid item xs={11}>
            <List dense={true}>
              <ListItem key={i}>
                {fieldGroup.children.map((field, id) => {
                  if (field.hidden === 'Y') return null;
                  if (field.name === 'scope') return null;
                  if (field.name === 'emailSend') return null;
                  if (field.name === 'emailRecipients') return null;
                  if (field.name === 'emailBody') return null;
                  return (
                    <Field2Container
                      key={id}
                      // key={field.id}
                      field={field}
                      arrID={false}
                      state={parentState}
                      updateState={updateState}
                      // altLookups={parentState.altLookups.find((f) => f.name === field.name) ? parentState.altLookups : null}
                      // props that are not used.
                      loadFind={() => {}}
                      searchForDups={() => {}}
                      loadMessage={() => {}}
                    />
                  );
                })}

                <Tooltip title='Clear the selection' aria-label='Clear selection'>
                  <IconButton aria-label='Clear' onClick={this.handleClear} color='secondary'>
                    <ClearIcon />
                  </IconButton>
                </Tooltip>
              </ListItem>

              <ListItem>
                <FormControl component='fieldset'>
                  <FormLabel component='legend' style={{ font: 'bold 16px "Roboto"' }}>
                    Scope
                  </FormLabel>
                  <FormGroup row>
                    {parentState.altLookups
                      .find((f) => f.name === 'scope')
                      .lookup_list.map((s, i) => {
                        if (s.code === -1) {
                          // Project details
                          return (
                            <Tooltip key={i} title='Changes to address, lot, or soil information.  Do not use as an "other" or catch all revision'>
                              <FormControlLabel
                                control={<Checkbox checked={this.state[s.code] || false} onChange={this.handleChangeLocal(s.code)} />}
                                label={s.name}
                              />
                            </Tooltip>
                          );
                        }
                        return (
                          <FormControlLabel
                            key={i}
                            control={<Checkbox checked={this.state[s.code] || false} onChange={this.handleChangeLocal(s.code)} />}
                            label={s.name}
                          />
                        );
                      })}
                  </FormGroup>
                </FormControl>
              </ListItem>
              <ListItem style={{ paddingLeft: 0 }}>
                <IconButton aria-label='Expand' onClick={this.handleOpen}>
                  {this.state.emailOpen ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
                {/* <Typography style={{ font: 'bold 16px "Roboto"', color: 'darkgray', paddingRight: 20 }}>Email Settings</Typography> */}
                <FormLabel component='legend' style={{ font: 'bold 16px "Roboto"', paddingRight: 20 }}>
                  Email Settings
                </FormLabel>

                <FormControlLabel
                  control={<Checkbox checked={parentState.emailSend || false} onChange={(e) => updateState({ emailSend: e.target.checked })} />}
                  label='Send Email?'
                />
              </ListItem>
              <Collapse in={this.state.emailOpen}>
                <ListItem>
                  <Field2Container
                    key={this.fEmailRecipients.id}
                    // key={field.id}
                    field={this.fEmailRecipients}
                    arrID={false}
                    state={parentState}
                    updateState={updateState}
                    // altLookups={parentState.altLookups.find((f) => f.name === field.name) ? parentState.altLookups : null}
                    // props that are not used.
                    loadFind={() => {}}
                    searchForDups={() => {}}
                    loadMessage={() => {}}
                  />
                </ListItem>
                <ListItem>
                  <Field2Container
                    key={this.fEmailBody.id}
                    // key={field.id}
                    field={this.fEmailBody}
                    arrID={false}
                    state={parentState}
                    updateState={updateState}
                    // altLookups={parentState.altLookups.find((f) => f.name === field.name) ? parentState.altLookups : null}
                    // props that are not used.
                    rows={6}
                    loadFind={() => {}}
                    searchForDups={() => {}}
                    loadMessage={() => {}}
                  />
                </ListItem>
              </Collapse>
            </List>
            <Divider />
          </Grid>
          <Grid container item justify='center' alignItems='center' xs={1} spacing={8}>
            <Grid item>
              <Tooltip title='Add Revison' aria-label='Add Revision'>
                <Fab aria-label='Add' onClick={this.handleSave} size='large' color='secondary'>
                  <AddIcon size={54} />
                </Fab>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      );
    } // render
  } // class
); // end of the withStyles wrapper

export const RevHistoryFG = withStyles(styles, { withTheme: true })(
  class extends Component {
    constructor(props) {
      super(props);

      this.state = {};

      this.initState = { ...this.state };
    }

    handleClick = (rev) => {
      this.setState({ [rev.revision]: !this.state[rev.revision] });
    };

    render() {
      const { fieldGroup, history } = this.props;
      // const { classes, theme, fieldGroup, toggleScopeDialog, removeScope, dialogState, scopeID, updateState } = props;
      // console.log('RevHistoryFG render', this.state, history);
      // let i=500;
      // return null;
      return (
        <Grid container>
          {/*<Grid item xs={12} style={ {marginTop: 20, marginBottom: 20, borderTop: '1px solid black'} }>
          <Typography align='left' style={{fontWeight: 500}}>
            {fieldGroup.label}
          </Typography>
        </Grid>*/}
          <Grid item xs={12}>
            <List dense={true}>
              {history.map((rev, rev_id) => {
                return (
                  <Paper key={rev_id}>
                    <ListItem>
                      {fieldGroup.children.map((field, id1) => {
                        return <ListItemText key={id1} style={{ width: field.column_width }} primary={rev[field.name]} />;
                      })}
                      <IconButton aria-label='Expand' onClick={() => this.handleClick(rev)}>
                        {this.state[rev.revision] ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </ListItem>
                    <Collapse in={this.state[rev.revision]} timeout='auto'>
                      {rev.scope.map((scope, scopeID) => {
                        return (
                          <ListItem key={scopeID}>
                            <ListItemText inset style={{ width: 0 }} primary={toTitleCase(scope.scope)} />
                            {fieldGroup.children.map((field, id2) => {
                              if (field.name === 'revision_desc') {
                                return <ListItemText key={id2} style={{ width: field.column_width }} primary={scope[field.name]} />;
                              }
                              return null;
                            })}
                          </ListItem>
                        );
                      })}
                    </Collapse>
                  </Paper>
                );
              })}
            </List>
          </Grid>
        </Grid>
      );
    } // render
  } // class
); // end of the withStyles wrapper

export const RevScopeFG = withStyles(styles, { withTheme: true })(
  class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        open: false,
      };

      this.initState = { ...this.state };
    }

    componentDidMount = () => {
      // console.log('revision CDM: local state', this.state, 'parent state:', this.props.parentState);
    };

    handleChange = (updatedValues, overrideCascade = false) => {
      // console.log('updatedValues', updatedValues);
      this.setState(updatedValues);
    };

    handleChangeLocal = (name) => (e) => {
      // console.log('handleChange', name, e.target.value);
      e.target.type === 'checkbox'
        ? this.setState({ [name]: e.target.checked })
        : this.setState({ [name]: e.target.value === '' ? null : e.target.value });
    };

    handleClear = () => {
      // console.log('In handleClear');
      // this.setState({ open: !this.state.open })
      this.props.clearState();
    };

    handleSave = () => {
      // console.log('In handleSave', this.state);
      // this.setState({ open: !this.state.open });

      // the save function passed takes an array to allow saving multiple
      // rows at a time.

      const rows = [];
      // this.props.parentState.altLookups
      //   .find((f) => f.name === 'scope')
      //   .lookup_list.forEach((s, i) => {
      //     if (this.state[s.code]) {
      //       // console.log('selected scopes', s);
      //       rows.push({
      //         ...this.props.parentState,
      //         scope_id: s.code,
      //         scope_label: s.name,
      //         emailSend: this.state.emailSend,
      //         emailRecipients: this.state.emailRecipients,
      //         emailBody: this.state.emailBody,
      //       });
      //     }
      //   });

      // rows.push(this.props.parentState);
      // console.log('the rows', rows);
      this.props.saveState(rows);
    };

    toggleCheckbox = () => {
      const { parentState, updateState } = this.props;
      updateState({ checkboxCopyDesc: !parentState.checkboxCopyDesc });
    };

    render() {
      const { fieldGroup, parentState, updateState } = this.props;
      // const { classes, theme, fieldGroup, dialogState, updateState } = this.props;
      // const { classes, theme, fieldGroup, toggleScopeDialog, removeScope, dialogState, scopeID, updateState } = props;
      // console.log('RevUpdateFG', dialogState.altLookups);
      // console.log('parentState', parentState);
      // console.log('state', this.state);

      return (
        <List>
          <ListItem>Revision Details</ListItem>
          <ListItem>
            Include Revision?
            <Checkbox onChange={(e) => updateState({ includeRev: !parentState.includeRev })} checked={parentState.includeRev} />
          </ListItem>
          {fieldGroup.children.map((field, id) => {
            if (field.hidden === 'Y') return null;
            if (field.name === 'scope') return null;
            if (field.name === 'emailSend') return null;
            if (field.name === 'emailRecipients') return null;
            if (field.name === 'emailBody') return null;
            return (
              <ListItem key={field.id}>
                <Field2Container
                  // key={id}
                  // key={field.id}
                  field={field}
                  arrID={false}
                  state={parentState}
                  updateState={updateState}
                  noGridWrap={true}
                  // altLookups={parentState.altLookups.find((f) => f.name === field.name) ? parentState.altLookups : null}
                  // props that are not used.
                  loadFind={() => {}}
                  searchForDups={() => {}}
                  loadMessage={() => {}}
                />
              </ListItem>
            );
          })}
        </List>
      );
    } // render
  } // class
); // end of the withStyles wrapper
