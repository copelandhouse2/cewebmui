import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { CardContainer } from '../containers/ceCardContainer';

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

class Find extends Component {
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
    // this.props.loadFind()

  }

  render() {

    const { search } = this.props;

    // if (!search.find) {
    //   console.log('still loading');
    //   return null;
    // }

    return (
      <div >
        {
          search.findResults.map(project => {
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

export default withStyles(styles, { withTheme: true })(Find);
