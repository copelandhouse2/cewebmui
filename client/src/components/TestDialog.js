import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import Fab from '@material-ui/core/Fab';
import Badge from '@material-ui/core/Badge';

import Tooltip from '@material-ui/core/Tooltip';

import Minus from '@material-ui/icons/RemoveRounded';


const btnSize = {
  sm: 24,
  md: 36,
  lg: 48,
  xl: 60,
};

const textStrength = 'main';
const styles = theme => ({
  content: {
    paddingTop: 20,
  },
  fab: {
    // position: 'relative',
    margin: 'auto',
    height: btnSize.md,
    width: btnSize.md,
    [theme.breakpoints.up('md')]: {
      height: btnSize.lg,
      width: btnSize.lg,
    },
    backgroundColor: theme.palette.secondary.light,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    }
  },
  buttonTitle: {
    // fontFamily: 'Walter Turncoat',
    color: textStrength === 'main'? theme.palette.secondary.main: theme.palette.secondary.light,
    textAlign: 'center',
    fontSize: 10,
    // color: 'white',
    [theme.breakpoints.up('md')]: {
      fontSize: 12,
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 14,
    },
  },
  imageSrc: {
    // width: '80%',
    height: btnSize.sm,
    width: btnSize.sm,
    [theme.breakpoints.up('md')]: {
      height: btnSize.md,
      width: btnSize.md,
    },
    margin: 'auto',

  },
  buttonGroup: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 10,
    justify: 'center'

  },
  badge: {
    // top: '90%',
    // right: 40,
  },
  fabMinus: {
    position: 'absolute',
    top: 40,
    left: 15,
    width: 20,
    height: 20,
    minHeight: 0,
  },
  minus: {
    width: 20,
    height: 20,
  }
});

function PaperComponent(props) {
  return (
    <Draggable>
      <Paper {...props} />
    </Draggable>
  );
}

const useSvg = (svg) => {
  const blob = new Blob([svg], {type: 'image/svg+xml'});
  return URL.createObjectURL(blob);
  // return URL.createObjectURL(`data:image/svg+xml,${svg}`)
}

class testDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    const { classes } = this.props;

    // console.log('scope selector', currentMenu, currentViews, currentProject);
    // console.log('state', this.state);
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.toggleScopeDialog}
        PaperComponent={PaperComponent}
        aria-labelledby="scope-dialog"
      >
        <DialogTitle>Adjust the Project Scope</DialogTitle>
        <DialogContent className={classes.content}>

        </DialogContent>
        <DialogActions>

        </DialogActions>
      </Dialog>
    )

  }
}

export const TestDialog = withStyles(styles, { withTheme: true })(testDialog);
// export const FieldGroup2 = withStyles(styles, { withTheme: true })(fieldGroup2);
