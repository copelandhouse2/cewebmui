import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// Converted dialog to accept an html formatted text.  Not needing these anymore.
// import DialogContentText from '@material-ui/core/DialogContentText';
// import Typography from '@material-ui/core/Typography';


class AlertDialog extends React.Component {

  formattedContent = () => {

      return (
        this.props.message.content
      );
  }

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
            {this.formattedContent()}
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

// <DialogContentText id="alert-dialog-description">
//   {this.formattedContent}
// </DialogContentText>
