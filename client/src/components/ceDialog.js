import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// import Typography from '@material-ui/core/Typography';
import AlertDialogContainer from '../containers/AlertDialogContainer';
// import { resolve } from 'url';
import Grid from '@material-ui/core/Grid';

// to setup draggable dialog.  Unfortunately, blocking Textfield edit.
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

// import designRev from '../img/designrev-black.svg';
// import designRevWhite from '../img/designrev-white.svg';
import Typography from '@material-ui/core/Typography';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const styles = theme => ({
  root: {
    // flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
    // width: '100%',
  },
  dialog: {
    // height: 500,  // dialog is set to full screen in Dialog object.  This reduces size.
    margin: 'auto'
  },
  title: {
    backgroundColor: theme.palette.secondary.main,
  },
  typography: {
    color: theme.palette.secondary.contrastText,
    display: 'flex',
  },
  textField: {
    // color: 'white',
    // backgroundColor: 'black',
    // borderRadius: 20,
    // textShadow: 5,
    // width: 100,
    marginBottom: theme.spacing.unit*2,
    // marginRight: theme.spacing.unit,
  },
  cssInput: {
    color: theme.palette.secondary.light,
    backgroundColor: theme.palette.primary.light,
    fontSize: 24,
    textAlign: 'center',
    // borderColor: white,
    // borderRadius: 20,
    // textShadow: 5,
  },
  imageSrc: {
    height: 24,
    paddingRight: 10
  },
  toolbar: {
    padding: 0,
  },
  grow: {
    flexGrow: 1,
  },
  dHeight: {
    minHeight:500
  }
});

const PaperComponent = (props) => {
  return (
    // <Draggable enableUserSelectHack={false}>
      <Paper {...props} />
    // </Draggable>
  );
}

// calls the passed handleSubmit
const handleSubmit = (handleSubmit) => {
  // console.log('In the handleSubmit');
  handleSubmit()
}

// calls the passed handleClose
const handleClose = (handleClose) => {
  // console.log('In the handleClose');
  handleClose();
}

// handleChange = name => event => {
//   this.setState({
//     [name]: event.target.value,
//   });
// };

const CeDialog = (props) => {
  // console.log('CeDialog Render');
  const { classes, dialogWidth, dialogHeight } = props;
  // console.log('classes', classes);
  return (
    <Dialog fullWidth={true} maxWidth={dialogWidth}
      // fullScreen
      open={props.open}
      PaperComponent={PaperComponent}
      aria-labelledby="dialog"
      PaperProps={{
        style: { minHeight: dialogHeight },
      }}
    >
      <AppBar position='static' color='secondary'>
        <Toolbar className={classes.toolbar}>
          <DialogTitle classes={ {root: classes.title} } disableTypography={true}>
            <Typography variant='h6' className={classes.typography}>
              {props.image}
              {props.title}
            </Typography>
          </DialogTitle>
          <div className={classes.grow} />
          {props.actions}
        </Toolbar>
      </AppBar>
      <DialogContent className={classes.container}>
        <Grid container direction='column' justify='center' alignItems='center' >
          {props.children}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick = {() => handleClose(props.handleClose)}
          variant = 'contained' color='secondary'
        >
          Close
        </Button>
        {props.handleSubmit &&
          <Button
            onClick = {() => handleSubmit(props.handleSubmit)}
            variant = 'contained' color='secondary'
          >
            Submit
          </Button>
        }
      </DialogActions>
      <AlertDialogContainer />
    </Dialog>
  );
}

export default withStyles(styles, { withTheme: true })(CeDialog);
