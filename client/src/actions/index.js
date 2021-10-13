import { loadRecents } from './project';

export * from './avff';
export * from './client';
export * from './city';
export * from './subdivision';
export * from './geotech';
export * from './organization';
export * from './contact';
export * from './lookup';
export * from './project';
export * from './inspection';
export * from './trello';

/* SESSION ACTION */
// Loading the list of addresses
export function loadSession(username) {
  // console.log('loadSession', username);
  return function (dispatch, getState) {
    const {search} = getState();
    // console.log('loadSession', search);
    fetch(`/session/${username}`)
    .then( (response) => {
      // console.log('response', response);
      return response.json();
    }).then((session) => {
      // console.log('loadSession response', session)
      // settings are hardcoded right now.
      // session.settings = {accentColor: '#42a5f5', }
      dispatch(sessionLoaded(session));
      // console.log('sessionLoaded done', session);
      dispatch(getUserSettings(session));
      dispatch(getPreferences(session));
      // console.log('getUserSettings done', session);
      // dispatch(loadPending(session.id));
      dispatch(loadRecents(search.recents));
    });
  };
}
function sessionLoaded(session) {
  return {
    type: "SESSION_LOADED",
    value: session
  };
}

// Adding the calls to fetch 1 entity.
function getUserSettings(session) {
  // console.log('getUserSettings', session);
  return function (dispatch) {
    fetch(`/users/settings/${session.id}`)
    .then( (response) => {
      return response.json();
    }).then((settings) => {
      // console.log('getUserSettings.then', settings);
      dispatch(getUserSettingsDone(session, settings));
    });
  };
}
function getUserSettingsDone(session, settings) {
  const newSession = {...session, userSettings: {...settings}};
  return {
    type: "SESSION_LOADED",
    value: newSession
  };
}

// Adding the calls to fetch 1 entity.
function getPreferences(session) {
  // console.log('getUserSettings', session);
  return function (dispatch) {
    fetch(`/users/preferences/${session.id}`)
    .then( (response) => {
      return response.json();
    }).then((prefs) => {
      // const cleanedPrefs = JSON.parse(prefs);
      // console.log('getPreferences.then',prefs);
      dispatch(getPreferencesDone(session, prefs));
    });
  };
}
function getPreferencesDone(session, prefs) {

  // the attributes are in json format... like a string.
  // need to "parse" it into a javascript object.
  // console.log('getPrefsDone', prefs);
  const systemPrefs = prefs.find(pref => pref.user_id === null);
  const userPrefs = prefs.find(pref => pref.user_id === session.id);

  const systemPrefAttr = Object.assign({}, JSON.parse(systemPrefs.attributes), {id:systemPrefs.id});
  let userPrefAttr = {};
  if (userPrefs) {
    Object.assign(userPrefAttr, JSON.parse(userPrefs.attributes), {id: userPrefs.id});
    // userPrefAttr = JSON.parse(userPrefs.attributes);
  }


  // console.log('getPrefsDone', systemPrefAttr, userPrefAttr);
  return {
    type: "PREFERENCES_LOADED",
    value: {
      system: {...systemPrefAttr},
      user: {...userPrefAttr}
    }
  };
}

export function updateSettings(session, settings) {
  return function (dispatch) {
    // console.log('in commitAddress function', userID, create);
    fetch(`/users/settings/${session.id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"}
      , body: JSON.stringify(settings)
    }).then((response) => {
      return response.json();  // need to do this extra .then to convert json response into object to read.
    }).then((response) => {
      // console.log('actions.updateSettings', response)
      if (response.errno) {
        // console.log('2nd .then create Address', response);
        throw response;
      };
      // loadType === 'PENDING' ? dispatch(loadPending(userID)) : dispatch(loadProjects());
      dispatch(getUserSettings(session));
    }).catch(err => {
      dispatch(loadMessage(
        { ok:false,
          status: `${err.errno}:${err.code}`,
          statusText: err.sqlMessage
        }, "ERROR"));
    });
  };
  // return function (dispatch) {
  //   // dispatch({
  //   //   type: "SETTINGS_UPDATED",
  //   //   value: settings
  //   // });
  //   dispatch(settingsUpdated(settings));
  // }
}

export function updatePreferences(prefs) {
  return function (dispatch, getState) {
    console.log('in updatePreferences function', prefs);
    const {session} = getState();

    fetch(`/users/preferences/${session.id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"}
      , body: JSON.stringify(prefs)
    }).then((response) => {
      return response.json();  // need to do this extra .then to convert json response into object to read.
    }).then((response) => {
      // console.log('actions.updateSettings', response)
      if (response.errno) {
        // console.log('2nd .then create Address', response);
        throw response;
      };
      // loadType === 'PENDING' ? dispatch(loadPending(userID)) : dispatch(loadProjects());
      dispatch(getPreferences(session));
    }).catch(err => {
      dispatch(loadMessage(
        { ok:false,
          status: `${err.errno}:${err.code}`,
          statusText: err.sqlMessage
        }, "ERROR"));
    });
  };
  // return function (dispatch) {
  //   // dispatch({
  //   //   type: "SETTINGS_UPDATED",
  //   //   value: settings
  //   // });
  //   dispatch(settingsUpdated(settings));
  // }
}

// Action to create the Account
export function authenticate() {

  // localStorage.removeItem('token');
  const authToken = localStorage.getItem('token');
  // console.log('authenticate: token', authToken);

  if (authToken == null) {
  // if (true) {
    console.log('token is undefined');
    // return {false}
    null;
  } else {
    // console.log('authenticate: In the else');
    return function (dispatch) {
    fetch(`/authenticate/${authToken}`)
      .then( (response) => {
        // console.log('authenticate response', response);
        return response.json();
    }).then((response) => {
        // console.log('authenticate response.json 1', response);
        if (!response.ok) {
          dispatch(loadMessage(
            { ok:false,
              status: 'User',
              statusText: 'User could not be found'
            }, "ERROR"));
            localStorage.removeItem('token');
        } else {
          // console.log('authenticate response.json 2', response);
          dispatch(loadSession(response.data.username));
        }
    }).catch( err => {
        // console.log("authenticate.catch", err);
        dispatch(loadMessage(
          { ok:false,
            status: 401,
            statusText: "Caught unknown authorization error"
          }, "ERROR"));
        localStorage.removeItem('token');

        return false;
      });
    };
  }  // else statement
  // return retValue;
}

// Action to create the Account
export function signUp(user) {
  return function (dispatch) {
    fetch("/signUp", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(user)
    }).then( response => {
      // console.log("signUp response", response);
      if ( !response.ok ) {
        dispatch(loadMessage(response, "ERROR"));
      }
      else {
        const res = response.json();
        if (res.approved === 'Y') {
          // console.log("signUp.then else part", res);
          localStorage.setItem('token', res.token);
          dispatch(sessionLoaded({
            user_id: res.user_id,
            username: res.username,
            auth_key: res.auth_key,
            authenticated: true,
            token: res.token,
            approved: res.approved,
            contact_id: null,
            full_name: "",
            role: "",
            client_id: null,
            client_name: ""
          }));
        } else {
          dispatch(loadMessage(
            { ok:false,
              status: 'Pending Approval',
              statusText: `Account approval has been sent to Copeland Engineering.
              It may take up to 3 business days for approval.  If you have any questions please contact
              Copeland Engineering: 512-800-9200`
            }, "INFO"));
        }
      }
    }).catch( err => {
      // console.log("signUp.catch", err);
      dispatch(loadMessage(
        { ok:false,
          status: 401,
          statusText: "Caught unknown authorization error"
        }, "ERROR"));
    });
  };
}

// Action to Login
export function signIn(user) {
  return function (dispatch) {
    fetch("/signIn", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(user)
    }).then( response => {
      // console.log("signIn response", response);
      if ( !response.ok ) {
        dispatch(loadMessage(response, "ERROR"));
        return Promise.reject('failed');
      }
      return response.json();
      // else {
      //  const res = response.json();
      //  console.log('signIn.then else part.  Pass', res, user.email);
      //  localStorage.setItem('token', res.token);
      //  dispatch(loadSession(user.email));
      // }
    }).then( theUser => {
      if (theUser.approved === 'Y') {
        // console.log("signIn response", theUser);
        localStorage.setItem('token', theUser.token);
        dispatch(loadSession(user.email));
      } else {
        dispatch(loadMessage(
          { ok:false,
            status: 'Pending Approval',
            statusText: `Account has not been approved yet to
            use CE Webtools software.  If you requested approval more
            than 3 business days ago, please contact CE: 512-800-9200`
          }, "INFO"));
      }

    }).catch( err => {
      // console.log("signIn.catch", err);
      dispatch(loadMessage(
        { ok:false,
          status: 401,
          statusText: "Caught unknown authorization error"
        }, "ERROR"));
    });
  };
}

// Action to logout
export function signOut() {

  return function (dispatch) {
    // console.log('signOut');
    localStorage.removeItem('token');

    dispatch(sessionLoaded(
      {
      user_id: null,
      username: '',
      auth_key: '',
      authenticated: false,
      token: '',
      contact_id: null,
      first_name: '',
      full_name: '',
      role: '',
      client_id: null,
      client_name: ''
      }
    ));
  };

}

/* USERS */
// Loading the users
export function loadUsers() {
  return function (dispatch) {
    fetch("/users")
    .then( (response) => {
      return response.json();
    }).then((results) => {
      const users = results.filter(u => u.approved === 'Y');
      dispatch(usersLoaded(users));
    });
  };
}

function usersLoaded(users) {
  return {
    type: "USERS_LOADED",
    value: users
  };
}

export function loadMessage(message, type) {
  // console.log("In loadMessage", message);
  if (type === 'ERROR') {
    return {
      type: "MESSAGE_LOADED",
      value: {
        ok: message.ok,
        type: type,
        status: message.status,
        title: `${type[0]+type.slice(1).toLowerCase()}: ${message.status}`,
        content: message.statusText
      }
    };
  }
  if (type === 'WARN') {
    return {
      type: "MESSAGE_LOADED",
      value: {
        ok: message.ok,
        type: type,
        status: message.status,
        title: `${type[0]+type.slice(1).toLowerCase()}: ${message.status}`,
        content: message.statusText
      }
    };
  }
  if (type === 'INFO') {
    return {
      type: "MESSAGE_LOADED",
      value: {
        ok: message.ok,
        type: type,
        status: message.status,
        title: `${type[0]+type.slice(1).toLowerCase()}: ${message.status}`,
        content: message.statusText
      }
    };
  }
}

export function ackMessage() {
  // console.log("In ackMessage");
  return {
    type: "MESSAGE_LOADED",
    value: {
      ok: true,
      type: "",
      status: null,
      title: "",
      content: "",
      ynDialog: false,
      yesFunc: false,
      noFunc: false
    }
  };
}

export function ynDialog(action) {
  // console.log("In ackMessage");
  return {
    type: "MESSAGE_LOADED",
    value: {
      ok: action.ok,
      type: "INFO",
      status: null,
      title: action.title,
      content: action.content,
      ynDialog: true,
      yesFunc: action.yesFunc,
      noFunc: action.noFunc
    }
  };
}
