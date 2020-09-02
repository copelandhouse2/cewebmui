import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withWidth } from "@material-ui/core";
import CeDialog from './ceDialog';

import { DialogDefaultFG, RevUpdateFG, RevHistoryFG, MaterialTabularFG } from './ceFieldGroup';

// import designRev from '../img/designrev-black.svg';
// import designRevWhite from '../img/designrev-white.svg';
import { DesignRevSvg } from '../img/revise';

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

const date = (dayAdj=0) => {
  let returnDate = new Date();
  returnDate.setDate(returnDate.getDate()+dayAdj);
  const theMonth = returnDate.getMonth()+1 < 10? `0${returnDate.getMonth()+1}` : `${returnDate.getMonth()+1}`;
  const theDay = returnDate.getDate() < 10? `0${returnDate.getDate()}` : `${returnDate.getDate()}`;

  const theHour = returnDate.getHours() < 10? `0${returnDate.getHours()}` : `${returnDate.getHours()}`;
  const theMin = returnDate.getMinutes() < 10? `0${returnDate.getMinutes()}` : `${returnDate.getMinutes()}`;
  const theSec = returnDate.getSeconds() < 10? `0${returnDate.getSeconds()}` : `${returnDate.getSeconds()}`;
  return `${returnDate.getFullYear()}-${theMonth}-${theDay}T${theHour}:${theMin}:${theSec}`;
  // return returnDate.toLocaleString();
}

const getNextRev = (rev = '') => {
  if (!rev) {
      return 'A';
  }
  let revArr = rev.split('');
  if (revArr[revArr.length - 1] === 'Z') {
    return getNextRev(rev.substring(0, revArr.length - 1)) + 'A';
  } else {
    return rev.substring(0, revArr.length - 1) +
      String.fromCharCode(revArr[revArr.length - 1].charCodeAt(0) + 1);
  }
}

class RevisionDialog extends Component {
  constructor(props) {
    super(props);

    const today = date();
    // const today = new Date();

    let scopeLookup = this.props.parentState.scope.map(s=> {
      if (s.id !== null) {
        return {code: s.id,name: s.name}
      }
    });
    scopeLookup.unshift({code: -1, name: 'Project'});
    const altLookup = [
      { name: 'scope',
        name_id: 'scope_id',
        lookup_list: scopeLookup
      }
    ];

    this.state = {
        id: null,
        job_number: this.props.parentState.job_number,
        project_id: this.props.parentState.id,
        scope: null,
        scope_id: null,
        curRevs: this.props.parentState.revisions,  // current revision list.
        revision: null,
        revision_desc: null,
        revision_reason: null,
        revision_reason_code: null,
        revision_resp: null,
        revision_resp_code: null,
        revision_price: null,
        designer: null,     // contact with designer flag true.
        designer_id: null,  // will be contact id
        rev_date: today,
        altLookups: altLookup,
        created_by: this.props.session.id,
        last_updated_by: this.props.session.id,
        getNextRev: getNextRev,
        // selectedIndexes: []
      };

    this.initState = {...this.state};

    this.VIEW = 'revision_revise';

  }

  componentDidMount = () => {
    // console.log('revision CDM: local state', this.state, 'parent state:', this.props.parentState);

    this.props.loadLocalView(this.VIEW);
    this.props.loadProjectRevisions(this.props.parentState.id);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log('in getDerivedStateFromProps');
    const { localView, projectRevisions } = nextProps;
    // console.log('localView', localView, projectHistory);
    // console.log('prevState', prevState);
    // If the views object is populated, activate the screen render toggle.
    if (!prevState.renderScreen && localView.constructor === Object && Object.keys(localView).length !== 0 &&
    // if (localView.constructor === Object && Object.keys(localView).length !== 0 &&
        (prevState.curRevs.length === 0 || projectRevisions.length > 0))
    // if (localView.constructor === Object && Object.keys(localView).length !== 0)
    {
      // projectRevisions is sorted with latest revision first.

      const nextRev = prevState.getNextRev(projectRevisions.length>0?projectRevisions[0].revision:null);
      // return {renderScreen: true, revision: nextRev, revisions: projectRevisions };
      return {renderScreen: true, revision: nextRev };

    }
    return null;
  }

  image = () => {
    const { classes, theme } = this.props;
    {/*<img src={theme.palette.secondary.contrastText === '#fff'?designRevWhite:designRev} alt={'Revision Update'} className={`${classes.image} ${classes.imageTitle}`} />*/}
    return (
      <div alt={'Revision Update'} className={classes.imageTitle}>
        <DesignRevSvg size={30} color={theme.palette.secondary.contrastText}  />
      </div>
    )
  }

  actions = () => {
    // const { classes, theme } = this.props;
    return null;  // skip the icon for now.

  }

  handleChange = (updatedValues, overrideCascade = false) => {
    // console.log('updatedValues', updatedValues);

    this.setState(updatedValues);
  }

  handleClear = (incrementRev=false) => {
    const thisRev = incrementRev? this.state.revision :
      this.props.projectRevisions.length>0? this.props.projectRevisions[0].revision :
      null;
    this.initState.revision = getNextRev(thisRev);
    this.setState(this.initState);
  }

  // handles new (this.state) as well as existing rows.  Can handle an array.
  handleSave = (rowArr) => {
    // console.log('handleSave', rowArr);

    let noError = true;
    let revisions = [];
    let incrementRev = false;
    rowArr.forEach(row => {
      if (row.id === null) incrementRev = true;
      if (!row.scope && !row.scope_id) {
        this.props.loadMessage(
          { ok:false,
            status: 'Missing Data',
            statusText: `Please fill in scope for Rev: ${row.revision}
            , Scope: ${row.scope}, Reason: ${row.revision_reason}, Resp: ${row.revision_resp}`
          }, "ERROR");
        noError = false;
      } else if (!row.revision) {
          this.props.loadMessage(
            { ok:false,
              status: 'Missing Data',
              statusText: `Please fill in a revision for Rev: ${row.revision}
              , Scope: ${row.scope}, Reason: ${row.revision_reason}, Resp: ${row.revision_resp}`
            }, "ERROR");
          noError = false;
      // } else if (!row.revision_reason) {
      //   this.props.loadMessage(
      //     { ok:false,
      //       status: 'Missing Data',
      //       statusText: `Please fill in reason for Rev: ${row.revision}
      //       , Scope: ${row.scope}, Reason: ${row.revision_reason}, Resp: ${row.revision_resp}`
      //     }, "ERROR");
      //   noError = false;
      // } else if (!row.revision_resp) {
      //   this.props.loadMessage(
      //     { ok:false,
      //       status: 'Missing Data',
      //       statusText: `Please fill in responsibility for Rev: ${row.revision}
      //       , Scope: ${row.scope}, Reason: ${row.revision_reason}, Resp: ${row.revision_resp}`
      //     }, "ERROR");
      //   noError = false;
      } else {
        revisions.push( {
          change: row.id?'change':'new',
          id: row.id,
          job_number: row.job_number,
          project_id: row.project_id,
          scope_id: row.scope_id,
          scope: row.scope,
          revision: row.revision,
          revision_desc: row.revision_desc,
          revision_reason: row.revision_reason,
          revision_reason_code: row.revision_reason_code,
          revision_resp: row.revision_resp,
          revision_resp_code: row.revision_resp_code,
          revision_price: row.revision_price,
          designer: row.designer,
          designer_id: row.designer_id,
          rev_date: row.rev_date,
        } );
      }

      if (noError) {
        // console.log('Saving...');
        this.props.saveRevisions(this.state.project_id, revisions);
        this.handleClear(incrementRev);
      }
    })

  }  // handleSave

  // handleClose... handles closing the dialog box.  Uses props.updateParentState
  // to update the state of the calling module, particularly the close toggle
  handleClose = () => {
    this.setState(this.initState);
    let passedRev = null;
    let passedRevDesc = null;

    if (this.props.projectRevisions.length > 0) {
      passedRev = this.props.projectRevisions[0].revision;
      passedRevDesc = this.props.projectRevisions[0].revision_desc;
    };

    this.props.updateParentState({ openRevDialog: false
      , revision: passedRev, revision_desc: passedRevDesc, revisions: this.props.projectRevisions });
    this.props.loadLocalView('', true);
    this.props.loadProjectRevisions(0, true);
  }

  // Delete a revision.
  handleDelete = (row) => {
    // console.log('revisionDialog handleDelete', this.props.projectRevisions[row]);
    this.props.deleteRevision(this.props.projectRevisions[row].project_id, this.props.projectRevisions[row].id);
  }

  render() {
    // Test to make sure we can render Screen.  Only set to true when
    // currentProject and currentViews are populated.
    // If currentProject is empty, go back to Main menu.
    if (!this.state.renderScreen) {
      // console.log('loading...', this.state, this.props.parentState);
      return null;
    }

    // const { projectHistory } = this.props;
    // console.log('Rev Dialog Render:', 'state:', this.state, 'currentProject:', currentProject, 'currentViews:', currentViews, 'find:', search.findResults, 'menu:', currentMenu);
    // console.log('Rev Dialog Render:', 'dialog state', this.state);
    // console.log('Rev Dialog Render:', 'parent state', this.props.parentState);
    // console.log('Rev Dialog Render:', 'init state', this.initState);

    return (
      <CeDialog
        open={true}
        title={`  Manage Revision (${this.state.job_number})`}
        image={this.image()}
        // handleClose flips toggle on Parent State dialog toggle.
        handleClose={this.handleClose}
        // No handle submit.
        handleSubmit={false}
        actions={this.actions()}
        dialogWidth={'xl'}
        dialogHeight={500}
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
                      parentState={this.state}
                      updateState={this.handleChange}
                      clearState={this.handleClear}
                      saveState={this.handleSave}
                    />)
              // break;
            case 'revision_history':
              return(<MaterialTabularFG
                      key={id}
                      fieldGroup = {group}
                      parentState = {this.state}
                      // data = {this.state.revisions}
                      data = {this.props.projectRevisions}
                      // updateState = {this.updateState}
                      handleSave={this.handleSave}
                      handleDelete={this.handleDelete}
                    />)
              // return null;
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
