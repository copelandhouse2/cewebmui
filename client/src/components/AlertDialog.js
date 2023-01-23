import React from 'react';
// import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/core/styles';
import { withWidth } from "@material-ui/core";
// Converted dialog to accept an html formatted text.  Not needing these anymore.
// import DialogContentText from '@material-ui/core/DialogContentText';
// import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },

});

class AlertDialog extends React.Component {

  formattedContent = () => {

      return (
        this.props.message.content
      );
  }

  render() {
    const {ackMessage, message } = this.props;
    const { yesFunc, noFunc, ynDialog } = this.props.message;
    // console.log('in alert dialog', message);
    return (
      <div>
        <Dialog
          open={!this.props.message.ok}
          // onClose={() => {this.props.ackMessage()}}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" style={{textAlign:'center'}}>{this.props.message.title}</DialogTitle>
          <DialogContent>
            {this.formattedContent()}
          </DialogContent>
          <DialogActions>
          {!ynDialog &&
            <Button
              onClick={() => {ackMessage()}}
              variant = "contained"
              color="secondary"
            >
              Ok
            </Button>
          }
          {ynDialog &&
            <Grid container justify='space-evenly'>
              <Grid item>
              <Button
                onClick={() => {
                  if (yesFunc) yesFunc();
                  // yesFunc?yesFunc():null;
                  ackMessage();
                }}
                variant = "contained"
                color="secondary"
              >
                Yes
              </Button>
              </Grid>

              <Grid item>
              <Button
                onClick={() => {
                  if (noFunc) noFunc();
                  // noFunc?noFunc():null;
                  ackMessage();
                }}
                variant = "contained"
                color="secondary"
              >
                No
              </Button>
              </Grid>
            </Grid>
          }
          </DialogActions>
        </Dialog>
      </div>
    );


  }
}

export default withWidth()(withStyles(styles, { withTheme: true })(AlertDialog));

// <DialogContentText id="alert-dialog-description">
//   {this.formattedContent}
// </DialogContentText>
