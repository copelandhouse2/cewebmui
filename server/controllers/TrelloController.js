// import Trello from 'node-trello';
import { TrelloModel } from '../models/TrelloModel';
// import { env } from '../envVars';
// const key = process.env.TRELLO_KEY;
// const token = process.env.TRELLO_TOKEN;

export const authenticate = async (request, response) => {
  try {
    console.log('trello authenticate');

    const trelloCall = await TrelloModel.authenticate(request.params.token);
    // const trelloCall = await TrelloModel.authenticate('12345');

    TrelloModel.setGlobals('AUTH',request.params.token,trelloCall);
    // const boardData = await getTrelloSeed();
    // TrelloModel.setGlobals('SEED',boardData);
    console.log("Trello is connected ... \n\n", request.params.token);

    return response.json('Trello Connection Success');

  } catch (err) {
    console.log("Error connecting to Trello ... \n\n", err);
    return response.json(err);
  }

}

export const getTrelloSeed = async (request, response) => {
  try {
    // console.log('trello Seed', request.params.token);

    const boards = await TrelloModel.get(request.params.token,'1/members/me/boards');
    const boardPromises = boards.map( (board, id) => {
      let uri = `1/boards/${board.id}/?lists=all&customFields=true`;
      // console.log('2nd then list map: uri', uri);
      return TrelloModel.get(request.params.token, uri);
    });
    const boardInfo = await Promise.all(boardPromises);

    TrelloModel.setGlobals('SEED',request.params.token,boardInfo);

    console.log('Retrieved Trello seed data');
    // return boardInfo;
    return response.json(boardInfo);

  } catch (err) {
    console.log("Error connecting to Trello ... \n\n", err);
    return response.json(err);
  }

}

export const getCard = async (request, response=null) => {
  try {
    // console.log('trello card',request.params);

    const card = await TrelloModel.get(request.params.token,`1/cards/${request.params.cardID}?board=true&board_fields=name&list=true&checklists=all`);
    // console.log('Retrieved card info');

    // return response.json(card);

    if (response) {
      return response.json(card);
    } else {
      return card;
    }

  } catch (err) {
    console.log("Failed retrieving card", err);
    // return response.json(err);

    if (response) {
      return response.json(err);
    } else {
      return err;
    }
  }

}
// function to get the trello list of boards.
// export let tBoards = null;
// export const TrelloSeed = {
//   boards: (callback) => {
//
//     TrelloModel.get('1/members/me/')
//       .then((response) => {
//         // console.log('in getBoards.get promise', response);
//         tBoards = {...response};
//         callback(null, response);
//       })
//       .catch((err) => {
//         // console.log('in getBoards.get catch: ', `${err.statusCode} - ${err.responseBody}`);
//         callback(err);
//       });
//   },
// };

// export var tBoards = [];
// export const TrelloSeed = {
//   boards: (callback) => {
//     // console.log('In getBoards, before get call');
//
//     TrelloModel.get('1/members/me/boards')
//       .then( response => {
//         let boards = response.map( board => {
//           return {id: board.id, name: board.name}
//         });
//         // console.log('in getBoards.get promise', boards);
//         return boards;
//         // callback(null, tBoards);
//       })  // this .then is building a Promise array across the map function.
//       .then((boards) => {
//         // console.log('2nd then', boards);
//         let promisesLists = boards.map( (board, id) => {
//           let uri = `1/boards/${board.id}/lists`;
//           // console.log('2nd then list map: uri', uri);
//           return TrelloModel.get(uri);
//         });
//         let promisesCustomFields = boards.map( (board, id) => {
//           let uri = `1/boards/${board.id}/customFields`;
//           // console.log('2nd then customFields map: uri', uri);
//           return TrelloModel.get(uri);
//         });
//         // promises array is storing: board list, promise calls for lists, promise calls
//         // for the custom fields.  So promises.length has 2x board length + 1
//         const promises = [[...boards], ...promisesLists, ...promisesCustomFields];
//         // console.log('promises:', promises)
//         return Promise.all(promises);
//       })
//       .then((results) => {
//         // console.log('the results of promise.all', results);
//         const boards = results[0];
//         results.shift();  //Removes boards array (1st element).  Now results.length = 2x board.length.
//         // console.log('Promise.all the board array', boards, boards.length);
//         // console.log('Promise.all results array', results, results.length);
//
//         // Results.length = 2x board length.  First half results are the lists.
//         // Latter half of results are the customFields.  Should be in array order
//         // results lists: element 0 to board.length-1.
//         // results customFields: board.length to 2x board.length -1
//         // Ex. when i=0 for Board 0: Lists is results[0], customFields is results[0+board.length]
//         for (let i=0; i < boards.length; i++) {
//           let listResults = results[i].map(list => {return {id: list.id, name: list.name}});
//           // Building global tBoards array.  Stores board id, name, lists, and custom fields.
//           tBoards.push({ ...boards[i], lists: [...listResults], customFields: [...results[i+boards.length]] });
//         }
//         // console.log('tboards element:',tBoards);
//         console.log('Retrieved Trello seed data');
//
//       })
//
//       .catch((err) => {
//         console.log('in getBoards.get catch: ', err, `${err.statusCode} - ${err.responseBody}`);
//         callback(err);
//       });
//
//     // console.log('In getBoards, after getBoards call');
//   },
// };
