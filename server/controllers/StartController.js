// import addresses from "../addresses.js";
// import AddressModel from "../models/AddressModel";
import StartModel from "../models/StartModel";
import JobNumberSeqModel from "../models/JobNumberSeqModel";
import { sql } from "../mysqldb";
import { trello } from "../trello";

// function to get the list of addresses.
export const list = (request, response) => {

  // Listing from mongoDB
  // AddressModel.find({}).exec()
  // .then(addresses => {
  //   return response.json(addresses);
  // });

  // Listing from MySql;
  // sql().query('SELECT id, job_number, client_id, user_id, city, subdivision, address1, address2 from starts', function(err, rows, fields) {
  StartModel.getStarts(function (err, rows, fields) {
    if (!err) {
      console.log('Data retrieved... Starts');
      return response.json(rows);
    }
    else {
      console.log('Starts: Error while performing Query.');
      return response.json(err);
    }
  });
}

// function to get details of one address
export const show = (request, response) => {

  // AddressModel.findById(request.params.id).exec()
  // .then(address => {
  //   return response.json(address);
  // });

  // return response.json(addresses.find(address => address._id == request.params.id));

  StartModel.getStartByID(request.params.id, function (err, rows, fields) {
    if (!err) {
      console.log('Data retrieved... Start by ID!');
      return response.json(rows[0]);
    }
    else {
      console.log('Start: Error while performing Query.');
      return response.json(err);
    }
  });

}

// function to create a address
export const create = (request, response) => {

  // inserting into mongoDB
  // const address = new AddressModel(request.body);
  // address.save()
  // .then(c => {
  //   return response.json(c);
  // });

  // console.log("Start Controller.create request", request.body);

  // console.log("query", SQLstmt);

  // sql().query(SQLstmt, values, function (err, result) {
  StartModel.addStart(request.body, function(err, result) {
    if (err) return response.json(err);  // If there is an error.

    const insertID = response.json(result.insertId);
    // console.log(insertID);

    // Get the variables.
    const { job_number, client_id, client, owner_id, city, subdivision, address1, address2, phase, section, lot, block
      , fnd_height_fr, fnd_height_fl, fnd_height_rr, fnd_height_rl, plan_type, elevation, masonry, garage_type
      , garage_entry, garage_swing, garage_drop, garage_extension, covered_patio, bay_window, master_shower_drop
      , bath1_shower_drop, bath2_shower_drop, bath3_shower_drop, additional_options, comments, created_by, last_updated_by
      , sequence_id, prefix, sequence, year, city_id, subdivision_id } = request.body;

    // Insert into Job Number Sequences now.
    const seqObj = {
      id: sequence_id,
      prefix: prefix,
      sequence: sequence,
      year: year,
      city_id: city_id,
      client_id: client_id,
      subdivision_id: subdivision_id,
      current_value: job_number,
      created_by: created_by,
      last_updated_by: last_updated_by
    };

    JobNumberSeqModel.addJobNumberSeq(seqObj, function(err, result) {
      if (err) return response.json(err);
      console.log("addStart: Job number created / updated");
    });

    // Trello card Create
    const card = {
      idList: "58224c17dec8267fc73d049f",
      name: job_number + "-" + address1 + "-" + subdivision + "-" + client,
      desc: "",
      pos: "top"
    }

    trello.post("1/cards/", card, function (error, response, body) {
        if (error) throw new Error(error);
        console.log("Trello card created");
      }
    );

    return insertID;
    // return response.json(result.insertId);

  });  // end of callback function and addStart
}

// function to update a start.
export const update = (request, response) => {

  StartModel.updateStart(request.body, function(err, result) {
    if (err) return response.json(err);
    return response.json(result.updateId);
  });
}

export const remove = (request, response) => {

  // AddressModel.remove({_id: request.params.id})
  // .then(addresses => {
  //   return response.json("address deleted");
  // });

  StartModel().deleteStart(request.params.id, function (err, result) {
    if (err) return response.json(err);
    return response.json("start deleted");
    // return response.json(result.insertId);
  });
}
