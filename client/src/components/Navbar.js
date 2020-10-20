import React from "react";
import { withStyles } from '@material-ui/core/styles';
// import { withWidth } from "@material-ui/core";

import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Divider from "@material-ui/core/Divider";

import {
  // Home
  // , Person
  // , Contacts
  // , Dashboard
  // , Settings
  LocationCity
  // , PermContactCalendar
  // , SupervisorAccount
  , BusinessCenter
  , Apps
} from "@material-ui/icons";
import { Link } from "react-router-dom"

import { Geotech } from '../img/geotech';

import Sub from '../img/sub';

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

  const { classes, theme } = props;
  // console.log('the theme',theme);
  return (
    <div className={classes.Paper}>

        <Grid container className={classes.navbarGrid} >

          <Grid item>
            <Tooltip title="Welcome" placement="left">
              <div>
              <Link to={`/`}>
                <IconButton color='secondary' >
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

          {
          // <Grid item>
          //   <Tooltip title="Dashboard" placement="left">
          //     <div>
          //     <Link to={`/dashboard`}>
          //       <IconButton color='secondary' className={classes.icon}>
          //         {/* <Dashboard /> */}
          //         <i className="fas fa-tachometer-alt" />
          //       </IconButton>
          //     </Link>
          //     </div>
          //   </Tooltip>
          //   <Divider />
          // </Grid>
          }

          {
          // <Grid item>
          //   <Tooltip title="Starts Entry" placement="left">
          //     <Link to={`/projectmgmt`}>
          //       <IconButton color='secondary'>
          //         <Home className={classes.icon}/>
          //       {/* <i className="fas fa-home"></i>*/}
          //       </IconButton>
          //     </Link>
          //   </Tooltip>
          // </Grid>
          }
          {
          // <Grid item>
          //   <Tooltip title="Investigation" placement="left">
          //     <div>
          //     <IconButton disabled>
          //       <i className="fas fa-house-damage classes.icon"></i>
          //     </IconButton>
          //     </div>
          //   </Tooltip>
          // </Grid>
          }
          <Grid item>
            <Divider />
            <Tooltip title="Clients" placement="left">
              <div>
              <Link to={`/client`}>
              <IconButton color='secondary' >
                {/* <SupervisorAccount /> */}
                <BusinessCenter className={classes.icon}/>
                {/* <i className="fas fa-user-tie"></i> */}
              </IconButton>
              </Link>
              </div>
            </Tooltip>
          </Grid>

          {
          // <Grid item>
          //   <Tooltip title="Contacts" placement="left">
          //     <div>
          //     <IconButton color="secondary" disabled>
          //       <PermContactCalendar className={classes.icon}/>
          //     </IconButton>
          //     </div>
          //   </Tooltip>
          // </Grid>
          }

          <Grid item>
            <Tooltip title="Cities" placement="left">
              <div>
              <Link to={`/city`}>
              <IconButton color="secondary" >
                <LocationCity className={classes.icon}/>
                {/* <i style={ {fontSize:"1em"} } className="fas fa-city"></i> */}
              </IconButton>
              </Link>
              </div>
            </Tooltip>
          </Grid>

          <Grid item>
            <Tooltip title="Subdivisions" placement="left">
              <div>
              <Link to={`/subdivision`}>
              <IconButton color="secondary" className={classes.icon}>
                <Sub size={32} color={theme.palette.secondary.main}  />
                {/* <i style={ {fontSize:"1em"} } className="fas fa-city"></i> */}
              </IconButton>
              </Link>
              </div>
            </Tooltip>
          </Grid>
          {
          // <Grid item>
          //   <Tooltip title="Settings" placement="left">
          //     <div>
          //     <IconButton color="secondary" disabled>
          //       <Settings className={classes.icon}/>
          //     </IconButton>
          //     </div>
          //   </Tooltip>
          // </Grid>
          }

          <Grid item>
            <Tooltip title="Geotechs" placement="left">
              <div>
              <Link to={`/geotech`}>
                <IconButton color="secondary" className={classes.icon} >
                  <Geotech size={36} color={theme.palette.secondary.main}  />
                </IconButton>
              </Link>
              </div>
            </Tooltip>
          </Grid>

        </Grid>

    </div>
  );
}

export default withStyles(styles, { withTheme: true })(Navbar);
// export default withWidth()(withStyles(styles, { withTheme: true })(Navbar));
