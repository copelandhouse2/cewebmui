import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
// import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import red from '@material-ui/core/colors/red';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import FileCopyIcon from '@material-ui/icons/FileCopy';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  card: {
    margin: '10px 20px',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold'
  }
});

// promiseFn = theFunction => {
//   return new Promise((resolve, reject) => {
//       resolve(theFunction);
//   })
// };

const ceCard = (props) => {

  const { classes, project } = props;

  return (
    <Card key={project.id} className={classes.card}>
      {/*<CardHeader
        subheader={`${project.address1}, ${project.city} `}
      />*/}
      <CardContent>
        <Grid container justify="space-between">
          <Grid item xs={12}>
            <Typography variant='subtitle1'>
              {`${project.address1}, ${project.city} `}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant='subtitle2'>
              {project.job_number}
            </Typography>
          </Grid>
          <Grid item>
            <Typography component='p'>
              {project.creation_date}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography component='p'>
              {project.client}
            </Typography>
          </Grid>

        </Grid>
      </CardContent>
      <CardActions>
        <IconButton
          title='Copy project'
          aria-label="Copy"
          color='secondary'
          onClick={(e) => {
            const scope = project.scope.map(s => Object.assign({}, s, {id: null, project_id: null, scope_id: null}));
            const copy = Object.assign({}, project, {address_id: null, id: null
              , job_number: null, trello_card_id: null, scope: scope});
            // console.log('Copy', copy);
            props.updateProject(copy);
          }}
        >
          <FileCopyIcon />
        </IconButton>
        <IconButton
          title='Edit project'
          aria-label="Edit"
          color='secondary'
          onClick={(e) => props.updateProject(project)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          title='Delete project'
          aria-label="Delete"
          color='secondary'
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

// <CardHeader
//   title={project.job_number}
//   subheader={`${project.address1}, ${project.city} `}
// />
export const CeCard = withStyles(styles, { withTheme: true })(ceCard);
