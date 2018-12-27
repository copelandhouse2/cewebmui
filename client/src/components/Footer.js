import React from "react";
import { Paper, withStyles, Grid, Typography, withWidth, IconButton } from "@material-ui/core";
import { Copyright } from "@material-ui/icons";

const styles = {
  Paper: { padding: 10, backgroundColor: "#212121"},
}

function Footer(props) {

  const { classes, width } = props;

  return (
    <Paper position="static" className={classes.Paper}>
      <Grid container>
        <Grid item xs>
          <Typography color="secondary">
            <Copyright />&nbsp;
            {width === "sm"||width === "xs" ? "2018 CE" : "2018 Copeland Engineering"}
          </Typography>
        </Grid>
        <Grid item xs>
          <IconButton color="secondary">
            <i style={ {fontSize:"1.2em"} } className="fab fa-facebook-f"></i>
          </IconButton>
        </Grid>
        <Grid item xs>
          <IconButton color="secondary">
            <i style={ {fontSize:"1.2em"} } className="fab fa-trello"></i>
          </IconButton>
        </Grid>
        <Grid item xs>
          <IconButton color="secondary">
            <i style={ {fontSize:"1.2em"} } className="fas fa-box"></i>
          </IconButton>
        </Grid>

      </Grid>

    </Paper>
  );
}

export default withWidth()(withStyles(styles)(Footer));