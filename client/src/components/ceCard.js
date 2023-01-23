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
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import FileCopyIcon from '@material-ui/icons/FileCopy';
// import EditIcon from '@material-ui/icons/Edit';
// import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  card: {
    margin: '10px 20px',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.palette.secondary.dark,
  }
});

// promiseFn = theFunction => {
//   return new Promise((resolve, reject) => {
//       resolve(theFunction);
//   })
// };

const ceCard = (props) => {

  const { classes, project, session } = props;

  return (
    <Card key={project.id} className={classes.card}>
      {/*<CardHeader
        subheader={`${project.address1}, ${project.city} `}
      />*/}
      <CardContent>
        <Grid container justify="space-between">
          <Grid item xs={10} >
            <Typography variant='subtitle1' className={classes.title}>
              <Link title='Edit project' href='#' color='inherit' onClick={(e) => props.updateProject(project)}>
              {`${project.address1}, ${project.city} `}
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant='subtitle2'>
              {project.job_number}{project.revision||''}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography component='p'>
              {project.client}
            </Typography>
          </Grid>
          <Grid item>
            <Typography component='p'>
              <b>c:</b>
              {` ${project.creation_date}`}
            </Typography>
          </Grid>
          <Grid item>
            <Typography component='p'>
              <b>u:</b>
              {` ${project.last_updated_date}`}
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
            const scope = project.scope.map(s => Object.assign({}, s, {id: null, project_id: null
              , revision: null, revision_desc: null, scope_id: null
              , created_by: session.id, last_updated_by: session.id}));
            const copy = Object.assign({}, project, {address_id: null, id: null
              , job_number: null, revision: null, revision_desc: null
              , trello_card_id: null, scope: scope
              , contact_id: session.contact_id, requestor: session.full_name
              , user_id: session.id, user: session.full_name
              , created_by: session.id, last_updated_by: session.id});
            // console.log('Copy', copy);
            props.updateProject(copy);
          }}
        >
          <FileCopyIcon />
        </IconButton>

        {/*<IconButton
          title='Delete project'
          aria-label="Delete"
          color='secondary'
        >
          <DeleteIcon />
        </IconButton>*/}
      </CardActions>
    </Card>
  )
}

// <CardHeader
//   title={project.job_number}
//   subheader={`${project.address1}, ${project.city} `}
// />
export const CeCard = withStyles(styles, { withTheme: true })(ceCard);
