import UserModel from "../models/UserModel";
import ContactModel from "../models/ContactModel";
import tokenForUser from "../services/token";
import  { hash } from "../services/hash";
// const tokenForUser = require("../services/token").tokenForUser;
// const hash = require("../services/hash").hash;

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

// function to get one user.
export const showByName = (request, response) => {

  UserModel.getUserByName(request.params.username, function(err, rows, fields) {
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

  UserModel.addUser(request.body, request.body.password, function(err, result) {
    if (err) return response.json(err);
    return response.json(result.insertId);
  });
}

// function to add a user via signUp.
export const signUp = (request, response) => {
  console.log("In signup");
  // const { email, password } = request.body;

  console.log("Looking for a user with the username");
  UserModel.getUserByUsername(request.body.email, (err, rows, fields) => {
    // console.log(err, rows, fields);
    if (err) return response.json(err);
    if (rows.length > 0) {
      console.log("This username is already being used");
      response.writeHead(401, "Email already exists.  Please log in instead.");
      response.end();
      return response;
    }

    console.log("This username is free to use");
    hash(request.body.password, null, (hashedPassword) => {
      console.log("Completed hash", hashedPassword);
      UserModel.addUser(request.body, hashedPassword, (err, result) => {
        if (err) {
          console.log("Error", err);
          return response.json(err);
          // return err;
        } else {
          const newContact = {
            id: null,
            user_id: result.insertId,
            client_id: null,
            first_name: request.body.firstName, 
            last_name: request.body.lastName,
            email: request.body.email,
            mobile: request.body.mobile,
            other: null,
            role: request.body.role,
            active: "Y",
            comments: null,
            created_by: 1,
            last_updated_by: 1
          }
          ContactModel.addContact(newContact, function(err, resultContact) {
            if (err) return response.json(err);
            //return response.json(resultContact.insertId);
          });
          const token = tokenForUser(result.insertId);
          console.log("Success", result.insertId, token);
          return response.json(
            { user_id: result.insertId,
              username: request.body.email,
              auth_key: hashedPassword,
              authenticated: true,
              token: token,
              ok:true,
              status: 200,
              statusText: "User and token created"
            });
        }
      });
    });
  });
};

export const signIn = (request, response) => {

  console.log("In signin");
  // const { email, password } = request.body;

  console.log("Looking for a user with the username");
  UserModel.getUserByUsername(request.body.email, function(err, rows, fields) {
    // console.log(err, rows, fields);
    if (err) return response.json(err);
    if (rows.length == 0) {
      console.log("Could not find email");
      response.writeHead(401, "Could not find email account.");
      response.end();
      return response;
    }
    if (rows.length == 1) {
      console.log("Found match!");
      response.writeHead(200, "Found match");
      response.end();
      return response;
    }
  });

  // UserModel.getUserByUsername(request.params.username, function(err, rows, fields) {
  //   if (!err) {
  //     console.log('Data retrieved... yeah!');
  //     return response.json(rows[0]);
  //   }
  //   else {
  //     console.log('Error while performing Query.');
  //     return response.json("Username does not exist.  Please try again");
  //   }
  // });
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