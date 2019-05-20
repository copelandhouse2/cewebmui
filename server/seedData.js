import GeotechModel from './models/GeotechModel';

// function to get the list of geotechs
export var geotechs = [];
export var geoMasterData = [];
export const MysqlSeed = {
  queryGeos: () => {
    (async () => {
      try {
        geotechs = await GeotechModel.getGeos();
      } catch (err) {
        console.log('Error: ', `${err.errno}:${err.code} - ${err.sqlMessage}`);
      }
      console.log('Retrieved Geotechs seed data');
      // console.log('Geo List', geotechs);

    })();
  },
  queryMasterData: () => {
    (async () => {
      try {
        geoMasterData = await GeotechModel.getMasterData();
      } catch (err) {
        console.log('Error: ', `${err.statusCode} - ${err.responseBody}`);
      }
      console.log('Retrieved Geo Master data');
      // console.log('Master Data List', geoMasterData);

    })();
  }
}
