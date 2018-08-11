import React, { Component } from "react";
import "./App.css";
// import Main from "./components/Main";
import { BrowserRouter, Switch, Route } from "react-router-dom"
import StartsContainer from "./containers/StartsContainer";
import Navbar from "./components/Navbar";
import CreateStartContainer from "./containers/CreateStartContainer";
import ClientContainer from "./containers/ClientContainer";
import CitySubContainer from "./containers/CitySubContainer";
import JobNumberSeqContainer from "./containers/JobNumberSeqContainer";
import GetNextJobNumberContainer from "./containers/GetNextJobNumberContainer";
// import SignUpSignInContainer from "./containers/SignUpSignInContainer";


class App extends Component {

  componentDidMount() {
    this.props.loadSession('cmcopeland@copeland-eng.com');
    this.props.loadAddresses();
    this.props.loadCities();
    this.props.loadClients();
    this.props.loadSubdivisions();
    this.props.loadJobNumberSeqs();

  }

  render() {
    if (true) {
      return (
        // console.log("session values", this.props.session);
        // console.log("city values", this.props.cities);
        // console.log("client values", this.props.clients);
        // console.log("subdivision values", this.props.subdivisions);
        // console.log("job number sequences", this.props.jobnumberseqs);
    
        <div id="gradient">
          <BrowserRouter>
            <div>
              <Navbar />
              <Switch>
                <Route path="/create" component={CreateStartContainer} />
                <Route path="/starts" component={StartsContainer} />
                <Route path="/clients" component={ClientContainer} />
                <Route path="/citySubs" component={CitySubContainer} />
                <Route path="/jobNumberSeqs" component={JobNumberSeqContainer} />
                <Route path="/getnextjobnumber" component={GetNextJobNumberContainer} />
  
              </Switch>
            </div>
          </BrowserRouter>
  
        </div>
      );
    }  // IF statement

    // return (
    //   <div>
    //     <SignUpSignInContainer />
    //   </div>
    // )
  }

}
export default (App);

// <BrowserRouter>
//   <div>
//     <Switch>
//       <Route path="/addresses/:id" component={AddressContainer} />
//       <Route path="/" component={AddressesContainer} />
//     </Switch>
//     <Link to={"/"}>
//       <i className="fa fa-fw fa-dashboard" /> Address Home
//     </Link>
//
//   </div>
// </BrowserRouter>

// <Link to={"/addresses/:id"}>ID</Link>
//   <Link to={"/" + this.props.path + "/" + d._id}> View </Link>

{/* <div className="links"><Link to={`/`} className="white"> Home </Link></div>
<div className="links"><Link to={`/addresses`} className="white"> List of Addresses </Link></div>
<div className="links"><Link to={`/create`} className="white"> Add Address </Link></div> */}

