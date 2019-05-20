import { trello } from "../trello";
// import { promisify } from 'util';

const TrelloModel = {
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

export default TrelloModel;

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
