import SubdivisionModel from "../models/SubdivisionModel";

// function to get the list of subdivisions.
export const list = async (request, response) => {

  try {
    const data = await SubdivisionModel.getSubdivisions();
    console.log('Data retrieved... Subdivisions');
    return response.json(data);

  } catch (err) {
    console.log('Error: ', `${err.statusCode} - ${err.responseBody}`);
    return response.json(err);
  }

}

// function to get one subdivision.
export const show = (request, response) => {

  SubdivisionModel.getSubdivisionByID(request.params.id, function(err, rows, fields) {
    if (!err) {
      // console.log('Data retrieved... Subdivision by ID!');
      return response.json(rows[0]);
    }
    else {
      console.log('Subdivision: Error while performing Query.');
      return response.json(err);
    }
  });
}

export const find = async (request, response) => {

  try {
    const data = await SubdivisionModel.findSubdivisions(request.params);
    // console.log('Find Data retrieved... Subdivisions', data);
    return response.json(data);

  } catch (err) {
    console.log('Error: ', `${err.statusCode} - ${err.responseBody}`);
    return response.json(err);
  }

}
// function to add a subdivision.
export const create = (request, response) => {

  SubdivisionModel.addSubdivision(request.body, function(err, result) {
    if (err) return response.json(err);
    return response.json(result.insertId);
  });
}

// function to save the Sub changes... adds and updates and deletes.
// uses a "change" key
export const save = async (request, response) => {

  // console.log('in ProjectController.saveRevisions', request.body);
  var errors = [];

  let subPromises = [];
  request.body.forEach((sub, i) => {
    // console.log('Sub: Adding / Adjusting: ', sub);

    // rev.change is either unset or value = add, update, delete
    // if unset, skip updating.
    if (sub.change === 'delete') { //checking to see if we are to delete rev.
      // console.log('delete scope', item.id);
      subPromises.push(SubdivisionModel.delete(sub.id));
    } else if (sub.change) {  // wish to delete the scope record.
      // console.log('add/update sub', sub.id);
      subPromises.push(SubdivisionModel.save(sub));
    }

  });

  try {
    // console.log('Sub records to promise: ', subPromises);
    const subResponses = await Promise.all(subPromises);
    // console.log('Sub records created / updated: ', subResponses);
  } catch (err) {
    // console.log('Sub record create error:', err);
    errors.push(err);
  }

  // console.log('Create return... back to browser');
  if (errors.length) {
    console.log('Done with error(s)', errors);
    return response.json(errors);
  }
  console.log('Subdivision(s) saved');
  return response.json({message: 'Subdivision saved'});

}

// function to delete a subdivision.
// export const remove = (request, response) => {
//
//   SubdivisionModel.deleteSubdivision(request.params.id, function(err, result) {
//     if (err) return response.json(err);
//     return response.json("subdivision deleted");
//   });
// }

export const remove = async (request, response) => {

  try {
    console.log('sub remove', request.params.id);
    const deleteResp = await SubdivisionModel.delete(request.params.id);
    return response.json('Subdivision Deleted');

  } catch (err) {
    console.log('MySQL delete error: ', err);
    return response.json(err);

  }
}
