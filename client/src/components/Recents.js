import React, { Component }from 'react';
// import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { CardContainer } from '../containers/ceCardContainer';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  appbar: {
    // top: 'auto',
    // bottom: 0,
    position: 'sticky',
    height: 60
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    padding: 0,
    width: 30,
    minWidth: 0
  }
});

class Recents extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  promiseFn = theFunction => {
    return new Promise((resolve, reject) => {
        resolve(theFunction);
    })
  };

  componentDidMount = () => {

  }

  render() {

    const { classes, search } = this.props;

    return (
      <div >
        <AppBar className={classes.appbar}>
          <Toolbar className={classes.toolbar}>

            <Button
              title='display Unapproved projects'
              variant="contained"
              color="secondary"
              size="small"
              className={classes.button}
              onClick={ (e) => {this.props.loadRecents('U')} }
            >
              U
            </Button>
            <Button
              title='Display Pending projects'
              variant="contained"
              color="secondary"
              size="small"
              className={classes.button}
              onClick={ (e) => {this.props.loadRecents('P')} }
            >
              P
            </Button>
            <Button
              title='Display projects entered within 24 hours'
              variant="contained"
              color="secondary"
              size="small"
              className={classes.button}
              onClick={ (e) => {this.props.loadRecents('1')} }
            >
              1
            </Button>
            <Button
              title='Display projects entered over the last week'
              variant="contained"
              color="secondary"
              size="small"
              className={classes.button}
              onClick={ (e) => {this.props.loadRecents('7')} }
            >
              7
            </Button>
            <Button
              title='Display projects entered over the last month'
              variant="contained"
              color="secondary"
              size="small"
              className={classes.button}
              onClick={ (e) => {this.props.loadRecents('30')} }
            >
              30
            </Button>
          </Toolbar>
        </AppBar>
        {
          search.recentsResults.map(project => {
            return (
              <CardContainer key={project.id}
                project={project}
              />
            );
          })
        }
      </div>
    )
  }  // render

}  // Component

// project={{job_number: 19004200, address1: '123 Cool Way', city: 'Austin'}}

export default withStyles(styles, { withTheme: true })(Recents);
