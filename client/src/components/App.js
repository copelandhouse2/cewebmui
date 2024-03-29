// v2.1.3
import React, { Component, Fragment } from "react";

// import "../css/App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
// import { styled } from '@material-ui/styles';
import HeaderContainer from "../containers/HeaderContainer";
import Footer from "./Footer";
// import Body from "./Body";
import { Grid } from "@material-ui/core";
import Button from '@material-ui/core/Button';

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
import ClientContainer from '../containers/ClientContainer';
import GeotechContainer from '../containers/GeotechContainer';
import SubdivisionContainer from '../containers/SubdivisionContainer';
import CityContainer from '../containers/CityContainer';
import InspectionContainer from "../containers/InspectionContainer";
// import TrelloTokenDialogContainer from "../containers/TrelloTokenDialogContainer";

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
    paddingBottom: 60,  // ensures the app doesn't go behind footer.
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
      authInProgress: false,
      trelloToken: localStorage.getItem('trello_token') || false,
      boxToken: localStorage.getItem('box_token') || false,
      boxAuthClicked: false,
      // settings: !this.props.session.settings?{accent_color: '#42a5f5'}:this.props.session.settings,
      // accent_color: this.props.session.settings.accent_color
    };
  }

  componentDidMount() {
    // console.log('CDM App.js',this.state);
    const theToken = localStorage.getItem('token');
    if (theToken !== null) {
      this.setState({ authInProgress: true}, () =>
      {
        // console.log('CDM... authenticating ', theToken)
        this.props.authenticate();
      })
    };

    if (this.state.trelloToken) this.props.initiateTrello(this.state.trelloToken);

    // console.log('CDM App.js: After authenticating')

    this.props.loadClients();
    this.props.loadCities();
    this.props.loadSubdivisions();
    this.props.loadContacts();
    this.props.loadUsers();
    // this.props.loadRequestors();  // a subset of contacts
    this.props.getLookup('ALL');

    // this.props.getLookup('STATE');
    // this.props.getLookup('COUNTRY');
    // this.props.getLookup('TRELLO_LIST');
    // this.props.getLookup('PROJECT_STATUS');
    // // this.props.getLookup('SCOPE');
    // this.props.getLookup('CLASSIFICATION');
    // this.props.getLookup('MASONRY');
    // this.props.getLookup('YN');
    // this.props.getLookup('FND_TYPE');
    // this.props.getLookup('GARAGE_TYPE');
    // this.props.getLookup('GARAGE_ENTRY');
    // this.props.getLookup('GARAGE_SWING');
    // this.props.getLookup('FLOOR_TYPE');
    // this.props.getLookup('ROOF_TYPE');
    // this.props.getLookup('COVERED_PATIO');
    // this.props.getLookup('PITA');
    // this.props.getLookup('DWELLING_TYPE');
    // this.props.getLookup('DATE_SEARCH');
    // this.props.getLookup('REV_REASON');
    // this.props.getLookup('REV_RESP');
    //
    // this.props.getLookup('INSP_TYPE');
    // this.props.getLookup('INSP_REASON');

    // this.props.getAllLookups();

    this.props.loadGeotechs();
    // 1 = MLALABS
    this.props.loadGeoMasterData(1);
    this.props.loadControls();
    this.props.loadRelationships();

    this.props.loadScope();
    this.props.loadOrganizations();

    // console.log('CDM App.js: Loaded all the lookups')

    // this.props.ynDialog();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { session, avffControls, avffRelationships } = nextProps;
    // console.log('in getDerivedStateFromProps', session);

    let updatedValues = {};
    if (!session.authInProgress) {
      Object.assign(updatedValues, {authInProgress: false});
    }

    if (!prevState.renderScreen && avffControls.length > 0 && avffRelationships.length > 0
    ) {
      Object.assign(updatedValues, {renderScreen: true});
    }

    return updatedValues;
  }

  // updateAccentColor = (color) => {
  //   let settings = {...this.props.session.userSettings};
  //
  //   settings = Object.assign({id: null, created_by: this.props.session.id}, settings,
  //     {accent_color: color, last_updated_by: this.props.session.id});
  //   // settings[created_by] = typeof settings.created_by === 'undefined'? this.props.session.id:settings.created_by;
  //
  //   // this.setState({ settings: settings }, () => {
  //   //   console.log('in setState callback');
  //   //   this.props.updateSettings(this.state.settings);
  //   // });
  //   // let session = {...this.props.session};
  //   // session.settings.accentColor = color;
  //   // console.log('updateColor', session);
  //   // this.props.updateSettings(session);
  //   // console.log('in updateAccentColor', this.props.session, settings);
  //   this.props.updateSettings(this.props.session, settings);
  //
  // }

  updateAccentColor = (color) => {
    // let prefs = {...this.props.preferences.user};

    // prefs = Object.assign(prefs,
      // {accentColor: color});
    const prefs = {id: this.props.preferences.user.id
      , updatedKey: 'accentColor'
      , value: color};
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
    this.props.updatePreferences(prefs);

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


  renderSignUpSignIn = () => {
    return (
      // <div>
      //   <Navbar />
      //   <CreateStartContainer />
      // </div>
      <SignUpSignInContainer />
      // <h1>I am not authenticated</h1>
    );
  }

  // getTrelloToken() {
  //   return ( <TrelloTokenDialogContainer /> );
  // }

  trelloAuthSuccess = () => {
    const trelloToken = localStorage.getItem('trello_token');
    // console.log('Successful authentication', trello_token);
    this.setState({ trelloToken: trelloToken }, ()=> {
      this.props.initiateTrello(trelloToken);
    });

  };

  trelloAuthFailure = () => {
    console.log('Failed authentication');
  };

  boxAuthWindow = window;
  BoxAuth = () => {
    return (
      <Grid container style={{height:'100%'}} direction='column' justify='center' alignItems='center' spacing={40}>
        <Grid item>
          <h3>{this.props.session.first_name}, Webtools needs to get box authorization from you.  This will enable webtools to create folders on your behalf.</h3>
        </Grid>
        <Grid item>
          <Button disabled={this.state.boxAuthClicked} variant='contained' onClick={()=>{
            this.setState({boxAuthClicked:true})
            this.boxAuthWindow.open(`http://localhost:3001/boxauth/${this.props.session.id}`,'Box Auth', 'width=600,height=600')
          }}>
            {this.state.boxAuthClicked?'Refresh Screen':'Authorize Box'}
          </Button>
        </Grid>
      </Grid>
    )
  }
  BoxAuthComplete = (props) => {
    return (
      <Grid container style={{height:'100%'}} direction='column' justify='center' alignItems='center' spacing={40}>
        <Grid item>
          <h3>Almost Done!  Click button to save token.</h3>
          <h3>Then refresh previous screen</h3>
        </Grid>
        <Grid item>
          <Button variant='contained' onClick={()=>this.boxSuccess(props)}>
            Save
          </Button>
        </Grid>
      </Grid>
    )
  }
  boxSuccess = (props) => {
    console.log('boxSuccess',props.match.params);
    localStorage.setItem('box_token', props.match.params.token);
    this.setState({ boxToken: props.match.params.token });
    this.boxAuthWindow.close();
  }

  renderBoxAuth(classes) {
    return (
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
              <Route path="/boxauthcomplete/:token" component={this.BoxAuthComplete} />
              <Route path="/" component={this.BoxAuth} />
            </Switch>
          </Grid>
        </Grid>
        <Footer />
        </Fragment>
    );
  }

  renderApp(classes) {
    // Test for user reload of page.  Now placed in renderApp
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      console.info( "User reloaded page" );
      window.history.pushState('','',`/`);
    }

    return (
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
              <Route path="/inspection" component={InspectionContainer} />
              <Route path="/search" component={SearchContainer} />
              <Route path="/client" component={ClientContainer} />
              <Route path="/city" component={CityContainer} />
              <Route path="/subdivision" component={SubdivisionContainer} />
              <Route path="/geotech" component={GeotechContainer} />
              <Route path="/underconstruction" component={UnderConstruction} />
              <Route path="/boxauth" component={UnderConstruction} />

              <Route path="/boxauthcomplete/:token" render={(props) => {
                return (
                  <Grid container justify='center' alignItems='center'>
                    <Grid item>
                      <h1>Box is validated</h1>
                      <Button onClick={()=>this.boxSuccess(props)}>
                        Close window and refresh previous screen
                      </Button>
                    </Grid>
                  </Grid>
                )}
              } />
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
    );
  }

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
    const { classes, session, preferences } = this.props;
    // const settings = session.userSettings;
    // localStorage.removeItem('trello_token');
    // console.log('the trello function',window.Trello);


    // console.log('Render Apps.js',
      // 'state:', this.state,
      // 'cities', this.props.cities,
      // 'designers:', this.props.designers,
      // 'inspectors:', this.props.inspectors,
      // 'revReasonLookup:', this.props.revReasonLookup,
      // 'revRespLookup:', this.props.revRespLookup,
      // 'preferences', this.props.preferences,
      // 'organizations', this.props.organizations,
      // 'session:', session
    // );

    // if (session.authInProgress) return null;
    if (this.state.authInProgress) {
      console.info('still authenticating');
      // console.info('still checking');
      return null;
    }

    // Test to make sure we can render Screen.  Only set to true when
    // avffControls and avffRelationships are populated.
    if (!this.state.renderScreen) {
      console.info('loading views and fields...');
      return null;
    }

    const accent = preferences.user.hasOwnProperty('accentColor')?preferences.user.accentColor:
      preferences.system.hasOwnProperty('accentColor')?preferences.system.accentColor:
      '#42a5f5';
    // console.log('accent', accent, preferences);
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
          main: accent,
          // main: !settings?'#42a5f5':settings.accent_color,
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

    if (session.authenticated) {
      console.log('session authenticated and settings loaded.  Render something');
      const boxToken = localStorage.getItem('box_token')||false;

      if (!this.state.trelloToken) {
        console.log('Requesting Trello authorization');
        // whatToRender = this.renderApp(classes);
        // whatToRender = this.getTrelloToken()
        window.Trello.authorize({
          type: 'popup',
          name: 'CE Webtools',
          scope: {
            read: 'true',
            write: 'true' },
          expiration: 'never',
          success: this.trelloAuthSuccess,
          error: this.trelloAuthFailure
        });
      // // Get Box Authorization
      // } else if (!boxToken) {
      //   console.log('box token not set')
      //   whatToRender = this.renderBoxAuth(classes);
      } else {
        whatToRender = this.renderApp(classes);
      }

    }

    else {
      console.log('display signup signin');
      whatToRender = this.renderSignUpSignIn();
    }

    // whatToRender2 = this.testFooter(classes);
    return (
      <Fragment>
        <CssBaseline />
          <MuiThemeProvider theme={theme}>
            {
              whatToRender
            }
            <AlertDialogContainer />
          </MuiThemeProvider>
      </Fragment>
    );

    // return whatToRender2
  }

}
export default withStyles(styles)(App);
