import React from "react";
// import "./App.css";
// import Main from "./components/Main";
// import { BrowserRouter, Switch, Route, Link } from "react-router-dom"
// import AddressContainer from "./containers/AddressContainer";
import StartsContainer from "../containers/StartsContainer";
import CreateStartContainer from "../containers/CreateStartContainer";
import { Grid, Row, Col } from "react-bootstrap";


function Main() {
  return (
      <Grid className="gridWide">
        <Row className="show-grid">
          <Col xs={12}><CreateStartContainer /></Col>
        </Row>

        <Row className="show-grid">
          <Col xs={12}><StartsContainer /></Col>
        </Row>
      </Grid>

  );

}
export default (Main);


/* <div className="container-fluid">
  <div className="row">
    <div className="col-md-3">
      <CreateAddressContainer />
    </div>
    <div className="col-md-6">
      <AddressesContainer />
    </div>
  </div>
</div> */
