import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

import addIcon from '../img/add1.svg';
import Minus from '@material-ui/icons/RemoveRounded';

const styles = theme => ({
  addScope: {
    position: 'absolute',
    // left: '5%',
    // marginTop: -5
  },
  imageSrc: {
    height: 32,
    // color: theme.palette.secondary.contrastText,  // not working
    // fill: theme.palette.secondary.contrastText,  // not working

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
    color: 'white',
    // minWidth: 0,
    // minHeight: 0,
  }
});

// promiseFn = theFunction => {
//   return new Promise((resolve, reject) => {
//       resolve(theFunction);
//   })
// };

const fieldGroup = (props) => {

  const { classes, fieldGroup, removeScope } = props;

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
            <img src={addIcon} alt={'Add Scope'} className={classes.imageSrc} />
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
// export const FieldGroup2 = withStyles(styles, { withTheme: true })(fieldGroup2);
