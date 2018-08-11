import React, { Component } from "react";
import "./App.css";
// import Main from "./components/Main";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import StartsContainer from "./containers/StartsContainer";
// import Navbar from "./components/Navbar";
// import CreateStartContainer from "./containers/CreateStartContainer";
// import ClientContainer from "./containers/ClientContainer";
// import CitySubContainer from "./containers/CitySubContainer";
// import JobNumberSeqContainer from "./containers/JobNumberSeqContainer";
// import GetNextJobNumberContainer from "./containers/GetNextJobNumberContainer";
import SignUpSignInContainer from "./containers/SignUpSignInContainer";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


class App extends Component {

  componentDidMount() {
    // this.props.loadSession('cmcopeland@copeland-eng.com');
    // this.props.loadAddresses();
    // this.props.loadCities();
    // this.props.loadClients();
    // this.props.loadSubdivisions();
    // this.props.loadJobNumberSeqs();

  }

  renderSignUpSignIn() {
    return (
      <SignUpSignInContainer />
      // <h1>I am not authenticated</h1>
    );
  }

  renderApp() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" render={() => <h1>I am protected!</h1>} />
            <Route render={() => <h1>NOT FOUND!</h1>} />
          </Switch>
          <h1>Here I am</h1>
        </div>
      </BrowserRouter>
    );
  }

  render() {

    const theme = createMuiTheme({
      palette: {
        primary: {
          light: '#484848',
          main: '#212121',
          dark: '#000000',
          contrastText: '#fff',
        },
        secondary: {
          light: '#f5fd67',
          main: '#c0ca33',
          dark: '#8c9900',
          contrastText: '#000',
        },
      },
    });

    let whatToRender = "";
    if (this.props.session.authenticated) {
      whatToRender = this.renderApp();

    } else { // IF statement
      whatToRender = this.renderSignUpSignIn();
    }

    return (
      <MuiThemeProvider theme={theme}>
        {whatToRender}
      </MuiThemeProvider>
    );

  }

  // render() {

  //   return (
  //     <BrowserRouter>
  //       <div>
  //         <Switch>
  //           <Route path="/" render={() => <h1>I am protected!</h1>} />
  //           <Route render={() => <h1>NOT FOUND!</h1>} />
  //         </Switch>
  //         <h1>Here I am</h1>
  //       </div>
  //     </BrowserRouter>
  //   );

  // }

}
export default (App);
