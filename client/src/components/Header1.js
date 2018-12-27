import React from "react";
import { AppBar, Toolbar, Typography } from '@material-ui/core';


export default props => {
  return (
    <AppBar position="static">
    <Toolbar>
      <Typography variant="headline" color="inherit">
        Starts
      </Typography>
    </Toolbar>
  </AppBar>
  );
}