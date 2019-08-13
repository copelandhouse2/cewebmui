// import addresses from '../addresses.js';
// import AddressModel from '../models/AddressModel';
import ProjectModel from '../models/ProjectModel';
import JobNumberSeqModel from '../models/JobNumberSeqModel';
import { sql } from '../mysqldb';
import { trello, tBoards } from '../trello';
import TrelloModel from '../models/TrelloModel';

// import { tBoards } from "./TrelloInitController"  // not working.  Bizarre
// import { TRELLO_PARAMS } from '../../envVars';

// code to test for daylight savings time or not.
Date.prototype.stdTimezoneOffset = () => {
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    // console.log('timezone', jan, jul);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}

Date.prototype.isDstObserved = () => {
    return this.getTimezoneOffset() < this.stdTimezoneOffset();
}

const timeout = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// function to get the list of addresses.
export const list = (request, response) => {

  // Listing from mongoDB
  // AddressModel.find({}).exec()
  // .then(addresses => {
  //   return response.json(addresses);
  // });

  ProjectModel.getProjects(request.params, function (err, rows, fields) {
    // console.log('getProjects', request.params);
    // console.log('getProjects', rows);

    if (!err) {
      // console.log('Data retrieved... Projects');
      return response.json(rows);
    }
    else {
      // console.log('Projects: Error while performing Query.', err);
      return response.json(err);
    }
  });
}

// function to get the list of addresses.
export const listPending = (request, response) => {

  ProjectModel.getPendingProjects(request.params.userID, function (err, rows, fields) {
    // console.log('Pending Projects: err', err);
    // console.log('Pending Projects: rows', rows);
    // console.log('Pending Projects: fields', fields);
    if (!err) {
      // console.log('Data retrieved... Pending rows');
      return response.json(rows);
    }
    else {
      // console.log('Projects: Error while performing Query.');
      return response.json(err);
    }
  });
}

export const listDups = async (request, response) => {

  // ProjectModel.getDups(request.params, function (err, rows, fields) {
  //   console.log('getDups', request.params);
  //   console.log('getDups', rows);
  //
  //   if (!err) {
  //     console.log('Data retrieved... Dups');
  //     return response.json(rows);
  //   }
  //   else {
  //     console.log('Projects: Error while performing Query.', err);
  //     return response.json(err);
  //   }
  // });

  try {
    // console.log('in db update.  Params:', id, tCardID);
    const dups = await ProjectModel.getDups(request.params);
    console.log('listDups', request.params);
    console.log('listDups', dups);
    return response.json(dups);

  } catch (err) {
    // console.log('MySQL Update record Error: ', `${err.errno}:${err.code} - ${err.sqlMessage}`);
    // errors.push(err);
    // throw new Error(err);
    return response.json(err);

  }
}

// function to get details of one address
export const show = (request, response) => {

  // AddressModel.findById(request.params.id).exec()
  // .then(address => {
  //   return response.json(address);
  // });

  // return response.json(addresses.find(address => address._id == request.params.id));

  ProjectModel.getProjectByID(request.params.id, function (err, rows, fields) {
    if (!err) {
      // console.log('Data retrieved... Project by ID!');
      return response.json(rows[0]);
    }
    else {
      // console.log('Project: Error while performing Query.');
      return response.json(err);
    }
  });

}

// function to create a address
export const create = (request, response) => {
  ProjectModel.addProject(request.body, function(err, result) {
    if (err) {
      console.log('Controller Create Err', err);
      return response.json(err);  // If there is an error.
    }
    // console.log('Controller callback: result', result);
    const insertID = response.json(result);
    return insertID;

  });  // end of callback function and addProject
}

// function to create a address
export const commit = (request, response) => {
  // console.log('Project Controller.commit request', request.body.length, request.params.create);

  //Central time offsets.  Treating these like Globals for this function rightn now.
  var CST_OFFSET = 360;  //starts fist sun in Nov
  var CDT_OFFSET = 300;  // starts 2nd sun in Mar
  // const tzoffset = dueDate.isDstObserved()? CDT_OFFSET : CST_OFFSET;
  var tzOffset = CDT_OFFSET;
  // console.log('query', SQLstmt);
  // sql().query(SQLstmt, values, function (err, result) {

  // NEED TO PUT FOR LOOP ON OUTSIDE OF PROMISES.  ORDER OF PROMISES
  // Loop on request body (contains all pending records)
  //  Trello Promise (gets card id)
  //  generate all promises and put them in array...
  //    customFields promises
  //    SQL Promise: update status = ACTIVE, trello_card_id = trello_card_id
  //  return promise.all
  // .then check results.
  // END LOOP
  (async () => {
    var errors = [];
    for (let i = 0, len = request.body.length; i < len; i++) {

      // console.log('Processing: ',i);

      // test to see if we need to create the project record first.  Support for Quick Entry Submit.
      var newRecord = null;
      if (request.params.create === 'true') {
        try {
          // console.log('getting ready to add record.');
          const addRecordResponse = await ProjectModel.addProject(request.body[i]);
          newRecord = await ProjectModel.getProjectByID(addRecordResponse.insertId)
          // console.log('new DB record created', newRecord);
          console.log('new DB record created');

        } catch (err) {
          console.log('Record create error:', err);
          errors.push(err);
        }
      }
      // Get the variables.
      // console.log('newRecord', newRecord[i]);
      // console.log('request.body:',i,request.body[i]);
      if (newRecord) {
        var {id, job_number} = newRecord[i];
      } else {
        var {id, job_number} = request.body[i];
      }
      // console.log('the id, job_number: ', id, job_number);
      const {revision, revision_desc, client_id, client, owner_id, requestor, requestor_id, city, subdivision, address1, address2, phase, section, lot, block
        , fnd_height_fr, fnd_height_fl, fnd_height_rr, fnd_height_rl, plan_type, elevation, masonry, garage_type
        , garage_entry, garage_swing, garage_drop, garage_extension, covered_patio, bay_window, master_shower_drop
        , bath1_shower_drop, bath2_shower_drop, bath3_shower_drop, geo_lab, geo_report_num, geo_report_date
        , geo_pi, em_center, em_edge, ym_center, ym_edge, soil_notes, additional_options, comments, status, project_status, scope, classification, due_date, final_due_date
        , start_date, onboard_date, transmittal_date, main_contact, billing_contact, builder_contact, foundation_type, floor_type
        , roof_type, num_stories, square_footage, pita_factor, trello_list, trello_list_id, trello_card_id, box_folder
        , created_by, last_updated_by
      } = request.body[i];

      // console.log('values', trello_list_id, trello_card_id, due_date, revision, revision_desc);

      // trello card id exists, locating the description and board id for later.
      var currentDesc = null;
      if (trello_card_id) {
        try {
          // console.log('pulling values for the card');
          const cardInfo = await TrelloModel.get(`/1/cards/${trello_card_id}`);
          currentDesc = cardInfo.desc;
          // console.log('Pulled description', currentDesc);
          console.log('Pulled description');

        } catch (err) {
          console.log('Record get error:', err);
          errors.push(err);
        }
      }

      // The main statement to create / update Trello Cards
      // defined tCardID to use for the database.
      var tCardID = null;
      if (trello_card_id || trello_list_id) {  // trello card to be updated / created.

        const enteredDesc = !currentDesc? '' :
          currentDesc.search('__________') > -1? currentDesc.slice(currentDesc.search('__________')+10):
          currentDesc;
        // Defining the title (or name) of the card.
        const subStr = subdivision !=='' ? ' - ' + subdivision : '';
        const cityStr = city !=='' ? ' - ' + city : '';
        const cardName = job_number + ' - ' + address1 + subStr + cityStr + ' - ' + client;

        // Defining the description for volume client cards.
        const gs = garage_swing? garage_swing === 'RIGHT'? 'R':'L' : '';
        console.log('masonry', ':'||masonry||':');
        const ms = masonry === 'PLAN'? ', PLAN' : masonry === null||masonry ===''? '' : `, ${masonry}SM`
        const gext = garage_extension? `X${garage_extension}` : '';
        const gdrop = garage_drop? `D${garage_drop}` : '';
        const gt = garage_type? `, ${garage_type}${gext}${gdrop}` : '';
        const cp = covered_patio === 'EXTCP'? ', ExtCP' :
                   covered_patio === 'Y'? ', CP' : '';
        const bw = bay_window === 'Y'? ', BW':'';
        const pi = geo_pi === null? '' : geo_pi;
        const rev = revision? `\n\n**REV ${revision}:** ${revision_desc}` : '';
        const soil = soil_notes? `\n\n**SOIL NOTES:** ${soil_notes}` : '';
        const opt = additional_options? `\n\n**ADDL OPTIONS:** ${additional_options}` : '';
        const com = comments? `\n\n**COMMENTS:** ${comments}` : '';
        const end = `\n\n*Do not erase line below.  Used by webtools.  All information above line is auto-generated.  Anything below line is for your use and will be protected from overwrite.*\n__________`;
        const cardDesc = trello_list === 'CUSTOM QUEUE'? '': `**${plan_type} ${elevation}${gs}${ms}${gt}${cp}${bw}, PI=${pi}**${rev}${soil}${opt}${com}${end}${enteredDesc}`;

        // console.log('card name', cardName);
        // console.log('gs, cp, bw, ms, pi', gs, cp, bw, ms, pi);
        // console.log('card desc', cardDesc);

        var dueDate = '';
        if (due_date) {
          dueDate = new Date(due_date);
          const fivePMoffset = 1020;
          // console.log('dueDate prior to offset', dueDate.toString(), tzOffset, fivePMoffset);
          const offset = new Date().getTimezoneOffset();
          dueDate.setMinutes(tzOffset+fivePMoffset);  // midnight + 17 hours for 5pm.
          // console.log('dueDate after offset', dueDate.toString(), offset);
        }

        // Defining the trello card.  If trello list is set, then it will create / move
        // the card to that list.
        var card = {
          idList: trello_list_id,
          // idList: TRELLO_PARAMS.LIST_VOL,
          name: cardName,
          desc: cardDesc,
          pos: 'bottom',
          due: dueDate ? dueDate.toString() : '',
          // idMembers: [
          //   '58b59960d7577cb345109019',
          //   '5924a3ec925ff977c3dfed10',
          //   '5a2e951406cbac46270c660a',
          //   '5a8afb044f2a4b4734e91714',
          //   '57f3d91f12d06b6f73a208ca'
          // ],
          // idLabels:[
          //   '584875b284e677fd36a93486',
          //   '5a46babfd2c5d12039d522d1',
          // ],
          // idChecklists: [
          //   '5c2e871eaf87548a254b000a',
          //   '5c2e871eaf87548a254b000f'
          // ]
        };

        var cardUpd = {
          name: cardName,
          desc: cardDesc,
          pos: 'bottom',
          due: dueDate ? dueDate.toString() : '',
          closed: false,    // this will unarchive the card.
          // idList: trello_list_id,
        };

        // Create or update the base Trello card.
        try {
          // console.log('In the async try');
          // var currentBoard = {};
          if (trello_card_id) { // update card.  Leave on current list.

            // console.log('In the update trello card');
            const cardUpdResponse = await TrelloModel.put(`/1/cards/${trello_card_id}`, cardUpd)
            // console.log('trello: response', cardUpdResponse);
            console.log('Trello card updated');
            tCardID = trello_card_id;
            // console.log('card id(s)', trello_card_id, cardUpdResponse);
          } else if (trello_list_id) {  // create card on incoming list
            // console.log('In the insert trello card', card);
            const cardInsResponse = await TrelloModel.post('/1/cards/', card);
            // console.log('trello: response', cardInsResponse);
            console.log('Trello card created');
            tCardID = cardInsResponse.id;
          }

        } catch (err) {
          // console.log('Trello Card Error: ', `${err.statusCode} - ${err.responseBody}`);
          errors.push(err);
          // throw new Error(err);
        }

        // Updating the custom Fields on Trello card.
        // custom fields have different ids per board.  Annoying I know.
        try {
          if (tCardID) {
            let promises = [];
            // console.log('Trello Update custom Fields');
            // const me = await TrelloModel.get(`/1/members/me`);
            // console.log('me', me);
            const currentBoard = await TrelloModel.get(`/1/cards/${tCardID}/board`);
            // console.log('the board', currentBoard.id);
            const custFields = tBoards.find(board => board.id === currentBoard.id).customFields;
            // console.log('currentBoard: ', currentBoard);
            let value = {}, tUrl = '', idValue = '';
            custFields.forEach(field => {
              switch (field.name.toUpperCase()) {
                case 'DESIGN DUE DATE':
                case 'FINAL DUE DATE':
                  // console.log('design due date', final_due_date);
                  if (final_due_date) {
                    const newDate = new Date(final_due_date);
                    // const tzOffset = new Date(final_due_date).getTimezoneOffset();
                    newDate.setMinutes(tzOffset);
                    // console.log('dates', final_due_date, newDate);
                    value = {
                      value: {'date': newDate.toString()}  // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(tUrl, value));
                  }
                  break;
                case 'PHASE':
                  // console.log('phase', project_status);
                  if (project_status) {
                    idValue = field.options.find(opt => opt.value.text.toUpperCase() === project_status).id;
                    // console.log('idValue', idValue);
                    value = {
                      idValue: idValue  // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(tUrl, value));
                  }
                  break;
                case 'YM (C,E)':
                case 'YM(C,E)':
                  // console.log('ym');
                  var ym_value = ym_center? ym_center.toString()+', ':', ';
                  ym_value = ym_edge? ym_value+ym_edge.toString():ym_value;
                  value = {
                    value: {'text': ym_value}  // need to fix when null.  only update when value exists.
                  };
                  tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                  // console.log('url for custom field', tUrl);
                  promises.push(TrelloModel.put(tUrl, value));
                  break;
                case 'EM (C,E)':
                case 'EM(C,E)':
                  // console.log('em');
                  var em_value = em_center? em_center.toString()+', ':', ';
                  em_value = em_edge? em_value+em_edge.toString():em_value;
                  value = {
                    value: {'text': em_value}  // need to fix when null.  only update when value exists.
                  };
                  tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                  // console.log('url for custom field', tUrl);
                  promises.push(TrelloModel.put(tUrl, value));
                  break;
                case 'DESIGN P.I.':
                case 'DESIGN PI':
                  // console.log('PI', geo_pi);
                  if (geo_pi) {
                    value = {
                      value: {'text': geo_pi}  // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(tUrl, value));
                  }
                  break;
                case 'SQFT':
                  // console.log('SQFT', square_footage);
                  if (square_footage) {
                    value = {
                      value: {'number': square_footage.toString()}  // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(tUrl, value));
                  }
                  break;
                case '# STORYS':
                  // console.log('Stories', num_stories);
                  if (num_stories) {
                    idValue = field.options.find(opt => opt.value.text === num_stories.toString()).id;
                    // console.log('idValue', idValue);
                    value = {
                      idValue: idValue  // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(tUrl, value));
                  }
                  break;
                case 'STORYS':
                  // console.log('STORYS', num_stories);
                  if (num_stories) {
                    value = {
                      value: {'number': num_stories.toString()}  // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(tUrl, value));
                  }
                  break;
                case 'ROOF TYPE':
                  // console.log('Roof Type', roof_type);
                  if (roof_type) {
                    idValue = field.options.find(opt => opt.value.text.toUpperCase() === roof_type).id;
                    // console.log('idValue', idValue);
                    value = {
                      idValue: idValue  // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(tUrl, value));
                  }
                  break;
                case 'FLOOR TYPE':
                  // console.log('Floor Type', floor_type);
                  if (floor_type) {
                    idValue = field.options.find(opt => opt.value.text.toUpperCase() === floor_type).id;
                    // console.log('idValue', idValue);
                    value = {
                      idValue: idValue  // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(tUrl, value));
                  }
                  break;
                case 'FOUNDATION TYPE':
                case 'FDN TYPE':
                  // console.log('Foundation Type', foundation_type);
                  if (foundation_type) {
                    idValue = field.options.find(opt => opt.value.text.toUpperCase() === foundation_type).id;
                    // console.log('idValue', idValue);
                    value = {
                      idValue: idValue  // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(tUrl, value));
                  }
                  break;
                case 'CLIENT ID':
                  // console.log('Client ID', client_id);
                  value = {
                    value: {'number': client_id.toString()}  // need to fix when null.  only update when value exists.
                  };
                  tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                  // console.log('url for custom field', tUrl);
                  promises.push(TrelloModel.put(tUrl, value));
                  break;
                case 'ON -BOARD DATE':
                case 'ONBOARD DATE':
                  // console.log('Onboard Date', onboard_date);
                  if (onboard_date) {
                    const newDate = new Date(onboard_date);
                    // const tzOffset = new Date(onboard_date).getTimezoneOffset();
                    newDate.setMinutes(tzOffset);
                    // console.log('dates', onboard_date, newDate);
                    value = {
                      value: {'date': newDate.toString()}  // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(tUrl, value));
                  }
                  break;
                case 'BLOCK, LOT':
                  // console.log('Block Lot', block, lot);
                  if (block || lot) {
                    value = {
                      value: {'text': `${block}, ${lot}`}  // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(tUrl, value));
                  }
                  break;
                case 'BLOCK':
                  // console.log('Block', block);
                  if (block) {
                    value = {
                      value: { 'text': block }
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(tUrl, value));
                  }
                  break;
                case 'LOT':
                  // console.log('Lot', lot);
                  if (lot) {
                    value = {
                      value: { 'text': lot }
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(tUrl, value));
                  }
                  break;
                case 'ORIGINAL DUE DATE':
                case 'TRANSMITTAL DATE':
                  // console.log('Transmittal Date', transmittal_date);
                  if (transmittal_date) {
                    const newDate = new Date(transmittal_date);
                    // const tzOffset = new Date(transmittal_date).getTimezoneOffset();
                    newDate.setMinutes(tzOffset);
                    // console.log('dates', transmittal_date, newDate);
                    value = {
                      value: {'date': newDate.toString()}  // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(tUrl, value));
                  }
                  break;
                case 'JOB NUMBER':
                  // console.log('Job Number', job_number);
                  value = {
                    value: {'number': job_number.toString()}  // need to fix when null.  only update when value exists.
                  };
                  tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                  // console.log('url for custom field', tUrl);
                  promises.push(TrelloModel.put(tUrl, value));
                  break;
                case 'START DATE':
                  // console.log('Start Date', start_date);
                  if (start_date) {
                    const newDate = new Date(start_date);
                    // const tzOffset = new Date(start_date).getTimezoneOffset();
                    newDate.setMinutes(tzOffset);
                    // console.log('dates', start_date, newDate);
                    value = {
                      value: {'date': newDate.toString()}  // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(tUrl, value));
                  }
                  break;
                case 'BUILDER':
                  // console.log('Builder', builder_contact);
                  if (builder_contact) {
                    value = {
                      value: {'text': builder_contact}  // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(tUrl, value));
                  }
                  break;
                case 'SUBDIVISION':
                  // console.log('Subdivision', subdivision);
                  if (subdivision) {
                    value = {
                      value: {'text': subdivision}  // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(tUrl, value));
                  }
                  break;
                case 'BILLING':
                case 'BILLING CONTACT':
                  // console.log('Billing', billing_contact);
                  if (billing_contact) {
                    value = {
                      value: {'text': billing_contact}  // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(tUrl, value));
                  }
                  break;
                case 'CONTACT':
                case 'DESIGN CONTACT':
                  // console.log('Main Contact', main_contact);
                  if (main_contact) {
                    value = {
                      value: {'text': main_contact}  // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(tUrl, value));
                  }
                  break;
                case 'CLASSIFICATION':
                  // console.log('Classification', classification);
                  if (classification) {
                    idValue = field.options.find(opt => opt.value.text.toUpperCase() === classification);
                    if (idValue) {
                      // console.log('idValue', idValue);
                      value = {
                        idValue: idValue.id  // need to fix when null.  only update when value exists.
                      };
                      tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                      // console.log('url for custom field', tUrl);
                      promises.push(TrelloModel.put(tUrl, value));
                    }
                  }
                  break;
                case 'STATUS':
                  // console.log('Status', project_status);
                  if (project_status) {
                    idValue = field.options.find(opt => opt.value.text.toUpperCase() === project_status);
                    if (idValue) {
                      // console.log('idValue', idValue.id);
                      value = {
                        idValue: idValue.id  // need to fix when null.  only update when value exists.
                      };
                      tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                      // console.log('url for custom field', tUrl);
                      promises.push(TrelloModel.put(tUrl, value));
                    }
                  }
                  break;
                case 'FOLDER':
                  // console.log('Folder', box_folder);
                  if (box_folder) {
                    value = {
                      value: {'text': box_folder}  // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(tUrl, value));
                  }
                  break;
                case 'GEOTECH':
                  // console.log('Geotech', geo_lab);
                  if (geo_lab) {
                    value = {
                      value: {'text': geo_lab}  // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(tUrl, value));
                  }
                  break;
                case 'GEO REPORT DATE':
                  // console.log('Geotech report Date', geo_report_date);
                  if (geo_report_date) {
                    const newDate = new Date(geo_report_date);
                    // const tzOffset = newDate.getTimezoneOffset();
                    newDate.setMinutes(tzOffset);
                    // console.log('dates', geo_report_date, newDate);
                    value = {
                      value: {'date': newDate.toString()}  // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(tUrl, value));
                  }
                  break;
                case 'GEO REPORT NUM':
                  // console.log('geo report num', geo_report_num);
                  if (geo_report_num) {
                    value = {
                      value: {'text': geo_report_num}  // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(tUrl, value));
                  }
                  break;
                case 'SCOPE':
                  // console.log('Folder', box_folder);
                  if (scope) {
                    value = {
                      value: {'text': scope}  // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(tUrl, value));
                  }
                  break;
                default:
                  break;
              }
            });
            // This is to add 5 sec pauses to deal with 429 API Token Limit Exceeded error
            promises.push(timeout(3300));
            const custFieldResponse = await Promise.all(promises);
          }
          // console.log('tboards', tBoards);

        } catch (err) {
          console.log('Trello custom Fields Error:', err);
          errors.push(err);
        }
      } // trello card info to create / update

      // Updating the database
      try {
        // console.log('in db update.  Params:', id, tCardID);
        const dbResponse = await ProjectModel.commitProjectByID(id, tCardID);
        // console.log('database commit response', dbResponse);

      } catch (err) {
        // console.log('MySQL Update record Error: ', `${err.errno}:${err.code} - ${err.sqlMessage}`);
        errors.push(err);
        // throw new Error(err);
      }

    } // for loop

    if (errors.length) {
      console.log('Done with error(s)', errors);
      return response.json(errors);
    };
    console.log('Project(s) committed');
    return response.json('Projects committed');
  })();  // the async closure

} // function closure

// function to update a project.
export const update = (request, response) => {

  ProjectModel.updateProject(request.body, function(err, result) {
    if (err) return response.json(err);
    return response.json(result.updateId);
  });
}

export const remove = (request, response) => {

  ProjectModel.deleteProject(request.params.id)
  .then( deleteResponse => {
    console.log('Project Deleted');
    return response.json('Project Deleted');
  })
  .catch( err => {
    return response.json(err);
  });
}
