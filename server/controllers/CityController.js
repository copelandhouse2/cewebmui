import CityModel from "../models/CityModel";

// function to get the list of cities.
// export const list = (request, response) => {
//
//   CityModel.getCities(function(err, rows, fields) {
//     if (!err) {
//       console.log('Data retrieved... Cities');
//       return response.json(rows);
//     }
//     else {
//       console.log('Cities: Error while performing Query.');
//       return response.json(err);
//     }
//   });
// }

export const list = async (request, response) => {

  try {
    const data = await CityModel.getCities();
    console.log('Data retrieved... Cities');
    return response.json(data);

  } catch (err) {
    console.log('Error: ', `${err.statusCode} - ${err.responseBody}`);
    return response.json(err);
  }

}

// function to get one city.
export const show = (request, response) => {

  CityModel.getCityByID(request.params.id, function(err, rows, fields) {
    if (!err) {
      // console.log('Data retrieved... City by ID!');
      return response.json(rows[0]);
    }
    else {
      console.log('City: Error while performing Query.');
      return response.json(err);
    }
  });
}

export const find = async (request, response) => {

  try {
    const data = await CityModel.findCities(request.params);
    // console.log('Find Data retrieved... Cities', data);
    return response.json(data);

  } catch (err) {
    console.log('Error: ', `${err.statusCode} - ${err.responseBody}`);
    return response.json(err);
  }

}
// function to add a city.
export const create = (request, response) => {

  // CityModel.addCity(request.body, function(err, result) {
  CityModel.addCity(request.body, function(err, result) {
    if (err) {
      // console.log("there was an error");
      return response.json(err);
    }
    // const insertID = response.json(result.insertId);
    // console.log(insertID);
    // return insertID;
    return response.json(result.insertId);
    // return response.json("city added");

  });
}

// function to save the Sub changes... adds and updates and deletes.
// uses a "change" key
export const save = async (request, response) => {

  // console.log('in ProjectController.saveRevisions', request.body);
  var errors = [];

  let cityPromises = [];
  // console.log('save: data type', request.body, request.body.constructor);
  let data = [];
  if (request.body.constructor === Object) {
    // console.log('request.body is an object');
    data.push(request.body);
  } else {
    // console.log('request.body is an array');
    data = [...request.body];
  }
  // console.log('save controller', data);

  data.forEach((city, i) => {
    // console.log('City: Adding / Adjusting: ', city);

    // rev.change is either unset or value = add, update, delete
    // if unset, skip updating.
    if (city.change === 'delete') { //checking to see if we are to delete rev.
      // console.log('delete scope', item.id);
      cityPromises.push(CityModel.delete(city.id));
    } else if (city.change) {  // wish to delete the scope record.
      console.log('add/update city', city);
      cityPromises.push(CityModel.save(city));
    }

  });

  try {
    // console.log('City records to promise: ', cityPromises);
    const cityResponses = await Promise.all(cityPromises);
    // console.log('City records created / updated: ', cityResponses);
  } catch (err) {
    // console.log('City record create error:', err);
    errors.push(err);
  }

  // console.log('Create return... back to browser');
  if (errors.length) {
    console.log('Done with error(s)', errors);
    return response.json(errors);
  }
  console.log('Cit(y)(ies) saved');
  return response.json({message: 'City saved'});

}

// function to update a city.
// export const update = (request, response) => {
//
//   CityModel.updateCity(request.body, function(err, result) {
//     if (err) return response.json(err);
//     return response.json(result.updateId);
//   });
// }

// function to delete a city.
// export const remove = (request, response) => {
//
//   CityModel.deleteCity(request.params.id, function(err, result) {
//     if (err) return response.json(err);
//     return response.json("city deleted");
//   });
// }

export const remove = async (request, response) => {

  try {
    console.log('city remove', request.params.id);
    const deleteResp = await CityModel.delete(request.params.id);
    return response.json('City Deleted');

  } catch (err) {
    console.log('MySQL delete error: ', err);
    return response.json(err);

  }
}
