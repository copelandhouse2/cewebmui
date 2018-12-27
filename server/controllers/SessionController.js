import SessionModel from "../models/SessionModel";

// function to get the session details.
export const show = (request, response) => {

  // Listing from MySql;
  SessionModel.getSession(request.params.username, function(err, rows, fields) {
    if (!err) {
      console.log('Data retrieved... Session Info');
      return response.json(rows[0]);
    }
    else {
      console.log('Session: Error while performing Query.');
      return response.json(err);
    }
  });
}

