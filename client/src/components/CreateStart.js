import React, { Component } from "react";
// import { Grid, Row, Col, FormControl, Button, FormGroup, ControlLabel, InputGroup } from "react-bootstrap";
// import { Typeahead } from 'react-bootstrap-typeahead';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  canvas: {
    width: "100%",
    height: "100vh",
    backgroundColor: grey[200],
    // display: "grid",
    // gridTemplateColumns: "10% 10% 10% 10% 10% 10% 10% 10% 10% 10%",
    // gridTemplateRows: "10% 10% 10% 10% 10% 10% 10% 10% 10% 10%",

    // marginTop: "-24",
    // marginLeft: "-24",
    // flexGrow: 1

  },
  margin: {
    width: "100%",
    height: "1vh",
    backgroundColor: grey[200],

    // marginTop: theme.spacing.unit * 3,

  },
  paper: {
    // flexGrow: 1,
    // width: '50%',
    // backgroundColor: grey[200],
    backgroundColor: "white",
    // margin: "auto",
    // color: "green",
    ...theme.mixins.gutters(),
    // margin: auto,
    // marginTop: theme.spacing.unit * 40,
    // paddingTop: theme.spacing.unit * 2,
    // paddingBottom: theme.spacing.unit * 2,
    gridColumnStart: "2",
    gridColumnEnd: "5",
    // gridRow: "2 span 1",
    gridRowStart: "2",
  },
});

class CreateStart extends Component {
  constructor() {
    super();
    this.state = {
      job_number: "",
      client_id: null,
      client: "",
      owner_id: null,
      owner: "",
      city_id: null,
      city: "",
      subPaperision_id: null,
      subPaperision: "",
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
      additional_options: "",
      comments: "",
      created_by: null,
      last_updated_by: null,
      sequence_id: null,
      prefix: "",
      sequence: null,
      year: null,
      value: 0
    }
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

    const ownerList = [
      {id: 1, label: "Craig"},
      {id: 2, label: "Chris"},
      {id: 3, label: "Merideth"},
      {id: 4, label: "Ralph"}
    ];
    // console.log("client: ", this.state.client, this.state.client_id);
    // console.log("owner: ", this.state.owner, this.state.owner_id);
    // console.log("job number", this.state.job_number);
    console.log("state", this.state);
    console.log("jobNumber:", this.getJobNumber());

    const paperStyle = {
      // margin: auto,
      // color: "blue"
    }

    const gridStyle = {
      flexGrow: 1,
    }

    const itemStyle = {
      // padding: "16",
      textAlign: 'center',
      // color: theme.palette.text.secondary,
    }

    return (
          <Grid container className={classes.canvas} justify="flex-start">
            <Grid item xs={3} spacing={16}>
              <Paper elevation={10}>
                <Typography variant="h5" component="h3">
                  This is a sheet of paper.
                </Typography>
                <Typography component="p">
                  Paper can be used to build surface or other elements for your application.
                </Typography>
              </Paper>
            </Grid>
          </Grid>

    );
  }

}

CreateStart.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateStart);



// return (
//   <div>

//       <Grid container spacing={24} className={gridStyle} justify="center">
//         <Grid item xs={6}>
//           <Paper className={itemStyle} elevation={10}>
//             <Typography variant="h5" component="h3">
//               This is a sheet of paper.
//             </Typography>
//             <Typography component="p">
//               Paper can be used to build surface or other elements for your application.
//             </Typography>
//           </Paper>
//         </Grid>
//       </Grid>


//   <div className={classes.canvas}>
//     <Paper style={paperStyle} className={classes.paper} elevation={10}>
//       <Typography variant="h5" component="h3">
//         This is a sheet of paper.
//       </Typography>
//       <Typography component="p">
//         Paper can be used to build surface or other elements for your application.
//       </Typography>
//     </Paper>
//   </div>

//   </div>
// );