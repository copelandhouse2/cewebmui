import React, { Component } from "react";
import { Label, Table, Grid, Row, Col, FormControl, Button, FormGroup
  , ControlLabel, InputGroup, Tooltip, Badge, Popover, OverlayTrigger
  , Jumbotron, Well } from "react-bootstrap";
import { Typeahead } from 'react-bootstrap-typeahead';

class GetNextJobNumber extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      prefix: "",
      sequence: null,
      year: null,
      city_id: null,
      city: "",
      client_id: null,
      client: "",
      subdivision_id: null,
      subdivision: "",
      current_value: "",
      created_by: "",
      last_updated_by: "",
      jobNumberCSS: ""
    };

    this.sequence_init = {...this.state};

  }

  componentDidMount() { }

  getYear() {
    const year = new Date();
    return year.getFullYear();
  }

  pad(n, width, z) {
    z = z || "0";
    n = !n? "0": n + "";
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  getJobNumber(stateObj) {

    // Generating the year component
    let year2D;
    if (stateObj.year) {  // tests for null.
      year2D = stateObj.year.toString().slice(-2);
    } else {
      const today = new Date();
      year2D = today.getFullYear().toString().slice(-2);
    }

    // Generating the city component: 2 digits
    const city = this.pad(stateObj.city_id,2);
    // Generating the client component: 3 digits
    const client = this.pad(stateObj.client_id,3);

    // Generating the subdivision component: 3 digits
    const sub = this.pad(stateObj.subdivision_id,3);

    // Generating the counter: 3 digits
    const prefix = year2D + city + client + sub;
    console.log("getJobNumber prefix", prefix);
    const sequenceObj = this.props.jobnumberseqs.find(seq => seq.prefix == prefix);
    if (typeof(sequenceObj) != "undefined") {
      stateObj.id = sequenceObj.id;
      stateObj.prefix = sequenceObj.prefix;
      stateObj.sequence = sequenceObj.sequence+1;
      stateObj.current_value = sequenceObj.prefix + this.pad(sequenceObj.sequence+1,3);
      stateObj.jobNumberCSS = "ce-found-format"
    }

    console.log("getJobNumber stateObj:", stateObj)
    return stateObj;

    // return { prefix: prefix, current_value: jobNumber };
  }

  render() {

    // console.log("state LOV in render", this.props.stateLookup);
    // console.log("country LOV in render", this.props.countryLookup);

    // console.log("Session", this.props.session);
    let sequenceObj = {...this.state};

    console.log("state", this.state);
    // console.log("client: ", this.state.client, this.state.client_id);
    // console.log("owner: ", this.state.owner, this.state.owner_id);
    // console.log("job number", this.state.job_number);
    // console.log("cities", CityList);

    return (
      <Grid fluid className="fullScreen">
        <h1 className="green">GET NEXT JOB NUMBER</h1>

        <Col md={12}>
          
          <form className="container-fluid" onSubmit={(e) => {
            if (this.state.current_value) {
              e.preventDefault();
              if (this.props.createJobNumberSeq) {
                sequenceObj.created_by = this.props.session.id;
                sequenceObj.last_updated_by = this.props.session.id;
                this.setState(sequenceObj, ()=> {
                  this.props.createJobNumberSeq(this.state)
                  this.setState(this.sequence_init);
                  this.cityTypeahead.getInstance().clear();
                  this.clientTypeahead.getInstance().clear();
                  this.subdivisionTypeahead.getInstance().clear();
                });
              }
            } else {

            }
          }}>

            <FormGroup bsSize="large" className="">
              <Row className="ce-top-margin-40">
                <Col md={1} mdOffset={2} className="">
                  <FormControl
                    type="text"
                    placeholder="Year"
                    className="required"
                    disabled = {this.state.editFlag}
                    value = {this.state.year?this.state.year:this.getYear()}
                    onChange={(e) => {
                      sequenceObj.year = e.target.value;
                      sequenceObj = this.getJobNumber(sequenceObj);
                      this.setState(sequenceObj);
                    }} />
                </Col>
                <Col md={2} className="">
                  <Typeahead
                    onChange={(selected) => {
                      if (selected.length > 0) {
                        sequenceObj.city_id = selected[0].id;
                        sequenceObj.city = selected[0].city;
                        sequenceObj.year = this.state.year?this.state.year:this.getYear();
                        sequenceObj = {...this.getJobNumber(sequenceObj)};
                        this.setState(sequenceObj);
                      }
                    }}
                    disabled = {this.state.editFlag}
                    labelKey="city"
                    options={this.props.cities}
                    selected={this.state.city_id?[{id: this.state.city_id, city: this.state.city}]:this.state.selected}
                    placeholder="City"
                    ref={(typeahead)=> this.cityTypeahead = typeahead}

                  />
                </Col>
                <Col md={2} className="">
                  <Typeahead
                    onChange={(selected) => {
                      if (selected.length > 0) {
                        sequenceObj.client_id = selected[0].id;
                        sequenceObj.client = selected[0].name;
                        sequenceObj = {...this.getJobNumber(sequenceObj)};
                        this.setState(sequenceObj);
                      }
                    }}
                    disabled = {this.state.editFlag}
                    labelKey="name"
                    options={this.props.clients}
                    selected={this.state.client_id?[{ id: this.state.client_id, name: this.state.client}]:this.state.selected}
                    placeholder="Client"
                    ref={(typeahead)=> this.clientTypeahead = typeahead}
                  />
                </Col>
                <Col md={3} className="">
                  <Typeahead
                    onChange={(selected) => {
                      if (selected.length > 0) {
                        sequenceObj.subdivision_id = selected[0].id;
                        sequenceObj.subdivision = selected[0].subdivision;
                        sequenceObj = {...this.getJobNumber(sequenceObj)};
                        this.setState(sequenceObj);
                      }
                    }}
                    disabled = {this.state.editFlag}
                    labelKey="subdivision"
                    options={this.props.subdivisions}
                    selected={this.state.subdivision_id?[{id: this.state.subdivision_id, subdivision: this.state.subdivision}]:this.state.selected}
                    placeholder="Subdivision"
                    ref={(typeahead)=> this.subdivisionTypeahead = typeahead}

                  />
                </Col>
              </Row>

              <Row className="ce-top-margin-40">
                <Col md={7} mdOffset={2} className="">
                <Jumbotron bsSize="large" className={this.state.jobNumberCSS}>
                  <h1>
                  {this.state.current_value?this.state.current_value:"Next Job Number"}
                  </h1>
                </Jumbotron>
                </Col>
              </Row>
              </FormGroup>
            <Row>
              <Col md={4} mdOffset={2}>
              <Button type="submit" bsStyle="primary" bsSize="large" block className="ce-top-margin-20">Save</Button>
              </Col>
              <Col md={4}>
              <Button type="button"
                bsStyle="primary"
                bsSize="large"
                block
                className="ce-top-margin-20"
                onClick={(e) => {
                    e.preventDefault();
                    this.setState(this.sequence_init);
                    this.cityTypeahead.getInstance().clear();
                    this.clientTypeahead.getInstance().clear();
                    this.subdivisionTypeahead.getInstance().clear();
                }}
                >Clear</Button>
              </Col>
            </Row>
          </form>

        </Col>

      </Grid>
    );
  }

}
export default (GetNextJobNumber);

// this.setState(sequenceObj, ()=> {
//   const jobNumberObj = this.getJobNumber();
//   sequenceObj.prefix = jobNumberObj.prefix;
//   sequenceObj.current_value = jobNumberObj.current_value;
//   this.setState(sequenceObj);
// });

// this.setState(sequenceObj, ()=> {
//   const jobNumberObj = this.getJobNumber();
//   sequenceObj.prefix = jobNumberObj.prefix;
//   sequenceObj.current_value = jobNumberObj.current_value;
//   this.setState(sequenceObj);
// });

// this.setState(sequenceObj, ()=> {
//   const jobNumberObj = this.getJobNumber();
//   sequenceObj.prefix = jobNumberObj.prefix;
//   sequenceObj.current_value = jobNumberObj.current_value;
//   this.setState(sequenceObj);
// });

{/* <FormControl
type="text"
placeholder="Next Job Number"
className=""
disabled
value = {this.state.current_value}
/> */}