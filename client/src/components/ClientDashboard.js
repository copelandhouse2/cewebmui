import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withWidth } from "@material-ui/core";
import { Link } from "react-router-dom";
import _ from 'lodash';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import Edit from '@material-ui/icons/Edit';
import Reply from '@material-ui/icons/Reply';
import Delete from '@material-ui/icons/Delete';
import Save from '@material-ui/icons/Save';

import { Field2Container } from '../containers/ceFieldContainer';

import { Doughnut } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';

import red from '@material-ui/core/colors/red';
import pink from '@material-ui/core/colors/pink';
import purple from '@material-ui/core/colors/purple';
import deepPurple from '@material-ui/core/colors/deepPurple';
import indigo from '@material-ui/core/colors/indigo';
import blue from '@material-ui/core/colors/blue';
import lightBlue from '@material-ui/core/colors/lightBlue';
import cyan from '@material-ui/core/colors/cyan';
import teal from '@material-ui/core/colors/teal';
import green from '@material-ui/core/colors/green';
import lightGreen from '@material-ui/core/colors/lightGreen';
import lime from '@material-ui/core/colors/lime';
import yellow from '@material-ui/core/colors/yellow';
import amber from '@material-ui/core/colors/amber';
import orange from '@material-ui/core/colors/orange';
import deepOrange from '@material-ui/core/colors/deepOrange';
import brown from '@material-ui/core/colors/brown';
import grey from '@material-ui/core/colors/grey';

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  linkStyle: {
    textDecoration: 'none'
  },
  graph: {
    padding: 10
  },
  grid: {
    marginBottom:40
  }
});

const light = 200, strong = 500;
const colors = [
  red[strong],
  green[strong],
  orange[strong],
  blue[strong],
  yellow[strong],
  pink[strong],
  purple[strong],
  lightBlue[strong],
  brown[strong],
  cyan[strong],
  amber[strong],
  deepOrange[strong],
  lime[strong],
  deepPurple[strong],
  indigo[strong],
  lightGreen[strong],
  grey[strong],
  teal[strong],
];
const bColors = [
  red[light],
  green[light],
  orange[light],
  blue[light],
  yellow[light],
  pink[light],
  purple[light],
  lightBlue[light],
  brown[light],
  cyan[light],
  amber[light],
  deepOrange[light],
  lime[light],
  deepPurple[light],
  indigo[light],
  lightGreen[light],
  grey[light],
  teal[light],
];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'
  , 'Jul','Aug','Sep','Oct','Nov','Dec'];

class ClientDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // currentTab:new Date().getFullYear(),
      tabCode: '2022',
      tabLabel: '2022',
      created_by: this.props.session.id,
      last_updated_by: this.props.session.id,
    };

    this.initState = {};

  }

  componentDidMount = () => {
    // console.log('*** CDM Client History', this.state);
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   const { currentClient, session } = nextProps;
  //   console.log('*** gDSFP Dashboard State, currentClient', prevState, currentClient);
  //
  //   if (currentClient.change === 'updated') {
  //     console.log('*** gDSFP Dashboard: currentClient was updated',currentClient);
  //
  //     return {
  //       created_by: session.id,
  //       last_updated_by: session.id,
  //     }
  //   }
  //
  //   return null;
  // }

  updateState = (updatedValues) => {
    // console.log('*** Client Dashboard updateState', updatedValues);
    this.setState( updatedValues );
  }

  totalProjects = () => {
    const { currentClient } = this.props;
    const { reporting } = currentClient;

    let records = []
    let lines = [...colors];

    // Project
    records = reporting?reporting.project.filter(s=>s.year===this.state.tabCode):[];

    // console.log('projects count',records);

    return (
    <Fragment>
    <Typography variant='h2' align='center'>
      {records.length>0?records[0].count:0}
    </Typography>
    <Typography variant='h6' align='center'>
      Projects
    </Typography>
    </Fragment>
    )
  }

  totalSlabs = () => {
    const { currentClient } = this.props;
    const { reporting } = currentClient;

    let total = 0;
    let records = [];

    if (this.state.tabCode === 'TOTAL') {  // all time.  Need to add things up.
      records = [...reporting.slab];
    } else {
      records = reporting?reporting.slab.filter(s=>s.year===this.state.tabCode):[];
    }

    records.forEach((s,i)=>{
      total = total + s.count;
    });

    return (
    <Fragment>
    <Typography variant='h2' align='center'>
      {total}
    </Typography>
    <Typography variant='h6' align='center'>
      Slabs
    </Typography>
    </Fragment>
    )
  }

  totalRevs = () => {
    const { currentClient } = this.props;
    const { reporting } = currentClient;

    let records = []
    let lines = [...colors];

    // Project
    records = reporting?reporting.rev.filter(s=>s.year===this.state.tabCode && s.revision === 'TOTAL'):[];

    // console.log('totalRevs count',records);

    return (
    <Fragment>
    <Typography variant='h2' align='center'>
      {records.length>0?records[0].count:0}
    </Typography>
    <Typography variant='h6' align='center'>
      Revisions
    </Typography>
    </Fragment>
    )
  }

  totalInsp = () => {
    const { currentClient } = this.props;
    const { reporting } = currentClient;

    let records = []
    let lines = [...colors];

    // Project
    // records = reporting?reporting.rev.filter(s=>s.year===this.state.tabCode && s.revision === 'TOTAL'):[];

    // console.log('projects count',records);

    return (
    <Fragment>
    <Typography variant='h2' align='center'>
      0
    </Typography>
    <Typography variant='h6' align='center'>
      Inspections
    </Typography>
    </Fragment>
    )
  }

  slabCount = () => {
    const { currentClient } = this.props;
    const { reporting } = currentClient;

    // Bar Data
    let data = [];
    data.length = 12;
    data.fill(0);
    let total = 0;

    let records = [];
    if (this.state.tabCode === 'TOTAL') {  // all time.  Need to add things up.
      records = [...reporting.slab];
    } else {
      records = reporting?reporting.slab.filter(s=>s.year===this.state.tabCode):[];
    }

    records.forEach((s,i)=>{
      data[s.month-1] = data[s.month-1] + s.count;
      total = total + s.count;
    });


    let barColor = [];
    barColor.length = 12;
    barColor.fill(red[strong]);

    // console.log('data',data,barColor);

    const barData = {
      labels: months,
      datasets: [
        {
          label: `Slabs (${total})`,
          data: data,
          backgroundColor: barColor,
        },

      ],
    };

    if (records.length>0) {
      return (
        <Fragment>
          <Typography variant='h5' align='center'>
            Slab Count {this.state.tabLabel}
          </Typography>
          <Bar data={barData} />
        </Fragment>
      )
    } else {
      return (
      <Typography variant='h6' align='center'>
        No data to display
      </Typography>
      )
    }
  }

  scopeCount = () => {
    const { currentClient } = this.props;
    const { reporting } = currentClient;

    let records = [], labels, data
    let backgrounds = [...bColors];
    let lines = [...colors];
    // console.log('I am in pieData', records, reporting?reporting.scope:undefined);

    // Pie Data
    if (this.state.tabCode === 'TOTAL') {  // all time.  Need to add things up.
      // console.log('records was cleared',records);
      reporting.scope.forEach(s=>{
        // console.log('in forEach',s);
        const i = records.findIndex(r=>r.label===s.label);
        if (i === -1) {
          records.push({...s});
          // console.log('pushing s',records);
        } else {
          records[i].count = records[i].count + s.count;
          // console.log('updating count',records);
        }
      });
      records.sort((a,b)=>a.count-b.count);
      // let newRecords = [...new Set(reporting?reporting.scope.map(r=>r.label):[])];
      // console.log('pieData for all',reporting?reporting.scope:[],records);

      labels = records.map(r=>r.label);
      data = records.map(r=>r.count);
      backgrounds.length = records.length;
      lines.length = records.length;
    } else {
      records = reporting?reporting.scope.filter(s=>s.year===this.state.tabCode):[];

      labels = records.map(r=>r.label);
      data = records.map(r=>r.count);
      backgrounds.length = records.length;
      lines.length = records.length;

      // console.log('pieData for date',reporting?reporting.scope:[],records);

    }

    const pieData = {
      labels: labels,
      datasets: [
        {
          label: 'Scopes',
          data: data,
          backgroundColor: backgrounds,
          borderColor: lines,
          borderWidth: 1,
        },
      ],
    };

    if (records.length>0) {
      return (
      <Fragment>
        <Typography variant='h5' align='center'>
          Scope Count {this.state.tabLabel}
        </Typography>
        <Pie
          data={pieData}
          options={ {legend:{align:'start'} } }
        />
      </Fragment>
      )
    } else {
      return (
      <Typography variant='h6' align='center'>
        No data to display
      </Typography>
      )
    }
  }

  revs = () => {
    const { currentClient } = this.props;
    const { reporting } = currentClient;

    let records = [], labels, data
    let backgrounds = [...bColors];
    let lines = [...colors];

    // Rev Data
    records = reporting?reporting.rev.filter(s=>s.year===this.state.tabCode && s.revision !== 'TOTAL'):[];

    labels = records.map(r=>r.revision);
    data = records.map(r=>r.count);
    backgrounds.length = records.length;
    lines.length = records.length;

    // console.log('revs for date',reporting?reporting.rev:[],records);

    const donutData = {
      labels: labels,
      datasets: [
        {
          label: 'Revs',
          data: data,
          backgroundColor: backgrounds,
          borderColor: lines,
          borderWidth: 1,
        },
      ],
    };

    if (records.length>0) {
      return (
      <Fragment>
        <Typography variant='h5' align='center'>
          Revisions {this.state.tabLabel}
        </Typography>
        <Pie
          data={donutData}
          options={ {legend:{align:'start'} } }
        />
      </Fragment>
      )
    } else {
      return (
      <Typography variant='h6' align='center'>
        No data to display
      </Typography>
      )
    }
  }

  revReasons = () => {
    const { currentClient } = this.props;
    const { reporting } = currentClient;

    let records = [], labels, data
    let backgrounds = [...bColors];
    let lines = [...colors];

    // Rev Data
    records = reporting?reporting.revReason.filter(s=>s.year===this.state.tabCode && s.reasons !== 'TOTAL'):[];
    records.sort((a,b)=>a.count-b.count);

    labels = records.map(r=>r.reasons);
    data = records.map(r=>r.count);
    backgrounds.length = records.length;
    lines.length = records.length;

    // console.log('revReasons for date',reporting?reporting.revReason:[],records);

    const donutData = {
      labels: labels,
      datasets: [
        {
          label: 'Rev Reasons',
          data: data,
          backgroundColor: backgrounds,
          borderColor: lines,
          borderWidth: 1,
        },
      ],
    };

    if (records.length>0) {
      return (
      <Fragment>
        <Typography variant='h5' align='center'>
          Rev Reasons {this.state.tabLabel}
        </Typography>
        <Pie
          data={donutData}
          options={ {legend:{align:'start'} } }
        />
      </Fragment>
      )
    } else {
      return (
      <Typography variant='h6' align='center'>
        No data to display
      </Typography>
      )
    }
  }

  revResps = () => {
    const { currentClient } = this.props;
    const { reporting } = currentClient;

    let records = [], labels, data
    let backgrounds = [...bColors];
    let lines = [...colors];

    // Rev Data
    records = reporting?reporting.revResp.filter(s=>s.year===this.state.tabCode && s.resps !== 'TOTAL'):[];
    records.sort((a,b)=>a.count-b.count);

    labels = records.map(r=>r.resps);
    data = records.map(r=>r.count);
    backgrounds.length = records.length;
    lines.length = records.length;

    // console.log('revResps for date',reporting?reporting.revResp:[],records);

    const donutData = {
      labels: labels,
      datasets: [
        {
          label: 'Rev Resps',
          data: data,
          backgroundColor: backgrounds,
          borderColor: lines,
          borderWidth: 1,
        },
      ],
    };

    if (records.length>0) {
      return (
      <Fragment>
        <Typography variant='h5' align='center'>
          Rev Responsibilities {this.state.tabLabel}
        </Typography>
        <Pie
          data={donutData}
          options={ {legend:{align:'start'} } }
        />
      </Fragment>
      )
    } else {
      return (
      <Typography variant='h6' align='center'>
        No data to display
      </Typography>
      )
    }
  }

  slabYearComparison = () => {
    const { currentClient, reportTypesLookup } = this.props;
    const { reporting } = currentClient;
    console.log

    // console.log()
    // Pie Data
    const years = reportTypesLookup.filter(r=>r.key === 'YEAR');
    console.log('years', years);
    const theData = years.map((y, index)=>{
      const records = reporting?reporting.slab.filter(s=>s.year==y.code):[];
      let data = [];
      data.length = 12;
      data.fill(0);

      records.forEach((s,i)=>{
        data[s.month-1] = s.count;
      });

      let barColor = [];
      barColor.length = 12;
      barColor.fill(colors[index]);

      // console.log('data',y, data,barColor);

      return {
        label: y.name,
        data: data,
        backgroundColor: barColor
      }
    })

    const barData = {
      labels: months,
      datasets: theData,
    };

    if (theData.length>0) {
      return (
        <Fragment>
          <Typography variant='h5' align='center'>
            Slab Count {this.state.tabLabel}
          </Typography>
          <Bar data={barData} />
        </Fragment>
      )
    } else {
      return (
      <Typography variant='h6' align='center'>
        No data to display
      </Typography>
      )
    }
  }

  render() {
    const { currentClient, classes, theme, reportTypesLookup } = this.props;
    const { reporting } = currentClient;

    // console.log('*** Client Dashboard Render:',
    // 'state:', this.state,
    // 'currentClient', currentClient,
    // 'reporting',reporting,
    // 'report years', reportTypesLookup,
    // );
    // const fComment = fGroup.children.find(field=> field.name === 'comments');

    return (
      <Grid container spacing={24} justify='space-evenly' className={classes.grid}>
        <Grid item xs={12} container justify='space-evenly' spacing={24}>
          {reportTypesLookup.map((r,i)=>{
            return (
              <Grid item key={r.id}>
                <Button title={r.name}
                  // variant="contained"
                  // size='small'
                  color={r.code===this.state.tabCode?'secondary':'primary'}
                  // disabled={this.state.change?false:true}
                  onClick={()=>this.updateState({ tabCode:r.code, tabLabel:r.name })}
                >
                  {r.code===this.state.tabCode?<b>{r.name}</b>:r.name}
                </Button>
              </Grid>
            )
          }).reverse()}
        </Grid>

        {this.state.tabCode !== 'COMPARE' &&
        <Fragment>

        <Grid item xs={6} container justify='space-evenly' spacing={24}>
          <Grid item xs={6}>
            <Paper className={classes.graph}>
              {this.totalProjects()}
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.graph}>
              {this.totalSlabs()}
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.graph}>
              {this.totalRevs()}
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.graph}>
              {this.totalInsp()}
            </Paper>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.graph}>
            {this.slabCount()}
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.graph}>
            {this.scopeCount()}
          </Paper>
        </Grid>

        <Grid item xs={6} >
          <Paper className={classes.graph}>
            {this.revs()}
          </Paper>
        </Grid>

        <Grid item xs={6} >
          <Paper className={classes.graph}>
            {this.revReasons()}
          </Paper>
        </Grid>
        <Grid item xs={6} >
          <Paper className={classes.graph}>
            {this.revResps()}
          </Paper>
        </Grid>

        </Fragment>
        }

        {this.state.tabCode === 'COMPARE' &&
        <Grid item xs={11}>
          <Paper className={classes.graph}>
            {this.slabYearComparison()}
          </Paper>
        </Grid>
        }

        <Grid item xs={12} className={classes.grow}>
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

export default withWidth()(withStyles(styles, { withTheme: true })(ClientDashboard));
