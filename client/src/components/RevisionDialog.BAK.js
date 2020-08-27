import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withWidth } from "@material-ui/core";
import CeDialog from './ceDialog';

import { DialogDefaultFG, RevUpdateFG, RevHistoryFG } from './ceFieldGroup';

import designRev from '../img/designrev-black.svg';
import designRevWhite from '../img/designrev-white.svg';

import IconButton from '@material-ui/core/IconButton';
import addIcon from '../img/add1.svg';
import addIconWhite from '../img/add1-white.svg';
import UndoIcon from '@material-ui/icons/Undo';

import Tooltip from '@material-ui/core/Tooltip';

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


class RevisionDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderScreen: false,
      checkboxCopyDesc: true,
      createRev: true,
    };

    this.initState = {...this.state};

    this.VIEW = 'revision_revise';

  }

  componentDidMount = () => {
    // console.log('revision CDM: local state', this.state, 'parent state:', this.props.parentState);
    if (this.props.parentState.revision === this.props.parentState.orig_rev) {  // no pending revision change.
      const nextRev = this.nextRev(this.props.parentState.revision);
      // Tried to copy parent state with spread operator.  Ran into deep copy
      // problems.  The parent scope was getting mutated with changes with
      // the dialog state.  Resorted to this below.

      // YEA FIGURED THIS OUT.  When I map on array, I must make a NEW copy of each object
      // That is reason I am using spread operator on s below.
      const tempScope = this.props.parentState.scope.map(s => { return {...s, revision: nextRev, revision_desc: null} });

      this.setState(
        { job_number: this.props.parentState.job_number,
          revision: nextRev,
          revision_desc: null,
          revision_reason: null,
          revision_resp: null,
          revision_price: null,
          designer: null,
          designer_id: null,
          scope: tempScope
        }
      );
    } else {  // ok user has already gone into revision screen and set next revision.  Pulling up same values.
      this.setState(
        { job_number: this.props.parentState.job_number,
          revision: this.props.parentState.revision,
          revision_desc: this.props.parentState.revision_desc,
          revision_reason: this.props.parentState.revision_reason,
          revision_resp: this.props.parentState.revision_resp,
          revision_price: this.props.parentState.revision_price,
          designer: this.props.parentState.designer,
          designer_id: this.props.parentState.designer_id,
          scope: this.props.parentState.scope
        }
      );
    }

    this.props.loadLocalView(this.VIEW);
    this.props.loadProjectHistory(this.props.parentState.id);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log('in getDerivedStateFromProps');
    const { localView, projectHistory } = nextProps;
    // console.log('localView', localView, projectHistory);
    // console.log('prevState', prevState);
    // If the views object is populated, activate the screen render toggle.
    if (localView.constructor === Object && Object.keys(localView).length !== 0 &&
        projectHistory.length > 0)
    // if (localView.constructor === Object && Object.keys(localView).length !== 0)
    {
      return {renderScreen: true };
    }
    return null;
  }

  image = () => {
    const { classes, theme } = this.props;
    return (
        <img src={theme.palette.secondary.contrastText === '#fff'?designRevWhite:designRev} alt={'Revision Update'} className={`${classes.image} ${classes.imageTitle}`} />
    )
  }

  actions = () => {
    const { classes, theme } = this.props;
    // Note: The default action will be to create rev.  When you open Rev
    // dialog, it will default the new rev.  So, the icon to display
    // will be the opposite.  Undo icon to switch back
    if (this.props.parentState.revision !== this.props.parentState.orig_rev) {
      return (
        <Tooltip title={'New revision in progress.  Refresh record in Project Entry to reinstate old revision'} aria-label='Refresh record'>
        <IconButton aria-label='Create/Update Rev'>
          <UndoIcon className={classes.image} />
        </IconButton>
        </Tooltip>
      )
    }
    return (
      <Tooltip title={this.state.createRev?'Revise Current Revision':'Create New Revision'} aria-label='Create/Update Rev'>
      <IconButton aria-label='Create/Update Rev'  onClick={this.createUndoRev}>
        {this.state.createRev?  <UndoIcon className={classes.image}/> :
          <img src={theme.palette.secondary.contrastText === '#fff'? addIconWhite:addIcon} alt={'Add Rev'} className={classes.image} />
        }
      </IconButton>
      </Tooltip>
    )
  }

  createUndoRev = () => {

    // Ok, so state we're in is to Create a new rev.  User clicked on the
    // Undo icon.  Remember the icon displayed is the reverse action of the
    // current action we're in.  We need to set revision info back to
    // the existing Rev for modification.
    if (this.state.createRev) {
      // console.log('createUndo: reverting',this.state, this.props.parentState);
      this.handleChange({
        revision: this.props.parentState.revision,
        revision_desc: this.props.parentState.revision_desc,
        scope: [...this.props.parentState.scope],
        createRev: !this.state.createRev,
      }, true);

    } else {  // the current action we're in is updating the current rev.  Wish to create a new rev instead.
      // console.log('createUndo: new rev', this.state, this.props.parentState);
      const nextRev = this.nextRev(this.props.parentState.revision);
      // Initially couldn't use map for some reason.  changes would merge immediately
      // with the parent state.  Really annoying.
      // YEA FIGURED THIS OUT.  When I map on array, I must make a NEW copy of each object
      // That is reason I am using spread operator on s below.
      const tempScope = this.state.scope.map(s => { return {...s, revision: nextRev, revision_desc: null} });

      // console.log('tempScope, state, parent', tempScope, this.state, this.props.parentState);
      this.handleChange(
        { revision: nextRev,
          revision_desc: null,
          scope: tempScope,
          createRev: !this.state.createRev
        }
      );
    }

  }

  handleChange = (updatedValues, overrideCascade = false) => {
    // console.log('updatedValues', updatedValues);
    // const { checkboxCopyDesc } = this.state;

    if (!overrideCascade && this.state.checkboxCopyDesc) {
      // console.log('handleChange: updating scope desc');
      // const tempScope = this.state.scope.map((s,i)=>{
      //   s.revision_desc = updatedValues.revision_desc;
      //   return s
      // });
      const tempScope = this.state.scope.map(s => {
        return {...s,
          revision: 'revision' in updatedValues?updatedValues.revision:s.revision,
          revision_reason: 'revision_reason' in updatedValues?updatedValues.revision_reason:s.revision_reason,
          revision_resp: 'revision_resp' in updatedValues?updatedValues.revision_resp:s.revision_resp,
          revision_desc: 'revision_desc' in updatedValues?updatedValues.revision_desc:s.revision_desc,
          designer: 'designer_id' in updatedValues?updatedValues.designer:s.designer,
          designer_id: 'designer_id' in updatedValues?updatedValues.designer_id:s.designer_id
        }
      });



      updatedValues.scope = tempScope;
    }
    this.setState(updatedValues);
  }

  // handleClose... handles closing the dialog box.  Uses props.updateParentState
  // to update the state of the calling module, particularly the close toggle
  handleClose = () => {
    this.setState(this.initState);
    this.props.updateParentState({ openRevDialog: false });
    this.props.loadLocalView('', true);
    this.props.loadProjectHistory(0, true);
  }

  // handleSubmit... the parent state was used to seed local state.
  // Now using local state to update the parent state.
  handleSubmit = () => {
    // console.log('handleSubmit');
    if (this.state.revision_desc) {
      this.props.updateParentState(this.state);
    } else {
      this.props.loadMessage(
        { ok:false,
          status: 'Missing Data',
          statusText: "Please fill in description of revision"
        }, "ERROR");
    }
  }

  nextRev = (rev = '') => {
    if (!rev) {
        return 'A';
    }
    let revArr = rev.split('');
    if (revArr[revArr.length - 1] === 'Z') {
      return this.nextRev(rev.substring(0, revArr.length - 1)) + 'A';
    } else {
      return rev.substring(0, revArr.length - 1) +
        String.fromCharCode(revArr[revArr.length - 1].charCodeAt(0) + 1);
    }
  }

  render() {
    // Test to make sure we can render Screen.  Only set to true when
    // currentProject and currentViews are populated.
    // If currentProject is empty, go back to Main menu.
    if (!this.state.renderScreen) {
      // console.log('loading...', this.state, this.props.parentState);
      return null;
    }

    const { projectHistory } = this.props;
    console.log('Rev Dialog Render:', 'state:', this.state);

    // console.log('Rev Dialog Render:', 'state:', this.state, 'currentProject:', currentProject, 'currentViews:', currentViews, 'find:', search.findResults, 'menu:', currentMenu);
    // console.log('Rev Dialog Render:', 'dialog state', this.state, 'parent state', this.props.parentState, 'History', projectHistory);

    return (
      <CeDialog
        open={true}
        title={`Manage Revision (${this.state.job_number})`}
        image={this.image()}
        // handleClose flips toggle on Parent State dialog toggle.
        handleClose={this.handleClose}
        // handleSubmit takes dialog State and passes it back to Parent State.
        handleSubmit={this.handleSubmit}
        actions={this.actions()}
      >
        {this.props.localView.children.map((group, id)=>{
          switch(group.name) {
            case 'revision_update':
              return (<RevUpdateFG
                      key={id}
                      // key={child.rship_id}
                      fieldGroup = {group}
                      // toggleScopeDialog={()=>{}}
                      // removeScope={false}
                      // props below manage state within dialog only
                      dialogState={this.state}
                      updateState={this.handleChange}
                    />)
              // break;
            case 'revision_history':
              return (<RevHistoryFG
                      key={id}
                      fieldGroup = {group}
                      history={projectHistory}
                    />)
              // break;
            default:
              return (<DialogDefaultFG
                      key={id}
                      // key={child.rship_id}
                      fieldGroup = {group}
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


export default withWidth()(withStyles(styles, { withTheme: true })(RevisionDialog));
