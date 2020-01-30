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
import Select from 'react-select';
// import PropTypes from 'prop-types';
// import { resolve } from 'url';
// import '@babel/polyfill';

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
    // width: '20vw',
    height: '30vh'
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

var subdivision_id;

// function PaperComponent(props) {
//   return (
//     <Draggable>
//       <Paper {...props} />
//     </Draggable>
//   );
// }

class SubdivisionDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subdivision: this.props.newValue,  // only seed data.
      city_id: '',
      city: '',
      created_by: null,
      last_updated_by: null
    };

    this.initState = {...this.state};

  }

  componentDidMount = () => {

  }


  handleSubmit = () => {
    // console.log('In the handleSubmit');

    this.setState({
      created_by: this.props.session.id,
      last_updated_by: this.props.session.id
    },
      ()=> {
        this.props.createSubdivision(this.state);
        // this.setState({ id: this.setSubdivisionID() });
      }
    )
    // console.log('after the setState and createSubdivision');

    // console.log('1st promise: setState');
    // await new Promise(resolve => this.setState({
    //   created_by: this.props.session.id,
    //   last_updated_by: this.props.session.id
    // }, resolve))
    //
    // console.log('2nd promise: create Sub');
    // await new Promise( (resolve) => {
    //   this.props.createSubdivision(this.state);
    //   resolve();
    // });
    // // this.props.createSubdivision(this.state);
    //
    // console.log('setState with ID');
    // this.setState({ id: this.setSubdivisionID() });
    // await new Promise(resolve => this.setState({
    //   id: this.setSubdivisionID()
    // }, resolve))

  }

  handleClose = () => {
    // console.log('In the handleClose');

    this.setState(this.initState);
    this.props.showHideSubdivisionDialog();
  }

  onMessageAck = () => {
    this.setState({ showError: false, errTitle: '', errContent: '' });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  setSubdivisionID = () => {
    const subdivision = this.props.subdivisions.find(x => x.subdivision === this.state.subdivision)
    if (typeof subdivision === 'undefined') return 'NA'
    subdivision_id = subdivision.id;
    return subdivision.id;
  };

  render() {
    // counter = counter + 1;
    // if (counter === 1) {saveProp = this.props.newValue};
    // console.log(counter, 'props', this.props, saveProp);

    // console.group('Subdivision Dialog Render');
    // console.log(counter, 'state', this.state, saveProp);
    // console.groupEnd();
    // console.log('Create Client props', this.props);
    // console.log('Create Client state', this.state);
    // this.setClientID();
    const { classes } = this.props;

    return (
      <Dialog fullWidth = {false}
        open={this.props.open}
        // PaperComponent={PaperComponent}
        aria-labelledby="sub-dialog"
      >
        <DialogTitle>Create Subdivision</DialogTitle>
        <DialogContent className={classes.container}>
          <Grid container direction='column' justify='center' alignItems='center' >
            <Grid item className = {classes.item}>
              <TextField className = {classes.textField}
                id='id'
                label=''
                value={this.setSubdivisionID()}
                // value={this.state.id||'Nothing'}
                // variant='filled'
                InputProps={{
                  classes: {
                    // root: classes.cssInput,
                    input: classes.cssInput,
                  }
                }}
                disabled
                fullWidth
              />
            </Grid>
            <Grid item className = {classes.item}>
              <TextField className = {classes.textField}
                id='subdivision'
                label='Subdivision'
                value={this.state.subdivision}
                onChange={this.handleChange('subdivision')}
                fullWidth
              />
              <Select className = {classes.textField}
                id='city'
                isClearable
                isSearchable
                options={this.props.cities}
                getOptionLabel={({city}) => city}
                getOptionValue={({id}) => id}
                placeholder='Select City...'
                onChange={
                  (selected) => {
                    this.setState( {
                      city_id: selected?selected.id:'',
                      city: selected?selected.city:'',
                    } )
                  }
                }
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            // onClick = {this.handleClose}
            onClick = {() => {
              const values = { subdivision_id: subdivision_id
                , subdivision: this.state.subdivision
                , city_id: this.state.city_id
                , city: this.state.city };
              console.log('Sub Dialog Close', values);
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
export default withStyles(styles)(SubdivisionDialog);


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
