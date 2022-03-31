import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom"
// import { withNavigationFocus } from 'react-navigation';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withWidth } from "@material-ui/core";

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';

// import AddIcon from '@material-ui/icons/Add';
// import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';

import { DefaultFG, ListTabularFG } from './ceFieldGroup';
import CePageContainer from '../containers/cePageContainer';
import { Field2Container } from '../containers/ceFieldContainer';

// import Save from '@material-ui/icons/Save';
import { AddIcon } from '../img/addIcon.js';
// import { InspectorImg } from '../img/inspector.js';
// import { HouseSearch } from '../img/houseSearch.js';
import { Exit } from '../img/exit.js';
import { DownloadCSV } from '../img/csvDownloadIcon.js';
// import SearchIcon from '@material-ui/icons/Search';

import InspectionDialogContainer from '../containers/InspectionDialogContainer';

// import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
  flex: {
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
  addButton: {
    // position: 'fixed',
    // right: '5%',
    // top: 135,
    // zIndex: 1000
  },
  grow: {
    flexGrow: 1,
    // width: 150
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
  searchText: {
    marginRight: 20,
    color: theme.palette.secondary.contrastText,
  },
  searchTitlePosition: {
    position: 'absolute',

  },
  searchTitle: {
    color: theme.palette.secondary.contrastText,
    fontSize: 20,
    fontWeight: 400,
    cursor: 'default',

  },
  leftIcon: {
    marginRight: 5,
    width: 20
  },
});

class Inspection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      object: 'INSPECTION',
      renderScreen: false,
      currentMenuID: this.props.currentViews.id,
      currentView: this.props.VIEW||'DEFAULT',
      saveValue: '',  // stores previous values of address/lot/block to test for change      selectedIndexes: [],
      // selectedIndexes: [],
      openAddDialog: false,
      inspToUpdate: false,  // if null, dialog will assume add.
      findBy: 'INSPECTOR',
      findTitle: this.props.session.full_name,
      findID:this.props.session.contact_id,
      sort:{field:'inspection_date',data_type:'date',direction:'D'},
      dateRange: '7',
      // inspector: this.props.session.full_name,
      // inspector_id:this.props.session.contact_id,
      // project_id: null,
      // job_number: null,
      // address1: null,
      // project_rev: null,
      modifiedInspections: [],
      created_by: this.props.session.id,
      last_updated_by: this.props.session.id,
    };

    this.initState = {...this.state};

  }

  componentDidMount = () => {
    // console.log('Inspection CDM');
    this.props.loadInspections(this.state.findBy, this.state.findID, this.state.dateRange);
    if (this.props.currentViews.name !== 'inspection') this.props.loadViewsByName('inspection');
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log('Inspection gDSFP');
    const { currentViews } = nextProps;
    // console.log('Inspection gDSFP: nextProps', currentViews);

    // If the views object is populated, activate the screen render toggle.
    // currentViews is populated: from the menu, selecting a project.
    // if (!prevState.renderScreen && currentViews.name === 'inspection' && currentViews.constructor === Object && Object.keys(currentViews).length !== 0) {
    if (!prevState.renderScreen && currentViews.length > 0) {
      if (currentViews.findIndex(view => view.category === 'DEFAULT') > -1) {
        return {renderScreen: true };
      }
    }

    return null;
  }

  // actions that show on top of page.  Left side near the Find (when active)
  topActionBarLeft = () => {
    const { classes, inspections } = this.props;
    // return null;
      return (
        <Fragment>

        <Grid container justify="center" className={classes.searchTitlePosition}>
          <Grid item>
          {this.state.findBy === 'INSPECTOR'?
          <Typography className={classes.searchTitle}>
            Inspections by {this.state.findTitle}
          </Typography>
          :
          <Typography className={classes.searchTitle}>
            Inspections for {this.state.findTitle}
          </Typography>

          }

          </Grid>
        </Grid>

        <Grid item xs={3}>

        {/*<Tooltip title='Change Search'>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={()=>{
              this.updateState({searchBy:this.state.searchBy==='inspector'?'address':'inspector', searchDialog:true});
            }}
          >
            <SearchIcon className={classes.leftIcon} />
            Change Search
          </Button>
        </Tooltip>
        */}
        <Tooltip title='You can search for an address, inspector, client, cable company, or status'>

        <Paper>
        <Field2Container
          // key={field.id}
          field = {{name: 'find', label: '', lookup_list:true}}
          arrID = {false}
          state = {this.state}
          updateState = {this.updateState}
          // altLookups can support multiple lookups when used with field group with multiple fields.  Array of records of fields.
          altLookups = {[{name: 'find', label: '', lookup_list:inspections.filter}]}
          altBkg = {true}
          placeholder={'Filter your inspections by...'}
          // find action.  Only used when searching an object, like
          // projects, geotechs, subdivisions, clients, etc.
          asYouType={4}
          findAction={this.findAction}
          // turns off dup check, creating client,city,sub via list
          searchMode={true}
          // props that are not used.
          handleListChange={false}
          handleFocus={false}
          handleBlur={false}
          // call to create new client, city, sub
          createDialogValue={false}

          // props functions in container
          // searchForDups
          // loadFind
          // loadMessage
        />
        </Paper>
        </Tooltip>

        </Grid>

        </Fragment>
      )

  }
  // actions that show on top of page.  Right side near the Recents button
  topActionBarRight = () => {
    // const { classes, theme, width } = this.props;
    return null;
  }
  // actions that show on bottom of page
  bottomActionBar = () => {

    const { classes } = this.props;

    return (
    <Grid container justify="flex-end" style={{marginTop: 10, marginBottom: 10}} spacing={16}>
      <Grid item className={classes.grow}>
        <Link to={`/`} className={classes.linkStyle}>
          <Button title='Return to menu'
            variant="contained"
            size='small'
            color="secondary"
          >
            <Exit size={24} />
            Exit
          </Button>
        </Link>
      </Grid>
    </Grid>
    )
  }

  downloadCSV = () => {
    // Use first element to choose the keys and the order
    let result = '';

    if (this.props.inspections.results.length > 0) {
      let keys = Object.keys(this.props.inspections.results[0]);

      // Build header
      result = `data:text/csv;charset=utf-8,"${keys.join('","')}"` + '\n';

      // Add the rows
      this.props.inspections.results.forEach(function(obj) {
        result += `"${Object.values(obj).join('","')}"` + '\n';
        
        // console.log('the obj', obj);
        // result += keys.map(k => {
        //   if (Object.prototype.toString.call(obj[k]) === '[object Array]') {
        //     console.log('array', obj[k]);
        //     return `"Array[]"`;  // returning the array as a string.
        //   } else if (Object.prototype.toString.call(obj[k]) === '[object Object]') {
        //     console.log('object', obj[k]);
        //     return `"Object{}"`;  // returning the array as a string.
        //   } else {
        //     console.log('scalar', obj[k]);
        //     return `"${obj[k]}"`;
        //   }
        // }).join(',') + '\n';

      });

      console.log('download Result', result);
      const encodedUri = encodeURI(result);
      // window.open(encodedUri);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "inspections.csv");
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(link.href);
    } else {
      this.props.loadMessage(
        { ok: false,
          status: 'No data',
          statusText: 'No results to download.  Run a query'
        },
        'INFO'
      );
    }

  }

  // actions that show in field group title bar
  fieldGroupTools = () => {
    // return null;
    const { classes } = this.props;

    return (
      <Grid container alignItems='center' style={{marginLeft:30}}>
        <Grid item xs={2}>
          <Field2Container
            // key={field.id}
            field = {{name: 'dateRange', label: 'Insp Date Within', lookup_list:'dateSearchLookup'}}
            arrID = {false}
            state = {this.state}
            updateState = {this.updateState}
            // altLookups can support multiple lookups when used with field group with multiple fields.  Array of records of fields.
            // altLookups = {[{name: 'find', label: '', lookup_list:inspections.filter}]}
            // altBkg = {true}
            placeholder={'Date'}
            // find action.  Only used when searching an object, like
            // projects, geotechs, subdivisions, clients, etc.
            // asYouType={4}S
            // findAction={this.findInspections}
            // turns off dup check, creating client,city,sub via list
            searchMode={true}
            // props that are not used.
            handleListChange={false}
            handleFocus={false}
            handleBlur={false}
            // call to create new client, city, sub
            createDialogValue={false}

            // props functions in container
            // searchForDups
            // loadFind
            // loadMessage
          />
        </Grid>
        <Grid item className={classes.grow} />
        <Grid item>
          <Tooltip title='Download csv' placement='left'>
            <IconButton className={classes.addButton}
              color="secondary"
              onClick={()=>this.downloadCSV()}
            >
              <DownloadCSV size={40} />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title='Add Inspection' placement='left'>
            <IconButton className={classes.addButton}
              color="secondary"
              onClick={()=>this.handleAddEdit(false)}
            >
              <AddIcon size={40} />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    );

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
    return null;
    // return (
    //   <Grid item>
    //   <Button title='Find records'
    //     variant="contained"
    //     size='small'
    //     color="secondary"
    //     onClick={this.findClients}
    //   >
    //     Search
    //   </Button>
    //   </Grid>
    // )
  }

  updateState = (updatedValues) => {
    // console.log('updateState', updatedValues);
    let updatedKeys = null;
    if (Object.keys(updatedValues)[0] === 'find') {
      const val = Object.values(updatedValues)[0];
      // console.log('updateState', val);
      updatedKeys = {
        findBy: val.entity,
        findTitle: val.name,
        findID: val.code,
      }
      // console.log('updatedKeys', updatedKeys);
      this.setState(updatedKeys,() => {
        this.findInspections();
      });

    } else if (Object.keys(updatedValues)[0] === 'dateRange') {
      // console.log('updateState else if', this.state);
      this.setState(updatedValues,() => {
        this.findInspections();
      });
    } else {
      // console.log('updateState else', updatedValues);
      this.setState(updatedValues);
    }

  }

  // handleSelected = () => {
  //   // console.log('In the handleSelected', this.state.selectedIndexes[0]);
  //   if (this.state.selectedIndexes[0] > -1) {  // gets 0 and above.
  //     // console.log('In the if');
  //     this.props.updateGeotech(this.props.geoSearch.findResults[this.state.selectedIndexes[0]]);
  //     // this.props.clearDups();  // in container
  //   } else {  // user selected first row (index = 0) which was the curent entry
  //     // console.log('In the else');
  //     // this.props.clearDups();  // in container
  //   }
  // }

  findAction = (search) => {
    // console.log('findAction', search);
    // Tests for string.  If string is empty, user just hit enter.  So Ignore.
    // if (search) this.props.filterChoices(search);
    this.props.filterChoices(search);

  }

  // Only called by Search button.
  findInspections = () => {
    // console.log('find Inspections',this.state.findBy, this.state.findID, this.state.dateRange);
    this.props.loadInspections(this.state.findBy, this.state.findID, this.state.dateRange);
  }

  handleAddEdit = (inspToUpdate) => {
    // clears the inspection filter list
    // console.log('Inspections Object', this.props.inspections);
    // console.log('handleAddEdit: inspection to update', inspToUpdate);

    // inspToUpdate?this.props.filterProjects(inspToUpdate.job_number)
    //   :this.props.filterChoices(null);

    inspToUpdate?this.props.editInspection(inspToUpdate.project_id, inspToUpdate.id)
      :this.props.filterChoices(null);

    this.setState({ openAddDialog: true, inspToUpdate: inspToUpdate });
  }

  // handleDelete = (row)=> {
  //   // console.log('Delete sub ', row, row-1, this.props.subSearch.findResults[row-1]);
  //
  //   // This module supports an INSERT row as first row.  Must take into consideration
  //   // that row passed will be based on the array id with insert row as first row
  //   // Therefore need to subtract 1 to get right value for props geos array.
  //   this.props.deleteInspection(this.props.inspections.results[row-1].id);
  // }

  setFields = (group) => {
    const { preferences } = this.props;
    // console.log('set fields', group, preferences);

    let fields = {};
    if (preferences.user.hasOwnProperty('fields')) {
      fields = preferences.user.fields.find( pref =>
        pref.viewID === group.parent_id && pref.fgID === group.id && pref.key === this.state.findBy)
    }

    if (!fields.hasOwnProperty('value')) {
      fields = preferences.system.fields.find(pref =>
        pref.viewID === group.parent_id && pref.fgID === group.id && pref.key === this.state.findBy)
    }

    // console.log('new fields', fields, group);
    let newFields = []
    newFields = fields.value.map(field => {

      const temp = group.children.find( f => f.id === field.fID);
      if (temp) {
        return (Object.assign(temp
          , field.hasOwnProperty('width')?{display_width: field.width}:{}
          , field.hasOwnProperty('column_width')?{column_width: field.column_width}:{}
        ))
      }
      return null;
    })
    // console.log('new fields 2', newFields);
    return newFields;
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
      ,direction:direction} });
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

  render() {
    const { currentViews, inspections } = this.props;
    // const { classes, currentViews, width, currentProject, search } = this.props;
    // console.log('Inspection Render:',
    // 'state:', this.state,
    // 'session:', session,
    // 'currentViews:', currentViews,
    // 'VIEW', this.state.currentView,
    // 'props inspections', inspections,
    // );

    // if (this.props.currentProject.url && this.props.currentProject.address1) {
    //   // console.log('the url',this.props.currentProject.url);
    //   return <Redirect to={this.props.currentProject.url} />
    // }

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
    let data = [...inspections.results];
    data.sort(this.sortIt());

    return (
      <Fragment>
      <CePageContainer
        title={title}
        topActionBarLeft={this.topActionBarLeft}
        topActionBarRight={this.topActionBarRight}
        bottomActionBar={this.bottomActionBar}
      >
        {currentView.map((view,vid)=>{  // loop on views
          // console.log('View children',view.children);
          return (
            view.children.map((group,gid)=>{  // loop on objects in views.  Usually field groups.
              // console.log('group', group, gid);

              const prefFields = this.setFields(group);

              const tGroup = Object.assign({},group,{children: prefFields});

            switch (tGroup.name) {
              case 'inspection_fields':
                return(<ListTabularFG
                        key={gid}
                        fieldGroup = {tGroup}
                        fgStyles = {false}
                        fgTools={this.fieldGroupTools}
                        parentState = {this.state}
                        data = {data}
                        sort = {this.sort}
                        // updateState = {this.updateState}
                        handleAddEdit={this.handleAddEdit}
                        // handleSave={this.handleSave}
                        // handleDelete={this.handleDelete}
                        // saveHelp='Save the inspection'
                        // editHelp='Edit the inspection'
                        // deleteHelp='Delete the inspection'
                      />)
                // break;
              case 'inspection_search':
                return(<DefaultFG
                        key={gid}
                        fieldGroup = {tGroup}
                        state = {this.state}
                        updateState = {this.updateState}
                        fgTools={this.fieldGroupTools}
                        findAction={this.findAddressInspector}
                        noBorder={true}
                        noLabel={true}
                      />)
                // break;
              default:
                return(<DefaultFG
                        key={gid}
                        fieldGroup = {group}
                        state = {this.state}
                        updateState = {this.updateState}
                        hide={false}
                        findAction={this.findSubdivisions}
                        noBorder={true}
                        noLabel={true}
                      />)
            }  // switch
          }))  // function-map-return
        })    // function-map  jsx below.
        }
      </CePageContainer>

      {this.state.openAddDialog &&
      <InspectionDialogContainer
        parentState = {this.state}
        updateParentState = {this.updateState}
      />}
      </Fragment>
    )  // return

  }  // render
}  // Component


export default withWidth()(withStyles(styles, { withTheme: true })(Inspection));

// handleSave = (updatedRows) => {
//   // let updated = updatedRows.filter(r=>{if (r) return r});
//   // console.log('Subdivision handle Save', updatedRows);
//
//   // Testing to make sure all the edited projects still have
//   // an address, client, and city.
//   let dataOk = true;
//   for (let i=0; i<updatedRows.length; i++) {
//     const { subdivision_name } = updatedRows[i];
//     if (!subdivision_name ) {
//       this.props.loadMessage(
//         { ok:false,
//           status: 'Missing Data',
//           statusText: "Missing subdivision name.  Please fill in"
//         }, "ERROR");
//       dataOk = false;
//       break;
//     }
//   }
//
//   // Testing to make sure all the edited projects still have
//   // an address, client, and city.
//   if (dataOk) {
//     // for (let i=0; i<updatedRows.length; i++) {
//     //   // console.log('all is ok right now.  State:', updatedRows[i]);
//     //   this.props.saveGeotechs(updatedRows[i]);
//     // }
//     this.props.saveSubdivisions(updatedRows);
//   }  // if dataOk
//
// }  // end of function
