import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withWidth } from "@material-ui/core";

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';

import RecentsContainer from '../containers/RecentsContainer';
import FindContainer from '../containers/FindContainer';
import { Field2Container } from '../containers/ceFieldContainer';

// import { Redirect } from "react-router-dom"

const drawerWidth = 300;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  container: {
    width: '90%',
    margin: 'auto',
  },
  actionBarContainer: {
    padding: '10px 0px 5px',
    backgroundColor: theme.palette.secondary.light,
  },
  firstAction: {
    marginLeft: '5%',
  },
  lastAction: {
    marginRight: '5%',
  },
  titleText: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main
  },
  imageSrc: {
    height: 16,
    color: theme.palette.secondary.contrastText,
    fill: theme.palette.secondary.contrastText,
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
  },
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

class CePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recentsDrawerOpen: false,
      findDrawerOpen: false,
      drawerWidth: 300,
    };
  }

  componentDidMount = () => {
    // console.log('CDM: CePage');
    this.props.setPageTitle(this.props.title);
  }

  updateState = (updatedValues) => {
    // console.log('updateState', updatedValues);
    this.setState(updatedValues);
  }

  toggleDrawer = (drawer) => {
    // console.log('drawer', drawer);
    if (drawer === 'recents') this.setState( { recentsDrawerOpen: !this.state.recentsDrawerOpen } );
    if (drawer === 'find') this.setState( { findDrawerOpen: !this.state.findDrawerOpen } );
  }

  render() {
    const { classes, width, findField, topActionBarLeft, topActionBarRight, bottomActionBar } = this.props;

    return (
      <Fragment>
        <Grid container
          justify='space-between'
          className={classes.actionBarContainer}
        >
          <Grid item className={classes.firstAction}>
          { findField &&
            <Field2Container
              field = {{name: 'find', label: 'Find'}}
              addStyle = {classes.findField}
              scopeID = {false}
              state = {this.state}
              updateState = {this.updateState}
            />
          }
          </Grid>
          {topActionBarLeft()}
          <Grid item className={classes.grow} />
          {topActionBarRight()}
          {(width !== 'xs' && width !== 'sm') &&
          <Grid item className={classes.lastAction}>
            <Button
              variant="contained"
              color="secondary"
              size='small'
              onClick={() => this.toggleDrawer('recents')}
            >
              Recents
            </Button>
          </Grid>
          }
        </Grid>

        <Grid container justify='center' spacing={8} className={classes.container} >
          {this.props.children}

          {bottomActionBar()}
        </Grid>

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

      </Fragment>
    );
  }
}

export default withWidth()(withStyles(styles, { withTheme: true })(CePage));
