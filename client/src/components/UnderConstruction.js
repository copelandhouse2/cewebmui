import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom"
import Button from '@material-ui/core/Button';

import grey from '@material-ui/core/colors/grey';
import construction from '../img/construction1.svg'

const styles = theme => ({
  container: {
    minHeight: '100%',
    backgroundColor: grey[800],
    backgroundImage: construction
    // display: 'grid',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    [theme.breakpoints.up('md')]: {
      fontSize: 32,
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 48,
    },
  },
  imageSrc: {
    // position: 'absolute',
    // left: 0,
    // right: 0,
    // top: 0,
    // bottom: 0,
    opacity: '0.5',
    height: '50%',
  },
});

function UnderConstruction(props) {

  const { classes } = props;

  return (
    <Grid
      container
      direction='column'
      justify='center'
      alignItems='center'
      className={classes.container}
    >
      <Grid item xs={6}>
        <img src={construction} alt="Under Construction" className={classes.imageSrc} />
      </Grid>
      <Grid item xs={6}>
        <Typography color='secondary' className={classes.title}>
          Under Construction
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Link to={`/`}>
          <Button title='Ok'
            variant="contained"
            color="secondary"
          >
            Ok
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles, { withTheme: true })(UnderConstruction);
