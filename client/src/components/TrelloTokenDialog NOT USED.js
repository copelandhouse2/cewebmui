import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withWidth } from "@material-ui/core";
import CeDialog from './ceDialog';

import { DialogTrelloAuthFG, DialogDefaultFG } from './ceFieldGroup';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

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

class TrelloTokenDialog extends Component {
  constructor(props) {
    super(props);

    const today = date();
    const tomorrow = date(1,true);
    const week = date(7,true);

    // console.log('props inspections',this.props.inspections);

    this.state = {
      object: 'TRELLOKEY_DIALOG',
      renderScreen: false,
      today: today,
      created_by: this.props.session.id,
      last_updated_by: this.props.session.id,

      id: this.insp?this.insp.id:null,
      trello_token: null,
    };

    this.initState = {...this.state};

    this.VIEW = 'trello_auth';

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

    const { localView } = nextProps;

    // console.log('inspections', inspections);
    // console.log('prevState', prevState);
    // If the views object is populated, activate the screen render toggle.
    if (!prevState.renderScreen
      && localView.constructor === Object && Object.keys(localView).length !== 0
    )
    // if (localView.constructor === Object && Object.keys(localView).length !== 0)
    {
      return { renderScreen: true };

    }
    return null;
  }

  image = () => {
    const { classes, theme } = this.props;
    // <img src={theme.palette.secondary.contrastText === '#fff'?designRevWhite:designRev} alt={'Revision Update'} className={`${classes.image} ${classes.imageTitle}`} />
    return (
      <div alt={'Inspection Add Update'} className={classes.imageTitle}>
        {/*<HouseSearch size={30} color={theme.palette.secondary.contrastText}  />*/}
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
      case 'trello_token':
        value?
          this.setState( {trello_token: value.trello_token} )
            :
          this.setState( {trello_token: null} );
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
    this.props.saveTrelloToken(this.state);
  }  // handleSave

  // handleClose... handles closing the dialog box.  Uses props.updateParentState
  // to update the state of the calling module, particularly the close toggle
  handleClose = () => {
    this.props.updateParentState({ openAddDialog: false });
  }

  // Delete.
  handleDelete = () => {
    // console.log('Inspection Dialog: handleDelete', this.state);
    null;
  }

  setFields = (group) => {
    const { preferences } = this.props;
    console.log('set fields', group, preferences);

    let fields = {};
    if (preferences.user.hasOwnProperty('fields')) {
      fields = preferences.user.fields.find( pref =>
        pref.viewID === group.parent_id && pref.fgID === group.id && pref.key === this.state.findBy)
    }

    if (!fields.hasOwnProperty('value')) {
      fields = preferences.system.fields.find(pref =>
        pref.viewID === group.parent_id && pref.fgID === group.id && pref.key === this.state.findBy)
    }

    console.log('new fields', fields, group);
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
    const { session } = this.props;
    console.log('Trello Token Render:', 'session', session);
    // console.log('Inspection Dialog Render:', 'parent state', this.props.parentState);
    // console.log('Inspection Dialog Render:', 'inspections', this.props.inspections);

    return (
      <CeDialog
        open={true}
        title={`Set Trello Token for ${session.full_name}`}
        // image={this.image()}
        // handleClose flips toggle on Parent State dialog toggle.
        handleClose={this.handleClose}
        // No handle submit.
        handleSubmit={this.handleSave}
        // handleDelete={this.handleDelete}
        actions={this.actions()}
        dialogWidth={'sm'}
        dialogHeight={'800px'}
      >

      {/*<TextField
        variant='outlined'
        label='Trello Token'
        onChange={(e)=> this.handleChange({trello_token: e.target.value})}
      />*/}

        {this.props.localView.children.map((group, id)=>{

          const prefFields = this.setFields(group);
          const tGroup = Object.assign({},group,{children: prefFields});

          switch(tGroup.name) {
            case 'trello_auth_fields':
              return (<DialogTrelloAuthFG
                      key={id}
                      // key={child.rship_id}
                      fieldGroup = {tGroup}
                      fgStyles = {{marginBottom: 40}}
                      hideLabel = {true}
                      // toggleScopeDialog={()=>{}}
                      // removeScope={false}
                      // props below manage state within dialog only
                      // parentState={this.state}
                      findAction={this.findAction}
                      dialogState={this.state}
                      updateState={this.handleChange}
                      // handleChangeCustomized={this.handleChangeCustomized}
                      clearState={this.handleClear}
                      saveState={this.handleSave}
                      handleClose={this.handleClose}
                      handleSubmit={this.handleSave}
                      handleDelete={this.handleDelete}

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


export default withWidth()(withStyles(styles, { withTheme: true })(TrelloTokenDialog));
