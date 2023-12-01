import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import Fab from '@material-ui/core/Fab';
import Badge from '@material-ui/core/Badge';

import Tooltip from '@material-ui/core/Tooltip';

import Minus from '@material-ui/icons/RemoveRounded';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Field2Container } from '../containers/ceFieldContainer';

import { RevScopeFG } from './ceFieldGroup';

const btnSize = {
  sm: 24,
  md: 36,
  lg: 48,
  xl: 60,
};

const textStrength = 'main';
const styles = (theme) => ({
  content: {
    paddingTop: 20,
  },
  fab: {
    // position: 'relative',
    margin: 'auto',
    height: btnSize.md,
    width: btnSize.md,
    [theme.breakpoints.up('md')]: {
      height: btnSize.lg,
      width: btnSize.lg,
    },
    backgroundColor: theme.palette.secondary.light,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  buttonTitle: {
    // fontFamily: 'Walter Turncoat',
    color: textStrength === 'main' ? theme.palette.secondary.main : theme.palette.secondary.light,
    textAlign: 'center',
    fontSize: 10,
    // color: 'white',
    [theme.breakpoints.up('md')]: {
      fontSize: 12,
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 14,
    },
  },
  imageSrc: {
    // width: '80%',
    height: btnSize.sm,
    width: btnSize.sm,
    [theme.breakpoints.up('md')]: {
      height: btnSize.md,
      width: btnSize.md,
    },
    margin: 'auto',
  },
  buttonGroup: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 10,
    justify: 'center',
  },
  badge: {
    // top: '90%',
    // right: 40,
  },
  fabMinus: {
    position: 'absolute',
    top: 40,
    left: 20,
    width: 20,
    height: 20,
    minHeight: 0,
  },
  minus: {
    width: 20,
    height: 20,
  },
  svgFill: {
    fill: theme.palette.secondary.contrastText,
  },
  list: {
    width: 300,
  },
});

const date = (dayAdj = 0) => {
  let returnDate = new Date();
  returnDate.setDate(returnDate.getDate() + dayAdj);
  const theMonth = returnDate.getMonth() + 1 < 10 ? `0${returnDate.getMonth() + 1}` : `${returnDate.getMonth() + 1}`;
  const theDay = returnDate.getDate() < 10 ? `0${returnDate.getDate()}` : `${returnDate.getDate()}`;

  const theHour = returnDate.getHours() < 10 ? `0${returnDate.getHours()}` : `${returnDate.getHours()}`;
  const theMin = returnDate.getMinutes() < 10 ? `0${returnDate.getMinutes()}` : `${returnDate.getMinutes()}`;
  const theSec = returnDate.getSeconds() < 10 ? `0${returnDate.getSeconds()}` : `${returnDate.getSeconds()}`;
  return `${returnDate.getFullYear()}-${theMonth}-${theDay}T${theHour}:${theMin}:${theSec}`;
  // return returnDate.toLocaleString();
};

function PaperComponent(props) {
  // console.log('Paper Component props', props);
  return (
    <Draggable enableUserSelectHack={false}>
      <Paper {...props} />
    </Draggable>
  );
}

const useSvg = (svg) => {
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  return URL.createObjectURL(blob);
  // return URL.createObjectURL(`data:image/svg+xml,${svg}`)
};

const getNextRev = (rev = '') => {
  if (!rev) {
    return 'A';
  }
  let revArr = rev.split('');
  if (revArr[revArr.length - 1] === 'Z') {
    return getNextRev(rev.substring(0, revArr.length - 1)) + 'A';
  } else {
    return rev.substring(0, revArr.length - 1) + String.fromCharCode(revArr[revArr.length - 1].charCodeAt(0) + 1);
  }
};

class scopeSelection extends Component {
  constructor(props) {
    super(props);

    const today = date();
    const { parentState } = this.props;

    this.state = {
      count: {},
      scope: this.props.currentScope,
      drawer: false,

      // revision info
      includeRev: false,
      id: null,
      job_number: parentState.job_number,
      project_id: parentState.id,
      // scope: null,
      scope_id: null,
      scope_name: null,
      curRevs: parentState.revisions, // current revision list.
      revision: null,
      revision_desc: 'Additional scope requested by client',
      revision_reason: 'Additional Scope',
      revision_reason_code: 'ADDL_SCOPE',
      revision_resp: 'Client Change',
      revision_resp_code: 'CLIENT_CHG',
      revision_price: null,
      designer: null, // contact with designer flag true.
      designer_id: null, // will be contact id
      alt_billing_party: null,
      alt_billing_party_id: null,
      rev_date: today,
      // altLookups: altLookup,
      created_by: this.props.session.id,
      last_updated_by: this.props.session.id,
      // getNextRev: getNextRev,
      // emailSend: preferences.user.sendEmailDefault,
      // emailRecipients: recipients,
      // emailBody: 'Please reply with approval.',
    };
    this.REV_VIEW = 'revision_revise';
  }

  componentDidMount = () => {
    // console.log('In CDM');
    this.props.loadLocalView(this.REV_VIEW);
    // this.props.loadProjectRevisions(this.props.parentState.id);

    let scopeCount = {};
    if (this.state.scope) {
      this.state.scope.forEach((item) => {
        if (!scopeCount[item.name]) {
          scopeCount[item.name] = 0;
        }
        scopeCount[item.name]++;
      });
    }
    const nextRev = getNextRev(this.state.curRevs.length > 0 ? this.state.curRevs[0].revision : null);
    this.setState({ count: scopeCount, revision: nextRev });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log('in getDerivedStateFromProps');
    const { localView } = nextProps;
    // console.log('gDSFP', localView, prevState.curRevs);
    // console.log('prevState', prevState);
    // If the views object is populated, activate the screen render toggle.
    if (
      !prevState.renderScreen &&
      localView.constructor === Object &&
      Object.keys(localView).length !== 0
      // // if (localView.constructor === Object && Object.keys(localView).length !== 0 &&
      // (prevState.curRevs.length === 0 || projectRevisions.length > 0)
    ) {
      // if (localView.constructor === Object && Object.keys(localView).length !== 0)
      // projectRevisions is sorted with latest revision first.

      // const nextRev = prevState.getNextRev(projectRevisions.length > 0 ? projectRevisions[0].revision : null);
      // const nextRev = prevState.getNextRev(prevState.curRevs.length > 0 ? prevState.curRevs[0].revision : null);
      // return {renderScreen: true, revision: nextRev, revisions: projectRevisions };
      // return { renderScreen: true, revision: nextRev };
      return { renderScreen: true };
    }
    return null;
  }

  handleState = (change) => {
    // console.log('ceScopeSelection handleState', change);
    this.setState(change);
  };

  handleClear = () => {
    // console.log('ceScopeSelection handleClear');
  };

  handleSave = () => {
    // console.log('ceScopeSelection handleSave', this.state);
    if (this.state.project_id) {
      this.props.saveScopeRev(this.state);
      this.props.toggleScopeDialog();
      this.props.loadLocalView('', true);
    } else {
      this.props.assignScope(this.state.scope);
    }
  };

  addScope = (selected) => {
    let adjustedCount = { ...this.state.count };
    if (!adjustedCount[selected.name]) {
      adjustedCount[selected.name] = 0;
    }
    adjustedCount[selected.name]++;

    let adjustedScope = [...this.state.scope];
    const newScopeItem = { control_id: selected.control_id, name: selected.name, label: selected.label };
    adjustedScope.push(newScopeItem);
    this.setState({ count: adjustedCount, scope: adjustedScope });
  };

  removeScope = (selected) => {
    let adjustedCount = { ...this.state.count };
    if (!adjustedCount[selected.name]) {
      adjustedCount[selected.name] = 0;
    }
    adjustedCount[selected.name]--;
    let adjustedScope = [...this.state.scope];
    for (let i = this.state.scope.length - 1; i >= 0; i--) {
      if (this.state.scope[i].name === selected.name) {
        adjustedScope.splice(i, 1);
        break;
      }
    }
    this.setState({ count: adjustedCount, scope: adjustedScope });
  };

  sideList = () => {
    const revFields = this.props.localView.children.find((g) => g.name === 'revision_update').children;
    const fRev = revFields.find((field) => field.name === 'revision');

    return (
      <div className={this.props.classes.list}>
        <List>
          <ListItem>
            <ListItemText>Revision Details</ListItemText>
          </ListItem>
          <ListItem>
            <Field2Container
              key={fRev.id}
              field={fRev}
              arrID={false}
              state={this.state}
              updateState={this.handleState}
              // noGridWrap = {true}
              // props that are not used.
              loadFind={() => {}}
              searchForDups={() => {}}
              loadMessage={() => {}}
            />
          </ListItem>
          <ListItem>
            <Field2Container
              key={fRev.id}
              field={fRev}
              arrID={false}
              state={this.state}
              updateState={this.handleState}
              // noGridWrap = {true}
              // props that are not used.
              loadFind={() => {}}
              searchForDups={() => {}}
              loadMessage={() => {}}
            />
          </ListItem>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  };

  render() {
    // Test to make sure we can render Screen.  Only set to true when
    // currentProject and currentViews are populated.
    // If currentProject is empty, go back to Main menu.
    if (!this.state.renderScreen) {
      // console.log('loading...', this.state, this.props.parentState);
      return null;
    }

    const { classes, currentMenu } = this.props;
    // console.log('scope selector', 'menu',currentMenu, 'views',currentViews);
    // console.log('scope selector', 'menu',currentMenu);
    // console.log('state', this.state);
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.toggleScopeDialog}
        PaperComponent={PaperComponent}
        aria-labelledby='scope-dialog'
        maxWidth={'md'}
        fullWidth={true}>
        <DialogTitle>Adjust the Project Scope</DialogTitle>
        <DialogContent className={classes.content}>
          <Grid container justify='flex-start' alignItems='flex-start' spacing={16}>
            {currentMenu.children &&
              currentMenu.children.map((button, i) => {
                // don't load menu items and other stuff.  Only scope buttons
                // console.log('button', button.label, button.entity_type, i);
                if (button.entity_type !== 'ACTION') return null;
                // Loads scope buttons.
                return (
                  <Grid item key={button.name} xs={4} sm={3} lg={2} className={classes.buttonGroup}>
                    <Fab
                      className={classes.fab}
                      onClick={() => {
                        this.addScope(button);
                      }}>
                      <Badge badgeContent={this.state.count[button.name] || 0} color='primary' classes={{ badge: classes.badge }}>
                        <img src={useSvg(button.image)} alt={button.label} className={classes.imageSrc} />
                      </Badge>
                    </Fab>
                    <Typography variant='caption' color='secondary' className={classes.buttonTitle}>
                      {button.label}
                    </Typography>
                    {this.state.count[button.name] > 0 && (
                      <Tooltip title='Remove scope item' aria-label='Remove'>
                        <Fab
                          color='primary'
                          className={classes.fabMinus}
                          onClick={() => {
                            this.removeScope(button);
                          }}
                          // style={{ left: 30 }}
                        >
                          <Minus className={classes.minus} />
                        </Fab>
                      </Tooltip>
                    )}
                  </Grid>
                );
              })}
          </Grid>
          <Grid container justify='center' style={{ marginTop: 40 }}>
            <Button
              disabled={this.state.project_id ? false : true}
              onClick={(e) => this.handleState({ drawer: !this.state.drawer })}
              color='secondary'>
              {this.state.drawer ? 'Close Revision' : 'Additional Scope Revision?'}
            </Button>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleSave} color='secondary'>
            Accept
          </Button>
          <Button onClick={this.props.toggleScopeDialog} color='secondary'>
            Cancel
          </Button>
        </DialogActions>
        <Drawer
          anchor='right'
          variant={this.state.drawer ? 'persistent' : 'temporary'}
          open={this.state.drawer}
          onClose={(e) => this.handleState({ drawer: !this.state.drawer })}>
          <div className={classes.list}>
            {this.props.localView.children.map((group, id) => {
              switch (group.name) {
                case 'revision_update':
                  return (
                    <RevScopeFG
                      key={id}
                      // key={child.rship_id}
                      fieldGroup={group}
                      // toggleScopeDialog={()=>{}}
                      // removeScope={false}
                      // props below manage state within dialog only
                      parentState={this.state}
                      updateState={this.handleState}
                      clearState={this.handleClear}
                      saveState={this.handleSave}
                    />
                  );
                default:
                  return null;
              }
            })}
          </div>
          {/*this.sideList()*/}
        </Drawer>
      </Dialog>
    );
  }
}

export const ScopeSelection = withStyles(styles, { withTheme: true })(scopeSelection);
// export const FieldGroup2 = withStyles(styles, { withTheme: true })(fieldGroup2);
