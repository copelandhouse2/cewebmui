/* Lookup ACTIONS */
// Retrieving the LOV specified by type: STATE, COUNTRY, etc.  You need to save the LOV in an array when used.  The state of lookupList changes.
export function getLookup(type) {
  return function (dispatch) {
    fetch(`/lookups/${type}`)
    .then( (response) => {
      return response.json();
    }).then((lookupList) => {
      dispatch(lookupLoaded(lookupList, type));
    });
  };
}
function lookupLoaded(lookupList, type) {
  if (type === 'STATE') {
    return {
      type: "STATELOOKUP_LOADED",
      value: lookupList
    };
  }
  if (type === 'COUNTRY') {
    return {
      type: "COUNTRYLOOKUP_LOADED",
      value: lookupList
    };
  }
  if (type === 'ROLE') {
    return {
      type: "ROLELOOKUP_LOADED",
      value: lookupList
    };
  }
  if (type === 'TRELLO_LIST') {
    return {
      type: "TRELLOLISTLOOKUP_LOADED",
      value: lookupList
    };
  }
  if (type === 'RECORD_STATUS') {
    return {
      type: "RECORDSTATUSLOOKUP_LOADED",
      value: lookupList
    };
  }
  if (type === 'PROJECT_STATUS') {
    return {
      type: "PROJECTSTATUSLOOKUP_LOADED",
      value: lookupList
    };
  }
  if (type === 'SCOPE') {
    return {
      type: "SCOPELOOKUP_LOADED",
      value: lookupList
    };
  }
  if (type === 'CLASSIFICATION') {
    return {
      type: "CLASSIFICATIONLOOKUP_LOADED",
      value: lookupList
    };
  }
  if (type === 'MASONRY') {
    return {
      type: "MASONRYLOOKUP_LOADED",
      value: lookupList
    };
  }
  if (type === 'YN') {
    return {
      type: "YNLOOKUP_LOADED",
      value: lookupList
    };
  }
  if (type === 'FND_TYPE') {
    return {
      type: "FNDTYPELOOKUP_LOADED",
      value: lookupList
    };
  }
  if (type === 'GARAGE_TYPE') {
    return {
      type: "GARAGETYPELOOKUP_LOADED",
      value: lookupList
    };
  }
  if (type === 'GARAGE_ENTRY') {
    return {
      type: "GARAGEENTRYLOOKUP_LOADED",
      value: lookupList
    };
  }
  if (type === 'GARAGE_SWING') {
    return {
      type: "GARAGESWINGLOOKUP_LOADED",
      value: lookupList
    };
  }
  if (type === 'FLOOR_TYPE') {
    return {
      type: "FLOORTYPELOOKUP_LOADED",
      value: lookupList
    };
  }
  if (type === 'ROOF_TYPE') {
    return {
      type: "ROOFTYPELOOKUP_LOADED",
      value: lookupList
    };
  }
  if (type === 'COVERED_PATIO') {
    return {
      type: "COVEREDPATIO_LOADED",
      value: lookupList
    };
  }
  if (type === 'PITA') {
    return {
      type: "PITA_LOADED",
      value: lookupList
    };
  }
  if (type === 'DWELLING_TYPE') {
    return {
      type: "DWELLINGTYPE_LOADED",
      value: lookupList
    };
  }
  if (type === 'DATE_SEARCH') {
    return {
      type: "DATESEARCH_LOADED",
      value: lookupList
    };
  }
  if (type === 'REV_REASON') {
    return {
      type: "REVREASON_LOADED",
      value: lookupList
    };
  }
  if (type === 'REV_RESP') {
    return {
      type: "REVRESP_LOADED",
      value: lookupList
    };
  }
}
