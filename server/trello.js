import Trello from 'node-trello';
// import Trello from 'trello';
import { env } from './envVars';
import TrelloModel from './models/TrelloModel';


export const TEST = "trello";
export const PROD = "trello";

// const key = process.env.TRELLO_KEY;
// const token = process.env.TRELLO_TOKEN;
const key = env.REACT_APP_TRELLO_KEY;
const token = env.REACT_APP_TRELLO_TOKEN;
// console.log('trello config', key, token);

// Gives me a connected Trello object to import and use to perform Trello tasks
export let trello=null;
export const tconnect = (mode, callback) => {
  // console.log(key, token);
  trello = new Trello(key, token);
  // console.log("trello inside tconnect", trello)
  callback();
}

// Global Variable for function to get the trello list of boards.
export var tBoards = [];
export const TrelloSeed = {
  boards: (callback) => {
    // console.log('In getBoards, before get call');

    TrelloModel.get('1/members/me/boards')
      .then( response => {
        let boards = response.map( board => {
          return {id: board.id, name: board.name}
        });
        // console.log('in getBoards.get promise', boards);
        return boards;
        // callback(null, tBoards);
      })  // this .then is building a Promise array across the map function.
      .then((boards) => {
        // console.log('2nd then', boards);
        let promisesLists = boards.map( (board, id) => {
          let uri = `1/boards/${board.id}/lists`;
          // console.log('2nd then list map: uri', uri);
          return TrelloModel.get(uri);
        });
        let promisesCustomFields = boards.map( (board, id) => {
          let uri = `1/boards/${board.id}/customFields`;
          // console.log('2nd then customFields map: uri', uri);
          return TrelloModel.get(uri);
        });
        // promises array is storing: board list, promise calls for lists, promise calls
        // for the custom fields.  So promises.length has 2x board length + 1
        const promises = [[...boards], ...promisesLists, ...promisesCustomFields];
        // console.log('promises:', promises)
        return Promise.all(promises);
      })
      .then((results) => {
        // console.log('the results of promise.all', results);
        const boards = results[0];
        results.shift();  //Removes boards array (1st element).  Now results.length = 2x board.length.
        // console.log('Promise.all the board array', boards, boards.length);
        // console.log('Promise.all results array', results, results.length);

        // Results.length = 2x board length.  First half results are the lists.
        // Latter half of results are the customFields.  Should be in array order
        // results lists: element 0 to board.length-1.
        // results customFields: board.length to 2x board.length -1
        // Ex. when i=0 for Board 0: Lists is results[0], customFields is results[0+board.length]
        for (let i=0; i < boards.length; i++) {
          let listResults = results[i].map(list => {return {id: list.id, name: list.name}});
          // Building global tBoards array.  Stores board id, name, lists, and custom fields.
          tBoards.push({ ...boards[i], lists: [...listResults], customFields: [...results[i+boards.length]] });
        }
        // console.log('tboards element:',tBoards);
        console.log('Retrieved Trello seed data');

      })

      .catch((err) => {
        console.log('in getBoards.get catch: ', err, `${err.statusCode} - ${err.responseBody}`);
        callback(err);
      });

    // console.log('In getBoards, after getBoards call');
  },
};
