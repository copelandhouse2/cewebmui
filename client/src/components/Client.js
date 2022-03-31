import React, { Component, Fragment } from 'react';
import { Redirect, Link } from "react-router-dom";
import _ from 'lodash';
// import { withNavigationFocus } from 'react-navigation';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withWidth } from "@material-ui/core";
import classNames from 'classnames';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
// import AddIcon from '@material-ui/icons/Add';
// import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SearchIcon from '@material-ui/icons/Search';
import { Sort, SortAsc, SortDesc } from '../img/sort.js';
import FilterListIcon from '@material-ui/icons/FilterList';
import SortIcon from '@material-ui/icons/Sort';

import { DefaultFG, MaterialTabularFG, SimpleSortListView, ListTabularFG } from './ceFieldGroup';
// import { Field2Container } from '../containers/ceFieldContainer';
// import { ScopeSelectionContainer } from '../containers/ceScopeSelectionContainer';
import CePageContainer from '../containers/cePageContainer';
import { Field2Container } from '../containers/ceFieldContainer';
import ClientDashboardContainer from '../containers/ClientDashboardContainer';
import ClientDetailsContainer from '../containers/ClientDetailsContainer';
import ClientHistoryContainer from '../containers/ClientHistoryContainer';

import Paper from '@material-ui/core/Paper';

// import IconButton from '@material-ui/core/IconButton';
// import SettingsIcon from '@material-ui/icons/Settings';

// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from '@material-ui/core/Switch';
// import fullView from '../img/fullView.svg';
// import listView from '../img/listView.svg';
// import columnView from '../img/columnView2.svg';

// import { Chart as ChartJS, ArcElement, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';

// ChartJS.register(ArcElement, Legend);

const drawerWidth = '100%';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  container: {
    width: '80%',
    margin: 'auto',
  },
  titleContainer: {
    padding: '10px 10% 5px',
    backgroundColor: theme.palette.secondary.light,
  },
  titleText: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main
  },
  imageSrc: {
    height: 20,
    color: theme.palette.secondary.contrastText,
    fill: theme.palette.secondary.contrastText,
  },
  drawerButton: {
    // marginRight: '-100px'
  },
  findField: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    '&:hover': {backgroundColor: theme.palette.secondary.dark}
  },
  commitType: {
    // width: 120,
  },
  addScope: {
    position: 'fixed',
    right: '20%',
    top: 380
  },
  grow: {
    flexGrow: 1,
  },
  findRoot: {
    // padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    // width: 400,
  },
  findInput: {
    marginLeft: 8,
    flex: 1,
  },
  findIconButton: {
    // padding: 10,
  },
  linkStyle: {
    textDecoration: 'none'
  },
  iconDrawer: {
    marginTop:60,
  },
  drawer: {
    width: drawerWidth,
    backgroundColor: '#E5E5E5',
  },
  grid: {
    paddingLeft: '5%',
    paddingRight: '5%'
  },
  media: {
    height: 100,
    width: 200,
    margin: 'auto',
  },
  content: {
    width:'70%',
    margin:'auto',
    // marginLeft:'10%',
    // marginRight:'10%',
    // flexGrow: 1,
    // padding: theme.spacing.unit * 3,

    // marginLeft: drawerWidth,
    // transition: theme.transitions.create('margin', {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.leavingScreen,
    // }),
  },
  contentShift: {
    // marginLeft: 0,
    // transition: theme.transitions.create('margin', {
    //   easing: theme.transitions.easing.easeOut,
    //   duration: theme.transitions.duration.enteringScreen,
    // }),
  },
  buttonLabel: {
    width:20
  },
  tabHeader: {
    marginBottom:40
  }
});

class Client extends Component {
  constructor(props) {
    super(props);

    this.state = {
      object: 'CLIENT',
      renderScreen: false,
      currentMenuID: this.props.currentViews.id,
      currentView: this.props.VIEW||'DEFAULT',
      saveValue: '',  // stores previous values of address/lot/block to test for change      selectedIndexes: [],
      // selectedIndexes: [],
      list: this.props.clients,
      page: 1, //1-50, 51-100, 101-150, count*(page-1)+1 - count*page (or array size whichever is smaller.)
      countPerPage:42,  //20, 50, 100
      sort:{field:'name',data_type:'text',direction:'A'},
      selected: false,
      currentTab:'dashboard',
      redirectUrl: null,
      created_by: this.props.session.id,
      last_updated_by: this.props.session.id,
      drawer:true,
      change:false,
      cardClick:false,
      sortIt:this.sortIt,
      find:null,
      count:this.props.clients.length
    };

    this.initState = {...this.state};

  }

  componentDidMount = () => {
    // console.log('CDM Client', this.props.currentViews.name);

    // this line has been there a long time.  However, currentViews is an array.
    // It always returns true as it NEVER equals the name listed.
    // if (this.props.currentViews.name !== 'client_maint') this.props.loadViewsByName('client_maint');
    this.props.loadViewsByName('client_maint');
    this.setState( {list:this.state.list.sort(this.sortIt())} );

  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log('gDSFP');
    const { currentViews, clients, currentClient } = nextProps;
    // console.log('gDSFP: State, currentClient', prevState, currentClient);

    // If the views object is populated, activate the screen render toggle.
    // currentViews is populated: from the menu, selecting a project.
    // if (!prevState.renderScreen && currentViews.name === 'client_maint' && currentViews.constructor === Object && Object.keys(currentViews).length !== 0) {
    //   return {renderScreen: true };
    // }
    if (!prevState.renderScreen && currentViews.length > 0 ) {
      if (currentViews.findIndex(view => view.name === 'client_maint' && view.category === 'DEFAULT') > -1) {
        return { renderScreen: true };
      }
    }

    if (prevState.cardClick === currentClient.id ) {
      // let cList = prevState.list;
      // let c = cList.find((c,i)=>c.id === prevState.selected.id);

      return {cardClick: false, selected: currentClient, drawer:!prevState.drawer};
    }

    if (currentClient.change === 'updated') {
      // console.log('gDSFP: currentClient was updated',clients);
      const result = clients.filter(c => {
        const string = `${c.id}~${c.name}~${c.full_name}~${c.billing_address1}
        ~${c.billing_city}~${c.billing_state_prov}`.toLowerCase()
        return string.includes(prevState.find?prevState.find.toLowerCase():'');
      });
      return {selected: {...currentClient,change:false}, count: clients.length, list:result.sort(prevState.sortIt())}

    }

    return null;
  }

  // actions that show on top of page.  Left side next to Find (when active)
  topActionBarLeft = () => {
    const { classes, theme, width } = this.props;
    // return null;
    return (
      <Fragment>
        <Grid item>
          <Tooltip title='Open Client List'>
            <IconButton
              size='small'
              onClick={()=>this.updateState({drawer:!this.state.drawer, selected:false, cardClick:false})}
            >
              {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          {this.state.selected &&
          <Typography variant='h6'>
            {this.state.selected.name}
          </Typography>
          }
        </Grid>
      </Fragment>

    );

  }

  // actions that show on top of page.  Right side next to Recents
  topActionBarRight = () => {
    return null;
  }

  // actions that show on bottom of page
  topActionBarDrawer = () => {

    const { classes, theme } = this.props;

    return (
    <Grid container alignItems='center' className={`${classes.iconDrawer} ${classes.grid}`} spacing={24}>

      <Grid item>
        <Link to={`/`} className={classes.linkStyle}>
          <Button title='Return to menu'
            variant="contained"
            size='small'
            color="secondary"
          >
            Cancel
          </Button>
        </Link>
      </Grid>

      <Grid item>
        <Grid container alignItems='center' spacing={8}>
          <Tooltip title='Filter'>
            <Grid item>
              <FilterListIcon color='secondary'/>
            </Grid>
          </Tooltip>
          <Grid item>
            <Field2Container
              field = {{name: 'find', label: 'Find'}}
              // addStyle = {classes.findField}
              scopeID = {false}
              state = {this.state}
              updateState = {this.updateState}
              // find action.  Only used when searching an object, like
              // projects, geotechs, subdivisions, clients, etc.
              findAction={this.findClients}
              // turns off dup check, creating client,city,sub via list
              searchMode={true}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item className={classes.grow}>
        <Grid container alignItems='center' spacing={8}>
          <Tooltip title='Sort'>
            <Grid item>
              <SortIcon color='secondary'/>
            </Grid>
          </Tooltip>
          <Grid item>
            <Button
              size='small'
              variant='contained'
              color='secondary'
              onClick={()=>this.sort({name:'id', data_type:'number'})}
            >
              ID
              {this.state.sort.field === 'id'?
                this.state.sort.direction==='A'?
                <SortAsc style={{marginLeft:5, verticalAlign:'text-bottom'}} size={20} color={theme.palette.secondary.contrastText} />
                : <SortDesc style={{marginLeft:5, verticalAlign:'text-bottom'}} size={20} color={theme.palette.secondary.contrastText} />
              : <Sort style={{marginLeft:5, verticalAlign:'text-bottom'}} size={20} color={theme.palette.secondary.contrastText} />
              }
            </Button>
          </Grid>

          <Grid item>
            <Button
              // style={{width:36,height:36, border:'1px solid'}}
              size='small'
              variant='contained'
              color='secondary'
              onClick={()=>this.sort({name:'name', data_type:'text'})}
            >
              Name
              {this.state.sort.field === 'name'?
                this.state.sort.direction==='A'?
                <SortAsc style={{marginLeft:5, verticalAlign:'text-bottom'}} size={20} color={theme.palette.secondary.contrastText} />
                : <SortDesc style={{marginLeft:5, verticalAlign:'text-bottom'}} size={20} color={theme.palette.secondary.contrastText} />
              : <Sort style={{marginLeft:5, verticalAlign:'text-bottom'}} size={20} color={theme.palette.secondary.contrastText} />
              }
            </Button>
          </Grid>

        </Grid>
      </Grid>

      <Grid item>
        <Button
          // style={{width:36,height:36, border:'1px solid'}}
          size='small'
          variant='contained'
          color='secondary'
          onClick={this.addClient}
        >
          Add Client
        </Button>
      </Grid>
      <Grid item>
        <IconButton
          onClick={()=>{
            if (this.state.page>1) this.updateState({page:this.state.page-1})
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        {`${this.state.page} of ${Math.trunc(this.state.list.length/this.state.countPerPage)+1}`}
        <IconButton
          onClick={()=>{
            if (Math.trunc(this.state.list.length/this.state.countPerPage)>=this.state.page) this.updateState({page:this.state.page+1})
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Grid>

    </Grid>
    )
  }

  // actions that show on bottom of Drawer page
  bottomActionBar = () => {

    const { classes } = this.props;
    return null;

    return (
    <Grid container justify='center' alignItems='center' className={classes.content} style={{marginTop: 40, marginBottom: 10}} spacing={16}>

      <Grid item className={classes.grow}>
        <Link to={`/`} className={classes.linkStyle}>
          <Button title='Return to menu'
            variant="contained"
            size='small'
            color="secondary"
          >
            Cancel
          </Button>
        </Link>
      </Grid>

      <Grid item>
        <Button title='Save'
          variant="contained"
          size='small'
          color="secondary"
          disabled={this.state.change?false:true}
          onClick={this.handleSave}
        >
          Save
        </Button>
      </Grid>
    </Grid>
    )
  }

  // actions that show on bottom of Drawer page
  bottomActionBarDrawer = () => {

    const { classes } = this.props;

    return (
    <Grid container alignItems='center' style={{marginTop: 10, marginBottom: 10}} spacing={16}>

      <Grid item className={classes.grow}>
        <Link to={`/`} className={classes.linkStyle}>
          <Button title='Return to menu'
            variant="contained"
            size='small'
            color="secondary"
          >
            Cancel
          </Button>
        </Link>
      </Grid>

      <Grid item>
        <IconButton
          onClick={()=>{
            if (this.state.page>1) this.updateState({page:this.state.page-1})
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        {`${this.state.page} of ${Math.trunc(this.state.list.length/this.state.countPerPage)+1}`}
        <IconButton
          onClick={()=>{
            if (Math.trunc(this.state.list.length/this.state.countPerPage)>=this.state.page) this.updateState({page:this.state.page+1})
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Grid>

    </Grid>
    )
  }

  // actions that show in field group title bar
  fieldGroupTools = () => {
    return null;
    // return (
    //   <Tooltip title={`Manage fields`} aria-label='Settings'>
    //     <IconButton aria-label='Field Group Settings' onClick={()=>{}}>
    //       <SettingsIcon className={classes.settings} />
    //     </IconButton>
    //   </Tooltip>
    // )

    // return (
    //   <FormControlLabel
    //     control={
    //       <Switch
    //         checked={this.state.showSearchByFields}
    //         onChange={(e)=>{this.handleSwitch(e)}}
    //         value='showSearchByFields'
    //       />
    //     }
    //     label={this.state.showSearchByFields?'Back to Find Field':'Show Fields'}
    //   />
    // )
  }

  fieldGroupToolsTabular = () => {
    // const { classes, theme, width } = this.props;
    return null;
    // return (
    //   <Field2Container
    //     field = {this.scopeField}
    //     scopeID = {false}
    //     state = {this.state}
    //     updateState = {this.updateState}
    //     // turns off dup check, creating client,city,sub via list
    //     searchMode={true}
    //     // props that are not used.
    //     handleListChange={false}
    //     handleFocus={false}
    //     handleBlur={false}
    //     // call to create new client, city, sub
    //     createDialogValue={false}
    //   />
    // )
  }

  // actions that show next to / below fields in field group
  fieldTools = () => {

    return (
      <Grid item>
      <Button title='Find records'
        variant="contained"
        size='small'
        color="secondary"
        onClick={this.findClients}
      >
        Search
      </Button>
      </Grid>
    )
  }

  updateState = (updatedValues) => {

    this.setState(updatedValues);
  }

  handleChangeCustomized = (field,e) => {
    // console.log('handleChangeCustomized: here I am!', field.name, e);
    let client = {...this.state.selected};

    client[field.name] =
    e.target.type === 'checkbox'? e.target.checked? 'Y':null :
    e.target.type === 'number' && e.target.value === ''? null :
    e.target.type === 'date' && e.target.value === ''? null :
    e.target.value === ''? null :
    e.target.value;
    if (field.name === 'client_name') {
      client['name'] = client[field.name];
      client['client'] = client[field.name];
    }
    if (field.name === 'client_full_name') {
      client['full_name'] = client[field.name];
    }
    client['change'] = client.id?'change':'add';

    // console.log('new state', client);

    this.updateState({ selected:client });
  }

  handleListChangeCustomized = (field,e) => {
    console.log('handleChangeCustomized: here I am!', field.name, e);
    let client = {...this.state.selected};

    switch (field.name) {
      case 'billing_city':
        if (e) {
          client[field.name_id] = e.code;
          client[field.name] = e.name;
          client['billing_state_prov'] = e.state_prov;
          client['billing_country'] = e.country;
        } else {  // picked null so...
          client[field.name_id] = null;
          client[field.name] = null;
          client['billing_state_prov'] = null;
          client['billing_country'] = null;
        }
        break;
      default:
        if (e) {
          if (field.name_id) {
            client[field.name_id] = e.code;
            client[field.name] = e.name;
          } else {
            client[field.name] = e.code;
          }
        } else {  // picked null so...
          if (field.name_id) {
            client[field.name_id] = null;
            client[field.name] = null;
          } else {
            client[field.name] = null;
          }
        }
        break;
    }

    client['change'] = client.id?'change':'add';

    console.log('new state', client);

    this.updateState({ selected:client });
  }

  // Only called by Search button.
  findClients = () => {
    console.log('find clients again');
    // this.props.findClients(this.state.find);
    const result = this.props.clients.filter(c => {
      const string = `${c.id}~${c.name}~${c.full_name}~${c.billing_address1}
      ~${c.billing_city}~${c.billing_state_prov}`.toLowerCase()
      return string.includes(this.state.find?this.state.find.toLowerCase():'');
    })
    this.updateState({list:result.sort(this.sortIt()),page:1});
  }

  handleSave = (client = false) => {

    // getDerivedStateFromProps handles the rest.  It clears state.selected, it updates
    // state.list to have the new (or updated) client.
    if (client) {
      console.log('Client handle Save client passed in', client);
      this.props.saveClients([client]);
    } else {
      console.log('Client handle Save', this.state.selected);
      this.props.saveClients([this.state.selected]);
    }
    // this.updateState({change:false});

    // this.setState({ saveChange: true, drawer:true });

    // let updated = updatedRows.filter(r=>{if (r) return r});
    // Testing to make sure all the edited projects still have
    // an address, client, and city.
    // let dataOk = true;
    // for (let i=0; i<updatedRows.length; i++) {
    //   const { client_name } = updatedRows[i];
    //   if (!client_name ) {
    //     this.props.loadMessage(
    //       { ok:false,
    //         status: 'Missing Data',
    //         statusText: "Missing client name.  Please fill in"
    //       }, "ERROR");
    //     dataOk = false;
    //     break;
    //   }
    // }
    //
    // // Testing to make sure all the edited projects still have
    // // an address, client, and city.
    // if (dataOk) {
    //   // for (let i=0; i<updatedRows.length; i++) {
    //   //   // console.log('all is ok right now.  State:', updatedRows[i]);
    //   //   this.props.saveGeotechs(updatedRows[i]);
    //   // }
    //   this.props.saveClients(updatedRows);
    // }  // if dataOk
  }

  handleDelete = (row)=> {
    // console.log('Delete client ', row, row-1, this.props.clientSearch.findResults[row-1]);

    // This module supports an INSERT row as first row.  Must take into consideration
    // that row passed will be based on the array id with insert row as first row
    // Therefore need to subtract 1 to get right value for props geos array.
    // this.props.deleteClient(this.props.clients[row-1].id);
    this.props.deleteClient(this.props.clientSearch.findResults[row-1].id);
  }

  cardClick = (e,c) => {
    // console.log('in cardClick', c);
    // this.updateState({selected:c,drawer:!this.state.drawer});

    // getDerivedStateFromProps handles the rest.  When currentClient store value
    // is updated, gDSFP updates state.  It updates, cardClick, selected, and drawer.
    this.updateState({cardClick:c.id});
    this.props.getClientData(c.id);

  }

  addClient = () => {
    // console.log('in addClient');
    this.updateState({cardClick:'new',selected:{},
      drawer:!this.state.drawer,currentTab:'details'});
    this.props.getClientData('new');
  }
  // Not using.  Never got it to work.
  useImg = (img, type) => {
    let blob;
    switch(type) {
      case 'jpeg':
        blob = new Blob([img], {type: 'image/jpeg'});
        break;
      case 'svg':
        blob = new Blob([img], {type: 'image/svg+xml'});
        break;
      case 'png':
      default:
        blob = new Blob([img], {type: 'image/png'});
        break;
    }
    return URL.createObjectURL(blob);
    // return URL.createObjectURL(`data:image/svg+xml,${svg}`)
  }

  sort = (field) => {
    // console.log('sort',field);
    let direction = this.state.sort.direction;
    if (field.name === this.state.sort.field) {
      direction = this.state.sort.direction === 'A'?'D':'A'
    } else {
      direction = 'A'
    }
    this.setState({ sort:{field:field.name
      ,data_type:field.display_value_data_type?field.display_value_data_type:field.data_type
      ,direction:direction} },
      ()=>this.setState({ list:this.state.list.sort(this.sortIt()) })
    );
  }
  // uses state.sort to get values.  Or can pass in.
  sortIt = (f = null, t = null, d = null) => {
    const field = f?f:this.state.sort.field;
    const data_type = t?f:this.state.sort.data_type;
    const direction = d?f:this.state.sort.direction;
    // console.log('sortIt', field, data_type, direction);
    switch(data_type) {
      case 'text':
        // console.log('sort text');
        return (
          (a, b) => {
            const aStr = a[field]?a[field].toLowerCase():'';
            const bStr = b[field]?b[field].toLowerCase():'';
            if (direction === 'A') {
              return ((aStr < bStr) ? -1 : ((aStr > bStr) ? 1 : 0));
            }
            return ((aStr > bStr) ? -1 : ((aStr < bStr) ? 1 : 0));
          }
        )
      case 'number':
        // console.log('sort number');
        return (
          (a, b) => {
            const aNum = a[field];
            const bNum = b[field];
            // console.log('sortNumber',aNum, bNum);
            if (direction === 'A') {
              return (aNum-bNum);
            }
            return (bNum-aNum);
          }
        )
      case 'date':
        // console.log('sort date');
        return (
          (a, b) => {
            const aDate = new Date(a[field]);
            const bDate = new Date(b[field]);
            if (direction === 'A') {
              return (aDate-bDate);
            }
            return (bDate-aDate);
          }
        )
      default:
      // console.log('sort default');
        return (
          (a, b) => {
            const aStr = a[field.name] === null? '':a[field.name].toLowerCase();
            const bStr = b[field.name] === null? '':b[field.name].toLowerCase();
            if (direction === 'A') {
              return ((aStr < bStr) ? -1 : ((aStr > bStr) ? 1 : 0));
            }
            return ((aStr > bStr) ? -1 : ((aStr < bStr) ? 1 : 0));
          }
        )
    }
  }

  cardList = () => {
    const { classes, theme } = this.props;

    let cards = [];
    // console.log('in cardList', this.state.count, )
    const last = this.state.list.length <= this.state.countPerPage*this.state.page?this.state.list.length:this.state.countPerPage*this.state.page
    for (let i = this.state.countPerPage*(this.state.page-1);i < last; i++)
    {
      // {this.state.list.map((c,id) =>{
      // })}
      let c = {...this.state.list[i]};
      // console.log('card', i, c);
      let address1 = '', address2 = '', address3 = '';
      // Address 1 is address 1
      if (c.billing_address1) {
        address1 = c.billing_address1;
        // Address 2 is address 2
        if (c.billing_address2) {
          address2 = c.billing_address2;
          // Address 3 is city, state
          if (c.billing_city||c.billing_state_prov||c.billing_zipcode||c.billing_country) {
            if (c.billing_city && c.billing_state_prov) {
              address3 = `${c.billing_city}, ${c.billing_state_prov}`;
            } else {  // one of them is null / empty.
              address3 = `${c.billing_city?c.billing_city:''}${c.billing_state_prov?c.billing_state_prov:''}`;
            }
            address3 = c.billing_zipcode?`${address3} ${c.billing_zipcode}`:address3;
            address3 = c.billing_country && c.billing_country != 'US'?`${address3} ${c.billing_country}`:address3;
          }
        // Address 2 is city, state
        } else if (c.billing_city||c.billing_state_prov||c.billing_zipcode||c.billing_country) {
          if (c.billing_city && c.billing_state_prov) {
            address2 = `${c.billing_city}, ${c.billing_state_prov}`;
          } else {  // one of them is null / empty.
            address2 = `${c.billing_city?c.billing_city:''}${c.billing_state_prov?c.billing_state_prov:''}`;
          }
          address2 = c.billing_zipcode?`${address2} ${c.billing_zipcode}`:address2;
          address2 = c.billing_country && c.billing_country != 'US'?`${address2} ${c.billing_country}`:address2;
        }
      // Address 1 is address 2
      } else if (c.billing_address2) {
        address1 = c.billing_address2;
        // Address 2 is city, state
        if (c.billing_city||c.billing_state_prov||c.billing_zipcode||c.billing_country) {
          if (c.billing_city && c.billing_state_prov) {
            address2 = `${c.billing_city}, ${c.billing_state_prov}`;
          } else {  // one of them is null / empty.
            address2 = `${c.billing_city?c.billing_city:''}${c.billing_state_prov?c.billing_state_prov:''}`;
          }
          address2 = c.billing_zipcode?`${address2} ${c.billing_zipcode}`:address2;
          address2 = c.billing_country && c.billing_country != 'US'?`${address2} ${c.billing_country}`:address2;
        }
      // Address 1 is city, state
      } else if (c.billing_city||c.billing_state_prov||c.billing_zipcode||c.billing_country) {
        if (c.billing_city && c.billing_state_prov) {
          address1 = `${c.billing_city}, ${c.billing_state_prov}`;
        } else {  // one of them is null / empty.
          address1 = `${c.billing_city?c.billing_city:''}${c.billing_state_prov?c.billing_state_prov:''}`;
        }
        address1 = c.billing_zipcode?`${address1} ${c.billing_zipcode}`:address1;
        address1 = c.billing_country && c.billing_country != 'US'?`${address1} ${c.billing_country}`:address1;

      }

      cards.push(
        <Grid key={c.id} item xs={6} sm={4} md={2}>
        <Card
          style={{
            margin:10,
            // backgroundColor: theme.palette.secondary.light,
            // width:200
          }}


          onClick={(e)=>this.cardClick(e,c)}
        >
          <CardActionArea>
            {/*<CardMedia
              className={classes.media}
              alt='No Logo'
              // component='img'
              // image={c.logo?`./img/${c.logo}`:'./img/noLogo.'}
              // needs to be 200 x 100 (2:1) size.
              image={c.logo?`./img/${c.logo}`:'./img/noLogo.png'}
              title='logo'
            />*/}
            <CardContent style={{padding:8}}>
              <Grid container justify='space-between'>
                <Grid item>
                  <Typography style={{margin:0}}>
                    <b>{c.name}</b>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography style={{margin:0}}>
                    {c.id}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography style={{margin:0,fontSize:12}}>
                    {address1}<br/>
                    {address2}<br/>
                    {address3}
                  </Typography>

                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
        </Grid>
      )
    }
    return cards;
  }

  alertOfChange = (e) => {
    console.log('alerting of change', e);
    if ('change' in this.state.selected) {
      console.log('There are changes');
      this.props.ynDialog(
        {
          ok: false,
          title: 'Save changes?',
          content: `Would you like to save changes to ${this.state.selected.client}?`,
          yesFunc: this.handleSave,
          noFunc: false
        }
      )
      // return;
    }
  }

  render() {
    const { currentViews, clientSearch, classes, theme, currentClient } = this.props;
    // const { classes, currentViews, width, currentProject, search } = this.props;
    // console.log('Client Render:',
    // 'state:', this.state,
    // 'currentViews:', currentViews,
    // 'props Geos', this.props.geos,
    // 'props geoSearch', this.props.geoSearch,
    // 'props currentClient', currentClient,

    // );

    // if someone clicks recents and wants to navigate to project screen.
    if (this.props.currentProject.url && this.props.currentProject.address1) {
      // console.log('the url',this.props.currentProject.url);
      return <Redirect to={this.props.currentProject.url} />
    }

    // Test to make sure we can render Screen.  Only set to true when
    // currentProject and currentViews are populated.
    // If currentProject is empty, go back to Main menu.
    if (!this.state.renderScreen) {
      // console.log('loading...');
      return null;
    }

    let currentView = [];
    // if (currentViews instanceof Array) {
    //   if (currentViews.children) {
    //     currentView = currentViews.children.filter((view) => view.category === this.state.currentView)  // array of subviews (sections) that make up whole view.
    //   }
    // } else {
    //   currentView.push(currentViews);
    // }
    if (currentViews.length > 0) {
        currentView = currentViews.filter((view) => view.category === this.state.currentView)  // array of subviews (sections) that make up whole view.
    } else {
      return null;
    }

    const title = currentView[0].label;
    // console.log('currentView', currentView);

    // Supporting an INSERT row.
    // let data = clientSearch.find?[...clientSearch.findResults]:[...clients];
    let data = clientSearch.find?[...clientSearch.findResults]:[];

    // data.sort(this.sortIt());
    // data.unshift({});

    const sGroupArr = currentView.map(v=>{
      return v.children.find(g=>g.name === 'search_criteria')
    })

    const rGroupArr = currentView.map(v=>{
      return v.children.find(g=>g.name === 'client_results')
    })
    const sGroup = sGroupArr[0];
    const rGroup = rGroupArr[0];

    // console.log('groups', rGroup);

    return (
      <CePageContainer
        title={title}
        topActionBarLeft={this.topActionBarLeft}
        topActionBarRight={this.topActionBarRight}
        bottomActionBar={this.bottomActionBar}
      >
        <Drawer
          variant="persistent"
          anchor="left"
          open={this.state.drawer}
          className={classes.drawer}
          classes={{
            paper: classes.drawer,
          }}
        >
          {this.topActionBarDrawer()}
          <Divider />
          <Grid container item justify="flex-start" className={classes.grid}>
            {this.cardList()}
            {this.bottomActionBarDrawer()}
          </Grid>
        </Drawer>

        <main className={classNames(classes.content, {
            [classes.contentShift]: !this.state.drawer
          })}
        >
          <Tabs
            value = {this.state.currentTab}
            onChange={(e,v)=>this.updateState({currentTab:v})}
            indicatorColor='primary'
            textColor='primary'
            variant='fullWidth'
            className = {classes.tabHeader}
          >
            {/*currentClient.hasOwnProperty('reporting')*/}
            {this.state.cardClick !== 'new'
              &&
            <Tab value='dashboard' label='Dashboard'
              classes={{ labelContainer: classes.tabContainerProps, }}
            />}
            <Tab value='details' label='Details'
              classes={{ labelContainer: classes.tabContainerProps, }}
            />
            {/*<Tab value='contacts' label='Contacts'
              classes={{ labelContainer: classes.tabContainerProps, }}
            />
            <Tab value='drules' label='Design Rules'
              classes={{ labelContainer: classes.tabContainerProps, }}
            />
            <Tab value='brules' label='Billing Rules'
              classes={{ labelContainer: classes.tabContainerProps, }}
            />*/}
            {this.state.cardClick !== 'new'
              &&
            <Tab value='history' label='History'
              classes={{ labelContainer: classes.tabContainerProps, }}
            />}
          </Tabs>

          {this.state.currentTab === 'dashboard' &&
            <ClientDashboardContainer
              fGroup = {rGroup}
              parentState = {this.updateState}
            />
          }
          {this.state.currentTab === 'details' &&
            <ClientDetailsContainer
              fGroup = {rGroup}
              parentState = {this.updateState}
            />
          }

          {this.state.currentTab === 'contacts' &&
            <Grid container>
              Contacts
            </Grid>
          }
          {this.state.currentTab === 'drules' &&
            <Grid container>
              Design Rules
            </Grid>
          }
          {this.state.currentTab === 'brules' &&
            <Grid container>
              Billing Rules
            </Grid>
          }
          {this.state.currentTab === 'history' &&
            <ClientHistoryContainer
              fGroup = {rGroup}
              parentState = {this.updateState}
            />
          }
        </main>

      </CePageContainer>
    )  // return

  }  // render
}  // Component


export default withWidth()(withStyles(styles, { withTheme: true })(Client));
