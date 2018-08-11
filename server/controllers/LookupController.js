import LookupModel from "../models/LookupModel";

// function to get the list of values based on lookup type: i.e STATE, COUNTRTY.
export const list = (request, response) => {

  // Listing from MySql;
  LookupModel.getLookupByType(request.params.type, function(err, rows, fields) {
    if (!err) {
      console.log('Data retrieved... lookup: ', request.params.type);
      return response.json(rows);
    }
    else {
      console.log('Error while performing Query.');
      return response.json(err);
    }
  });
}

// function to get a lookup value based on a lookup code: i.e TX - Texas.
export const show = (request, response) => {

  // Listing from MySql;
  LookupModel.getLookupByCode(request.params.type, request.params.lookupCode, function(err, rows, fields) {
    if (!err) {
      console.log('Data retrieved... lookup code: ', request.params.lookupCode);
      return response.json(rows[0]);
    }
    else {
      console.log('Error while performing Query.');
      return response.json(err);
    }
  });
}
