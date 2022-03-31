import InspectionModel from "../models/InspectionModel";
import { getScope } from "./ProjectController";
import { tBoards, TrelloModel } from '../models/TrelloModel';

const INSP_BOARD = '57f40236ffdeb772878b1488';
const INSP_LIST = '58b726e1975c14fae6cd2a6d';
// const getScope = async proj => {
//     let promises = [];
//     promises.push(ProjectModel.getScopeItems(proj.id));
//     promises.push(ProjectModel.getRevisions(proj.id));
//     const childData = await Promise.all(promises);
//
//     // childData[0] = scope; childData[1] = revisions
//     // console.log('getScope data', childData);
//     const maxRev = childData[1].length > 0?childData[1][0].revision:null;
//     const maxRevDesc = childData[1].length > 0?childData[1][0].revision_desc:null;
//     const returnData = {...proj, scope: childData[0], revisions: childData[1], revision: maxRev, revision_desc: maxRevDesc};
//     return returnData;
//
//     // promises.push(TrelloModel.put(tUrl, value));
//
// };

export const list =  async (request, response) => {
  // console.log('I am here Inspections');

  try {

    const inspections = await InspectionModel.getInspections(request.params);
    const data = await Promise.all(inspections.map(insp => getReasons(insp)));

    // console.log('Data retrieved... Inspections');
    return response.json(data);

  } catch (err) {
    console.log('Error: ', err);
    // console.log('Error: ', `${err.statusCode} - ${err.responseBody}`);
    return response.json(err);
  }

}

export const listPrevProjectInspections =  async (request, response) => {
  // console.log('I am here Project Specific Inspections');

  try {

    const inspections = await InspectionModel.getPrevProjectInspections(request.params);
    const data = await Promise.all(inspections.map(insp => getReasons(insp)));

    // console.log('Data retrieved... Inspections');
    return response.json(data);

  } catch (err) {
    console.log('Error: ', err);
    // console.log('Error: ', `${err.statusCode} - ${err.responseBody}`);
    return response.json(err);
  }

}

export const getReasons = async insp => {
  // console.log('getReasons data', childData);
  const childData = await InspectionModel.getReasons(insp.id);

  const returnData = {...insp, reasons: childData};
  // console.log('getReasons data', returnData);

  return returnData;

};

// function to get one inspection.
export const show = async (request, response) => {

  try {
    const data = await InspectionModel.getInspectionByID(request.params.id);
    // console.log('Data retrieved... Inspection');
    return response.json(data[0]);

  } catch (err) {
    console.log('Error: ', `${err.statusCode} - ${err.responseBody}`);
    return response.json(err);
  }

}

export const filter = async (request, response) => {

  try {
    const data = await InspectionModel.filterContactsProjects(request.params);
    // console.log('Filter for inspections', data);
    return response.json(data);

  } catch (err) {
    console.log('Error: ', `${err.statusCode} - ${err.responseBody}`);
    return response.json(err);
  }

}


export const filterProjects = async (request, response) => {

  try {
    const projects = await InspectionModel.filterProjects(request.params);
    const projectData = await Promise.all(projects.map(proj => getScope(proj)));

    // console.log(' filterProjects Controller', projectData);
    return response.json(projectData);

  } catch (err) {
    console.log('Error: ', `${err.statusCode} - ${err.responseBody}`);
    return response.json(err);
  }

}

// function to save the Inspection changes... adds and updates and deletes.
// uses a "change" key
export const save = async (request, response) => {

  console.log('STARTING the INSPECTION SAVE',request.body);
  console.clear();

  var errors = [];
  let inspectionPromises = [];
  let updateTrelloInfo = {};

  // console.log('save: data type', request.body.constructor);
  let data = [];
  if (request.body.constructor === Object) {
    // console.info('request.body is an object');
    data.push(request.body);
  } else {
    // console.info('request.body is an array');
    data.concat(request.body);
  }

  // Inspections first
  try {
    for (let i = 0; i<data.length; i++) {
      // change is either unset or value = add, update, delete
      // if unset, skip updating.
      if (data[i].change === 'delete') { //checking to see if we are to delete rev.
        // console.log('delete scope', item.id);
        inspectionPromises.push(InspectionModel.delete(data[i].id));
        inspectionPromises.push(InspectionModel.deleteAllReasons(data[i].id));

      } else {
        const iResp = await InspectionModel.save(data[i]);
        console.log('Inspection saved',iResp);
        // setting up this object to pass to database and update Trello info.
        updateTrelloInfo.id = data[i].id?data[i].id:iResp.insertId;
        // inspectionPromises.push(InspectionModel.save(data[j]));

        for (let r=0; r<data[i].reasons.length; r++) {
          // console.log('inspection reasons',inspection.reasons[i]);
          if (data[i].reasons[r].change === 'delete') {
            inspectionPromises.push(InspectionModel.deleteReason(data[i].reasons[r].id));
          } else {
            const reason = Object.assign({}, data[i].reasons[r]
            , {inspection_id:data[i].reasons[r].inspection_id?data[i].reasons[r].inspection_id:iResp.insertId});
            // console.info('inspection reasons',reason);
            inspectionPromises.push(InspectionModel.saveReason(reason));
          }
        }
      }
    };


  } catch (err) {
    errors.push(err);
  }

  // make all the database calls
  try {
    // console.log('City records to promise: ', cityPromises);
    const inspectionResponses = await Promise.all(inspectionPromises);
    console.info('inspection records created / updated: ');
  } catch (err) {
    // console.log('City record create error:', err);
    errors.push(err);
  }


  // Handle the Trello updates!
  try {
    // const insp = data[0];
    // const curBoard = tBoards.find(b => b.name === 'Inspections');
    // const curList = curBoard.lists.find(l => l.name === 'Upcoming - Inspections');
    // console.log('In the async try',curBoard.name, curBoard.id, curList.name, curList.id);
    for (let i = 0; i<data.length; i++) {
      // if user requested to update Trello...
      if (data[i].updateTrello) {
        console.info('Trello Updates');
        let promises = [];
        // Trello UPDATE

        // project card
        // insp card

        // if insp card
        //    update card
        // else if project card && !trelloCreateCard
        //    update project card
        // else if project card && trelloCreateCard
        //    create DUMMY card
        // else ???
        //    should not exist.  Must at least have project card.
        // end if

        // update custom fields with card id.
        // update checklist with card id.
        let modifiedCard = null;
        if (data[i].trello_card_id) {
          console.info('insp card exists.  Updating');

          // const theCard = await TrelloModel.get(`/1/cards/${data[i].trello_card_id}`);
          // console.log('In the update trello card');
          // const cardUpdResponse = await TrelloModel.put(`/1/cards/${trello_card_id}`, cardUpd)
          // console.log('trello: response', cardUpdResponse);
          // console.log('***Trello card***', theCard);
          const card = {
            closed: false,    // this will unarchive the card.
            idBoard: data[i].trello_board_id,
            idList: data[i].trello_list_id,
            pos: 'top'
          };
          const cResponse = await TrelloModel.put(request.params.trelloToken, `/1/cards/${data[i].trello_card_id}`, card)
          modifiedCard = data[i].trello_info;

        }
        // else if (theCard.idBoard !== INSP_BOARD) { // board is active somewhere else.
        // user wants to UPDATE the project trello card.
        else if (data[i].project_trello_card_id && data[i].trelloCreateCard === 'N') {
          console.info('insp card DNE, project exists and wish to update.  Updating...');

          const card = {
            closed: false,    // this will unarchive the card.
            idBoard: data[i].trello_board_id,
            idList: data[i].trello_list_id,
            pos: 'top'
          };
          const cResponse = await TrelloModel.put(request.params.trelloToken, `/1/cards/${data[i].project_trello_card_id}`, card)
          modifiedCard = data[i].project_trello_info;
        }

        // user wants to create an alternate card.
        else if (data[i].project_trello_info && data[i].trelloCreateCard === 'Y') { // board is active somewhere else.
          console.info('insp card DNE, project exists but want to create new card.  Creating...');

          // const projectCard = await TrelloModel.get(`/1/cards/${data[i].project_trello_card_id}`);
          const card = {
            name: `** DUMMY ** ${data[i].project_trello_info.name}`,
            closed: false,    // this will unarchive the card.
            idBoard: data[i].trello_board_id,
            idList: data[i].trello_list_id,
            pos: 'top',
          };

          const cNewCard = await TrelloModel.post(request.params.trelloToken, `/1/cards/`, card);
          // console.log('New Card, url to add',cNewCard, projectCard.shortUrl);
          // add MAIN card attachment
          const urlAtt = `1/cards/${cNewCard.id}/attachments`;
          const valueAtt = { url:data[i].project_trello_info.shortUrl };
          const rAtt = await TrelloModel.post(request.params.trelloToken, urlAtt, valueAtt)
          // console.log('trello response',cResponse);
          modifiedCard = cNewCard;
        }

        else {
          console.info('Nothing to update folks',data[i]);
          // trello card not created.
        }

        // Update database with card id.
        updateTrelloInfo.card_id = modifiedCard.id;

        // if (modifiedCard && !data[i].trello_card_id) {
        //
        // }
        // a trello card was modified.  So we will use it to update
        // the checklist and update custom fields.
        if (modifiedCard) {
          console.info('Now updating checklists and custom fields',modifiedCard);

          //////////////////////////////////
          ///// Checklist / CheckItems /////
          //////////////////////////////////
          let respChkItem = null;
          // Checkitem exists.  Need to update it.
          if (data[i].trello_checkitem_id) {
            console.info('Checkitem exists.  Updating...');

            // add Checklist item on DUMMY card
            const urlChkI = `1/cards/${modifiedCard.id}/checkItem/${data[i].trello_checkitem_id}`;
            // const valueChkI = { name:'PP | Travis | F', pos:'top' };
            const valueChkI = `name=${data[i].trello_checkitem}`;
            respChkItem = await TrelloModel.put(request.params.trelloToken, `${urlChkI}?${valueChkI}`);
          }
          // Checkitem does not exist.  Need to ADD it.  Need to check
          // and see if Inspections checklists exists or not.  If not, create.
          else {
            console.info('Checkitem DNE.  Need to add');

            // if ('checklists' in modifiedCard)
            const inspCL = 'checklists' in modifiedCard?modifiedCard.checklists.find(cl=> cl.name === 'Inspections'):null;

            // IF: Inspection checklist exists, add checkitem to it.
            // ELSE: No inspection checklist, need to create it, then add checkitem to it.
            if (inspCL) {
              console.info('Inspection Checklist exists, adding checkitem to it');

              const urlChkI = `1/checklists/${inspCL.id}/checkItems`;
              const valueChkI = `name=${data[i].trello_checkitem}`;
              respChkItem = await TrelloModel.post(request.params.trelloToken, `${urlChkI}?${valueChkI}`);

            } else {
              console.info('Checklist DNE.  Need to create it, then add checkitem');

              const urlChk = `1/cards/${modifiedCard.id}/checklists`;
              const valueChk = { name:'Inspections', pos:'top' };
              const respChk = await TrelloModel.post(request.params.trelloToken, urlChk, valueChk)
              console.info('trello checklist',respChk);

              const urlChkI = `1/checklists/${respChk.id}/checkItems`;
              const valueChkI = `name=${data[i].trello_checkitem}`;
              respChkItem = await TrelloModel.post(request.params.trelloToken, `${urlChkI}?${valueChkI}`);

            }
          }

          updateTrelloInfo.checkitem_id = data[i].trello_checkitem_id?data[i].trello_checkitem_id:respChkItem.id;
          console.info('trello info',updateTrelloInfo);
          const dbTrelloUpdate = await InspectionModel.updateTrelloInfo(updateTrelloInfo);

          /////////////////////////
          ///// Custom Fields /////
          /////////////////////////
          const custFields = tBoards.find(board => board.id === data[i].trello_board_id).customFields;
          let value = {}, tUrl = '', idValue = '';
          custFields.forEach(field => {
          switch (field.name.toUpperCase()) {
            case 'INSP CONTACT':
              // console.log('phase', project_status);
              if (data[i].inspection_contact) {
                // idValue = field.options.find(opt => opt.value.text.toUpperCase() === project_status).id;
                // console.log('idValue', idValue);
                value = {
                  value: {'text': data[i].inspection_contact}  // need to fix when null.  only update when value exists.
                };
                tUrl = `1/cards/${modifiedCard.id}/customField/${field.id}/item`;
                // console.log('url for custom field', tUrl);
                promises.push(TrelloModel.put(request.params.trelloToken, tUrl, value));
              }
              break;
            case 'CABLE COMPANY':
              console.log('cable company', data[i].cable_company);

              if (data[i].cable_company) {
                idValue = field.options.find(opt => opt.value.text.toUpperCase() === data[i].cable_company.toUpperCase()).id
                // idValue = optValue.id;
                console.log('idValue', idValue);
                value = {
                  idValue: idValue  // need to fix when null.  only update when value exists.
                };
                tUrl = `1/cards/${modifiedCard.id}/customField/${field.id}/item`;
                promises.push(TrelloModel.put(request.params.trelloToken, tUrl, value));
              }
              break;
            case 'TSD':
              // console.log('phase', project_status);
              if (data[i].target_stress_date) {
                const newDate = new Date(data[i].target_stress_date);
                const tzOffset = newDate.getTimezoneOffset();
                newDate.setMinutes(tzOffset);
                // console.log('dates', onboard_date, newDate);
                value = {
                  value: {'date': newDate.toString()}  // need to fix when null.  only update when value exists.
                };
                tUrl = `1/cards/${modifiedCard.id}/customField/${field.id}/item`;
                // console.log('url for custom field', tUrl);
                promises.push(TrelloModel.put(request.params.trelloToken, tUrl, value));
              }
              break;
            case 'INSP & DATE':
              // console.log('phase', project_status);
              if (data[i].inspection_type) {
                let insp_date = ''
                if (data[i].inspection_type === 'PP' || data[i].inspection_type === 'STRESS') {
                  insp_date = `${data[i].inspection_type} / ${data[i].inspection_date}`
                } else {
                  insp_date = `${data[i].scope} ${data[i].inspection_type} / ${data[i].inspection_date}`
                }
                // console.log('dates', onboard_date, newDate);
                value = {
                  value: {'text':insp_date }  // need to fix when null.  only update when value exists.
                };
                tUrl = `1/cards/${modifiedCard.id}/customField/${field.id}/item`;
                // console.log('url for custom field', tUrl);
                promises.push(TrelloModel.put(request.params.trelloToken, tUrl, value));
              }
              break;
            default:
              break;
            }
          });
          // promises.push(timeout(3300));
          const custFieldResponse = await Promise.all(promises);
        } // if modifiedCard exists.
      }  // if updateTrello flag
    }  // for loop
  } catch (err) {
    // console.log('City record create error:', err);
    errors.push(err);
  }

  // console.log('Create return... back to browser');
  if (errors.length) {
    console.log('Done with error(s)', errors);
    return response.json(errors);
  }
  console.log('Inspection saved');
  return response.json({message: 'Inspection saved'});

}

// user has selected an inspection to modify.  Pulling the inspection information
// also pulling previous inspections on this property.
export const editInspection = async (request, response) => {
  // console.log('I am here Project Specific Inspections', request.params);

  try {

    const projects = await InspectionModel.getProjectByID(request.params.proj_id);
    const projectData = await Promise.all(projects.map(proj => getScope(proj)));

    const inspections = await InspectionModel.getPrevProjectInspections(request.params);
    const data = await Promise.all(inspections.map(insp => getReasons(insp)));

    const allData = {
      project: {...projectData[0]},
      inspections: [...data]
    }
    // console.log('Data retrieved... Inspections', allData);
    return response.json(allData);

  } catch (err) {
    console.log('Error: ', err);
    // console.log('Error: ', `${err.statusCode} - ${err.responseBody}`);
    return response.json(err);
  }

}

export const remove = async (request, response) => {

  let errors = [];
  let inspectionPromises = [];
  console.log('inspection remove', request.params.id);
  // const deleteResp = await InspectionModel.delete(request.params.id);
  inspectionPromises.push(InspectionModel.delete(request.params.id));
  inspectionPromises.push(InspectionModel.deleteAllReasons(request.params.id));

  try {
    // return response.json('Inspection Deleted');
    const inspectionResponses = await Promise.all(inspectionPromises);
  } catch (err) {
    // console.log('MySQL delete error: ', err);
    // return response.json(err);
    errors.push(err);

  }

  if (errors.length) {
    console.log('MySQL Delete Done with error(s)', errors);
    return response.json(errors);
  }
  console.log('Inspection deleted');
  return response.json({message: 'Inspection deleted'});
}

// function to save the Reason changes... adds and updates and deletes.
// uses a "change" key
const saveReason = async (reasons) => {

  // console.log('in ProjectController.saveRevisions', request.body);
  var errors = [];

  let reasonPromises = [];
  let data = [];
  if (reasons.constructor === Object) {
    console.log('request.body is an object');
    data.push(reasons);
  } else {
    console.log('request.body is an array');
    data.concat(reasons);
  }
  console.log('data', data);

  data.forEach((reason, i) => {
    // console.log('City: Adding / Adjusting: ', city);

    // change is either unset or value = add, update, delete
    // if unset, skip updating.
    if (reason.change === 'delete') { //checking to see if we are to delete rev.
      // console.log('delete scope', item.id);
      reasonPromises.push(InspectionModel.deleteReason(reason.id));
    } else {  // wish to delete the scope record.
      // console.log('add/update city', city.id);
      reasonPromises.push(InspectionModel.saveReason(reason));
    }

  });

  try {
    // console.log('City records to promise: ', cityPromises);
    const reasonResponses = await Promise.all(reasonPromises);
    // console.log('City records created / updated: ', cityResponses);
  } catch (err) {
    // console.log('City record create error:', err);
    errors.push(err);
  }

  // console.log('Create return... back to browser');
  if (errors.length) {
    console.log('Done with error(s)', errors);
    return response.json(errors);
  }
  console.log('Reasons saved');
  return response.json({message: 'Reasons saved'});

}

const removeReason = async (reason) => {

  try {
    console.log('inspection remove', reason.id);
    const deleteResp = await InspectionModel.delete(reason.id);
    return response.json('Reason Deleted');

  } catch (err) {
    console.log('MySQL delete error: ', err);
    return response.json(err);

  }
}


// Trello ADD
// } else {  // create card on incoming list
//   const subStr = data[i].subdivision? ' - ' + data[i].subdivision : '';
//   const cityStr = data[i].city? ' - ' + data[i].city : '';
//   const cardName = data[i].job_number + ' - ' + data[i].address1 + subStr + cityStr + ' - ' + data[i].client;
//
//   const card = {
//     name: `** TEST ** ${cardName}`,
//     closed: false,    // this will unarchive the card.
//     idBoard: INSP_BOARD,
//     idList: INSP_LIST,
//     pos: 'top'
//   };
//   const cResponse = await TrelloModel.post(`/1/cards/`, card)
//
//   console.log('Trello card created');
  // tCardID = cardInsResponse.id;
