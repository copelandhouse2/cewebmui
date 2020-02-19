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


const btnSize = {
  sm: 24,
  md: 36,
  lg: 48,
  xl: 60,
};

const textStrength = 'main';
const styles = theme => ({
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
    }
  },
  buttonTitle: {
    // fontFamily: 'Walter Turncoat',
    color: textStrength === 'main'? theme.palette.secondary.main: theme.palette.secondary.light,
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
    justify: 'center'

  },
  badge: {
    // top: '90%',
    // right: 40,
  },
  fabMinus: {
    position: 'absolute',
    top: 40,
    left: 15,
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
  }
});

function PaperComponent(props) {
  return (
    <Draggable>
      <Paper {...props} />
    </Draggable>
  );
}

const useSvg = (svg) => {
  const blob = new Blob([svg], {type: 'image/svg+xml'});
  return URL.createObjectURL(blob);
  // return URL.createObjectURL(`data:image/svg+xml,${svg}`)
}

class scopeSelection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: {},
      scope: this.props.currentScope,
    };
  }

  componentDidMount = () => {
    let scopeCount = {};
    if (this.state.scope) {
      this.state.scope.forEach(item => {
        if (!scopeCount[item.name]) {
          scopeCount[item.name] = 0;
        }
        scopeCount[item.name]++
      });
    }
    this.setState({ count: scopeCount })
  }

  addScope = (selected) => {
    let adjustedCount = {...this.state.count};
    if (!adjustedCount[selected.name]) {
      adjustedCount[selected.name] = 0;
    }
    adjustedCount[selected.name]++;

    let adjustedScope = [...this.state.scope];
    const newScopeItem = {control_id: selected.control_id, name: selected.name, label: selected.label};
    adjustedScope.push(newScopeItem);
    this.setState({ count: adjustedCount, scope: adjustedScope });
  };

  removeScope = (selected) => {
    let adjustedCount = {...this.state.count};
    if (!adjustedCount[selected.name]) {
      adjustedCount[selected.name] = 0;
    }
    adjustedCount[selected.name]--;
    let adjustedScope = [...this.state.scope];
    for (let i = this.state.scope.length - 1; i >= 0; i--) {
        if (this.state.scope[i].name === selected.name) {
            adjustedScope.splice(i,1);
            break;
        }
    }
    this.setState({ count: adjustedCount, scope: adjustedScope });
  };

  render() {
    const { classes, currentMenu } = this.props;

    // console.log('scope selector', 'menu',currentMenu, 'views',currentViews, 'project',currentProject);
    // console.log('state', this.state);
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.toggleScopeDialog}
        PaperComponent={PaperComponent}
        aria-labelledby="scope-dialog"
      >
        <DialogTitle>Adjust the Project Scope</DialogTitle>
        <DialogContent className={classes.content}>
          <Grid
            container
            justify='space-around'
            alignItems='flex-start'
            spacing={16}
          >
            {currentMenu.children && currentMenu.children.map(button => (
            <Grid item key={button.name} xs={4} sm={3} lg={2} className={classes.buttonGroup}>
              <Fab className={classes.fab}
                onClick={()=>{this.addScope(button)} }
              >
                <Badge badgeContent={this.state.count[button.name]||0} color='primary' classes={{ badge: classes.badge }}>

                  <img src={useSvg(button.image)} alt={button.label} className={classes.imageSrc} />
                </Badge>

              </Fab>
              { this.state.count[button.name] > 0 &&
                <Tooltip title='Remove scope item' aria-label='Remove'>
                  <Fab color='primary' className={classes.fabMinus}
                     onClick={()=>{this.removeScope(button)}}
                  >
                    <Minus className={classes.minus}/>
                  </Fab>
                </Tooltip>
              }
              <Typography
                variant='caption'
                color='secondary'
                className={classes.buttonTitle}
              >
                {button.label}
              </Typography>
            </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{this.props.assignScope(this.state.scope)}} color='secondary'>
            Accept
          </Button>
          <Button onClick={this.props.toggleScopeDialog} color='secondary'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    )

  }
}

export const ScopeSelection = withStyles(styles, { withTheme: true })(scopeSelection);
// export const FieldGroup2 = withStyles(styles, { withTheme: true })(fieldGroup2);
