import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withWidth } from '@material-ui/core';
import SettingsContainer from '../containers/SettingsContainer';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { AccountCircle } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
// import Paper from '@material-ui/core/Paper';

const styles = (theme) => ({
  root: {},
  // AppBar: {marginBottom: 10, zIndex: theme.zIndex.drawer+1,},
  AppBar: {
    height: 60,
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: {
    zIndex: theme.zIndex.drawer + 2,
  },
  menu: {
    zIndex: theme.zIndex.drawer + 3,
  },
  grow: {
    flexGrow: 1,
  },
  grow2: {
    flexGrow: 1.5,
    [theme.breakpoints.down('sm')]: {
      flexGrow: 1,
    },
  },
  icon: {
    fontSize: '1.5em',
  },
  paper: {
    backgroundColor: theme.palette.primary.main,
    padding: '0px 30px',
  },
  pageTitleContainer: {
    position: 'absolute',
  },
  pageTitle: {
    color: theme.palette.primary.contrastText,
    verticalAlign: 'middle',
    fontStyle: 'italic',
  },
});

class Header extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
    settings: false,
  };

  handleChange = (event) => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleSettings = () => {
    this.setState({ settings: !this.state.settings, anchorEl: null });
  };

  render() {
    const { classes, width } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    // console.log('header', currentMenu, currentViews, currentProject);

    return (
      <Fragment>
        <AppBar className={classes.AppBar}>
          <Grid container justify='center' alignItems='center' className={`${classes.AppBar} ${classes.pageTitleContainer}`}>
            <Grid item>
              <Typography variant='h4' className={classes.pageTitle}>
                {this.props.pageTitle || 'Welcome'}
              </Typography>
            </Grid>
          </Grid>

          <Toolbar>
            <IconButton color='inherit' aria-label='Open drawer' onClick={this.props.toggleDrawer} className={classes.toolbar}>
              {this.props.navOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>

            <Typography
              variant='h5'
              color='inherit'
              // className={classes.grow}
            >
              {width === 'sm' || width === 'xs' ? 'CE Tools' : 'Copeland Engineering Webtools'}
            </Typography>

            <div className={classes.grow} />

            <Typography variant='body2' color='inherit'>
              Welcome {this.props.session.first_name}
            </Typography>
            <IconButton
              aria-owns={open ? 'menu-navbar' : undefined}
              aria-haspopup='true'
              onClick={this.handleMenu}
              color='inherit'
              className={classes.toolbar}>
              <AccountCircle className={classes.icon} />
            </IconButton>
            <Menu
              id='menu-navbar'
              anchorEl={anchorEl}
              // anchorOrigin={{
              //   vertical: 'top',
              //   horizontal: 'right',
              // }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={this.handleClose}>
              <MenuItem onClick={this.handleSettings}>Settings</MenuItem>
              <MenuItem onClick={this.props.signOut}>Log Out</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <SettingsContainer open={this.state.settings} handleClose={this.handleSettings} updateAccentColor={this.props.updateAccentColor} />
      </Fragment>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withWidth()(withStyles(styles)(Header));
