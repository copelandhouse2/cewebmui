function lookups(state = [], action) {
  if (action.type === "ALL_LOOKUPS_LOADED") {
    return action.value;
  }
  return state;
}

function stateLookup(state = [], action) {
  if (action.type === "STATELOOKUP_LOADED") {
    return action.value;
  }
  return state;
}

function countryLookup(state = [], action) {
  if (action.type === "COUNTRYLOOKUP_LOADED") {
    return action.value;
  }
  return state;
}

function roleLookup(state = [], action) {
  if (action.type === "ROLELOOKUP_LOADED") {
    return action.value;
  }
  return state;
}

function trelloListLookup(state = [], action) {
  if (action.type === "TRELLOLISTLOOKUP_LOADED") {
    return action.value;
  }
  return state;
}

function recordStatusLookup(state = [], action) {
  if (action.type === "RECORDSTATUSLOOKUP_LOADED") {
    return action.value;
  }
  return state;
}

function projectStatusLookup(state = [], action) {
  if (action.type === "PROJECTSTATUSLOOKUP_LOADED") {
    return action.value;
  }
  return state;
}

function scopeLookup(state = [], action) {
  if (action.type === "SCOPELOOKUP_LOADED") {
    return action.value;
  }
  return state;
}

function classificationLookup(state = [], action) {
  if (action.type === "CLASSIFICATIONLOOKUP_LOADED") {
    return action.value;
  }
  return state;
}

function masonryLookup(state = [], action) {
  if (action.type === "MASONRYLOOKUP_LOADED") {
    return action.value;
  }
  return state;
}

function ynLookup(state = [], action) {
  if (action.type === "YNLOOKUP_LOADED") {
    return action.value;
  }
  return state;
}

function fndTypeLookup(state = [], action) {
  if (action.type === "FNDTYPELOOKUP_LOADED") {
    return action.value;
  }
  return state;
}

function garageTypeLookup(state = [], action) {
  if (action.type === "GARAGETYPELOOKUP_LOADED") {
    return action.value;
  }
  return state;
}

function garageEntryLookup(state = [], action) {
  if (action.type === "GARAGEENTRYLOOKUP_LOADED") {
    return action.value;
  }
  return state;
}

function garageSwingLookup(state = [], action) {
  if (action.type === "GARAGESWINGLOOKUP_LOADED") {
    return action.value;
  }
  return state;
}

function floorTypeLookup(state = [], action) {
  if (action.type === "FLOORTYPELOOKUP_LOADED") {
    return action.value;
  }
  return state;
}

function roofTypeLookup(state = [], action) {
  if (action.type === "ROOFTYPELOOKUP_LOADED") {
    return action.value;
  }
  return state;
}

function coveredPatioLookup(state = [], action) {
  if (action.type === "COVEREDPATIO_LOADED") {
    return action.value;
  }
  return state;
}

function pitaLookup(state = [], action) {
  if (action.type === "PITA_LOADED") {
    return action.value;
  }
  return state;
}

function dwellingTypeLookup(state = [], action) {
  if (action.type === "DWELLINGTYPE_LOADED") {
    return action.value;
  }
  return state;
}

function dateSearchLookup(state = [], action) {
  if (action.type === "DATESEARCH_LOADED") {
    return action.value;
  }
  return state;
}

function revReasonLookup(state = [], action) {
  if (action.type === "REVREASON_LOADED") {
    return action.value;
  }
  return state;
}

function revRespLookup(state = [], action) {
  if (action.type === "REVRESP_LOADED") {
    return action.value;
  }
  return state;
}

function inspTypeLookup(state = [], action) {
  if (action.type === "INSPTYPE_LOADED") {
    return action.value;
  }
  return state;
}

function inspReasonLookup(state = [], action) {
  if (action.type === "INSPREASON_LOADED") {
    return action.value;
  }
  return state;
}

function reportTypesLookup(state = [], action) {
  if (action.type === "REPTYPES_LOADED") {
    return action.value;
  }
  return state;
}

const lookupReducer = { lookups, stateLookup, countryLookup
, roleLookup, trelloListLookup, recordStatusLookup, projectStatusLookup
, scopeLookup, classificationLookup, masonryLookup, ynLookup, fndTypeLookup, garageTypeLookup
, garageEntryLookup, garageSwingLookup, floorTypeLookup, roofTypeLookup
, coveredPatioLookup, dwellingTypeLookup, pitaLookup
, dateSearchLookup, revReasonLookup, revRespLookup, inspTypeLookup
, inspReasonLookup, reportTypesLookup };

export default lookupReducer
