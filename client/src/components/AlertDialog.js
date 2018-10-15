import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AlertDialog extends React.Component {

  render() {
    return (
      <div>
        <Dialog
          open={!this.props.message.ok}
          // onClose={() => {this.props.ackMessage()}}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.props.message.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.props.message.content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {this.props.ackMessage()}}
              variant = "contained"
              color="secondary"
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );


  }
}

export default AlertDialog;


