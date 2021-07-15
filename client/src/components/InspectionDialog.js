import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withWidth } from "@material-ui/core";
import CeDialog from './ceDialog';

import { DefaultFG, DialogDefaultFG, DialogInspectionAddFG } from './ceFieldGroup';
import { DialogInspectionAddFGContainer } from '../containers/ceFieldGroupContainer';

// import designRev from '../img/designrev-black.svg';
// import designRevWhite from '../img/designrev-white.svg';
import { InspectorImg } from '../img/inspector';
import { HouseSearch } from '../img/houseSearch';

const styles = theme => ({
  image: {
    height: 32,
    width: 32,
    color: theme.palette.secondary.contrastText,
  },
  imageTitle: {
    // height: 32,
    paddingRight: 10
  },

});

const date = (dayAdj=0,noTime=false) => {
  let returnDate = new Date();
  returnDate.setDate(returnDate.getDate()+dayAdj);
  const theMonth = returnDate.getMonth()+1 < 10? `0${returnDate.getMonth()+1}` : `${returnDate.getMonth()+1}`;
  const theDay = returnDate.getDate() < 10? `0${returnDate.getDate()}` : `${returnDate.getDate()}`;

  const theHour = returnDate.getHours() < 10? `0${returnDate.getHours()}` : `${returnDate.getHours()}`;
  const theMin = returnDate.getMinutes() < 10? `0${returnDate.getMinutes()}` : `${returnDate.getMinutes()}`;
  const theSec = returnDate.getSeconds() < 10? `0${returnDate.getSeconds()}` : `${returnDate.getSeconds()}`;
  if (noTime) {return `${returnDate.getFullYear()}-${theMonth}-${theDay}`;}
  return `${returnDate.getFullYear()}-${theMonth}-${theDay}T${theHour}:${theMin}:${theSec}`;
  // return returnDate.toLocaleString();
}

class InspectionDialog extends Component {
  constructor(props) {
    super(props);

    const today = date();
    const tomorrow = date(1,true);
    const week = date(7,true);

    this.insp = this.props.parentState.inspToUpdate?{...this.props.parentState.inspToUpdate}:false;
    // console.log('props inspections',this.props.inspections);

    this.state = {
      object: 'INSPECTION_DIALOG',
      renderScreen: false,
      id: this.insp?this.insp.id:null,
      today: today,
      created_by: this.props.session.id,
      last_updated_by: this.props.session.id,

      inspection_date: this.insp?this.insp.inspection_date:tomorrow,
      project_id: this.insp?this.insp.project_id:null,
      address1: this.insp?this.insp.address1:'',
      revision: this.insp?this.insp.project_revision:null,
      job_number: this.insp?this.insp.job_number:null,
      scope_id: this.insp?this.insp.scope_id:null,
      scope: this.insp?this.insp.scope:null,
      scope_name: this.insp?this.insp.scope_name:null,
      // scope_list: this.inspections.filter[0]?insp.scope_list:null,
      scope_list: this.insp?[{code:this.insp.scope_id,scope:this.insp.scope_name,name:this.insp.scope_name,label:this.insp.scope}]:[],
      inspection_type: this.insp?this.insp.inspection_type:null,
      inspection_status: this.insp?this.insp.inspection_status:null,
      inspection_reason: this.insp?this.insp.inspection_reason:'',
      inspection_billable: this.insp?this.insp.inspection_billable:null,
      inspection_vpo: this.insp?this.insp.inspection_vpo:null,
      deep_beam: this.insp?this.insp.deep_beam:null,
      barrier_beam: this.insp?this.insp.barrier_beam:null,
      reinspection: this.insp?this.insp.reinspection:null,
      rain_reinspection: this.insp?this.insp.rain_reinspection:null,
      upper_slab: this.insp?this.insp.upper_slab:null,
      lower_slab: this.insp?this.insp.lower_slab:null,
      ret_wall_on_slab: this.insp?this.insp.ret_wall_on_slab:null,
      inspection_contact: this.insp?this.insp.inspection_contact:null,
      cable_company_id: this.insp?this.insp.cable_company_id:null,
      target_stress_date: this.insp?this.insp.target_stress_date:week,
      comments: this.insp?this.insp.comments:null,
      contact_id: this.insp?this.insp.contact_id:this.props.session.contact_id,
      inspector: this.insp?this.insp.inspector:this.props.session.full_name,
      deleteTrue: false,
      reasons: this.insp.hasOwnProperty('reasons')?this.insp.reasons:[],
      org_type: 'CABLE',
    };

    this.initState = {...this.state};

    this.VIEW = 'inspection_dialog';

  }

  componentDidMount = () => {
    // console.log('revision CDM: local state', this.state, 'parent state:', this.props.parentState);

    this.props.loadLocalView(this.VIEW);
    // console.log('InspDialog CDM',
    //   'insp:', this.insp,
    //   'props.inspections:', this.props.inspections,
    // );
    // insp?this.props.loadPrevProjectInspections(insp.project_id, insp.id):null;
    // this.props.loadProjectRevisions(this.props.parentState.id);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log('in getDerivedStateFromProps');
    // const insp = this.props.parentState.inspToUpdate?{...this.props.parentState.inspToUpdate}:false;

    const { localView, inspections, parentState } = nextProps;
    const insp = parentState.inspToUpdate?{...parentState.inspToUpdate}:false;

    const scope_list = inspections.filter.length>0?inspections.filter[0].scope:[];
    // console.log('inspections', inspections);
    // console.log('prevState', prevState);
    // If the views object is populated, activate the screen render toggle.
    if (!prevState.renderScreen
      && localView.constructor === Object && Object.keys(localView).length !== 0
      && ( (insp && inspections.find === insp.job_number) || !insp)
    )
    // if (localView.constructor === Object && Object.keys(localView).length !== 0)
    {
      return { renderScreen: true, scope_list:scope_list };

    }
    return null;
  }

  image = () => {
    const { classes, theme } = this.props;
    // <img src={theme.palette.secondary.contrastText === '#fff'?designRevWhite:designRev} alt={'Revision Update'} className={`${classes.image} ${classes.imageTitle}`} />
    return (
      <div alt={'Inspection Add Update'} className={classes.imageTitle}>
        <HouseSearch size={30} color={theme.palette.secondary.contrastText}  />
      </div>
    )
  }

  findAction = (search) => {
    // console.log('findAction', search);
    // Tests for string.  If string is empty, user just hit enter.  So Ignore.
    if (search) this.props.filterProjects(search);
  }

  actions = () => {
    // const { classes, theme } = this.props;
    return null;  // skip the icon for now.

  }

  handleChange = (updatedValues) => {
    // console.log('updatedValues', updatedValues);
    this.setState(updatedValues);


  }

  handleChangeCustomized = (field,value) => {
    // console.log('handleChangeCustomized: here I am!', this.state, value);
    switch(field.name) {
      case 'address1':
        value?
          this.setState( {project_id: value.project_id, address1: value.name
            , revision: value.revision, scope_list: value.scope, scope_id: null, scope: null, scope_name: null
            , inspection_type: null, inspection_reason: null, deep_beam: null
            , barrier_beam: null, reinspection: null, rain_reinspection: null, upper_slab: null
            , lower_slab: null, ret_wall_on_slab: null} )
            :
          this.setState( {project_id: null, address1: null
            , revision: null, scope_list: [], scope_id: null, scope: null, scope_name: null
            , inspection_type: null, inspection_reason: null, deep_beam: null
            , barrier_beam: null, reinspection: null, rain_reinspection: null, upper_slab: null
            , lower_slab: null, ret_wall_on_slab: null} );
        break;
      case 'scope':
        value?
          this.setState( {scope_id: value.id, scope: value.name, scope_name: value.name
          , inspection_type: null, inspection_reason: null, deep_beam: null
          , barrier_beam: null, reinspection: null, rain_reinspection: null, upper_slab: null
          , lower_slab: null, ret_wall_on_slab: null} )
          :
          this.setState( {scope_id: null, scope: null, scope_name: null
          , inspection_type: null, inspection_reason: null, deep_beam: null
          , barrier_beam: null, reinspection: null, rain_reinspection: null, upper_slab: null
          , lower_slab: null, ret_wall_on_slab: null} )
        break;
      case 'inspection_type':
        value?
          this.setState( {inspection_type: value.code, inspection_reason: null, deep_beam: null
          , barrier_beam: null, reinspection: null, rain_reinspection: null, upper_slab: null
          , lower_slab: null, ret_wall_on_slab: null} )
          :
          this.setState( {inspection_type: null, inspection_reason: null, deep_beam: null
          , barrier_beam: null, reinspection: null, rain_reinspection: null, upper_slab: null
          , lower_slab: null, ret_wall_on_slab: null} )
        break;
      default:
        break;
    }
  }

  handleClear = () => {
    null;
  }

  // handles new (this.state) as well as existing rows.  Can handle an array.
  handleSave = () => {
    // console.log('handleSave', this.state);
    this.props.saveInspections(this.state);
  }  // handleSave

  // handleClose... handles closing the dialog box.  Uses props.updateParentState
  // to update the state of the calling module, particularly the close toggle
  handleClose = () => {
    this.props.updateParentState({ openAddDialog: false });
  }

  // Save the reason and notes into an array.
  saveReason = () => {
    // console.log('saveReason', this.state);
    let reasons = [...this.state.reasons];
    const abridged = this.state.reasons.filter(r=>r.change!=='delete');
    // console.log('saveReason', this.state, abridged);

    reasons.push({order: abridged.length+1
      ,inspection_id:this.state.id
      ,reason:this.state.inspection_reason
      ,comments:this.state.comments
      ,created_by: this.state.created_by
      ,last_updated_by: this.state.last_updated_by})
    this.setState( {reasons: reasons, inspection_reason:null, comments: null})
  }

  deleteReason = (order) => {
    // console.log('deleteReason', order);
    let reasons = [...this.state.reasons];
    const id = this.state.reasons.findIndex(r=>r.order === order);
    if (reasons[id].id) {
      reasons[id].order = null;
      reasons[id].change = 'delete';
      for (let i=id+1; i<reasons.length; i++) {
        reasons[i].order = --reasons[i].order;
      }
    } else {
      reasons.splice(id,1);
      for (let i=id; i<reasons.length; i++) {
        reasons[i].order = --reasons[i].order;
      }
    }

    // console.log('deleteReason post', reasons)
    this.setState( {reasons: reasons})
  }

  // Delete a deletion.
  handleDelete = () => {
    // console.log('Inspection Dialog: handleDelete', this.state);
    this.props.ynDialog(
      {
        ok: false,
        title: 'Delete Inspection?',
        content: `Are you sure you want to remove inspection at ${this.state.address1}
         scheduled on ${this.state.inspection_date}`,
        yesFunc: ()=>this.props.deleteInspection(this.state.id),
        noFunc: false

      }
    )
  }

  setFields = (group) => {
    const { preferences } = this.props;

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
          , field.hasOwnProperty('data_type')?{data_type: field.data_type}:{}
        ))
      }
    })
    // console.log('new fields 2', newFields);
    return newFields;
  }

  render() {
    // Test to make sure we can render Screen.  Only set to true when
    // currentProject and currentViews are populated.
    // If currentProject is empty, go back to Main menu.
    if (!this.state.renderScreen) {
      // console.log('loading...', this.state, this.props.parentState);
      return null;
    }

    // console.log('Inspection Dialog Render:', 'dialog state', this.state);
    // console.log('Inspection Dialog Render:', 'parent state', this.props.parentState);
    // console.log('Inspection Dialog Render:', 'inspections', this.props.inspections);

    return (
      <CeDialog
        open={true}
        title={`Add / Modify Inspections`}
        image={this.image()}
        // handleClose flips toggle on Parent State dialog toggle.
        handleClose={this.handleClose}
        // No handle submit.
        // handleSubmit={this.handleSave}
        // handleDelete={this.handleDelete}
        actions={this.actions()}
        dialogWidth={'md'}
        dialogHeight={'800px'}
      >

        {this.props.localView.children.map((group, id)=>{

          const prefFields = this.setFields(group);
          const tGroup = Object.assign({},group,{children: prefFields});

          switch(tGroup.name) {
            case 'inspection_fields':
              return (<DialogInspectionAddFGContainer
                      key={id}
                      // key={child.rship_id}
                      fieldGroup = {tGroup}
                      fgStyles = {{}}
                      hideLabel = {true}
                      // toggleScopeDialog={()=>{}}
                      // removeScope={false}
                      // props below manage state within dialog only
                      // parentState={this.state}
                      findAction={this.findAction}
                      dialogState={this.state}
                      updateState={this.handleChange}
                      handleChangeCustomized={this.handleChangeCustomized}
                      clearState={this.handleClear}
                      saveState={this.handleSave}
                      handleClose={this.handleClose}
                      handleSubmit={this.handleSave}
                      handleDelete={this.handleDelete}
                      saveReason={this.saveReason}
                      deleteReason={this.deleteReason}
                    />)
              // break;
            default:
              return (<DialogDefaultFG
                      key={id}
                      // key={child.rship_id}
                      fieldGroup = {tGroup}
                      // toggleScopeDialog={()=>{}}
                      // removeScope={false}
                      // props below manage state within dialog only
                      dialogState={this.state}
                      updateState={this.handleChange}
                    />)
          }

        })}

      </CeDialog>

    )

  }  // render
}  // Component


export default withWidth()(withStyles(styles, { withTheme: true })(InspectionDialog));
