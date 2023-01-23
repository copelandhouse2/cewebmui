import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
// import Draggable from 'react-draggable';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

// import designRev from '../img/designrev-black.svg';
// import designRevWhite from '../img/designrev-white.svg';
import Typography from '@material-ui/core/Typography';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { Exit } from '../img/exit.js';
import Close from '@material-ui/icons/Close';

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
  container: {
    display: 'flex',
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

// calls the passed handleSubmit
const handleDelete = (handleDelete) => {
  // console.log('ceDialog: In the handleDelete');
  handleDelete();
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
  const { classes, dialogWidth, dialogHeight, theme } = props;
  // console.log('classes', classes);
  return (
    <Dialog fullWidth={true} maxWidth={dialogWidth}
      // fullScreen
      open={props.open}
      PaperComponent={PaperComponent}
      aria-labelledby="dialog"
      PaperProps={{
        style: { maxHeight: dialogHeight },
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
          <Tooltip title='Close Dialog'>
            <IconButton aria-label='Close' onClick = {() => handleClose(props.handleClose)}>
              <Close style={{width:32, height:32, color:theme.palette.secondary.contrastText}} />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <DialogContent >
        <Grid container direction='column' justify='center' alignItems='center' >
          {props.children}
        </Grid>
      </DialogContent>
      <DialogActions className={classes.container}>
        <Button
          onClick = {() => handleClose(props.handleClose)}
          variant = 'contained' color='secondary'
        >
          <Exit size={24} />
          Exit
        </Button>

        {props.handleDelete &&
          <Button
            onClick = {() => handleDelete(props.handleDelete)}
            variant = 'contained' color='secondary'
          >
            Delete
          </Button>
        }
        <div className={classes.grow} />
        {/*{!props.handleSubmit &&
          <div className={classes.grow} />
        } */}
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
