import React, { Component } from "react";
import "../css/App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import ProjectMgmtContainer from "../containers/ProjectMgmtContainer";
import SignUpSignInContainer from "../containers/SignUpSignInContainer";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import HeaderContainer from "../containers/HeaderContainer";
import Footer from "./Footer";
// import Body from "./Body";
import { Grid } from "@material-ui/core";
import AlertDialogContainer from "../containers/AlertDialogContainer";
// import StartsContainer from "./containers/StartsContainer";
// import ClientContainer from "./containers/ClientContainer";
// import CitySubContainer from "./containers/CitySubContainer";
// import Main from "./Main";
import Drawer from '@material-ui/core/Drawer';


const styles = theme => ({
  canvas: {
    // backgroundColor: "#303030",
  },
  root: {
    // width:"75%",
    margin: "auto",
  },
  appBody: {
    width: "95%",
    margin: "auto"
  },
  appHeight: {
    height: "100%"
  },
  Paper: { padding: 20, marginTop: 10, marginBottom: 10 },
  navWidth: {
    [theme.breakpoints.up("xs")]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: "60px",
    }
  },
  toolbar2: theme.mixins.toolbar,
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: localStorage.getItem('token') || false,
      open: false
    };
  }

  componentDidMount() {
    // this.props.loadSession('cmcopeland@copeland-eng.com');
    this.props.loadClients();
    this.props.loadCities();
    this.props.loadSubdivisions();
    this.props.loadContacts();

    this.props.getLookup('TRELLO_LIST');
    this.props.getLookup('PROJECT_STATUS');
    this.props.getLookup('SCOPE');
    this.props.getLookup('CLASSIFICATION');
    this.props.getLookup('MASONRY');
    this.props.getLookup('YN');
    this.props.getLookup('FND_TYPE');
    this.props.getLookup('GARAGE_TYPE');
    this.props.getLookup('GARAGE_ENTRY');
    this.props.getLookup('GARAGE_SWING');
    this.props.getLookup('FLOOR_TYPE');
    this.props.getLookup('ROOF_TYPE');
    this.props.getLookup('COVERED_PATIO');
    this.props.getLookup('PITA');

    this.props.loadGeotechs();
    // 1 = MLALABS
    this.props.loadGeoMasterData(1);
  }

  handleSignOut = () => {
    localStorage.removeItem('token');
    this.setState({
      authenticated: false
    });
  }

  toggleDrawer = () => {
    this.setState({ open: !this.state.open });
  };

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
          <HeaderContainer toggleDrawer = {this.toggleDrawer} navOpen = {this.state.open}/>
          <Grid container className={classes.appBody}>
            <Drawer
              open={this.state.open}
              variant='persistent'
              // anchor='left'
            >
              <div className={classes.toolbar2} />
              <Navbar />
            </Drawer>
            <Grid item xs={12}>
              <div className={classes.toolbar2} />
              <Switch>
                <Route path="/projectmgmt" component={ProjectMgmtContainer} />
                <Route path="/" render={() =>
                  <Grid container justify='center' alignItems='center'>
                    <Grid item>
                      <h1>The Dashboard</h1>
                    </Grid>
                  </Grid>
                } />
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
      typography: {
        useNextVariants: true,
      },
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
      overrides: {
        // MuiButtonBase: { minWidth: 80 },
        MuiTab: {
          root: {
            // minWidth: 80,
            '@media (min-width: 960px)': {
              minWidth: 80
            }
          },
        }
      },
    });


    let whatToRender = '';
    // localStorage.removeItem('token');

    const theToken = localStorage.getItem('token');
    // console.log('App Start', this.props.session);
    // console.log('App Start token', localStorage.getItem('token'));

    if (this.props.session.authenticated) {
      whatToRender = this.renderApp(classes);
    }
    else if (theToken !== null) {
      this.props.authenticate();
    }
    else {
      whatToRender = this.renderSignUpSignIn();
    }

    return (
      <div className={classes.canvas}>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          {whatToRender}
          <AlertDialogContainer />
        </MuiThemeProvider>
      </div>
    );

  }

}
export default withStyles(styles)(App);


// <Grid item className={classes.navWidth}>
//   <Navbar handleSignOut = {this.handleSignOut}/>
// </Grid>
// <Grid item xs={12} md={11}>
//   <Switch>
//     <Route path="/create-start" component={CreateStartContainer} />
//     <Route path="/" render={() =>
//       <Grid container justify='center' alignItems='center'>
//         <Grid item>
//           <h1>The Dashboard</h1>
//         </Grid>
//       </Grid>
//     } />
//     <Route render={() => <h1>NOT FOUND!</h1>} />
//   </Switch>
// </Grid>

// <Grid container className={classes.appBody}>
//   <Main />
// </Grid>

// *** Modified version using Main. ***
// <BrowserRouter>
//   <div className={classes.root}>
//     <Switch>
//       <Route path="/create-start" component={Main} />
//       <Route path="/" render={() =>
//         <Grid container justify='center' alignItems='center'>
//           <Grid item>
//             <h1>The Dashboard</h1>
//           </Grid>
//         </Grid>
//       } />
//       <Route render={() => <h1>NOT FOUND!</h1>} />
//     </Switch>
//
//     <Footer />
//   </div>
// </BrowserRouter>

// ** Modified version with Drawer code **
// <BrowserRouter>
//   <div className={classes.root}>
//     <HeaderContainer toggleDrawer = {this.toggleDrawer}/>
//     <Grid container className={classes.appBody}>
//       <Drawer
//         open={this.state.open}
//         variant='persistent'
//         // anchor='left'
//       >
//         <div className={classes.toolbar2} />
//         <Navbar />
//       </Drawer>
//       <div className={classes.toolbar2} />
//       <Switch>
//         <Route path="/projects" component={CreateStartContainer} />
//         <Route path="/" render={() =>
//           <Grid container justify='center' alignItems='center'>
//             <Grid item>
//               <h1>The Dashboard</h1>
//             </Grid>
//           </Grid>
//         } />
//         <Route render={() => <h1>NOT FOUND!</h1>} />
//       </Switch>
//     </Grid>
//     <Footer />
//   </div>
// </BrowserRouter>
