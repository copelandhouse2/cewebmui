import ProjectModel from '../models/ProjectModel';
import JobNumberSeqModel from '../models/JobNumberSeqModel';
import { sql } from '../mysqldb';
import { trello, tBoards, theToken, TrelloModel } from '../models/TrelloModel';
import { client as boxClient } from '../models/BoxModel';
import { sendMail } from './MailController.js';
import { formatDate } from '../utils';

// code to test for daylight savings time or not.
// Date.prototype.stdTimezoneOffset = () => {
//     var jan = new Date(this.getFullYear(), 0, 1);
//     var jul = new Date(this.getFullYear(), 6, 1);
//     // console.log('timezone', jan, jul);
//     return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
// }
//
// Date.prototype.isDstObserved = () => {
//     return this.getTimezoneOffset() < this.stdTimezoneOffset();
// }

const promiseFn = (theFunction) => {
  return new Promise((resolve) => resolve(theFunction));
};

const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// a function used by list and listPending to get the scope of each project.  Called by
// Promise.all below.
// const getScope = async proj => {
//     const scopeData = await ProjectModel.getScopeItems(proj.id);
//     const returnData = {...proj, scope: scopeData};
//     return returnData;
// };
const pad = (num, size) => ('00000' + num).substr(-size);

export const getScope = async (proj) => {
  let promises = [];
  promises.push(ProjectModel.getScopeItems(proj.id));
  promises.push(ProjectModel.getRevisions(proj.id));
  const childData = await Promise.all(promises);

  // childData[0] = scope; childData[1] = revisions
  // console.log('getScope data', childData);
  const maxRev = childData[1].length > 0 ? childData[1][0].revision : null;
  const maxRevDesc = childData[1].length > 0 ? childData[1][0].revision_desc : null;
  const returnData = { ...proj, scope: childData[0], revisions: childData[1], revision: maxRev, revision_desc: maxRevDesc };
  return returnData;

  // promises.push(TrelloModel.put(tUrl, value));
};
// function to get the list of addresses.
export const list = async (request, response) => {
  // The main section.  First get projects, then loop on projects
  // with map function to get the scope items.
  try {
    const projects = await ProjectModel.getProjects(request.params);
    const projectData = await Promise.all(projects.map((proj) => getScope(proj)));
    // console.log('list SEARCHed projects with scope:', projectData);
    return response.json(projectData);
  } catch (err) {
    return response.json(err);
  }
};

// function to get the list of addresses.
export const listPending = async (request, response) => {
  // The main section.  First get projects, then loop on projects
  // with map function to get the scope items.
  try {
    const projects = await ProjectModel.getPendingProjects(request.params.userID);
    const projectData = await Promise.all(projects.map((proj) => getScope(proj)));
    // console.log('list PENDING projects with scope:', projectData);
    return response.json(projectData);
  } catch (err) {
    return response.json(err);
  }
  // ProjectModel.getPendingProjects(request.params.userID, function (err, rows, fields) {
  //   // console.log('Pending Projects: err', err);
  //   // console.log('Pending Projects: rows', rows);
  //   // console.log('Pending Projects: fields', fields);
  //   if (!err) {
  //     // console.log('Data retrieved... Pending rows');
  //     return response.json(rows);
  //   }
  //   else {
  //     // console.log('Projects: Error while performing Query.');
  //     return response.json(err);
  //   }
  // });
};

export const listSearch = async (request, response) => {
  // console.log('listSearch', request.params);
  // The main section.  First get projects, then loop on projects
  // with map function to get the scope items.
  try {
    let projects = [];
    if (request.params.find || request.params.filter) {
      const idListObj = await ProjectModel.searchProjects(request.params);
      // console.log('listSearch: idArr', idListObj);
      if (idListObj.length > 0) {
        // if we have some ids, go get the data.
        const orderField = request.params.filter ? 'last_updated_date' : 'job_number';
        projects = await ProjectModel.getProjectsByArr(idListObj, orderField);
        // console.log('listSearch: projects', projects);
      } else {
        // console.log('listSearch no projects to pull');
      }
    } else {
      projects = await ProjectModel.getProjects(request.params);
    }
    // console.log('list projects', projects);

    const projectData = await Promise.all(projects.map((proj) => getScope(proj)));
    // console.log('list PENDING projects with scope:', projectData);
    return response.json(projectData);
  } catch (err) {
    console.log('listSearch error: ', err);
    return response.json(err);
  }
};

export const listDups = async (request, response) => {
  try {
    // console.log('in db update.  Params:', id, tCardID);
    const dups = await ProjectModel.getDups(request.params);
    const projectData = await Promise.all(dups.map((proj) => getScope(proj)));
    // console.log('listDups', request.params);
    // console.log('listDups', dups);
    return response.json(projectData);
  } catch (err) {
    // console.log('MySQL Update record Error: ', `${err.errno}:${err.code} - ${err.sqlMessage}`);
    return response.json(err);
  }
};

// function to get details of one address
export const show = (request, response) => {
  ProjectModel.getProjectByID(request.params.id, function (err, rows, fields) {
    if (!err) {
      // console.log('Data retrieved... Project by ID!');
      return response.json(rows[0]);
    } else {
      // console.log('Project: Error while performing Query.');
      return response.json(err);
    }
  });
};

// function to create a address
export const create = async (request, response) => {
  let processDate = new Date();
  const min = processDate.getMinutes();
  const tzOffset = processDate.getTimezoneOffset(); // in minutes.
  const sList = request.body.scope.map((s) => {
    return s.name;
  });
  // processDate.setMinutes(min-tzOffset);
  console.log('*************************************************');
  console.log('ProjectController Create / Update');
  console.log(processDate + '');
  console.log(request.body.id + '    ', request.body.job_number + '    ', request.body.address1);
  console.log(`Classification: ${request.body.classification}   Scope: ${sList.toString()}`);
  console.log('*************************************************');

  console.log('in ProjectController.create', request.body);
  var errors = [];
  var addRecordResponse;

  /************** TEMPORARY FIX FOR RALPH *************/
  /***** Populating plan type at project level ********/
  let fdn;
  if (request.body.classification === 'VOLUME') {
    fdn = request.body.scope.find((s) => s.name === 'volfoundation');
  } else {
    fdn = request.body.scope.find((s) => s.name === 'cusfoundation');
  }
  request.body.plan_type = fdn ? fdn.plan_type : request.body.plan_type;
  request.body.elevation = fdn ? fdn.elevation : request.body.elevation;
  /**************** END TEMPORARY FIX  **************/
  // console.log('Project:', request.body);

  try {
    addRecordResponse = await ProjectModel.addProject(request.body);
    console.log('new DB record created / updated: ', addRecordResponse);
  } catch (err) {
    addRecordResponse = false;
    console.log('Record create error:', err);
    errors.push(err);
  }

  // console.log('outside try', addRecordResponse);
  // Project was created.  Now create scope entries
  // if (addRecordResponse) {
  // console.log('just before scope section', errors.length, request.params.v2);
  if (!errors.length && request.params.v2 === 'true') {
    // version 2 changes
    if (addRecordResponse.insertId || request.body.id) {
      // console.log('In the scope section.', request.body.scope);
      let scopePromises = [];
      request.body.scope.forEach((item, i) => {
        // console.log('Scope: Adding / Adjusting: ', item.id, item.delete, item.scope);
        // console.log('Scope: Adding / Adjusting: ', item.id, item.scope_id, item.delete, item.name);
        if (!item.delete) {
          // checking to see if we are to delete scope.
          item.project_id = request.body.id ? request.body.id : addRecordResponse.insertId;
          scopePromises.push(ProjectModel.addProjectScope(item));
        } else {
          // wish to delete the scope record.
          // console.log('delete scope', item.id);
          scopePromises.push(ProjectModel.deleteProjectScope(item.id));
        }
      });

      try {
        const scopeResponses = await Promise.all(scopePromises);
        // console.log('scope records created / updated: ', scopeResponses);
      } catch (err) {
        console.log('Scope record create error:', err);
        errors.push(err);
      }
    }
  }

  let project = {};
  if (!errors.length) {
    try {
      const proj_id = request.body.id ? request.body.id : addRecordResponse.insertId;
      const p = await ProjectModel.getProjectByID(proj_id);
      project = { ...p[0], categoryID: request.body.categoryID };
      if (request.params.v2 === 'true') {
        // version 2 changes
        const scope = await ProjectModel.getScopeItems(proj_id);
        const rev = await ProjectModel.getRevisions(proj_id);

        Object.assign(project, { scope: scope, rev: rev });
        // project = {...p[0], scope: scope, categoryID: request.body.categoryID};
      }
      // console.log('Queried Project', proj_id, project);
    } catch (err) {
      console.log('New Project Query error:', err);
      errors.push(err);
    }
  }

  // ProjectModel.addProject(request.body, function(err, result) {
  //   if (err) {
  //     console.log('Controller Create Err', err);
  //     return response.json(err);  // If there is an error.
  //   }
  //   // console.log('Controller callback: result', result);
  //   const insertID = response.json(result);
  //   return insertID;
  //
  // });  // end of callback function and addProject
  if (request.params.fromCommit) {
    // console.log('Create return... back to commit');
    if (errors.length) {
      console.log('Done with error(s)', errors);
      return errors;
    }
    console.log('Project(s) saved');
    // const proj = [];
    // proj.push(project);
    // console.log('This is the proj', proj)
    return project;
  } else {
    // console.log('Create return... back to browser');
    if (errors.length) {
      console.log('Done with error(s)', errors);
      return response.json(errors);
    }
    console.log('Project(s) saved');
    return response.json(project);
  }
  // if (errors.length > 0) {
  //   return errors[0]
  // }
  // return addRecordResponse.insertID;
};

// function to create a address
export const commit = (request, response) => {
  // console.log('Project Controller.commit request', request.params);
  // console.log('commit... theToken',theToken);
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
        const createReq = { body: request.body[i], params: { v2: request.params.v2, fromCommit: true } };
        try {
          // returns inserted / updated record.
          newRecord = await create(createReq, response);
          // console.log('2. new record', newRecord);
        } catch (err) {
          console.log('Record create error:', err);
          errors.push(err);
        }
      }

      // 1/28/2020 - newRecord should always be populated now and ELSE stmt
      // could be deprecated.
      if (newRecord) {
        var { id, job_number } = newRecord;
      } else {
        var { id, job_number } = request.body[i];
      }

      console.log('ProjectController Commit: Date, tzOffset', new Date(), new Date().getTimezoneOffset() / 60);
      // console.log('Building Trello Card', id, job_number);

      // console.log('6. the id, job_number: ', id, job_number);
      const {
        revision,
        revision_desc,
        client_id,
        client,
        owner_id,
        requestor,
        requestor_id,
        city,
        subdivision,
        address1,
        address2,
        phase,
        section,
        lot,
        block,
        geo_lab,
        geo_report_num,
        geo_report_date,
        geo_pi,
        em_center,
        em_edge,
        ym_center,
        ym_edge,
        soil_notes,
        status,
        project_status,
        classification,
        due_date,
        final_due_date,
        start_date,
        onboard_date,
        transmittal_date,
        main_contact,
        billing_contact,
        builder_contact,
        dwelling_type,
        trello_list,
        trello_list_id,
        trello_card_id,
        box_folder,
        created_by,
        last_updated_by,
      } = newRecord;
      // } = request.body[i];

      // console.log('Project', newRecord);
      // console.log('Revision info', revision, revision_desc);

      let scope = '',
        description = '',
        additional_options = '',
        notes = '';
      // let pt, ele, gs, ms, gext, gdrop, gt, cp, bw, pi;

      newRecord.scope.forEach((s) => {
        // console.log('s', s);
        scope = scope + s.scope + ',';

        if (['volfoundation', 'cusfoundation'].indexOf(s.scope) > -1) {
          const pt = s.plan_type ? s.plan_type : '';
          const ele = s.elevation ? s.elevation : '';
          const gs = s.garage_swing ? (s.garage_swing === 'RIGHT' ? 'R' : 'L') : '';
          // console.log('masonry', ':'||masonry||':');
          const ms = s.masonry === 'PLAN' ? ', PLAN' : s.masonry ? `, ${s.masonry}SM` : '';
          // const ms = masonry === 'PLAN'? ', PLAN' : masonry === null||masonry ===''? '' : `, ${masonry}SM`
          const gext = s.garage_extension ? `X${s.garage_extension}` : '';
          const gdrop = s.garage_drop ? `D${s.garage_drop}` : '';
          const gt = s.garage_type ? `, ${s.garage_type}${gext}${gdrop}` : '';
          const cp = s.covered_patio === 'EXTCP' ? ', ExtCP' : s.covered_patio === 'Y' ? ', CP' : '';
          const bw = s.bay_window === 'Y' ? ', BW' : '';
          const pi = geo_pi ? geo_pi : '';
          description = `${description}\n* ${s.label} - **${pt} ${ele}${gs}${ms}${gt}${cp}${bw}, PI=${pi}**`;
        }
        // else if (s.scope === 'cusfoundation') {
        //   const pt = s.plan_type? s.plan_type:'';
        //   const ele = s.elevation? s.elevation:'';
        //   const fdntype = s.foundation_type? `, ${s.foundation_type}`:'';
        //   const sq = s.square_footage? `, ${s.square_footage} sqft`:''
        //   const pi = geo_pi? ` PI=${geo_pi}`:'';
        //   const d = s.description? ` - ${s.description}`:'';
        //   const desc = `${pt}${ele}${fdntype}${sq}${pi}${d}`
        //   description = desc?`${description}\n* ${s.label} - ${desc}`:`${description}\n* ${s.label}`;
        // }
        else if (['volmf', 'volssf', 'cusframing'].indexOf(s.scope) > -1) {
          let desc = '';
          desc = s.plan_type ? `${s.plan_type}` : desc;
          desc = s.elevation ? (desc ? `${desc} ${s.elevation}` : `${s.elevation}`) : desc;
          const gs = s.garage_swing ? (s.garage_swing === 'RIGHT' ? 'R' : 'L') : '';
          desc = gs ? (desc ? `${desc}${gs}` : `${gs}`) : desc;
          // desc = s.floor_type?desc?`${desc}, Floor=${s.floor_type}`:`Floor=${s.floor_type}`:desc;
          // desc = s.roof_type?desc?`${desc}, Roof=${s.roof_type}`:`Roof=${s.roof_type}`:desc;
          // desc = s.num_stories?desc?`${desc}, Stories=${s.num_stories}`:`Stories=${s.num_stories}`:desc;
          // desc = s.square_footage?desc?`${desc}, ${s.square_footage}sqft`:`${s.square_footage}sqft`:desc;
          desc = s.description ? (desc ? `${desc} - ${s.description}` : `${s.description}`) : desc;
          description = desc ? `${description}\n* ${s.label} - ${desc}` : `${description}\n* ${s.label}`;
        } else {
          description = s.description ? `${description}\n* ${s.label} - ${s.description}` : `${description}\n* ${s.label}`;
        }
        additional_options = s.additional_options ? `${additional_options}\n* ${s.label} - ${s.additional_options}` : additional_options;
        notes = s.notes ? `${notes}\n* ${s.label} - ${s.notes}` : notes;
        // console.log('for each scope', scope);
      });
      scope = scope.slice(0, scope.length - 1); // remove the last comma.

      // revisions are queried from DB in reverse order.  rev[0] should be latest.  I am leveraging this.
      let latest = '',
        cRevTitle = '',
        cRev = '',
        pRev = '',
        current = '';
      newRecord.rev.forEach((r, i) => {
        // This is the very first rev.  It is the latest
        // console.log('revisions', r);
        if (i === 0) {
          latest = r.revision;
          cRevTitle = r.alt_billing_party
            ? `**REV ${r.revision} ${r.friendly_date} *Bill to: ${r.alt_billing_party}* **\n`
            : `**REV ${r.revision} ${r.friendly_date}**\n`;
        }
        const reason = r.revision_reason ? ` - ${r.revision_reason}` : '';
        const resp = r.revision_resp ? ` - ${r.revision_resp}` : '';
        const desc = r.revision_desc ? ` - ${r.revision_desc}` : '';
        // Generating the latest rev string.
        cRev = r.revision === latest ? `${cRev}\n* ${r.scope_label}${reason}${resp}${desc}` : cRev;

        // Generating the prior revs string.
        if (r.revision !== latest) {
          if (r.revision === current) {
            // pRev = `${pRev}\n* ${r.scope_label} - ${r.revision_reason} / ${r.revision_resp} - ${r.revision_desc}`;
            pRev = `${pRev}\n* ${r.scope_label}${reason}${resp}${desc}`;
          } else {
            const revSubTitle = r.alt_billing_party
              ? `\n\n*REV ${r.revision} ${r.friendly_date} Billed to: ${r.alt_billing_party}*\n`
              : `\n\n*REV ${r.revision} ${r.friendly_date}*\n`;
            // pRev = `${pRev}${revSubTitle}\n* ${r.scope_label} - ${r.revision_reason} / ${r.revision_resp} - ${r.revision_desc}`;
            pRev = `${pRev}${revSubTitle}\n* ${r.scope_label}${reason}${resp}${desc}`;
            current = r.revision;
          }
        }
      });
      const pRevTitle = pRev ? `\n\n**PRIOR REVS:**` : '';

      // console.log('scope, description, additional_options, notes', scope, description, additional_options, notes);

      // these scope type values used to be stored at project level.  Need to pull them out at scope
      // level now.
      let fdn, frm, frm1, frm2;
      if (newRecord.classification === 'VOLUME') {
        fdn = newRecord.scope.find((s) => s.name === 'volfoundation');
        frm1 = newRecord.scope.find((s) => s.name === 'volmf');
        frm2 = newRecord.scope.find((s) => s.name === 'volssf');
        frm = frm2 ? frm2 : frm1; // single site frame will take precedence over master frame if both on there.  But its actually a mistake.
      } else {
        fdn = newRecord.scope.find((s) => s.name === 'cusfoundation');
        frm1 = newRecord.scope.find((s) => s.name === 'volmf'); // 4/8/22 now allowing master frame on the custom screens.
        frm2 = newRecord.scope.find((s) => s.name === 'cusframing');
        frm = frm2 ? frm2 : frm1; // single site frame will take precedence over master frame if both on there.  But its actually a mistake.
      }

      // console.log('fdn, frm', fdn, frm);

      var fnd_height_fr,
        fnd_height_fl,
        fnd_height_rr,
        fnd_height_rl,
        plan_type,
        elevation,
        masonry,
        garage_type,
        garage_entry,
        garage_swing,
        garage_drop,
        garage_extension,
        covered_patio,
        bay_window,
        master_shower_drop,
        bath1_shower_drop,
        bath2_shower_drop,
        bath3_shower_drop,
        foundation_type,
        floor_type,
        roof_type,
        num_stories,
        square_footage,
        pita_factor = null;

      if (fdn) {
        var {
          fnd_height_fr,
          fnd_height_fl,
          fnd_height_rr,
          fnd_height_rl,
          plan_type,
          elevation,
          masonry,
          garage_type,
          garage_entry,
          garage_swing,
          garage_drop,
          garage_extension,
          covered_patio,
          bay_window,
          master_shower_drop,
          bath1_shower_drop,
          bath2_shower_drop,
          bath3_shower_drop,
          foundation_type,
        } = fdn;
      }

      if (frm) {
        var { floor_type, roof_type, num_stories, square_footage, pita_factor } = frm;
        // both foundation and framing sections can have these values.  Foundation scope values supercedes.
        foundation_type = foundation_type ? foundation_type : frm.foundation_type;
        plan_type = plan_type ? plan_type : frm.plan_type;
        elevation = elevation ? elevation : frm.elevation;
      }

      // fdn = newRecord.scope.find(s => s.name === 'volfoundation');

      // console.log('values', trello_list_id, trello_card_id, due_date, revision, revision_desc);

      // trello card id exists, locating the description and board id for later.
      var currentDesc = null;
      if (trello_card_id) {
        try {
          console.log('pulling values for the card', trello_card_id, request.params.trelloToken);
          const cardInfo = await TrelloModel.get(request.params.trelloToken, `/1/cards/${trello_card_id}`);
          currentDesc = cardInfo.desc;
          // console.log('Pulled description', currentDesc);
          // console.log('Pulled description');
        } catch (err) {
          console.log('Record get error:', err);
          errors.push(err);
        }
      }

      // The main statement to create / update Trello Cards
      // defined tCardID to use for the database.
      var tCardID = null;
      if (trello_card_id || trello_list_id) {
        // trello card to be updated / created.

        const enteredDesc = !currentDesc
          ? ''
          : currentDesc.search('__________') > -1
          ? currentDesc.slice(currentDesc.search('__________') + 10)
          : currentDesc;
        // Defining the title (or name) of the card.
        const subStr = subdivision ? ' - ' + subdivision : '';
        const cityStr = city ? ' - ' + city : '';
        const cardName = job_number + ' - ' + address1 + subStr + cityStr + ' - ' + client;

        // Defining the description for volume client cards.
        // const pt = plan_type? plan_type:'';
        // const ele = elevation? elevation:'';
        // const gs = garage_swing? garage_swing === 'RIGHT'? 'R':'L' : '';
        // // console.log('masonry', ':'||masonry||':');
        // const ms = masonry === 'PLAN'? ', PLAN' : masonry? `, ${masonry}SM`:''
        // // const ms = masonry === 'PLAN'? ', PLAN' : masonry === null||masonry ===''? '' : `, ${masonry}SM`
        // const gext = garage_extension? `X${garage_extension}` : '';
        // const gdrop = garage_drop? `D${garage_drop}` : '';
        // const gt = garage_type? `, ${garage_type}${gext}${gdrop}` : '';
        // const cp = covered_patio === 'EXTCP'? ', ExtCP' :
        //            covered_patio === 'Y'? ', CP' : '';
        // const bw = bay_window === 'Y'? ', BW':'';
        // const pi = geo_pi? geo_pi:'';

        // const pi = geo_pi === null? '' : geo_pi;
        const rev = revision ? `**REV ${revision}:**\n\n* ${revision_desc}` : ''; //Removing the new line characters.  If custom, this is the first value.
        const soil = soil_notes ? `\n\n**SOIL NOTES:** ${soil_notes}` : '';
        // const desc = description? `\n\n**SCOPE DESCRIPTION:** ${description}` : '';
        // const desc = description? `\n\n**SCOPE DESCRIPTION:** \n\n\n* **${pt} ${ele}${gs}${ms}${gt}${cp}${bw}, PI=${pi}**${description}` : '';
        const desc = `\n\n**SCOPE DESCRIPTION:** \n${description}`;
        const opt = additional_options ? `\n\n**ADDL OPTIONS:**\n${additional_options}` : '';
        const com = notes ? `\n\n**NOTES:**\n${notes}` : '';
        // const end = `\n\n*Do not erase line below.  Used by webtools.  All information above line is auto-generated.  Anything below line is for your use and will be protected from overwrite.*\n__________`;
        const end = `\n\n*Do not erase line below. Used by webtools. Anything below line is protected.*\n__________`;
        // const cardDesc = trello_list === 'CUSTOM QUEUE'? `${rev}${soil}${opt}${com}${end}${enteredDesc}`: `**${pt} ${ele}${gs}${ms}${gt}${cp}${bw}, PI=${pi}**\n\n${rev}${soil}${opt}${com}${end}${enteredDesc}`;
        // const cardDesc = `**${pt} ${ele}${gs}${ms}${gt}${cp}${bw}, PI=${pi}**\n\n${rev}${soil}${desc}${opt}${com}${end}${enteredDesc}`;

        const cardDesc = `${cRevTitle}${cRev}${desc}${opt}${com}${soil}${pRevTitle}${pRev}${end}${enteredDesc}`;

        console.log('card name', cardName);
        // console.log('gs, cp, bw, ms, pi', gs, cp, bw, ms, pi);
        // console.log('card desc', cardDesc);

        var dueDate = '';
        if (due_date) {
          // const hourOffset = 17 + (new Date().getTimezoneOffset() / 60);
          // const dateTime = `${due_date}T${hourOffset}:00:00Z`
          // dueDate = new Date(dateTime);
          // console.log('Due Date:source,offset,string,final', due_date, hourOffset, dateTime, dueDate);

          // console.log('Due Date info', due_date, dateTime, dueDate.toString(), hourOffset);

          dueDate = new Date(due_date);
          const saveDate = new Date(due_date);
          const tzOffset = dueDate.getTimezoneOffset() + 1020; // in minutes.  1020 min is 17 hours, which will set time to 5pm.
          dueDate.setMinutes(tzOffset);
          // console.log('Due Date Info:converted,offset,final', saveDate, tzOffset, dueDate);
        }

        // const newDate = new Date(final_due_date);
        // const saveDate = new Date(final_due_date);
        // const tzOffset = newDate.getTimezoneOffset();
        // newDate.setMinutes(tzOffset);
        // console.log('final due date:', final_due_date, saveDate, newDate, tzOffset);

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
          // pos: 'bottom',
          due: dueDate ? dueDate.toString() : '',
          closed: false, // this will unarchive the card.
          // idList: trello_list_id,
        };

        // Create or update the base Trello card.
        try {
          // console.log('In the async try');
          // var currentBoard = {};
          if (trello_card_id) {
            // update card.  Leave on current list.

            // console.log('In the update trello card');
            const cardUpdResponse = await TrelloModel.put(request.params.trelloToken, `/1/cards/${trello_card_id}`, cardUpd);
            // console.log('trello: response', cardUpdResponse);
            console.log('Trello card updated');
            tCardID = trello_card_id;
            // console.log('card id(s)', trello_card_id, cardUpdResponse);
          } else if (trello_list_id) {
            // create card on incoming list
            // console.log('In the insert trello card', card);
            const cardInsResponse = await TrelloModel.post(request.params.trelloToken, '/1/cards/', card);
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
            const currentBoard = await TrelloModel.get(request.params.trelloToken, `/1/cards/${tCardID}/board`);
            const currentBoardInfo = await TrelloModel.get(request.params.trelloToken, `1/boards/${currentBoard.id}/?customFields=true`);
            // console.log('the current board', currentBoardInfo);
            // const custFields = tBoards.find(board => board.id === currentBoard.id).customFields;
            // console.log('custFields: ', custFields);
            let value = {},
              tUrl = '',
              idValue = '';
            currentBoardInfo.customFields.forEach((field) => {
              switch (field.name.toUpperCase()) {
                case 'DESIGN DUE DATE':
                case 'FINAL DUE DATE':
                  // console.log('design due date', final_due_date);
                  if (final_due_date) {
                    const newDate = new Date(final_due_date);
                    // const saveDate = new Date(final_due_date);  // just used for console.log
                    const tzOffset = newDate.getTimezoneOffset();
                    newDate.setMinutes(tzOffset);
                    // console.log(' Final Due Date:source,converted,offset,final', final_due_date, saveDate, tzOffset, newDate);

                    value = {
                      value: { date: newDate.toString() }, // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(request.params.trelloToken, tUrl, value));
                  }
                  break;
                case 'PHASE':
                  // console.log('phase', project_status);
                  if (project_status) {
                    idValue = field.options.find((opt) => opt.value.text.toUpperCase() === project_status).id;
                    // console.log('idValue', idValue);
                    value = {
                      idValue: idValue, // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(request.params.trelloToken, tUrl, value));
                  }
                  break;
                case 'YM (C,E)':
                case 'YM(C,E)':
                  // console.log('ym');
                  var ym_value = ym_center ? ym_center.toString() + ', ' : ', ';
                  ym_value = ym_edge ? ym_value + ym_edge.toString() : ym_value;
                  value = {
                    value: { text: ym_value }, // need to fix when null.  only update when value exists.
                  };
                  tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                  // console.log('url for custom field', tUrl);
                  promises.push(TrelloModel.put(request.params.trelloToken, tUrl, value));
                  break;
                case 'EM (C,E)':
                case 'EM(C,E)':
                  // console.log('em');
                  var em_value = em_center ? em_center.toString() + ', ' : ', ';
                  em_value = em_edge ? em_value + em_edge.toString() : em_value;
                  value = {
                    value: { text: em_value }, // need to fix when null.  only update when value exists.
                  };
                  tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                  // console.log('url for custom field', tUrl);
                  promises.push(TrelloModel.put(request.params.trelloToken, tUrl, value));
                  break;
                case 'DESIGN P.I.':
                case 'DESIGN PI':
                  // console.log('PI', geo_pi);
                  if (geo_pi) {
                    value = {
                      value: { text: geo_pi }, // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(request.params.trelloToken, tUrl, value));
                  }
                  break;
                case 'SQFT':
                  // console.log('SQFT', square_footage);
                  if (square_footage) {
                    value = {
                      value: { number: square_footage.toString() }, // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(request.params.trelloToken, tUrl, value));
                  }
                  break;
                case '# STORYS':
                  // console.log('Stories', num_stories);
                  if (num_stories) {
                    idValue = field.options.find((opt) => opt.value.text === num_stories.toString()).id;
                    // console.log('idValue', idValue);
                    value = {
                      idValue: idValue, // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(request.params.trelloToken, tUrl, value));
                  }
                  break;
                case 'STORYS':
                  // console.log('STORYS', num_stories);
                  if (num_stories) {
                    value = {
                      value: { number: num_stories.toString() }, // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(request.params.trelloToken, tUrl, value));
                  }
                  break;
                case 'ROOF TYPE':
                  // console.log('Roof Type', roof_type);
                  if (roof_type) {
                    idValue = field.options.find((opt) => opt.value.text.toUpperCase() === roof_type).id;
                    // console.log('idValue', idValue);
                    value = {
                      idValue: idValue, // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(request.params.trelloToken, tUrl, value));
                  }
                  break;
                case 'FLOOR TYPE':
                  // console.log('Floor Type', floor_type);
                  if (floor_type) {
                    idValue = field.options.find((opt) => opt.value.text.toUpperCase() === floor_type).id;
                    // console.log('idValue', idValue);
                    value = {
                      idValue: idValue, // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(request.params.trelloToken, tUrl, value));
                  }
                  break;
                case 'FOUNDATION TYPE':
                case 'FDN TYPE':
                  // console.log('Foundation Type', foundation_type);
                  if (foundation_type) {
                    idValue = field.options.find((opt) => opt.value.text.toUpperCase() === foundation_type).id;
                    // console.log('idValue', idValue);
                    value = {
                      idValue: idValue, // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(request.params.trelloToken, tUrl, value));
                  }
                  break;
                case 'CLIENT ID':
                  // console.log('Client ID', client_id);
                  value = {
                    value: { number: client_id.toString() }, // need to fix when null.  only update when value exists.
                  };
                  tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                  // console.log('url for custom field', tUrl);
                  promises.push(TrelloModel.put(request.params.trelloToken, tUrl, value));
                  break;
                case 'ON -BOARD DATE':
                case 'ONBOARD DATE':
                  // console.log('Onboard Date', onboard_date);
                  if (onboard_date) {
                    const newDate = new Date(onboard_date);
                    const tzOffset = newDate.getTimezoneOffset();
                    newDate.setMinutes(tzOffset);
                    // console.log('dates', onboard_date, newDate);
                    value = {
                      value: { date: newDate.toString() }, // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(request.params.trelloToken, tUrl, value));
                  }
                  break;
                case 'BLOCK, LOT':
                  // console.log('Block Lot', block, lot);
                  if (block || lot) {
                    value = {
                      value: { text: `${block}, ${lot}` }, // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(request.params.trelloToken, tUrl, value));
                  }
                  break;
                case 'BLOCK':
                  // console.log('Block', block);
                  if (block) {
                    value = {
                      value: { text: block },
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(request.params.trelloToken, tUrl, value));
                  }
                  break;
                case 'LOT':
                  // console.log('Lot', lot);
                  if (lot) {
                    value = {
                      value: { text: lot },
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(request.params.trelloToken, tUrl, value));
                  }
                  break;
                case 'ORIGINAL DUE DATE':
                case 'TRANSMITTAL DATE':
                  // console.log('Transmittal Date', transmittal_date);
                  if (transmittal_date) {
                    const newDate = new Date(transmittal_date);
                    // const saveDate = new Date(transmittal_date);
                    const tzOffset = newDate.getTimezoneOffset();
                    newDate.setMinutes(tzOffset);
                    // console.log('Tranmittal Date:source,converted,offset,final', transmittal_date, saveDate, tzOffset, newDate);

                    value = {
                      value: { date: newDate.toString() }, // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(request.params.trelloToken, tUrl, value));
                  }
                  break;
                case 'JOB NUMBER':
                  // console.log('Job Number', job_number);
                  value = {
                    value: { number: job_number.toString() }, // need to fix when null.  only update when value exists.
                  };
                  tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                  // console.log('url for custom field', tUrl);
                  promises.push(TrelloModel.put(request.params.trelloToken, tUrl, value));
                  break;
                case 'START DATE':
                  // console.log('Start Date', start_date);
                  if (start_date) {
                    const newDate = new Date(start_date);
                    // const saveDate = new Date(start_date);;
                    const tzOffset = newDate.getTimezoneOffset();
                    newDate.setMinutes(tzOffset);
                    // console.log('     State Date:source,converted,offset,final', start_date, saveDate, tzOffset, newDate);

                    value = {
                      value: { date: newDate.toString() }, // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(request.params.trelloToken, tUrl, value));
                  }
                  break;
                case 'BUILDER':
                  // console.log('Builder', builder_contact);
                  if (builder_contact) {
                    value = {
                      value: { text: builder_contact }, // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(request.params.trelloToken, tUrl, value));
                  }
                  break;
                case 'SUBDIVISION':
                  // console.log('Subdivision', subdivision);
                  if (subdivision) {
                    value = {
                      value: { text: subdivision }, // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(request.params.trelloToken, tUrl, value));
                  }
                  break;
                case 'BILLING':
                case 'BILLING CONTACT':
                  // console.log('Billing', billing_contact);
                  if (billing_contact) {
                    value = {
                      value: { text: billing_contact }, // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(request.params.trelloToken, tUrl, value));
                  }
                  break;
                case 'CONTACT':
                case 'DESIGN CONTACT':
                  // console.log('Main Contact', main_contact);
                  if (main_contact) {
                    value = {
                      value: { text: main_contact }, // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(request.params.trelloToken, tUrl, value));
                  }
                  break;
                case 'CLASSIFICATION':
                  // console.log('Classification', classification);
                  if (classification) {
                    idValue = field.options.find((opt) => opt.value.text.toUpperCase() === classification);
                    if (idValue) {
                      // console.log('idValue', idValue);
                      value = {
                        idValue: idValue.id, // need to fix when null.  only update when value exists.
                      };
                      tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                      // console.log('url for custom field', tUrl);
                      promises.push(TrelloModel.put(request.params.trelloToken, tUrl, value));
                    }
                  }
                  break;
                case 'STATUS':
                  // console.log('Status', project_status);
                  if (project_status) {
                    idValue = field.options.find((opt) => opt.value.text.toUpperCase() === project_status);
                    if (idValue) {
                      // console.log('idValue', idValue.id);
                      value = {
                        idValue: idValue.id, // need to fix when null.  only update when value exists.
                      };
                      tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                      // console.log('url for custom field', tUrl);
                      promises.push(TrelloModel.put(request.params.trelloToken, tUrl, value));
                    }
                  }
                  break;
                case 'FOLDER':
                  // console.log('Folder', box_folder);
                  if (box_folder) {
                    value = {
                      value: { text: box_folder }, // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(request.params.trelloToken, tUrl, value));
                  }
                  break;
                case 'GEOTECH':
                  // console.log('Geotech', geo_lab);
                  if (geo_lab) {
                    value = {
                      value: { text: geo_lab }, // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(request.params.trelloToken, tUrl, value));
                  }
                  break;
                case 'GEO REPORT DATE':
                  // console.log('Geotech report Date', geo_report_date);
                  if (geo_report_date) {
                    const newDate = new Date(geo_report_date);
                    // const saveDate = new Date(geo_report_date);;
                    const tzOffset = newDate.getTimezoneOffset();
                    newDate.setMinutes(tzOffset);
                    // console.log('Geo Report Date:source,converted,offset,final', geo_report_date, saveDate, tzOffset, newDate);

                    value = {
                      value: { date: newDate.toString() }, // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(request.params.trelloToken, tUrl, value));
                  }
                  break;
                case 'GEO REPORT NUM':
                  // console.log('geo report num', geo_report_num);
                  if (geo_report_num) {
                    value = {
                      value: { text: geo_report_num }, // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(request.params.trelloToken, tUrl, value));
                  }
                  break;
                case 'SCOPE': // now an array of scope records
                  // console.log('scope', scope);
                  if (scope && typeof scope === 'string') {
                    value = {
                      value: { text: scope }, // need to fix when null.  only update when value exists.
                    };
                    tUrl = `1/cards/${tCardID}/customField/${field.id}/item`;
                    // console.log('url for custom field', tUrl);
                    promises.push(TrelloModel.put(request.params.trelloToken, tUrl, value));
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

      // Updating the database one more time with trello card id.
      // If update occurs, it creates one more entry in history table
      // that does NOT coincide with history in scope history.  Based
      // on the way I will write the revision queries, it won't matter.
      // In order to fully coincide, I would have to create a dummy update
      // on the project scope table right here.  Seems like a silly step.
      try {
        console.log('in db update.  Params:', id, tCardID, trello_card_id);
        if (tCardID && tCardID !== trello_card_id) {
          console.log('updating the db');
          const dbResponse = await ProjectModel.commitProjectByID(id, tCardID);
          // console.log('database commit response', dbResponse);
        }
      } catch (err) {
        // console.log('MySQL Update record Error: ', `${err.errno}:${err.code} - ${err.sqlMessage}`);
        errors.push(err);
        // throw new Error(err);
      }

      // ***************************************
      // Creating Box Folder.  Actually works!!!
      // The Client name and Subdivision name needs to match what's in Webtools for the search
      // to work.  To make this easier and more accurate, I am thinking I will make the user select the parent folder.
      // then I will create the the project folder tree in it.
      // ****************************************
      // try {
      //   // console.log('in db update.  Params:', id, tCardID, trello_card_id);
      //   // + subStr + cityStr + ' - ' + client
      //   console.log('Creating Box Folder', client_id, client, subdivision, request.params.userID);
      //   console.log('boxClient', boxClient);
      //   const addrFolder = job_number + ' - ' + address1;
      //   // Getting the CE Server/Projects Folder
      //   const projectFolder = await boxClient[request.params.userID].search.query('Projects', {
      //     type: 'folder',
      //     fields: 'id,name,type,description,size,parent,item_status',
      //     ancestor_folder_ids: '0',
      //     content_types: 'name',
      //   });
      //   const projectFolderID = projectFolder.entries.find(f=>f.parent.name==='CE Server').id;
      //   console.log('Here is Projects Folder id', projectFolderID);
      //
      //   console.log('Client folder to look for', client, pad(client_id,3));
      //
      //   // Getting the Projects/Clients Folder
      //   const clientFolder = await boxClient[request.params.userID].search.query(client, {
      //     type: 'folder',
      //     fields: 'id,name,type,description,size,parent,item_status',
      //     ancestor_folder_ids: projectFolderID,
      //     content_types: 'name',
      //   });
      //   console.log('Here is Client Folder', clientFolder);
      //
      //   const clientFolderID = clientFolder.entries.find(f=>f.name===`${pad(client_id,3)} ${client}`).id;
      //   console.log('Here is Client Folder id', clientFolderID);
      //
      //   // Getting the Clients/Address Specific/Subdivision Folder
      //   const subFolder = await boxClient[request.params.userID].search.query(subdivision, {
      //     type: 'folder',
      //     fields: 'id,name,type,description,size,parent,item_status',
      //     ancestor_folder_ids: clientFolderID,
      //     content_types: 'name',
      //   });
      //   const subFolderID = subFolder.entries.find(f=>f.parent.name===`Address Specific`).id;
      //   console.log('Here is sub Folder id', subFolderID);
      //
      //   const newFolder = await boxClient[request.params.userID].folders.create(subFolderID, addrFolder);
      //   console.log('Here is Projects folder items', newFolder);
      //
      //   // emailFolder = await boxClient.folders.create(cmcFolder.id,'Emails');
      //   // console.log('Here is Projects folder items', emailFolder);
      // } catch (err) {
      //   errors.push(err);
      // }
      // ***************************************
    } // for loop

    console.log('Job number', job_number);
    if (errors.length) {
      console.log('Done with error(s)', errors);
      return response.json(errors);
    }
    console.log('Project(s) committed');
    return response.json({ job_number: job_number, message: 'Projects committed' });
  })(); // the async closure
}; // function closure

// function to update a project.
export const update = (request, response) => {
  ProjectModel.updateProject(request.body, function (err, result) {
    if (err) return response.json(err);
    return response.json(result.updateId);
  });
};

// export const remove = (request, response) => {
//
//   ProjectModel.deleteProject(request.params.id)
//   .then( deleteResponse => {
//     console.log('Project Deleted');
//     return response.json('Project Deleted');
//   })
//   .catch( err => {
//     return response.json(err);
//   });
// }

export const remove = async (request, response) => {
  try {
    // console.log('in db update.  Params:', id, tCardID);
    const scopeResp = await ProjectModel.deleteProjectScopeAll(request.params.id);
    const projectData = await ProjectModel.deleteProject(request.params.id);
    // console.log('listDups', request.params);
    // console.log('listDups', dups);
    return response.json('Project Deleted');
  } catch (err) {
    // console.log('MySQL Update record Error: ', `${err.errno}:${err.code} - ${err.sqlMessage}`);
    return response.json(err);
  }
};

const getRevScope = async (rev) => {
  const scopeData = await ProjectModel.getRevScopeItems(rev);
  const returnData = { ...rev, scope: scopeData };
  return returnData;
};

export const getHistory = async (request, response) => {
  // The main section.  Get history of project, then loop on projects
  // with map function to get the scope items.
  try {
    const revisions = await ProjectModel.getRevisions(request.params.id);
    const historyData = await Promise.all(revisions.map((rev) => getRevScope(rev)));
    // console.log('getHistory:', historyData);
    return response.json(historyData);
  } catch (err) {
    return response.json(err);
  }
};

export const getRevisions = async (request, response) => {
  // The main section.  Get history of project, then loop on projects
  // with map function to get the scope items.
  try {
    const revisionData = await ProjectModel.getRevisions(request.params.id);
    // console.log('getHistory:', historyData);
    return response.json(revisionData);
  } catch (err) {
    return response.json(err);
  }
};

// function to create a address
export const saveRevisions = async (request, response) => {
  // console.log('in ProjectController.saveRevisions', request.body);
  var errors = [];

  let revPromises = [];
  let emailSend = undefined;
  let emailRecipients = undefined;
  let emailBody = undefined;
  // let revList = request.body.filter((r) => r.change && r.change !== 'delete');
  // console.log('revs to update', request.body);
  request.body.forEach((rev, i) => {
    // console.log('rev: Adding / Adjusting: ', rev.id, rev.scope);

    // rev.change is either unset or value = add, update, delete
    // if unset, skip updating.

    if (rev.change === 'delete') {
      //checking to see if we are to delete rev.
      // console.log('delete scope', item.id);
      revPromises.push(ProjectModel.deleteRevisions(rev.id));
    } else if (rev.change) {
      if (typeof emailSend === 'undefined') {
        emailSend = rev.emailSend;
        emailRecipients = rev.emailRecipients;
        emailBody = rev.emailBody;
      }
      // wish to delete the scope record.
      // console.log('ProjectController: saveRevisions', rev);
      revPromises.push(ProjectModel.addRevisions(rev));
    }
  });

  if (emailSend) {
    let revBody = '';
    request.body.forEach((r, i) => {
      if (i === 0) {
        revBody = `
          <h4>Rev ${r.revision} ${formatDate(r.rev_date, '/')}</h4>
          <h4>submitted for:</h4>
          <p>Scope: ${r.scope_label}<br>
          Description: ${r.revision_desc}<br>
          Reason: ${r.revision_reason}<br>
          Price: ${r.revision_price}</p>`;
      } else {
        revBody = `${revBody}<p />
          <p>Scope: ${r.scope_label}<br>
          Description: ${r.revision_desc}<br>
          Reason: ${r.revision_reason}<br>
          Price: ${r.revision_price}</p>`;
      }
    });
    const mailOptions = {
      from: 'projectmanager@copeland-eng.com',
      to: emailRecipients, // list of receivers
      subject: `${request.body[0].name} Rev: ${request.body[0].revision}`, // Subject line
      // text: 'Reset Password',
      html: `<h4>Dear Client</h4>
      <p>This email is to inform you that a revision to the previous design has been requested:</p>
      ${revBody}
      <p>${emailBody}</p>`, // html body
      dsn: {
        id: `${request.body[0].name} Rev: ${request.body[0].revision}`,
        return: 'headers',
        notify: ['failure', 'delay'],
        recipient: 'cmcopeland@copeland-eng.com',
      },
    };
    sendMail(mailOptions);
  }

  try {
    const revResponses = await Promise.all(revPromises);
    // console.log('scope records created / updated: ', revResponses);
  } catch (err) {
    console.log('Scope record create error:', err);
    errors.push(err);
  }

  // console.log('Create return... back to browser');
  if (errors.length) {
    console.log('Done with error(s)', errors);
    return response.json(errors);
  }
  console.log('Revision(s) saved');
  return response.json({ message: 'Revisions committed' });
};

export const removeRevision = async (request, response) => {
  try {
    // console.log('in db update.  Params:', id, tCardID);
    const deleteResp = await ProjectModel.deleteRevision(request.params.id);
    return response.json('Revision Deleted');
  } catch (err) {
    // console.log('MySQL Update record Error: ', `${err.errno}:${err.code} - ${err.sqlMessage}`);
    return response.json(err);
  }
};
