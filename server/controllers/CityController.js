import CityModel from "../models/CityModel";

// function to get the list of cities.
export const list = (request, response) => {

  CityModel.getCities(function(err, rows, fields) {
    if (!err) {
      console.log('Data retrieved... cities');
      return response.json(rows);
    }
    else {
      console.log('Error while performing Query.');
      return response.json(err);
    }
  });
}

// function to get one city.
export const show = (request, response) => {

  CityModel.getCityByID(request.params.id, function(err, rows, fields) {
    if (!err) {
      console.log('Data retrieved... yeah!');
      return response.json(rows[0]);
    }
    else {
      console.log('Error while performing Query.');
      return response.json(err);
    }
  });
}

// function to add a city.
export const create = (request, response) => {

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

// function to update a city.
export const update = (request, response) => {

  CityModel.updateCity(request.body, function(err, result) {
    if (err) return response.json(err);
    return response.json(result.updateId);
  });
}

// function to delete a city.
export const remove = (request, response) => {

  CityModel.deleteCity(request.params.id, function(err, result) {
    if (err) return response.json(err);
    return response.json("city deleted");
  });
}