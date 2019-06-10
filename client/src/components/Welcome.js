import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import bg from '../img/copelandWC4.jpg';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  background: {
    // backgroundImage: `url(${bg})`,
    height: 900,
    // width: 1920
  }

});

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    this.fields = [
      {name: 'title', title: 'Project Information', width: 12},
      // {label: 'Job Number', name: 'job_number', id: '', type: 'text', width: 6, isDisabled: true, required: false, list: []},
      {label: 'Address', name: 'address1', id: '', type: 'text', width: 6, isDisabled: false, required: true, list: []},
      {label: 'Client', name: 'client', id: 'client_id', type: 'text', width: 6, isDisabled: false, required: true, list: [], zIndex: 1000},
      {label: 'Requestor', name: 'requestor', id: 'requestor_id', type: 'text', width: 6, isDisabled: true, required: false, list: [], zIndex: 990},
      {label: 'Subdivision', name: 'subdivision', id: 'subdivision_id', type: 'text', width: 6, isDisabled: true, required: false, list: [], zIndex: 980},
      {label: 'City', name: 'city', id: 'city_id', type: 'text', width: 6, isDisabled: true, required: false, list: [], zIndex: 970},
      {label: 'Due Date', name: 'due_date', id: '', type: 'date', width: 6, isDisabled: false, required: false, list: []},
      {label: 'Phase', name: 'phase', id: '', type: 'text', width: 3, isDisabled: false, required: false, list: []},
      {label: 'Section', name: 'section', id: '', type: 'text', width: 3, isDisabled: false, required: false, list: []},
      {label: 'Block', name: 'block', id: '', type: 'text', width: 3, isDisabled: false, required: false, list: []},
      {label: 'Lot', name: 'lot', id: '', type: 'text', width: 3, isDisabled: false, required: false, list: []},

      {name: 'title', title: 'Design Details', width: 12},
      {label: 'Plan Type', name: 'plan_type', id: '', type: 'text', width: 6, isDisabled: false, required: false, list: []},
      {label: 'Elevation', name: 'elevation', id: '', type: 'text', width: 6, isDisabled: false, required: false, list: []},
      {label: 'Garage Swing', name: 'garage_swing', id: '', type: 'text', width: 6, isDisabled: false, required: false, list: this.props.garageSwingLookup, zIndex: 960},
      {label: 'Masonry', name: 'masonry', id: '', type: 'text', width: 6, isDisabled: false, required: false, list: this.props.masonryLookup, zIndex: 950},
      {label: 'Garage Type', name: 'garage_type', id: '', type: 'text', width: 6, isDisabled: false, required: false, list: this.props.garageTypeLookup, zIndex: 940},
      {label: 'Covered Patio', name: 'covered_patio', id: '', type: 'text', width: 6, isDisabled: false, required: false, list: this.props.coveredPatioLookup, zIndex: 930},
      {label: 'Bay Window', name: 'bay_window', id: '', type: 'text', width: 6, isDisabled: false, required: false, list: this.props.ynLookup, zIndex: 920},

      {name: 'title', title: 'Soils', width: 12},
      {label: 'Lab', name: 'geo_lab', id: '', type: 'text', width: 6, isDisabled: false, required: false, list: this.props.geos, zIndex: 910},
      {label: 'Report #', name: 'geo_report_num', id: '', type: 'text', width: 6, isDisabled: false, required: false, list: []},
      {label: 'Report Date', name: 'geo_report_date', id: '', type: 'date', width: 6, isDisabled: false, required: false, list: []},
      {label: 'PI', name: 'geo_pi', id: '', type: 'text', width: 6, isDisabled: false, required: false, list: []},
      {label: 'EmC', name: 'em_center', id: '', type: 'number', width: 3, isDisabled: false, required: false, list: []},
      {label: 'EmE', name: 'em_edge', id: '', type: 'number', width: 3, isDisabled: false, required: false, list: []},
      {label: 'YmC', name: 'ym_center', id: '', type: 'number', width: 3, isDisabled: false, required: false, list: []},
      {label: 'YmE', name: 'ym_edge', id: '', type: 'number', width: 3, isDisabled: false, required: false, list: []},
      {label: 'Soil Notes', name: 'soil_notes', id: '', type: 'text', width: 6, isDisabled: false, required: false, list: []},

      {name: 'title', title: 'Other', width: 12},
      {label: 'Master Shower Drop', name: 'master_shower_drop', id: '', type: 'text', width: 6, isDisabled: false, required: false, list: this.props.ynLookup, zIndex: 900},
      {label: 'Garage Ext', name: 'garage_extension', id: '', type: 'number', width: 6, isDisabled: false, required: false, list: []},
      {label: 'Addl Options', name: 'additional_options', id: '', type: 'text', width: 6, isDisabled: false, required: false, list: []},
      {label: 'Notes', name: 'comments', id: '', type: 'text', width: 6, isDisabled: false, required: false, list: []},

      {label: 'Trello List', name: 'trello_list', id: 'trello_list_id', type: 'text', width: 6, isDisabled: false, required: false, list: this.props.trelloListLookup, zIndex: 1010},
      // {label: 'FDN Type', name: 'foundation_type', id: '', type: 'text', width: 4, isDisabled: false, required: false, list: []},
      // {label: 'Garage Entry', name: 'garage_entry', id: '', type: 'text', width: 6, isDisabled: false, required: false, list: this.props.garageEntryLookup},
      // {label: 'Garage Drop', name: 'garage_drop', id: '', type: 'number', width: 6, isDisabled: false, required: false, list: []},
      // {label: 'Bath 1', name: 'bath1_shower_drop', id: '', type: 'text', width: 6, isDisabled: false, required: false, list: this.props.ynLookup},
      // {label: 'Default List', name: 'trello_list', id: 'trello_list_id', type: 'text', width: 4, isDisabled: false, required: false, list: this.props.trelloListLookup},
    ]

  }

  handleChange = name => event => {

    // name === 'garage_drop'? console.log('field name: ', name, event.target.type, 'value: ', event.target.value, 'checked: ',event.target.checked): ''
    event.target.type === 'checkbox'? this.setState({ [name]: event.target.checked, }) :
    event.target.type === 'number' && event.target.value === ''? this.setState({ [name]: null, }) :
    event.target.type === 'date' && event.target.value === ''? this.setState({ [name]: null, }) :
    name === 'geo_pi'? this.setState({ [name]: event.target.value.toUpperCase(), }) :
    this.setState({ [name]: event.target.value, });
  };


  render() {
    const { classes, theme } = this.props;

    // <div className={classes.background} >
    // </div>
    return (
      <Grid container alignItems='center' style={ {height: 900} }>
        <Grid item xs={12} style={ {height: 200} }>
        <Typography variant='h2' align='center' ><b>Welcome screen</b></Typography>
        <Typography variant='h2' align='center' ><b>Under Construction...</b></Typography>
        </Grid>
      </Grid>
    )
  }

} // Project Create class closure

Welcome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Welcome);


// <div className={classes.drawerHeader}>
//   <Fab
//     size='small'
//     color='secondary'
//     aria-label='Add'
//     onClick={this.props.handleQuickEntry}
//   >
//     {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
//   </Fab>
// </div>
// <Divider />
