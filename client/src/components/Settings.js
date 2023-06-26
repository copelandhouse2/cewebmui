import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
// import { SketchPicker, GithubPicker, CirclePicker } from 'react-color';
import { CirclePicker } from 'react-color';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import { Link } from "react-router-dom"
import Button from '@material-ui/core/Button';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

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
// import blueGrey from '@material-ui/core/colors/blueGrey';

const styles = (theme) => ({});

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      render: false,
      currentTab: 'personalization',
      revSendEmailDefault: true,
    };

    this.initState = { ...this.state };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { preferences } = nextProps;
    // console.log('in getDerivedStateFromProps', session);

    let updatedValues = {};
    if (!prevState.render && preferences.system.hasOwnProperty('fields')) {
      const revSendEmailDefault = preferences.user.hasOwnProperty('sendEmailDefault')
        ? preferences.user.sendEmailDefault
        : preferences.system.hasOwnProperty('sendEmailDefault')
        ? preferences.system.sendEmailDefault
        : true;
      Object.assign(updatedValues, { render: true, revSendEmailDefault: revSendEmailDefault });
    }

    return updatedValues;
  }
  handleChangeComplete = (color) => {
    this.props.updateAccentColor(color.hex);
  };

  handleTabChange = (e, value) => {
    this.setState({ currentTab: value });
  };

  handleSwitch = (e) => {
    // console.log('In the handleSwitch');
    this.setState({ revSendEmailDefault: e.target.checked });
    const prefs = { id: this.props.session.id, updatedKey: 'sendEmailDefault', value: e.target.checked };
    this.props.updatePreferences(prefs);
  };

  render() {
    const { preferences } = this.props;
    // console.log('Settings', preferences);
    const colors = [
      red[400],
      pink[400],
      purple[400],
      deepPurple[400],
      indigo[400],
      blue[400],
      lightBlue[400],
      cyan[400],
      teal[400],
      green[400],
      lightGreen[400],
      lime[400],
      yellow[400],
      amber[400],
      orange[400],
      deepOrange[400],
      brown[400],
      grey[400],
    ];

    if (!this.state.render)
      return (
        <Dialog open={this.props.open}>
          <DialogTitle>Loading...</DialogTitle>
        </Dialog>
      );
    return (
      <Dialog open={this.props.open}>
        <DialogTitle>Personal Settings for {this.props.session.full_name}</DialogTitle>
        <DialogContent>
          <Tabs
            value={this.state.currentTab}
            onChange={this.handleTabChange}
            // indicatorColor='primary'
            // textColor='primary'
            variant='fullWidth'>
            <Tab value='personalization' label='Personalization' />
            <Tab value='revisions' label='Revisions' />
          </Tabs>
          {this.state.currentTab === 'personalization' && (
            <Grid container justify='center'>
              <Grid item xs={8}>
                <Typography variant='h6' style={{ padding: '10px 0px' }}>
                  Select Accent Color
                </Typography>
                <CirclePicker colors={colors} onChangeComplete={this.handleChangeComplete} />
              </Grid>
            </Grid>
          )}
          {this.state.currentTab === 'revisions' && (
            <Grid container justify='center'>
              <Grid item xs={8}>
                <FormControlLabel
                  control={<Switch checked={this.state.revSendEmailDefault} onChange={this.handleSwitch} value='revSendEmailDefault' />}
                  label='Send Email Default'
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} variant='contained' color='secondary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Settings);
