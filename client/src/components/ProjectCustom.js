import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from "react-router-dom"
import Drawer from '@material-ui/core/Drawer';

import { SingleViewContainer, GuidedViewContainer } from '../containers/ceViewsContainer';
// import { SingleViewContainer, TabularViewContainer, GuidedViewContainer } from '../containers/ceViewsContainer';
// import SearchContainer from '../containers/SearchContainer';

import RecentsContainer from '../containers/RecentsContainer';
import FindContainer from '../containers/FindContainer';

const drawerWidth = 300;

const styles = theme => ({
  recentsDrawer: {
    width: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: 400,
    },
    flexShrink: 0,
  },
  findDrawer: {
    width: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: 400,
    },
    flexShrink: 0,
    marginLeft: '10%',
    marginTop: 110
  },
});

// Two values determines the displayed view: Menu, View.
// First the Menu selection...
// (new) volume, (new) custom.  This loads these views
//   SINGLE, TABULAR, GUIDED.

class ProjectCustom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderScreen: false,
      currentMenuID: this.props.currentProject.categoryID,
      currentView: this.props.VIEW?this.props.VIEW:'DEFAULT',  // default view.
      recentsDrawerOpen: false,
      findDrawerOpen: false,
      drawerWidth: 300,
      // currentMenu: this.props.MENU,
    };
  }

  promiseFn = theFunction => {
    return new Promise((resolve, reject) => {
        resolve(theFunction);
    })
  };

  // In CDM, we load the views given the categoryID
  componentDidMount = () => {
    // console.log('Project Wrapper CDM');
    // console.log('currentMenu', this.props.currentMenu);
    // console.log('currentViews', this.props.currentViews);
    // console.log('currentProject', this.props.currentProject);

    // This code sets menu... either volume or custom.

    // ****** 20-05-21 Commented.  loadViews called at: from initial menu, updating project.
    // if (this.state.currentMenuID) {
    //   // console.log('CDM: outside async', this.props.currentProject, this.state);
    //   this.props.loadViews(this.state.currentMenuID);
    // }
    // ****** 20-05-21 Mods
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   const { currentMenu, currentViews, currentProject, loadViews, VIEW } = nextProps;
  //   console.log('Project Wrapper GDSFP');
  //   console.log('currentMenu', currentMenu);
  //   console.log('currentViews', currentViews, VIEW);
  //   console.log('currentProject', currentProject);
  //   console.log('prevState', prevState);
  //
  //   // When changing the project, this piece of code sets the appropriate menu.
  //   // volume or custom.  Only runs if current and project are different.
  //
  //   // ********* 20-05-21
  //   // if (currentProject.categoryID && prevState.currentMenuID !== currentProject.categoryID ) {
  //   //   console.log('GDSFP: new project', currentProject);
  //   //   loadViews(currentProject.categoryID);
  //   //   return ( {currentMenuID: currentProject.categoryID} )
  //   // }
  //   //
  //   // // If the views object is populated, activate the screen render toggle.
  //   // if (currentViews.constructor === Object && Object.keys(currentViews).length !== 0) {
  //   //   console.log('GDSFP: current View', currentViews);
  //   //   return {renderScreen: true };
  //   // }
  //   // ********* 20-05-21
  //
  //   return null;
  // }

  // not used yet.  Need to clean up.
  handleViewButton = (view) => {
    console.log('new view', view, this.props.currentProject);
    // clears the views array.  Will be filled in by next module called.
    // if (view === 'TABULAR') this.props.loadViews(null, null, true);
    this.setState( { currentView: view } );

    // This is only temporary.  Database does have different menu hierarchy
    // for Singular (DEFAULT) and Tabular views.
    switch(view) {
      case 'DEFAULT':
        console.log('Getting views for single entry');
        this.props.currentProject.categoryID?
          this.props.loadViews(this.props.currentProject.categoryID):
          this.props.loadViewsByName('volume');
        break;
      case 'TABULAR':
        console.log('Getting views for tabular');
        this.props.loadViewsByName('update');

        break;
      default:
        break;
    }
  }

  toggleDrawer = (drawer) => {
    // console.log('new view', view);
    if (drawer === 'recents') this.setState( { recentsDrawerOpen: !this.state.recentsDrawerOpen } );
    if (drawer === 'find') this.setState( { findDrawerOpen: !this.state.findDrawerOpen } );
  }

  closeDrawers = () => {
    // console.log('new view', view);
    this.setState( { recentsDrawerOpen: false, findDrawerOpen: false } );
  }

  render() {

    // console.log('Project Custom', this.state);
    // console.log('Project Custom: currentMenu', this.props.currentMenu);
    // console.log('Project Custom: currentViews', this.props.currentViews);
    // console.log('Project Custom: currentProject', this.props.currentProject);
    const { classes } = this.props;

    if (!this.props.currentMenu.id) {  // tests for refresh.  currentMenu will be null then and go back to menu.
      console.log('REDIRECTING...')
      return (
        <Redirect to={'/'} />
      );
    }

    return (
      <div>
        {this.state.currentView === 'DEFAULT' &&
          <SingleViewContainer
            handleViewButton = {this.handleViewButton}
            toggleDrawer = {this.toggleDrawer}
            closeDrawers = {this.closeDrawers}
            toggleScopeDialog = {this.toggleScopeDialog}
            VIEW={this.state.currentView}
          /> }
        {/*this.state.currentView === 'TABULAR' &&
          <SearchContainer
            VIEW='DEFAULT'
            handleViewButton = {this.handleViewButton}
          />
        */}
        {this.state.currentView === 'GUIDED' &&
          <GuidedViewContainer
            handleViewButton = {this.handleViewButton}
            toggleDrawer = {this.toggleDrawer}
            closeDrawers = {this.closeDrawers}
            toggleScopeDialog = {this.toggleScopeDialog}
          /> }
        <Drawer
          anchor='right'
          open={this.state.recentsDrawerOpen}
          onClose={() => this.toggleDrawer('recents')}
          classes={ {paper: classes.recentsDrawer } }
        >
          <RecentsContainer
            // onClose={() => this.toggleDrawer('find')}
          />
        </Drawer>
        <Drawer
          anchor='top'
          open={this.state.findDrawerOpen}
          onClose={() => this.toggleDrawer('find')}
          classes={ {paper: classes.findDrawer } }
        >
          <FindContainer
            // onClose={() => this.toggleDrawer('find')}
          />
        </Drawer>
      </div>
    )
  }  // render

}  // Component

export default withStyles(styles, { withTheme: true })(ProjectCustom);
