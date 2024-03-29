import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withWidth } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
// import AddIcon from '@material-ui/icons/Add';
import Checkbox from '@material-ui/core/Checkbox';

import { FieldGroup } from './ceFieldGroup';
import { FieldContainer } from '../containers/ceFieldContainer';
import { ScopeSelectionContainer } from '../containers/ceScopeSelectionContainer';
import ClientDialogContainer from '../containers/ClientDialogContainer';
import SubdivisionDialogContainer from '../containers/SubdivisionDialogContainer';
import CityDialogContainer from '../containers/CityDialogContainer';
import DupsDialogContainer from '../containers/DupsDialogContainer';

import RevisionDialogContainer from '../containers/RevisionDialogContainer';

// import fullView from '../img/fullView.svg';
import listView from '../img/listView.svg';
// import columnView from '../img/columnView2.svg';

import { Redirect, Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  container: {
    width: '80%',
    margin: 'auto',
  },
  titleContainer: {
    padding: '10px 10% 5px',
    backgroundColor: theme.palette.secondary.light,
  },
  titleText: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
  },
  titleTooltipText: {
    color: theme.palette.primary.contrastText,
    // backgroundColor: theme.palette.primary.dark,
    fontWeight: 500,
  },
  imageSrc: {
    height: 20,
    color: theme.palette.secondary.contrastText,
    fill: theme.palette.secondary.contrastText,
  },
  drawerButton: {
    // marginRight: '-100px'
  },
  findField: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    '&:hover': { backgroundColor: theme.palette.secondary.dark },
  },
  commitType: {
    // width: 120,
  },
  addScope: {
    position: 'fixed',
    right: '20%',
    top: 380,
  },
  grow: {
    flexGrow: 1,
    // width: 150
  },
  findRoot: {
    // padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    // width: 400,
  },
  findInput: {
    marginLeft: 8,
    flex: 1,
  },
  findIconButton: {
    // padding: 10,
  },
  linkStyle: {
    textDecoration: 'none',
  },
});

// const promiseFn = theFunction => {
//   return new Promise((resolve, reject) => {
//       resolve(theFunction);
//   })
// };

function isValidDate(date) {
  return date && Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date);
}

function isFormattedStringDate(date) {
  // YYYY-MM-DD default in system.
  // console.log('tests', typeof date, date.length, date.slice(4, 5));
  return typeof date === 'string' && date.slice(4, 5) === '-' && date.slice(7, 8) === '-' && (date.length === 10 || date.length === 24);
}

const formatDate = (theDate, format, dayAdj = 0) => {
  // console.log('formatDate', theDate, new Date(theDate));
  let d = null;
  if (theDate) {
    if (isValidDate(theDate)) {
      // console.log('formatDate It is a date');
      d = theDate;
    } else if (isFormattedStringDate(theDate) && theDate.length === 24) {
      //YYYY-MM-DDThh:mm:ss.000Z  db value with time
      // console.log('formatDate It is a string date with time');
      d = new Date(theDate);
    } else if (isFormattedStringDate(theDate) && theDate.length === 10) {
      // YYYY-MM-DD  db value without time
      // console.log('formatDate It is a string date without time');
      d = new Date(theDate);
      d.setUTCMinutes(d.getTimezoneOffset()); // Since there is no time... fixes the time to be midnight our timezone.
    } else {
      // console.log('formatDate something else', theDate);
      // a value was passed but it was a non date value.
      return '';
    }
    if (format === '/') {
      d.setDate(d.getDate() + dayAdj);
      const theMonth = d.getMonth() + 1;
      const theDay = d.getDate();
      const theYear = d.getFullYear().toString().substr(-2);
      // console.log('date parts', theMonth, theDay, theYear);
      return `${theMonth}/${theDay}/${theYear}`;
    }

    d.setDate(d.getDate() + dayAdj);
    const theMonth = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : `${d.getMonth() + 1}`;
    const theDay = d.getDate() < 10 ? `0${d.getDate()}` : `${d.getDate()}`;
    // console.log('date parts', theMonth, theDay, d.getFullYear());
    return `${d.getFullYear()}-${theMonth}-${theDay}`;
  }
  // console.log('formatDate NULL', theDate);
  return ''; // null value.  Ignore.
};

const viewButtonList = (props) => {
  // const { classes, handleViewButton, width } = props;
  const { classes } = props;

  return (
    <Link to={'/search'}>
      <Tooltip title='Tabular View / Search' placement='left'>
        <Button
          variant='contained'
          color='secondary'
          size='small'
          // disabled={true}
          // title='Tabular View: Future design'
          // className={classes.button}
          // onClick={ (e) => {handleViewButton('TABULAR')} }
        >
          <img src={listView} alt={'Tabular Entry'} className={classes.imageSrc} />
        </Button>
      </Tooltip>
    </Link>
  );
};

const actionButtonList = (state, props, clearState, saveProject, handleChange, handleListChange, reviseProject) => {
  const { classes } = props;

  return (
    <Grid container justify='flex-end' style={{ marginTop: 10, marginBottom: 10 }} spacing={16}>
      <Grid item>
        <Link to={`/`} className={classes.linkStyle}>
          <Button title='Return to menu' variant='contained' size='small' color='secondary'>
            Cancel
          </Button>
        </Link>
      </Grid>
      <Grid item className={classes.grow}>
        <Button title='Clear the fields and scope' variant='contained' size='small' color='secondary' onClick={() => clearState(true)}>
          Clear
        </Button>
      </Grid>
      <Grid item>
        Remember?
        <Checkbox onChange={handleChange('rememberData')} checked={state.rememberData} />
      </Grid>
      <Grid item>
        <Button
          title='Save record and commit changes to downstream systems like Trello and Box'
          variant='contained'
          size='small'
          color='secondary'
          onClick={() => saveProject(true)}
          className={classes.commitType}>
          Submit
        </Button>
      </Grid>
      {/* <Grid item>
        <Button
          title='Save the record only.  Do not commit any changes to downstream systems yet'
          variant='contained'
          size='small'
          color='secondary'
          onClick={() => saveProject()}>
          Save Only
        </Button>
      </Grid> */}
    </Grid>
  );
};

class singleView extends Component {
  constructor(props) {
    super(props);

    this.today = formatDate(new Date());
    // this.today = new Date();

    // this.due = this.props.currentViews.category === 'VOLUME'?formatDate(2):formateDate(21);

    this.state = {
      jobNumUnlock: false,
      rememberData: false,
      openScopeDialog: false,
      openCreateDialog: false,
      openDupsDialog: false,
      openRevDialog: false,
      dialogValue: '', // used by the sub, city, client creation dupsDialogs
      categoryID: this.props.currentProject.categoryID,
      contact_id: this.props.session.contact_id, // contact_id
      requestor: this.props.session.full_name, // contact full name
      user_id: this.props.session.id, // user_id.  Originally owner_id
      user: this.props.session.full_name, // contact full name of the user_id, originally owner
      created_by: this.props.session.id,
      last_updated_by: this.props.session.id,
      onboard_date: this.today,
      // due_date: this.due,
      scope: this.props.currentViews.category === 'VOLUME' ? [{ control_id: 28, name: 'volfoundation' }] : [],
      revisions: [],
      saveValue: '', // stores previous values of address/lot/block to test for change
      classification: this.props.currentViews.category,
      geo_lab: this.props.currentViews.category === 'VOLUME' ? 'MLALABS' : null,
      dwelling_type: this.props.currentViews.category === 'VOLUME' ? 'PT 1 UNIT' : null,
      redirectUrl: null,
    };

    this.initState = {
      jobNumUnlock: false,
      rememberData: false,
      openScopeDialog: false,
      openCreateDialog: false,
      openDupsDialog: false,
      openRevDialog: false,
      dialogValue: '', // used by the sub, city, client creation dupsDialogs
      // categoryID: this.props.currentProject.categoryID,
      contact_id: this.props.session.contact_id, // contact_id
      requestor: this.props.session.full_name, // contact full name
      user_id: this.props.session.id, // user_id.  Originally owner_id
      user: this.props.session.full_name, // contact full name of the user_id, originally owner
      created_by: this.props.session.id,
      last_updated_by: this.props.session.id,
      onboard_date: this.today,
      // due_date: this.due,
      // scope: this.props.currentViews.category === 'VOLUME'?[{control_id: 28, name: 'volfoundation'}]:[],
      revisions: [],
      saveValue: '', // stores previous values of address/lot/block to test for change
      // classification: this.props.currentViews.category,
      // geo_lab: this.props.currentViews.category === 'VOLUME'?'MLALABS':null,
      // dwelling_type: this.props.currentViews.category === 'VOLUME'?'PT 1 UNIT':null,
      redirectUrl: null,
    };

    this.childArr = [];
    this.oID = 0;
    this.currentView = [];
  }

  componentDidMount = () => {
    const { currentViews, setPageTitle } = this.props;
    // console.log('Project CDM');
    // console.log('currentMenu', this.props.currentMenu);
    // console.log('currentViews', this.props.currentViews);
    // console.log('currentProject', this.props.currentProject);
    // console.log('currentView', this.currentView);
    // console.log('VIEW', this.props.);

    // if (this.state.scope.length === 0) {
    //   const initScope = this.props.currentProject.initialScope.map(scope => {
    //     return {control_id: scope.control_id, name: scope.name, label: scope.label}
    //   })
    //   this.setState({ scope: initScope });
    // }

    // This will be temporary.  Preferences will assign this as a default.
    // if (this.props.currentViews.category === 'VOLUME') {
    //   const initScope = [];
    //   initScope.push({control_id: 28, name: 'volfoundation'});
    //   this.setState({ scope: initScope });
    // }

    // Setting this.currentView and the page Title upon startup.
    if (currentViews.children) {
      this.currentView = currentViews.children.filter((view) => view.category === this.props.VIEW); // array of subviews (sections) that make up whole view.
      setPageTitle(this.currentView[0].label);
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { currentProject, updateProject, currentViews, VIEW, setPageTitle, closeDrawers } = nextProps;
    // console.log('in getDerivedStateFromProps', VIEW);
    // VIEW?console.log('view category', VIEW):null;
    // console.log('currentViews', currentViews);
    // console.log('prevState', prevState);

    // props currentProject was recently populated with a project to edit.
    if (!prevState.clear && currentProject.address1) {
      // console.log('gDSFP: updating state', prevState);
      // let init = {categoryID: currentProject.categoryID, url: currentProject.url}

      updateProject({});
      // using the first view entry to set title of page.
      let titleView = '';
      if (currentViews.children) {
        titleView = currentViews.children.filter((view) => view.category === VIEW); // array of subviews (sections) that make up whole view.
        setPageTitle(titleView[0].label);
      }
      closeDrawers();
      return { ...currentProject };

      // updateProject({});
      // setPageTitle(currentView[0].label);
      // return {...currentProject };
    } else if (prevState.clear) {
      return { clear: false };
    }
    return null;
  }

  viewChildren = (children, inclID = false) => {
    if (children) {
      children.forEach((child, id) => {
        if (child.entity_type === 'FIELD_GROUP' && child.hidden !== 'Y') {
          if (
            child.category !== 'DESIGN' ||
            (child.category === 'DESIGN' && this.state.scope && this.state.scope.find((s) => s.name === child.name))
          ) {
            // console.log('the fg', child);
            let title = child.label;
            if (child.name === 'project' || child.name === 'vol_single_project') {
              const revs =
                this.state.revisions
                  .filter((r) => r.scope_id === -1)
                  .map((r) => r.revision)
                  .reverse()
                  .toString() || '';
              title = `${child.label} (Revs: ${revs})`;
            }

            this.childArr.push(
              <FieldGroup
                key={this.oID++}
                // key={child.rship_id}
                fieldGroup={child}
                toggleScopeDialog={this.toggleScopeDialog}
                removeScope={false}
                reviseProject={this.reviseProject}
                title={title}
              />
            );
            if (child.children) this.viewChildren(child.children); // recursive call.
          }
        }
        if (child.entity_type === 'FIELD' && child.hidden !== 'Y')
          this.childArr.push(
            <FieldContainer
              key={this.oID++}
              // key={child.rship_id}
              field={child}
              state={this.state}
              arrID={inclID || inclID === 0 ? inclID : false}
              handleChange={this.handleChange}
              handleListChange={this.handleListChange}
              toggleJob={this.toggleJob}
              createDialogValue={this.createDialogValue}
              handleTabEnter={this.handleTabEnter}
              handleFocus={this.handleFocus}
              handleBlur={this.handleBlur}
            />
          );
      });
      return this.childArr;
    }
    // this is if children hasn't been loaded or is 0.
    return <div />;
  };

  viewScope = (masterScopeList) => {
    // console.log('master scope, state scope', masterScopeList, this.state.scope);
    const revAsc = [...this.state.revisions].reverse();
    if (masterScopeList && this.state.scope) {
      this.state.scope.forEach((item, id) => {
        if (!item.delete) {
          // if added scope and saved to database, then later wish to delete it.
          let child = masterScopeList.find((s) => s.name === item.name);
          // console.log('viewScope', masterScopeList, item, child);
          if (child.entity_type === 'FIELD_GROUP' && child.hidden !== 'Y') {
            let scopeDate = item.creation_date || this.today;
            let revs = '';
            revs =
              revAsc
                .filter((r) => r.scope_id === item.id)
                .map((r) => r.revision)
                .toString() || '';
            // console.log('creation date of scope', item.name, scopeDate);
            const firstRevBefore = this.state.revisions.find((r) => {
              // console.log('determining correct rev', r.revision, r.rev_date);
              return r.rev_date < scopeDate;
            });
            // revs = firstRevBefore ? revs : `Orig,${revs}`;
            revs = firstRevBefore ? revs : revs ? `Orig,${revs}` : 'Orig';
            // const d = item.creation_date || this.today;
            // console.log(
            //   'Onboard, item and revs',
            //   this.state.onboard_date,
            //   item.name,
            //   item.creation_date,
            //   new Date(item.creation_date),
            //   'Selected',
            //   d
            //   // firstRevBefore ? `${firstRevBefore.revision} ${firstRevBefore.rev_date}` : 'OG'
            // );
            this.childArr.push(
              <FieldGroup
                key={this.oID++}
                // key={child.rship_id}
                fieldGroup={child}
                toggleScopeDialog={this.toggleScopeDialog}
                arrID={id}
                removeScope={this.removeScope}
                title={`${child.label} (Added: ${formatDate(scopeDate, '/')}, Revs: ${revs})`}
              />
            );
            if (child.children) this.viewChildren(child.children, id); // almost recursive call.
          }

          if (child.entity_type === 'FIELD' && child.hidden !== 'Y')
            this.childArr.push(
              <FieldContainer
                key={this.oID++}
                // key={child.rship_id}
                field={child}
                state={this.state}
                arrID={id}
                handleChange={this.handleChange}
                handleListChange={this.handleListChange}
                toggleJob={this.toggleJob}
                createDialogValue={this.createDialogValue}
                handleTabEnter={this.handleTabEnter}
                handleFocus={this.handleFocus}
                handleBlur={this.handleBlur}
              />
            );
        }
      });
      return this.childArr;
    }
    // this is if children hasn't been loaded or is 0.
    return <div />;
  };

  updateState = (updatedValues) => {
    // console.log('updateState', updatedValues);
    this.setState(updatedValues);
  };

  handleChange = (name, arrID) => (event) => {
    // console.log('in handleChange:', name, arrID);
    // name === 'city'?console.log('event target', event.target.value):null;
    if (arrID || arrID === 0) {
      let updatedScope = [...this.state.scope];

      updatedScope[arrID][name] =
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.type === 'number' && event.target.value === ''
          ? null
          : event.target.type === 'date' && event.target.value === ''
          ? null
          : name === 'geo_pi'
          ? event.target.value.toUpperCase()
          : name === 'trello_card_id' && event.target.value.startsWith('https://trello.com/c/')
          ? event.target.value.slice(21)
          : event.target.value;
      // name === 'block'?
      //   this.setState({ [name]: event.target.value, }, () => {
      //     if (this.state.subdivision && this.state.lot && this.state.block) {
      //       this.searchForExisting('LOT')
      //     }}
      //   ) :
      this.setState({ scope: updatedScope });
    } else {
      event.target.type === 'checkbox'
        ? this.setState({ [name]: event.target.checked })
        : event.target.type === 'number' && event.target.value === ''
        ? this.setState({ [name]: null })
        : event.target.type === 'date' && event.target.value === ''
        ? this.setState({ [name]: null })
        : name === 'geo_pi'
        ? this.setState({ [name]: event.target.value.toUpperCase() })
        : name === 'trello_card_id' && event.target.value.startsWith('https://trello.com/c/')
        ? this.setState({ [name]: event.target.value.slice(21) })
        : this.setState({ [name]: event.target.value });
    }
  };

  handleListChange = (selected, field, arrID) => {
    console.log('in handleListChange:', field.name, selected, arrID);

    if (arrID || arrID === 0) {
      switch (field.name) {
        // case 'subdivision':
        //   this.setState({ [field.name]: selected.code }, () => {
        //     if (this.state.subdivision && this.state.lot && this.state.block) {
        //       this.searchForExisting('LOT')
        //     }}
        //   );  // fill in value.
        //   break;
        default:
          let updatedScope = [...this.state.scope];

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

          this.setState({ scope: updatedScope });
      }
    } else {
      switch (field.name) {
        case 'subdivision':
          // console.log('subdivison selected', selected);
          selected // if selected
            ? this.setState({ subdivision_id: selected.code, subdivision: selected.name, city_id: selected.city_id, city: selected.city })
            : this.setState({ subdivision_id: null, subdivision: null, city_id: null, city: null }); // clear out

          break;
        case 'client':
          // console.log('subdivison selected', selected);
          if (selected) {
            let main = selected.main_contact_email;
            if (selected.main_contact_phone) {
              main = main ? `${main} | ${selected.main_contact_phone}` : selected.main_contact_phone;
            }
            if (selected.main_contact) {
              main = main ? `${main} | ${selected.main_contact}` : selected.main_contact;
            }
            let bill = selected.billing_contact_email;
            if (selected.billing_contact_phone) {
              bill = bill ? `${bill} | ${selected.billing_contact_phone}` : selected.billing_contact_phone;
            }
            if (selected.billing_contact) {
              bill = bill ? `${bill} | ${selected.billing_contact}` : selected.billing_contact;
            }
            this.setState({
              client_id: selected.code,
              client: selected.name,
              main_contact: main,
              billing_contact: bill,
            });
          } else {
            this.setState({ client_id: null, client: null, main_contact: null, billing_contact: null }); // clear out
          }
          break;
        default:
          selected // if selected
            ? field.name_id // then if field has an id
              ? this.setState({ [field.name_id]: selected.code, [field.name]: selected.name }) // fill in id and value.
              : this.setState({ [field.name]: selected.code }) // fill in value.
            : field.name_id // else (selected is null)... now if field has an id...
            ? this.setState({ [field.name_id]: null, [field.name]: null }) // clear out
            : this.setState({ [field.name]: null }); // clear out
      }
    }
  };

  handleTabEnter = (name, currentValue) => {
    switch (name) {
      case 'find':
        this.findProjects(currentValue);
        break;
      case 'geo_lab':
      case 'geo_pi':
        this.getGeoValues();
        break;
      default:
    }
  };

  toggleScopeDialog = () => {
    this.setState({ openScopeDialog: !this.state.openScopeDialog });
  };

  assignScope = (newScope) => {
    this.setState({ openScopeDialog: false, scope: newScope });
    // this.setState({ openScopeDialog: !this.state.openScopeDialog, scope: newScope});
  };

  removeScope = (selected) => {
    let adjustedScope = [...this.state.scope];
    if (adjustedScope[selected].id) {
      adjustedScope[selected].delete = true;
      adjustedScope[selected].name = null; // this is a trick to "hide" this scope record.  It will not render on screen
    } else {
      adjustedScope.splice(selected, 1);
    }
    this.setState({ scope: adjustedScope });
  };

  clearState = (clearAction = false) => {
    const { currentViews } = this.props;
    // console.log('clearState');
    // does not clear out keys that are absent in initial state.
    // only merges.
    // this.setState(prevState => {
    //     console.log('inside ss func', prevState, this.initState);
    //     const s = {...this.initState} ;
    //     return s;
    // });
    if (this.state.rememberData && !clearAction) {
      const scope = this.state.scope.map((s) => {
        return { ...s, id: null, scope_id: null, project_id: null };
      });
      this.setState({
        address_id: null,
        id: null,
        job_number: null,
        trello_card_id: null,
        scope: scope,
        revision: null,
        revision_desc: null,
      });
    } else {
      // console.log('state, initstate', this.state, this.initState);
      const keys = Object.keys(this.state);
      const stateReset = keys.reduce((acc, v) => ({ ...acc, [v]: undefined }), {});
      let scope = [];
      if (this.props.currentViews.category === 'VOLUME') scope.push({ control_id: 28, name: 'volfoundation' });
      // console.log('reset, init, scope', stateReset, this.initState, scope, currentViews);
      this.setState({
        ...stateReset,
        ...this.initState,
        categoryID: currentViews.id,
        classification: currentViews.category,
        geo_lab: currentViews.category === 'VOLUME' ? 'MLALABS' : null,
        dwelling_type: currentViews.category === 'VOLUME' ? 'PT 1 UNIT' : null,
        scope: scope,
        clear: true,
      });
    }
  };

  reviseProject = () => {
    if (this.state.id) {
      this.setState({ openRevDialog: !this.state.openRevDialog });
    } else {
      this.props.loadMessage({ ok: false, status: 'Missing Data', statusText: 'Select an existing project to revise' }, 'ERROR');
    }
  };

  saveProject = (andCommit = false) => {
    // console.log('save Project and', andCommit);
    let noScope = false;
    if (this.state.scope.length === 0) {
      noScope = true;
    } else {
      const deletedScope = this.state.scope.filter((s) => s.delete === true);
      noScope = this.state.scope.length === deletedScope.length ? true : false;
    }

    if (!this.state.address1) {
      this.props.loadMessage({ ok: false, status: 'Missing Data', statusText: 'Missing Address.  Please fill in' }, 'ERROR');
    } else if (!('client_id' in this.state) || this.state.client_id === null) {
      // need to allow for 0 (CE)
      this.props.loadMessage({ ok: false, status: 'Missing Data', statusText: 'Missing Client.  Please fill in' }, 'ERROR');
    } else if (this.state.classification === 'VOLUME' && !this.state.city) {
      this.props.loadMessage({ ok: false, status: 'Missing Data', statusText: 'Missing City.  Please fill in' }, 'ERROR');
    } else if (noScope) {
      this.props.loadMessage(
        {
          ok: false,
          status: 'Missing Data',
          statusText:
            'Missing scope record.  Must have at least one.  If you are not sure of the scope category at this time, use Other and describe the request as best you can.',
        },
        'ERROR'
      );
    } else {
      if (andCommit) {
        this.setState({ status: 'ACTIVE', last_updated_by: this.props.session.id }, () => {
          this.props.commitAddresses(this.props.session.id, [this.state], true, true);
          this.clearState();
        });
      } else {
        this.setState({ status: 'PENDING', last_updated_by: this.props.session.id }, () => {
          this.props.createAddress(this.state, true);
          this.clearState();
        });
      }
    }
  };

  findProjects = (search) => {
    // console.log('find projects', search);
    this.props.loadFind(search);
    this.props.toggleDrawer('find');
  };

  getGeoValues = () => {
    // using this key trap as an indication that the field has been filled in.
    // using this key trap as an indication that the field has been filled in.

    // console.log('tabKeyChange ** No Action **:', field.name);

    if (this.state.geo_lab === 'MLALABS' && this.state.geo_pi) {
      const geo_id = this.props.geos.find((geo) => geo.code === this.state.geo_lab).id;
      const oneGeoMaster = this.props.geoMasterData.filter((rec) => rec.geotech_id === geo_id);
      const emYmValues = oneGeoMaster.find((rec) => rec.pi === this.state.geo_pi);
      if (emYmValues) {
        this.setState({ em_center: emYmValues.emc, em_edge: emYmValues.eme, ym_center: emYmValues.ymc, ym_edge: emYmValues.yme });
      }
    }
  };

  toggleJob = () => {
    this.setState({ jobNumUnlock: !this.state.jobNumUnlock });
  };

  createDialogValue = (newValue, field) => {
    // console.log('create Dialog', newValue, field.name);
    this.setState({ dialogValue: newValue, openCreateDialog: field.name });
  };

  returnDialogValue = (newValue = '', values) => {
    this.setState({ dialogValue: newValue, openCreateDialog: false, ...values });
  };

  // saving value before changing it.
  handleFocus = (name) => {
    // console.log('handleFocus:', name, this.state[name]);
    this.setState({ saveValue: this.state[name] });
  };

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
        if (this.state[name] !== this.state.saveValue && this.state.subdivision && this.state.lot && this.state.block) {
          this.searchForExisting('LOT');
        }
        break;
      default:
        break;
    }
  };

  searchForExisting = (test) => {
    // console.log('searchForExisting', test);
    this.props.searchForDups(test, this.state);
    this.setState({ openDupsDialog: true });
  };

  dupSelectClose = (project) => {
    this.setState(project);
  };

  dupsDialogClose = () => {
    this.setState({ openDupsDialog: false });
  };

  render() {
    // Test to make sure we can render Screen.  Only set to true when
    // currentProject and currentViews are populated.
    // If currentProject is empty, go back to Main menu.

    // Commented out 20-05-20.  I think added recently.
    // if (!this.state.renderScreen) {
    //   console.log('loading...');
    //   // test for empty Project object.  If so, user refreshed browser.  Go back to main menu.
    //   if (this.props.currentProject.constructor === Object && Object.keys(this.props.currentProject).length === 0) {
    //     return (
    //       <Redirect to={'/'} />
    //     );
    //   }
    //   return null;
    // }

    // const { classes, currentViews, width, setPageTitle, currentProject } = this.props;
    const { classes, currentViews, width } = this.props;
    this.oID = 0;
    this.childArr = [];
    // console.log(
    //   'ceViews Render',
    // 'state:',
    // this.state
    // 'init state', this.initState,
    // 'currentProject:',currentProject,
    // 'currentViews:', currentViews,
    // 'currentView:', this.currentView
    // );

    if (this.state.redirectUrl) {
      console.log('redirect to ', this.state.redirectUrl);
      return <Redirect to={this.state.redirectUrl} />;
    }

    // console.log('ceViews Render', 'state:', this.state);
    // let currentView = [];
    if (currentViews.children) {
      this.currentView = currentViews.children.filter((view) => view.category === this.props.VIEW); // array of subviews (sections) that make up whole view.
    }

    // console.log('currentViews', currentViews);
    // console.log('currentView', currentView);

    return (
      <Fragment>
        <Grid container justify='space-between' className={classes.titleContainer}>
          <Grid item xs={12} md={4}>
            {/*<Paper className={classes.findRoot} elevation={1}>
              <InputBase className={classes.findInput} placeholder='Find' />
              <IconButton className={classes.findIconButton} aria-label="Search">
                <SearchIcon />
              </IconButton>
            </Paper>*/}
            <FieldContainer
              field={{ name: 'find', label: 'Find' }}
              state={this.state}
              handleChange={this.handleChange}
              handleTabEnter={this.handleTabEnter}
              handleFocus={this.handleFocus}
              handleBlur={this.handleBlur}
              addStyle={classes.findField}
              findProjects={this.findProjects}
            />
          </Grid>

          <Grid item xs={6} md={2}>
            {this.state.job_number && (
              <Tooltip
                title={
                  <Fragment>
                    <Typography className={classes.titleTooltipText}>
                      Created by {this.state.entered_by} on {formatDate(this.state.creation_date, '/')}
                    </Typography>
                    <Typography className={classes.titleTooltipText}>
                      Updated by {this.state.last_updated_by_name} on {formatDate(this.state.last_updated_date, '/')}
                    </Typography>
                  </Fragment>
                }
                aria-label='Popover'>
                <Paper elevation={4} className={classes.titleText}>
                  <Typography align='center' variant={width === 'xs' ? 'subtitle2' : 'h6'} className={classes.titleText}>
                    {`Job #: ${this.state.job_number}${this.state.revision || ''}`}
                  </Typography>
                </Paper>
              </Tooltip>
            )}
          </Grid>

          <Grid item>{viewButtonList(this.props)}</Grid>

          {width !== 'xs' && width !== 'sm' && (
            <Grid item className={classes.drawerButton}>
              <Button variant='contained' color='secondary' size='small' onClick={() => this.props.toggleDrawer('recents')}>
                Recents
              </Button>
            </Grid>
          )}
        </Grid>

        <Grid container spacing={8} className={classes.container}>
          {this.currentView
            ? this.currentView.forEach((view) => {
                // could have multiple subviews
                view.scope_section === 'Y' ? this.viewScope(view.children) : this.viewChildren(view.children);
              })
            : null}
          {/*
            currentViews.children? currentViews.children.forEach(view => {
              view.scope_section === 'Y'? this.viewScope(view.children): this.viewChildren(view.children)
            }) : null
          */}
          {this.childArr}

          {actionButtonList(this.state, this.props, this.clearState, this.saveProject, this.handleChange, this.handleListChange, this.reviseProject)}
        </Grid>
        {this.state.openScopeDialog && (
          <ScopeSelectionContainer
            open={this.state.openScopeDialog}
            toggleScopeDialog={this.toggleScopeDialog}
            currentScope={this.state.scope}
            assignScope={this.assignScope}
          />
        )}
        {this.state.openCreateDialog && (
          <ClientDialogContainer
            open={this.state.openCreateDialog === 'client' ? true : false}
            newValue={this.state.dialogValue}
            closeDialog={this.returnDialogValue}
          />
        )}
        {this.state.openCreateDialog && (
          <SubdivisionDialogContainer
            open={this.state.openCreateDialog === 'subdivision' ? true : false}
            newValue={this.state.dialogValue}
            closeDialog={this.returnDialogValue}
          />
        )}
        {this.state.openCreateDialog && (
          <CityDialogContainer
            open={this.state.openCreateDialog === 'city' ? true : false}
            newValue={this.state.dialogValue}
            closeDialog={this.returnDialogValue}
          />
        )}
        {this.props.dups.length > 0 && this.state.openDupsDialog && (
          <DupsDialogContainer
            open={this.props.dups.length > 0}
            // onSelectAndClose = {this.editStart}
            onSelectAndClose={this.dupSelectClose}
            onClose={this.dupsDialogClose}
            curRec={this.state}
            selectAllowed={true}
          />
        )}
        {this.state.openRevDialog && (
          <RevisionDialogContainer open={this.state.openRevDialog} parentState={this.state} updateParentState={this.updateState} />
        )}
      </Fragment>
    );
  } // render
} // Component

class tabularView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.currentProject,
    };
  }

  VIEW = 'TABULAR';

  componentDidMount = () => {};

  render() {
    // console.log('render... state:', this.state);
    const { classes, currentViews } = this.props;
    let currentView = [];
    if (currentViews.children) {
      currentView = currentViews.children.filter((view) => view.category === this.VIEW); // gets all sections (views) that apply.
    }
    // console.log('currentView', currentView);

    return (
      <div>
        <Grid container justify='space-between' className={classes.titleContainer}>
          <Grid item xs={8}>
            <Typography variant='h6' className={classes.titleText}>
              {currentView[0].label}
            </Typography>
          </Grid>
          <Grid item>{viewButtonList(this.props)}</Grid>
        </Grid>
      </div>
    );
  } // render
} // Component

class guidedView extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  VIEW = 'GUIDED';

  componentDidMount = () => {};

  render() {
    // console.log('render... state:', this.state);
    const { classes, currentViews } = this.props;
    let currentView = [];
    if (currentViews.children) {
      currentView = currentViews.children.filter((view) => view.category === this.VIEW); // gets all sections (views) that apply.
    }
    // console.log('currentView', currentView);

    return (
      <div>
        <Grid container justify='space-between' className={classes.titleContainer}>
          <Grid item xs={8}>
            <Typography variant='h6' className={classes.titleText}>
              {currentView[0].label}
            </Typography>
          </Grid>
          <Grid item>{viewButtonList(this.props)}</Grid>
        </Grid>
      </div>
    );
  } // render
} // Component

export const SingleView = withWidth()(withStyles(styles, { withTheme: true })(singleView));
export const TabularView = withWidth()(withStyles(styles, { withTheme: true })(tabularView));
export const GuidedView = withWidth()(withStyles(styles, { withTheme: true })(guidedView));
