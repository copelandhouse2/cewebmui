import GeotechModel from '../models/GeotechModel';
import { geotechs, geoMasterData } from '../seedData';
import { sql } from '../mysqldb';

// function to get the list of addresses.
export const listGeos = async (request, response) => {

  // geotechs is global seed data variable.  Should already have values.
  // This enables us to skip the async call below and return values quickly.

  // however commented out so that we can add geotechs on the fly.  Otherwise
  // everytime I added a geotech, I would have to restart the app.  Need to
  // figure out way to pull data once and store in server variables, but be
  // able to refresh these variables.
  // console.log('seedData', geotechs);
  // if (geotechs) { return response.json(geotechs) };

  try {
    const data = await GeotechModel.getGeos();
    console.log('Data retrieved... Geotechs');
    return response.json(data);

  } catch (err) {
    console.log('Error: ', `${err.statusCode} - ${err.responseBody}`);
    return response.json(err);
  }

}

export const findGeos = async (request, response) => {

  // console.log('seedData', geotechs);
  // if (geotechs) { return response.json(geotechs) };

  try {
    const data = await GeotechModel.findGeos(request.params);
    // console.log('Find Data retrieved... Geotechs');
    return response.json(data);

  } catch (err) {
    console.log('Error: ', `${err.statusCode} - ${err.responseBody}`);
    return response.json(err);
  }

}
// Holding onto this function for the time being... 9/9/20
// export const saveGeo = async (request, response) => {
//
//   try {
//     const addResponse = await GeotechModel.saveGeo(request.body);
//     console.log('created new Geotech', addResponse);
//     return response.json(addResponse);
//
//   } catch (err) {
//     console.log('Error: ', `${err.statusCode} - ${err.responseBody}`);
//     return response.json(err);
//   }
//
// }

// function to save the Geo changes... adds and updates and deletes.
// uses a "change" key
export const saveGeos = async (request, response) => {

  // console.log('in ProjectController.saveRevisions', request.body);
  var errors = [];

  let geoPromises = [];
  request.body.forEach((geo, i) => {
    // console.log('rev: Adding / Adjusting: ', rev.id, rev.scope);

    // rev.change is either unset or value = add, update, delete
    // if unset, skip updating.
    if (geo.change === 'delete') { //checking to see if we are to delete rev.
      // console.log('delete scope', item.id);
      geoPromises.push(GeotechModel.deleteGeo(geo.id));
    } else if (geo.change) {  // wish to delete the scope record.
      geoPromises.push(GeotechModel.saveGeo(geo));
    }

  });

  try {
    // console.log('geo records to promise: ', geoPromises);
    const geoResponses = await Promise.all(geoPromises);
    // console.log('geo records created / updated: ', geoResponses);
  } catch (err) {
    // console.log('Geo record create error:', err);
    errors.push(err);
  }

  // console.log('Create return... back to browser');
  if (errors.length) {
    console.log('Done with error(s)', errors);
    return response.json(errors);
  }
  console.log('Geo(s) saved');
  return response.json({message: 'Geos committed'});

}

export const deleteGeo = async (request, response) => {

  try {
    // console.log('in db update.  Params:', id, tCardID);
    const deleteResp = await GeotechModel.deleteGeo(request.params.id);
    return response.json('Geo Deleted');

  } catch (err) {
    console.log('MySQL delete error: ', err);
    return response.json(err);

  }
}

export const listMasterData = (request, response) => {

  // geotechs is global seed data variable.  Should already have values.
  // This enables us to skip the async call below and return values quickly.
  // console.log('seedData', geoMasterData);
  if (geoMasterData) {
    const masterData = geoMasterData.filter((rec) => {
      // console.log('masterData', rec);
      return rec.geotech_id == request.params.id;
    })
    return response.json(masterData);
  };

  (async () => {
    try {
      const data = await GeotechModel.getMasterData(request.params.id);
      console.log('Data retrieved... Geo Master Data');
      return response.json(data);

    } catch (err) {
      console.log('Error: ', `${err.statusCode} - ${err.responseBody}`);
      return response.json(err);
    }

  })();

}

export const listReportData = (request, response) => {

  (async () => {
    try {
      const data = await GeotechModel.getReportData(request.params.id);
      console.log('Data retrieved... Geo Report Data');
      return response.json(data);

    } catch (err) {
      console.log('Error: ', `${err.statusCode} - ${err.responseBody}`);
      return response.json(err);
    }

  })();

}
