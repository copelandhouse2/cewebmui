import UserModel from "../models/UserModel";
import ContactModel from "../models/ContactModel";
import { tokenForUser, decodeToken } from "../services/token";
import  { hash, compare } from "../services/hash";
// const tokenForUser = require("../services/token").tokenForUser;
// const hash = require("../services/hash").hash;

// function to get the list of users.
export const list = (request, response) => {

  UserModel.getUsers(function(err, rows, fields) {
    if (!err) {
      console.log('Data retrieved... Users');
      return response.json(rows);
    }
    else {
      console.log('Users: Error while performing Query.');
      return response.json(err);
    }
  });
}

// function to get one user.
export const show = (request, response) => {

  UserModel.getUserByID(request.params.id, function(err, rows, fields) {
    if (!err) {
      console.log('Data retrieved... User by ID!');
      return response.json(rows[0]);
    }
    else {
      console.log('User: Error while performing Query.');
      return response.json(err);
    }
  });
}

// function to get one user.
export const showByName = (request, response) => {

  UserModel.getUserByName(request.params.username, function(err, rows, fields) {
    if (!err) {
      console.log('Data retrieved... User by Name!');
      return response.json(rows[0]);
    }
    else {
      console.log('USer: Error while performing Query.');
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
  // console.log("In signup");
  // const { email, password } = request.body;

  // console.log("Looking for a user with the username");
  UserModel.getUserByUsername(request.body.email, (err, rows, fields) => {
    // console.log(err, rows, fields);
    if (err) return response.json(err);
    if (rows.length > 0) {
      // console.log("This username is already being used");
      response.writeHead(401, "Email already exists.  Please log in instead.");
      response.end();
      return response;
    }

    // console.log("This username is free to use", request.body);
    hash(request.body.password, null, (hashedPassword) => {
      // console.log("Completed hash", hashedPassword);
      UserModel.addUser(request.body, hashedPassword, (err, result) => {
        if (err) {
          console.log("Error", err);
          return response.json(err);
          // return err;
        } else {
          const newContact = {
            id: null,
            user_id: result.insertId,
            client_id: request.body.client_id,
            first_name: request.body.firstName,
            last_name: request.body.lastName,
            email: request.body.email,
            mobile: request.body.mobile,
            other: null,
            requestor: request.body.requestor,
            designer: request.body.designer,
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
          const token = tokenForUser({id: result.insertId});
          // console.log("Success", result.insertId, token);
          return response.json(
            { user_id: result.insertId,
              username: request.body.email,
              auth_key: hashedPassword,
              authenticated: true,
              approved: request.body.approved,
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

  // console.group("In server controller signin");
  // const { email, password } = request.body;

  // console.log("Looking for a user with the username");
  UserModel.getUserByUsername(request.body.email, function(err, rows, fields) {
    // console.log('pulled from db', err, rows);
    if (err) return response.json(err);
    // console.log('after error check before if, length', rows.length);
    if (rows.length === 1) {
      // console.log('inside if, before compare', request.body.password, rows[0].auth_key);
      compare(request.body.password, rows[0].auth_key, function(err1, res1) {
        // console.log('inside callback compare', err1, res1);
        if (res1) {
          // console.log("Found match!", rows[0].id);
          const token = tokenForUser({id: rows[0].id});
          // console.log("Success", rows[0].id, token);

          return response.json(
            { user_id: rows[0].id,
              username: request.body.email,
              auth_key: rows[0].auth_key,
              authenticated: true,
              approved: rows[0].approved,
              token: token,
              ok:true,
              status: 200,
              statusText: "User and password confirmed"
            });

          // response.writeHead(200, "Found match");
          // response.end();
          // return response;

        } else {  // passwords do no match
          response.writeHead(401, "Passwords do not match");
          // response.write({ message: 'Passwords do not match'} );
          response.end('Passwords do not match');
          // console.log('response', response);
          return response;
          // return response.json(
          //   { user_id: rows[0].id,
          //     authenticated: false,
          //     approved: rows[0].approved,
          //     token: token,
          //     ok:false,
          //     status: 401,
          //     statusText: "Password do not match"
          //   }
          // );
        }
      });
    } else {  // could not find email
      console.log("Could not find email");
      response.writeHead(404, "Could not find email account.");
      response.end();
      return response;
    }

    console.groupEnd();

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

// function to authenticate the user.
export const authenticate = (request, response) => {

  // console.log('Start authenticate');
  const theUser = decodeToken(request.params.authToken);
  // console.log('authenticate after decode', theUser);
  UserModel.getUserByID(theUser.userId, function(err, rows, fields) {
    if (!err) {
      console.log('Authenticate pass... from token');
      // console.log('Authenticate pass... from token', rows[0]);
      if (rows.length > 0) {
        // console.log('I have a record', rows[0]);
        return response.json( { ok: true, data: rows[0] });
      } else {
        return response.json( {
          ok:false,
          status: 401,
          statusText: "No record found"
        } );

      }
    }
    else {
      console.log('User: Error while performing Query.');
      return response.json(err);
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
    return response.json("user deleted");
  });
}


export const getSettings = async (request, response) => {

  try {
    const settings = await UserModel.getSettings(request.params.userID);
    // console.log('Data retrieved...', settings);
    if (!settings.length) {
      return response.json({accent_color: '#42a5f5'});
    } else {
      return response.json(settings[0]);
    }
  } catch (err) {
    return response.json(err);
  }
}
// function to update a user.
export const updateSettings = async (request, response) => {
  // console.log('in usercontroller updateSettings', request.params.userID, request.body);
  try {
    const updateResp = await UserModel.updateSettings(request.params.userID, request.body);
    // console.log('updateSettings response...', updateResp);
    return response.json(updateResp);
  } catch (err) {
    console.log('SQL query error users_settings', err);
    return response.json(err);
  }
}

export const getPreferences = async (request, response) => {

  try {
    const prefs = await UserModel.getPreferences(request.params.userID);
    // console.log('Data retrieved...', prefs);
    return response.json(prefs);
  } catch (err) {
    return response.json(err);
  }
}
// function to update a user.
export const updatePreferences = async (request, response) => {
  console.log('in usercontroller updatePreferences', request.params.userID, request.body);
  try {
    const updateResp = await UserModel.updatePreferences(request.params.userID, request.body);
    // console.log('updateSettings response...', updateResp);
    return response.json(updateResp);
  } catch (err) {
    console.log('SQL query error users_settings', err);
    return response.json(err);
  }
}
