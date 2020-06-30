import React from "react";
import { withWidth } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
// import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { Copyright } from "@material-ui/icons";

const styles = theme => ({
  appBar: {
    // top: 'auto',
    // bottom: 0,
    // zIndex: theme.zIndex.drawer + 1,
    height: 60,
    // padding: 40,
    marginTop: -60,
  },
});

function Footer(props) {

  const { classes, width } = props;

  return (
    <AppBar position='relative' className={classes.appBar}>
      <Grid container justify='space-around' alignItems='center'>
        <Grid item>
          <Typography color="inherit">
            <Copyright />&nbsp;
            {width === "sm"||width === "xs" ? "2018 CE" : "2018 Copeland Engineering"}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton color="inherit">
            <i style={ {fontSize:"1.2em"} } className="fab fa-facebook-f"></i>
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton color="inherit">
            <i style={ {fontSize:"1.2em"} } className="fab fa-trello"></i>
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton color="inherit">
            <i style={ {fontSize:"1.2em"} } className="fas fa-box"></i>
          </IconButton>
        </Grid>

      </Grid>

    </AppBar>
  );
}

export default withWidth()(withStyles(styles)(Footer));
