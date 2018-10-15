import React, { Component } from "react";
// import { Grid, Row, Col, FormControl, Button, FormGroup, ControlLabel, InputGroup } from "react-bootstrap";
// import { Typeahead } from 'react-bootstrap-typeahead';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';

import { loadJobNumberSeqs } from "../actions";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}


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

  styles = theme => ({
    root: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  });


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

    // Generating the subdivision component: 3 digits
    const sub = this.pad(this.state.subdivision_id,3);

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
    const { value } = this.state;
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

    return (

      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            scrollable
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Item One" icon={<PhoneIcon />} />
            <Tab label="Item Two" icon={<FavoriteIcon />} />
            <Tab label="Item Three" icon={<PersonPinIcon />} />
            <Tab label="Item Four" icon={<HelpIcon />} />
            <Tab label="Item Five" icon={<ShoppingBasket />} />
            <Tab label="Item Six" icon={<ThumbDown />} />
            <Tab label="Item Seven" icon={<ThumbUp />} />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>Item One</TabContainer>}
        {value === 1 && <TabContainer>Item Two</TabContainer>}
        {value === 2 && <TabContainer>Item Three</TabContainer>}
        {value === 3 && <TabContainer>Item Four</TabContainer>}
        {value === 4 && <TabContainer>Item Five</TabContainer>}
        {value === 5 && <TabContainer>Item Six</TabContainer>}
        {value === 6 && <TabContainer>Item Seven</TabContainer>}
      </div>
    );
  }

}
export default (CreateStart);


/* <FormControl type="number" placeholder="Job Number" className="required" onChange={(e) => {
  this.setState({
    job_number: e.target.value
  });
}} /> */