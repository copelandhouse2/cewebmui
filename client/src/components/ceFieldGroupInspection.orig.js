import React from 'react';
// import React, { Component, Fragment } from 'react';

import { withStyles } from '@material-ui/core/styles';

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

const styles = theme => ({

});

export const DialogInspectionAddFG = withStyles(styles, { withTheme: true })(
(props) => {
  const { fieldGroup, dialogState, updateState, inspections,
    handleChangeCustomized } = props;
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
  const fCableCo = fieldGroup.children.find(field=> field.name === 'cable_company');
  const fStressDate = fieldGroup.children.find(field=> field.name === 'target_stress_date');

  const fgTrello = fieldGroup.children.find(field=> field.name === 'trello');

  const primaryFields = [fDate, fScope, fInspector, fInspType];
  const nestedFields = [fBillable, fVpo];
  // console.log('DialogInspectionAddFG 1', inspections);
  // console.log('DialogInspectionAddFG 1', fieldGroup, inspections);
  // console.log('DialogInspectionAddFG 2', primaryFields, nestedFields);
  Object.assign(fAddress1,{name_id: 'project_id',project_id:null,lookup_list:true});
  // console.log('Inspection Dialog',fieldGroup.children);
  // console.log('Trello FG', fgTrello);

  return (
    <Grid container spacing={24}>

      <Grid item xs={12} style={ props.fgStyles? props.fgStyles:{marginTop: 20, marginBottom: 20, borderTop:'1px solid black'} }>
        <Typography align='left' style={{fontWeight: 500}}>
          {!props.hideLabel?fieldGroup.label:null}
        </Typography>
      </Grid>

      <Paper style={{ width:'100%', padding: 10 }}>
      <Grid item xs={12}>
        {/*
          <Typography style={{padding:5,fontWeight:'bold',color:'gray'}}>Details</Typography>
        */}
        <Grid container>
          <Grid item xs={10} container justify='center' alignItems='center'>
            <Grid item xs={12} container spacing={24} style={{margin:-6}}>
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
                key={fScope.id}
                field = {fScope}
                arrID = {false}
                state = {dialogState}
                updateState = {updateState}
                handleChangeCustomized = {handleChangeCustomized}
                altLookups = {[{name: 'scope', name_id: 'scope_id', label: 'Scope', lookup_list:dialogState.scope_list}]}
                // noGridWrap = {true}
                // props that are not used.
                loadFind={()=>{}}
                searchForDups={()=>{}}
                loadMessage={()=>{}}
              />
            </Grid>

            <Grid item xs={12} container spacing={24} style={{margin:-6}} >
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
            </Grid>

            <Grid item xs={12} container spacing={24} style={{margin:-6}}>
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
            </Grid>
          </Grid>

          <Grid item xs container direction='column' justify='center' style={{padding:'0px 0px 0px 10px',margin:'0px 20px 20px 0px', border:'1px solid lightgray', borderRadius: 6}}>
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
          <Grid item xs={12} container style={{padding:'0px 0px 0px 10px',margin:'10px 20px 20px 10px', border:'1px solid lightgray', borderRadius:6}}>
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

          {(dialogState.inspection_type === 'PP' || dialogState.inspection_type === 'STRESS') &&
          <Fade in={true} timeout={1000}>
          <Grid item xs={12} container spacing={24} style={{margin:0}}>
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
            key={fStressDate.id}
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
          </Fade>
          }
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Typography style={{padding:'5px 5px 20px 5px',fontWeight:'bold',color:'gray'}}>Results</Typography>
        <Grid container justify='center' alignItems='center' >
          <Grid item xs={12} container alignItems='flex-start' style={{padding:'0 0 0 10px'}}>
            <Grid item xs={12} md={fStatus.display_width*2} style={{padding:'0px 0px 0px 10px',margin:'0px 20px 0px 0px', border:'1px solid lightgray', borderRadius: 6}}>
              <RadioGroup
                value={dialogState.inspection_status===null?'PEND':dialogState.inspection_status}
                onChange={(e)=>updateState({inspection_status:e.target.value==='PEND'?null:e.target.value})}
                row
              >
                <FormControlLabel
                  value={'PEND'}
                  control={<Radio />}
                  label='Pending'
                />
                <FormControlLabel
                  value='P'
                  control={<Radio style={{color:'green'}}/>}
                  label={<Typography style={{color:'green'}}>Passed</Typography>}
                />
                <FormControlLabel
                  value='F'
                  control={<Radio style={{color:'red'}}/>}
                  label={<Typography style={{color:'red'}}>Failed</Typography>}
                />
                <FormControlLabel
                  value='C'
                  control={<Radio />}
                  label='Canceled'
                />
                <FormControlLabel
                  value={'WOP'}
                  control={<Radio />}
                  label='Waiting on Pics'
                />
              </RadioGroup>
            </Grid>

            <Grid item xs={8} container direction='column' spacing={24}>
              <Grid item xs={12} container alignItems='center' style={{marginTop:-4}}>
                <Field2Container
                  key={fReason.id}
                  field = {fReason}
                  lookup_key={'inspection_type'}
                  arrID = {false}
                  state = {dialogState}
                  updateState = {updateState}
                  // noGridWrap = {true}
                  // props that are not used.
                  loadFind={()=>{}}
                  searchForDups={()=>{}}
                  loadMessage={()=>{}}
                />
                <IconButton aria-label='Save' color='secondary' onClick={props.saveReason}>
                  <Tooltip title='Save reason and notes'>
                    <Save size='medium'/>
                  </Tooltip>
                </IconButton>
              </Grid>

              <Grid item xs={12} style={{marginTop:-20}}>
                <Field2Container
                  key={fNotes.id}
                  field = {fNotes}
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
            </Grid>
          </Grid>
          {dialogState.reasons.length > 0 &&
          <Grid item xs={12} style={{padding:'0 0 0 10px'}}>
            <SimpleSortListView
              label = {''}
              fields = {[
                  {name:'order',data_type:'number',label:'ID',column_width:100}
                , {name:'reason',data_type:'text',label:'Reason',column_width:200}
                , {name:'notes',data_type:'text',label:'Notes',column_width:700}
                , {name:'overflow',label:'',column_width:50}
              ]}
              data = {dialogState.reasons}
              deleteRow={props.deleteReason}
              sort = {{field:'order',data_type:'number',direction:'A'}}
            />
          </Grid>}
        </Grid>
      </Grid>

      <Grid item xs={12} container alignItems='center'>
        <Grid item >
          <Typography style={{padding:'10px 20px 10px 5px',fontWeight:'bold',color:'gray'}}>Trello</Typography>
        </Grid>
        <Grid item >
          <FormControlLabel
            control={
              <Switch
                checked={dialogState.updateTrello}
                onChange={e=>updateState({updateTrello:e.target.checked})}
                value='updateTrello'
                color='secondary'
              />
            }
            label='Update?'
          />
        </Grid>

        {dialogState.updateTrello &&
        <Grid item xs={12} style={{margin:10}}>
          {/* container is parent tag*/}
          <TrelloFGContainer
            // key={id}
            // key={child.rship_id}
            fieldGroup = {fgTrello}
            fgStyles = {{}}
            hideLabel = {true}
            // toggleScopeDialog={()=>{}}
            // removeScope={false}
            // props below manage state within dialog only
            // parentState={this.state}
            findAction={props.findAction}
            dialogState={props.dialogState}
            updateState={props.updateState}
            handleChangeCustomized={props.handleChangeCustomized}
            clearState={props.handleClear}
            saveState={props.handleSave}
            handleClose={props.handleClose}
            handleSubmit={props.handleSave}
            handleDelete={props.handleDelete}
          />
        </Grid>
        }
      </Grid>

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

      {dialogState.id && inspections.pastProjectSpecific.length>0 &&
      <ListTabularFG
        title = {'Other Inspections'}  // override the title
        titleStyles = {{padding:5,fontWeight:'bold',color:'gray'}} // override the title style
        fieldGroup={fieldGroup}
        // fgStyles={false}
        // fgTools={false}
        parentState={dialogState}
        primaryFields = {primaryFields}
        nestedFields = {nestedFields}
        data = {inspections.pastProjectSpecific}
        // deleteRow={props.deleteReason}
        // sort = {{field:'order',data_type:'number',direction:'A'}}
      />
      }
    </Grid>
  )
}
)
