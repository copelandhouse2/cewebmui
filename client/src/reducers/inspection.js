function inspections(state = [], action) {
  if (action.type === "INSPECTIONS_LOADED") {
    return action.value;
  }
  return state;
}


const inspectionReducer = { inspections };

export default inspectionReducer
