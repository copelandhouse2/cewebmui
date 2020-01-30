import SessionModel from "../models/SessionModel";

// function to get the session details.
// export const show = (request, response) => {
//
//   // Listing from MySql;
//   SessionModel.getSession(request.params.username, function(err, rows, fields) {
//     if (!err) {
//       console.log('Data retrieved... Session Info');
//       // console.log('Data retrieved... Session Info', rows[0]);
//       return response.json(rows[0]);
//     }
//     else {
//       console.log('Session: Error while performing Query.');
//       return response.json(err);
//     }
//   });
//
// }

export const show = async (request, response) => {

  try {
    const session = await SessionModel.getSession(request.params.username);
    console.log('Data retrieved... session');
    return response.json(session[0]);
  } catch (err) {
    console.log('get session error', err);
    return response.json(err);
  }
}
