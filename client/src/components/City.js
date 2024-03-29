import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
// import { withNavigationFocus } from 'react-navigation';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withWidth } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
// import AddIcon from '@material-ui/icons/Add';
// import Checkbox from '@material-ui/core/Checkbox';

import { DefaultFG, MaterialTabularFG } from './ceFieldGroup';
// import { Field2Container } from '../containers/ceFieldContainer';
// import { ScopeSelectionContainer } from '../containers/ceScopeSelectionContainer';
import CePageContainer from '../containers/cePageContainer';

// import IconButton from '@material-ui/core/IconButton';
// import SettingsIcon from '@material-ui/icons/Settings';

// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from '@material-ui/core/Switch';

// import fullView from '../img/fullView.svg';
// import listView from '../img/listView.svg';
// import columnView from '../img/columnView2.svg';

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

class City extends Component {
  constructor(props) {
    super(props);

    this.state = {
      object: 'CITY',
      renderScreen: false,
      currentMenuID: this.props.currentViews.id,
      currentView: this.props.VIEW || 'DEFAULT',
      saveValue: '', // stores previous values of address/lot/block to test for change      selectedIndexes: [],
      // selectedIndexes: [],
      selected: null,
      redirectUrl: null,
      created_by: this.props.session.id,
      last_updated_by: this.props.session.id,
    };

    this.initState = { ...this.state };
  }

  componentDidMount = () => {
    // console.log('CDM Search');

    if (this.props.currentViews.name !== 'city_maint') this.props.loadViewsByName('city_maint');
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log('gDSFP');
    const { currentViews } = nextProps;
    // console.log('gDSFP: nextProps', currentViews);

    // If the views object is populated, activate the screen render toggle.
    // currentViews is populated: from the menu, selecting a project.
    // if (!prevState.renderScreen && currentViews.name === 'city_maint' && currentViews.constructor === Object && Object.keys(currentViews).length !== 0) {
    //   return {renderScreen: true };
    // }
    if (!prevState.renderScreen && currentViews.length > 0) {
      if (currentViews.findIndex((view) => view.category === 'DEFAULT') > -1) {
        return { renderScreen: true };
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
  };

  // actions that show on top of page.  Right side next to Recents
  topActionBarRight = () => {
    return null;
  };

  // actions that show on bottom of page
  bottomActionBar = () => {
    const { classes } = this.props;

    return (
      <Grid container justify='flex-end' style={{ marginTop: 10, marginBottom: 10 }} spacing={16}>
        <Grid item className={classes.grow}>
          <Link to={`/`} className={classes.linkStyle}>
            <Button title='Return to menu' variant='contained' size='small' color='secondary'>
              Cancel
            </Button>
          </Link>
        </Grid>
      </Grid>
    );
  };

  // actions that show in field group title bar
  fieldGroupTools = () => {
    return null;

    // return (
    //   <Tooltip title={`Manage fields`} aria-label='Settings'>
    //     <IconButton aria-label='Field Group Settings' onClick={()=>{}}>
    //       <SettingsIcon className={classes.settings} />
    //     </IconButton>
    //   </Tooltip>
    // )

    // return (
    //   <FormControlLabel
    //     control={
    //       <Switch
    //         checked={this.state.showSearchByFields}
    //         onChange={(e)=>{this.handleSwitch(e)}}
    //         value='showSearchByFields'
    //       />
    //     }
    //     label={this.state.showSearchByFields?'Back to Find Field':'Show Fields'}
    //   />
    // )
  };

  fieldGroupToolsTabular = () => {
    // const { classes, theme, width } = this.props;

    return null;
    // return (
    //   <Field2Container
    //     field = {this.scopeField}
    //     scopeID = {false}
    //     state = {this.state}
    //     updateState = {this.updateState}
    //     // turns off dup check, creating client,city,sub via list
    //     searchMode={true}
    //     // props that are not used.
    //     handleListChange={false}
    //     handleFocus={false}
    //     handleBlur={false}
    //     // call to create new client, city, sub
    //     createDialogValue={false}
    //   />
    // )
  };

  // actions that show next to / below fields in field group
  fieldTools = () => {
    return (
      <Grid item>
        <Button title='Find records' variant='contained' size='small' color='secondary' onClick={this.findClients}>
          Search
        </Button>
      </Grid>
    );
  };

  updateState = (updatedValues) => {
    console.log('updateState', updatedValues);
    this.setState(updatedValues);
  };

  // handleSelected = () => {
  //   // console.log('In the handleSelected', this.state.selectedIndexes[0]);
  //   if (this.state.selectedIndexes[0] > -1) {  // gets 0 and above.
  //     // console.log('In the if');
  //     this.props.updateGeotech(this.props.geoSearch.findResults[this.state.selectedIndexes[0]]);
  //     // this.props.clearDups();  // in container
  //   } else {  // user selected first row (index = 0) which was the curent entry
  //     // console.log('In the else');
  //     // this.props.clearDups();  // in container
  //   }
  // }

  // Only called by Search button.
  findCities = () => {
    // console.log('find cities');
    this.props.findCities(this.state.find);
  };

  handleSave = (updatedRows) => {
    // let updated = updatedRows.filter(r=>{if (r) return r});
    console.log('City handle Save', updatedRows);

    // Testing to make sure all the edited projects still have
    // an address, client, and city.
    let dataOk = true;
    for (let i = 0; i < updatedRows.length; i++) {
      const { city_name, state_prov, country } = updatedRows[i];
      if (!city_name) {
        this.props.loadMessage({ ok: false, status: 'Missing Data', statusText: 'Missing city name.  Please fill in' }, 'ERROR');
        dataOk = false;
        break;
      }
      if (!state_prov || !country) {
        this.props.loadMessage({ ok: false, status: 'Missing Data', statusText: 'Missing State or Country.  Please fill in' }, 'ERROR');
        dataOk = false;
        break;
      }
    }

    // Testing to make sure all the edited projects still have
    // an address, client, and city.
    if (dataOk) {
      // for (let i=0; i<updatedRows.length; i++) {
      //   // console.log('all is ok right now.  State:', updatedRows[i]);
      //   this.props.saveGeotechs(updatedRows[i]);
      // }
      this.props.saveCities(updatedRows);
    } // if dataOk
  }; // end of function

  handleDelete = (row) => {
    // console.log('Delete client ', row, row-1);

    // This module supports an INSERT row as first row.  Must take into consideration
    // that row passed will be based on the array id with insert row as first row
    // Therefore need to subtract 1 to get right value for props geos array.
    this.props.deleteCity(this.props.citySearch.findResults[row - 1].id);
  };

  render() {
    const { currentViews, citySearch } = this.props;
    // const { classes, currentViews, width, currentProject, search } = this.props;
    // console.log('Client Render:',
    // 'state:', this.state,
    // 'currentViews:', currentViews,
    // 'props Geos', this.props.geos,
    // 'props geoSearch', this.props.geoSearch,
    // );

    // if someone clicks recents and wants to navigate to project screen.
    if (this.props.currentProject.url && this.props.currentProject.address1) {
      // console.log('the url',this.props.currentProject.url);
      return <Redirect to={this.props.currentProject.url} />;
    }

    // Test to make sure we can render Screen.  Only set to true when
    // currentProject and currentViews are populated.
    // If currentProject is empty, go back to Main menu.
    if (!this.state.renderScreen) {
      // console.log('loading...');
      return null;
    }

    let currentView = [];
    // if (currentViews instanceof Array) {
    //   if (currentViews.children) {
    //     currentView = currentViews.children.filter((view) => view.category === this.state.currentView)  // array of subviews (sections) that make up whole view.
    //   }
    // } else {
    //   currentView.push(currentViews);
    // }
    if (currentViews.length > 0) {
      currentView = currentViews.filter((view) => view.category === this.state.currentView); // array of subviews (sections) that make up whole view.
    } else {
      return null;
    }
    const title = currentView[0].label;
    // console.log('currentView', currentView);

    // Supporting an INSERT row.
    // let data = clientSearch.find?[...clientSearch.findResults]:[...clients];
    // let data = citySearch.find?[...citySearch.findResults]:[...cities];
    let data = [...citySearch.findResults];

    data.unshift({});

    return (
      <CePageContainer
        title={title}
        topActionBarLeft={this.topActionBarLeft}
        topActionBarRight={this.topActionBarRight}
        bottomActionBar={this.bottomActionBar}>
        {
          currentView.map((view, vid) => {
            // loop on views
            return view.children.map((group, gid) => {
              // loop on objects in views.  Usually field groups.
              switch (group.name) {
                case 'city_results':
                  return (
                    <MaterialTabularFG
                      key={gid}
                      fieldGroup={group}
                      fgStyles={{ marginTop: 10, marginBottom: 0, borderTop: '1px solid black' }}
                      parentState={this.state}
                      data={data}
                      updateState={this.updateState}
                      // fgTools={this.fieldGroupToolsTabular}
                      allowAdd={true}
                      handleSave={this.handleSave}
                      handleDelete={this.handleDelete}
                      saveHelp='Save the city'
                      editHelp='Edit the city'
                      deleteHelp='Delete the city'
                    />
                  );
                // break;
                case 'search_criteria':
                  return (
                    <DefaultFG
                      key={gid}
                      fieldGroup={group}
                      state={this.state}
                      updateState={this.updateState}
                      fgTools={this.fieldGroupTools}
                      findAction={this.findCities}
                    />
                  );
                // break;
                default:
                  return (
                    <DefaultFG
                      key={gid}
                      fieldGroup={group}
                      state={this.state}
                      updateState={this.updateState}
                      hide={false}
                      findAction={this.findCities}
                    />
                  );
              } // switch
            }); // function-map-return
          }) // function-map  jsx below.
        }
      </CePageContainer>
    ); // return
  } // render
} // Component

export default withWidth()(withStyles(styles, { withTheme: true })(City));
