import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AlertDialogContainer from '../containers/AlertDialogContainer';
import Grid from '@material-ui/core/Grid';

// to setup draggable dialog.  Unfortunately, blocking Textfield edit.
// import Paper from '@material-ui/core/Paper';
// import Draggable from 'react-draggable';

const styles = theme => ({
  root: {
    // flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
    // width: '100%',
  },
  container: {
    // display: 'flex',
    // flexWrap: 'wrap',
    width: '20vw'
  },
  item: {
    width: 400
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
});

var client_id;

// function PaperComponent(props) {
//   return (
//     <Draggable>
//       <Paper {...props} />
//     </Draggable>
//   );
// }

class ClientDialog extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   id: null,
    //   name: props.newValue,  // only seed data.
    //   full_name: '',
    //   compliance_dl: '',
    //   active: 'Y',
    //   notes: '',
    //   created_by: null,
    //   last_updated_by: null
    // };

    this.state = {
      change: 'add',
      id: null,
      name: props.newValue,  // only seed data.
      full_name: null,
      compliance_dl: null,
      active: 'Y',
      notes: null,
      created_by: this.props.session.id,
      last_updated_by: this.props.session.id
    };

    this.initState = {...this.state};
  }


  componentDidMount = () => {
    // this.setState({ name: this.props.newValue });
    // this.forceUpdate();
  }


  handleSubmit = () => {
    // console.log('In the handleSubmit');

    // this.setState({
    //   created_by: this.props.session.id,
    //   last_updated_by: this.props.session.id
    // },
    //   ()=> {
    //     this.props.createClient(this.state);
    //   }
    // )
    // console.log('after the setState and createClient');

    this.props.saveClients([this.state]);

  }

  handleClose = () => {
    // console.log('In the handleClose');

    this.setState(this.initState);
    this.props.showHideClientDialog();
  }

  onMessageAck = () => {
    this.setState({ showError: false, errTitle: '', errContent: '' });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  setName = () => {
    this.setState({ name: this.props.newValue });
    return this.props.newValue;
  };

  setClientID = () => {
    const client = this.props.clients.find(x => x.name === this.state.name)
    if (typeof client === 'undefined') return 'NA'
    client_id = client.id;
    return client.id;
  };

  render() {
    // console.log('state', this.state);
    // console.log('Create Client props', this.props);
    // console.log('Create Client state', this.state);
    // this.setClientID();
    const { classes } = this.props;

    return (
      <Dialog fullWidth = {false}
        open={this.props.open}
        // PaperComponent={PaperComponent}
        aria-labelledby="client-dialog"
        // open={false}
        // onRequestClose={this.props.toggleLogin}
      >
        <DialogTitle>Create Client</DialogTitle>
        <DialogContent>
          <Grid container direction='column' justify='center' alignItems='center' >
            <Grid item className = {classes.item}>
              <TextField className = {classes.textField}
                id='id'
                label=''
                value={this.setClientID()}
                // variant='filled'
                InputProps={{
                  classes: {
                    // root: classes.cssInput,
                    input: classes.cssInput,
                  }
                }}
                style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 25 }}
                disabled
                fullWidth
              />
            </Grid>
            <Grid item className = {classes.item}>
              <TextField
                id='name'
                label='Client Name'
                value={this.state.name||''}
                onChange={this.handleChange('name')}
                fullWidth
              />
            </Grid>
            <Grid item className = {classes.item}>
              <TextField
                id='fullName'
                label='Full Name'
                value={this.state.full_name||''}
                onChange={this.handleChange('full_name')}
                fullWidth
              />
            </Grid>
            <Grid item className = {classes.item}>
              <TextField
                id='notes'
                label='Notes'
                value={this.state.notes||''}
                onChange={this.handleChange('notes')}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            // onClick = {this.handleClose}
            onClick = {() => {
              const values = { client_id: client_id
                , client: this.state.client };
              console.log('Client Dialog Close', values);
              // this.props.closeDialog('',subdivision_id, this.state.subdivision);
              this.props.closeDialog('',values);
            }}
            variant = 'contained' color='secondary'
          >
            Close
          </Button>
          <Button
            onClick = {this.handleSubmit}
            variant = 'contained' color='secondary'
          >
            Save
          </Button>
        </DialogActions>
        <AlertDialogContainer />
      </Dialog>
    );
  }
}
export default withStyles(styles)(ClientDialog);


// TextField properties...
  // onChange={this.handleChange('email')}
  // fullWidth={true}
  // autoFocus
  // className={classes.textField}
  // margin='normal'
  // InputProps={{ className: classes.textfield }}
  // InputLabelProps={{ className: classes.label }}
  // variant='outlined'
  // margin='normal'
  // type='text'
