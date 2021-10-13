import React, { Component, Fragment } from 'react';
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

import { DesignRevSvg } from '../img/revise';
import { SaveUpload } from '../img/saveUpload';

import { Field2Container, ColumnContainer } from '../containers/ceFieldContainer';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ClearIcon from '@material-ui/icons/Clear';
import { AddIcon } from '../img/addIcon.js';
import { Sort, SortAsc, SortDesc } from '../img/sort.js';

import IconButton from '@material-ui/core/IconButton';

import Toolbar from '@material-ui/core/Toolbar';

// import SettingsIcon from '@material-ui/icons/Settings';
// import TrackChangesIcon from '@material-ui/icons/TrackChanges';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import RootRef from "@material-ui/core/RootRef";

import Fade from '@material-ui/core/Fade';
import Zoom from '@material-ui/core/Zoom';

import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Save from '@material-ui/icons/Save';
import Cancel from '@material-ui/icons/Cancel';
import { Exit } from '../img/exit.js';


// Custom Field Groups
export * from './ceFieldGroupTrello';
export * from './ceFieldGroupInspection';

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
    overflow: 'auto',
    // WORKS!
    '& .react-grid-HeaderCell': {
      padding: 0
    }
  },
  toolbar: {
    padding:0,
    height: '100%',
    minHeight: 32,
    paddingTop: 10
  },
  titleFG: {
    paddingBottom: 20,
    // fontSize: 32
    // width: 100
  },
  grow: {
    flexGrow: 1,
  },
  growBigger: {
    flexGrow: 2,
  },
  settings: {
    color: theme.palette.secondary.main,
  },
  revButton: {
    // color: theme.palette.secondary.main,
  },
  tableActionProps: {
    paddingLeft:0,
    paddingRight:0,
  },
  tableCellProps: {
    borderLeftWidth: 1,
    borderLeftStyle: 'solid',
    borderLeftColor: 'lightgray',
    paddingLeft:5,
    paddingRight:5,
    // width:100,
    // minWidth: 70,
    '&:last-child': {
      paddingLeft:5,
      paddingRight:5,
      // minWidth: 70,
    }
  },
  lockCellProps: {
    // borderLeftWidth: 1,
    // borderLeftStyle: 'solid',
    // borderLeftColor: 'lightgray',
    paddingLeft:5,
    paddingRight:5,
    '&:last-child': {
      paddingLeft:5,
      paddingRight:5,
      // minWidth: 70,
    }
  },
  tableCellHeaderProps: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.light,
    // fontWeight: 'bold',
    fontSize: 13,
    padding: '3px 10px',
    // minWidth:60
    // margin: 'auto'
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  hCol0: {
    left: 36*0,
    position: 'sticky',
    zIndex: 1100,
    minWidth:36, // weirdly, need this if object is empty.  Width alone wont do it.  It will be 0.
    width:36     // added to help with the revision table dialog box.
  },
  hCol1: {
    left: 36*1,
    zIndex: 1100,
    minWidth:36, // weirdly, need this if object is empty.  Width alone wont do it.  It will be 0.
    width:36     // added to help with the revision table dialog box.
  },
  hCol2: {
    left: 36*2,
    zIndex: 1100,
    minWidth:36, // weirdly, need this if object is empty.  Width alone wont do it.  It will be 0.
    width:36     // added to help with the revision table dialog box.
  },
  hCol2xl: {
    left: 36*2,
    zIndex: 1100,
    minWidth:72+6,
  },
  hCol3: {
    left: 36*3,
    zIndex: 1100,
    minWidth:36, // weirdly, need this if object is empty.  Width alone wont do it.  It will be 0.
    width:36     // added to help with the revision table dialog box.
  },
  hCol3xl: {
    left: 36*4+6,
    zIndex: 1100,
    minWidth:36,
  },
  hCol4: {
    left: 36*4,
    zIndex: 1100,
  },
  hCol4xl: {  // used only when in edit mode
    left: 36*5+6,
    zIndex: 1100,
  },
  col0: {
    left: 36*0,
    position: 'sticky',
    zIndex: 1000,
    background: theme.palette.primary.contrastText
  },
  col1: {
    left: 36*1,
    position: 'sticky',
    zIndex: 1000,
    background: theme.palette.primary.contrastText
  },
  col2: {
    left: 36*2,
    position: 'sticky',
    zIndex: 1000,
    background: theme.palette.primary.contrastText
  },
  col3: {
    left: 36*3,
    position: 'sticky',
    zIndex: 1000,
    background: theme.palette.primary.contrastText
  },
  col3xl: {
    left: 36*4+6,
    position: 'sticky',
    zIndex: 1000,
    background: theme.palette.primary.contrastText
  },
  col4: {
    left: 36*4,
    position: 'sticky',
    zIndex: 1000,
    background: theme.palette.primary.contrastText
  },
  col4xl: {  // used only when in edit mode
    left: 36*5+6,
    position: 'sticky',
    zIndex: 1000,
    background: theme.palette.primary.contrastText
  },
  tableSize: {
    // width: '100%',
    maxHeight: 530,
    minHeight: 400,
    overflowX: 'auto',

  },
  actionButtons: {
    padding: 6,
    color: theme.palette.secondary.main,
  },
  spreadActions: {
    display: 'flex',
    flexGrow: 1
  },
  listItemText: {
    minWidth: 'inherit'
  },
  listInset: {
    minWidth: 'inherit',
    // '&:first-child': {
    //   paddingLeft:24,
    // },
  },
  dropHeader: {

  },
  listHeader: {
    // fontSize: 30,
    // textAlign: 'right',
    // background: theme.palette.secondary.dark,
    fontWeight: 600,
    color: theme.palette.secondary.contrastText,
    // paddingTop: 8,
    // marginTop: 0,
    // width: '100%',
    // height: '100%',
    backgroundColor: theme.palette.secondary.main
  },
  listHeaderColumn: {
    [theme.breakpoints.up("xs")]: {
      fontSize: 13,
    },
    [theme.breakpoints.up("md")]: {
      fontSize: 16,
    },
    cursor: 'default',
    // textAlign: 'center',
    // background: theme.palette.secondary.dark,
    // fontWeight: 600,
    // color: theme.palette.secondary.contrastText,
    // paddingTop: 8,
    // marginTop: 0,
    // width: '100%',
    // height: '100%',
  },
  inspFieldRow: {
    padding: 20,
    // paddingBottom: 20
  },

});

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
}

const getItemStyle = (isDragging, draggableStyle, theme, width) => {
  // console.log('getItemStyle', isDragging, draggableStyle.transform)
  return ({
    // styles we need to apply on draggables
    ...draggableStyle,

    ...(isDragging && {
        // background: "rgb(200,200,200)",
        background: theme.palette.primary.light,
        // padding: '10px 20px',
        // verticalAlign: 'middle',
        display: 'flex',
        alignItems: 'center',
        // transition: 'transform 300ms',
        transform: `${draggableStyle.transform} rotate(-3deg)`,
        minWidth: width

    }),
    minWidth: width
  })
}

const toTitleCase = (str) => {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

export const FieldGroup = withStyles(styles, { withTheme: true })(
(props) => {
  const { classes, fieldGroup, removeScope, theme } = props;
  // console.log(fieldGroup);
  switch(fieldGroup.name) {
    case 'soil':
      return soilFG(props);
      // break;
    default:
      return (

        <Grid container justify='center'>
          <Grid item xs={12} style={ {marginTop: 20, paddingBottom: 0, borderTop: '1px solid black'} }>
          {/*<AppBar position='static' color='default'>*/}
          <Toolbar variant='dense' className={classes.toolbar}>
            <Typography align='left' style={{fontWeight: 500}} className={classes.titleFG}>
              {removeScope &&
                <Tooltip title='Remove scope item' aria-label='Remove'>
                  <Fab color='secondary' className={classes.fabMinus}
                     onClick={()=>removeScope(props.arrID)}
                  >
                    <Minus className={classes.minus}/>
                  </Fab>
                </Tooltip>
              }
              {fieldGroup.label}
            </Typography>
            <div className={classes.grow} />
            {(fieldGroup.name === 'story'||fieldGroup.name === 'vol_single_project') &&
              <Tooltip title={'Manage Revisions'} aria-label='Manage Revisions'>
                <Fab size='small' color='secondary' aria-label='Manage Revisions' className={classes.revButton} onClick={props.reviseProject}>
                  <DesignRevSvg size={26} color={theme.palette.secondary.contrastText} />
                  {/*<TrackChangesIcon className={classes.settings} />*/}
                </Fab>
              </Tooltip>
            }
            {/*
            <Tooltip title={`Manage ${fieldGroup.label} fields`} aria-label='Settings'>
            <IconButton aria-label='Field Group Settings' onClick={()=>handleSettings(fieldGroup)}>
              <SettingsIcon className={classes.settings} />
            </IconButton>
            </Tooltip>
            */}
          </Toolbar>
          {/*</AppBar>*/}
          </Grid>
        </Grid>

      )
  }
}
);

const soilFG = (props) => {
  const { classes, fieldGroup, theme } = props;

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
}

export const FieldGroupTabular = withStyles(styles, { withTheme: true })(
class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [],
      rows: []
    };

    this.initState = {...this.state};
  }

  componentDidMount = () => {

    const columns = this.props.fieldGroup.children.map(c => {

      const resizable = c.resizable === 'Y'?true:false;
      const isEditable = c.name === 'job_number'?false:true;
      const formatter = c.column_formatter === 'jobColFormatter'?this.jobNumColFormatter:
        c.column_formatter === 'centerColFormatter'?this.centerColFormatter:
        this.colFormatter;

      return {...c,
        key: c.name,
        resizable: resizable,
        draggable: true,
        editable: isEditable,
        formatter: formatter,
        headerRenderer: this.headerColFormatter(c.label)}
    });

    this.setState({ columns: columns });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log('gDSFP');

    // if (prevState.rows.length === 0) {
      const { data } = nextProps;
      // console.log('gDSFP: nextProps', data.findResults, prevState);

      return {rows: data.findResults};
    // }
    // return prevState;

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

  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    // console.log('onGridRowsUpdated',fromRow,toRow,updated);

    const rows = [...this.state.rows];
    for (let i = fromRow; i <= toRow; i++) {
      rows[i] = { ...rows[i], ...updated };
      // console.log('onGridRowsUpdated',rows[i]);
    }
    this.setState({ rows: rows });

    // this.setState(state => {
    //   console.log('onGridRowsUpdated',state);
    //   const rows = state.rows.slice();
    //   console.log('onGridRowsUpdated',rows);
    //
    //   for (let i = fromRow; i <= toRow; i++) {
    //     rows[i] = { ...rows[i], ...updated };
    //     console.log('onGridRowsUpdated',rows[i]);
    //   }
    //   return { rows: rows };
    // });
  };

  // sortRows = (initialRows, sortColumn, sortDirection) => rows => {
  //   const comparer = (a, b) => {
  //     if (sortDirection === "ASC") {
  //       return a[sortColumn] > b[sortColumn] ? 1 : -1;
  //     } else if (sortDirection === "DESC") {
  //       return a[sortColumn] < b[sortColumn] ? 1 : -1;
  //     }
  //   };
  //   return sortDirection === "NONE" ? initialRows : [...rows].sort(comparer);
  // };

  render() {
    const { classes, fieldGroup, parentState } = this.props;
    // const [rows, setRows] = useState(data.findResults);
    // console.log('FG tabular state', fieldGroup, this.state);
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
            rowGetter={i => this.state.rows[i]}
            rowsCount={this.state.rows.length}
            minHeight={36*(this.state.rows.length+1)}
            // rowGetter={i => rows[i]}
            // rowsCount={rows.length}
            // minHeight={36*(rows.length+1)}
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
            onGridRowsUpdated={this.onGridRowsUpdated}
            enableCellSelect={true}
            // onGridSort={(sortColumn, sortDirection) =>
            //   setRows(this.sortRows(data.findResults, sortColumn, sortDirection))
            // }

          />
        </DraggableContainer>
        </Paper>
        </Grid>

      </Grid>

    )
  }  // render
});

// Table Column Bar is the Droppable area.  Procedure uses implicit return.
const DroppableComponent = (onDragEnd: (result, provided) => void, classes) => (props) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId={'1'} direction="horizontal">
      {(provided) => {
        // console.log('Droppable', classes);
        return (
          <tr ref={provided.innerRef} {...provided.droppableProps} {...props} className={classes.dropHeader}>
            {props.children}
            {provided.placeholder}
          </tr>
        );
      }}
    </Droppable>
  </DragDropContext>
);

// Each Column is draggable.  Procedure uses implicit return.
const DraggableComponent = (id, index, theme, width) => (props) => {
  // console.log('Draggable props', props, width);
  return (
  <Draggable draggableId={id} index={index}>
    {(provided, snapshot) => {
      // console.log('Draggable vars', provided, snapshot);
      return (
        <td
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style, theme, width)}
          {...props}
        >
          {props.children}
        </td>
      )
    }}
  </Draggable>
  )
};

const ChildDetailTable = (props) => {
  const { pIdx, pRow, subGroupKey, subFG, state } = props;

  if ( !(state.expand[pIdx] && subGroupKey) ) return null;

  // this is the subtable.  Show if you expand and subTable
  // info is passed.
  return (
    <Fade in={true} timeout={1000}>
      <TableRow>
        <TableCell colSpan={state.columns.length+4} >
          <Table>
            <TableHead>
              <TableRow >
                {subFG.children.map((c,i)=>{
                  return (
                    <TableCell key={i}>
                      {c.label}
                    </TableCell>
                  )
                  })
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {pRow[subGroupKey].map((obj,si)=>(
                <TableRow key={si}>
                  {subFG.children.map((c,i)=>{
                    return (
                      <TableCell key={i}>
                        {obj[c.name]}
                      </TableCell>
                    )
                    })
                  }
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableCell>
      </TableRow>
    </Fade>
  )
}

export const MaterialTabularFG = withStyles(styles, { withTheme: true })(
class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: this.props.fieldGroup.children,
      expand: [],
      editedRows: [],
    };

    this.initState = {...this.state};

    this.INIT_REC = {
      change: 'add',
      id: null,
      created_by: this.props.parentState.created_by,
      last_updated_by: this.props.parentState.last_updated_by,
    };

  }

  componentDidMount = () => {
    // console.log('CDM', this.props.fieldGroup.children);
    let edited = [...this.state.editedRows];
    if (this.props.allowAdd) {
      // this.theData.unshift({});
      edited.unshift(this.INIT_REC);
    }
    this.setState({ columns: this.props.fieldGroup.children, editedRows: edited });
  }

  onRowSelected = row => {
    // console.log('onRowSelected', row);
    let selected = [...this.props.parentState.selectedIndexes];
    selected[0] = selected[0] === row?null:row;
    this.props.updateState({ selectedIndexes: selected  });

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

  onDragEnd = (result) => {
      // dropped outside the list
      if (!result.destination) {
        return
      }
      // console.log(`dragEnd ${result.source.index} to  ${result.destination.index}`)
      const items = reorder(
        this.state.columns,
        result.source.index,
        result.destination.index
      )

      this.setState({
        columns: items
      })
  }

  handleExpand = (row)=> {
    let expandArr = [...this.state.expand];
    expandArr[row] = expandArr[row]?false:true;
    this.setState({ expand: expandArr });
  }

  handleRowChange = (updatedValues, arrID)=> {
    // console.log('handleRowChange', updatedValues);
    if (updatedValues.openDupsDialog) {
      // console.log('opening dups dialog');
      this.props.updateState({...updatedValues, dupRec: this.state.editedRows[arrID]});
    }

    let edited = [...this.state.editedRows];
    edited[arrID] = {...edited[arrID], ...updatedValues};
    this.setState({ editedRows: edited });
    // this.props.handleRowChange(updatedValues, arrID);
  }

  handleEdit = (row)=> {
    let edited = [...this.state.editedRows];
    // trying to do a deep copy here.  Copying scope separately since it is an
    // array by itself.
    // const scope = edited[row]?[...edited[row].scope]:[...this.props.data[row].scope];
    const editRow = edited[row]?edited[row]:{...this.props.data[row]};
    // const theRow = Object.assign({}, {...editRow}, {scope: scope});
    const theRow = Object.assign({}, {...editRow, change: editRow.id?'edit':'add'});

    edited[row] = {...theRow}
    // console.log('handleEdit... edited', edited[row], Object.keys(edited));
    this.setState({ editedRows: edited });
    // this.props.handleEdit(row);
  }

  handleSave = (row, andCommit = false)=> {
    // console.log('Save project ', this.state.editedRows[row]);
    // updating local state.
    let edited = [...this.state.editedRows];
    edited[row] = this.props.allowAdd && row===0?this.INIT_REC:undefined;

    // we pass one row.  However, it is received as an Array
    // in case we want to pass a group of rows.
    // see handleSaveAll
    let rowToPass = [];
    rowToPass.push(this.state.editedRows[row]);

    this.setState({ editedRows: edited });
    this.props.handleSave(rowToPass, andCommit);

  }

  handleDelete = (row)=> {
    // console.log('FG: Delete project field group', row);
    this.props.handleDelete(row);
  }

  handleCancel = (row)=> {
    let edited = [...this.state.editedRows];
    edited[row] = undefined;
    // console.log('handleCanel... edited', edited, Object.keys(edited));

    this.setState({ editedRows: edited });
    // this.props.handleCancel(row);
  }

  render() {
    const { classes, theme, fieldGroup, data, parentState, subGroupKey
      , subFG, fgTools, saveHelp, editHelp, deleteHelp } = this.props;
    // console.log('FG tabular state', fieldGroup, data, this.state.columns);
    // console.log('FG tabular state sub table', subGroupKey, subFG);

    // const editedRows = this.state.editedRows.filter(r=>{
    //   if (r) return r;
    //   return null;
    // });
    // const editActive = editedRows.length>0?true:false;
    // console.log('FG tabular edited rows', editedRows);


    // Code to set the column widths correctly based on which columns are active.
    let hdr0 = classes.hCol0, hdr1 = classes.hCol1, hdr2 = classes.hCol2, hdr3 = classes.hCol3;
    let clm0 = classes.col0, clm1 = classes.col1, clm2 = classes.col2, clm3 = classes.col3;
    if (!subGroupKey && !parentState.selectedIndexes) {
      hdr2 = classes.hCol0; hdr3 = classes.hCol1;
      clm2 = classes.col0; clm3 = classes.col1;
    } else if (!subGroupKey) {
      hdr1 = classes.hCol0; hdr2 = classes.hCol1; hdr3 = classes.hCol2;
      clm1 = classes.col0; clm2 = classes.col1; clm3 = classes.col2;
    } else if (!parentState.selectedIndexes) {
      hdr0 = classes.hCol0; hdr2 = classes.hCol1; hdr3 = classes.hCol2;
      clm0 = classes.col0; clm2 = classes.col1; clm3 = classes.col2;
    }

    return (
      <Grid container justify='center'>
        <Grid item xs={12} style={ this.props.fgStyles? this.props.fgStyles:{marginTop: 0, marginBottom: 0, borderTop: '0px solid black'} }>
          <Toolbar variant='dense' className={classes.toolbar}>
            <Typography align='left' style={{fontWeight: 500}} className={classes.titleFG}>
              {fieldGroup.label}
            </Typography>
            <div className={classes.grow} />
            {fgTools?fgTools():null}
          </Toolbar>
        </Grid>

        <Grid item xs={12}>
        <Paper className={classes.tableSize}>
          <Table>
            <TableHead>
              <TableRow component={DroppableComponent(this.onDragEnd, classes)}>
                {subGroupKey &&
                  <TableCell padding='checkbox' classes={{root: `${classes.tableCellHeaderProps} ${hdr0}`}}/>
                }
                {parentState.selectedIndexes &&
                  <TableCell padding='checkbox' classes={{root: `${classes.tableCellHeaderProps} ${hdr1}`}}/>
                }
                <TableCell padding='checkbox' classes={{root: `${classes.tableCellHeaderProps} ${hdr2}`}}/>
                <TableCell padding='checkbox' classes={{root: `${classes.tableCellHeaderProps} ${hdr3}`}}/>

                {this.state.columns.map((c,i)=>(
                  <TableCell
                    key={c.name}
                    component={DraggableComponent(c.name, i, theme, c.column_width)}
                    // padding='none'
                    align='center'
                    classes={{root: `${classes.tableCellProps} ${classes.tableCellHeaderProps}`}}
                  >
                    {c.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody >
              {data.map((r,ri)=>{
                // let childRec = {};
                // if (parentState.scope) {
                //   childRec = r.scope.find(s=>s.scope === parentState.scope);
                // }
                // console.log('row',r, childRec);
                return (
                  <Fragment key={ri}>
                  <TableRow key={ri}>
                    {subGroupKey &&
                    <TableCell padding='checkbox' className={`${classes.tableActionProps} ${clm0}`}>
                      <IconButton aria-label='Expand'
                        onClick={()=>this.handleExpand(ri)}
                        className={classes.actionButtons}
                      >
                        {this.state.expand[ri] ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </TableCell>
                    }
                    {parentState.selectedIndexes &&
                    <TableCell padding='checkbox' className={`${classes.tableActionProps} ${clm1}`}>
                      <Checkbox
                        onChange={()=>this.onRowSelected(ri)}
                        // checked={parentState.selectedIndexes[0]===ri}
                        className={classes.actionButtons}
                      />
                    </TableCell>
                    }

                    <TableCell padding='checkbox' className={`${classes.tableActionProps} ${clm2}`}>
                      {!this.state.editedRows[ri] && //parentState.editMode[ri]
                      <Tooltip title={editHelp?editHelp:'Edit the project here'} aria-label='Edit the project here'>
                      <IconButton aria-label='Expand'
                        onClick={()=>this.handleEdit(ri)}
                        className={classes.actionButtons}
                      >
                        <Edit />
                      </IconButton>
                      </Tooltip>
                      }
                      {this.state.editedRows[ri] && //parentState.editMode[ri]
                      <Tooltip title={saveHelp?saveHelp:'Just Save the project.  Changes not sent to Trello or Box yet.  Project status will be PENDING'} aria-label='Just Save the project.  Changes not sent to Trello or Box yet.  Project status will be PENDING'>
                        <IconButton aria-label='Expand'
                          onClick={()=>this.handleSave(ri)}
                          className={classes.actionButtons}
                        >
                          <Save />
                        </IconButton>
                      </Tooltip>
                      }
                    </TableCell>
                    <TableCell padding='checkbox' className={`${classes.tableActionProps} ${clm3}`}>
                    {!this.state.editedRows[ri] && //parentState.editMode[ri]
                      <Tooltip title={deleteHelp?deleteHelp:'Delete the project'} aria-label='Delete the project'>
                        <IconButton aria-label='Expand'
                          onClick={()=>this.handleDelete(ri)}
                          className={classes.actionButtons}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                      }
                      {this.state.editedRows[ri] && !(this.props.allowAdd && ri === 0) && //parentState.editMode[ri]
                      <Tooltip title='Cancel changes' aria-label='Cancel changes'>
                        <IconButton aria-label='Expand'
                          onClick={()=>this.handleCancel(ri)}
                          className={classes.actionButtons}
                        >
                          <Cancel />
                        </IconButton>
                      </Tooltip>
                      }
                    </TableCell>

                    {this.state.columns.map((c,ci)=>{
                      if (this.state.editedRows[ri]) {
                        return (
                        <TableCell
                          key={ci}
                          // padding='none'
                          classes={{root: `${classes.tableCellProps}`}}
                        >
                        <ColumnContainer
                          key={ci}
                          field = {c}
                          childArrID = {false}
                          // state = {parentState.editedRows[ri]}
                          state = {this.state.editedRows[ri]}
                          updateState = {(updatedValues)=>this.handleRowChange(updatedValues, ri)}
                          dupCheck={false} // turn on dup check
                          // turns off updating job number and creating client,city,sub via list
                          searchMode={false}
                          // props that are not used.
                          handleListChange={false}
                          handleFocus={false}
                          handleBlur={false}
                          // call to create new client, city, sub
                          createDialogValue={false}
                          altLookups={parentState.altLookups}

                          // props functions in container
                          // searchForDups
                          // loadFind
                          // loadMessage
                        />
                        </TableCell>
                        )
                      } else {
                        return (
                          <TableCell
                            key={ci}
                            // padding='none'
                            classes={{root: classes.tableCellProps}}
                          >
                            {r[c.name]}
                          </TableCell>
                        )
                      }

                    }) }
                  </TableRow>
                  {subGroupKey &&
                  <ChildDetailTable
                    pIdx={ri}
                    pRow={r}
                    subGroupKey={subGroupKey}
                    subFG={subFG}
                    state={this.state}
                  />
                  }
                  </Fragment>
                )
              })}
            </TableBody>
          </Table>
        </Paper>
        </Grid>

      </Grid>

    )
  }  // render
}
)  // end of the withStyles wrapper

export const SearchTabularFG = withStyles(styles, { withTheme: true })(
class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [],
      expand: [],
      // editMode: [],
      scopeToParent: null,
      // data: [],
      editedRows: [],
    };

    this.initState = {...this.state};
  }

  componentDidMount = () => {
    this.setState({
      columns: this.props.fieldGroup.children,
      scopeToParent: null,
      // data: this.props.data,

    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log('gDSFP');
    const { fieldGroup, parentState, subFG } = nextProps;
    // console.log('gDSFP: SearchTabularFG', parentState, subFG, prevState);

    if (prevState.scopeToParent !== parentState.scope) {
      var columns = null;
      if (parentState.scope !== null) {
        // fixing revision description
        // const sFields = [...subFG.children];
        const sFields = subFG.children.map(s => { return {...s, scope_field: true} });

        const idx = sFields.findIndex(f=>f.name==='revision_desc');
        sFields[idx].name = 'revision_desc_scope';
        columns = [...fieldGroup.children, ...sFields];
      } else {
        columns = [...fieldGroup.children];
      }
      // console.log('gDSFP: columns', columns);
      return { scopeToParent:parentState.scope, columns:columns }
    }
    return null;
  }

  onRowSelected = row => {
    // console.log('onRowSelected', row);
    let selected = [...this.props.parentState.selectedIndexes];
    selected[0] = selected[0] === row?-1:row;
    this.props.updateState({ selectedIndexes: selected  });

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

  onDragEnd = (result) => {
      // dropped outside the list
      if (!result.destination) {
        return
      }
      // console.log(`dragEnd ${result.source.index} to  ${result.destination.index}`)
      const items = reorder(
        this.state.columns,
        result.source.index,
        result.destination.index
      )

      this.setState({
        columns: items
      })
  }

  handleExpand = (row)=> {
    let expandArr = [...this.state.expand];
    expandArr[row] = expandArr[row]?false:true;
    this.setState({ expand: expandArr });
  }

  handleRowChange = (updatedValues, arrID)=> {
    // console.log('handleRowChange', updatedValues);
    // if (updatedValues.openDupsDialog) {
    //   // console.log('opening dups dialog');
    //   this.props.updateState({...updatedValues, dupRec: this.state.editedRows[arrID]});
    // }

    let edited = [...this.state.editedRows];
    edited[arrID] = {...edited[arrID], ...updatedValues};
    this.setState({ editedRows: edited });
    // this.props.handleRowChange(updatedValues, arrID);
  }

  handleEdit = (row)=> {
    let edited = [...this.state.editedRows];
    // trying to do a deep copy here.  Copying scope separately since it is an
    // array by itself.
    const scope = edited[row]?[...edited[row].scope]:[...this.props.data[row].scope];
    const editRow = edited[row]?edited[row]:{...this.props.data[row]};
    const theRow = Object.assign({}, {...editRow}, {scope: scope});

    edited[row] = {...theRow}
    // console.log('handleEdit... edited', edited[row], Object.keys(edited));
    this.setState({ editedRows: edited });
    // this.props.handleEdit(row);
  }

  handleCancel = (row)=> {
    let edited = [...this.state.editedRows];
    edited[row] = undefined;
    // console.log('handleCanel... edited', edited, Object.keys(edited));

    this.setState({ editedRows: edited });
    // this.props.handleCancel(row);
  }

  handleSave = (row, andCommit = false)=> {
    // console.log('Save project ', this.state.editedRows[row]);
    // updating local state.
    let edited = [...this.state.editedRows];
    edited[row] = undefined;

    // we pass one row.  However, it is received as an Array
    // in case we want to pass a group of rows.
    // see handleSaveAll
    let rowToPass = [];
    rowToPass.push(this.state.editedRows[row]);

    this.setState({ editedRows: edited });
    this.props.handleSave(rowToPass, andCommit);

  }

  handleSaveAll = ()=> {
    // console.log('Save project ', updatedRow);
    // squeezing the array and getting rid of the undefined rows.
    let rowsToPass = this.state.editedRows.filter(r=>{
      if (r) return r;
      return null;
    });
    // console.log('handleSaveAll', rowsToPass);
    this.props.handleSave(rowsToPass);
  }

  handleDelete = (row)=> {
    // console.log('Delete project ', row);
    this.props.handleDelete(row);
  }

  render() {
    const { classes, theme, fieldGroup, data, parentState
      , subGroupKey, subFG, fgTools } = this.props;
    // console.log('FG tabular state', this.state);
    // console.log('FG tabular state sub table', subGroupKey, subFG);
    const editedRows = this.state.editedRows.filter(r=>{
      if (r) return r;
      return null;
    });
    const editActive = editedRows.length>0?true:false;
    // console.log('Active edits?', editActive);

    return (
      <Grid container justify='center'>
        <Grid item xs={12} style={ {marginTop: 10, marginBottom: 10, borderTop: '1px solid black'} }>
          <Toolbar variant='dense' className={classes.toolbar}>

            {data.length>0?
              <Tooltip placement="top-start" title={`Default limit 200.  Override by a) Find field 'limit:[value]' or b) Last Updated drop down`} aria-label='default limit 200'>
                <Typography align='left' style={{fontWeight: 500}} className={classes.titleFG}>
                  {`${fieldGroup.label} (${data.length} results)`}
                </Typography>
              </Tooltip>
            :
            <Typography align='left' style={{fontWeight: 500}} className={classes.titleFG}>
              {fieldGroup.label}
            </Typography>
            }

            <div className={classes.grow} />
            {fgTools?fgTools():null}
          </Toolbar>
        </Grid>

        <Grid item xs={12}>
        <Paper className={classes.tableSize}>
          <Table  >
            <TableHead>
              <TableRow component={DroppableComponent(this.onDragEnd, classes)} >
                <TableCell padding='checkbox' classes={{root: `${classes.tableCellHeaderProps} ${classes.hCol0}`}}/>
                <TableCell padding='checkbox' classes={{root: `${classes.tableCellHeaderProps} ${classes.hCol1}`}}/>
                <TableCell padding='checkbox' classes={{root: editActive?`${classes.tableCellHeaderProps} ${classes.hCol2xl}`:`${classes.tableCellHeaderProps} ${classes.hCol2}`}}/>
                <TableCell padding='checkbox' classes={{root: editActive?`${classes.tableCellHeaderProps} ${classes.hCol3xl}`:`${classes.tableCellHeaderProps} ${classes.hCol3}`}}/>
                {this.state.columns.map((c,i)=>(
                  <TableCell
                    key={c.name}
                    component={DraggableComponent(c.name, i, theme, c.column_width)}
                    // padding='none'
                    align='center'
                    classes={{root: i===0?editActive?`${classes.lockCellProps} ${classes.tableCellHeaderProps} ${classes.hCol4xl}`:`${classes.lockCellProps} ${classes.tableCellHeaderProps} ${classes.hCol4}`:`${classes.tableCellProps} ${classes.tableCellHeaderProps}`}}
                  >
                    {c.label}
                  </TableCell>
                ))}

              </TableRow>
            </TableHead>
            <TableBody >
              {data.map((r,ri)=>{
                var childID = -1;  // this happens to be the no value for findIndex.
                if (this.state.scopeToParent) {
                  childID = r.scope.findIndex(s=>s.scope === this.state.scopeToParent);
                }
                return (
                  <Fragment key={ri}>
                  <TableRow key={ri}>
                    <TableCell padding='checkbox' className={`${classes.tableActionProps} ${classes.col0}`}>
                      <IconButton aria-label='Expand'
                        onClick={()=>this.handleExpand(ri)}
                        className={classes.actionButtons}
                      >
                        {this.state.expand[ri] ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </TableCell>
                    <TableCell padding='checkbox' className={`${classes.tableActionProps} ${classes.col1}`}>
                      <Tooltip title='Works in conjunction with EDIT button.  Edit the project in full screen mode.' aria-label='Edit the project in full screen mode'>
                      <Checkbox
                        onChange={()=>this.onRowSelected(ri)}
                        checked={parentState.selectedIndexes[0]===ri}
                        className={classes.actionButtons}
                      />
                      </Tooltip>
                    </TableCell>
                    <TableCell padding='checkbox' className={`${classes.tableActionProps} ${classes.col2}`}>
                      {!this.state.editedRows[ri] && //parentState.editMode[ri]
                      <Tooltip title='Edit the project here' aria-label='Edit the project here'>
                      <IconButton aria-label='Expand'
                        onClick={()=>this.handleEdit(ri)}
                        className={classes.actionButtons}
                      >
                        <Edit />
                      </IconButton>
                      </Tooltip>
                      }
                      {this.state.editedRows[ri] && //parentState.editMode[ri]
                      <Grid item className={classes.spreadActions}>
                      <Tooltip title='Just Save the project.  Changes not sent to Trello or Box yet.  Project status will be PENDING' aria-label='Just Save the project.  Changes not sent to Trello or Box yet.  Project status will be PENDING'>
                        <IconButton aria-label='Expand'
                          onClick={()=>this.handleSave(ri)}
                          className={classes.actionButtons}
                        >
                          <Save />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title='Save the project and make updates to downstream systems like Trello and Box.  Project status will be ACTIVE' aria-label='Save the project and make updates to downstream systems like Trello and Box.  Project status will be ACTIVE'>
                        <IconButton aria-label='Expand'
                          onClick={()=>this.handleSave(ri,true)}
                          className={classes.actionButtons}
                        >
                          <SaveUpload size={30} color={theme.palette.secondary.main} />
                        </IconButton>
                      </Tooltip>
                      </Grid>
                      }
                    </TableCell>
                    <TableCell padding='checkbox' className={editActive?`${classes.tableActionProps} ${classes.col3xl}`:`${classes.tableActionProps} ${classes.col3}`}>
                    {!this.state.editedRows[ri] && //parentState.editMode[ri]
                      <Tooltip title='Delete the project' aria-label='Delete the project'>
                        <IconButton aria-label='Expand'
                          onClick={()=>this.handleDelete(ri)}
                          className={classes.actionButtons}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                      }
                      {this.state.editedRows[ri] && //parentState.editMode[ri]
                      <Tooltip title='Cancel changes' aria-label='Cancel changes'>
                        <IconButton aria-label='Expand'
                          onClick={()=>this.handleCancel(ri)}
                          className={classes.actionButtons}
                        >
                          <Cancel />
                        </IconButton>
                      </Tooltip>
                      }
                    </TableCell>

                    {this.state.columns.map((c,ci)=>{
                      // console.log('column',r.job_number, c.name);
                      // console.log(r && c.name in r && c.name!=='scope'?r[c.name]:'');
                      // console.log(childRec && c.name in childRec?childRec[c.name]:'');
                      // if (parentState.editMode[ri]) {
                      if (this.state.editedRows[ri] && (!c.scope_field || (c.scope_field && childID>-1))) {
                        // console.log('edit mode',this.state.editedRows[ri]);
                        return (
                        <TableCell
                          key={ci}
                          // padding='none'
                          classes={{root: ci===0?editActive?`${classes.lockCellProps} ${classes.col4xl}`:`${classes.lockCellProps} ${classes.col4}`:`${classes.tableCellProps}`}}
                        >
                        <ColumnContainer
                          key={ci}
                          field = {c}
                          childArrID = {c.scope_field?childID:false}
                          // state = {parentState.editedRows[ri]}
                          state = {this.state.editedRows[ri]}
                          updateState = {(updatedValues)=>this.handleRowChange(updatedValues, ri)}
                          dupCheck={true} // turn on dup check
                          // turns off updating job number and creating client,city,sub via list
                          searchMode={true}
                          // props that are not used.
                          handleListChange={false}
                          handleFocus={false}
                          handleBlur={false}
                          // call to create new client, city, sub
                          createDialogValue={false}

                          // props functions in container
                          // searchForDups
                          // loadFind
                          // loadMessage
                        />
                        </TableCell>
                        )
                      } else if (this.state.editedRows[ri] && c.scope_field && childID === -1) {
                        return (
                          <TableCell
                            key={ci}
                            // padding='none'
                            classes={{root: ci===0?editActive?`${classes.lockCellProps} ${classes.col4xl}`:`${classes.lockCellProps} ${classes.col4}`:`${classes.tableCellProps}`}}
                          />
                        )
                      } else {
                        return (
                          <TableCell
                            key={ci}
                            // padding='none'
                            classes={{root: ci===0?editActive?`${classes.lockCellProps} ${classes.col4xl}`:`${classes.lockCellProps} ${classes.col4}`:`${classes.tableCellProps}`}}
                          >
                            {r && c.name!=='scope' && c.name in r?r[c.name]:
                            childID>-1 && c.name in r.scope[childID]?r.scope[childID][c.name]:
                            childID>-1 && c.name === 'revision_desc_scope' && 'revision_desc' in r.scope[childID]?r.scope[childID]['revision_desc']:
                            ''
                            }
                          </TableCell>
                        )
                      }

                      })
                    }

                  </TableRow>

                  <ChildDetailTable
                    pIdx={ri}
                    pRow={r}
                    subGroupKey={subGroupKey}
                    subFG={subFG}
                    state={this.state}
                  />

                  </Fragment>
                )
              })}
            </TableBody>
          </Table>
        </Paper>
        </Grid>
      </Grid>

    )
  }  // render
}
)  // end of the withStyles wrapper

export const DefaultFG = withStyles(styles, { withTheme: true })(
(props) => {
  const { classes, fieldGroup, state, updateState, hide
    , fgTools, fieldTools, findAction, noBorder, noLabel } = props;
  // const { classes, theme, fieldGroup, state, updateState, hide, fgTools, fieldTools } = props;
  // const { classes, theme, fieldGroup, toggleScopeDialog, removeScope, dialogState, scopeID, updateState } = props;
  // console.log('DefaultFG', findAction);

  if (hide) return null;  // hide the field group.

  return (
    <Grid container>
      <Grid item xs={12} style={ noBorder?{marginTop:0}:{marginTop: 10, marginBottom: 0, borderTop: '1px solid black'} }>
        <Toolbar variant='dense' className={classes.toolbar}>
          {!noLabel &&
          <Typography align='left' style={{fontWeight: 500}} className={classes.titleFG}>
            {fieldGroup.label}
          </Typography>
          }
          <div className={classes.grow} />
          {fgTools?fgTools():null}
        </Toolbar>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={16} justify='center'>
          {fieldGroup.children.map((field, id)=>{
            return (<Field2Container
              key={field.id}
              field = {field}
              arrID = {false}
              state = {state}
              updateState = {updateState}
              // find action.  Only used when searching an object, like
              // projects, geotechs, subdivisions, clients, etc.
              findAction={findAction}
              // turns off dup check, creating client,city,sub via list
              searchMode={true}
              // props that are not used.
              handleListChange={false}
              handleFocus={false}
              handleBlur={false}
              // call to create new client, city, sub
              createDialogValue={false}

              // props functions in container
              // searchForDups
              // loadFind
              // loadMessage
            />);
          })}
          <div className={fieldTools?classes.grow:null} />
          {/*<Grid item className={classes.growBigger}>*/}
            {fieldTools?fieldTools():null}
          {/*</Grid>*/}
        </Grid>
      </Grid>
    </Grid>
  )
}
)

export const DialogDefaultFG = withStyles(styles, { withTheme: true })(
(props) => {
  const { fieldGroup, dialogState, updateState } = props;
  // const { classes, theme, fieldGroup, toggleScopeDialog, removeScope, dialogState, scopeID, updateState } = props;
  // console.log(fieldGroup);

  return (
    <Grid container>
      <Grid item xs={12} style={ props.fgStyles? props.fgStyles:{marginTop: 20, marginBottom: 20, borderTop:'1px solid black'} }>
        <Typography align='left' style={{fontWeight: 500}}>
          {!props.hideLabel?fieldGroup.label:null}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={32}>
          {fieldGroup.children.map((field, id)=>{
            console.log('in DialogDefaultFG', field);
            return (<Field2Container
              key={field.id}
              field = {field}
              arrID = {false}
              state = {dialogState}
              updateState = {updateState}
              noGridWrap = {true}
              // props that are not used.
              loadFind={()=>{}}
              searchForDups={()=>{}}
              loadMessage={()=>{}}

            />);
          })}
        </Grid>
      </Grid>
    </Grid>

  )
}
)

export const RevUpdateFG = withStyles(styles, { withTheme: true })(
class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.initState = {...this.state};
  }

  handleClear = () => {
    // console.log('In handleClear');
    // this.setState({ open: !this.state.open })
    this.props.clearState();
  }

  handleSave = () => {
    // console.log('In handleSave');
    // this.setState({ open: !this.state.open });

    // the save function passed takes an array to allow saving multiple
    // rows at a time.
    const rows = [];
    rows.push(this.props.parentState)
    this.props.saveState(rows);
  }

  toggleCheckbox = () => {
    const { parentState, updateState } = this.props;
    updateState( { checkboxCopyDesc: !parentState.checkboxCopyDesc })
  }

  render() {
    const { fieldGroup, parentState, updateState } = this.props;
    // const { classes, theme, fieldGroup, dialogState, updateState } = this.props;
    // const { classes, theme, fieldGroup, toggleScopeDialog, removeScope, dialogState, scopeID, updateState } = props;
    // console.log('RevUpdateFG', dialogState.altLookups);
    let i=0;
    return (
      <Grid container>
        {/*<Grid item xs={12} style={ {marginTop: 20, marginBottom: 20, borderTop: '1px solid black'} }>
          <Typography align='left' style={{fontWeight: 500}}>
            {fieldGroup.label}
          </Typography>
        </Grid>*/}
        <Grid item xs={12}>
          <List dense={true}>
            <ListItem key={i} >
              {fieldGroup.children.map((field, id)=>{
                if (field.hidden === 'Y') return null;
                return (
                  <Field2Container
                    key={id}
                    // key={field.id}
                    field = {field}
                    arrID = {false}
                    state = {parentState}
                    updateState = {updateState}
                    altLookups={parentState.altLookups}
                    // props that are not used.
                    loadFind={()=>{}}
                    searchForDups={()=>{}}
                    loadMessage={()=>{}}
                  />);
              })}
              {/*}
              <Tooltip title='Cascade description to scope items' aria-label='Cascade Description'>
                <Checkbox
                  onChange={this.toggleCheckbox}
                  checked={dialogState.checkboxCopyDesc}
                />
              </Tooltip>
              */}
              <Tooltip title='Clear the selection' aria-label='Clear selection'>
                <IconButton aria-label='Clear' onClick={this.handleClear} color='secondary' >
                  <ClearIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title='Add Revison' aria-label='Add Revision'>
                <IconButton aria-label='Add' onClick={this.handleSave} color='secondary' >
                  <AddIcon size={30} />
                </IconButton>
              </Tooltip>
            </ListItem>
            {/*
              <Collapse in={this.state.open} timeout='auto'>
              {dialogState.scope.map((scope,scopeID)=>{
                return (
                  <ListItem key={i++}>
                  <ListItemText inset className={classes.listInset} primary={scope.label||toTitleCase(scope.scope)}/>
                  {fieldGroup.children.map((field, id)=>{
                    // console.log('child', field, scopeID);
                    if (field.hidden === 'Y') return null;
                    if (field.name === 'revision_price') return null; // don't show revision price at scope level
                    return (<Field2Container
                      // key={field.id*(scopeID+2)}
                      key={id}
                      field = {field}
                      arrID = {scopeID||scopeID===0?scopeID:false}
                      state = {dialogState}
                      updateState = {updateState}
                      // props that are not used.
                      loadFind={()=>{}}
                      searchForDups={()=>{}}
                      loadMessage={()=>{}}

                    />);
                  })}
                </ListItem>
                )
              })
              }
              </Collapse>
            */}

            <Divider />

          </List>

        </Grid>
      </Grid>
    )
  }  // render
}  // class
)  // end of the withStyles wrapper

export const RevHistoryFG = withStyles(styles, { withTheme: true })(
class extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    this.initState = {...this.state};
  }

  handleClick = (rev) => {
    this.setState({ [rev.revision]: !this.state[rev.revision] })
  }

  render() {
    const { fieldGroup, history } = this.props;
    // const { classes, theme, fieldGroup, toggleScopeDialog, removeScope, dialogState, scopeID, updateState } = props;
    // console.log('RevHistoryFG render', this.state, history);
    // let i=500;
    // return null;
    return (
      <Grid container>
        {/*<Grid item xs={12} style={ {marginTop: 20, marginBottom: 20, borderTop: '1px solid black'} }>
          <Typography align='left' style={{fontWeight: 500}}>
            {fieldGroup.label}
          </Typography>
        </Grid>*/}
        <Grid item xs={12}>
          <List dense={true}>
            {history.map((rev, rev_id) => {
              return (
                <Paper key={rev_id}>
                <ListItem>
                  {fieldGroup.children.map((field, id1)=>{
                    return (<ListItemText key={id1} style={{ width:field.column_width }} primary={rev[field.name]}/>);
                  })}
                  <IconButton aria-label='Expand' onClick={() => this.handleClick(rev)}>
                    {this.state[rev.revision] ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </ListItem>
                <Collapse in={this.state[rev.revision]} timeout='auto'>
                  {rev.scope.map((scope,scopeID)=>{
                    return (
                      <ListItem key={scopeID}>
                        <ListItemText inset style={{ width:0 }} primary={toTitleCase(scope.scope)}/>
                        {fieldGroup.children.map((field, id2)=>{
                          if (field.name === 'revision_desc') {
                            return (<ListItemText key={id2} style={{ width:field.column_width }} primary={scope[field.name]}/>)
                          }
                          return null;
                        })}
                      </ListItem>
                    )
                  })
                  }
                </Collapse>
                </Paper>
              )
            })}
          </List>
        </Grid>
      </Grid>
    )
  }  // render
}  // class
)  // end of the withStyles wrapper

export const ListTabularFG = withStyles(styles, { withTheme: true })(
class extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    this.initState = {...this.state};
  }

  handleClick = (item) => {
    this.setState({ [item.id]: !this.state[item.id] })
  }

  labelHeader = (field,fieldSupportsSort=true) => {
    const { theme, parentState } = this.props;
    const { sort } = parentState;

    return (
      sort&&fieldSupportsSort?
      <Fragment>
        {field.label}
        {field.name === sort.field?
          sort.direction==='A'?
          <SortAsc style={{marginLeft:5, verticalAlign:'text-bottom'}} size={20} color={theme.palette.secondary.contrastText} />
          : <SortDesc style={{marginLeft:5, verticalAlign:'text-bottom'}} size={20} color={theme.palette.secondary.contrastText} />
        : <Sort style={{marginLeft:5, verticalAlign:'text-bottom'}} size={20} color={theme.palette.secondary.contrastText} />
        }
      </Fragment>
      :
      <Fragment>{field.label}</Fragment>

    )
  }

  render() {
    const { classes, theme, title, titleStyles, fieldGroup
      , primaryFields, nestedFields, fgStyles, fgTools } = this.props;
    const { parentState, data, sort, handleAddEdit } = this.props;
    // const { classes, theme, fieldGroup, toggleScopeDialog, removeScope, dialogState, scopeID, updateState } = props;
    // console.log('ListTabular render', data);
    // let i=500;
    // return null;
    const listFields = primaryFields?primaryFields:fieldGroup.children;
    // const subFields = nestedFields?nestedFields:[];
    // console.log('ListTabular fields', primaryFields, listFields, nestedFields);
    return (
      <Grid container>
        <Grid item xs={12} style={ fgStyles? fgStyles:{marginTop: 0, marginBottom: 0, borderTop: '0px solid black'} }>
          <Toolbar variant='dense' className={classes.toolbar}>
            <Typography align='left' style={ titleStyles?titleStyles:{font: 'italic bold 20px "Roboto"',paddingBottom:20} } >
              {title?title:fieldGroup.label}
            </Typography>
            <div className={classes.grow} />
            {fgTools?fgTools():null}
          </Toolbar>
        </Grid>

        <Grid item xs={12}>
          <List dense={true}>
            <Paper classes={{root: classes.listHeader}} >
              <ListItem divider={true}>
                {listFields.map((field, id1)=>{
                  if (parentState.object === 'INSPECTION' && field.name === 'inspection_status') {
                    // console.log('testing, testing!');
                    return (
                      <ListItemText key={id1} onClick={()=>sort(field)} disableTypography={true} className={classes.listHeaderColumn} style={{ width:field.column_width, textAlign:'center' }} primary={this.labelHeader(field)}/>
                    );
                  }
                  if (parentState.object === 'INSPECTION' && field.name === 'inspection_reason') {
                    // console.log('testing, testing!');
                    return (
                      <ListItemText key={id1} onClick={()=>sort(field)} disableTypography={true} className={classes.listHeaderColumn} style={{ width:field.column_width }} primary={this.labelHeader(field,false)}/>
                    );
                  }
                  return (
                    <ListItemText key={id1} onClick={()=>sort(field)} disableTypography={true} className={classes.listHeaderColumn} style={{ width:field.column_width }} primary={this.labelHeader(field)}/>
                  );
                })}

              </ListItem>
            </Paper>
            {data.map((item, item_id) => {
              // console.log('*** items ***',item)
              let rStr = '';
              // const item_reason = item.reasons.map(r=>r.reason).toString();
              item.reasons.forEach(r=>rStr = rStr===''?r.reason:rStr+', '+r.reason);

              return (
                <Paper
                  key={item_id}
                  style={item.inspection_status===null?
                    {backgroundColor:'#fff9c4'}
                    :item.inspection_status==='F'?
                      {backgroundColor:'#ffcdd2'}
                      :item.inspection_status==='P'?
                        {backgroundColor:'#c8e6c9'}
                        :item.inspection_status==='C'?
                          {backgroundColor:'lightgray'}
                          :null}
                  onClick={handleAddEdit?(e)=>handleAddEdit(item):(e)=>this.handleClick(item)}
                >
                <ListItem divider={true}>
                  {listFields.map((field, field_id)=>{
                    // console.log('list item', field);
                    if (parentState.object === 'INSPECTION' && field.name === 'address1') {
                      // console.log('testing, testing!');
                      return (
                          <ListItemText key={field_id} style={{ width:field.column_width }} primary={
                            <span><b style={{fontWeight: 500}}>{item[field.name]}</b><b style={{fontWeight: 300}}>, {item.subdivision}, {item.city}</b></span>}/>
                      );
                    }
                    if (parentState.object === 'INSPECTION' && field.name === 'inspection_status') {
                      // console.log('testing, testing!');
                      return (<ListItemText key={field_id} style={{ width:field.column_width, textAlign:'center'}} primary={item[field.name]}/>);
                    }
                    if (parentState.object === 'INSPECTION' && field.name === 'job_number') {
                      // console.log('testing, testing!');
                      return (<ListItemText key={field_id} style={{ width:field.column_width}} primary={item['job_rev']}/>);
                    }
                    if (parentState.object === 'INSPECTION' && field.name === 'inspection_reason') {
                      // console.log('testing, testing!');
                      return (<ListItemText key={field_id} style={{ width:field.column_width, }} primary={rStr}/>);
                    }
                    return (<ListItemText key={field_id} style={{ width:field.column_width }} primary={item[field.name]}/>);
                  })}
                </ListItem>
                {nestedFields?
                <Collapse in={this.state[item.id]} timeout='auto'>
                  <ListItem >
                    {nestedFields.map((f2, id2)=>{
                      return (<ListItemText key={id2} disableTypography={true}  style={{ width:f2.column_width }} primary={this.labelHeader(f2,false)}/>)
                    })}
                  </ListItem>
                  <ListItem >
                    {nestedFields.map((f3, id3)=>{
                      return (<ListItemText key={id3} style={{ width:f3.column_width }} primary={item[f3.name]}/>)
                    })}
                  </ListItem>
                </Collapse>
                :null
                }
                </Paper>
              )
            })}
          </List>
        </Grid>
      </Grid>
    )
  }  // render
}  // class
)  // end of the withStyles wrapper

export const SimpleListView = withStyles(styles, { withTheme: true })(
(props) => {
  const { classes, label, fields, data, sort, deleteRow } = props;
  // const { classes, theme, fieldGroup, toggleScopeDialog, removeScope, dialogState, scopeID, updateState } = props;
  // console.log(fieldGroup);
  const labelHeader = (field,fieldSupportsSort=true) => {
    const { theme } = props;
    return (
      sort && fieldSupportsSort?
      <Fragment>
        {field.label}
        {field.name === sort.field?
          sort.direction==='A'?
          <SortAsc style={{marginLeft:5, verticalAlign:'text-bottom'}} size={20} color={theme.palette.secondary.contrastText} />
          : <SortDesc style={{marginLeft:5, verticalAlign:'text-bottom'}} size={20} color={theme.palette.secondary.contrastText} />
        : <Sort style={{marginLeft:5, verticalAlign:'text-bottom'}} size={20} color={theme.palette.secondary.contrastText} />
        }
      </Fragment>
      :
      <Fragment>{field.label}</Fragment>
    )
  }

  return (
    <Grid container>
      <Grid item xs={12} >
        <Toolbar variant='dense' className={classes.toolbar}>
          <Typography align='left' style={{font: 'italic bold 20px "Roboto"'} } className={classes.titleFG}>
            {label}
          </Typography>
        </Toolbar>
      </Grid>

      <Grid item xs={12}>
        <List dense={true}>
          <Paper classes={{root: classes.listHeader}} >
            <ListItem divider={true}>
              {deleteRow?
              <ListItemText
                disableTypography={true}
                style={{ fontSize:13,cursor:'default',width:40 }}
                primary={'Delete'}
              />
              :null
              }
              {fields.map((field, id1)=>{
                return (
                  <ListItemText
                    key={id1}
                    onClick={()=>sort(field)}
                    disableTypography={true}
                    style={field.name==='overflow'?
                      { fontSize:13,cursor:'default',width:field.column_width,flexGrow:1 }
                      :
                      { fontSize:13,cursor:'default',width:field.column_width }}
                    primary={labelHeader(field)}
                  />
                );
              })}

            </ListItem>
          </Paper>
          {data.map((item, item_id) => {
            if (item.change !== 'delete') {
            return (
              <Paper
                key={item_id}
              >
              <ListItem >
                {deleteRow?
                <ListItemText style={{ cursor:'default' }} primary={
                  <IconButton aria-label='Delete reason' color='secondary' style={{padding:4}} onClick={()=>deleteRow(item_id)}>
                    <Tooltip title='Delete reason'>
                      <Delete size='small'/>
                    </Tooltip>
                  </IconButton>}
                />
                :null
                }
                {fields.map((field, field_id)=>{
                  // console.log('list item', field);
                  return (<ListItemText
                    key={field_id}
                    style={field.name==='overflow'?
                      { width:field.column_width,flexGrow:1 }
                      :
                      { width:field.column_width, wordWrap:'break-word' }}
                    primary={item[field.name]}
                    />);
                })}
              </ListItem>
              </Paper>
            )}
          })}
        </List>
      </Grid>
    </Grid>
  )
}
)

// Has sorting capability.  Handles add and deletes.
export const SimpleSortListView = withStyles(styles, { withTheme: true })(
class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // data:[...this.props.data],
      sort:this.props.sort||{field:this.props.fields[0].name,
        data_type:this.props.fields[0].display_value_data_type?this.props.fields[0].display_value_data_type:this.props.fields[0].data_type,
        direction:'A'}
    };

    this.initState = {...this.state};
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log('SimpleNestedListView gDSFP');
  //   const { data } = nextProps;
  //
  //   // console.log('SimpleNestedListView gDSFP: data', data);
  //
  //   // return {data: data };
  //   return null;
  // }

  labelHeader = (field,fieldSupportsSort=true) => {
    const { theme, parentState } = this.props;

    return (
      // using data type to
      this.state.sort && field.hasOwnProperty('data_type') && fieldSupportsSort?
      <Fragment>
        {field.label}
        {field.name === this.state.sort.field?
          this.state.sort.direction==='A'?
          <SortAsc style={{marginLeft:5, verticalAlign:'text-bottom'}} size={20} color={theme.palette.secondary.contrastText} />
          : <SortDesc style={{marginLeft:5, verticalAlign:'text-bottom'}} size={20} color={theme.palette.secondary.contrastText} />
        : <Sort style={{marginLeft:5, verticalAlign:'text-bottom'}} size={20} color={theme.palette.secondary.contrastText} />
        }
      </Fragment>
      :
      <Fragment>{field.label}</Fragment>

    )
  }

  sort = (field) => {
    let direction = this.state.sort.direction;
    if (field.name === this.state.sort.field) {
      direction = this.state.sort.direction === 'A'?'D':'A'
    } else {
      direction = 'A'
    }

    // let sortData = [...this.state.data];
    // sortData.sort(this.sortIt(field, direction));

    this.setState({ sort:{field:field.name
      ,data_type:field.display_value_data_type?field.display_value_data_type:field.data_type
      ,direction:direction} });
  }

  sortIt = (f = null, t = null, d = null) => {
    const field = f?f:this.state.sort.field;
    const data_type = t?t:this.state.sort.data_type;
    const direction = d?d:this.state.sort.direction;
    // console.log('sortIt', field, data_type, direction);
    switch(data_type) {
      case 'text':
        // console.log('sort text');
        return (
          (a, b) => {
            const aStr = a[field] === null? '':a[field].toLowerCase();
            const bStr = b[field] === null? '':b[field].toLowerCase();
            if (direction === 'A') {
              return ((aStr < bStr) ? -1 : ((aStr > bStr) ? 1 : 0));
            }
            return ((aStr > bStr) ? -1 : ((aStr < bStr) ? 1 : 0));
          }
        )
        break;
      case 'number':
        // console.log('sort number');
        return (
          (a, b) => {
            const aNum = a[field];
            const bNum = b[field];
            // console.log('sortNumber',aNum, bNum);
            if (direction === 'A') {
              return (aNum-bNum);
            }
            return (bNum-aNum);
          }
        )
        break;
      case 'date':
        // console.log('sort date');
        return (
          (a, b) => {
            const aDate = new Date(a[field]);
            const bDate = new Date(b[field]);
            if (direction === 'A') {
              return (aDate-bDate);
            }
            return (bDate-aDate);
          }
        )
        break;
      default:
      // console.log('sort default');
        return (
          (a, b) => {
            const aStr = a[field.name] === null? '':a[field.name].toLowerCase();
            const bStr = b[field.name] === null? '':b[field.name].toLowerCase();
            if (direction === 'A') {
              return ((aStr < bStr) ? -1 : ((aStr > bStr) ? 1 : 0));
            }
            return ((aStr > bStr) ? -1 : ((aStr < bStr) ? 1 : 0));
          }
        )
        break;
    }
  }

  render() {
    const { classes, label, fields, sort, deleteRow } = this.props;
    let data = [...this.props.data];
    data.sort(this.sortIt());

    return (
      <Grid container>
        <Grid item xs={12} >
          <Toolbar variant='dense' className={classes.toolbar}>
            <Typography align='left' style={{font: 'italic bold 20px "Roboto"'} } className={classes.titleFG}>
              {label}
            </Typography>
          </Toolbar>
        </Grid>

        <Grid item xs={12}>
          <List dense={true}>
            <Paper classes={{root: classes.listHeader}} >
              <ListItem divider={true}>
                {deleteRow?
                <ListItemText
                  disableTypography={true}
                  style={{ fontSize:13,cursor:'default',width:40 }}
                  primary={'Delete'}
                />
                :null
                }
                {fields.map((field, id1)=>{
                  return (
                    <ListItemText
                      key={id1}
                      onClick={()=>this.sort(field)}
                      disableTypography={true}
                      style={field.name==='overflow'?
                        { fontSize:13,cursor:'default',width:field.column_width,flexGrow:1 }
                        :
                        { fontSize:13,cursor:'default',width:field.column_width }}
                      primary={this.labelHeader(field)}
                    />
                  );
                })}

              </ListItem>
            </Paper>
            {data.map((item, item_id) => {
              if (item.change !== 'delete') {
              return (
                <Paper
                  key={item_id}
                >
                <ListItem >
                  {deleteRow?
                  <ListItemText style={{ cursor:'default' }} primary={
                    <IconButton aria-label='Delete reason' color='secondary' style={{padding:4}} onClick={()=>deleteRow(item.order)}>
                      <Tooltip title='Delete reason'>
                        <Delete size='small'/>
                      </Tooltip>
                    </IconButton>}
                  />
                  :null
                  }
                  {fields.map((field, field_id)=>{
                    // console.log('list item', field);
                    return (<ListItemText
                      key={field_id}
                      style={field.name==='overflow'?
                        { width:field.column_width,flexGrow:1 }
                        :
                        { width:field.column_width, wordWrap:'break-word' }}
                      primary={item[field.name]}
                      />);
                  })}
                </ListItem>
                </Paper>
              )}
            })}
          </List>
        </Grid>
      </Grid>
    )  // return
  }  // render
}  // class
)  // end of the withStyles wrapper

// Has nesting capability to one level.
export const SimpleSortNestListView = withStyles(styles, { withTheme: true })(
class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // data:[...this.props.data],
      sort:this.props.sort||{field:this.props.fields[0].name,
        data_type:this.props.fields[0].data_type,
        direction:'A'}
    };

    this.initState = {...this.state};
  }

  labelHeader = (field, fieldSupportsSort=true) => {
    const { theme } = this.props;

    return (
      // using data type to
      this.state.sort && field.hasOwnProperty('data_type') && fieldSupportsSort?
      <Fragment>
        {field.label}
        {field.name === this.state.sort.field?
          this.state.sort.direction==='A'?
          <SortAsc style={{marginLeft:5, verticalAlign:'text-bottom'}} size={20} color={theme.palette.secondary.contrastText} />
          : <SortDesc style={{marginLeft:5, verticalAlign:'text-bottom'}} size={20} color={theme.palette.secondary.contrastText} />
        : <Sort style={{marginLeft:5, verticalAlign:'text-bottom'}} size={20} color={theme.palette.secondary.contrastText} />
        }
      </Fragment>
      :
      <Fragment>{field.label}</Fragment>

    )
  }

  sort = (field) => {
    let direction = this.state.sort.direction;
    if (field.name === this.state.sort.field) {
      direction = this.state.sort.direction === 'A'?'D':'A'
    } else {
      direction = 'A'
    }

    // let sortData = [...this.state.data];
    // sortData.sort(this.sortIt(field, direction));

    this.setState({ sort:{field:field.name
      ,data_type:field.display_value_data_type?field.display_value_data_type:field.data_type
      ,direction:direction} });
  }

  sortIt = (f = null, t = null, d = null) => {
    const field = f?f:this.state.sort.field;
    const data_type = t?t:this.state.sort.data_type;
    const direction = d?d:this.state.sort.direction;
    // console.log('sortIt', field, data_type, direction);
    switch(data_type) {
      case 'text':
        // console.log('sort text');
        return (
          (a, b) => {
            const aStr = a[field] === null? '':a[field].toLowerCase();
            const bStr = b[field] === null? '':b[field].toLowerCase();
            if (direction === 'A') {
              return ((aStr < bStr) ? -1 : ((aStr > bStr) ? 1 : 0));
            }
            return ((aStr > bStr) ? -1 : ((aStr < bStr) ? 1 : 0));
          }
        )
        break;
      case 'number':
        // console.log('sort number');
        return (
          (a, b) => {
            const aNum = a[field];
            const bNum = b[field];
            // console.log('sortNumber',aNum, bNum);
            if (direction === 'A') {
              return (aNum-bNum);
            }
            return (bNum-aNum);
          }
        )
        break;
      case 'date':
        // console.log('sort date');
        return (
          (a, b) => {
            const aDate = new Date(a[field]);
            const bDate = new Date(b[field]);
            if (direction === 'A') {
              return (aDate-bDate);
            }
            return (bDate-aDate);
          }
        )
        break;
      default:
      // console.log('sort default');
        return (
          (a, b) => {
            const aStr = a[field.name] === null? '':a[field.name].toLowerCase();
            const bStr = b[field.name] === null? '':b[field.name].toLowerCase();
            if (direction === 'A') {
              return ((aStr < bStr) ? -1 : ((aStr > bStr) ? 1 : 0));
            }
            return ((aStr > bStr) ? -1 : ((aStr < bStr) ? 1 : 0));
          }
        )
        break;
    }
  }

  render() {
    const { classes, label, fields, sort, deleteRow } = this.props;
    let data = [...this.props.data];
    data.sort(this.sortIt());

    return (
      <Grid container>
        <Grid item xs={12} >
          <Toolbar variant='dense' className={classes.toolbar}>
            <Typography align='left' style={{font: 'italic bold 20px "Roboto"'} } className={classes.titleFG}>
              {label}
            </Typography>
          </Toolbar>
        </Grid>

        <Grid item xs={12}>
          <List dense={true}>
            <Paper classes={{root: classes.listHeader}} >
              <ListItem divider={true}>
                {deleteRow?
                <ListItemText
                  disableTypography={true}
                  style={{ fontSize:13,cursor:'default',width:40 }}
                  primary={'Delete'}
                />
                :null
                }
                {fields.map((field, id1)=>{
                  return (
                    <ListItemText
                      key={id1}
                      onClick={()=>this.sort(field)}
                      disableTypography={true}
                      style={field.name==='overflow'?
                        { fontSize:13,cursor:'default',width:field.column_width,flexGrow:1 }
                        :
                        { fontSize:13,cursor:'default',width:field.column_width }}
                      primary={this.labelHeader(field)}
                    />
                  );
                })}

              </ListItem>
            </Paper>
            {data.map((item, item_id) => {
              if (item.change !== 'delete') {
              return (
                <Paper
                  key={item_id}
                >
                <ListItem >
                  {deleteRow?
                  <ListItemText style={{ cursor:'default' }} primary={
                    <IconButton aria-label='Delete reason' color='secondary' style={{padding:4}} onClick={()=>deleteRow(item_id)}>
                      <Tooltip title='Delete reason'>
                        <Delete size='small'/>
                      </Tooltip>
                    </IconButton>}
                  />
                  :null
                  }
                  {fields.map((field, field_id)=>{
                    // console.log('list item', field);
                    return (<ListItemText
                      key={field_id}
                      style={field.name==='overflow'?
                        { width:field.column_width,flexGrow:1 }
                        :
                        { width:field.column_width, wordWrap:'break-word' }}
                      primary={item[field.name]}
                      />);
                  })}
                </ListItem>
                </Paper>
              )}
            })}
          </List>
        </Grid>
      </Grid>
    )  // return
  }  // render
}  // class
)  // end of the withStyles wrapper
