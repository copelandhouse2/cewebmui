import ClientModel from "../models/ClientModel";

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
export const show = (request, response) => {

  ClientModel.getClientByID(request.params.id, function(err, rows, fields) {
    if (!err) {
      // console.log('Data retrieved... Client by ID!');
      return response.json(rows[0]);
    }
    else {
      console.log('Client: Error while performing Query.');
      return response.json(err);
    }
  });
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

  try {
    // console.log('client records to promise: ', clientPromises);
    const clientResponses = await Promise.all(clientPromises);
    // console.log('client records created / updated: ', clientResponses);
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
  return response.json({message: 'Client committed'});

}

// function to update a client.
export const update = (request, response) => {

  ClientModel.updateClient(request.body, function(err, result) {
    if (err) return response.json(err);
    return response.json(result.updateId);
  });
}

// function to delete a client.
// export const remove = (request, response) => {
//
//   ClientModel.deleteClient(request.params.id, function(err, result) {
//     if (err) return response.json(err);
//     return response.json("client deleted");
//   });
// }

export const remove = async (request, response) => {

  try {
    console.log('client remove', request.params.id);
    const deleteResp = await ClientModel.delete(request.params.id);
    return response.json('Client Deleted');

  } catch (err) {
    console.log('MySQL delete error: ', err);
    return response.json(err);

  }
}
