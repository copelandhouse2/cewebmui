import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link, Redirect } from "react-router-dom"
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import Fab from '@material-ui/core/Fab';

// import setup from '../img/setup4.svg'
// import volume from '../img/volume3.svg'
//   import lotshell from '../img/lotshell1.svg'
//   import acetate from '../img/acetate1.svg'
//   import lfa from '../img/lfa1.svg'
//   import sslfa from '../img/lfass1.svg'
//   import plotplan from '../img/plotplan1.svg'
//   import masterfrm from '../img/masterfrm1.svg'
//   import ssarch from '../img/ssarch1.svg'
//
//   import volfdn from '../img/foundation2.svg'
//   import volframing from '../img/framing3.svg'
// import custom from '../img/custom2.svg'
//   import cusframing from '../img/framing2.svg'
//   import pool from '../img/pool1.svg'
//   import gravretwall from '../img/retwallgrav2.svg'
//   import cantretwall from '../img/retwallcant3.svg'
//   import splitterbox from '../img/splitterbox2.svg'
//   import detpond from '../img/detpond1.svg'
//   import retpond from '../img/retpond1.svg'
//   import culvert from '../img/culvert1.svg'
//   import amenity from '../img/amenity2.svg'
//   import bball from '../img/bball4.svg'
//   import tennis from '../img/tennis1.svg'
//   import monument from '../img/monument1.svg'
//   import wall from '../img/wall1.svg'
//   import column from '../img/column1.svg'
//   import trellis from '../img/trellis1.svg'
//   import raingarden from '../img/raingarden1.svg'
//   import cusfdn from '../img/foundation1.svg'

// import inspection from '../img/inspection2.svg'

import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

const btnSize = {
  sm: 50,
  md: 75,
  lg: 150,
  xl: 200,
};

// OLD code to define svg's
// const topButtons = [
//   {
//     url: '/',
//     image: `${setup}`,
//     name: 'setup',
//     title: 'Setup',
//     bgColor: 'HotPink'
//   },
//   {
//     url: '/',
//     image: `${volume}`,
//     name: 'volume',
//     title: 'Volume',
//     bgColor: 'YellowGreen'
//
//   },
//   {
//     url: '/',
//     image: `${custom}`,
//     name: 'custom',
//     title: 'Custom',
//     bgColor: 'LightSeaGreen'
//
//   },
//   {
//     url: '/',
//     image: `${inspection}`,
//     name: 'inspection',
//     title: 'Inspection',
//     bgColor: 'Salmon'
//
//   },
// ];
//
// const setupButtons = [
//   {
//     url: '/underconstruction',
//     image: `${setup}`,
//     name: 'vbmsa',
//     title: 'Master Services Agreement',
//     bgColor: 'hotpink'
//   },
//   {
//     url: '/underconstruction',
//     image: `${setup}`,
//     name: 'volonboard',
//     title: 'Volume Builder Onboard',
//     bgColor: 'hotpink'
//   },
//   {
//     url: '/underconstruction',
//     image: `${setup}`,
//     name: 'clientmaint',
//     title: 'Client Maintenance',
//     bgColor: 'hotpink'
//   },
//   {
//     url: '/underconstruction',
//     image: `${setup}`,
//     name: 'civil',
//     title: 'Civil Eng Subdivision Rules',
//     bgColor: 'hotpink'
//   },
//   {
//     url: '/underconstruction',
//     image: `${setup}`,
//     name: 'geotech',
//     title: 'Geotech Maintenance',
//     bgColor: 'hotpink'
//   },
//   {
//     url: '/underconstruction',
//     image: `${setup}`,
//     name: 'georeport',
//     title: 'Geotech Reports',
//     bgColor: 'hotpink'
//   },
//   {
//     url: '/underconstruction',
//     image: `${setup}`,
//     name: 'submaint',
//     title: 'Subdivision Maintenance',
//     bgColor: 'hotpink'
//   },
//   {
//     url: '/underconstruction',
//     image: `${setup}`,
//     name: 'citymaint',
//     title: 'City Maintenance',
//     bgColor: 'hotpink'
//   },
//   {
//     url: '/underconstruction',
//     image: `${setup}`,
//     name: 'fieldsetup',
//     title: 'Field / View / Action Maintenance',
//     bgColor: 'hotpink'
//   },
// ];
//
// const volumeButtons = [
//   {
//     url: '/underconstruction',
//     image: `${lotshell}`,
//     name: 'lotshell',
//     title: 'Lot Shell',
//     bgColor: 'yellowgreen'
//   },
//   {
//     url: '/underconstruction',
//     image: `${acetate}`,
//     name: 'acetate',
//     title: 'Acetates',
//     bgColor: 'yellowgreen'
//   },
//   {
//     url: '/underconstruction',
//     image: `${lfa}`,
//     name: 'lfa',
//     title: 'Lot Fit Analysis',
//     bgColor: 'yellowgreen'
//   },
//   {
//     url: '/underconstruction',
//     image: `${sslfa}`,
//     name: 'sslfa',
//     title: 'Single Sale LFA',
//     bgColor: 'yellowgreen'
//   },
//   {
//     url: '/underconstruction',
//     image: `${plotplan}`,
//     name: 'plot',
//     title: 'Plot Plan',
//     bgColor: 'yellowgreen'
//   },
//   {
//     url: '/underconstruction',
//     image: `${masterfrm}`,
//     name: 'volmf',
//     title: 'Master Frame',
//     bgColor: 'yellowgreen'
//   },
//   {
//     url: '/projectmgmt',
//     image: `${volframing}`,
//     name: 'volssf',
//     title: 'Site Specific Frame',
//     bgColor: 'yellowgreen'
//   },
//   {
//     url: '/underconstruction',
//     image: `${ssarch}`,
//     name: 'volssa',
//     title: 'Site Specific Arch',
//     bgColor: 'yellowgreen'
//   },
//   {
//     url: '/projectmgmt',
//     image: `${volfdn}`,
//     name: 'foundation',
//     title: 'Foundation',
//     bgColor: 'yellowgreen'
//   },
// ];
//
// const customButtons = [
//   {
//     url: '/underconstruction',
//     image: `${cusfdn}`,
//     name: 'cusfoundation',
//     title: 'Foundation',
//     bgColor: 'teal'
//   },
//   {
//     url: '/underconstruction',
//     image: `${cusframing}`,
//     name: 'cusframing',
//     title: 'Site Specific Frame',
//     bgColor: 'LightSeaGreen'
//   },
//   {
//     url: '/underconstruction',
//     image: `${gravretwall}`,
//     name: 'gravretwall',
//     title: 'Gravity Ret Wall',
//     bgColor: 'LightSeaGreen'
//   },
//   {
//     url: '/underconstruction',
//     image: `${cantretwall}`,
//     name: 'cantretwall',
//     title: 'Cantilevered Ret Wall',
//     bgColor: 'LightSeaGreen'
//   },
//   {
//     url: '/underconstruction',
//     image: `${pool}`,
//     name: 'pool',
//     title: 'Pool',
//     bgColor: 'LightSeaGreen'
//   },
//   {
//     url: '/underconstruction',
//     image: `${splitterbox}`,
//     name: 'splitter',
//     title: 'Splitter Box',
//     bgColor: 'LightSeaGreen'
//   },
//   {
//     url: '/underconstruction',
//     image: `${detpond}`,
//     name: 'detpond',
//     title: 'Detention Pond',
//     bgColor: 'LightSeaGreen'
//   },
//   {
//     url: '/underconstruction',
//     image: `${retpond}`,
//     name: 'retpond',
//     title: 'Retention Pond',
//     bgColor: 'LightSeaGreen'
//   },
//   {
//     url: '/underconstruction',
//     image: `${culvert}`,
//     name: 'culvert',
//     title: 'Culvert',
//     bgColor: 'LightSeaGreen'
//   },
//   {
//     url: '/underconstruction',
//     image: `${amenity}`,
//     name: 'amenity',
//     title: 'Amenity Center',
//     bgColor: 'LightSeaGreen'
//   },
//   {
//     url: '/underconstruction',
//     image: `${bball}`,
//     name: 'bball',
//     title: 'Basketball Court',
//     bgColor: 'LightSeaGreen'
//   },
//   {
//     url: '/underconstruction',
//     image: `${tennis}`,
//     name: 'tennis',
//     title: 'Tennis Court',
//     bgColor: 'LightSeaGreen'
//   },
//   {
//     url: '/underconstruction',
//     image: `${monument}`,
//     name: 'monument',
//     title: 'Entry Monument',
//     bgColor: 'LightSeaGreen'
//   },
//   {
//     url: '/underconstruction',
//     image: `${wall}`,
//     name: 'wall',
//     title: 'Wall',
//     bgColor: 'LightSeaGreen'
//   },
//   {
//     url: '/underconstruction',
//     image: `${column}`,
//     name: 'column',
//     title: 'Column',
//     bgColor: 'LightSeaGreen'
//   },
//   {
//     url: '/underconstruction',
//     image: `${trellis}`,
//     name: 'trellis',
//     title: 'Trellis',
//     bgColor: 'LightSeaGreen'
//   },
//   {
//     url: '/underconstruction',
//     image: `${raingarden}`,
//     name: 'rain',
//     title: 'Rain Garden',
//     bgColor: 'LightSeaGreen'
//   },
// ];

const textStrength = 'main';
const styles = theme => ({
  container: {
    minHeight: '100%',
    // backgroundColor: theme.palette.secondary.main,
    display: 'grid',
  },
  title: {
    fontFamily: 'Walter Turncoat',
    textAlign: 'center',
    paddingTop: 30,
    paddingBottom: 20,
    color: textStrength === 'main'? theme.palette.secondary.main: theme.palette.secondary.light,
    // color: 'inherit',
    // color: theme.palette.primary.contrastText,
    fontSize: 20,
    [theme.breakpoints.up('sm')]: {
      fontSize: 20,
      paddingBottom: 0,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 32,
      paddingBottom: 0,
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 48,
      paddingBottom: 0,
    },

  },
  fab: {
    // position: 'relative',
    // backgroundColor: 'teal',
    margin: 'auto',
    height: btnSize.md,
    width: btnSize.md,
    [theme.breakpoints.up('md')]: {
      width: btnSize.lg,
      height: btnSize.lg,
    },
    '&:hover': {
      backgroundColor: 'white !important',
      opacity: '1 !important',
      '& $imageSrc': {
        opacity: 1,
        transitionProperty: 'opacity',
        transitionDuration: '1s',
        transitionTimingFunction: 'ease-in-out',
      },
    },
  },
  fabInner: {
    display: 'flex',
    borderRadius: '50%',
    height: btnSize.md-7,
    width: btnSize.md-7,
    [theme.breakpoints.up('md')]: {
      width: btnSize.lg-10,
      height: btnSize.lg-10,
    },
  },
  childFab: {
    // position: 'relative',
    margin: 'auto',
    height: btnSize.sm,
    width: btnSize.sm,
    [theme.breakpoints.up('md')]: {
      width: btnSize.md,
      height: btnSize.md,
    },
    '&:hover': {
      backgroundColor: 'white !important',
      opacity: '1 !important',
      '& $imageSrc': {
        opacity: 1,
        transitionProperty: 'opacity',
        transitionDuration: '1s',
        transitionTimingFunction: 'ease-in-out',
      },
    },
  },
  childFabInner: {
    display: 'flex',
    borderRadius: '50%',
    height: btnSize.sm-5,
    width: btnSize.sm-5,
    [theme.breakpoints.up('md')]: {
      width: btnSize.md-7,
      height: btnSize.md-7,
    },
  },
  buttonTitle: {
    fontFamily: 'Walter Turncoat',
    color: textStrength === 'main'? theme.palette.secondary.main: theme.palette.secondary.light,
    textAlign: 'center',
    fontSize: 20,
    [theme.breakpoints.up('md')]: {
      fontSize: 24,
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 28,
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: 32,
    },
  },
  buttonTitleSub: {
    fontFamily: 'Walter Turncoat',
    color: textStrength === 'main'? theme.palette.secondary.main: theme.palette.secondary.light,
    textAlign: 'center',
    fontSize: 14,
    // color: 'white',
    [theme.breakpoints.up('md')]: {
      fontSize: 18,
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 20,
    },
  },
  imageSrc: {
    // position: 'absolute',
    // display: 'block',
    // marginLeft: -50,
    // left: 0,
    // right: 0,
    // top: 0,
    // bottom: 0,
    opacity: '0.5',
    transitionProperty: 'opacity',
    transitionDuration: '1s',
    transitionTimingFunction: 'ease-in-out',
    height: '75%',
    // width: '80%',
    margin: 'auto',

  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 10,
    justify: 'center'

  },
  checkmark: {
    position: 'absolute',
    fontSize: 36,
    color: '#424242',
    zIndex: 1,
    margin: 'auto',

  },
  actionRow: {
    padding: 100
  },
});

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '/',
      scope: [],
      previous: [],
      redirect: false,
    };

    this.initState = {...this.state};

  }

  componentDidMount() {
    this.props.loadChildControls(1);
  }

  handleClick = selected => event => {
    // console.log('field name: ', name, event.target);
    const { id, name, url } = selected;
    let newPrevious = [...this.state.previous];
    newPrevious.push({id: this.props.currentControls.id, name: this.props.currentControls.name})
    // let next = {id: selected.id, name: selected.name}

    if (name === 'top') {
      this.setState(this.initState);
      this.props.loadChildControls(id);
    } else if (name ==='setup'||name ==='volume'||name==='custom'||name==='inspection') {
      this.setState( { url: url, previous: newPrevious } )
      this.props.loadChildControls(id);
    } else if (name==='volnew'||name === 'cusnew') {
      this.setState( { previous: newPrevious } )
      this.props.loadChildControls(id);
    } else {
      let curScope = [...this.state.scope];

      // test for existence.
      let index = curScope.findIndex(scope => scope.name === name);
      // console.log('handleClick curScope BEFORE: ', index, button.name, curScope);

      // either remove value or add it.
      index > -1 ? curScope.splice(index, 1) : curScope.push(selected);
      // console.log('handleClick curScope AFTER: ', index, button.name, curScope);
      this.setState({ scope: curScope });
    };

  };

  handleBack = event => {
    // console.log('field name: ', name, event.target);
    // let name = selected.name;
    const newPrevious = [...this.state.previous];
    const backTo = newPrevious.pop();

    const scope = backTo.name === 'top'? [] : [...this.state.scope];
    // let previous = {id: 1, name: 'top'}
    this.props.loadChildControls(backTo.id);
    this.setState({ scope: scope, previous: newPrevious })

  };

  handleButtonNext = async () => {
    try {
      await this.props.assignNewProjectScope( {url: this.state.url, initialScope: [...this.state.scope]} );
      this.setState( { redirect: true } );
    } catch (err) {
      console.log('Error', err);
    }

  }
  // getLink = () => {
  //
  //   // test if there is no scope.  Just go back to the beginning.
  //   if (this.state.scope.length === 0) {
  //     return '/';
  //   }
  //
  //   //Got here.  There are scope items selected.  Testing if they have a screen.
  //   let defaultLink = '/underconstruction'; // not ready yet.
  //   let filtered = [];
  //
  //   filtered = this.state.scope.filter(scope => scope.url !== defaultLink);
  //
  //   return filtered.length > 0? filtered[0].url : defaultLink;
  //
  // }

  useSvg = (svg) => {
    const blob = new Blob([svg], {type: 'image/svg+xml'});
    return URL.createObjectURL(blob);
    // return URL.createObjectURL(`data:image/svg+xml,${svg}`)
  }

  render() {
    if (this.state.redirect) {
      console.log('REDIRECTING...')
      return (
        <Redirect to={this.state.url} />
      );
    }

    const { classes, currentControls, currentProject } = this.props;
    // console.log('the state', this.state);
    // console.log('controls', currentControls);
    // console.log('currentProject', currentProject);

    let { id, name } = currentControls;

    return (
      <Grid
        container
        justify='center'
        alignItems='flex-start'
        className={classes.container}
      >
        { (name === 'top') &&
          <Grid item xs={12}>
            <Typography className={classes.title}>
              Welcome to Copeland Engineering!
            </Typography>
          </Grid>
        }

        { (name === 'volume'||name==='custom') &&
          <Grid item xs={12}>
            <Typography className={classes.title}>
              New Project or Edit an Existing one?
            </Typography>
          </Grid>
        }

        { (name === 'setup') &&
          <Grid item xs={12}>
            <Typography className={classes.title}>
              Setup eh?  I get ya...
            </Typography>
          </Grid>
        }

        { (name === 'volnew' || name==='cusnew') &&
          <Grid item xs={12}>
            <Typography className={classes.title}>
              Select Scope Item(s) for Project...
            </Typography>
          </Grid>
        }

        { (name==='top'||name === 'volume'||name==='custom') &&
          <Grid item xs={12}>
            <Grid
              container
              justify='space-around'
              alignItems='flex-start'
              spacing={16}
            >
            {currentControls.children && currentControls.children.map(button => (
              <Grid item key={button.name} className={classes.buttonGroup}>
                {button.name!=='update'&&button.name!=='volupdate'&&button.name!=='cusupdate'&&
                <div>
                <Fade in={true} timeout={5000}>
                  <Fab
                    className={classes.fab}
                    onClick={ this.handleClick(button) }
                  >
                    <div
                      className={classes.fabInner}
                      style={{
                        backgroundColor: button.background_color,
                      }}
                    >
                    <img src={this.useSvg(button.image)} alt={button.label} className={classes.imageSrc} />
                    </div>
                  </Fab>
                </Fade>
                <Fade in={true} timeout={5000}>
                  <Typography
                    variant='h2'
                    color='inherit'
                    className={classes.buttonTitle}
                  >
                    {button.label}
                  </Typography>
                </Fade>
                </div>
                }
                {(button.name==='update'||button.name==='volupdate'||button.name==='cusupdate')&&
                <div>
                <Fade in={true} timeout={5000}>
                  <Link to='/search'>
                  <Fab
                    className={classes.fab}
                    onClick={ this.handleClick(button) }
                  >
                    <div
                      className={classes.fabInner}
                      style={{
                        backgroundColor: button.background_color,
                      }}
                    >
                    <img src={this.useSvg(button.image)} alt={button.label} className={classes.imageSrc} />
                    </div>
                  </Fab>
                  </Link>
                </Fade>
                <Fade in={true} timeout={5000}>
                  <Typography
                    variant='h2'
                    color='inherit'
                    className={classes.buttonTitle}
                  >
                    {button.label}
                  </Typography>
                </Fade>
                </div>
                }
              </Grid>
            ))}
            </Grid>
          </Grid>
        }

        { (name==='setup'||name==='volnew'||name==='cusnew'||name==='inspection') &&
          <Grid item xs={12}>
            <Grid
              container
              justify='flex-start'
              alignItems='flex-start'
            >
              {currentControls.children && currentControls.children.map(button => (
                <Grid item key={button.name} xs={4} md={3} lg={2} className={classes.buttonGroup}>
                  <Fade in={true} timeout={5000}>
                    <Fab
                      className={classes.childFab}
                      onClick={ this.handleClick(button) }
                      // style={{
                      //   backgroundColor: button.background_color,
                      // }}
                    >
                      <div
                        className={classes.childFabInner}
                        style={{
                          backgroundColor: button.background_color,
                        }}
                      >
                        <img src={this.useSvg(button.image)} alt={button.label} className={classes.imageSrc} />
                      {this.state.scope.find(scope => scope.name === button.name) &&
                      <SvgIcon className={classes.checkmark}>
                        <CheckCircleRoundedIcon />
                      </SvgIcon>
                      }
                      </div>
                    </Fab>
                  </Fade>

                  <Fade in={true} timeout={5000}>
                    <Typography
                      variant='caption'
                      color='secondary'
                      className={classes.buttonTitleSub}
                    >
                      {button.label}
                    </Typography>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          </Grid>
        }
        { (name!=='top') &&
          <Grid item xs={12} className={classes.actionRow}>
            <Grid container justify='space-around'>
              <Grid item>
                <Button title='Go Back'
                  variant="contained"
                  color="secondary"
                  // onClick={this.handleClick({id: 1, name: 'top'})}
                  onClick={this.handleBack}
                >
                  Go Back
                </Button>
              </Grid>
              { (name==='setup'||name==='volnew'||name==='cusnew'||name==='inspection') &&
                <Grid item>
                    <Button title='Next'
                      variant="contained"
                      color="secondary"
                      disabled={this.state.scope.length<=0}
                      onClick={this.handleButtonNext}
                    >
                  { // <Link to={this.state.url}>
                    //   Next
                    // </Link>
                  }
                      Next
                    </Button>
                </Grid>
              }
            </Grid>
          </Grid>
        }
      </Grid>
    );

  }

} // Project Create class closure

Welcome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Welcome);
