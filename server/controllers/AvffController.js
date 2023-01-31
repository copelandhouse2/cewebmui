import AvffModel from '../models/AvffModel';

// const getScope = async (proj) => {
//   const scopeData = await ProjectModel.getScopeItems(proj.id);
//   const returnData = { ...proj, scope_items: scopeData };
//   return returnData;
// };

// function to get the top menu.
export const listControls = async (request, response) => {
  // get all controls
  try {
    const controls = await AvffModel.getAllControls();
    // const projectData = await Promise.all(projects.map(proj => getScope(proj)));
    // console.log('list controls', controls);
    console.log('Data retrieved... Controls');
    return response.json(controls);
  } catch (err) {
    console.log('Controls retrieval error', err);
    return response.json(err);
  }
};

// pull the controls with action =  actions (scope).
export const listScope = async (request, response) => {
  // get all controls
  try {
    const scope = await AvffModel.getScopeControls();
    // const projectData = await Promise.all(projects.map(proj => getScope(proj)));
    // console.log('list controls', controls);
    console.log('Data retrieved... Scope');
    return response.json(scope);
  } catch (err) {
    console.log('Controls retrieval error', err);
    return response.json(err);
  }
};

export const listRelationships = async (request, response) => {
  // get all relationships
  try {
    const relationships = await AvffModel.getAllRelationships();
    // const projectData = await Promise.all(projects.map(proj => getScope(proj)));
    // console.log('list relationships', relationships);
    console.log('Data retrieved... Relationships');
    return response.json(relationships);
  } catch (err) {
    console.log('Relationships retrieval error', err);
    return response.json(err);
  }
};

// function to get the top menu.
export const listTop = async (request, response) => {
  // The main section.  First get projects, then loop on projects
  // with map function to get the scope items.
  try {
    const topMenu = await AvffModel.getTopMenu();
    // const projectData = await Promise.all(projects.map(proj => getScope(proj)));
    console.log('list topMenu', topMenu);
    return response.json(topMenu);
  } catch (err) {
    return response.json(err);
  }
};

// function to get the children of parent control.
export const listChildren = async (request, response) => {
  // The main section.  First get projects, then loop on projects
  // with map function to get the scope items.
  try {
    const childrenControls = await AvffModel.getChildren(request.params.parentID);
    // const projectData = await Promise.all(projects.map(proj => getScope(proj)));
    console.log('list children Controls', childrenControls);
    return response.json(childrenControls);
  } catch (err) {
    return response.json(err);
  }
};
