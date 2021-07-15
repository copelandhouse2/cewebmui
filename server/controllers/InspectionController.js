import InspectionModel from "../models/InspectionModel";
import { getScope } from "./ProjectController";

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
  console.log('I am here Inspections');

  try {

    const inspections = await InspectionModel.getInspections(request.params);
    const data = await Promise.all(inspections.map(insp => getReasons(insp)));

    console.log('Data retrieved... Inspections');
    return response.json(data);

  } catch (err) {
    console.log('Error: ', err);
    // console.log('Error: ', `${err.statusCode} - ${err.responseBody}`);
    return response.json(err);
  }

}

export const listPrevProjectInspections =  async (request, response) => {
  console.log('I am here Project Specific Inspections');

  try {

    const inspections = await InspectionModel.getPrevProjectInspections(request.params);
    const data = await Promise.all(inspections.map(insp => getReasons(insp)));

    console.log('Data retrieved... Inspections');
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
    console.log('Data retrieved... Inspection');
    return response.json(data[0]);

  } catch (err) {
    console.log('Error: ', `${err.statusCode} - ${err.responseBody}`);
    return response.json(err);
  }

}

export const filter = async (request, response) => {

  try {
    const data = await InspectionModel.filterContactsProjects(request.params);
    console.log('Filter for inspections', data);
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

    console.log(' filterProjects Controller', projectData);
    return response.json(projectData);

  } catch (err) {
    console.log('Error: ', `${err.statusCode} - ${err.responseBody}`);
    return response.json(err);
  }

}

// function to save the Inspection changes... adds and updates and deletes.
// uses a "change" key
export const save = async (request, response) => {

  // console.log('in ProjectController.saveRevisions', request.body);
  var errors = [];
  let inspectionPromises = [];

  console.log('save: data type', request.body.constructor);
  let data = [];
  if (request.body.constructor === Object) {
    console.log('request.body is an object');
    data.push(request.body);
  } else {
    console.log('request.body is an array');
    data.concat(request.body);
  }

  data.forEach((inspection, i) => {
    // console.log('City: Adding / Adjusting: ', city);

    // change is either unset or value = add, update, delete
    // if unset, skip updating.
    if (inspection.change === 'delete') { //checking to see if we are to delete rev.
      // console.log('delete scope', item.id);
      inspectionPromises.push(InspectionModel.delete(inspection.id));
      inspectionPromises.push(InspectionModel.deleteAllReasons(inspection.id));

    } else {  // wish to delete the scope record.
      // console.log('add/update city', city.id);
      inspectionPromises.push(InspectionModel.save(inspection));
      for (let i=0; i<inspection.reasons.length; i++) {
        // console.log('inspection reasons',inspection.reasons[i]);
        if (inspection.reasons[i].change === 'delete') {
          inspectionPromises.push(InspectionModel.deleteReason(inspection.reasons[i].id));
        } else {
          console.log('inspection reasons',inspection.reasons[i]);
          inspectionPromises.push(InspectionModel.saveReason(inspection.reasons[i]));
        }
      }
    }

  });

  try {
    // console.log('City records to promise: ', cityPromises);
    const inspectionResponses = await Promise.all(inspectionPromises);
    console.log('inspection records created / updated: ', inspectionResponses);
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

export const editInspection = async (request, response) => {
  console.log('I am here Project Specific Inspections', request.params);

  try {

    const projects = await InspectionModel.getProjectyByID(request.params.proj_id);
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
