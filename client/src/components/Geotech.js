import React, { Component } from 'react';
import { Redirect, Link } from "react-router-dom"
// import { withNavigationFocus } from 'react-navigation';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withWidth } from "@material-ui/core";

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
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
    // console.log('CDM Search');
    // if (this.state.currentMenuID) {
    //   console.log('CDM: currentProject populated', this.props.currentProject, this.state);
    //   this.props.loadViews(this.state.currentMenuID);
    //   // this.props.loadFind('clear');
    // }
    if (this.props.currentViews.name !== 'update') this.props.loadViewsByName('update');
    this.scopeField = this.props.avffControls.find(control=>control.entity_type === 'FIELD' && control.name === 'scope');
    this.scopeField.display_width = 3;

    // console.log('scope field', this.scopeField);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log('gDSFP');
    const { currentViews } = nextProps;
    // console.log('gDSFP: nextProps', currentViews, VIEW);

    // If the views object is populated, activate the screen render toggle.
    // currentViews is populated: from the menu, selecting a project.
    if (currentViews.name === 'update' && currentViews.constructor === Object && Object.keys(currentViews).length !== 0) {
      return {renderScreen: true };
    }

    return null;
  }

  // actions that show on top of page
  topActionBar = () => {
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

  // actions that show on bottom of page
  bottomActionBar = () => {

    const { classes } = this.props;

    return (
    <Grid container justify="flex-end" style={{marginTop: 10, marginBottom: 10}} spacing={16}>

      <Grid item className={classes.grow}>
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
    // const { classes, theme, width } = this.props;
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
    this.props.deleteProject(this.props.search.findResults[row].id);
  }

  render() {
    const { currentViews } = this.props;
    // const { classes, currentViews, width, currentProject, search } = this.props;
    // console.log('Geotech Render:',
    //   'state:', this.state,
    //   // 'currentProject:', currentProject,
    //   // 'currentViews:', currentViews,
    // );

    // Test to make sure we can render Screen.  Only set to true when
    // currentProject and currentViews are populated.
    // If currentProject is empty, go back to Main menu.
    if (!this.state.renderScreen) {
      // console.log('loading...');
      return null;
    }

    let currentView = [];
    if (currentViews.children) {
      currentView = currentViews.children.filter((view) => view.category === this.state.currentView)  // array of subviews (sections) that make up whole view.
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
        topActionBar={this.topActionBar}
        bottomActionBar={this.bottomActionBar}
      >
        {currentView.map((view,vid)=>{  // loop on views
          return (
            view.children.map((group,gid)=>{  // loop on objects in views.  Usually field groups.
            switch (group.name) {
              case 'search_results':
                return(<MaterialTabularFG
                        key={gid}
                        fieldGroup = {group}
                        parentState = {this.state}
                        data = {this.props.search.findResults}
                        updateState = {this.updateState}

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
      </CePageContainer>
    )

  }  // render
}  // Component


export default withWidth()(withStyles(styles, { withTheme: true })(Search));
