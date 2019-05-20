import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';


const drawerWidth = '30%';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 1,
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: 80
    // zIndex: theme.zIndex.drawer+2,

  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0px 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },

});

class ProjectCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address_id: null,
      job_number: null,
      revision: '',
      revision_desc: '',
      client_id: null,
      client: '',
      requestor_id: null,  // contact_id
      requestor: '',       // contact full name
      owner_id: null,      // user_id
      owner: '',           // contact full name of the user_id
      city_id: null,
      city: '',
      subdivision_id: null,
      subdivision: '',
      address1: '',
      address2: '',
      phase: '',
      section: '',
      lot: '',
      block: '',
      plan_type: '',
      elevation: '',
      masonry: '',
      garage_type: '',
      garage_entry: '',
      garage_swing: '',
      garage_drop: null,
      garage_extension: null,
      covered_patio: 'N',
      bay_window: 'N',
      master_shower_drop: 'N',
      bath1_shower_drop: 'N',
      geo_lab: '',
      geo_report_num: '',
      geo_report_date: null,
      geo_pi: null,
      em_center: null,
      em_edge: null,
      ym_center: null,
      ym_edge: null,
      soil_notes: '',
      additional_options: '',
      comments: '',
      created_by: null,
      last_updated_by: null,
      status: '',
      dialogValue: '',
      due_date: null,  // actual due date of the project.
      foundation_type: 'POST TENSION',
      // Trello and Box
      box_folder: '',
      trello_list_id: '',
      trello_list: '',
      trello_card_id: '',
      createTrelloCard: false,
      rememberData: false,

    };

    this.fields = [
      {label: 'Address', name: 'address1', id: '', type: 'text', width: '14%', isDisabled: false, required: true, list: []},
      {label: 'Client', name: 'client', id: 'client_id', type: 'text', width: '10%', isDisabled: false, required: true, list: []},
      {label: 'Requestor', name: 'requestor', id: 'requestor_id', type: 'text', width: '10%', isDisabled: true, required: false, list: []},
      {label: 'Subdivision', name: 'subdivision', id: 'subdivision_id', type: 'text', width: '10%', isDisabled: true, required: false, list: []},
      {label: 'City', name: 'city', id: 'city_id', type: 'text', width: '10%', isDisabled: true, required: false, list: []},
      {label: 'Due Date', name: 'due_date', id: '', type: 'date', width: '7%', isDisabled: false, required: false, list: []},
      {label: 'Phase', name: 'phase', id: '', type: 'text', width: '5%', isDisabled: false, required: false, list: []},
      {label: 'Section', name: 'section', id: '', type: 'text', width: '5%', isDisabled: false, required: false, list: []},
      {label: 'Lot', name: 'lot', id: '', type: 'text', width: '5%', isDisabled: false, required: false, list: []},
      {label: 'Block', name: 'block', id: '', type: 'text', width: '5%', isDisabled: false, required: false, list: []},
      {label: 'Plan Type', name: 'plan_type', id: '', type: 'text', width: '8%', isDisabled: false, required: false, list: []},
      {label: 'Elevation', name: 'elevation', id: '', type: 'text', width: '8%', isDisabled: false, required: false, list: []},
      {label: 'Masonry', name: 'masonry', id: '', type: 'text', width: '8%', isDisabled: false, required: false, list: []},
      {label: 'Covered Patio', name: 'covered_patio', id: '', type: 'text', width: '8%', isDisabled: false, required: false, list: []},
      {label: 'Bay Window', name: 'bay_window', id: '', type: 'text', width: '8%', isDisabled: false, required: false, list: []},
      {label: 'FDN Type', name: 'foundation_type', id: '', type: 'text', width: '8%', isDisabled: false, required: false, list: []},
      {label: 'Garage Type', name: 'garage_type', id: '', type: 'text', width: '12%', isDisabled: false, required: false, list: []},
      {label: 'Garage Entry', name: 'garage_entry', id: '', type: 'text', width: '12%', isDisabled: false, required: false, list: []},
      {label: 'Garage Swing', name: 'garage_swing', id: '', type: 'text', width: '8%', isDisabled: false, required: false, list: []},
      {label: 'Garage Drop', name: 'garage_drop', id: '', type: 'number', width: '8%', isDisabled: false, required: false, list: []},
      {label: 'Garage Ext', name: 'garage_extension', id: '', type: 'number', width: '8%', isDisabled: false, required: false, list: []},
      {label: 'Master', name: 'master_shower_drop', id: '', type: 'text', width: '8%', isDisabled: false, required: false, list: []},
      {label: 'Bath 1', name: 'bath1_shower_drop', id: '', type: 'text', width: '8%', isDisabled: false, required: false, list: []},
      {label: 'Lab', name: 'geo_lab', id: '', type: 'text', width: '10%', isDisabled: false, required: false, list: []},
      {label: 'Report #', name: 'geo_report_num', id: '', type: 'text', width: '8%', isDisabled: false, required: false, list: []},
      {label: 'Report Date', name: 'geo_report_date', id: '', type: 'date', width: '7%', isDisabled: false, required: false, list: []},
      {label: 'PI', name: 'geo_pi', id: '', type: 'text', width: '4%', isDisabled: false, required: false, list: []},
      {label: 'EmC', name: 'em_center', id: '', type: 'number', width: '4%', isDisabled: false, required: false, list: []},
      {label: 'EmE', name: 'em_edge', id: '', type: 'number', width: '4%', isDisabled: false, required: false, list: []},
      {label: 'YmC', name: 'ym_center', id: '', type: 'number', width: '4%', isDisabled: false, required: false, list: []},
      {label: 'YmE', name: 'ym_edge', id: '', type: 'number', width: '4%', isDisabled: false, required: false, list: []},
      {label: 'Soil Notes', name: 'soil_notes', id: '', type: 'text', width: '13%', isDisabled: false, required: false, list: []},
      {label: 'Addl Options', name: 'additional_options', id: '', type: 'text', width: '25%', isDisabled: false, required: false, list: []},
      {label: 'Notes', name: 'comments', id: '', type: 'text', width: '25%', isDisabled: false, required: false, list: []},
      {label: 'Default List', name: 'trello_list', id: 'trello_list_id', type: 'text', width: '25%', isDisabled: false, required: false, list: []},
    ]

  }

  render() {
    const { classes, theme } = this.props;

    return (
      <Drawer
        variant='persistent'
        anchor='right'
        open={this.props.toggleQuickEntry}
        classes={{
          paper: classes.drawerPaper,
        }}
        className={classes.drawer}
      >
        <Grid container>
          <Grid item>

            <div className={classes.drawerHeader}>
              <Fab
                size='small'
                color='secondary'
                aria-label='Add'
                onClick={this.props.handleQuickEntry}
              >
                {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </Fab>
            </div>
            <Divider />
            <Typography variant="h6" color="inherit" noWrap>
              I am a drawer!
            </Typography>
          </Grid>
        </Grid>
      </Drawer>
    )
  }

} // Project Create class closure

ProjectCreate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ProjectCreate);
