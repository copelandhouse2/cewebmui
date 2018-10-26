import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom"

const styles = {
  root: {

  },
}
class theNavbar extends React.Component {

  render() {

    return (
      <AppBar position="static">
        <Toolbar>

        </Toolbar>
      </AppBar>
    );
  }
}

theNavbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(theNavbar);