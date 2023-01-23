import React, { Component } from "react";
import { Label, Table, Grid, Row, Col, FormControl, Button, FormGroup, ControlLabel, InputGroup } from "react-bootstrap";
import { Typeahead } from 'react-bootstrap-typeahead';

class CitySub extends Component {
  constructor() {
    super();
    this.state = {
      city: {
        id: null,
        city: "",
        state_prov: "",
        state_prov_long: "",
        country: "",
        country_long: "",
        created_by: "",
        last_updated_by: ""
      },
      subdivision: {
        id: null,
        subdivision: "",
        city_id: null,
        city: "",
        created_by: "",
        last_updated_by: ""
      }
    }

    this.city_init = {...this.state.city};
    this.sub_init = {...this.state.subdivision};

  }

  getCityID() {
    
    // if the ID already exists in state, just return it.
    if (this.state.city.id) return this.state.city.id;

    // ELSE, find the largest ID currently, then return +1.
    if (this.props.cities.length > 0) {
      const cityIDs = this.props.cities.map((city)=> {
        return city.id;
      })

      console.log('cityIDs', cityIDs)
      // const cityObj = {...this.state.city};
      // cityObj.id = Math.max(...cityIDs)+1;
      // this.setState( { city: cityObj });

      return Math.max(...cityIDs)+1;
    }

    // only if state is not set AND the cities array is not set yet.
    return "";
  }

  getSubID() {
    
    // if the ID already exists in state, just return it.
    if (this.state.subdivision.id) return this.state.subdivision.id;

    // ELSE, find the largest ID currently, then return +1.
    if (this.props.subdivisions.length > 0) {
      const subIDs = this.props.subdivisions.map((sub)=> {
        return sub.id;
      })

      console.log('cityIDs', subIDs)
      // const cityObj = {...this.state.city};
      // cityObj.id = Math.max(...cityIDs)+1;
      // this.setState( { city: cityObj });

      return Math.max(...subIDs)+1;
    }

    // only if state is not set AND the subdivisions array is not set yet.
    return "";
  }

  componentDidMount() {

    this.props.getLookup("STATE");
    this.props.getLookup("COUNTRY")

  }

  pad(n, width, z) {
    z = z || "0";
    n = !n? "0": n + "";
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  render() {

    // console.log("state LOV in render", this.props.stateLookup);
    // console.log("country LOV in render", this.props.countryLookup);

    // console.log("Session", this.props.session);
    const cityObj = {...this.state.city};
    const subObj = {...this.state.subdivision};

    let myCss;

    // CityList = Current List of cities in the cities table.
    const CityList = this.props.cities.map((city, id) => {

      // helps me stripe the rows to  add visible separation.
      id%2 === 0 ? myCss = "dark-striped" : myCss = "darker-striped";
  
      return (
        <tr key={id} className={myCss}>
          <td>{city.id}</td>
          <td>{city.city}</td>
          <td>{city.state_prov}</td>
          <td>{city.country}</td>
          <td>
            <Button
              type="button"
              bsStyle="warning"
              bsSize="small"
              block
              className=""
              onClick={(e) => {
                e.preventDefault();
                cityObj.id = city.id;
                cityObj.city = city.city;
                cityObj.state_prov = city.state_prov;
                cityObj.state_prov_long = city.state_prov_long;
                cityObj.country = city.country;
                cityObj.country_long = city.country_long;
                this.setState( { city: cityObj });
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
                if (this.props.deleteCity) this.props.deleteCity(city.id);
              }}
            >
              Delete
            </Button></td>
        </tr>

      )  // for CityList
    });  // for map

    // SubdivisionList = Current List of subdivisions in the subdivisions table.
    const SubdivisionList = this.props.subdivisions.map((sub, id) => {

      // helps me stripe the rows to  add visible separation.
      id%2 === 0 ? myCss = "dark-striped" : myCss = "darker-striped";
  
      return (
        <tr key={id} className={myCss}>
          <td>{sub.id}</td>
          <td>{sub.subdivision}</td>
          <td>{sub.city}</td>
          <td>
            <Button
              type="button"
              bsStyle="warning"
              bsSize="small"
              block
              className=""
              onClick={(e) => {
                e.preventDefault();
                subObj.id = sub.id;
                subObj.subdivision = sub.subdivision;
                subObj.city_id = sub.city_id;
                subObj.city = sub.city;
                this.setState( { subdivision: subObj });
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
                if (this.props.deleteSubdivision) this.props.deleteSubdivision(sub.id);
              }}
            >
              Delete
            </Button></td>
        </tr>

      )  // for SubdivisionList
    }); // for map

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
      <Grid className="gridNarrow">

        <h1 className="green">CITIES AND SUBDIVISIONS</h1>

        <Col md={6}>
          
          <form className="container-fluid" onSubmit={(e) => {
            e.preventDefault();
            if (this.props.createCity) {
              cityObj.created_by = this.props.session.id;
              cityObj.last_updated_by = this.props.session.id;
              this.setState({city: cityObj }, ()=> {
                this.props.createCity(this.state.city)
                this.setState({ city: this.city_init });
              });
            }
          }}>
            <h2 className="green">City Management</h2>
            <Row>
              <FormGroup bsSize="large" className="">
                <Col md={2} className="padding-0">
                  <FormControl
                    type="text"
                    className="required"
                    placeholder="ID"
                    disabled
                    value = {this.state.city.id?this.state.city.id:this.getCityID()}
                  />
                </Col>
                <Col md={4} className="padding-0">
                  <FormControl
                    type="text"
                    placeholder="City"
                    className="required"
                    value = {this.state.city.city?this.state.city.city:""}
                    onChange={(e) => {
                      cityObj.id = this.getCityID();
                      cityObj.city = e.target.value;
                      this.setState({ city: cityObj });
                    }} />
                </Col>
                <Col md={3} className="padding-0">
                  <Typeahead
                    onChange={(selected) => {
                      if (selected.length > 0) {
                        cityObj.state_prov = selected[0].code;
                        cityObj.state_prov_long = selected[0].name;
                        this.setState({ city: cityObj });
                      }
                    }}
                    labelKey="name"
                    options={this.props.stateLookup}
                    placeholder="State"
                    selected= {this.state.city.state_prov?[{name: this.state.city.state_prov_long}]:this.state.selected}
                  />
                </Col>
                <Col md={3} className="padding-0">
                  <Typeahead
                    onChange={(selected) => {
                      if (selected.length > 0) {
                        cityObj.country = selected[0].code;
                        cityObj.country_long = selected[0].name;
                        this.setState({ city: cityObj });
                      }
                    }}
                    labelKey="name"
                    options={this.props.countryLookup}
                    placeholder="Country"
                    selected= {this.state.city.country?[{name: this.state.city.country_long}]:this.state.selected}
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

          <h2 className="green">List of Cities</h2>

          <Table className="">
            <thead className="darker-striped">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">City</th> 
                <th scope="col">State/Prov</th>
                <th scope="col">Country</th>
                <th scope="col" colSpan="2">Action</th>

              </tr>
            </thead>
            <tbody>
              {CityList}
            </tbody>
          </Table>

        </Col>
        <Col md={6} className="">
          <h2 className="green">Subdivision Management</h2>
          <form className="container-fluid" onSubmit={(e) => {
            e.preventDefault();
            if (this.props.createSubdivision) {
              subObj.created_by = this.props.session.id;
              subObj.last_updated_by = this.props.session.id;
              this.setState({subdivision: subObj }, ()=> {
                this.props.createSubdivision(this.state.subdivision);
                this.setState({ subdivision: this.sub_init });
              });
            }
          }}>

            <Row>
              <FormGroup bsSize="large" className="">
                <Col md={2} className="padding-0">
                  <FormControl
                    type="text"
                    className="required"
                    placeholder="ID"
                    disabled
                    value = {this.state.subdivision.id?this.state.subdivision.id:this.getSubID()}
                  />
                </Col>
                <Col md={4} className="padding-0">
                  <FormControl
                    type="text"
                    placeholder="Subdivision"
                    className="required"
                    value = {this.state.subdivision.subdivision?this.state.subdivision.subdivision:""}
                    onChange={(e) => {
                      subObj.id = this.getSubID();
                      subObj.subdivision = e.target.value;
                      this.setState({ subdivision: subObj });
                    }} />
                </Col>
                <Col md={4} className="padding-0">
                  <Typeahead
                    onChange={(selected) => {
                      if (selected.length > 0) {
                        subObj.city_id = selected[0].id;
                        subObj.city = selected[0].city;
                        this.setState({ subdivision: subObj });
                      }
                    }}
                    labelKey="city"
                    options={this.props.cities}
                    selected= {this.state.subdivision.id?[{city: this.state.subdivision.city}]:this.state.selected}
                    placeholder="City"
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

          <h2 className="green">List of Subdivisions</h2>

          <Table>
            <thead className="darker-striped">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Subdivision</th> 
                <th scope="col">City</th>
                <th scope="col" colSpan="2">Action</th>

              </tr>
            </thead>
            <tbody>
              {SubdivisionList}
            </tbody>
          </Table>

        </Col>
      </Grid>
    );
  }

}
export default (CitySub);
