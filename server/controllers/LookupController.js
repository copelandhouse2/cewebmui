import LookupModel from "../models/LookupModel";
import { geotechs, geoMasterData } from '../seedData';

// function to get the list of values based on lookup type: i.e STATE, COUNTRTY.
export const list = async (request, response) => {

  try {
    const data = await LookupModel.getLookupByType(request.params.type);
    console.log(`Data retrieved... ${request.params.type} lookups`);
    return response.json(data);

  } catch (err) {
    console.log('Error: ', `${err.statusCode} - ${err.responseBody}`);
    return response.json(err);
  }
  // Listing from MySql;

  // LookupModel.getLookupByType(request.params.type, function(err, rows, fields) {
  //   if (!err) {
  //     // console.log('Data retrieved... Lookups', request.params.type);
  //     // request.params.type === 'CLASSIFICATION'?console.log(rows):null;
  //     return response.json(rows);
  //   }
  //   else {
  //     console.log('Lookups: Error while performing Query.');
  //     return response.json(err);
  //   }
  // });
}

// function to get a lookup value based on a lookup code: i.e TX - Texas.
export const show = async (request, response) => {

  try {
    const data = await LookupModel.getLookupByCode(request.params.type, request.params.lookupCode);
    console.log('Data retrieved... Lookups');
    return response.json(data[0]);

  } catch (err) {
    console.log('Error: ', `${err.statusCode} - ${err.responseBody}`);
    return response.json(err);
  }
  // Listing from MySql;

  // LookupModel.getLookupByCode(request.params.type, request.params.lookupCode, function(err, rows, fields) {
  //   if (!err) {
  //     console.log('Data retrieved... lookup code: ', request.params.lookupCode);
  //     return response.json(rows[0]);
  //   }
  //   else {
  //     console.log('Lookup: Error while performing Query.');
  //     return response.json(err);
  //   }
  // });
}
