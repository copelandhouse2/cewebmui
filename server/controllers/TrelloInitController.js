// for some reason tboards is null after calling TrelloSeed.
// The exact same code and flow works in trello.js which makes no sense.
// At this time, not using module.
import TrelloModel from '../models/TrelloModel';

// function to get the trello list of boards.
export let tBoards = null;
export const TrelloSeed = {
  boards: (callback) => {

    TrelloModel.get('1/members/me/')
      .then((response) => {
        // console.log('in getBoards.get promise', response);
        tBoards = {...response};
        callback(null, response);
      })
      .catch((err) => {
        // console.log('in getBoards.get catch: ', `${err.statusCode} - ${err.responseBody}`);
        callback(err);
      });
  },
};

// export const getBoards = (callback) => {
//
//   console.log('In getBoards, before get call');
//
//   TrelloModel.get('1/members/me/')
//     .then((response) => {
//       console.log('in listBoards.getBoards promise', response);
//       tBoards = {...response};
//       callback(null, response);
//     })
//     .catch((err) => {
//       console.log('in listBoards.getBoards catch: ', `${err.statusCode} - ${err.responseBody}`);
//       callback(err);
//     });
//
// console.log('In listBoards, after getBoards call');
//
// }
