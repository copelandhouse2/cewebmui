import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withWidth } from "@material-ui/core";
import CeDialog from './ceDialog';

import { DialogDefaultFG } from './ceFieldGroup';
import { DialogInspectionAddFGContainer } from '../containers/ceFieldGroupContainer';

import { getTrelloCard } from '../actions'
// import designRev from '../img/designrev-black.svg';
// import designRevWhite from '../img/designrev-white.svg';
// import { InspectorImg } from '../img/inspector';
import { HouseSearch } from '../img/houseSearch';

const INSP_BOARD = '57f40236ffdeb772878b1488';
const INSP_LIST = '58b726e1975c14fae6cd2a6d';

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
      cable_company: this.insp?this.insp.cable_company:null,
      target_stress_date: this.insp?this.insp.target_stress_date:week,
      comments: this.insp?this.insp.comments:null,
      contact_id: this.insp?this.insp.contact_id:this.props.session.contact_id,
      inspector: this.insp?this.insp.inspector:this.props.session.full_name,
      deleteTrue: false,
      reasons: this.insp.hasOwnProperty('reasons')?this.insp.reasons:[],
      org_type: 'CABLE',
      updateTrello: true,
      trello_board: null,
      trello_board_id: null,
      trello_list: null,
      trello_list_id: null,
      trello_list_lookup:[],
      trello_card_id: this.insp?this.insp.trello_card_id:null,
      trello_checkitem: null,
      trello_checkitem_id: this.insp?this.insp.trello_checkitem_id:null,
      trello_info: null,
      project_trello_card_id: this.insp?this.insp.project_trello_card_id:null,
      project_trello_info: null,
      projectTrelloCardStatus: null,
      trelloCreateCard: 'N',
    };

    this.initState = {...this.state};

    this.VIEW = 'inspection_dialog';

  }

  componentDidMount = () => {
    // console.log('revision CDM: local state', this.state, 'parent state:', this.props.parentState);
    let board_name = null;
    let board_id = null;
    let list_name = null;
    let list_id = null;
    let checkitem = null;
    let listLookup = []
    this.props.loadLocalView(this.VIEW);
    if (this.state.trello_card_id) {
      getTrelloCard(this.state.trello_card_id)
      .then((card)=>{
        if (card.hasOwnProperty('statusCode') && card.statusCode !== 200) {throw card};
        board_name = card.board.name;
        board_id = card.board.id;
        list_name = card.list.name;
        list_id = card.list.id;
        listLookup = this.props.trelloInfo.find(b=>b.id===board_id).lists.filter(l=>!l.closed).map(l=>{ return {name:l.name,code:l.id} });
        const card_id = card.id;  // the id in the database may be the short link.  Getting the actual id.
        let item = null;
        // if (this.state.trello_checkitem_id) {
        //   // console.info('find checklist item');
        //   const found = card.checklists.some(ch=>{
        //     item = ch.checkItems.find(chi=>chi.id === this.state.trello_checkitem_id)
        //     // console.info('checking items',item);
        //     return item?true:false;
        //   })
        // }
        // console.info('here is the item', item);
        checkitem = item?item.name:null;
        this.setState( {trello_board: board_name, trello_board_id: board_id
          , trello_list: list_name, trello_list_id: list_id, trello_list_lookup: listLookup
          , trello_checkitem: checkitem, trello_info:card, trello_card_id: card_id} )
        })
      .catch(err=> console.log('Error getting trello card info', err))
    } else {
      const board = this.props.trelloInfo.find(b=>b.id===INSP_BOARD);
      board_name = board.name;
      list_name = board.lists.find(l=>l.id===INSP_LIST).name;
      listLookup = this.props.trelloInfo.find(b=>b.id===INSP_BOARD).lists.filter(l=>!l.closed).map(l=>{ return {name:l.name,code:l.id} });
      this.setState( {trello_board: board_name, trello_board_id: INSP_BOARD
        , trello_list: list_name, trello_list_id: INSP_LIST, trello_list_lookup: listLookup} );
    }
    if (this.state.project_trello_card_id) {
      getTrelloCard(this.state.project_trello_card_id)
      .then((card)=>{
        if (card.hasOwnProperty('statusCode') && card.statusCode !== 200) {throw card};
        this.setState( {project_trello_info:card, projectTrelloCardStatus:card.closed?'Archived':'Active', trelloCreateCard:card.closed?'N':'Y'} )
        })
      .catch(err=>{
        this.setState( {projectTrelloCardStatus:'Could not find'} )
        // console.log('Error getting trello card info', err);
      })
    }
    // project trello card missing / not created
    else if (this.state.project_id) {
      this.setState( {projectTrelloCardStatus:'Missing / Not Created'} )
      // console.log('Project trello card missing');
    }

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
        if (value) {
          // console.log('Address was entered', value);
          if (value.project_trello_card_id) {
            // console.log('getting ready to fetch');
            getTrelloCard(value.project_trello_card_id)
            .then(card=>{
                if (card.hasOwnProperty('statusCode') && card.statusCode !== 200) {throw card};
                // console.log('trello info', card);
                this.setState( {project_id: value.project_id, address1: value.name
                  , revision: value.revision, scope_list: value.scope, scope_id: null, scope: null, scope_name: null
                  , inspection_type: null, inspection_reason: null, deep_beam: null
                  , barrier_beam: null, reinspection: null, rain_reinspection: null, upper_slab: null
                  , lower_slab: null, ret_wall_on_slab: null, project_trello_card_id: value.project_trello_card_id
                  , project_trello_info: card, projectTrelloCardStatus:card.closed?'Archived':'Active', trelloCreateCard:card.closed?'N':'Y'} );
                // console.log('this line is after setState')
              })  // then
            .catch(err=>{
              this.setState( {project_id: value.project_id, address1: value.name
                , revision: value.revision, scope_list: value.scope, scope_id: null, scope: null, scope_name: null
                , inspection_type: null, inspection_reason: null, deep_beam: null
                , barrier_beam: null, reinspection: null, rain_reinspection: null, upper_slab: null
                , lower_slab: null, ret_wall_on_slab: null
                , project_trello_card_id: value.project_trello_card_id, project_trello_info: null
                , projectTrelloCardStatus:'Unable to find', trelloCreateCard:'N'} )

              // console.log('Error getting trello card info', err);
            });
          }  // if statement
          // project trello card was blank
          else {
            this.setState( {project_id: value.project_id, address1: value.name
              , revision: value.revision, scope_list: value.scope, scope_id: null, scope: null, scope_name: null
              , inspection_type: null, inspection_reason: null, deep_beam: null
              , barrier_beam: null, reinspection: null, rain_reinspection: null, upper_slab: null
              , lower_slab: null, ret_wall_on_slab: null
              , project_trello_card_id: value.project_trello_card_id, project_trello_info: null
              , projectTrelloCardStatus:'Missing / Not Created', trelloCreateCard:'N'} )

            // console.log('project trello info blank');
          }
        } else {
          this.setState( {project_id: null, address1: null
            , revision: null, scope_list: [], scope_id: null, scope: null, scope_name: null
            , inspection_type: null, inspection_reason: null, deep_beam: null
            , barrier_beam: null, reinspection: null, rain_reinspection: null, upper_slab: null
            , lower_slab: null, ret_wall_on_slab: null
            , project_trello_card_id: null, project_trello_info: null
            , projectTrelloCardStatus:null, trelloCreateCard:'N'} );
        }
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
      case 'trello_board':
        if (value) {
          const listLookup = value.lists.filter(l=>!l.closed).map(l=>{ return {name:l.name,code:l.id} });
          this.setState( {trello_board: value.name, trello_board_id: value.code
            , trello_list: null, trello_list_id: null, trello_list_lookup: listLookup} );
        } else {
          this.setState( {trello_board: null, trello_board_id: null
            , trello_list: null, trello_list_id: null, trello_list_lookup: []} );
        }
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
    this.handleClose();
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
    let reasons = [...this.state.reasons];
    // console.log('deleteReason', order, reasons);
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
        yesFunc: ()=>{
          this.props.deleteInspection(this.state.id);
          this.handleClose();
        },
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

    // OK, no preferences set.  Just return the field group fields.
    if (!fields) {
      return group.children;
    }

    // field preferences set!
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
        dialogWidth={'lg'}
        dialogHeight={'95%'}
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
