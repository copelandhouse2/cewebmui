import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ReactDataGrid from 'react-data-grid';

import Paper from '@material-ui/core/Paper';

import Fab from '@material-ui/core/Fab';

import Tooltip from '@material-ui/core/Tooltip';

import addIcon from '../img/add1.svg';
import addIconWhite from '../img/add1-white.svg';

import Minus from '@material-ui/icons/RemoveRounded';

const {
  DraggableHeader: { DraggableContainer }
} = require("react-data-grid-addons");

const styles = theme => ({
  addScope: {
    position: 'absolute',
    // left: '5%',
    // marginTop: -5
    '& svg': {
      fill: theme.palette.secondary.contrastText
    }
  },
  imageSrc: {
    height: 32,
    // color: theme.palette.secondary.contrastText,  // not working
    // fill: '#FFFFFF',  // not working
    // '& svg': {
    //   fill: theme.palette.secondary.contrastText
    // }
  },
  fabMinus: {
    // position: 'absolute',
    // top: 40,
    // left: 15,
    width: 15,
    height: 15,
    minHeight: 0,
    marginRight: 5,
  },
  minus: {
    width: 15,
    height: 15,
    color: theme.palette.secondary.contrastText,
    // minWidth: 0,
    // minHeight: 0,
  },
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

// promiseFn = theFunction => {
//   return new Promise((resolve, reject) => {
//       resolve(theFunction);
//   })
// };

const fieldGroup = (props) => {

  const { classes, fieldGroup, removeScope, theme } = props;

  if (fieldGroup.name === 'soil') {
    return (
      <Grid container justify='center'>
        <Grid item xs={12} style={ {marginTop: 20, marginBottom: 20, borderTop: '1px solid black'} }>
          <Typography align='left' style={{fontWeight: 500}}>
            {fieldGroup.label}
          </Typography>
        </Grid>
        <Tooltip title={`Press button to change scope items.`} placement={'right-start'}>
          <Fab size='small' color='secondary' aria-label='Add' className={classes.addScope} onClick={() => {props.toggleScopeDialog(props.setState, true)}}>
            <img src={theme.palette.secondary.contrastText === '#fff'?addIconWhite:addIcon} alt={'Add Scope'} className={classes.imageSrc} />
          </Fab>
        </Tooltip>
      </Grid>

    )
  } else {
    return (
      <Grid container justify='center'>
        <Grid item xs={12} style={ {marginTop: 20, marginBottom: 20, borderTop: '1px solid black'} }>
          <Typography align='left' style={{fontWeight: 500}}>
            {removeScope &&
            <Tooltip title='Remove scope item' aria-label='Remove'>
              <Fab color='secondary' className={classes.fabMinus}
                 onClick={()=>removeScope(props.arrID)}
              >
                <Minus className={classes.minus}/>
              </Fab>

              {/*<IconButton color='secondary'>
                // <Minus className={classes.minus}/>
                <i className="fas fa-stamp"></i>
              </IconButton>*/}
            </Tooltip>
            }
            {fieldGroup.label}
          </Typography>
        </Grid>
      </Grid>

    )
  }

}

class fieldGroupTabular extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: []
    };

    this.initState = {...this.state};
  }

  componentDidMount = () => {
    const columns = [
      { key: 'job_number',
        name: 'Job Number',
        resizable: true,
        // sortable: true,
        draggable: true,
        formatter: this.jobNumColFormatter,
        headerRenderer: this.headerColFormatter('Job Number')
      },
      { key: 'address1',
        name: 'Address',
        resizable: true,
        // sortable: true,
        draggable: true,
        formatter: this.colFormatter,
        headerRenderer: this.headerColFormatter('Address')
      },
      { key: 'city',
        name: 'City',
        resizable: true,
        // sortable: true,
        draggable: true,
        formatter: this.colFormatter,
        headerRenderer: this.headerColFormatter('City')
      },
      { key: 'subdivision',
        name: 'Subdivision',
        resizable: true,
        // sortable: true,
        draggable: true,
        formatter: this.colFormatter,
        headerRenderer: this.headerColFormatter('Subdivision')
      },
      { key: 'phase',
        name: 'Phase',
        width: 50,
        // resizable: true,
        // sortable: true,
        draggable: true,
        formatter: this.centerColFormatter,
        headerRenderer: this.headerColFormatter('Ph')
      },
      { key: 'section',
        name: 'Section',
        width: 50,
        // resizable: true,
        // sortable: true,
        draggable: true,
        formatter: this.centerColFormatter,
        headerRenderer: this.headerColFormatter('Sec')
      },
      { key: 'block',
        name: 'Block',
        width: 50,
        // resizable: true,
        // sortable: true,
        draggable: true,
        formatter: this.centerColFormatter,
        headerRenderer: this.headerColFormatter('Blk')
      },
      { key: 'lot',
        name: 'Lot',
        width: 50,
        // resizable: true,
        // sortable: true,
        draggable: true,
        formatter: this.centerColFormatter,
        headerRenderer: this.headerColFormatter('Lot')
      },
      { key: 'client',
        name: 'Client',
        resizable: true,
        // sortable: true,
        draggable: true,
        formatter: this.colFormatter,
        headerRenderer: this.headerColFormatter('Client')
      },
    ];
    this.setState({ columns: columns });
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

  onRowSelected = rows => {
    // console.log('onRowSelected', rows, rows[0].rowIdx);
    this.props.updateState({
      selectedIndexes:
        [rows[0].rowIdx]
    });
  };

  onHeaderDrop = (source, target) => {
    const stateCopy = Object.assign({}, this.state);
    const columnSourceIndex = this.state.columns.findIndex(
      i => i.key === source
    );
    const columnTargetIndex = this.state.columns.findIndex(
      i => i.key === target
    );

    stateCopy.columns.splice(
      columnTargetIndex,
      0,
      stateCopy.columns.splice(columnSourceIndex, 1)[0]
    );

    const emptyColumns = Object.assign({}, this.state, { columns: [] });
    this.setState(emptyColumns);

    const reorderedColumns = Object.assign({}, this.state, {
      columns: stateCopy.columns
    });
    this.setState(reorderedColumns);
  }

  render() {
    const { classes, fieldGroup, data, parentState } = this.props;

    // console.log('FG the data', data);
    return (
      <Grid container justify='center'>
        <Grid item xs={12} style={ {marginTop: 20, marginBottom: 20, borderTop: '1px solid black'} }>
          <Typography align='left' style={{fontWeight: 500}}>
            {fieldGroup.label}
          </Typography>
        </Grid>

        <Grid item xs={12}>
        <Paper className={classes.parentOfGrid}>
        <DraggableContainer onHeaderDrop={this.onHeaderDrop}>
          <ReactDataGrid
            columns={this.state.columns}
            rowGetter={i => data.findResults[i]}
            rowsCount={data.findResults.length}
            minHeight={36*(data.findResults.length+1)}
            selectAllRenderer={null}
            // headerRenderer={this.HeaderRenderer}
            toolbar={true}
            // showCheckbox={false}
            rowSelection={{
              showCheckbox: true,
              enableShiftSelect: true,
              onRowsSelected: this.onRowSelected,
              // onRowsDeselected: this.onRowsDeselected,
              selectBy: {
                indexes: parentState.selectedIndexes
              }
            }}

          />
        </DraggableContainer>
        </Paper>
        </Grid>

      </Grid>

    )
  }  // render
}
// class fieldGroup extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//
//     };
//   }
//
//   componentDidMount = () => {
//
//   }
//
//   render() {
//     console.log('render');
//     const { classes, fieldGroup } = this.props;
//
//     return (
//       <Grid key={fieldGroup.id} container justify='center'>
//         <Grid item xs={12} style={ {marginTop: 20, marginBottom: 20, borderTop: '1px solid black'} }>
//           <Typography align='left' style={{fontWeight: 500}}>
//             {fieldGroup.label}
//           </Typography>
//         </Grid>
//       </Grid>
//
//     )
//
//   }  // render
// }  // Component


export const FieldGroup = withStyles(styles, { withTheme: true })(fieldGroup);
export const FieldGroupTabular = withStyles(styles, { withTheme: true })(fieldGroupTabular);
// export const FieldGroup2 = withStyles(styles, { withTheme: true })(fieldGroup2);
