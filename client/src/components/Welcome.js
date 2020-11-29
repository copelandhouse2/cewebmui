import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Redirect } from "react-router-dom"
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import Fab from '@material-ui/core/Fab';

import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

const btnSize = {
  sm: 50,
  md: 75,
  lg: 150,
  xl: 200,
};

const TIMEOUT = 1000;

const textStrength = 'main';
const styles = theme => ({
  container: {
    minHeight: '100%',
    // backgroundColor: theme.palette.secondary.main,
    display: 'grid',
    // width: '90%',
    // margin: 'auto'
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
        transitionDuration: '.5s',
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
        transitionDuration: '.5s',
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
    transitionDuration: '.5s',
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

// categoryID = menuID = avffControls.id
// There is a category field on the table to "categorize" a base menu.
// id = 3 (volume), 4 (custom), 5 (inspection), 6 (search / update / revise)
class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryID: null,
      url: '/',
      scope: [],
      previous: [],
      redirect: false,
    };

    this.initState = {...this.state};

  }

  promiseFn = theFunction => {
    return new Promise((resolve, reject) => {
        resolve(theFunction);
    })
  };

  componentDidMount() {
    // console.log('Welcome CDM: currentProject', this.props.currentProject);

    // this.props.assignNewProjectScope({ menuFlow: newPrevious, categoryID: id, url: url, initialScope: [], scope: [] });
    // this.setState( { url: url, redirect: true } );

    // clearing currentViews.  Needs to be clear so that whenever I render
    // any upcoming screen the loading feature can work and load the new info
    // Without it, currentViews would have values from the previous screen
    // and try to render the screen without waiting for the new info to show up.
    this.props.loadViews(null, null, true);
    if (this.props.currentProject.menuFlow) {
      const { menuFlow } = this.props.currentProject;

      this.setState({ previous: menuFlow },
        () => this.handleBack() );  // this will populate the right menu values
    } else {
      this.props.loadCurrentMenu(1);
    }
    // console.log('Welcome componentDidMount after', this.props.currentMenu);

    // (async () => {
    //   try {
    //     await this.promiseFn(this.props.loadCurrentMenu(1));
    //     console.log('Welcome componentDidMount after', this.props.currentMenu);
    //   } catch (err) {
    //     console.log('Error: ', err);
    //   }
    //
    // })();
  }

  handleClick = selected => event => {
    const { id, name, url } = selected;
    // console.log('field name: ', id, name, url, event.target);
    let newPrevious = [...this.state.previous];
    newPrevious.push({id: this.props.currentMenu.id, name: this.props.currentMenu.name,
      categoryID: this.state.categoryID, url: this.state.url
    })
    // let next = {id: selected.id, name: selected.name}

    if (name === 'top') {
      this.setState(this.initState);
      this.props.loadCurrentMenu(id);
    } else if (name ==='setup'||name==='inspection') {
      this.setState( { categoryID: id, url: url, previous: newPrevious } )
      this.props.loadCurrentMenu(id);
    }
    else {
      this.props.loadCurrentMenu(id);
      this.props.loadViews(id);
      this.props.assignNewProjectScope({ menuFlow: newPrevious, categoryID: id, url: url, initialScope: [], scope: [] });
      this.setState( { previous: newPrevious, url: url, redirect: true } );

    };

  };

  handleBack = event => {
    // console.log('field name: ', name, event.target);
    // let name = selected.name;
    const newPrevious = [...this.state.previous];
    const backTo = newPrevious.pop();

    const scope = backTo.name === 'top'? [] : [...this.state.scope];
    // let previous = {id: 1, name: 'top'}
    this.props.loadCurrentMenu(backTo.id);
    this.setState({ categoryID: backTo.categoryID, url: backTo.url, scope: scope, previous: newPrevious })

  };

  handleButtonNext = () => {
    // console.log('Next button', this.state.previous);
    this.props.assignNewProjectScope({ menuFlow: this.state.previous, categoryID: this.state.categoryID, url: this.state.url, initialScope: [...this.state.scope], scope: [] });
    this.setState( { redirect: true } );

    // (async () => {
    //   try {
    //     console.log('Next button', this.state);
    //     await this.props.assignNewProjectScope( { categoryID: this.state.categoryID, url: this.state.url, initialScope: [...this.state.scope]} );
    //     this.setState( { redirect: true } );
    //   } catch (err) {
    //     console.log('Error: ', err);
    //   }
    //
    // })();

  }

  useSvg = (svg) => {
    const blob = new Blob([svg], {type: 'image/svg+xml'});
    return URL.createObjectURL(blob);
    // return URL.createObjectURL(`data:image/svg+xml,${svg}`)
  }

  render() {
    // console.log('Welcome render');

    // const { classes, currentMenu, currentProject } = this.props;
    const { classes, currentMenu } = this.props;
    // console.log('Welcome: the state', this.state);
    // console.log('controls', currentMenu);
    // console.log('currentProject', currentProject);

    if (this.state.redirect) {
      console.log('REDIRECTING...', this.state.url)
      return (
        <Redirect to={this.state.url} />
      );
    }

    let { name } = currentMenu;

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

        { (name === 'setup') &&
          <Grid item xs={12}>
            <Typography className={classes.title}>
              Setup eh?  I get ya...
            </Typography>
          </Grid>
        }

        { (name === 'inspection') &&
          <Grid item xs={12}>
            <Typography className={classes.title}>
              Inspection Activities
            </Typography>
          </Grid>
        }

        { (name==='top') &&
          <Grid item xs={12}>
            <Grid
              container
              // justify='flex-start'
              justify='space-between'
              alignItems='flex-start'
              // spacing={16}
            >
            {currentMenu.children && currentMenu.children.map(button => (
              button.name!=='setup'&&
              <Grid item key={button.name} xs={12} sm={6} md={4} lg={3} className={classes.buttonGroup}>
                <Fragment>
                <Fade in={true} timeout={TIMEOUT}>
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
                <Fade in={true} timeout={TIMEOUT}>
                  <Typography
                    variant='h2'
                    color='inherit'
                    className={classes.buttonTitle}
                  >
                    {button.label}
                  </Typography>
                </Fade>
                </Fragment>
              </Grid>
            ))}
            </Grid>
          </Grid>
        }

        { (name==='setup'||name==='inspection') &&
          <Grid item xs={12}>
            <Grid
              container
              // justify='flex-start'
              justify='space-between'

              alignItems='flex-start'
            >
              {currentMenu.children && currentMenu.children.map(button => (
                <Grid item key={button.name} xs={6} md={4} lg={3} className={classes.buttonGroup}>
                  <Fade in={true} timeout={TIMEOUT}>
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

                  <Fade in={true} timeout={TIMEOUT}>
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
