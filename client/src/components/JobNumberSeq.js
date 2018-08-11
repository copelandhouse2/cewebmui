import React, { Component } from "react";
import { Label, Table, Grid, Row, Col, FormControl, Button, FormGroup
  , ControlLabel, InputGroup, Tooltip, Badge, Popover, OverlayTrigger } from "react-bootstrap";
import { Typeahead } from 'react-bootstrap-typeahead';

class JobNumberSeq extends Component {
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
      editFlag: false
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
  
  getJobNumber() {

    // Generating the year component
    let year2D;
    if (this.state.year) {  // tests for null.
      year2D = this.state.year.toString().slice(-2);
    } else {
      const today = new Date();
      year2D = today.getFullYear().toString().slice(-2);
    }

    // Generating the city component: 2 digits
    const city = this.pad(this.state.city_id,2);
    // Generating the client component: 3 digits
    const client = this.pad(this.state.client_id,3);

    // Generating the subdivision component: 3 digits
    const sub = this.pad(this.state.subdivision_id,3);

    // Generating the counter: 3 digits
    const seq = this.pad(this.state.sequence,3);

    const prefix = year2D + city + client + sub;
    // let jobNumber = year.concat(this.state.city_id > 0? this.pad(this.state.city_id,2):"00")
    const jobNumber = year2D + city + client + sub + seq;

    // this.setState({ prefix: prefix, current_value: jobNumber });

    return { prefix: prefix, current_value: jobNumber };
  }

  getJobNumberSeqID() {
    
    // if the ID already exists in state, just return it.
    if (this.state.id) return this.state.id;

    // ELSE, find the largest ID currently, then return +1.
    if (this.props.jobnumberseqs.length > 0) {
      const sequenceIDs = this.props.jobnumberseqs.map((sequence)=> {
        return sequence.id;
      })

      console.log('sequenceIDs', sequenceIDs)
      // const cityObj = {...this.state.city};
      // cityObj.id = Math.max(...cityIDs)+1;
      // this.setState( { city: cityObj });

      return Math.max(...sequenceIDs)+1;
    }

    // only if state is not set AND the cities array is not set yet.
    return "";
  }

  popoverClick = (
    <Popover id="popover-trigger-click" title="Sequence Help">
      <strong>Note!</strong> This sequence number represents the <strong>existing value</strong>.  For new sequences, this should be 0.
    </Popover>
  );

  render() {

    // console.log("state LOV in render", this.props.stateLookup);
    // console.log("country LOV in render", this.props.countryLookup);

    // console.log("Session", this.props.session);
    const sequenceObj = {...this.state};

    const jobNumberObj = this.getJobNumber();
    sequenceObj.prefix = jobNumberObj.prefix;
    sequenceObj.current_value = jobNumberObj.current_value;

    let myCss;

    // CityList = Current List of cities in the cities table.
    const SequenceList = this.props.jobnumberseqs.map((sequence, id) => {

      // helps me stripe the rows to  add visible separation.
      id%2 === 0 ? myCss = "dark-striped" : myCss = "darker-striped";
  
      return (
        <tr key={id} className={myCss}>
          <td>{sequence.prefix}</td>
          <td>{sequence.sequence}</td>
          <td>{sequence.year}</td>
          <td>{sequence.city}</td>
          <td>{sequence.client}</td>
          <td>{sequence.subdivision}</td>
          <td>{sequence.current_value}</td>
          <td>
            <Button
              type="button"
              bsStyle="warning"
              bsSize="small"
              block
              className=""
              onClick={(e) => {
                e.preventDefault();
                sequenceObj.id = sequence.id;
                sequenceObj.prefix = sequence.prefix;
                sequenceObj.sequence = sequence.sequence;
                sequenceObj.year = sequence.year;
                sequenceObj.city_id = sequence.city_id;
                sequenceObj.city = sequence.city;
                sequenceObj.client_id = sequence.client_id;
                sequenceObj.client = sequence.client;
                sequenceObj.subdivision_id = sequence.subdivision_id;
                sequenceObj.subdivision = sequence.subdivision;
                sequenceObj.current_value = sequence.current_value;
                sequenceObj.editFlag = true;
                this.setState(sequenceObj);
              }}
            >
              Edit
            </Button>
          </td>
          <td>
            <Button
              type="button"
              bsStyle="danger"
              bsSize="small"
              block
              className=""
              onClick={(e) => {
                e.preventDefault();
                if (this.props.deleteJobNumberSeq) this.props.deleteJobNumberSeq(sequence.id);
              }}
            >
              Delete
            </Button></td>
        </tr>

      )  // for CityList
    });  // for map

    console.log("state", this.state);
    // console.log("client: ", this.state.client, this.state.client_id);
    // console.log("owner: ", this.state.owner, this.state.owner_id);
    // console.log("job number", this.state.job_number);
    // console.log("cities", CityList);

    return (
      <Grid className="gridNarrow">
        <h1 className="green">JOB NUMBER SEQUENCES</h1>

        <Col md={12}>
          
          <form className="container-fluid" onSubmit={(e) => {
            e.preventDefault();
            if (this.props.createJobNumberSeq) {
              sequenceObj.created_by = this.props.session.id;
              sequenceObj.last_updated_by = this.props.session.id;
              this.setState(sequenceObj, ()=> {
                this.props.createJobNumberSeq(this.state)
                this.setState(this.sequence_init);
              });
            }
          }}>
            <Row>
              <Col md={9}>
                <h2 className="green">Job Number Sequence Management</h2>
              </Col>
              <Col md={2}>
                <h5 className="green ce-top-margin-40">Current Value</h5>
              </Col>
            </Row>
            <Row>
              <FormGroup bsSize="large" className="">
                <Col md={1} className="padding-0">
                  <FormControl
                    type="text"
                    placeholder="Year"
                    className="required"
                    disabled = {this.state.editFlag}
                    value = {this.state.year?this.state.year:this.getYear()}
                    onChange={(e) => {
                      sequenceObj.year = e.target.value;
                      this.setState(sequenceObj);
                    }} />
                </Col>
                <Col md={2} className="padding-0">
                  <Typeahead
                    onChange={(selected) => {
                      if (selected.length > 0) {
                        sequenceObj.city_id = selected[0].id;
                        sequenceObj.city = selected[0].city;
                        sequenceObj.year = this.state.year?this.state.year:this.getYear();
                        this.setState(sequenceObj, ()=> {
                          const jobNumberObj = this.getJobNumber();
                          sequenceObj.prefix = jobNumberObj.prefix;
                          sequenceObj.current_value = jobNumberObj.current_value;
                          this.setState(sequenceObj);
                        });
                      }
                    }}
                    disabled = {this.state.editFlag}
                    labelKey="city"
                    options={this.props.cities}
                    selected= {this.state.city_id?[{id: this.state.city_id, city: this.state.city}]:this.state.selected}
                    placeholder="City"
                  />
                </Col>
                <Col md={2} className="padding-0">
                  <Typeahead
                    onChange={(selected) => {
                      if (selected.length > 0) {
                        sequenceObj.client_id = selected[0].id;
                        sequenceObj.client = selected[0].name;
                        this.setState(sequenceObj, ()=> {
                          const jobNumberObj = this.getJobNumber();
                          sequenceObj.prefix = jobNumberObj.prefix;
                          sequenceObj.current_value = jobNumberObj.current_value;
                          this.setState(sequenceObj);
                        });
                      }
                    }}
                    disabled = {this.state.editFlag}
                    labelKey="name"
                    options={this.props.clients}
                    selected= {this.state.client_id?[{ id: this.state.client_id, name: this.state.client}]:this.state.selected}
                    placeholder="Client"
                  />
                </Col>
                <Col md={2} className="padding-0">
                  <Typeahead
                    onChange={(selected) => {
                      if (selected.length > 0) {
                        sequenceObj.subdivision_id = selected[0].id;
                        sequenceObj.subdivision = selected[0].subdivision;
                        this.setState(sequenceObj, ()=> {
                          const jobNumberObj = this.getJobNumber();
                          sequenceObj.prefix = jobNumberObj.prefix;
                          sequenceObj.current_value = jobNumberObj.current_value;
                          this.setState(sequenceObj);
                        });
                      }
                    }}
                    disabled = {this.state.editFlag}
                    labelKey="subdivision"
                    options={this.props.subdivisions}
                    selected= {this.state.subdivision_id?[{id: this.state.subdivision_id, subdivision: this.state.subdivision}]:this.state.selected}
                    placeholder="Subdivision"
                  />
                </Col>
                <Col md={1} className="padding-0">
                <FormControl
                    type="number"
                    placeholder="Seq"
                    className=""
                    value = {this.state.sequence?this.state.sequence:""}
                    onChange={(e) => {
                      sequenceObj.sequence = e.target.value;
                      this.setState(sequenceObj, ()=> {
                        const jobNumberObj = this.getJobNumber();
                        sequenceObj.prefix = jobNumberObj.prefix;
                        sequenceObj.current_value = jobNumberObj.current_value;
                        this.setState(sequenceObj);
                      });
                    }} />

                </Col>
                <Col md={1}>
                <OverlayTrigger trigger="click" placement="bottom" overlay={this.popoverClick}>
                  <Badge>?</Badge>
                </OverlayTrigger>


                </Col>
                <Col md={2} className="">
                <FormControl
                    type="text"
                    placeholder="Ex. Job Number"
                    className=""
                    disabled
                    value = {this.state.current_value}
                />
                </Col>
  
              </FormGroup>
            </Row>
            <Row>
              <Col md={6} mdOffset={3}>
              <Button type="submit" bsStyle="primary" bsSize="large" block className="ce-top-margin-20">Add / Change</Button>
              </Col>
            </Row>
          </form>

          <h2 className="green">List of Job Number Sequences</h2>

          <Table className="">
            <thead className="darker-striped">
              <tr>
                <th scope="col">Prefix</th>
                <th scope="col">Sequence</th>
                <th scope="col">Year</th>
                <th scope="col">City</th>
                <th scope="col">Client</th>
                <th scope="col">Subdivision</th>
                <th scope="col">Current Value</th>
                <th scope="col" colSpan="2">Action</th>

              </tr>
            </thead>
            <tbody>
              {SequenceList}
            </tbody>
          </Table>

        </Col>

      </Grid>
    );
  }

}
export default (JobNumberSeq);
