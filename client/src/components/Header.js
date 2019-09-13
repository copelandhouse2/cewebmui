import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withWidth } from "@material-ui/core";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  root: {},
  // AppBar: {marginBottom: 10, zIndex: theme.zIndex.drawer+1,},
  AppBar: {height: 60},
  grow: {flexGrow: 1,},
  icon: { fontSize:"1.5em" },
});

class Header extends React.Component {

  state = {
    auth: true,
    anchorEl: null,
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {

    const { classes, width } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <AppBar className={classes.AppBar} >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={this.props.toggleDrawer}
          >
            {this.props.navOpen? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <Typography
            variant="h5"
            color="inherit"
            className={classes.grow}
          >
            {width === "sm"||width === "xs" ? "CE Tools" : "Copeland Engineering Webtools"}
          </Typography>
          <Typography
            variant="body2"
            color="inherit"
          >
            Welcome {this.props.session.first_name}
          </Typography>
          <IconButton
            aria-owns={open ? 'menu-navbar' : undefined}
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="inherit"
          >

            <AccountCircle className={classes.icon}/>
          </IconButton>
          <Menu
            id="menu-navbar"
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
            onClose={this.handleClose}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem onClick={this.props.signOut}>Log Out</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withWidth()(withStyles(styles)(Header));
