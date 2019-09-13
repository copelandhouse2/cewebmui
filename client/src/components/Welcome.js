import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import background from '../img/background3.jpg';

import slab from '../img/slab.jpg';
import framing from '../img/framing.jpg';
import pierandbeam from '../img/pierandbeam.jpg';
import cusframing from '../img/framing4.jpg';
import wall from '../img/wall.jpg';
import pool from '../img/pool.jpg';
import splitterbox from '../img/splitterbox.jpg';
import detentionpond from '../img/detentionpond.jpg';
import culvert from '../img/culvert.jpg';
import amenitycenter from '../img/amenitycenter.jpg';
import court from '../img/court.jpg';
import entrymonument from '../img/entrymonument.jpg';
import decowall from '../img/decowall.jpg';
import column from '../img/column.jpg';
import trellis from '../img/trellis.jpg';
import raingarden from '../img/raingarden.jpg';
import client from '../img/client.jpg';
import subdivision from '../img/subdivision.jpg';


import bg1 from '../img/slab.jpg';
import bg2 from '../img/slab.jpg';
import bg3 from '../img/slab.jpg';
import bg4 from '../img/wall.jpg';
import bg5 from '../img/wall.jpg';

import setup from '../img/setup.svg'
import volume from '../img/volume.svg'
import custom from '../img/custom.svg'

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Link } from "react-router-dom"
import Fade from '@material-ui/core/Fade';


const images = [
  {
    url: `${slab}`,
    // url: `${volume}`,
    title: 'Volume Foundation',
    // width: '15%',
    width: 200
  },
  {
  url: `${framing}`,
  title: 'Volume Framing / Lateral',
  width: '15%',
  },
  {
    // url: '../img/slab.jpg',
    url: `${pierandbeam}`,
    title: 'Custom Foundation',
    width: '15%',
  },
  {
    url: `${cusframing}`,
    title: 'Custom Framing / Lateral',
    width: '15%',
  },
  {
    url: `${wall}`,
    title: 'Retaining Walls',
    width: '15%',
  },
  {
    url: `${pool}`,
    title: 'Pools',
    width: '20%',
  },

  {
    url: `${splitterbox}`,
    title: 'Splitter Boxes',
    width: '20%',
  },
  {
  url: `${detentionpond}`,
  title: 'Detention Ponds',
  width: '20%',
  },
  {
    url: `${culvert}`,
    title: 'Culverts',
    width: '20%',
  },
  {
    url: `${amenitycenter}`,
    title: 'Amenity Centers',
    width: '20%',
  },
  {
    url: `${court}`,
    title: 'Sport Courts',
    width: '20%',
  },
  {
    url: `${entrymonument}`,
    title: 'Entry Monuments',
    width: '20%',
  },
  {
    url: `${decowall}`,
    title: 'Walls',
    width: '20%',
  },
  {
  url: `${column}`,
  title: 'Columns',
  width: '20%',
  },
  {
    url: `${trellis}`,
    title: 'Trellis',
    width: '20%',
  },
  {
    url: `${raingarden}`,
    title: 'Rain Gardens',
    width: '20%',
  },
  {
    url: `${client}`,
    title: 'Client Onboarding',
    width: '20%',
  },
  {
    url: `${subdivision}`,
    title: 'Subdivision Onboarding',
    width: '20%',
  },
];

const styles = theme => ({
  rootBlack: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 500,
    minHeight: 900,
    marginTop: 10,
    // height: '100%',
    // paddingTop: 60,
    // paddingBottom: 100,
    // height: 780,
    width: '100%',
    backgroundColor: theme.palette.common.black,
    // backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center 50%',
    opacity: 1,
    transitionProperty: 'opacity',
    transitionDuration: '1s',
    transitionTimingFunction: 'ease-in-out',
  },
  showWelcome: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 500,
    minHeight: 900,
    // height: 780,
    width: '100%',
    backgroundColor: theme.palette.common.black,
    backgroundImage: `url(${background})`,
    backgroundSize: '100% 100%',
    backgroundPosition: 'center 50%',
    opacity: 1,
    transitionProperty: 'opacity',
    transitionDuration: '5s',
    transitionTimingFunction: 'ease-in-out',

    height: '100%',
    // marginTop: 10,

  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageSrc': {
        opacity: 1,
        transitionProperty: 'opacity',
        transitionDuration: '1s',
        transitionTimingFunction: 'ease-in-out',
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 50%',
    opacity: '0.4',
    // transitionProperty: 'opacity',
    // transitionDuration: '5s',
    // transitionTimingFunction: 'ease-in-out',
    // transition: theme.transitions.create('opacity', ),
    margin: 10
  },
  imageInit: {
    opacity: 0,
  },
  imageTitle: {
    position: 'relative',
    // padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    padding: `16px 10px`,
    fontFamily: 'Walter Turncoat',
    fontSize: 24,
    // opacity: 0.8,
  },
  ceTitle: {
    position: 'relative',
    // padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    padding: `16px 10px`,
    fontFamily: 'Sedgwick Ave Display',
    fontSize: 78,
    opacity: 0.6,
  },
  imageMarked: {  // this is for the little line
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showButtons: false,
    };

  }

  handleChange = name => event => {

    // name === 'garage_drop'? console.log('field name: ', name, event.target.type, 'value: ', event.target.value, 'checked: ',event.target.checked): ''
    event.target.type === 'checkbox'? this.setState({ [name]: event.target.checked, }) :
    event.target.type === 'number' && event.target.value === ''? this.setState({ [name]: null, }) :
    event.target.type === 'date' && event.target.value === ''? this.setState({ [name]: null, }) :
    name === 'geo_pi'? this.setState({ [name]: event.target.value.toUpperCase(), }) :
    this.setState({ [name]: event.target.value, });
  };

  handleClick = name => event => {
    this.setState({
      showButtons: !this.state.showButtons,
    });
  };

  render() {
    const { classes, theme } = this.props;
    console.log('the state', this.state);
    return (
      <div className={this.state.showButtons? classes.rootBlack:classes.showWelcome} onClick={this.handleClick('showButtons')}>

        {this.state.showButtons && images.map(image => (
          <ButtonBase
            focusRipple
            key={image.title}
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            style={{
              width: image.width,
            }}
            onClick={ (e) => this.props.toggleWelcomeScreen(false) }
          >
          <Fade in={true} timeout={15000}>
            <Link to={`/projectmgmt`} >
            <span
              className={`${classes.imageSrc}`}
              style={{
                backgroundImage: `url(${image.url})`,
                // opacity: 0,
              }}
            />
            <span className={classes.imageButton}>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                className={classes.imageTitle}
              >
                {image.title}
                <span className={classes.imageMarked} />
              </Typography>
            </span>
            </Link>
          </Fade>
          </ButtonBase>
        ))}
        {!this.state.showButtons &&
        <span className={classes.imageButton}>
          <Typography
            component="span"
            variant="subtitle1"
            color="inherit"
            className={classes.ceTitle}
          >
            click anywhere to begin
          </Typography>
        </span>}

      </div>
    );

  }

} // Project Create class closure

Welcome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Welcome);

// <Fade in={true} timeout={15000}>
