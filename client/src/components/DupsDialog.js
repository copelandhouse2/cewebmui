import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AlertDialogContainer from '../containers/AlertDialogContainer';
import Grid from '@material-ui/core/Grid';
import ReactDataGrid from 'react-data-grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    // flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  container: {
    // display: 'flex',
    // flexWrap: 'wrap',
    width: '100%',
    // height: '30vh'
  },
  item: {
    // width: 400
  },
  title: {
    // color: 'white',
    // backgroundColor: 'black',
    // borderRadius: 20,
    // textShadow: 5,
    // width: 100,
    // marginBottom: theme.spacing.unit*2,
    // marginRight: theme.spacing.unit,
    // margin: 'auto',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 500,
  },
  cssInput: {
    color: theme.palette.secondary.light,
    // backgroundColor: theme.palette.primary.light,
    fontSize: 14,
    textAlign: 'center',
    // borderColor: white,
    // borderRadius: 20,
    // textShadow: 5,

  },
  // this along with index.css .react-grid-HeaderCell entry,
  // gives me desired header format.
  headerColumn: {
    fontSize: 14,
    textAlign: 'center',
    // background: theme.palette.secondary.dark,
    fontWeight: 600,
    color: theme.palette.secondary.contrastText,
    paddingTop: 8,
    marginTop: 0,
    // width: '100%',
    height: '100%',
    backgroundColor: theme.palette.secondary.main
  },
  jobNumColumn: {
    fontSize: 12,
    textAlign: 'center',
    color: theme.palette.secondary.dark,
    fontWeight: 500,
  },
  centerColumn: {
    fontSize: 12,
    textAlign: 'center',
  },
  column: {
    fontSize: 12,
  },
  alert: {
    // fontSize: 12,
    // textAlign: 'center',
    color: theme.palette.error.main,
    fontWeight: 500,
    paddingTop: 10,
  },
  // tried with index.css.  Didn't work in test env.
  parentOfGrid: {
    // '& $div.react-grid-HeaderRow': {  // eports browser error (still works though)
    //   backgroundColor: theme.palette.primary.main,
    //   color: theme.palette.primary.contrastText,
    //   textAlign: 'center',
    //   fontSize: 14
    // }

    // WORKS!
    '& .react-grid-HeaderCell': {
      padding: 0
    }
  },
});

var counter = 0;

class DupsDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndexes: [],
      jobnumber: null,
    };

    this.initState = {...this.state};

    this.columns = [
      { key: 'job_number',
        name: 'Job Number',
        formatter: this.jobNumColFormatter,
        headerRenderer: this.headerColFormatter('Job Number')
      },
      { key: 'address1',
        name: 'Address',
        resizable: true,
        formatter: this.colFormatter,
        headerRenderer: this.headerColFormatter('Address')
      },
      { key: 'city',
        name: 'City',
        resizable: true,
        formatter: this.colFormatter,
        headerRenderer: this.headerColFormatter('City')
      },
      { key: 'subdivision',
        name: 'Subdivision',
        resizable: true,
        formatter: this.colFormatter,
        headerRenderer: this.headerColFormatter('Subdivision')
      },
      { key: 'phase',
        name: 'Phase',
        resizable: true,
        width: 50,
        formatter: this.centerColFormatter,
        headerRenderer: this.headerColFormatter('Ph')
      },
      { key: 'section',
        name: 'Section',
        resizable: true,
        width: 50,
        formatter: this.centerColFormatter,
        headerRenderer: this.headerColFormatter('Sec')
      },
      { key: 'block',
        name: 'Block',
        resizable: true,
        width: 50,
        formatter: this.centerColFormatter,
        headerRenderer: this.headerColFormatter('Blk')
      },
      { key: 'lot',
        name: 'Lot',
        resizable: true,
        width: 50,
        formatter: this.centerColFormatter,
        headerRenderer: this.headerColFormatter('Lot')
      },
      { key: 'client',
        name: 'Client',
        resizable: true,
        formatter: this.colFormatter,
        headerRenderer: this.headerColFormatter('Client')
      },
    ]
  }

  headerColFormatter = (value) => {
    return (
      <div className={this.props.classes.headerColumn}>
        {value}
      </div>
    )
  }

  jobNumColFormatter = ({ value }) => {
    return (
      <Typography className={this.props.classes.jobNumColumn}>
        {value? value : 'Current Entry'}
      </Typography>
    )
  }

  centerColFormatter = ({ value }) => {
    return (
      <Typography className={this.props.classes.centerColumn}>
        {value}
      </Typography>
    )
  }

  colFormatter = ({ value }) => {
    return (
      <Typography className={this.props.classes.column}>
        {value}
      </Typography>
    )
  }

  // componentWillMount = () => {
  //   console.log(counter, 'CWM: props', this.props);
  // }
  // componentWillUnmount = () => {
  //   console.log(counter, 'CWUM', this.props, this.state);
  // }
  // componentDidMount = () => {
  //   console.log(counter, 'CDM: props', this.props.newValue);
  // }

  handleSkip = () => {
    // console.log('In the handleSkip');
    this.props.onClose();
    this.props.clearDups();  // in container
  }

  handleSelected = () => {
    // console.log('In the handleSelected', this.state.selectedIndexes[0]);
    if (this.state.selectedIndexes[0]) {
      // console.log('In the if');
      this.props.onSelectAndClose(this.props.dups[this.state.selectedIndexes[0]-1], -1);
      this.props.clearDups();  // in container
    } else {  // user selected first row (index = 0) which was the curent entry
      // console.log('In the else');
      this.props.clearDups();  // in container
    }
  }

  onRowSelected = rows => {
    // console.log('onRowSelected', rows, rows[0].rowIdx);
    this.setState({
      selectedIndexes:
        // this.state.selectedIndexes.concat(rows.map(r => r.rowIdx))
        // rows.map(r => r.rowIdx)
        [rows[0].rowIdx]
    });
  };

  // onRowsDeselected = rows => {
  //   console.log('onRowsDeselected', rows);
  //
  //   let rowIndexes = rows.map(r => r.rowIdx);
  //   this.setState({
  //     selectedIndexes: this.state.selectedIndexes.filter(
  //       i => rowIndexes.indexOf(i) === -1
  //     )
  //   });
  // };

  joinCurrent = (i) => {
    let combo = [this.props.curRec].concat(this.props.dups);
    // console.log('joinCurrent', combo);
    return combo[i];
  }

  render() {
    counter = counter + 1;
    // console.log(counter, 'props', this.props);
    // console.log(counter, 'state', this.state);
    // console.groupEnd();
    // console.log('Create Client props', this.props);
    // console.log('Create Client state', this.state);
    // this.setClientID();
    const { classes } = this.props;

    return (
      <Dialog
        open={this.props.open}
        fullWidth={true}
        maxWidth={'md'}
        className={classes.root}

      >
        <DialogTitle>
          <Typography className={classes.title}>
          Is this a duplicate entry?
          </Typography>
        </DialogTitle>
        <DialogContent
        className={classes.container}
        >
          <Paper className={classes.parentOfGrid}>
            <ReactDataGrid
              columns={this.columns}
              // rowGetter={i => this.props.dups[i]}
              rowGetter={i => this.joinCurrent(i)}
              rowsCount={this.props.dups.length + 1}
              minHeight={300}
              selectAllRenderer={null}
              // headerRenderer={this.HeaderRenderer}
              // toolbar={true}
              // showCheckbox={false}
              rowSelection={{
                showCheckbox: this.props.selectAllowed,
                enableShiftSelect: this.props.selectAllowed,
                onRowsSelected: this.onRowSelected,
                // onRowsDeselected: this.onRowsDeselected,
                selectBy: {
                  indexes: this.state.selectedIndexes
                }
              }}

            />
          </Paper>

          {!this.props.selectAllowed &&

            <Grid item xs={12}>
              <Typography variant='h6' align='center' className={ classes.alert }>
              <b>ALERT</b>: If entry is a duplicate, please use Project Management screen to edit.
              </Typography>
            </Grid>
          }
        </DialogContent>

        <DialogActions>

        <Button
          onClick = {this.handleSkip}
          variant = 'contained' color='secondary'
        >
          {this.props.selectAllowed? 'Skip and keep current':'Ok'}
        </Button>

        {this.props.selectAllowed &&
          <Button
            onClick = {this.handleSelected}
            variant = 'contained' color='secondary'
          >
            Use Selected
          </Button>
        }
        </DialogActions>
        <AlertDialogContainer />
      </Dialog>
    );
  }
}
export default withStyles(styles)(DupsDialog);
