import React, { Component, Fragment } from "react";
import "../css/App.css";
// import Main from "./components/Main";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import StartsContainer from "./containers/StartsContainer";
import Navbar from "./Navbar";
import CreateStartContainer from "../containers/CreateStartContainer";
// import ClientContainer from "./containers/ClientContainer";
// import CitySubContainer from "./containers/CitySubContainer";
// import JobNumberSeqContainer from "./containers/JobNumberSeqContainer";
// import GetNextJobNumberContainer from "./containers/GetNextJobNumberContainer";
import SignUpSignInContainer from "../containers/SignUpSignInContainer";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Header from "./Header";
import Footer from "./Footer";
// import Body from "./Body";
import { Grid } from "@material-ui/core";



const styles = {
  canvas: {
    // backgroundColor: "#303030",
  },
  root: {
    // width:"75%",
    margin: "auto",
  },
  appBody: {
    width: "85%",
    margin: "auto"
  },
  appHeight: {
    height: "100%"
  },
  Paper: { padding: 20, marginTop: 10, marginBottom: 10 },
}

class App extends Component {

  componentDidMount() {
    this.props.loadSession('cmcopeland@copeland-eng.com');
    this.props.loadAddresses();
    this.props.loadCities();
    this.props.loadClients();
    this.props.loadSubdivisions();
    this.props.loadJobNumberSeqs();
    

  }

  renderSignUpSignIn() {
    return (
      // <div>
      //   <Navbar />
      //   <CreateStartContainer />
      // </div>
      <SignUpSignInContainer />
      // <h1>I am not authenticated</h1>
    );
  }

  renderApp(classes) {
    return (
      <BrowserRouter>
        <div className={classes.root}>
          <Header />
          <Grid container className={classes.appBody}>
            <Grid item>
              <Navbar />
            </Grid>
            <Grid item xs={12} sm>
              <Switch>
                <Route path="/create-start" component={CreateStartContainer} />
                <Route path="/" render={() => <h1>I am protected!</h1>} />
                <Route render={() => <h1>NOT FOUND!</h1>} />
              </Switch>
            </Grid>
          </Grid>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }

  render() {
    const { classes } = this.props;

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
        error: {
        light: "#e57373",
        main: "#f44336",
        dark: "#d32f2f",
        contrastText: "#fff",
        },
      },
    });

    let whatToRender = "";
    // if (this.props.session.authenticated) {
    if (true) {
        whatToRender = this.renderApp(classes);

    } else { // IF statement
      whatToRender = this.renderSignUpSignIn();
    }

    return (
      <div className={classes.canvas}>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          {whatToRender}
        </MuiThemeProvider>
      </div>
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
export default withStyles(styles)(App);
