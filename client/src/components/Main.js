import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"
import { withStyles } from '@material-ui/core/styles';
import Navbar from "./Navbar";
import ProjectMgmtContainer from "../containers/ProjectMgmtContainer";
import HeaderContainer from "../containers/HeaderContainer";
import { IconButton, Drawer } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  toolbar2: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class Main extends Component {

  state = {
    open: false,
  };

  toggleDrawer = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <HeaderContainer toggleDrawer = {this.toggleDrawer}/>
        <Drawer
          open={this.state.open}
          variant='persistent'
          // anchor='left'
        >
          <div className={classes.toolbar2} />
          <Navbar />
        </Drawer>
        <div className={classes.toolbar2} />
        <ProjectMgmtContainer />
      </div>

    );

  }
}
export default withStyles(styles)(Main);


/* <div className="container-fluid">
  <div className="row">
    <div className="col-md-3">
      <CreateAddressContainer />
    </div>
    <div className="col-md-6">
      <AddressesContainer />
    </div>
  </div>
</div> */
