import React, { Component } from "react";
import { Grid, Row, Col, FormControl, Button, FormGroup, ControlLabel, InputGroup } from "react-bootstrap";
import { Typeahead } from 'react-bootstrap-typeahead';
import { loadJobNumberSeqs } from "../actions";

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
      year: null
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
      <Grid fluid className="gridNarrow fullScreen">

        <Row className="show-grid">
          <FormGroup bsSize="large">
          <Col md={3}>
            <h1 className="green">STARTS ADD</h1>
          </Col>

          <Col md={3}>
            <br />
            <Typeahead
              onChange={(selected) => {
                if (selected.length > 0) {
                  this.setState({ client_id: selected[0].id,
                    client: selected[0].name
                  },
                    () => {
                      const seqObj = this.getJobNumber();
                      this.setState({ sequence_id: seqObj.sequence_id,
                        sequence: seqObj.sequence,
                        year: seqObj.year,
                        prefix: seqObj.prefix,
                        job_number: seqObj.job_number
                      });
                    }
                  );
                }
              }}
            labelKey="name"
            options={this.props.clients}
            selected={this.state.selected}
            placeholder="Client"
          />
        </Col>

          <Col md={3}>
            <br />
            <Typeahead
              onChange={(selected) => {
                if (selected.length > 0) {
                  this.setState({ owner_id: selected[0].id,
                    owner: selected[0].label
                  });
                }
              }}
              options={ownerList}
              selected={this.state.selected}
              placeholder="Owner / Starts Coordinator"
            />
          </Col>

          <Col md={3}>
            <br />          
            <FormControl type="text" placeholder="Job Number" className="required"
              value = {this.state.job_number} disabled
             />
          </Col>
          </FormGroup>
        </Row>


        <form className="container-fluid" onSubmit={(e) => {
          e.preventDefault();
          if (this.props.createAddress) {
            this.setState({ created_by: this.props.session.id,
              last_updated_by: this.props.session.id }, ()=> {
                this.props.createAddress(this.state);
              }
            );   
          }
        }}>

          <Row>
            <Col md={3}>
              <h2 className="green">Lot Details</h2>
            </Col>
            <Col md={3} mdOffset={4}>
              <h2 className="green">Form Heights</h2>
            </Col>
          </Row>

          <Row>
            <Col md={3}>

              <Typeahead
              onChange={(selected) => {
                if (selected.length > 0) {
                  this.setState({ subdivision_id: selected[0].id,
                    subdivision: selected[0].subdivision },
                    () => {
                      const seqObj = this.getJobNumber();
                      this.setState({ sequence_id: seqObj.sequence_id,
                        sequence: seqObj.sequence,
                        year: seqObj.year,
                        prefix: seqObj.prefix,
                        job_number: seqObj.job_number
                      });
                    }
                  );
                } else {
                  this.setState({ subdivision_id: null,
                    subdivision: null },
                    () => {
                      const seqObj = this.getJobNumber();
                      this.setState({ sequence_id: seqObj.sequence_id,
                        sequence: seqObj.sequence,
                        year: seqObj.year,
                        prefix: seqObj.prefix,
                        job_number: seqObj.job_number
                      });
                    }
                  );
                }
              }}
              labelKey="subdivision"
              options={this.props.subdivisions}
              selected={this.state.selected}
              placeholder="Subdivision"
              />
              <FormControl type="text" placeholder="Address 1" className="required" onChange={(e) => {
                this.setState({
                  address1: e.target.value
                });
              }} />

              <Typeahead
                onChange={(selected) => {
                  if (selected.length > 0) {
                    this.setState({ city_id: selected[0].id,
                      city: selected[0].city },
                      () => {
                        const seqObj = this.getJobNumber();
                        this.setState({ sequence_id: seqObj.sequence_id,
                          sequence: seqObj.sequence,
                          year: seqObj.year,
                          prefix: seqObj.prefix,
                          job_number: seqObj.job_number
                        });
                      }
                    );
                  }
                }}
                labelKey="city"
                options={this.props.cities}
                selected={this.state.selected}
                placeholder="City"
              />

            </Col>

            <Col md={2}>
              <FormControl type="text" placeholder="Phase" onChange={(e) => {
                this.setState({
                  phase: e.target.value
                });
              }} />

              <FormControl type="text" placeholder="Section" onChange={(e) => {
                this.setState({
                  section: e.target.value
                });
              }} />

              <FormControl type="text" placeholder="Lot" className="required" onChange={(e) => {
                this.setState({
                  lot: e.target.value
                });
              }} />

              <FormControl type="text" placeholder="Block" className="required" onChange={(e) => {
                this.setState({
                  block: e.target.value
                });
              }} />

            </Col>

            <Col md={2} mdOffset={2}>
              <FormControl type="number" placeholder="Front Right (in)" onChange={(e) => {
                this.setState({
                  fnd_height_fr: e.target.value
                });
              }} />

              <FormControl type="number" placeholder="Front Left (in)" onChange={(e) => {
                this.setState({
                  fnd_height_fl: e.target.value
                });
              }} />

              <FormControl type="number" placeholder="Rear Right (in)" onChange={(e) => {
                this.setState({
                  fnd_height_rr: e.target.value
                });
              }} />

              <FormControl type="number" placeholder="Rear Left (in)" onChange={(e) => {
                this.setState({
                  fnd_height_rl: e.target.value
                });
              }} />
            </Col>
          </Row>

          <Row>
            <Col md={3}>
              <h2 className="green">Design Details</h2>
            </Col>
          </Row>

          <Row>
            <Col md={3}>
              <FormControl type="text" placeholder="Plan Type" className="required" onChange={(e) => {
                this.setState({
                  plan_type: e.target.value
                });
              }} />

              <FormControl type="text" placeholder="Elevation" className="required" onChange={(e) => {
                this.setState({
                  elevation: e.target.value
                });
              }} />

              <InputGroup>
                <InputGroup.Addon>Masonry</InputGroup.Addon>
                <FormControl componentClass="select" placeholder="None" className="required" onChange={(e) => {
                  this.setState({
                    masonry: e.target.value
                  });
                }}>
                    <option value="0">None</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </FormControl>
              </InputGroup>
            </Col>

            <Col md={3}>

              <FormControl type="text" placeholder="Garage Type" onChange={(e) => {
                this.setState({
                  garage_type: e.target.value
                });
              }} />

              <InputGroup>
                <InputGroup.Addon>Entry</InputGroup.Addon>
                <FormControl componentClass="select" placeholder="Front" onChange={(e) => {
                  this.setState({
                    garage_entry: e.target.value
                  });
                }}>
                    <option value="Front">Front</option>
                    <option value="Side">Side</option>
                    <option value="Rear">Rear</option>
                </FormControl>
              </InputGroup>

              <InputGroup>
                <InputGroup.Addon>Swing</InputGroup.Addon>
                <FormControl componentClass="select" placeholder="Left" onChange={(e) => {
                  this.setState({
                    garage_swing: e.target.value
                  });
                }}>
                    <option value="Left">Left</option>
                    <option value="Right">Right</option>
                </FormControl>
              </InputGroup>

              <FormControl type="number" placeholder="Garage Drop (in)" onChange={(e) => {
                this.setState({
                  garage_drop: e.target.value
                });
              }} />

              <FormControl type="number" placeholder="Garage Extension (ft)" onChange={(e) => {
                this.setState({
                  garage_extension: e.target.value
                });
              }} />
            </Col>

            <Col md={3}>
              <InputGroup>
                <InputGroup.Addon>Covered Patio?</InputGroup.Addon>
                <FormControl componentClass="select" placeholder="No" onChange={(e) => {
                  this.setState({
                    covered_patio: e.target.value
                  });
                }}>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </FormControl>
              </InputGroup>

              <InputGroup>
                <InputGroup.Addon>Bay Window?</InputGroup.Addon>
                <FormControl componentClass="select" placeholder="No" onChange={(e) => {
                  this.setState({
                    bay_window: e.target.value
                  });
                }}>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </FormControl>
              </InputGroup>

              <InputGroup>
                <InputGroup.Addon>Drop Shower?</InputGroup.Addon>
                <InputGroup.Addon>Master</InputGroup.Addon>
                <FormControl componentClass="select" placeholder="No" onChange={(e) => {
                  this.setState({
                    master_shower_drop: e.target.value
                  });
                }}>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </FormControl>
              </InputGroup>

              <InputGroup>
                <InputGroup.Addon>Drop Shower?</InputGroup.Addon>
                <InputGroup.Addon>Bath 1</InputGroup.Addon>
                <FormControl componentClass="select" placeholder="No" onChange={(e) => {
                  this.setState({
                    bath1_shower_drop: e.target.value
                  });
                }}>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </FormControl>
              </InputGroup>

              <InputGroup>
                <InputGroup.Addon>Drop Shower?</InputGroup.Addon>
                <InputGroup.Addon>Bath 2</InputGroup.Addon>
                <FormControl componentClass="select" placeholder="No" onChange={(e) => {
                  this.setState({
                    bath2_shower_drop: e.target.value
                  });
                }}>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </FormControl>
              </InputGroup>

              <InputGroup>
                <InputGroup.Addon>Drop Shower?</InputGroup.Addon>
                <InputGroup.Addon>Bath 3</InputGroup.Addon>
                <FormControl componentClass="select" placeholder="No" onChange={(e) => {
                  this.setState({
                    bath3_shower_drop: e.target.value
                  });
                }}>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </FormControl>
              </InputGroup>

            </Col>

            <Col md={3}>
              <FormControl rows="4" componentClass="textarea" placeholder="Additional Options" onChange={(e) => {
                this.setState({
                  additional_options: e.target.value
                });
              }} />

              <FormControl rows="4" componentClass="textarea" placeholder="Notes / Comments" onChange={(e) => {
                this.setState({
                  comments: e.target.value
                });
              }} />

            </Col>
          </Row>

          <Row>
            <Button type="submit" bsStyle="primary" bsSize="large" block className="ce-top-margin-20">Create!</Button>
          </Row>

        </form>

      </Grid>
    );
  }

}
export default (CreateStart);


/* <FormControl type="number" placeholder="Job Number" className="required" onChange={(e) => {
  this.setState({
    job_number: e.target.value
  });
}} /> */