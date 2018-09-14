import UserModel from "../models/UserModel";

// function to get the list of users.
export const list = (request, response) => {

  UserModel.getUsers(function(err, rows, fields) {
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

// function to get one user.
export const show = (request, response) => {

  UserModel.getUserByID(request.params.id, function(err, rows, fields) {
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

// function to add a user.
export const create = (request, response) => {

  UserModel.addUser(request.body, function(err, result) {
    if (err) return response.json(err);
    return response.json(result.insertId);
  });
}

// function to add a user via signUp.
export const signUp = (request, response) => {

  UserModel.addUser(request.body, function(err, result) {
    if (err) return response.json(err);
    return response.json(result.insertId);
  });
}

export const signIn = (request, response) => {

  UserModel.getUserByUsername(request.params.username, function(err, rows, fields) {
    if (!err) {
      console.log('Data retrieved... yeah!');
      return response.json(rows[0]);
    }
    else {
      console.log('Error while performing Query.');
      return response.json("Username does not exist.  Please try again");
    }
  });
}

// function to update a user.
export const update = (request, response) => {

  UserModel.updateUser(request.body, function(err, result) {
    if (err) return response.json(err);
    return response.json(result.updateId);
  });
}

// function to delete a user.
export const remove = (request, response) => {

  UserModel.deleteUser(request.params.id, function(err, result) {
    if (err) return response.json(err);
    return response.json("city deleted");
  });
}