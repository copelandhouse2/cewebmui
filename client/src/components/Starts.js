import React from "react";
import { Link } from "react-router-dom"
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";


function Starts(props) {

  /* An address
  jobNumber
  address1
  address2
  city
  subdivision
  PI
  client
  */


  const StartsList = props.addresses.map((addr, id) => {

    var myCss;
    id%2 === 0 ? myCss = "dark-striped" : myCss = "darker-striped";

    return (
  
      <tr key={id} className={myCss}>
        <td>{addr.job_number}</td>
        <td>{addr.client_id}</td>
        <td>{addr.address1}</td>
        <td>{addr.address2}</td>
        <td>{addr.city}</td>
        <td>{addr.subdivision}</td>
        <td>{addr.address2}</td>
        <td>
          <div className="black button-section">
            <button className=""
              onClick={(e) => {
              e.preventDefault();
              if (props.deleteAddress) {
                props.deleteAddress(addr.id);
              }}}
            > Delete </button>
          </div>
        </td>
      </tr>
    )
  });

  return (
    <div>
      <h2 className="green">Starts List</h2>
      <Table bordered hover>
        <thead className="darker-striped">
        <tr>
          <th scope="col">Job Number</th>
          <th scope="col">Client</th> 
          <th scope="col">Address 1</th>
          <th scope="col">Address 2</th>
          <th scope="col">City</th>
          <th scope="col">Subdivision</th>
          <th scope="col">PI</th>
          <th scope="col">Delete?</th>
        </tr>
        </thead>
        <tbody>
        {StartsList}
        </tbody>
      </Table>

    </div>
  );
}
export default Starts;

Starts.propTypes = {
  addresses: PropTypes.array.isRequired
}


// <button className="col-md-offset-1 col-md-3">Edit</button>

/* <div key={id}>
<address className="card text-center" key={id}>
  <div className="row no-margin-left">
    <strong className="col-md-9 text-uppercase">{addr.address1}</strong>
    <strong className="col-md-3"><Link to={`/addresses/${addr._id}`}> details </Link></strong><br></br>
  </div>
  {addr.jobNumber}<br></br>
  {addr.client}<br></br>
<div className="row button-section">
    <button className=""
      onClick={(e) => {
      e.preventDefault();
      if (props.deleteAddress) {
        props.deleteAddress(addr._id);
      }}}
    > Delete </button>
  </div>
</address>
</div> */
