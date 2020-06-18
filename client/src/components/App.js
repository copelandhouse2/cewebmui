import React, { Component, Fragment } from "react";

// import "../css/App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
// import { styled } from '@material-ui/styles';
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

import Navbar from "./Navbar";
// import ProjectMgmtContainer from "../containers/ProjectMgmtContainer";
import SignUpSignInContainer from "../containers/SignUpSignInContainer";
import WelcomeContainer from "../containers/WelcomeContainer";
import UnderConstruction from "../components/UnderConstruction";
import ProjectCustomContainer from "../containers/ProjectCustomContainer";
import SearchContainer from '../containers/SearchContainer';
// import ProjectTabularContainer from "../containers/ProjectTabularContainer";

import blueGrey from '@material-ui/core/colors/blueGrey';

const styles = theme => ({
  root: {
    // width:"75%",
    margin: "auto",
    height: '100%',
    paddingTop: 60
    // flexGrow: 1
  },
  appBody: {
    // width: "80%",
    margin: "auto",
    minHeight: "100%",
    paddingTop: 60,  // ensures the app is crowned by header
    paddingBottom: 100,  // ensures the app doesn't go behind footer.
    // zIndex: theme.zIndex.drawer+1,
    // overflow: 'auto',
  },
  appBodyWide: {
    width: '100%',
    margin: "auto"
  },
  appHeight: {
    minHeight: "100%",
    // height: "100%"
  },
  // Paper: { padding: 20, marginTop: 10, marginBottom: 10 },
  navWidth: {
    [theme.breakpoints.up("xs")]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: "60px",
    }
  },
  toolbar2: theme.mixins.toolbar,
  navBar: {
    marginTop: 60,  // used to avoid toolbar going behind header.
  },
  tParent: {
    minHeight: '100%'
  },
  // tChild: {
  //   backgroundColor: pink[200],
  //   overflow: 'auto',
  //   paddingBottom: 60,
  //   // height: 1500
  // },
  // tFooter: {
  //   backgroundColor: grey[800],
  //   height: 60,
  //   position: 'relative',
  //   marginTop: -60,
  //   clear: 'both'
  // },

});

// const promiseFn = theFunction => {
//   return new Promise((resolve, reject) => {
//       const response = theFunction;
//       console.log('Promise', response);
//       if (response) {
//         resolve(response);
//       } else {
//         reject(response);
//       }
//       // resolve(theFunction);
//   })
// };

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: localStorage.getItem('token') || false,
      open: false,  // navBar
      welcome: true,
      authInProgress: false
      // settings: !this.props.session.settings?{accent_color: '#42a5f5'}:this.props.session.settings,
      // accent_color: this.props.session.settings.accent_color
    };
  }

  componentDidMount() {
    // console.log('CDM App.js')
    const theToken = localStorage.getItem('token');
    if (theToken !== null) {
      this.setState({ authInProgress: true}, () =>
      {
        // console.log('CDM... authenticating ', theToken)
        this.props.authenticate();
      })

    };

    this.props.loadClients();
    this.props.loadCities();
    this.props.loadSubdivisions();
    this.props.loadContacts();
    this.props.loadUsers();
    // this.props.loadRequestors();  // a subset of contacts
    this.props.getLookup('STATE');
    this.props.getLookup('COUNTRY');
    this.props.getLookup('TRELLO_LIST');
    this.props.getLookup('PROJECT_STATUS');
    // this.props.getLookup('SCOPE');
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
    this.props.getLookup('DWELLING_TYPE');
    this.props.getLookup('DATE_SEARCH');
    this.props.getLookup('REV_REASON');
    this.props.getLookup('REV_RESP');

    this.props.loadGeotechs();
    // 1 = MLALABS
    this.props.loadGeoMasterData(1);
    this.props.loadControls();
    this.props.loadRelationships();

    this.props.loadScope();


  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { session } = nextProps;
    // console.log('in getDerivedStateFromProps', session);
    if (!session.authInProgress) {
      return {authInProgress: false} ;
    }
    return null;
  }

  updateAccentColor = (color) => {
    let settings = {...this.props.session.userSettings};

    settings = Object.assign({id: null, created_by: this.props.session.id}, settings,
      {accent_color: color, last_updated_by: this.props.session.id});
    // settings[created_by] = typeof settings.created_by === 'undefined'? this.props.session.id:settings.created_by;

    // this.setState({ settings: settings }, () => {
    //   console.log('in setState callback');
    //   this.props.updateSettings(this.state.settings);
    // });
    // let session = {...this.props.session};
    // session.settings.accentColor = color;
    // console.log('updateColor', session);
    // this.props.updateSettings(session);
    // console.log('in updateAccentColor', this.props.session, settings);
    this.props.updateSettings(this.props.session, settings);

  }

  handleSignOut = () => {
    localStorage.removeItem('token');
    this.setState({
      authenticated: false,
    });
  }

  toggleWelcomeScreen = (state) => {
    this.setState({
      welcome: state,
      open: false
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
        <Fragment>
        <HeaderContainer toggleDrawer = {this.toggleDrawer} navOpen = {this.state.open} updateAccentColor={this.updateAccentColor}/>
        <Grid container className={classes.appBody}>
          <Drawer
            open={this.state.open}
            variant='persistent'
            classes={{
              paper: classes.navBar,
            }}
            // anchor='left'
          >
            <Navbar />
          </Drawer>
          <Grid item xs={12} >
            <Switch>
              {/*when you get here, the currentMenu is loaded.*/}
              <Route path="/volumeproject" component={ProjectCustomContainer} />
              <Route path="/customproject" component={ProjectCustomContainer} />
              <Route path="/search" component={SearchContainer} />
              <Route path="/underconstruction" component={UnderConstruction} />
              <Route path="/dashboard" render={() =>
                <Grid container justify='center' alignItems='center'>
                  <Grid item>
                    <h1>The Dashboard</h1>
                  </Grid>
                </Grid>
              } />

              <Route path="/" render={() =>
                <WelcomeContainer toggleWelcomeScreen={this.toggleWelcomeScreen} /> }
              />

              <Route render={() => <h1>NOT FOUND!</h1>} />
            </Switch>
          </Grid>
        </Grid>
        <Footer />
        </Fragment>
      </BrowserRouter>
    );
  }

  // renderApp(classes) {
  //   return (
  //     <BrowserRouter>
  //
  //       <div className={classes.root}>
  //         {!this.state.welcome && <HeaderContainer toggleDrawer = {this.toggleDrawer} navOpen = {this.state.open}/>}
  //         <Grid container className={this.state.welcome? classes.appBodyWide : classes.appBody}>
  //           <Drawer
  //             open={this.state.open}
  //             variant='persistent'
  //             // anchor='left'
  //           >
  //             <div className={classes.toolbar2} />
  //             <Navbar toggleWelcomeScreen={this.toggleWelcomeScreen} />
  //           </Drawer>
  //           <Grid item xs={12}>
  //             {!this.state.welcome && <div className={classes.toolbar2} />}
  //             <Switch>
  //               <Route exact path="/" render={() =>
  //                 <WelcomeContainer toggleWelcomeScreen={this.toggleWelcomeScreen} />
  //               } />
  //               <Route path="/projectmgmt" component={ProjectMgmtContainer} />
  //               <Route path="/dashboard" render={() =>
  //                 <Grid container justify='center' alignItems='center'>
  //                   <Grid item>
  //                     <h1>The Dashboard</h1>
  //                   </Grid>
  //                 </Grid>
  //               } />
  //               <Redirect to="/" />
  //             </Switch>
  //           </Grid>
  //         </Grid>
  //         {!this.state.welcome && <Footer />}
  //       </div>
  //     </BrowserRouter>
  //   );
  // }

  // testFooter(classes) {
  //   return (
  //     <Fragment>
  //     <div className={classes.tParent}>
  //       <div className={classes.tChild}>
  //         <p>This is some content</p>
  //       </div>
  //     </div>
  //     <footer className={classes.tFooter}>
  //       I am a footer
  //     </footer>
  //     </Fragment>
  //   )
  //
  // }

  render() {

    const { classes, session } = this.props;
    const settings = session.userSettings;

    // console.log('Render Apps.js',
    //   'designers:', this.props.designers,
    //   'revReasonLookup:', this.props.revReasonLookup,
    //   'revRespLookup:', this.props.revRespLookup,
    // );

    // if (session.authInProgress) return null;
    if (this.state.authInProgress) {
      // console.log('still authenticating');
      return null;
    }

    let theme = createMuiTheme({
      typography: {
        useNextVariants: true,
        fontFamily: '"Roboto", "Walter Turncoat", "Arial", "Rock Salt", "Helvetica", sans-serif, cursive',
        // fontFamily: '\"Roboto\", \"Red Hat Text\", \"Walter Turncoat\", \"Henny Penny\", \"Gayathri\", \"Nanum Pen Script\", \"Flamenco\", \"Arial\", \"Rock Salt\", \"Sedgwick Ave\", \"Helvetica\", sans-serif, cursive'
      },
      palette: {
        primary: {
          // main: grey[500],
          // main: '#3f51b5',
          // main: lightBlue[600],
          // main: blueGrey[100],
          // main: blue[600],
          main: blueGrey[400],
          // contrastText: '#fff'
        },
        secondary: {
          // main: this.state.accentColor,
          main: !settings?'#42a5f5':settings.accent_color,
          // main: this.state.accent_color,
          // main: '#42a5f5',
          // main: blue[400],
          // main: '#f44336',
          // contrastText: '#000'

        },

        // primary: blueGrey,
        // secondary: lightGreen,
        // error: red,
        contrastThreshold: 3,
        tonalOffset: 0.2,

        // primary: grey,
        // secondary: blue,
        // primary: {
        //   light: '#484848',
        //   main: '#212121',
        //   dark: '#000000',
        //   contrastText: '#fff',
        // },
        // secondary: {
        //   light: '#f5fd67',
        //   main: '#c0ca33',
        //   dark: '#8c9900',
        //   contrastText: '#000',
        // },
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
    // let whatToRender2 = '';
    // localStorage.removeItem('token');

    // const theToken = localStorage.getItem('token');
    // console.log('App Start', this.props.session);
    // console.log('App Start token', theToken);

    // console.log('authenticated', this.props.session.authenticated)

    // if (!session.authInProgress && session.authenticated) {
    if (session.authenticated) {
      whatToRender = this.renderApp(classes);
    }

    else {
      whatToRender = this.renderSignUpSignIn();
    }

    // whatToRender2 = this.testFooter(classes);
    return (
      <Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          {
            whatToRender
            // whatToRender2
          }
          <AlertDialogContainer />
        </MuiThemeProvider>
      </Fragment>
    );

    // return whatToRender2
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


// <Route path="/search" component={()=> <ProjectCustomContainer VIEW='TABULAR'/>} />
