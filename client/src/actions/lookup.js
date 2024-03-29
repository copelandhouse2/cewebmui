/* Lookup ACTIONS */
// Retrieving the LOV specified by type: STATE, COUNTRY, etc.  You need to save the LOV in an array when used.  The state of lookupList changes.
export function getLookup(type) {
  return function (dispatch) {
    fetch(`/lookups/${type}`)
    .then( (response) => {
      return response.json();
    }).then((lookupList) => {
      const types = [...new Set(lookupList.map(l => l.type))];
      for (let i = 0; i<types.length; i++) {
        const list = lookupList.filter(l=>l.type===types[i]);
        // console.log('types', types[i], list);
        dispatch(lookupLoaded(list, types[i]));
      }
      dispatch(lookupLoaded(lookupList, type)); // this should be ALL

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
  if (type === 'INSP_TYPE') {
    return {
      type: "INSPTYPE_LOADED",
      value: lookupList
    };
  }
  if (type === 'INSP_REASON') {
    return {
      type: "INSPREASON_LOADED",
      value: lookupList
    };
  }
  if (type === 'REPORT_TYPE') {
    return {
      type: "REPTYPES_LOADED",
      value: lookupList
    };
  }
  if (type === 'ALL') {
    // console.log('all lookups', lookupList);
    return {
      type: "ALL_LOOKUPS_LOADED",
      value: lookupList
    };
  } else {  // this is capturing all the lookups that we do not load at this point
    // console.log('skipped lookup', type, lookupList);
    return {
      type: 'SKIPPED',
      value: []
    }
  }

}
