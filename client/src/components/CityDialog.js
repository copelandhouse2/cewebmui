import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// import Typography from '@material-ui/core/Typography';
import AlertDialogContainer from '../containers/AlertDialogContainer';
// import { resolve } from 'url';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';


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

class CityDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      city: props.newValue,  // only seed data.
      state_prov: 'TX',
      state_prov_long: 'Texas',
      country: 'US',
      country_long: 'United States',
      created_by: null,
      last_updated_by: null
    };

    this.initState = {...this.state};
  }


  componentDidMount = () => {
    this.props.getLookup("STATE");
    this.props.getLookup("COUNTRY");
  }


  handleSubmit = () => {
    console.log('In the handleSubmit');

    this.setState({
      created_by: this.props.session.id,
      last_updated_by: this.props.session.id
    },
      ()=> {
        this.props.createCity(this.state);
      }
    )
    console.log('after the setState and createCity');

  }

  handleClose = () => {
    console.log('In the handleClose');

    this.setState(this.initState);
    this.props.showHideCityDialog();
  }

  onMessageAck = () => {
    this.setState({ showError: false, errTitle: '', errContent: '' });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  setCityID = () => {
    const city = this.props.cities.find(x => x.city === this.state.city)
    if (typeof city === 'undefined') return 'NA'
    return city.id;
  };

  render() {
    console.group('City Dialog Render');
    console.log('state', this.state);
    console.log('State Lookup', this.props.stateLookup);
    console.log('Country Lookup', this.props.countryLookup);
    console.groupEnd();
    // console.log('Create Client props', this.props);
    // console.log('Create Client state', this.state);
    // this.setClientID();
    const { classes } = this.props;

    return (
      <Dialog fullWidth = {false}
        open={this.props.showCityDialog}
      >
        <DialogTitle>Create City</DialogTitle>
        <DialogContent className={classes.container}>
          <Grid container direction='column' justify='center' alignItems='center' >
            <Grid item className = {classes.item}>
              <TextField className = {classes.textField}
                id='id'
                label=''
                value={this.setCityID()}
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
                id='city'
                label='City'
                value={this.state.city}
                onChange={this.handleChange('city')}
                fullWidth
              />
              <Select className = {classes.textField}
                id='state'
                isClearable
                isSearchable
                options={this.props.stateLookup}
                getOptionLabel={({name}) => name}
                getOptionValue={({code}) => code}
                placeholder='Select City...'
                onChange={
                  (selected) => {
                    this.setState( {
                      state_prov: selected?selected.code:'',
                      state_prov_long: selected?selected.name:'',
                    } )
                  }
                }
                defaultValue={{code:'TX', name: 'Texas'}}
              />
            </Grid>
            <Grid item className = {classes.item}>
              <Select
                id='country'
                isClearable
                isSearchable
                options={this.props.countryLookup}
                getOptionLabel={({name}) => name}
                getOptionValue={({code}) => code}
                placeholder='Select Country...'
                onChange={
                  (selected) => {
                    this.setState( {
                      country: selected?selected.code:'',
                      country_long: selected?selected.name:''
                    } )
                  }
                }
                defaultValue={{code:'US', name: 'United States'}}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            onClick = {this.handleClose}
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
export default withStyles(styles)(CityDialog);


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
