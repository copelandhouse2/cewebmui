import React, { Component } from "react";
import { Label, Table, Grid, Row, Col, FormControl, Button, FormGroup, ControlLabel, InputGroup } from "react-bootstrap";
import { Typeahead } from 'react-bootstrap-typeahead';

class Client extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      name: "",
      full_name: "",
      compliance_dl: "",
      active: "",
      notes: "",
      created_by: "",
      last_updated_by: ""
    };

    this.client_init = {...this.state};

  }

  getClientID() {
    
    // if the ID already exists in state, just return it.
    if (this.state.id) return this.state.id;

    // ELSE, find the largest ID currently, then return +1.
    if (this.props.clients.length > 0) {
      const clientIDs = this.props.clients.map((client)=> {
        return client.id;
      })

      console.log('clientIDs', clientIDs)
      // const cityObj = {...this.state.city};
      // cityObj.id = Math.max(...cityIDs)+1;
      // this.setState( { city: cityObj });

      return Math.max(...clientIDs)+1;
    }

    // only if state is not set AND the cities array is not set yet.
    return "";
  }

  componentDidMount() {

    // this.props.getLookup("STATE");
    // this.props.getLookup("COUNTRY")

  }

  render() {

    // console.log("state LOV in render", this.props.stateLookup);
    // console.log("country LOV in render", this.props.countryLookup);

    // console.log("Session", this.props.session);
    const clientObj = {...this.state};

    let myCss;

    // CityList = Current List of cities in the cities table.
    const ClientList = this.props.clients.map((client, id) => {

      // helps me stripe the rows to  add visible separation.
      id%2 === 0 ? myCss = "dark-striped" : myCss = "darker-striped";
  
      return (
        <tr key={id} className={myCss}>
          <td>{client.id}</td>
          <td>{client.name}</td>
          <td>{client.full_name}</td>
          <td>{client.compliance_dl}</td>
          <td>{client.notes}</td>
          <td>{client.active}</td>
          <td>
            <Button
              type="button"
              bsStyle="warning"
              bsSize="small"
              block
              className=""
              onClick={(e) => {
                e.preventDefault();
                clientObj.id = client.id;
                clientObj.name = client.name;
                clientObj.full_name = client.full_name;
                clientObj.compliance_dl = client.compliance_dl;
                clientObj.notes = client.notes;
                clientObj.active = client.active;
                this.setState(clientObj);
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
                if (this.props.deleteClient) this.props.deleteClient(client.id);
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

    /* Layout...
    Grid
      Column for City maintenance   Column for Subdivision maintenance
    Close Grid
    */

    
    return (
      <Grid className="GridNarrow">

        <h1 className="green">CLIENTS</h1>

        <Col md={12}>
          
          <form className="container-fluid" onSubmit={(e) => {
            e.preventDefault();
            if (this.props.createClient) {
              clientObj.created_by = this.props.session.id;
              clientObj.last_updated_by = this.props.session.id;
              this.setState(clientObj, ()=> {
                this.props.createClient(this.state)
                this.setState(this.client_init);
              });
            }
          }}>
            <h2 className="green">Client Management</h2>
            <Row>
              <FormGroup bsSize="large" className="">
                <Col md={1} className="padding-0">
                  <FormControl
                    type="text"
                    className="required"
                    placeholder="ID"
                    disabled
                    value = {this.state.id?this.state.id:this.getClientID()}
                  />
                </Col>
                <Col md={2} className="padding-0">
                  <FormControl
                    type="text"
                    placeholder="Name"
                    className="required"
                    value = {this.state.name?this.state.name:""}
                    onChange={(e) => {
                      clientObj.id = this.getClientID();
                      clientObj.name = e.target.value;
                      this.setState(clientObj);
                    }} />
                </Col>
                <Col md={3} className="padding-0">
                <FormControl
                    type="text"
                    placeholder="Full Name"
                    className=""
                    value = {this.state.full_name?this.state.full_name:""}
                    onChange={(e) => {
                      clientObj.full_name = e.target.value;
                      this.setState(clientObj);
                    }} />
                </Col>
                <Col md={3} className="padding-0">
                <FormControl
                    type="text"
                    placeholder="Compliance DL"
                    className=""
                    value = {this.state.compliance_dl?this.state.compliance_dl:""}
                    onChange={(e) => {
                      clientObj.compliance_dl = e.target.value;
                      this.setState(clientObj);
                    }} />
                </Col>
                <Col md={2} className="padding-0">
                <FormControl
                    type="text"
                    placeholder="Notes"
                    className=""
                    value = {this.state.notes?this.state.notes:""}
                    onChange={(e) => {
                      clientObj.notes = e.target.value;
                      this.setState(clientObj);
                    }} />
                </Col>
                <Col md={1} className="padding-0">
                <FormControl
                    type="text"
                    placeholder="Active?"
                    className=""
                    value = {this.state.active?this.state.active:""}
                    onChange={(e) => {
                      clientObj.active = e.target.value;
                      this.setState(clientObj);
                    }} />
                </Col>
 
              </FormGroup>
            </Row>
            <Row>
              <Col md={6} mdOffset={3}>
              <Button type="submit" bsStyle="primary" bsSize="large" block className="ce-top-margin-20">Add / Change</Button>
              </Col>
            </Row>
          </form>

          <h2 className="green">List of Clients</h2>

          <Table className="">
            <thead className="darker-striped">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th> 
                <th scope="col">Full Name</th>
                <th scope="col">Compliance DL</th>
                <th scope="col">Notes</th>
                <th scope="col">Active?</th>
                <th scope="col" colSpan="2">Action</th>

              </tr>
            </thead>
            <tbody>
              {ClientList}
            </tbody>
          </Table>

        </Col>

      </Grid>
    );
  }

}
export default (Client);
