import React from 'react';
// import React, { Component, Fragment } from 'react';

import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import Tooltip from '@material-ui/core/Tooltip';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import IconButton from '@material-ui/core/IconButton';

import Save from '@material-ui/icons/Save';
import Delete from '@material-ui/icons/Delete';

import { Field2Container } from '../containers/ceFieldContainer';
import { ListTabularFG, SimpleSortListView } from './ceFieldGroup';
import TrelloFGContainer from '../containers/TrelloFGContainer';

import Switch from '@material-ui/core/Switch';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// colors
const green = '#81c784';  // Mat UI green 300
const red = '#ff8a65';  // Mat UI red 300
const yellow = '#ffd54f';  // Mat UI amber 300
const gray = 'lightgray';

const styles = theme => ({
  expand: {
    transform: 'rotate(0deg)',
    // marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    width:32,
    height:32
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});

export const DialogInspectionAddFG = withStyles(styles, { withTheme: true })(
(props) => {
  const { fieldGroup, dialogState, updateState, inspections,
    handleChangeCustomized, theme, classes } = props;

  // const { classes, theme, fieldGroup, toggleScopeDialog, removeScope, dialogState, scopeID, updateState } = props;
  const fDate = fieldGroup.children.find(field=> field.name === 'inspection_date');
  const fAddress1 = fieldGroup.children.find(field=> field.name === 'address1');
  const fScope = fieldGroup.children.find(field=> field.name === 'scope');

  const fBillable = fieldGroup.children.find(field=> field.name === 'inspection_billable');
  const fVpo = fieldGroup.children.find(field=> field.name === 'inspection_vpo');

  const fInspector = fieldGroup.children.find(field=> field.name === 'inspector');
  const fInspType = fieldGroup.children.find(field=> field.name === 'inspection_type');

  const fStatus = fieldGroup.children.find(field=> field.name === 'inspection_status');
  const fReason = fieldGroup.children.find(field=> field.name === 'inspection_reason');
  const fNotes = fieldGroup.children.find(field=> field.name === 'notes');
  const fAttributes = fieldGroup.children.find(field=> field.name === 'attributes');

  const fInspContact = fieldGroup.children.find(field=> field.name === 'inspection_contact');
  const fBillInspContact = fieldGroup.children.find(field=> field.name === 'billing_inspection_contact');

  const fCableCo = fieldGroup.children.find(field=> field.name === 'cable_company');
  const fStressDate = fieldGroup.children.find(field=> field.name === 'target_stress_date');
  const fPourDate = fieldGroup.children.find(field=> field.name === 'concrete_pour_date');

  const fgTrello = fieldGroup.children.find(field=> field.name === 'trello');

  const primaryFields = [fDate, fScope, fInspector, fInspType];
  const nestedFields = [fBillable, fVpo];
  // console.log('DialogInspectionAddFG 1', inspections);
  // console.log('DialogInspectionAddFG 1', fieldGroup, inspections);
  // console.log('DialogInspectionAddFG 2', primaryFields, nestedFields);
  Object.assign(fAddress1,{name_id: 'project_id',project_id:null,lookup_list:true});
  // console.log('Inspection Dialog',fieldGroup.children);
  // console.log('Trello FG', fgTrello);
  // console.log('list of scope',dialogState.scope_list);
  // console.log('past inspections',inspections.pastProjectSpecific);
  // console.log('the project',inspections);

  return (
    <Grid container spacing={24}>

      <Grid item xs={12} style={ props.fgStyles? props.fgStyles:{marginTop: 20, marginBottom: 20, borderTop:'1px solid black'} }>
        <Typography align='left' style={{fontWeight: 500}}>
          {!props.hideLabel?fieldGroup.label:null}
        </Typography>
      </Grid>

      <Paper style={{ width:'100%', padding: 10 }}>
        <Grid container justify='space-between' alignItems='center' spacing={24} style={{marginBottom:20}}>
          <Field2Container
            key={fAddress1.id}
            field = {fAddress1}
            arrID = {false}
            state = {dialogState}
            updateState = {updateState}
            handleChangeCustomized = {handleChangeCustomized}
            altLookups = {[{name: 'address1', name_id: 'project_id', label: 'Address', lookup_list:inspections.filter}]}
            asYouType={4}
            findAction={props.findAction}
            // noGridWrap = {true}
            // props that are not used.
            loadFind={()=>{}}
            searchForDups={()=>{}}
            loadMessage={()=>{}}
          />

          <Field2Container
            key={fCableCo.id}
            field = {fCableCo}
            arrID = {false}
            state = {dialogState}
            updateState = {updateState}
            lookup_key = {'org_type'}
            // altLookups = {[{name: 'cable_company', name_id: 'cable_company_id', label: 'Cable Co', lookup_list:organizations}]}
            // noGridWrap = {true}
            // props that are not used.
            loadFind={()=>{}}
            searchForDups={()=>{}}
            loadMessage={()=>{}}
          />

          <Field2Container
            key={fInspContact.id}
            field = {fInspContact}
            arrID = {false}
            state = {dialogState}
            updateState = {updateState}
            // noGridWrap = {true}
            // props that are not used.
            loadFind={()=>{}}
            searchForDups={()=>{}}
            loadMessage={()=>{}}
          />
          <Field2Container
            key={fBillInspContact.id}
            field = {fBillInspContact}
            arrID = {false}
            state = {dialogState}
            updateState = {updateState}
            // noGridWrap = {true}
            // props that are not used.
            loadFind={()=>{}}
            searchForDups={()=>{}}
            loadMessage={()=>{}}
          />
        </Grid>

        <List dense={true}>
          {dialogState.scope_list.map((s,id) =>{
            return (
              <Paper
                key={id}
                style={{marginBottom:20}}
              >
                <ListItem
                  divider={false}
                  // onClick={(e)=>handleChangeCustomized({name:'scopeExpand'},s)}
                  // style={{ backgroundColor:theme.palette.primary.main }}
                >
                  <Grid container justify='space-between'>
                    <Grid item style={{ fontWeight:600 }}>{s.label}</Grid>
                    <Grid item>
                      <IconButton size='small' color='secondary'
                        className={classnames(classes.expand, {
                          [classes.expandOpen]: dialogState.scopeExpand.hasOwnProperty(s.id)?dialogState.scopeExpand[s.id]:false,
                        })}
                        onClick={(e)=>handleChangeCustomized({name:'scopeExpand'},s)}
                        // aria-expanded={this.state.expanded}
                        aria-label="Show more"
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </ListItem>

                <Collapse in={dialogState.scopeExpand.hasOwnProperty(s.id)?dialogState.scopeExpand[s.id]:false} timeout='auto'>
                  <ListItem >
                    <Grid container justify='space-between' alignItems='center' spacing={8}>
                      <Field2Container
                        field = {fInspContact}
                        arrID = {false}
                        state = {dialogState}
                        updateState = {updateState}
                        // noGridWrap = {true}
                        // props that are not used.
                        loadFind={()=>{}}
                        searchForDups={()=>{}}
                        loadMessage={()=>{}}
                      />
                      <Field2Container
                        field = {fInspContact}
                        arrID = {false}
                        state = {dialogState}
                        updateState = {updateState}
                        // noGridWrap = {true}
                        // props that are not used.
                        loadFind={()=>{}}
                        searchForDups={()=>{}}
                        loadMessage={()=>{}}
                      />
                      <Field2Container
                        field = {fPourDate}
                        arrID = {false}
                        state = {dialogState}
                        updateState = {updateState}
                        // noGridWrap = {true}
                        // props that are not used.
                        loadFind={()=>{}}
                        searchForDups={()=>{}}
                        loadMessage={()=>{}}
                      />
                      <Field2Container
                        field = {fStressDate}
                        arrID = {false}
                        state = {dialogState}
                        updateState = {updateState}
                        // noGridWrap = {true}
                        // props that are not used.
                        loadFind={()=>{}}
                        searchForDups={()=>{}}
                        loadMessage={()=>{}}
                      />
                    </Grid>
                  </ListItem>
                  <ListItem divider={true}>
                  <Grid container justify="flex-start">
                  {inspections.pastProjectSpecific.filter(si=>s.id===si.scope_id).map((i,id) =>{
                    return (
                      <Card
                        key={i.id}
                        style={{
                          margin:20,
                          backgroundColor:i.inspection_status==='P'?green:i.inspection_status==='F'?red:i.inspection_status==='C'?gray:yellow,
                          border:dialogState.scopeSelected.id===i.id?'4px solid yellow':'0px'
                        }}
                        onClick={(e)=>dialogState.scopeSelected.id===i.id?updateState({scopeSelected:false}):updateState({scopeSelected:i})}
                      >

                        <CardContent>
                          <Typography paragraph style={{margin:0}}>
                            <b>{i.inspection_type}</b><br/>
                            {i.inspection_date}<br/>
                            {i.inspector}<br/>
                            <b>{i.inspection_status}</b>
                          </Typography>
                        </CardContent>
                      </Card>
                    )
                  })}
                  </Grid>
                  </ListItem>
                  <Collapse
                    in={dialogState.scopeSelected.scope_id===s.id?true:false}
                    timeout='auto'
                  >
                    <Grid container justify='space-around' spacing={8}>
                      <Field2Container
                        key={fDate.id}
                        field = {fDate}
                        arrID = {false}
                        state = {dialogState}
                        updateState = {updateState}
                        // noGridWrap = {true}
                        // props that are not used.
                        loadFind={()=>{}}
                        searchForDups={()=>{}}
                        loadMessage={()=>{}}
                      />
                      <Field2Container
                        key={fInspector.id}
                        field = {fInspector}
                        arrID = {false}
                        state = {dialogState}
                        updateState = {updateState}
                        // noGridWrap = {true}
                        // props that are not used.
                        loadFind={()=>{}}
                        searchForDups={()=>{}}
                        loadMessage={()=>{}}
                      />
                      <Field2Container
                        key={fInspType.id}
                        field = {fInspType}
                        lookup_key = {'scope_name'}
                        arrID = {false}
                        state = {dialogState}
                        updateState = {updateState}
                        handleChangeCustomized = {handleChangeCustomized}
                        // noGridWrap = {true}
                        // props that are not used.
                        loadFind={()=>{}}
                        searchForDups={()=>{}}
                        loadMessage={()=>{}}
                      />
                      <Grid item xs={3} container direction='column' style={{padding:'0px 0px 0px 10px',margin:'0px 20px 20px 0px', border:'1px solid lightgray', borderRadius: 6}}>
                        <Grid item>
                          <FormControlLabel
                             control={
                               <Checkbox
                                 key={fBillable.id}
                                 onChange={(e)=>updateState({inspection_billable:e.target.checked===true?'Y':null})}
                                 checked={dialogState.inspection_billable==='Y'?true:false}
                               />
                             }
                             label={fBillable.label}
                          />
                        </Grid>
                        <Grid item>
                          <FormControlLabel
                             control={
                               <Checkbox
                                  key={fVpo.id}
                                  onChange={(e)=>updateState({inspection_vpo:e.target.checked===true?'Y':null})}
                                  checked={dialogState.inspection_vpo==='Y'?true:false}
                                />
                             }
                             label={fVpo.label}
                          />
                        </Grid>
                      </Grid>

                      {dialogState.inspection_type === 'PP' &&
                      <Fade in={true} timeout={1000}>
                      <Grid item xs={9} container style={{padding:'0px 0px 0px 10px',margin:'10px 20px 20px 10px', border:'1px solid lightgray', borderRadius:6}}>
                        {fAttributes.children.map((attr, id)=>{
                          // const theAttr = attr.name;
                          // console.log('attr', theAttr);
                          return (
                            <Grid key={id} item xs={3}>
                              <FormControlLabel
                                 control={
                                   <Checkbox
                                     key={attr.id}
                                     onChange={(e)=>updateState( {[attr.name]:e.target.checked===true?'Y':null} )}
                                     checked={dialogState[attr.name]==='Y'?true:false}
                                   />
                                 }
                                 label={attr.label}
                              />
                            </Grid>
                          )
                        })}
                      </Grid>
                      </Fade>
                      }
                    </Grid>

                  </Collapse>
                </Collapse>
              </Paper>
            )
          })}
        </List>

        <Grid item container justify='space-between' spacing={24}>
          <Grid item>
            {props.handleDelete &&
            <IconButton aria-label='Delete' color='secondary' onClick={props.handleDelete}>
              <Tooltip title='Delete'>
                <Delete fontSize='large'/>
              </Tooltip>
            </IconButton>
            }
          </Grid>

          <Grid item>
            {props.handleSubmit &&
            <IconButton aria-label='Save' color='secondary' onClick={props.handleSubmit}>
              <Tooltip title='Save'>
                <Save fontSize='large'/>
              </Tooltip>
            </IconButton>
            }
          </Grid>
        </Grid>

      </Paper>
    </Grid>
  )
}
)
