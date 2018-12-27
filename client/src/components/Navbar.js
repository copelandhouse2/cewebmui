import React from "react";
import { Paper, withStyles, IconButton, Toolbar, Divider, Tooltip } from "@material-ui/core";
import { Home, Person, Contacts, Dashboard, Settings, LocationCity, PermContactCalendar,
SupervisorAccount, BusinessCenter } from "@material-ui/icons";

const styles = {
  Paper: { padding: 5, marginTop: 10,  height: "84vh"},
  icon: { fontSize:"1.2em" },
}

function Navbar(props) {

  const { classes } = props;

  return (
    <Paper className={classes.Paper}>
      {/* <Toolbar> */}
        <Tooltip title="Dashboard" aria-label="Dashboard" placement="left">
          <IconButton color="secondary" className={classes.icon} disabled>
            {/* <Dashboard /> */}
            <i className="fas fa-tachometer-alt"></i>
          </IconButton>
        </Tooltip>

        <br />
        <Divider dark/>

        <Tooltip title="Starts Entry" aria-label="Starts Entry" placement="left">
          <IconButton color="secondary">
            <Home className={classes.icon}/>
            {/* <i className="fas fa-home"></i> */}
          </IconButton>
        </Tooltip>

        <br />

        <Tooltip title="Investigation" aria-label="Investigation" placement="left">
          <IconButton color="secondary" className={classes.icon} disabled>
            <i className="fas fa-house-damage classes.icon"></i>
          </IconButton>
        </Tooltip>

        <br />

        <Tooltip title="Clients" aria-label="Clients" placement="left">
          <IconButton color="secondary" disabled>
            {/* <SupervisorAccount /> */}
            <BusinessCenter className={classes.icon}/>
            {/* <i className="fas fa-user-tie"></i> */}
          </IconButton>
        </Tooltip>

        <br />

        <Tooltip title="Contacts" aria-label="Contacts" placement="left">
          <IconButton color="secondary" disabled>
            <PermContactCalendar className={classes.icon}/>
          </IconButton>
        </Tooltip>

        <br />
        
        <Tooltip title="City/Sub Maint" aria-label="City/Sub Maint" placement="left">
          <IconButton color="secondary" disabled>
            <LocationCity className={classes.icon}/>
            {/* <i style={ {fontSize:"1em"} } className="fas fa-city"></i> */}
          </IconButton>
        </Tooltip>

        <br />

        <Tooltip title="Settings" aria-label="Settings" placement="left">
          <IconButton color="secondary" disabled>
            <Settings className={classes.icon}/>
          </IconButton>
        </Tooltip>

      {/* </Toolbar> */}
    </Paper>
  );
}

export default withStyles(styles)(Navbar);