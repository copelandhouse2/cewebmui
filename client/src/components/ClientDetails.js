import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withWidth } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
// import _ from 'lodash';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { Field2Container } from '../containers/ceFieldContainer';

const styles = (theme) => ({
  grow: {
    flexGrow: 1,
  },
  linkStyle: {
    textDecoration: 'none',
  },
});

class ClientDetails extends Component {
  constructor(props) {
    super(props);

    this.initState = {
      active: 'Y',
      billing_address1: null,
      billing_address2: null,
      billing_city: null,
      billing_country: null,
      billing_state_prov: null,
      billing_zipcode: null,
      change: false,
      city_id: null,
      client: null,
      client_full_name: null,
      client_name: null,
      code: null,
      comments_history: [],
      compliance_dl: null,
      full_name: null,
      id: null,
      logo: null,
      name: null,
      notes: null,
      main_contact: null,
      main_contact_email: null,
      main_contact_phone: null,
      billing_contact: null,
      billing_contact_email: null,
      billing_contact_phone: null,
      reporting: {},
      last_updated_by: props.session.id,
    };

    this.state = {
      init: this.initState,
      ...props.currentClient,
      change: false,
    };
  }

  componentDidMount = () => {
    // console.log('*** CDM Client Details', this.state,this.props.currentClient);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { currentClient, clientAck } = nextProps;
    // console.log('*** gDSFP Details State, currentClient', prevState, currentClient);

    if (currentClient.change === 'updated') {
      // console.log('*** gDSFP Details: currentClient was updated',currentClient);

      clientAck();
      const updatedClient = { ...prevState.init, init: prevState.init, ...currentClient, change: false };
      return updatedClient;
    }

    return null;
  }

  updateState = (updatedValues) => {
    // console.log('*** Client Details updateState', updatedValues, this.state);
    if ('saveValue' in updatedValues) {
      // user just clicked in field.
      this.setState({ ...updatedValues });
    } else {
      // this is a true change.
      this.setState({ ...updatedValues, change: true });
      this.props.parentState({ change: true }); // this updates parent State.
    }
  };

  handleSave = () => {
    // console.log('*** Client handle Save', this.state);
    if (this.state.client_name) {
      this.props.saveClients([this.state]);
    } else {
      console.log('handleSave no name.  Show message');
      this.props.loadMessage(
        {
          ok: false,
          status: 'Missing data',
          statusText: 'Missing Client Name.  Please add',
        },
        'WARN'
      );
    }
    // this.setState({change:false});
  };

  handleCancel = () => {
    // console.log('*** Client handle Cancel', this.state);
    if (this.state.change) {
      this.props.ynDialog({
        ok: false,
        title: 'Save changes?',
        content: `You have unsaved changes to ${
          this.state.client_name || 'this new company'
        }.  If you wish to save.  Press "Yes" below, then press "Save"`,
        yesFunc: null,
        noFunc: () => this.updateState({ cancel: true }),
      });
    } else {
      this.updateState({ cancel: true });
    }
  };

  handleDelete = () => {
    const { comments_history, reporting } = this.props.currentClient;
    // console.log('*** Client handle Delete', this.state, reporting, reporting.project);

    if (reporting.project.length > 0 || comments_history.length > 0) {
      this.props.loadMessage(
        {
          ok: false,
          status: 'Cannot Delete',
          statusText: 'Cannot delete this client.  Client has projects and/or history tied to it.  Please inactivate instead',
        },
        'ERROR'
      );
    } else {
      this.props.ynDialog({
        ok: false,
        title: 'Delete client?',
        content: `Are you sure?`,
        yesFunc: () => {
          this.props.deleteClient(this.state.id);
          this.props.parentState({ drawer: true });
        },
        noFunc: false,
      });
    }
  };

  alertOfChange = (e) => {
    // console.log('alerting of change', e.target, e.currentTarget,document.activeElement);
    const currentTarget = e.currentTarget;

    // Check the newly focused element in the next tick of the event loop
    setTimeout(() => {
      // Check if the new activeElement is a child of the original container
      if (!currentTarget.contains(document.activeElement)) {
        // You can invoke a callback or add custom logic here
        // onBlur();
        if (this.state.change) {
          // console.log('There are changes');
          this.props.ynDialog({
            ok: false,
            title: 'Save changes?',
            content: `Would you like to save changes to ${this.state.client_name}?`,
            yesFunc: this.handleSave,
            noFunc: false,
          });
          // return;
        }
      }
    }, 0);
  };

  render() {
    // Pressing the cancel button.
    if (this.state.cancel) {
      return <Redirect to={'/'} />;
    }

    const { fGroup, classes } = this.props;

    // console.log('*** Client Details Render:', 'state:', this.state);
    // console.log(fieldGroup);
    // console.log('groups', fGroup);
    const fId = fGroup.children.find((field) => field.name === 'id');
    const fName = fGroup.children.find((field) => field.name === 'client_name');
    const fFullName = fGroup.children.find((field) => field.name === 'client_full_name');
    const fAddress1 = fGroup.children.find((field) => field.name === 'billing_address1');
    const fAddress2 = fGroup.children.find((field) => field.name === 'billing_address2');
    const fCity = fGroup.children.find((field) => field.name === 'billing_city');
    const fStateProv = fGroup.children.find((field) => field.name === 'billing_state_prov');
    const fZip = fGroup.children.find((field) => field.name === 'billing_zipcode');
    const fCountry = fGroup.children.find((field) => field.name === 'billing_country');
    const fCompliance = fGroup.children.find((field) => field.name === 'compliance_dl');
    const fActive = fGroup.children.find((field) => field.name === 'active');
    const fNotes = fGroup.children.find((field) => field.name === 'notes');

    // const fLogo = fGroup.children.find((field) => field.name === 'logo');

    const fMainContact = fGroup.children.find((field) => field.name === 'main_contact');
    const fMainContactEmail = fGroup.children.find((field) => field.name === 'main_contact_email');
    const fMainContactPhone = fGroup.children.find((field) => field.name === 'main_contact_phone');
    const fBillingContact = fGroup.children.find((field) => field.name === 'billing_contact');
    const fBillingContactEmail = fGroup.children.find((field) => field.name === 'billing_contact_email');
    const fBillingContactPhone = fGroup.children.find((field) => field.name === 'billing_contact_phone');

    return (
      <Fragment>
        {/*onBlur={this.alertOfChange}*/}
        <Grid container spacing={24}>
          <Grid item container direction='column' alignItems='flex-start' xs={4} spacing={24}>
            <Grid item>{this.state.logo ? <img src={`./img/${this.state.logo}`} alt='Logo' /> : <div />}</Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.active === 'Y' ? true : false}
                    onChange={() => this.updateState({ active: this.state.active === 'Y' ? 'N' : 'Y' })}
                    value={fActive.name}
                    color='secondary'
                  />
                }
                label={fActive.label}
                labelPlacement='start'
              />
            </Grid>
          </Grid>
          <Grid item container xs={8} spacing={16}>
            <Field2Container
              key={fName.id}
              field={fName}
              arrID={false}
              state={this.state}
              updateState={this.updateState}
              // handleChangeCustomized = {handleChange}
            />
            <Field2Container
              key={fId.id}
              field={fId}
              arrID={false}
              state={this.state}
              updateState={this.updateState}
              // handleChangeCustomized = {handleChange}
            />
            <Field2Container
              key={fFullName.id}
              field={fFullName}
              arrID={false}
              state={this.state}
              updateState={this.updateState}
              // handleChangeCustomized = {handleChange}
            />
            <Field2Container
              key={fAddress1.id}
              field={fAddress1}
              arrID={false}
              state={this.state}
              updateState={this.updateState}
              // handleChangeCustomized = {handleChange}
            />
            <Field2Container
              key={fAddress2.id}
              field={fAddress2}
              arrID={false}
              state={this.state}
              updateState={this.updateState}
              // handleChangeCustomized = {handleChange}
            />
            <Field2Container
              key={fCity.id}
              field={fCity}
              arrID={false}
              state={this.state}
              updateState={this.updateState}
              // handleChangeCustomized = {handleLIstChange}
            />
            <Field2Container
              key={fStateProv.id}
              field={fStateProv}
              arrID={false}
              state={this.state}
              updateState={this.updateState}
              // handleChangeCustomized = {handleLIstChange}
            />
            <Field2Container
              key={fZip.id}
              field={fZip}
              arrID={false}
              state={this.state}
              updateState={this.updateState}
              // handleChangeCustomized = {handleChange}
            />
            <Field2Container
              key={fCountry.id}
              field={fCountry}
              arrID={false}
              state={this.state}
              updateState={this.updateState}
              // handleChangeCustomized = {handleLIstChange}
            />
            <Field2Container
              key={fCompliance.id}
              field={fCompliance}
              arrID={false}
              state={this.state}
              updateState={this.updateState}
              // handleChangeCustomized = {handleChange}
            />
            <Field2Container
              key={fNotes.id}
              field={fNotes}
              arrID={false}
              state={this.state}
              updateState={this.updateState}
              // handleChangeCustomized = {handleChange}
            />

            <Grid item container xs={12} spacing={16}>
              <Grid item xs={12} style={{ marginTop: 10, marginBottom: 20 }}>
                <Divider />
              </Grid>
              <Grid item xs={3}>
                <Typography variant='h6'>Main Contact</Typography>
              </Grid>
              <Field2Container
                key={fMainContact.id}
                field={fMainContact}
                arrID={false}
                state={this.state}
                updateState={this.updateState}
                // handleChangeCustomized = {handleChange}
              />
              <Field2Container
                key={fMainContactEmail.id}
                field={fMainContactEmail}
                arrID={false}
                state={this.state}
                updateState={this.updateState}
                // handleChangeCustomized = {handleChange}
              />
              <Field2Container
                key={fMainContactPhone.id}
                field={fMainContactPhone}
                arrID={false}
                state={this.state}
                updateState={this.updateState}
                // handleChangeCustomized = {handleChange}
              />
            </Grid>
            <Grid item container xs={12} spacing={16}>
              <Grid item xs={3}>
                <Typography variant='h6'>Billing Contact</Typography>
              </Grid>
              <Field2Container
                key={fBillingContact.id}
                field={fBillingContact}
                arrID={false}
                state={this.state}
                updateState={this.updateState}
                // handleChangeCustomized = {handleChange}
              />
              <Field2Container
                key={fBillingContactEmail.id}
                field={fBillingContactEmail}
                arrID={false}
                state={this.state}
                updateState={this.updateState}
                // handleChangeCustomized = {handleChange}
              />
              <Field2Container
                key={fBillingContactPhone.id}
                field={fBillingContactPhone}
                arrID={false}
                state={this.state}
                updateState={this.updateState}
                // handleChangeCustomized = {handleChange}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={24}>
          <Grid item>
            {/*<Link to={`/`} className={classes.linkStyle}>*/}
            <Button title='Return to menu' variant='contained' size='small' color='secondary' onClick={this.handleCancel} id='cancel'>
              Cancel
            </Button>
            {/*</Link>*/}
          </Grid>
          <Grid item className={classes.grow}>
            <Button
              title='Return to menu'
              variant='contained'
              size='small'
              color='secondary'
              onClick={this.handleDelete}
              disabled={this.state.id ? false : true}
              id='delete'>
              Delete
            </Button>
          </Grid>
          <Grid item>
            <Button
              title='Save'
              variant='contained'
              size='small'
              color='secondary'
              disabled={this.state.change ? false : true}
              onClick={this.handleSave}
              id='save'>
              Save
            </Button>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default withWidth()(withStyles(styles, { withTheme: true })(ClientDetails));
