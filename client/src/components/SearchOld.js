import React, { Component, Fragment } from 'react';
import { Redirect, Link } from "react-router-dom"
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withWidth } from "@material-ui/core";

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
// import AddIcon from '@material-ui/icons/Add';
// import Checkbox from '@material-ui/core/Checkbox';

import { FieldGroup, FieldGroupTabular } from './ceFieldGroup';
import { Field2Container } from '../containers/ceFieldContainer';
// import { ScopeSelectionContainer } from '../containers/ceScopeSelectionContainer';

// import fullView from '../img/fullView.svg';
// import listView from '../img/listView.svg';
// import columnView from '../img/columnView2.svg';


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
    height: 16,
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
  }
});

const date = (dayAdj=0) => {
  let returnDate = new Date();
  returnDate.setDate(returnDate.getDate()+dayAdj);
  const theMonth = returnDate.getMonth()+1 < 10? `0${returnDate.getMonth()+1}` : `${returnDate.getMonth()+1}`;
  const theDay = returnDate.getDate() < 10? `0${returnDate.getDate()}` : `${returnDate.getDate()}`;

  return `${returnDate.getFullYear()}-${theMonth}-${theDay}`;
}

class Search extends Component {
  constructor(props) {
    super(props);

    this.today = date();
    this.due = date(30);

    this.state = {
      renderScreen: false,
      saveValue: '',  // stores previous values of address/lot/block to test for change      selectedIndexes: [],
      selectedIndexes: [],

    };

    this.initState = {...this.state};

    this.childArr = [];
    this.VIEW = 'DEFAULT';

  }

  componentDidMount = () => {
    // console.log('CDM');
    if (this.props.currentProject.categoryID) {
      // console.log('CDM: currentProject populated', this.props.currentProject, this.state);
      this.props.loadViews(this.props.currentProject.categoryID);
      // this.props.loadFind('clear');
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log('gDSFP');
    const { currentViews } = nextProps;
    // console.log('gDSFP: nextProps', currentProject, currentViews);

    // If the views object is populated, activate the screen render toggle.
    if (currentViews.constructor === Object && Object.keys(currentViews).length !== 0) {
      return {renderScreen: true };
    }

    return null;
  }

  viewChildren = (children, inclID=false) => {
    if (children) {
      children.forEach((child, id) => {
        if (child.entity_type === 'FIELD_GROUP') {
          switch (child.category) {
            case 'TABULAR':
              this.childArr.push(
                <FieldGroupTabular
                  key={child.rship_id}
                  fieldGroup = {child}
                  parentState = {this.state}
                  data = {this.props.search}
                  updateState = {this.updateState}
                />
              );
              break;
            case 'DESIGN':
              if (this.state.scope && this.state.scope.find(s => s.name === child.name ))
              {
                this.childArr.push(
                  <FieldGroup
                    key={child.rship_id}
                    fieldGroup = {child}
                    toggleScopeDialog={()=>{}}
                    removeScope={false}
                  />
                );
                if (child.children) this.viewChildren(child.children);  // recursive call.
              }
              break;
            default:
              this.childArr.push(
                <FieldGroup
                  key={child.rship_id}
                  fieldGroup = {child}
                  toggleScopeDialog={()=>{}}
                  removeScope={false}
                />
              );
              if (child.children) this.viewChildren(child.children);  // recursive call.
          }

        }
        if (child.entity_type === 'FIELD') this.childArr.push(
          <Field2Container
            key={child.rship_id}
            field = {child}
            scopeID = {inclID||inclID===0?inclID:false}
            state = {this.state}
            updateState = {this.updateState}
            // handleChange = {this.handleChange}
            // handleListChange = {this.handleListChange}
            // toggleJob = {this.toggleJob}
            // createDialogValue = {this.createDialogValue}
            // handleTabEnter = {this.handleTabEnter}
            // handleFocus = {this.handleFocus}
            // handleBlur = {this.handleBlur}
            // addStyle = {classes.findField}
            // findProjects = {this.findProjects}
          />);
      });
      return this.childArr;
    }
    // this is if children hasn't been loaded or is 0.
    return (
      <div />
    )
  }

  updateState = (updatedValues) => {
    // console.log('updateState', updatedValues);
    this.setState(updatedValues);
  }

  actionButtonList = () => {

    const { classes } = this.props;

    return (
    <Grid container justify="flex-end" style={{marginTop: 10, marginBottom: 10}} spacing={16}>

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
        <Button title='Select record'
          variant="contained"
          size='small'
          color="secondary"
          onClick={this.handleSelected}
        >
          Edit
        </Button>
      </Grid>

    </Grid>
    )
  }

  handleSelected = () => {
    // console.log('In the handleSelected', this.state.selectedIndexes[0]);
    if (this.state.selectedIndexes[0] >=0) {
      // console.log('In the if');
      this.props.updateProject(this.props.search.findResults[this.state.selectedIndexes[0]]);
      // this.props.clearDups();  // in container
    } else {  // user selected first row (index = 0) which was the curent entry
      // console.log('In the else');
      // this.props.clearDups();  // in container
    }
  }

  render() {
    const { classes, currentViews, width } = this.props;
    // console.log('Search Render:', 'state:', this.state, 'currentProject:', currentProject, 'currentViews:', currentViews, 'find:', search.findResults, 'menu:', currentMenu);

    // Test to make sure we can render Screen.  Only set to true when
    // currentProject and currentViews are populated.
    // If currentProject is empty, go back to Main menu.
    if (!this.state.renderScreen) {
      console.log('loading...');
      // test for empty Project object.  If so, user refreshed browser.  Go back to main menu.
      if (this.props.currentProject.constructor === Object && Object.keys(this.props.currentProject).length === 0) {
        return (
          <Redirect to={'/'} />
        );
      }
      return null;
    }

    if (this.props.currentProject.job_number) {
      return (
        <Redirect to={this.props.currentProject.url} />
      );
    }

    this.childArr = [];
    let currentView = [];
    if (currentViews.children) {
      currentView = currentViews.children.filter((view) => view.category === this.VIEW)  // array of subviews (sections) that make up whole view.
    }

    // console.log('currentView', currentView);

    // could have multiple subviews.
    // viewChildren is a recursive function that gets all objects to
    // build the screen.  Places objects in array childArr.
    currentView.forEach(view => this.viewChildren(view.children));

    return (
      <Fragment>
        <Grid container
          justify='space-between'
          className={classes.titleContainer}
        >

          <Grid item xs={12} >
            <Paper elevation={4} className={classes.titleText}>
            <Typography align='center' variant={width==='xs'?'subtitle2':'h6'} className={classes.titleText}>
              {currentView.length>0?currentView[0].label:'loading...'}
            </Typography>

            </Paper>
          </Grid>

        </Grid>

        <Grid container justify='center' spacing={8} className={classes.container} >
          {this.childArr}

          {this.actionButtonList()}

        </Grid>


      </Fragment>

    )

  }  // render
}  // Component


export default withWidth()(withStyles(styles, { withTheme: true })(Search));
