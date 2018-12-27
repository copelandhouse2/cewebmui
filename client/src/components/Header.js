import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { Link } from "react-router-dom"

const styles = {
  root: {},
  grow: {flexGrow: 1,},
  icon: { fontSize:"1.5em" },
}
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

    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="headline"
            color="secondary"
            className={classes.grow}
          >
            Copeland Engineering Webtools
          </Typography>
          <IconButton 
            aria-owns={open ? 'menu-navbar' : undefined}
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="secondary"
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
            <MenuItem>Log Out</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);