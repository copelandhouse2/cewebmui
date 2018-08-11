import JobNumberSeqModel from "../models/JobNumberSeqModel";

// function to get the list of job number sequences.
export const list = (request, response) => {

  JobNumberSeqModel.getJobNumberSeqs(function(err, rows, fields) {
    if (!err) {
      console.log('Data retrieved... job number sequences');
      return response.json(rows);
    }
    else {
      console.log('Error while performing Query.');
      return response.json(err);
    }
  });
}

// function to get one job number sequences.
export const show = (request, response) => {

  JobNumberSeqModel.getJobNumberSeqByID(request.params.id, function(err, rows, fields) {
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

// function to add a job number sequences.
export const create = (request, response) => {

  JobNumberSeqModel.addJobNumberSeq(request.body, function(err, result) {
    if (err) return response.json(err);
    return response.json(result.insertId);
  });
}

// function to update a job number sequences.
export const update = (request, response) => {

  JobNumberSeqModel.updateJobNumberSeq(request.body, function(err, result) {
    if (err) return response.json(err);
    return response.json(result.updateId);
  });
}

// function to delete a job number sequences.
export const remove = (request, response) => {

  JobNumberSeqModel.deleteJobNumberSeq(request.params.id, function(err, result) {
    if (err) return response.json(err);
    return response.json("job number sequence deleted");
  });
}