import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import {
  Home
  // , Person
  // , Contacts
  // , Dashboard
  , Settings
  , LocationCity
  , PermContactCalendar
  // , SupervisorAccount
  , BusinessCenter
  , Apps
} from "@material-ui/icons";
import { Link } from "react-router-dom"

// alignItems="center"
// justify="center"
const styles = theme => ({
  Paper: {
    // padding: 5,
    [theme.breakpoints.up("md")]: {
      // height: "84vh",
      // minHeight: '84vh',
    },
  },
  icon: { fontSize:"1.2em",
    // color:theme.palette.secondary.dark
  },
  navbarGrid: {
    // [theme.breakpoints.up("xs")]: {
    //   direction: "row",
    // },
    [theme.breakpoints.up("xs")]: {
      flexDirection: "column",
      // alignContent: "flex-start",
      alignItems: "center",
      justifyContent: "flex-start",
    }
  }
});

function Navbar(props) {

  const { classes } = props;

  return (
    <div className={classes.Paper}>
      {/* <Toolbar> */}
        <Grid container className={classes.navbarGrid} >

          <Grid item>
            <Tooltip title="Welcome" placement="left">
              <div>
              <Link to={`/`}>
                <IconButton color='secondary'>
                  {/* <Dashboard /> */}
                  <Apps className={classes.icon}/>
                </IconButton>
              </Link>
              </div>
            </Tooltip>
          </Grid>

          {// <Grid item>
          //   <Tooltip title="Welcome" placement="left">
          //     <div>
          //     <Link to={`/`}>
          //
          //       <IconButton color="secondary" className={classes.icon}
          //         onClick={ (e) => props.toggleWelcomeScreen(true) }
          //       >
          //         {/* <Dashboard /> */}
          //         <Apps className={classes.icon}/>
          //       </IconButton>
          //     </Link>
          //     </div>
          //   </Tooltip>
          // </Grid>
          }

          <Grid item>
            <Tooltip title="Dashboard" placement="left">
              <div>
              <Link to={`/dashboard`}>
                <IconButton color='secondary' className={classes.icon}>
                  {/* <Dashboard /> */}
                  <i className="fas fa-tachometer-alt" />
                </IconButton>
              </Link>
              </div>
            </Tooltip>
          </Grid>

          <Grid item>
            <Tooltip title="Starts Entry" placement="left">
              <Link to={`/projectmgmt`}>
                <IconButton color='secondary'>
                  <Home className={classes.icon}/>
                {/* <i className="fas fa-home"></i> */}
                </IconButton>
              </Link>
            </Tooltip>
          </Grid>

          <Grid item>
            <Tooltip title="Investigation" placement="left">
              <div>
              <IconButton disabled>
                <i className="fas fa-house-damage classes.icon"></i>
              </IconButton>
              </div>
            </Tooltip>
          </Grid>

          <Grid item>
            <Tooltip title="Clients" placement="left">
              <div>
              <IconButton disabled>
                {/* <SupervisorAccount /> */}
                <BusinessCenter className={classes.icon} />
                {/* <i className="fas fa-user-tie"></i> */}
              </IconButton>
              </div>
            </Tooltip>
          </Grid>

          <Grid item>
            <Tooltip title="Contacts" placement="left">
              <div>
              <IconButton color="secondary" disabled>
                <PermContactCalendar className={classes.icon}/>
              </IconButton>
              </div>
            </Tooltip>
          </Grid>

          <Grid item>
            <Tooltip title="City/Sub Maint" placement="left">
              <div>
              <IconButton color="secondary" disabled>
                <LocationCity className={classes.icon}/>
                {/* <i style={ {fontSize:"1em"} } className="fas fa-city"></i> */}
              </IconButton>
              </div>
            </Tooltip>
          </Grid>

          <Grid item>
            <Tooltip title="Settings" placement="left">
              <div>
              <IconButton color="secondary" disabled>
                <Settings className={classes.icon}/>
              </IconButton>
              </div>
            </Tooltip>
          </Grid>
        </Grid>
      {/* </Toolbar> */}
    </div>
  );
}

export default withStyles(styles)(Navbar);
