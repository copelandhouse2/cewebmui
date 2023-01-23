import { env } from '../envVars';
import React, { Fragment } from 'react';

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { Field2Container } from '../containers/ceFieldContainer';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';

// colors
const green = '#81c784'  // Mat UI green 300
const red = '#ff8a65'  // Mat UI red 300
const yellow = '#ffd54f'  // Mat UI amber 300

const styles = theme => ({

});

// Not used right now.  Using the client.js auth version.
export const DialogTrelloAuthFG = withStyles(styles, { withTheme: true })(
(props) => {
  const { fieldGroup, dialogState, updateState } = props;
  // const { classes, theme, fieldGroup, toggleScopeDialog, removeScope, dialogState, scopeID, updateState } = props;
  // console.log(env);

  return (
    <Grid container>
      <Grid item xs={12} style={ props.fgStyles? props.fgStyles:{marginTop: 20, marginBottom: 20, borderTop:'1px solid black'} }>
        <Typography align='left' style={{fontWeight: 500}}>
          {!props.hideLabel?fieldGroup.label:null}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={32}>
          <Grid item xs={12}>
            <Typography variant='h6'>
              <b>Dear Webtools user,</b>
            </Typography>
            <br/>
            <Typography>
            In order for Webtools to create or modify trello cards on your behalf,
            you need to give Webtools permission to Trello.  To grant permission,
            please do the following:
            </Typography>
            <br/>
            <ol>
            <Typography style={{marginLeft:10}}>
            <li>First, make sure you are logged into Trello.</li>
            <li>Next, click the link below to grant permission.
            Scroll to the bottom of the authorization page and press "Allow".
            You will be directed to your token which grants permission to Webtools
            </li>
            <li>Copy the generated Trello token, paste it in the field below and press submit.</li>
            </Typography>
            </ol>
            <br/>
            {/*<Typography >
            <a
              href={`https://trello.com/1/authorize?expiration=never&name=CE%20Webtools&scope=read,write&response_type=token&key=${env.TRELLO_KEY}`}
              target='_blank'
            >
              Trello permission for Webtools
            </a>
            </Typography>*/}
          </Grid>
          {fieldGroup.children.map((field, id)=>{
            console.log('in DialogTrelloAuthFG', field);
            return (<Field2Container
              key={field.id}
              field = {field}
              arrID = {false}
              state = {dialogState}
              updateState = {updateState}
              noGridWrap = {true}
              // props that are not used.
              loadFind={()=>{}}
              searchForDups={()=>{}}
              loadMessage={()=>{}}

            />);
          })}
          <Grid item xs={12}>
            <Typography align='center' variant='subtitle1'>
            <a
              href={`https://trello.com/1/authorize?expiration=never&name=CE%20Webtools&scope=read,write&response_type=token&key=${env.TRELLO_KEY}`}
              target='_blank'
            >
              Trello permission for Webtools
            </a>
            <br/><br/>
            Paste trello token in field and press submit.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>

  )
}
)

export const TrelloFG = withStyles(styles, { withTheme: true })(
(props) => {
  const { fieldGroup, dialogState, updateState, handleChangeCustomized, trelloInfo } = props;
  // console.info('In TrelloFG',dialogState);

  const fTrelloBoard = fieldGroup.children.find(field=> field.name === 'trello_board');
  const boardLookup = trelloInfo.filter(b=>!b.closed).map(b=>{ return {name:b.name,code:b.id,lists:b.lists} });
  // Object.assign(fTrelloBoard,{lookup_list: []});
  // console.info('boardLookup', boardLookup);
  const fTrelloList = fieldGroup.children.find(field=> field.name === 'trello_list');
  const fTrelloCard = fieldGroup.children.find(field=> field.name === 'trello_card_id');
  const fTrelloCheckitem = fieldGroup.children.find(field=> field.name === 'trello_checkitem');

  // Trello Info //
  // Project Card trello info
  const projTrelloCardID = dialogState.project_trello_card_id;
  const projTrelloBoard = dialogState.project_trello_info?dialogState.project_trello_info.board.name:null;
  const projTrelloList = dialogState.project_trello_info?dialogState.project_trello_info.list.name:null;
  // const projTrelloCardStatus = dialogState.project_trello_info?dialogState.project_trello_info.closed?'Archived':'Active':null;
  const projTrelloCardStatus = dialogState.projectTrelloCardStatus;

  // Inspection Card Trello info.
  const inspTrelloCardID = dialogState.trello_card_id;
  const inspTrelloCardClosed = dialogState.trello_info?dialogState.trello_info.closed?'Archived':'Active':null;

  // const fakeCard='98723409klskjkasdf';

  // console.info('IDs',projTrelloCardID, inspTrelloCardID);
  // ?projTrelloCardStatus:'Not created'

  // Note, props.inspectors is actually the entire contacts.  This ensures that
  // if an initial contact id is present, it will return something.
  const initials = dialogState.contact_id?props.inspectors.find(i=>i.id === dialogState.contact_id).initials:'';
  const inspDate = dialogState.inspection_date?` | ${dialogState.inspection_date}`:'';
  const type = dialogState.inspection_type?` | ${dialogState.inspection_type}`:'';
  const status = dialogState.inspection_status?` | ${dialogState.inspection_status}`:'';
  let rString = '';
  dialogState.reasons.forEach(r=>{
    rString = r.order?
      r.order ===1?
        `  | **${r.order})** ${r.reason} - ${r.notes}`
        :
        `${rString}  **${r.order})** ${r.reason} - ${r.notes}`
      :rString
  })
  const ciValue = `${initials}${inspDate}${type}${status}${rString}`
  // console.log('The possible checkitem entry', ciValue);

  return (
    <Grid container spacing={16}>
      {!props.hideLabel &&
      <Grid item xs={12} style={ props.fgStyles? props.fgStyles:{marginTop: 20, marginBottom: 20, borderTop:'1px solid black'} }>
        <Typography align='left' style={{fontWeight: 500}}>
          {!props.hideLabel?fieldGroup.label:null}
        </Typography>
      </Grid>
      }

      {(projTrelloCardID === null || projTrelloCardID !== inspTrelloCardID) &&
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title={
              <Grid container spacing={0}>
                <Grid item xs={2}><Typography style={{fontStyle:'italic',fontSize:14}}>Project Card:</Typography></Grid>
                <Grid item xs={2}><Typography style={{fontSize:14,fontWeight:500}}>{projTrelloCardStatus}</Typography></Grid>
                <Grid item xs={1}><Typography style={{fontStyle:'italic',fontSize:12}}>Board:</Typography></Grid>
                <Grid item xs={3}><Typography style={{fontSize:12,fontWeight:500}}>{projTrelloBoard}</Typography></Grid>
                <Grid item xs={1}><Typography style={{fontStyle:'italic',fontSize:12}}>List:</Typography></Grid>
                <Grid item xs={3}><Typography style={{fontSize:12,fontWeight:500}}>{projTrelloList}</Typography></Grid>
              </Grid>
            }
            style={{padding:8,backgroundColor:projTrelloCardStatus?projTrelloCardStatus==='Archived'?green:red:yellow}}
          />

        </Card>
      </Grid>
      }

      <Grid item xs={12}>
        <Card
          style={{overflowY:'auto'}}
        >
          <CardHeader
            title={
              <Grid container spacing={0}>
                <Grid item xs={2}><Typography style={{fontStyle:'italic',fontSize:16}}>Inspection Card:</Typography></Grid>
                <Grid item xs={5}><Typography style={{fontSize:16,fontWeight:500}}>{inspTrelloCardID?inspTrelloCardID===projTrelloCardID?'Using project card':'Using alternate card':'Not created'}</Typography></Grid>
                {!inspTrelloCardID &&
                <Fragment>
                <Grid item xs={1}><Typography style={{fontSize:16,fontWeight:500}}>Card?</Typography></Grid>
                <Grid item xs={4}>
                  <RadioGroup
                    value={dialogState.trelloCreateCard}
                    onChange={(e)=>updateState({trelloCreateCard:e.target.value})}
                    row
                  >
                    <FormControlLabel
                      value={'N'}
                      control={<Radio style={{padding:'0px 12px 0px 0px'}}/>}
                      label='Update Project?'
                    />
                    <FormControlLabel
                      value={'Y'}
                      control={<Radio style={{padding:'0px 12px'}}/>}
                      label='Create Alternate'
                    />
                  </RadioGroup>
                </Grid>
                </Fragment>
                }
              </Grid>
            }
            style={{padding:8,backgroundColor:inspTrelloCardClosed?green:yellow}}
          />
          <CardContent>
            <Grid container spacing={16} alignItems='center'>
              <Field2Container
                key={fTrelloBoard.id}
                field = {fTrelloBoard}
                arrID = {false}
                state = {dialogState}
                updateState = {updateState}
                altLookups = {[{name: 'trello_board', name_id: 'trello_board_id', label: 'Board', lookup_list:boardLookup}]}
                handleChangeCustomized = {handleChangeCustomized}
                // noGridWrap = {true}
                // props that are not used.
                loadFind={()=>{}}
                searchForDups={()=>{}}
                loadMessage={()=>{}}
              />
              <Field2Container
                key={fTrelloList.id}
                field = {fTrelloList}
                arrID = {false}
                state = {dialogState}
                updateState = {updateState}
                altLookups = {[{name: 'trello_list', name_id: 'trello_list_id', label: 'List', lookup_list:dialogState.trello_list_lookup}]}
                // noGridWrap = {true}
                // props that are not used.
                loadFind={()=>{}}
                searchForDups={()=>{}}
                loadMessage={()=>{}}
              />
              <Field2Container
                key={fTrelloCard.id}
                field = {fTrelloCard}
                arrID = {false}
                state = {dialogState}
                updateState = {updateState}
                // noGridWrap = {true}
                // props that are not used.
                loadFind={()=>{}}
                searchForDups={()=>{}}
                loadMessage={()=>{}}
              />
              <Grid item xs={1}><Typography style={{fontStyle:'italic',fontSize:12}}>Checkitem Suggestion:</Typography></Grid>
              <Grid item><Typography style={{fontSize:14,fontWeight:400}}>{ciValue}</Typography></Grid>
              <Grid item>
                <IconButton
                  title='Paste value'
                  aria-label="Paste"
                  color='secondary'
                  onClick={(e)=>updateState({trello_checkitem:ciValue})}
                >
                  <FileCopyIcon fontSize='small' />
                </IconButton>
              </Grid>
              <Field2Container
                key={fTrelloCheckitem.id}
                field = {fTrelloCheckitem}
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
          </CardContent>
        </Card>
      </Grid>

    </Grid>

  )
}
)
