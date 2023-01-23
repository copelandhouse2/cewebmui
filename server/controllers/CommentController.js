import CommentModel from "../models/CommentModel";

// function to get the list of comments based on table / table id.
export const list = async (request, response) => {

  // const { table, table_id } = request.params;
  console.log('com list', request.params.table, request.params.table_id);
  try {
    const data = await CommentModel.getComments(request.params.table,request.params.table_id);
    // console.log('Data retrieved... Subdivisions');
    return response.json(data);

  } catch (err) {
    console.log('Error: ', `${err.statusCode} - ${err.responseBody}`);
    return response.json(err);
  }

}

// function to save the comment changes... adds and updates and deletes.
// uses a "change" key
export const save = async (request, response) => {

  // console.log('in CommentController.save', request.body);
  var errors = [];

  // console.log('save: data type', request.body.constructor);
  let data = [];
  if (request.body.constructor === Object) {
    // console.info('request.body is an object');
    data.push(request.body);
  } else {
    // console.info('request.body is an array');
    data = request.body;
  }
  // console.log('this is the data',data);

  let comPromises = [];
  data.forEach((com, i) => {
    // console.log('Comments: Adding / Adjusting: ', com);

    // rev.change is either unset or value = add, update, delete
    // if unset, skip updating.
    if (com.change === 'delete') { //checking to see if we are to delete rev.
      comPromises.push(CommentModel.delete(com.id));
    } else if (com.change) {  // wish to delete the scope record.
      // console.log('add/update com', com.id);
      comPromises.push(CommentModel.save(com));
    }

  });

  let comResponses = [];
  try {
    // console.log('Sub records to promise: ', comPromises);
    comResponses = await Promise.all(comPromises);
    // console.log('Sub records created / updated: ', comResponses);
  } catch (err) {
    // console.log('Com record create error:', err);
    errors.push(err);
  }

  // console.log('Create return... back to browser');
  if (errors.length) {
    console.log('Done with error(s)', errors);
    return response.json(errors);
  }
  console.log('Comment(s) saved');
  return response.json(comResponses);

}

export const remove = async (request, response) => {

  try {
    console.log('com remove', request.params.id);
    const deleteResp = await CommentModel.delete(request.params.id);
    return response.json('Comment Deleted');

  } catch (err) {
    console.log('MySQL delete error: ', err);
    return response.json(err);

  }
}
