import SubdivisionModel from "../models/SubdivisionModel";

// function to get the list of subdivisions.
export const list = (request, response) => {

  SubdivisionModel.getSubdivisions(function(err, rows, fields) {
    if (!err) {
      console.log('Data retrieved... Subdivisions');
      return response.json(rows);
    }
    else {
      console.log('Subdivisions: Error while performing Query.');
      return response.json(err);
    }
  });
}

// function to get one subdivision.
export const show = (request, response) => {

  SubdivisionModel.getSubdivisionByID(request.params.id, function(err, rows, fields) {
    if (!err) {
      console.log('Data retrieved... Subdivision by ID!');
      return response.json(rows[0]);
    }
    else {
      console.log('Subdivision: Error while performing Query.');
      return response.json(err);
    }
  });
}

// function to add a subdivision.
export const create = (request, response) => {

  SubdivisionModel.addSubdivision(request.body, function(err, result) {
    if (err) return response.json(err);
    return response.json(result.insertId);
  });
}

// function to update a subdivision.
export const update = (request, response) => {

  SubdivisionModel.updateSubdivision(request.body, function(err, result) {
    if (err) return response.json(err);
    return response.json(result.updateId);
  });
}

// function to delete a subdivision.
export const remove = (request, response) => {

  SubdivisionModel.deleteSubdivision(request.params.id, function(err, result) {
    if (err) return response.json(err);
    return response.json("subdivision deleted");
  });
}