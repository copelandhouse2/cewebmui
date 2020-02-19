import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from "react-router-dom"
import Drawer from '@material-ui/core/Drawer';

import { SingleViewContainer, TabularViewContainer, GuidedViewContainer } from '../containers/ceViewsContainer';
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


class ProjectCustom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuID: this.props.currentProject.categoryID,
      currentView: 'SINGLE',  // default view.
      recentsDrawerOpen: false,
      findDrawerOpen: false,
      drawerWidth: 300,
    };
  }

  promiseFn = theFunction => {
    return new Promise((resolve, reject) => {
        resolve(theFunction);
    })
  };

  // In CDM, we load the views given the categoryID
  componentDidMount = () => {

    if (this.props.currentProject.categoryID) {
      // console.log('CDM: outside async', this.props.currentProject, this.state);
      this.props.loadViews(this.props.currentProject.categoryID);
    }

    // (async () => {
    //   try {
    //     const { categoryID } = this.props.currentProject;
    //     await this.promiseFn(this.props.loadCurrentView(categoryID));
    //   } catch (err) {
    //     console.log('Error: ', err);
    //   }
    //
    // })();

  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { currentProject, loadViews } = nextProps;

    // console.log('in ProjectCustom getDerivedStateFromProps');
    // console.log('nextProps', currentProject);
    // console.log('prevState', prevState);
    if (currentProject.categoryID && prevState.menuID !== currentProject.categoryID ) {
      // console.log('CDM: outside async', this.props.currentProject, this.state);
      loadViews(currentProject.categoryID);
      return ( {menuID: currentProject.categoryID} )
    }
    return null;
  }

  handleViewButton = (view) => {
    // console.log('new view', view);
    this.setState( { currentView: view } );
  }

  toggleDrawer = (drawer) => {
    // console.log('new view', view);
    drawer === 'recents'? this.setState( { recentsDrawerOpen: !this.state.recentsDrawerOpen } ) : null;
    drawer === 'find'? this.setState( { findDrawerOpen: !this.state.findDrawerOpen } ) : null;
  }

  render() {

    // console.log('Project Custom', this.state);
    // console.log('Project Custom: currentMenu', this.props.currentMenu);
    // console.log('Project Custom: currentViews', this.props.currentViews);
    const { classes } = this.props;

    if (!this.props.currentMenu.id) {  // tests for refresh.  currentMenu will be null then and go back to menu.
      console.log('REDIRECTING...')
      return (
        <Redirect to={'/'} />
      );
    }

    return (
      <div>
        {this.state.currentView === 'SINGLE' &&
          <SingleViewContainer
            handleViewButton = {this.handleViewButton}
            toggleDrawer = {this.toggleDrawer}
            toggleScopeDialog = {this.toggleScopeDialog}
          /> }
        {this.state.currentView === 'TABULAR' &&
          <TabularViewContainer
            handleViewButton = {this.handleViewButton}
            toggleDrawer = {this.toggleDrawer}
            toggleScopeDialog = {this.toggleScopeDialog}
          /> }
        {this.state.currentView === 'GUIDED' &&
          <GuidedViewContainer
            handleViewButton = {this.handleViewButton}
            toggleDrawer = {this.toggleDrawer}
            toggleScopeDialog = {this.toggleScopeDialog}
          /> }
        <Drawer
          anchor='right'
          open={this.state.recentsDrawerOpen}
          onClose={() => this.toggleDrawer('recents')}
          classes={ {paper: classes.recentsDrawer } }
        >
          <RecentsContainer />
        </Drawer>
        <Drawer
          anchor='top'
          open={this.state.findDrawerOpen}
          onClose={() => this.toggleDrawer('find')}
          classes={ {paper: classes.findDrawer } }
        >
          <FindContainer />
        </Drawer>
      </div>
    )
  }  // render

}  // Component

export default withStyles(styles, { withTheme: true })(ProjectCustom);
