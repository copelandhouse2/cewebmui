import ClientModel from "../models/ClientModel";

// function to get the list of clients.
export const list = (request, response) => {

  ClientModel.getClients(function(err, rows, fields) {
    if (!err) {
      console.log('Data retrieved... clients');
      return response.json(rows);
    }
    else {
      console.log('Error while performing Query.');
      return response.json(err);
    }
  });
}

// function to get one client.
export const show = (request, response) => {

  ClientModel.getClientByID(request.params.id, function(err, rows, fields) {
    if (!err) {
      console.log('Data retrieved... yeah!');
      return response.json(rows[0]);
    }
    else {
      console.log('Error while performing Query.');
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

// function to update a client.
export const update = (request, response) => {

  ClientModel.updateClient(request.body, function(err, result) {
    if (err) return response.json(err);
    return response.json(result.updateId);
  });
}

// function to delete a client.
export const remove = (request, response) => {

  ClientModel.deleteClient(request.params.id, function(err, result) {
    if (err) return response.json(err);
    return response.json("client deleted");
  });
}