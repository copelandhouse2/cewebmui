// Setting the page title.
export function setPageTitle(theTitle) {
  // console.log('pageTitle', theTitle);
  return function (dispatch) {
    dispatch(pageTitleDone(theTitle));
  }
}
function pageTitleDone(theTitle) {
  return {
    type: "TITLE_LOADED",
    value: theTitle
  };
}

export function loadControls() {
  // console.log('loadSession', username);
  return function (dispatch) {
    fetch(`/controls`)
    .then( (response) => {
      return response.json();
    }).then((controls) => {
      dispatch(controlsLoaded(controls));
    });
  };
}
function controlsLoaded(controls) {
  return {
    type: "CONTROLS_LOADED",
    value: controls
  };
}

export function loadScope() {
  // console.log('loadScope');
  return function (dispatch) {
    fetch(`/controls/scope`)
    .then( (response) => {
      return response.json();
    }).then((scope) => {
      // console.log('loadScope after', scope);
      dispatch(scopeLoaded(scope));
    });
  };
}
function scopeLoaded(scope) {
  return {
    type: "SCOPELOOKUP_LOADED",
    value: scope
  };
}

export function loadRelationships() {
  // console.log('loadSession', username);
  return function (dispatch) {
    fetch(`/relationships`)
    .then( (response) => {
      return response.json();
    }).then((relationships) => {
      dispatch(relationshipsLoaded(relationships));
    });
  };
}
function relationshipsLoaded(relationships) {
  return {
    type: "RELATIONSHIPS_LOADED",
    value: relationships
  };
}

export function loadTopMenu() {
  // console.log('loadSession', username);
  return function (dispatch) {
    fetch(`/controls`)
    .then( (response) => {
      // console.log('loadTopMenu response', response);
      return response.json();
    }).then((menu) => {
      // console.log('action loadTopMenu', menu);
      dispatch(menuLoaded(menu));
    });
  };
}
function menuLoaded(menu) {
  return {
    type: "MENU_LOADED",
    value: menu
  };
}

// Loading the current Menu based on passed parent id.
export function loadCurrentMenu(parent_id) {
  // console.log('In loadCurrentMenu', parent_id);
  return function (dispatch, getState) {
    const { avffControls, avffRelationships } = getState();
    if (avffControls.length > 0 && avffRelationships.length > 0) {
      // console.log('loadCurrentMenu', avffControls, avffRelationships);
      let a = avffRelationships.filter(child => child.parent_id === parent_id);
      let c = [];
      for (let i = 0; i < a.length; i++) {
        let b = avffControls.find(control => control.id === a[i].control_id);
        // Only take controls that are Menus / Actions.
        ['MENU', 'ACTION'].includes(b.entity_type)? c.push({ ...b, ...a[i] }):null;
      }

      let parent = null;
      if (parent_id === null) {
        parent = {id: null, name: 'top', label: 'Main', entity_type: 'MENU'};
      } else {
        parent = avffControls.find(control => control.id === parent_id);
      }
      let currentControls = { ...parent, children: c };

      // console.log('load Menu', currentControls);

      dispatch(currentMenuLoaded(currentControls));
    } else {
      console.log('one array missing');
    }

  };
}
function currentMenuLoaded(currentControls) {
  return {
    type: "CURRENT_MENU_LOADED",
    value: currentControls
  };
}

export function assignNewProjectScope(scope) {
  return {
    type: "INITIAL_SCOPE_LOADED",
    value: scope
  };
}

export function updateProject(project) {
  // console.log('updateProject project', project);
  return function (dispatch, getState) {
    if (project.classification) {
      const { avffControls } = getState();
      // const { avffControls, avffRelationships } = getState();
      const menuControl = avffControls.find(c=>c.entity_type === 'MENU' && c.category === project.classification);
      // console.log('updateProject menuControl', menuControl);

      // ********************* 20-05-21 Mods
      // let a = avffRelationships.filter(child => child.parent_id === menuControl.id);
      // console.log('updateProject a', a);
      // let c = [];
      // for (let i = 0; i < a.length; i++) {
      //   let b = avffControls.find(control => control.id === a[i].control_id);
      //   console.log('updateProject b', b);
      //   // Find the menu that has the actions... cusnew or volnew.
      //   ['MENU', 'ACTION'].includes(b.entity_type) && b.name.includes('new')? c.push({ ...b, ...a[i] }):null;
      // }
      // console.log('updateProject a, c', a, c[0].id);
      const theProject = Object.assign({}, project, { categoryID: menuControl.id, url: menuControl.url });
      // console.log('updateProject theProject', theProject);
      // dispatch(loadCurrentMenu(c[0].id));
      // ********************* 20-05-21 Mods
      dispatch(loadCurrentMenu(menuControl.id));

      // Views need to be loaded upon 3 events:
      // from initial menu, picking a new project, switching views
      dispatch(loadViews(menuControl.id));
      dispatch(currentProjectLoaded(theProject));
    } else {
      dispatch(currentProjectLoaded(project));
    }
  };
}

export function currentProjectLoaded(project) {
    return {
    type: "UPDATE_PROJECT",
    value: project
  };
}

export function clearProject() {
  return {
    type: "CLEAR_PROJECT",
    value: {}
  };
}

// loadCurrentView(parent_id)
export function getChildren(controls, relationships, theParent) {
  // console.log('In masterData');
    let c_rship = relationships.filter(child => child.parent_id === theParent.id && child.hidden!=='Y');
    if (!c_rship) return [];

    let children = [];
    for (let i = 0; i < c_rship.length; i++) {
      let c_control = controls.find(control => control.id === c_rship[i].control_id);
      // only include children that are views, field groups, fields.
      if (!['MENU', 'ACTION'].includes(c_control.entity_type)) {
        children.push({ ...c_control, ...c_rship[i], children: getChildren(controls, relationships, c_control)})
      }
    }

    // console.log('children', children);
    return children;

}

// Views are loaded / updated upon 3 events:
// from initial menu, picking a new project, switching views (removed feature right now)
// Loading the current Menu based on passed parent id.
export function loadViews(rootId, localView = null, clear = false) {
  // console.log('In loadViews');
  return function (dispatch, getState) {
    if (clear) {
      dispatch(viewsLoaded([]));
    } else {
      const { avffControls, avffRelationships } = getState();

      const rootData = avffControls.find(control => control.id === rootId);
      // console.log('loadViews: rootData', rootData);

      const children = getChildren(avffControls, avffRelationships, rootData);
      // console.log('loadViews: children', children);

      const rootTree = { ...rootData, children: [...children] }
      // console.log('rootTree', rootTree);

      if (localView) {
        // return rootTree;
        // console.log('loadViews: localView', rootTree);
        dispatch(localViewLoaded(rootTree));
      } else {
        // console.log('loadViews: main view', rootTree);
        dispatch(viewsLoaded(rootTree));
      }
    }
  };
}
export function loadViewsByName(name) {
  // console.log('In loadViews');
  return function (dispatch, getState) {
    const { avffControls, avffRelationships } = getState();
    const rootData = avffControls.find(control => control.name === name);
    // console.log('loadViews: rootData', rootData);
    const children = getChildren(avffControls, avffRelationships, rootData);
    // console.log('loadViews: children', children);
    const rootTree = { ...rootData, children: [...children] }
    // console.log('rootTree', rootTree);
    // console.log('loadViews: main view', rootTree);
    dispatch(viewsLoaded(rootTree));
  };
}
function viewsLoaded(rootTree) {
  return {
    type: "VIEWS_LOADED",
    value: rootTree
  };
}

export function loadLocalView(viewName, clear = false) {
  return function (dispatch, getState) {

    if (clear) {
      // console.log('loadLocalView: clearing');
      dispatch(localViewLoaded({}));
    } else {
      // console.log('loadLocalView', viewName);
      const { avffControls } = getState();
      const rootData = avffControls.find(control => control.name === viewName && control.entity_type === 'VIEW');

      // const rootTree = loadViews(rootData.id, true)
      dispatch(loadViews(rootData.id, true));
      // console.log('rootTree', rootTree);

      // dispatch(localViewLoaded(rootTree));
    };
  };
}
function localViewLoaded(rootTree) {
  return {
    type: "LOCAL_VIEW_LOADED",
    value: rootTree
  };
}
