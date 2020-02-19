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
    // console.log('Welcome CDM', this.props.currentProject);

    // this.props.assignNewProjectScope({ menuFlow: newPrevious, categoryID: id, url: url, initialScope: [], scope: [] });
    // this.setState( { url: url, redirect: true } );
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
    } else if (name ==='setup'||name ==='volume'||name==='custom'||name==='inspection') {
      this.setState( { categoryID: id, url: url, previous: newPrevious } )
      this.props.loadCurrentMenu(id);
    } else if (name==='volnew'||name === 'cusnew') {
      this.setState( { previous: newPrevious } )
      this.props.loadCurrentMenu(id);
    } else if (name==='update'||name === 'volupdate'||name === 'cusupdate') {
      // console.log('Update', newPrevious);
      this.props.assignNewProjectScope({ menuFlow: newPrevious, categoryID: id, url: url, initialScope: [], scope: [] });
      this.setState( { url: url, redirect: true } );
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
    // console.log('Welcome render', this.state);


    if (this.state.redirect) {
      console.log('REDIRECTING...', this.state.url)
      return (
        <Redirect to={this.state.url} />
      );
    }

    const { classes, currentMenu } = this.props;
    // console.log('the state', this.state);
    // console.log('controls', currentMenu);
    // console.log('currentProject', currentProject);

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
              // justify='flex-start'
              justify='space-around'
              alignItems='flex-start'
              // spacing={16}
            >
            {currentMenu.children && currentMenu.children.map(button => (
              <Grid item key={button.name} xs={12} sm={6} md={4} lg={3} className={classes.buttonGroup}>
                {button.name!=='update'&&button.name!=='volupdate'&&button.name!=='cusupdate'&&
                <Fragment>
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
                </Fragment>
                }
                {(button.name==='update'||button.name==='volupdate'||button.name==='cusupdate')&&
                <Fragment>
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
                </Fragment>
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
              {currentMenu.children && currentMenu.children.map(button => (
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
