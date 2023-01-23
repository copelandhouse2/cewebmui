import React, { Component } from 'react';
import { Redirect, Link } from "react-router-dom"
// import { withNavigationFocus } from 'react-navigation';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withWidth } from "@material-ui/core";

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

// import AddIcon from '@material-ui/icons/Add';
// import Checkbox from '@material-ui/core/Checkbox';

import { DefaultFG, SearchTabularFG } from './ceFieldGroup';
import { Field2Container } from '../containers/ceFieldContainer';
// import { ScopeSelectionContainer } from '../containers/ceScopeSelectionContainer';
import CePageContainer from '../containers/cePageContainer';

// import IconButton from '@material-ui/core/IconButton';
// import SettingsIcon from '@material-ui/icons/Settings';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

// import fullView from '../img/fullView.svg';
// import listView from '../img/listView.svg';
// import columnView from '../img/columnView2.svg';

import DupsDialogContainer from '../containers/DupsDialogContainer';

const styles = theme => ({
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
    backgroundColor: theme.palette.secondary.main
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
    '&:hover': {backgroundColor: theme.palette.secondary.dark}
  },
  commitType: {
    // width: 120,
  },
  addScope: {
    position: 'fixed',
    right: '20%',
    top: 380
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
    textDecoration: 'none'
  }
});

// const date = (dayAdj=0) => {
//   let returnDate = new Date();
//   returnDate.setDate(returnDate.getDate()+dayAdj);
//   const theMonth = returnDate.getMonth()+1 < 10? `0${returnDate.getMonth()+1}` : `${returnDate.getMonth()+1}`;
//   const theDay = returnDate.getDate() < 10? `0${returnDate.getDate()}` : `${returnDate.getDate()}`;
//
//   return `${returnDate.getFullYear()}-${theMonth}-${theDay}`;
// }

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      object: 'PROJECT',
      renderScreen: false,
      currentMenuID: this.props.currentViews.id,
      currentView: this.props.VIEW||'DEFAULT',
      saveValue: '',  // stores previous values of address/lot/block to test for change      selectedIndexes: [],
      selectedIndexes: [],
      selected: null,
      showSearchByFields: false,  // show the old Search By fields.  Hide the Find field.
      scope: 'volfoundation',
      redirectUrl: null,
      openDupsDialog: false,
      dupRec: {},
    };

    this.initState = {...this.state};

    this.scopeField = {}

  }

  componentDidMount = () => {
    // console.log('CDM Search: ',this.props.currentViews.name);
    // if (this.state.currentMenuID) {
    //   console.log('CDM: currentProject populated', this.props.currentProject, this.state);
    //   this.props.loadViews(this.state.currentMenuID);
    //   // this.props.loadFind('clear');
    // }
    // if (this.props.currentViews.name !== 'update') this.props.loadViewsByName('update');
    if (this.props.currentViews.name !== 'search') this.props.loadViewsByName('search');

    this.scopeField = this.props.avffControls.find(control=>control.entity_type === 'FIELD' && control.name === 'scope');
    this.scopeField.display_width = 3;

    // console.log('scope field', this.scopeField);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log('gDSFP');
    const { currentViews } = nextProps;
    // console.log('gDSFP: nextProps', currentViews);

    // If the views object is populated, activate the screen render toggle.
    // currentViews is populated: from the menu, selecting a project.
    // if (currentViews.name === 'search' && currentViews.constructor === Object && Object.keys(currentViews).length !== 0) {
    //   return {renderScreen: true };
    // }
    if (!prevState.renderScreen && currentViews.length > 0) {
      if (currentViews.findIndex(view => view.category === 'DEFAULT') > -1) {
        return {renderScreen: true };
      }
    }
    return null;
  }

  // actions that show on top of page.  Left side next to Find (when active)
  topActionBarLeft = () => {
    // const { classes, theme, width } = this.props;
    return null;
    // return (
    //   <Grid item>
    //     <Button
    //       variant="contained"
    //       color="secondary"
    //       size="small"
    //       // disabled={true}
    //       title='Single View'
    //       // className={classes.button}
    //       // endIcon={<fullView />}
    //       onClick={ () => {
    //         console.log('HERE');
    //         if (this.props.handleViewButton) this.props.handleViewButton('DEFAULT');
    //       }}
    //     >
    //       <img src={fullView} alt={'Single Entry'} className={classes.imageSrc} />
    //     </Button>
    //   </Grid>
    // );

  }

  // actions that show on top of page.  Right side next to Recents
  topActionBarRight = () => {
    return null;
  }

  // actions that show on bottom of page
  bottomActionBar = () => {

    const { classes, search } = this.props;

    return (
    <Grid container justify="flex-end" style={{marginTop: 10, marginBottom: 10}} spacing={16}>

      <Grid item>
        <Link to={`/`} className={classes.linkStyle}>
          <Button title='Return to menu'
            variant="contained"
            size='small'
            color="secondary"
          >
            Cancel
          </Button>
        </Link>
      </Grid>
      <Grid item className={classes.grow}>
      <Tooltip placement="top-start" title={`Default limit 200.  Override by a) Find field 'limit:[value]' or b) Last Updated drop down`} aria-label='default limit 200'>
        <Typography>
          {search.findResults.length} results displayed.
        </Typography>
      </Tooltip>
      </Grid>
      <Grid item>
        <Button title='Select record'
          variant="contained"
          size='small'
          color="secondary"
          onClick={this.handleSelected}
        >
          Edit
        </Button>
      </Grid>

    </Grid>
    )
  }

  // actions that show in field group title bar
  fieldGroupTools = () => {
    // return (
    //   <Tooltip title={`Manage fields`} aria-label='Settings'>
    //     <IconButton aria-label='Field Group Settings' onClick={()=>{}}>
    //       <SettingsIcon className={classes.settings} />
    //     </IconButton>
    //   </Tooltip>
    // )
    return (
      <FormControlLabel
        control={
          <Switch
            checked={this.state.showSearchByFields}
            onChange={(e)=>{this.handleSwitch(e)}}
            value='showSearchByFields'
          />
        }
        label={this.state.showSearchByFields?'Back to Find Field':'Show Fields'}
      />
    )
  }

  fieldGroupToolsTabular = () => {
    // const { search } = this.props;
    return (
      <Field2Container
        field = {this.scopeField}
        scopeID = {false}
        state = {this.state}
        updateState = {this.updateState}
        // turns off dup check, creating client,city,sub via list
        searchMode={true}
        // props that are not used.
        handleListChange={false}
        handleFocus={false}
        handleBlur={false}
        // call to create new client, city, sub
        createDialogValue={false}
      />
    )
  }

  // actions that show next to / below fields in field group
  fieldTools = () => {

    return (
      <Grid item>
      <Button title='Find records'
        variant="contained"
        size='small'
        color="secondary"
        onClick={this.findProjects}
      >
        Search
      </Button>
      </Grid>
    )
  }

  updateState = (updatedValues) => {
    // console.log('updateState', updatedValues);
    this.setState(updatedValues);
  }

  handleSelected = () => {
    // console.log('In the handleSelected', this.state.selectedIndexes[0]);
    if (this.state.selectedIndexes[0] > -1) {  // gets 0 and above.
      // console.log('In the if');
      this.props.updateProject(this.props.search.findResults[this.state.selectedIndexes[0]]);
      // this.props.clearDups();  // in container
    } else {  // user selected first row (index = 0) which was the curent entry
      // console.log('In the else');
      // this.props.clearDups();  // in container
    }
  }

  handleSwitch = (e) => {
    // console.log('In the handleSwitch');

    if (e.target.checked) {
      this.updateState({
        showSearchByFields:e.target.checked,
        find: null
      });
    } else {
      const keys = Object.keys(this.state)
      const stateReset = keys.reduce((acc, v) => ({ ...acc, [v]: undefined }), {})
      this.setState({ ...stateReset, ...this.initState });
    }

  }

  // Only called by Search button.
  findProjects = () => {

    // console.log('find projects', this.state);
    this.props.loadFind(null, this.state);
  }

  handleSave = (updatedRows, andCommit = false) => {
    // let updated = updatedRows.filter(r=>{if (r) return r});
    // console.log('handle Save', updatedRows);

    // Testing to make sure all the edited projects still have
    // an address, client, and city.
    let dataOk = true;
    for (let i=0; i<updatedRows.length; i++) {
      const { address1, client_id, city } = updatedRows[i];
      if (!address1 || !client_id || !city ) {
        this.props.loadMessage(
          { ok:false,
            status: 'Missing Data for '+updatedRows[i].job_number,
            statusText: "Missing Address, Client, or City.  Please fill in"
          }, "ERROR");
        dataOk = false;
        break;
      }
    }

    // Testing to make sure all the edited projects still have
    // an address, client, and city.
    if (dataOk) {
      for (let i=0; i<updatedRows.length; i++) {
        // console.log('all is ok right now.  State:', updatedRows[i]);
        if (andCommit) {
          updatedRows[i].status = 'ACTIVE';
          this.props.commitAddresses(this.props.session.id, updatedRows, true, true, true);
        } else {
          updatedRows[i].status = 'PENDING';
          this.props.createAddress(updatedRows[i], true, true);
        }
      }
    }  // if dataOk

  }  // end of function

  handleDelete = (row)=> {
    // console.log('Delete project ', row);
    // console.log('Inspection Dialog: handleDelete', this.state);
    this.props.ynDialog(
      {
        ok: false,
        title: 'Delete Project?',
        content: `Are you sure you want to Project ${this.props.search.findResults[row].address1}`,
        yesFunc: ()=>{
          this.props.deleteProject(this.props.search.findResults[row].id);
        },
        noFunc: false
      }
    )
    // this.props.deleteProject(this.props.search.findResults[row].id);
  }

  dupSelectClose = (project) => {
    this.setState(project);
  }

  dupsDialogClose = () => {
    this.setState({ openDupsDialog: false });
  }

  render() {
    const { currentViews } = this.props;
    // const { classes, currentViews, width, currentProject, search } = this.props;
    // console.log('Search Render:',
      // 'state:', this.state,
    //   'currentProject:', currentProject,
    //   'currentViews:', currentViews,
    //   'find:', search.find,
    //   'findResults:', search.findResults,
    //   'recents', search.recentsResults,
    //   'dups:', this.props.dups
    // );

    if (this.state.redirectUrl) {
      // console.log('also here');
      return (<Redirect to={this.state.redirectUrl} />)
    }

    // Test to make sure we can render Screen.  Only set to true when
    // currentProject and currentViews are populated.
    // If currentProject is empty, go back to Main menu.

    if (!this.state.renderScreen) {
      // console.log('loading...');
      // test for empty Project object.  If so, user refreshed browser.  Go back to main menu.
      // if (this.props.currentProject.constructor === Object && Object.keys(this.props.currentProject).length === 0) {
      //   return (
      //     <Redirect to={'/'} />
      //   );
      // }
      return null;
    }

    if (this.props.currentProject.job_number) {
      return (
        <Redirect to={this.props.currentProject.url} />
      );
    }

    let currentView = [];
    // if (currentViews.children) {
    //   currentView = currentViews.children.filter((view) => view.category === this.state.currentView)  // array of subviews (sections) that make up whole view.
    // }
    if (currentViews.length > 0) {
        currentView = currentViews.filter((view) => view.category === this.state.currentView)  // array of subviews (sections) that make up whole view.
    } else {
      return null;
    }

    const title = currentView[0].label;


    // console.log('currentView', currentView);

    // could have multiple subviews.
    // viewChildren is a recursive function that gets all objects to
    // build the screen.  Places objects in array childArr.
    // currentView.forEach(view => this.viewChildren(view.children));

    return (
      <CePageContainer
        title={title}
        topActionBarLeft={this.topActionBarLeft}
        topActionBarRight={this.topActionBarRight}
        bottomActionBar={this.bottomActionBar}
      >
        {currentView.map((view,vid)=>{  // loop on views
          return (
            view.children.map((group,gid)=>{  // loop on objects in views.  Usually field groups.
            switch (group.name) {
              case 'search_results':
                const fChildren = group.children.filter((field) => field.entity_type === 'FIELD')  // array of fields minus sub field groups.
                const fgChildren = group.children.find((field) => field.entity_type === 'FIELD_GROUP')  // Find the first (and only) field group.
                const updGroup = Object.assign({},group,{children:fChildren});
                // console.log('search_results', fChildren, fgChildren, group);
                return(<SearchTabularFG
                        key={gid}
                        fieldGroup = {updGroup}
                        parentState = {this.state}
                        data = {this.props.search.findResults}
                        updateState = {this.updateState}
                        subGroupKey = 'scope'
                        subFG = {fgChildren}
                        fgTools={this.fieldGroupToolsTabular}
                        handleSave={this.handleSave}
                        handleDelete={this.handleDelete}
                      />)
                // break;
              case 'search_criteria':
                return(<DefaultFG
                        key={gid}
                        fieldGroup = {group}
                        state = {this.state}
                        updateState = {this.updateState}
                        hide={this.state.showSearchByFields} // Show Find.  Hide Search By Fields
                        fgTools={this.fieldGroupTools}
                      />)
                // break;
              case 'search_criteria_fields':
                return(<DefaultFG
                        key={gid}
                        fieldGroup = {group}
                        state = {this.state}
                        updateState = {this.updateState}
                        hide={!this.state.showSearchByFields} // Hide Find.  Show Search By Fields
                        fgTools={this.fieldGroupTools}
                        fieldTools={this.fieldTools}
                      />)
                // break;
              default:
                return(<DefaultFG
                        key={gid}
                        fieldGroup = {group}
                        state = {this.state}
                        updateState = {this.updateState}
                        hide={false}
                      />)
            }  // switch
          }))  // function-map-return
        })    // function-map  jsx below.
        }
        {this.props.dups.length > 0  &&
        this.state.openDupsDialog &&
        <DupsDialogContainer
          open = {this.props.dups.length > 0}
          onSelectAndClose = {false}
          onClose = {this.dupsDialogClose}
          curRec = {this.state.dupRec}
          selectAllowed = {false}
        />}
      </CePageContainer>
    )

  }  // render
}  // Component


export default withWidth()(withStyles(styles, { withTheme: true })(Search));
