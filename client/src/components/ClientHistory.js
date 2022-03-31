import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withWidth } from "@material-ui/core";
import { Link } from "react-router-dom";
import _ from 'lodash';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Edit from '@material-ui/icons/Edit';
import Reply from '@material-ui/icons/Reply';
import Delete from '@material-ui/icons/Delete';
import Save from '@material-ui/icons/Save';

import { Field2Container } from '../containers/ceFieldContainer';

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  linkStyle: {
    textDecoration: 'none'
  },
  listItem: {
    // paddingLeft: 0,
    paddingRight: 0,
  },
  bottom: {
    marginBottom: 20
  },
  grid: {
    maxWidth:'100%',
  }
});

class ClientHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      parent_id: null,
      table_id: this.props.currentClient.id,
      client: this.props.currentClient.client,
      table:'clients',
      comments: null,
      comments_history: this.props.currentClient.comments_history,
      change:false,
      edit:false,
      reply: false,
      created_by: this.props.session.id,
      last_updated_by: this.props.session.id,
    };

    this.initState = {};

  }

  componentDidMount = () => {
    // console.log('*** CDM Client History', this.state);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { currentClient, clientAck, session } = nextProps;
    // console.log('*** gDSFP History State, currentClient', prevState, currentClient);

    if (currentClient.change === 'updated') {
      // console.log('*** gDSFP History: currentClient was updated',currentClient);

      clientAck();
      return {
        id: null,
        parent_id: null,
        table_id: currentClient.id,
        table:'clients',
        client: currentClient.client,
        comments: null,
        comments_history: currentClient.comments_history,
        created_by: session.id,
        last_updated_by: session.id,
        change: false,
        edit: false,
        reply: false,
      }
    }

    return null;
  }

  updateState = (updatedValues) => {
    // console.log('*** Client History updateState', updatedValues, this.state);
    if ('saveValue' in updatedValues) {  // user just clicked in field.
      this.setState({...updatedValues});
    } else {  // this is a true change.
      const change = updatedValues.comments?true:false;
      this.setState({...updatedValues,change:change});
      this.props.parentState({change:change});  // this updates parent State.
    }
  }

  handleSave = () => {
    // console.log('*** Client handle Save', this.state);
    this.props.saveClientComment([this.state]);
    // this.setState({change:false});
  }

  handleEdit = (c) => {
    // console.log('*** Client handle Edit', c);
    // this.props.saveClientComment([this.state]);
    if (this.state.edit) {
      this.setState({id:null, parent_id:null, comments:null, edit:false});
    } else {
      this.setState({id:c.id, parent_id:c.parent_id, comments:c.comments,edit:true,reply:false});
    }
  }

  handleDelete = (c) => {
    // console.log('*** Client handle Delete', c);
    c.change = 'delete';
    this.props.ynDialog(
      {
        ok: false,
        title: 'Delete comment?',
        content: `Are you sure?`,
        yesFunc: ()=>this.props.saveClientComment([c]),
        noFunc: false
      }
    )
    // console.log('here is the comment to delete', c);
    // this.setState({change:false});
  }

  handleReply = (c) => {
    // console.log('*** Client handle Reply', c);
    // this.props.deleteClientComment(c);
    if (this.state.reply) {
      this.setState({ id:null, parent_id:null, comments:null,reply:false });
    } else {
      this.setState({ parent_id:c.id,edit:false,reply:true });
    }  }

  alertOfChange = (e) => {
    // console.log('alerting of change', e);
    const currentTarget = e.currentTarget;

    // Check the newly focused element in the next tick of the event loop
    setTimeout(() => {
      // Check if the new activeElement is a child of the original container
      if (!currentTarget.contains(document.activeElement)) {
       // You can invoke a callback or add custom logic here
       // onBlur();
       if (this.state.change) {
         // console.log('There are changes');
         this.props.ynDialog(
           {
             ok: false,
             title: 'Save changes?',
             content: `Would you like to save changes to ${this.state.client}?`,
             yesFunc: this.handleSave,
             noFunc: false
           }
         )
         // return;
       }
     }
    }, 0);

    // if (this.state.change) {
    //   console.log('There are changes');
    //   this.props.ynDialog(
    //     {
    //       ok: false,
    //       title: 'Save changes?',
    //       content: `Would you like to save changes to ${this.state.client}?`,
    //       yesFunc: this.handleSave,
    //       noFunc: false
    //     }
    //   )
    //   // return;
    // }
  }

  endAdornment = () => {
    return (
      <IconButton
        aria-label='Save'
        color='secondary'
        disabled={this.state.comments?false:true}
        onClick={this.handleSave}
      >
        <Save fontSize='large' />
      </IconButton>
    )
  }

  ceListItem = (com, id) => {
    // console.log('ceListItem', com, id);
    const { fGroup, classes, theme } = this.props;

    const fgCommentHistory = fGroup.children.find(field=> field.name === 'comments_history');
    const fComment = fGroup.children.find(field=> field.name === 'comments');

    const fHistoryInitials = fgCommentHistory.children.find(field=> field.name === 'initials');
    const fHistoryFirstName = fgCommentHistory.children.find(field=> field.name === 'first_name');
    const fHistoryComment = fgCommentHistory.children.find(field=> field.name === 'comments');
    const fHistoryCDate = fgCommentHistory.children.find(field=> field.name === 'creation_date');

    const date = new Date(com[fHistoryCDate.name]);

    return (
      <ListItem key={id} divider={true} className={classes.listItem}>
        <Grid container alignItems='flex-start' justify='flex-start' spacing={8}>

          <Grid item>
            <Typography align='center' style={{fontWeight:'bold',paddingTop:8,height:36,width:36
              ,backgroundColor:theme.palette.secondary.main,color:theme.palette.secondary.contrastText, borderRadius:'50%'}}>
              {com[fHistoryInitials.name]}
            </Typography>
          </Grid>

          <Grid item container xs={11} className={`${classes.grow} ${classes.grid}`}>
            <Grid item className={classes.grow}>
              <Typography style={{fontWeight:'bold'}}>
                {com[fHistoryFirstName.name]}
              </Typography>
            </Grid>
            <Grid item >
              <Typography>
                {date.toLocaleString('en-US',{weekday:'short',month:'short',day:'numeric',year:'numeric',hour:'numeric',minute:'numeric',hour12:true})}
              </Typography>
            </Grid>

            <Grid item xs={12} style={{marginTop:10}}>
              {this.state.edit && this.state.id === com.id?
              <Field2Container
                key={fComment.id}
                field = {fComment}
                state = {this.state}
                updateState = {this.updateState}
                endAdornment = {this.endAdornment}
                // handleChangeCustomized = {this.handleChangeCustomized}
              />
              :
              <Typography style={{wordWrap:'break-word', backgroundColor:'white',border:'1px solid lightgray',borderRadius:4,padding:4}}>
                {com[fHistoryComment.name]}
              </Typography>
              }
            </Grid>
            <Grid item xs={12}>
              <IconButton color='secondary' aria-label='Reply' style={{padding:6}}
                onClick={()=>this.handleReply(com)}
              >
                <Reply fontSize='small' />
              </IconButton>
              {com.created_by === this.props.session.id && com.children.length === 0 &&
              <IconButton color='secondary' aria-label='Edit' style={{padding:6}}
                onClick={()=>this.handleEdit(com)}
              >
                <Edit fontSize='small' />
              </IconButton>
              }
              {com.created_by === this.props.session.id && com.children.length === 0 &&
              <IconButton color='secondary' aria-label='Delete' style={{padding:6}}
                onClick={()=>this.handleDelete(com)}
              >
                <Delete fontSize='small' />
              </IconButton>
              }
            </Grid>
            {this.state.reply && this.state.parent_id === com.id &&
              <Grid item xs={12} style={{marginTop:10,marginBottom:10}}>
                <Field2Container
                  key={fComment.id}
                  field = {fComment}
                  state = {this.state}
                  updateState = {this.updateState}
                  endAdornment = {this.endAdornment}
                  // handleChangeCustomized = {this.handleChangeCustomized}
                />
              </Grid>
            }
            {com.children.length>0 &&
              com.children.map((c_com, c_id) => {
                return this.ceReplyListItem(c_com, c_id);
              })
            }
          </Grid>
        </Grid>
      </ListItem>
    )
  }

  ceReplyListItem = (com, id) => {
    // console.log('ceListItem', com, id);
    const { fGroup, classes, theme } = this.props;

    const fgCommentHistory = fGroup.children.find(field=> field.name === 'comments_history');
    const fComment = fGroup.children.find(field=> field.name === 'comments');

    const fHistoryInitials = fgCommentHistory.children.find(field=> field.name === 'initials');
    const fHistoryFirstName = fgCommentHistory.children.find(field=> field.name === 'first_name');
    const fHistoryComment = fgCommentHistory.children.find(field=> field.name === 'comments');
    const fHistoryCDate = fgCommentHistory.children.find(field=> field.name === 'creation_date');

    const date = new Date(com[fHistoryCDate.name]);

    return (
        <Grid key={id} container alignItems='flex-start' justify='flex-start' spacing={8}>

          <Grid item>
            <Typography align='center' style={{fontWeight:'bold',paddingTop:8,height:36,width:36
              ,backgroundColor:theme.palette.secondary.main,color:theme.palette.secondary.contrastText, borderRadius:'50%'}}>
              {com[fHistoryInitials.name]}
            </Typography>
          </Grid>

          <Grid item container xs={11} className={`${classes.grow} ${classes.grid}`}>
            <Grid item className={classes.grow}>
              <Typography style={{fontWeight:'bold'}}>
                {com[fHistoryFirstName.name]}
              </Typography>
            </Grid>
            <Grid item >
              <Typography>
                {date.toLocaleString('en-US',{weekday:'short',month:'short',day:'numeric',year:'numeric',hour:'numeric',minute:'numeric',hour12:true})}
              </Typography>
            </Grid>

            <Grid item xs={12} style={{marginTop:10}}>
              {this.state.edit && this.state.id === com.id?
              <Field2Container
                key={fComment.id}
                field = {fComment}
                state = {this.state}
                updateState = {this.updateState}
                endAdornment = {this.endAdornment}
                // handleChangeCustomized = {this.handleChangeCustomized}
              />
              :
              <Typography style={{wordWrap:'break-word', backgroundColor:'white',border:'1px solid lightgray',borderRadius:4,padding:4}}>
                {com[fHistoryComment.name]}
              </Typography>
              }
            </Grid>
            <Grid item xs={12}>
              <IconButton color='secondary' aria-label='Reply' style={{padding:6}}
                onClick={()=>this.handleReply(com)}
              >
                <Reply fontSize='small' />
              </IconButton>
              {com.created_by === this.props.session.id && com.children.length === 0 &&
              <IconButton color='secondary' aria-label='Edit' style={{padding:6}}
                onClick={()=>this.handleEdit(com)}
              >
                <Edit fontSize='small' />
              </IconButton>
              }
              {com.created_by === this.props.session.id && com.children.length === 0 &&
              <IconButton color='secondary' aria-label='Delete' style={{padding:6}}
                onClick={()=>this.handleDelete(com)}
              >
                <Delete fontSize='small' />
              </IconButton>
              }
            </Grid>
            {this.state.reply && this.state.parent_id === com.id &&
              <Grid item xs={12} style={{marginTop:10,marginBottom:10}}>
                <Field2Container
                  key={fComment.id}
                  field = {fComment}
                  state = {this.state}
                  updateState = {this.updateState}
                  endAdornment = {this.endAdornment}
                  // handleChangeCustomized = {this.handleChangeCustomized}
                />
              </Grid>
            }
            {com.children.length>0 &&
              com.children.map((c_com, c_id) => {
                return this.ceReplyListItem(c_com, c_id);
              })
            }
          </Grid>
        </Grid>
    )
  }

  render() {
    const { fGroup, classes, theme } = this.props;

    // console.log('*** Client History Render:',
    // 'state:', this.state,
    // );
    // console.log(fieldGroup);
    // console.log('groups', fGroup);
    const fComment = fGroup.children.find(field=> field.name === 'comments');


    return (
      <Grid container spacing={24} onBlur={this.alertOfChange}>
        {!this.state.edit && !this.state.reply &&
        <Field2Container
          key={fComment.id}
          field = {fComment}
          state = {this.state}
          updateState = {this.updateState}
          endAdornment = {this.endAdornment}
          // handleChangeCustomized = {this.handleChangeCustomized}
        />
        }
        <Grid item xs={12}>
          <List dense={true}>
            {this.state.comments_history.map((com, id) => {
              return this.ceListItem(com, id);
            })}
          </List>
        </Grid>

        <Grid item className={`${classes.grow} ${classes.bottom}`}>
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
      </Grid>
    )
  }
}

export default withWidth()(withStyles(styles, { withTheme: true })(ClientHistory));
