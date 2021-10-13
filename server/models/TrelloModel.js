import Trello from 'node-trello';
// import { trello } from "../controllers/trello";
import { env } from '../envVars';

const key = env.REACT_APP_TRELLO_KEY;
const token = env.REACT_APP_TRELLO_TOKEN;
// import { promisify } from 'util';
export let trello = null;
export let tBoards = null;

export const TrelloModel = {
  authenticate: (userToken) => {
    const theToken = userToken?userToken:token;
    return new Trello(key, theToken);
  },

  setGlobals: (key, value) => {

    switch(key) {
      case 'AUTH':
        trello = value;
        break;
      case 'SEED':
        tBoards = value;
        // console.log('SEED',value[0]);
        break;
      default:
        null;
    }
  },

  get: (uri) => {
    return new Promise((resolve, reject) => {
      trello.get(uri, (err, response) => {
        if (err) reject(err);
        // console.log('resolve for TrelloModel.get promise: ', response);
        resolve(response);
      }); // 1st Trello call
    });
  },

  post: (uri, object) => {
    return new Promise((resolve, reject) => {
      trello.post(uri, object, (err, response) => {
        if (err) reject(err);
        // console.log('resolve for TrelloModel.post promise: ', response);
        resolve(response);
      }); // 1st Trello call
    });
  },

  put: (uri, object) => {
    // console.log('Trello put: ', uri, object);
    return new Promise((resolve, reject) => {
      trello.put(uri, object, (err, response) => {
        if (err) reject(err);
        // console.log('resolve for TrelloModel.put promise: ', response);
        resolve(response);
      }); // 1st Trello call
    });
  },

  del: (uri) => {
    return new Promise((resolve, reject) => {
      trello.del(uri, (err, response) => {
        if (err) reject(err);
        // console.log('resolve for TrelloModel.del promise: ', response);
        resolve(response);
      }); // 1st Trello call
    });
  },
};

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
        console.log(results[0]);
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
          console.log(boards[i], listResults, results[i+boards.length]);
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
// export default TrelloModel;

//*****************************************************
// ************* Other Examples ***********************
//*****************************************************
// getBoards: (callback) => {
//   trello.get('1/members/me/',
//     (err, response) => {
//       if (err) callback(err);
//       console.log('callback for trello.get: ', response.id);
//       // console.log('getBoards resp value', response);
//       callback(null, response.id);      }
//   ); // 1st Trello call
//
// },
// getBoards: (callback) => {
//   const tgetP = promisify(trello.get);
//
//   tgetP('1/members/me/')
//   .then( (response) => {
//     console.log('promise.then for trello.get: ', 'DATA');
//     callback(null, 'DATA');
//   })
//   .catch( (err) => {
//     console.log('promise.err for trello.get: ', err);
//     callback(err);
//   })
// },
// getBoards2: (callback) => {
//   trello.makeRequest('get','/1/members/me/')
//   .then( (response) => {
//     console.log('promise.then for trello.getBoards: ', response);
//     callback(null, response);
//   })
//   .catch( (err) => {
//     console.log('promise.err for trello.getBoards: ', err);
//     callback(null, err);
//   });
// },
