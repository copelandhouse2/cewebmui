TrelloModel.post('/1/cards/', card)
.then(response => {
  console.log('trello: response', response);
  console.log('Trello card created');
  console.log('tboards', tBoards);

  // const idDesignPI = '5bb79c4462f900256a83e41b';
  // const customValue = {
  //   value: {'text': geo_pi.toString()}  // need to fix when null.  only update when value exists.
  // };
  // const tUrl = `1/cards/${response.id}/customField/${idDesignPI}/item`;
  // console.log('url for custom field', tUrl);
  // trello.put(tUrl, customValue,
  //   function(error1, response1) {
  //     console.log('trello: error1', error1);
  //     console.log('trello: resp1', response1);
  //     if (error1) throw new Error(error1);
  //     console.log('Custom value added');
  //
  //   } // 2nd callback function
  // ); // 2nd Trello call
})
.catch(err => {
  console.log('Trello Card Error: ', `${err.statusCode} - ${err.responseBody}`);
  throw new Error(err);
});

}
if (trello_list_id) {  // the the Trello List is included, user wants to insert / update the card

} else {
ProjectModel.commitProjectByID(parseInt(request.body.id))
.then(result => {

})
.catch(err => {

});
}

}

ProjectModel.commitProjectByUser(parseInt(request.params.userID))
.then(result => {
// console.log('commit: result', result);


const updateID = response.json(result);

// console.log('commitProject before loop', request.body);
// console.log(updateID);
for (let i = 0, len = request.body.length; i < len; i++) {
// Get the variables.
let { job_number, client_id, client, requestor_id, requestor, city, subdivision, address1, address2, phase, section, lot, block
  , fnd_height_fr, fnd_height_fl, fnd_height_rr, fnd_height_rl, plan_type, elevation, masonry, garage_type
  , garage_entry, garage_swing, garage_drop, garage_extension, covered_patio, bay_window, master_shower_drop
  , bath1_shower_drop, bath2_shower_drop, bath3_shower_drop, geo_lab, geo_report_num, geo_report_date
  , geo_pi, em_center, em_edge, ym_center, ym_edge, additional_options, comments, status, created_by, last_updated_by
  , sequence_id, prefix, sequence, year, city_id, subdivision_id, trello_list, trello_list_id }
  = request.body[i];

console.log('Project Controller: tBoards', tBoards)
// Make sure there is a trello list to assign to.  If id is null, don't create the card.
if (trello_list_id) {

  // ID exists Trello card Create
  let cardName = subdivision !== '' ?
    job_number + ' - ' + address1 + ' - ' + subdivision + ' - ' + city + ' - ' + client
      :
    job_number + ' - ' + address1 + ' - ' + city + ' - ' + client;

  let dueDate = new Date();
  dueDate.setDate(dueDate.getDate()+3);

  const gs = garage_swing? garage_swing === 'RIGHT'? 'R':'L' : '';
  const cp = covered_patio === 'Y'? 'CP':'';
  const bw = bay_window === 'Y'? 'BW':'';
  const ms = masonry === 'PLAN'? 'PLAN' : masonry === null? '0SM' : `${masonry}SM`
  const pi = geo_pi === null? '' : geo_pi;

  // console.log('gs, cp, bw, ms, pi', gs, cp, bw, ms, pi);
  const cardDesc = trello_list === 'CUSTOM QUEUE'? '': `**${plan_type} ${elevation}${gs}, ${ms}, ${garage_type}, ${cp}, ${bw}, PI=${pi}**`

  let card = {
    idList: trello_list_id,
    // idList: TRELLO_PARAMS.LIST_VOL,
    name: cardName,
    desc: cardDesc,
    pos: 'bottom',
    // due: dueDate,
    // idMembers: [
    //   '58b59960d7577cb345109019',
    //   '5924a3ec925ff977c3dfed10',
    //   '5a2e951406cbac46270c660a',
    //   '5a8afb044f2a4b4734e91714',
    //   '57f3d91f12d06b6f73a208ca'
    // ],
    // idLabels:[
    //   '584875b284e677fd36a93486',
    //   '5a46babfd2c5d12039d522d1',
    // ],
    // idChecklists: [
    //   '5c2e871eaf87548a254b000a',
    //   '5c2e871eaf87548a254b000f'
    // ]
  };

  TrelloModel.post('/1/cards/', card)
  .then(response => {
    console.log('trello: response', response);
    console.log('Trello card created');
    console.log('tboards', tBoards);

    // const idDesignPI = '5bb79c4462f900256a83e41b';
    // const customValue = {
    //   value: {'text': geo_pi.toString()}  // need to fix when null.  only update when value exists.
    // };
    // const tUrl = `1/cards/${response.id}/customField/${idDesignPI}/item`;
    // console.log('url for custom field', tUrl);
    // trello.put(tUrl, customValue,
    //   function(error1, response1) {
    //     console.log('trello: error1', error1);
    //     console.log('trello: resp1', response1);
    //     if (error1) throw new Error(error1);
    //     console.log('Custom value added');
    //
    //   } // 2nd callback function
    // ); // 2nd Trello call
  })
  .catch(err => {
    console.log('Trello Card Error: ', `${err.statusCode} - ${err.responseBody}`);
    throw new Error(err);
  });

  // trello.post('/1/cards/', card,
  //   function (error, response) {
  //     // console.log('trello: error', error);
  //     console.log('trello: response', response);
  //     // console.log('trello: body', body);
  //     if (error) throw new Error(error);
  //
  //     // const idDesignPI = '5bb79c4462f900256a83e41b';
  //     // const customValue = {
  //     //   value: {'text': geo_pi.toString()}  // need to fix when null.  only update when value exists.
  //     // };
  //     // const tUrl = `1/cards/${response.id}/customField/${idDesignPI}/item`;
  //     // console.log('url for custom field', tUrl);
  //     // trello.put(tUrl, customValue,
  //     //   function(error1, response1) {
  //     //     console.log('trello: error1', error1);
  //     //     console.log('trello: resp1', response1);
  //     //     if (error1) throw new Error(error1);
  //     //     console.log('Custom value added');
  //     //
  //     //   } // 2nd callback function
  //     // ); // 2nd Trello call
  //
  //     console.log('Trello card created');
  //   } // 1st callback function
  // ); // 1st Trello call

  // trello.post('1/cards/', card)
  // .then( (response) => {
  //   console.log('trello: resp', response);
  //   // return response.json();
  //   console.log('Trello card created');
  // })
  // .catch( (error) => {
  //   console.log('trello: error', error);
  //   // return error.json();
  //   throw new Error(error);
  // });
}  // end of the IF trello_list_id condition.

}  // end of the for loop.

return updateID;
// return response.json(result.insertId);
})
.catch(err => {
// console.log('commit: err', err);
if (err) return response.json(err);  // If there is an error.
});
