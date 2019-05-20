import GeotechModel from '../models/GeotechModel';
import { geotechs, geoMasterData } from '../seedData';
import { sql } from '../mysqldb';

// function to get the list of addresses.
export const listGeos = (request, response) => {

  // geotechs is global seed data variable.  Should already have values.
  // This enables us to skip the async call below and return values quickly.
  // console.log('seedData', geotechs);
  // if (geotechs) { return response.json(geotechs) };

  (async () => {
    try {
      const data = await GeotechModel.getGeos();
      console.log('Data retrieved... Geotechs');
      return response.json(data);

    } catch (err) {
      console.log('Error: ', `${err.statusCode} - ${err.responseBody}`);
      return response.json(err);
    }

  })();

}

export const createGeo = (request, response) => {

  (async () => {
    try {
      const addResponse = await GeotechModel.addGeo(request.body);
      console.log('created new Geotech', addResponse);
      return response.json(addResponse);

    } catch (err) {
      console.log('Error: ', `${err.statusCode} - ${err.responseBody}`);
      return response.json(err);
    }

  })();

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
