import ClientModel from "../models/ClientModel";
import { CommentModelSearchOnly } from "../models/CommentModel";
// function to get the list of clients.
// export const listClient = (request, response) => {
//
//   ClientModel.getClients(function(err, rows, fields) {
//     if (!err) {
//       console.log('Data retrieved... Clients');
//       return response.json(rows);
//     }
//     else {
//       console.log('Clients: Error while performing Query.');
//       return response.json(err);
//     }
//   });
// }
// loadCurrentView(parent_id)

// This is a recursive function to reorder hierarchical arrays into its
// nested structure
export function getChildren(array, theParent) {
  // console.log('getChildren', theParent);
  let cArr = array.filter(child => child.parent_id === theParent.id);
  if (!cArr) return [];

  // let's now get all the nested children with c(hildren)Arr
  let children = [];
  for (let i = 0; i < cArr.length; i++) {
    // get all the nested children.
    children.push({ ...cArr[i]
      , children: getChildren(array, cArr[i]) }
    )
  }

  // console.log('children', children);
  return children;
}

export const list = async (request, response) => {

  try {
    const data = await ClientModel.getClients();
    console.log('Data retrieved... Clients');
    return response.json(data);

  } catch (err) {
    console.log('Error: ', `${err.statusCode} - ${err.responseBody}`);
    return response.json(err);
  }

}

export const find = async (request, response) => {

  try {
    const data = await ClientModel.findClients(request.params);
    // console.log('Find Data retrieved... Clients');
    return response.json(data);

  } catch (err) {
    console.log('Error: ', `${err.statusCode} - ${err.responseBody}`);
    return response.json(err);
  }

}

// function to get one client.
// export const show = (request, response) => {
//
//   ClientModel.getClientByID(request.params.id, function(err, rows, fields) {
//     if (!err) {
//       // console.log('Data retrieved... Client by ID!');
//       return response.json(rows[0]);
//     }
//     else {
//       console.log('Client: Error while performing Query.');
//       return response.json(err);
//     }
//   });
// }

export const show = async (request, response) => {
  // console.log('in show',request.params);
  try {
    const data = await ClientModel.getClientByID(request.params.client_id);
    let dataClient = data[0];
    // console.log('Find Data retrieved... Clients', dataClient);
    // Get the comments for the client
    const comments = await CommentModelSearchOnly.getComments(request.params.table,request.params.client_id);
    // console.log('getting comments', comments);
    let nested_comments = [];
    for (let i = 0; i < comments.length; i++) {
      // get all the parent comments.
      if (!comments[i].parent_id) {
        nested_comments.push({ ...comments[i]
          , children: getChildren(comments, comments[i]) }
        )
      }
    }
    dataClient['comments_history'] = nested_comments;
    // Get the reporting info for the clients
    const repScope = await ClientModel.getReportScope(request.params.client_id);
    const repSlab = await ClientModel.getReportSlabs(request.params.client_id);
    const repProject = await ClientModel.getReportProjects(request.params.client_id);
    const repRev = await ClientModel.getReportRevs(request.params.client_id);
    const repReasons = await ClientModel.getReportReasons(request.params.client_id);
    const repResps = await ClientModel.getReportResps(request.params.client_id);
    // console.log('report data',repRev);
    dataClient['reporting'] = {scope:repScope,slab:repSlab,project:repProject
      ,rev:repRev,revReason:repReasons,revResp:repResps};

    return response.json(dataClient);

  } catch (err) {
    console.log('Error: ', `${err.statusCode} - ${err.responseBody}`);
    return response.json(err);
  }

}
// function to add a client.
export const create = (request, response) => {

  ClientModel.addClient(request.body, function(err, result) {
    if (err) return response.json(err);
    return response.json(result.insertId);
  });
}

// function to save the Geo changes... adds and updates and deletes.
// uses a "change" key
export const save = async (request, response) => {

  // console.log('in ProjectController.saveRevisions', request.body);
  var errors = [];

  let clientPromises = [];
  request.body.forEach((client, i) => {
    // console.log('client: Adding / Adjusting: ', client);

    // rev.change is either unset or value = add, update, delete
    // if unset, skip updating.
    if (client.change === 'delete') { //checking to see if we are to delete rev.
      // console.log('delete scope', item.id);
      clientPromises.push(ClientModel.delete(client.id));
    } else if (client.change) {  // wish to delete the scope record.
      // console.log('add/update client', client.id);
      clientPromises.push(ClientModel.save(client));
    }

  });
  let clientResponses=[];
  try {
    // console.log('client records to promise: ', clientPromises);
    clientResponses = await Promise.all(clientPromises);
    // console.log('client records created / updated: ', clientResponses[0]);
  } catch (err) {
    // console.log('Client record create error:', err);
    errors.push(err);
  }

  // console.log('Create return... back to browser');
  if (errors.length) {
    console.log('Done with error(s)', errors);
    return response.json(errors);
  }
  console.log('Client(s) saved');
  // return response.json({message: 'Client committed'});
  return response.json({id: clientResponses[0].insertId});

}

// function to update a client.
export const update = (request, response) => {

  ClientModel.updateClient(request.body, function(err, result) {
    if (err) return response.json(err);
    return response.json(result.updateId);
  });
}

export const remove = async (request, response) => {

  try {
    // console.log('client remove', request.params.id);
    const deleteResp = await ClientModel.delete(request.params.id);
    return response.json('Client Deleted');

  } catch (err) {
    console.log('MySQL delete error: ', err);
    return response.json(err);

  }
}
