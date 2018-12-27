import React, { Component, Fragment } from "react";
// import { Grid, Row, Col, FormControl, Button, FormGroup, ControlLabel, InputGroup } from "react-bootstrap";
// import { Typeahead } from 'react-bootstrap-typeahead';
import PropTypes from 'prop-types';
import {
  Paper,
  TextField,
  Typography,
  withStyles,
  Tabs,
  Tab,
  Table,
  TableHead,
  TableRow,
  TableCell,
  AppBar,
  // TabContainer,
  MenuItem,
  IconButton,
  Tooltip,
  TableBody
} from '@material-ui/core';
import { Add, Delete, Edit } from "@material-ui/icons";
import red from '@material-ui/core/colors/red';
import Grid from '@material-ui/core/Grid';
import Downshift from 'downshift';
import Select from 'react-select';


const styles = {
  bodyPaper: { padding: 20, marginTop: 10, marginBottom: 10, height: "84vh"},
  Paper: { padding: 20, marginTop: 10, marginBottom: 10 },
  grow: { flexGrow: 0, },
  rightJust: { textAlign: "right", },

};

function TabContainer(props) {
  return (
    <div component="div" >
      {props.children}
    </div>
  );
}

class CreateStart extends Component {
  constructor() {
    super();
    this.state = {
      job_number: "",
      client_id: null,
      client: "",
      requestor_id: null,
      requestor: "",
      city_id: null,
      city: "",
      subdivision_id: null,
      subdivision: "",
      address1: "",
      address2: "",
      phase: "",
      section: "",
      lot: "",
      block: "",
      fnd_height_fr: null,
      fnd_height_fl: null,
      fnd_height_rr: null,
      fnd_height_rl: null,
      plan_type: "",
      elevation: "",
      masonry: null,
      garage_type: "",
      garage_entry: "",
      garage_swing: "",
      garage_drop: null,
      garage_extension: null,
      covered_patio: "",
      bay_window: "",
      master_shower_drop: "",
      bath1_shower_drop: "",
      bath2_shower_drop: "",
      bath3_shower_drop: "",
      geo_lab: "",
      geo_report_num: "",
      geo_report_date: "",
      PI: null,
      em_center: null,
      em_edge: null,
      ym_center: null,
      ym_edge: null,
      additional_options: "",
      comments: "",
      created_by: null,
      last_updated_by: null,
      sequence_id: null,
      prefix: "",
      sequence: null,
      year: null,
      currentTab: "main"
    }

    this.tabs = [
      {name: "pre_key", fields: [
        {label: "", name: "edit", id: ""},
        {label: "", name: "delete", id: ""},
        {label: "Job Number", name: "job_number", id: ""},
        {label: "Address", name: "address1", id: ""},
      ]},
      {name: "main", fields: [
        {label: "Client", name: "client", id: "client_id"},
        {label: "Requestor", name: "requestor", id: "requestor_id"},
        {label: "Subdivision", name: "subdivision", id: "subdivision_id"},
        {label: "City", name: "city", id: "city_id"},
      ]},
      {name: "lot", fields: [
        {label: "Phase", name: "phase", id: ""},
        {label: "Section", name: "section", id: ""},
        {label: "Lot", name: "lot", id: ""},
        {label: "Block", name: "block", id: ""},
      ]},
      {name: "design", fields: [
        {label: "Plan Type", name: "plan_type", id: ""},
        {label: "Elevation", name: "elevation", id: ""},
        {label: "Masonry", name: "masonry", id: ""},
        {label: "Covered Patio", name: "covered_patio", id: ""},
        {label: "Bay Window", name: "bay_window", id: ""},
      ]},
      {name: "garage", fields: [
        {label: "Garage Type", name: "garage_type", id: ""},
        {label: "Garage Entry", name: "garage_entry", id: ""},
        {label: "Garage Swing", name: "garage_swing", id: ""},
        {label: "Garage Drop", name: "garage_drop", id: ""},
        {label: "Garage Ext", name: "garage_extension", id: ""},
      ]},
      {name: "drop", fields: [
        {label: "Master", name: "master_shower_drop", id: ""},
        {label: "Bath 1", name: "bath1_shower_drop", id: ""},
        {label: "Bath 2", name: "bath2_shower_drop", id: ""},
        {label: "Bath 3", name: "bath3_shower_drop", id: ""},
      ]},
      {name: "soil", fields: [
        {label: "Lab", name: "geo_lab", id: ""},
        {label: "Report #", name: "geo_report_num", id: ""},
        {label: "Report Date", name: "geo_report_date", id: ""},
        {label: "PI", name: "PI", id: ""},
        {label: "Em Center", name: "em_center", id: ""},
        {label: "Em Edge", name: "em_edge", id: ""},
        {label: "Ym Center", name: "ym_center", id: ""},
        {label: "Ym Edge", name: "ym_edge", id: ""},        
      ]},
      {name: "form", fields: [
        {label: "Front Right", name: "fnd_height_fr", id: ""},
        {label: "Front Left", name: "fnd_height_fl", id: ""},
        {label: "Rear Right", name: "fnd_height_rr", id: ""},
        {label: "Rear Left", name: "fnd_height_rl", id: ""},   
      ]},
      {name: "notes", fields: [
        {label: "Add'l Options", name: "additional_options", id: ""},
        {label: "Notes", name: "comments", id: ""},
      ]},
      {name: "post_key", fields: [
        {label: "Status", name: "status", id: ""},
      ]},
    ]
    this.stagedStarts = [];
  }
  componentDidMount() {

  }

  pad(n, width, z) {
    z = z || "0";
    n = !n? "0": n + "";
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  getJobNumber() {

    // Generating the year component
    const today = new Date();
    const year2D = today.getFullYear().toString().slice(-2);

    // Generating the city component: 2 digits
    const city = this.pad(this.state.city_id,2);
    // Generating the client component: 3 digits
    const client = this.pad(this.state.client_id,3);

    // Generating the subPaperision component: 3 digits
    const sub = this.pad(this.state.subPaperision_id,3);

    // Generating the counter: 3 digits
    const prefix = year2D + city + client + sub;
    const sequenceObj = this.props.jobnumberseqs.find(seq => seq.prefix == prefix);
    // let counter = "001";
    if (typeof(sequenceObj) != "undefined") {
      return {
        sequence_id: sequenceObj.id,
        sequence: sequenceObj.sequence + 1,
        year: sequenceObj.year,
        prefix: sequenceObj.prefix,
        job_number: sequenceObj.prefix+this.pad(sequenceObj.sequence+1,3)
      }
        // counter = this.pad(sequenceObj.sequence+1,3);
    }

    return {
      sequence_id: null,
      sequence: 1,
      year: today.getFullYear(),
      prefix: prefix,
      job_number: prefix+this.pad(1,3)
    }
    // let jobNumber = year2D.concat(this.state.city_id > 0? this.pad(this.state.city_id,2):"00")
    // let jobNumber = year2D + city + client + sub + counter;
                    // + " 000 000 000";
    // return jobNumber;
  }

  handleTabChange = (event, value) => {
    console.log("handleTabChange", value)
    this.setState({ currentTab: value });
  };

  getTableHeader = () => {

    const fields = [].concat(
      this.tabs.find(tab => tab.name == "pre_key").fields,
      this.tabs.find(tab => tab.name == this.state.currentTab).fields
    );

    const tableHeader = fields.map((field, id) => {

      var cellWidth = 10;
      if (field.name == "edit" || field.name == "delete") cellWidth = 10;

      return (
        <TableCell padding="none" width={cellWidth}>
          {field.label}
        </TableCell>
      )
    });

    return tableHeader;

  };

  getTableEntry = (theState) => {

    const x= 2;
    const note = "hello there";
    console.log("current state", theState);

    const fields = [].concat(
      this.tabs.find(tab => tab.name == "pre_key").fields,
      this.tabs.find(tab => tab.name == theState.currentTab).fields
    );

    const tableEntry = fields.map((field, id) => {

      // const stateValue = `theState.${field.name}`;

      // console.log("tableEntrmy", stateValue, eval(stateValue))
      // console.log("tableEntry", stateValue, eval(stateValue))
      if (field.name == "edit" || field.name == "delete") {
        return (
          <TableCell padding="none" width="10" />
        )
      } else {
        return (
          <TableCell padding="none" width="50">
            <TextField
              id={field.name}
              // label={field.label}
              // className={}
              value={eval(`theState.${field.name}`)}
              fullWidth="true"
              variant="filled"
              // onChange={}
            />
          </TableCell>
        )
      }

    });

    return tableEntry;

  };

  render() {
    const { classes } = this.props;
    // const clientList = [
    //   {id: 1, label: "Chesmar"},
    //   {id: 2, label: "Lennar"},
    //   {id: 3, label: "MI"},
    //   {id: 4, label: "MileStone"},
    //   {id: 5, label: "MX3"},
    //   {id: 6, label: "William Lyon"}
    // ];

    console.log("session", this.props.session);
    console.log("state", this.state);
    // console.log("clients", this.props.clients);

    const requestorList = [
      {id: 1, name: "Craig"},
      {id: 2, name: "Chris"},
      {id: 3, name: "Merideth"},
      {id: 4, name: "Ralph"}
    ];
    // console.log("client: ", this.state.client, this.state.client_id);
    // console.log("owner: ", this.state.owner, this.state.owner_id);
    // console.log("job number", this.state.job_number);
    // console.log("state", this.state);
    // console.log("jobNumber:", this.getJobNumber());


    return (
      <Paper className={classes.bodyPaper}>
        <Typography variant="headline">Starts Entry</Typography>
        <Paper className={classes.Paper}>
          <form>
          <Grid container spacing={24}>
            <Grid item xs={12} md={3}>
              <Select
                id="client"
                isClearable="true"
                isSearchable="true"
                options={this.props.clients}
                getOptionLabel={({name}) => name}
                getOptionValue={({id}) => id}
                placeholder="Select Client..."
                onChange={
                  (selected) => {
                    this.setState( {
                      client_id: selected?selected.id:null,
                      client: selected?selected.name:null
                    } )
                  }
                }
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Select
                id="requestor"
                isClearable="true"
                isSearchable="true"
                options={requestorList}
                getOptionLabel={({name}) => name}
                getOptionValue={({id}) => id}
                placeholder="Select Owner..."
                onChange={
                  (selected) => {
                    this.setState( {
                      requestor_id: selected?selected.id:null,
                      requestor: selected?selected.name:null
                    } )
                  }
                }
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Select
                id="subdivision"
                isClearable="true"
                isSearchable="true"
                options={this.props.subdivisions}
                getOptionLabel={({subdivision}) => subdivision}
                getOptionValue={({id}) => id}
                placeholder="Select Subdivision..."
                onChange={
                  (selected) => {
                    this.setState( {
                      subdivision_id: selected?selected.id:null,
                      subdivision: selected?selected.subdivision:null
                    } )
                  }
                }
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Select
                id="city"
                isClearable="true"
                isSearchable="true"
                options={this.props.cities}
                getOptionLabel={({city}) => city}
                getOptionValue={({id}) => id}
                placeholder="Select City..."
                onChange={
                  (selected) => {
                    this.setState( {
                      city_id: selected?selected.id:null,
                      city: selected?selected.city:null
                    } )
                  }
                }
              />
            </Grid>
          </Grid>

          </form>
        </Paper>
        <Paper className={classes.Paper}>
          <AppBar position="static" color="secondary">
            <Grid container>
              <Grid item xs={11}>
                <Tabs
                  value = {this.state.currentTab}
                  onChange={this.handleTabChange}
                  indicatorColor="secondary"
                  textColor="primary"
                >
                  <Tab value="main" label="Main Info" />
                  <Tab value="lot" label="Lot Details" />
                  <Tab value="design" label="Design Details" />
                  <Tab value="garage" label="Garage Info" />
                  <Tab value="drop" label="Shower Drops" />
                  <Tab value="soil" label="Soil Details" />
                  <Tab value="form" label="Form Heights" />
                  <Tab value="notes" label="Notes" />
                </Tabs>
              </Grid>
              <Grid item xs={1} className={classes.rightJust}>
                <Tooltip title="Add Start" aria-label="Add Start">
                  <IconButton>
                    <Add />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </AppBar>

          <Table >
            <TableHead>

              <TableRow>
                {/* <TableCell padding="none" width="10" /> */}
                {/* <TableCell padding="none" width="10" /> */}
                {this.getTableHeader()}
              </TableRow>

            </TableHead>

            <TableBody>
              <TableRow>

                {/* <TableCell padding="none" width="10"/> */}
                {/* <TableCell padding="none" width="10" /> */}
                {this.getTableEntry(this.state)}

              </TableRow>

              <TableRow>
                <TableCell padding="none" width="10">
                  <Tooltip title="Edit" aria-label="Edit">
                  <IconButton>
                    <Edit />
                  </IconButton>
                  </Tooltip>
                </TableCell>

                <TableCell padding="none" width="10">
                  <Tooltip title="Delete" aria-label="Delete">
                  <IconButton>
                    <Delete />
                  </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>

            </TableBody>
          </Table>
        </Paper>

        <Paper className={classes.Paper}>
          <Grid container>
            <Grid item xs={12} md>
              <Paper className={classes.Paper}>
                Trello
              </Paper>
            </Grid>
            <Grid item xs={12} md>
              <Paper className={classes.Paper}>
                Box
              </Paper>
            </Grid>
          </Grid>
        </Paper>

      </Paper>

    );
  }

}

CreateStart.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateStart);



// const styles = theme => ({
//   canvas: {
//     width: "100%",
//     height: "100vh",
//     backgroundColor: grey[200],
//     // display: "grid",
//     // gridTemplateColumns: "10% 10% 10% 10% 10% 10% 10% 10% 10% 10%",
//     // gridTemplateRows: "10% 10% 10% 10% 10% 10% 10% 10% 10% 10%",

//     // marginTop: "-24",
//     // marginLeft: "-24",
//     // flexGrow: 1

//   },
//   margin: {
//     width: "100%",
//     height: "1vh",
//     backgroundColor: grey[200],

//     // marginTop: theme.spacing.unit * 3,

//   },
//   Paper: { padding: 20, marginTop: 10, marginBottom: 10 },
//   paper: {
//     // flexGrow: 1,
//     // width: '50%',
//     // backgroundColor: grey[200],
//     backgroundColor: "white",
//     // margin: "auto",
//     // color: "green",
//     ...theme.mixins.gutters(),
//     // margin: auto,
//     // marginTop: theme.spacing.unit * 40,
//     // paddingTop: theme.spacing.unit * 2,
//     // paddingBottom: theme.spacing.unit * 2,
//     gridColumnStart: "2",
//     gridColumnEnd: "5",
//     // gridRow: "2 span 1",
//     gridRowStart: "2",
//   },
// });


{/* <TableCell>
Status
</TableCell>
<TableCell>
Job Number
</TableCell>
<TableCell>
Address
</TableCell>
{this.state.currentTab == "main" &&
<Fragment>
  <TableCell>
    Client
  </TableCell>
  <TableCell>
    Requestor
  </TableCell>
  <TableCell>
    Subdivision
  </TableCell>
  <TableCell>
    City
  </TableCell>
</Fragment>
}
{this.state.currentTab == "lot" &&
<Fragment>
  <TableCell>
    Phase
  </TableCell>
  <TableCell>
    Section
  </TableCell>
  <TableCell>
    Lot
  </TableCell>
  <TableCell>
    Block
  </TableCell>
</Fragment>
}
{this.state.currentTab == "design" &&
<Fragment>
  <TableCell>
    Plan Type
  </TableCell>
  <TableCell>
    Elevation
  </TableCell>
  <TableCell>
    Masonry
  </TableCell>
  <TableCell>
    Covered Patio
  </TableCell>
  <TableCell>
    Bay Window
  </TableCell>
</Fragment>
}
{this.state.currentTab == "garage" &&
<Fragment>
  <TableCell>
    Garage Type
  </TableCell>
  <TableCell>
    Garage Entry
  </TableCell>
  <TableCell>
    Garage Swing
  </TableCell>
  <TableCell>
    Garage Drop
  </TableCell>
  <TableCell>
    Garage Ext.
  </TableCell>
</Fragment>
}
{this.state.currentTab == "drop" &&
<Fragment>
  <TableCell>
    Master
  </TableCell>
  <TableCell>
    Bath 1
  </TableCell>
  <TableCell>
    Bath 2
  </TableCell>
  <TableCell>
    Bath 3
  </TableCell>
</Fragment>
}
{this.state.currentTab == "soil" &&
<Fragment>
  <TableCell>
    Lab
  </TableCell>
  <TableCell>
    Report #
  </TableCell>
  <TableCell>
    Report Date
  </TableCell>
  <TableCell>
    PI
  </TableCell>
  <TableCell>
    Em Center
  </TableCell>
  <TableCell>
    Em Edge
  </TableCell>
  <TableCell>
    Ym Center
  </TableCell>
  <TableCell>
    Ym Edge
  </TableCell>
</Fragment>
}
{this.state.currentTab == "form" &&
<Fragment>
  <TableCell>
    Front Right
  </TableCell>
  <TableCell>
    Front Left
  </TableCell>
  <TableCell>
    Rear Right
  </TableCell>
  <TableCell>
    Rear Left
  </TableCell>
</Fragment>
}
{this.state.currentTab == "notes" &&
<Fragment>
  <TableCell>
    Add'l Options
  </TableCell>
  <TableCell>
    Notes
  </TableCell>
</Fragment>
} */}