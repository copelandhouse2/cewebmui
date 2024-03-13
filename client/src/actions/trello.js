// const TRELLO_TOKEN_INT = 'fc64a5cb6719806ef4603be9773edf91ad476a64ab71c571da6938163e86a0ab'
// const TRELLO_TOKEN_DEV = 'ab974cfaa903ef5da9370ef4bef735e83e0e6f5942ab2077d4c98a71f9095575'

// Trello initiate
// export function initiateTrello(trelloToken) {
//   return function (dispatch) {
//     // console.info('authenticate', authString);
//     dispatch(trelloTokenLoaded(trelloToken));
//     dispatch(getTrelloSeed());
//     // console.log('authenticating trello')
//   };
// }

export function initiateTrello(trelloToken) {
  return function (dispatch) {
    fetch(`/trello/authenticate/${trelloToken}`)
      .then((response) => {
        return response.json();
      })
      .then((authString) => {
        // console.info('authenticate', authString);
        dispatch(trelloTokenLoaded(trelloToken));
        dispatch(getTrelloSeed());
      });
    // console.log('authenticating trello')
  };
}

function trelloTokenLoaded(trelloToken) {
  return {
    type: 'TRELLO_TOKEN_LOADED',
    value: trelloToken,
  };
}

export function getTrelloSeed() {
  return function (dispatch, getState) {
    const { trelloToken } = getState();
    fetch(`/trello/seed/${trelloToken}`)
      .then((response) => {
        return response.json();
      })
      .then((trelloSeed) => {
        // console.info('trello seed', trelloSeed[0]);
        dispatch(trelloSeedLoaded(trelloSeed));
      });
  };
}

function trelloSeedLoaded(trelloSeed) {
  return {
    type: 'TRELLO_SEED_LOADED',
    value: trelloSeed,
  };
}

// var card_fake = 123;  // for testing errors
export function getTrelloCard(token, card_id) {
  return fetch(`/trello/card/${token}/${card_id}`).then((res) => {
    return res.json();
  });
}
