import React, { useState } from 'react';
import moment from 'moment';
import CustomerProfile from './CustomerProfile';

function SearchResults({ results }) {
  const [customerID, setCustomerID] = useState('');

  function handleId(id) {
    setCustomerID(id);
    console.log(`The customer id is: ${id}`);
  }

  return (
    <div className='sr-main-div'>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Title</th>
            <th scope='col'>First Name</th>
            <th scope='col'>Surname</th>
            <th scope='col'>Email</th>
            <th scope='col'>Room ID</th>
            <th scope='col'>Check In Date</th>
            <th scope='col'>Check Out Date</th>
            <th scope='col'>Nights booked</th>
            <th scope='col'>Profile</th>
          </tr>
        </thead>
        <tbody>
          {results.map((customer, index) => (
            <TableRow
              key={index}
              index={index}
              customer={customer}
              handleId={handleId}
            />
          ))}
        </tbody>
      </table>
      <CustomerProfile customerID={customerID} />
    </div>
  );
}

const TableRow = ({ index, customer, handleId }) => {
  const [highlight, setHighlight] = useState(false);
  function changeColor() {
    setHighlight(!highlight);
  }
  const checkOut = moment(customer.checkOutDate);
  const checkIn = moment(customer.checkInDate);
  const difference = checkOut.diff(checkIn, 'days');

  const handleShowCustomer = () => {
    handleId(customer.id);
    console.log(customer.id);
  };
  return (
    <tr
      className={highlight ? 'highlight' : 'no-highlight'}
      onClick={changeColor}
    >
      <th scope='col'>{customer.id}</th>
      <td>{customer.title}</td>
      <td>{customer.firstName}</td>
      <td>{customer.surname}</td>
      <td>{customer.email}</td>
      <td>{customer.roomId}</td>
      <td>{customer.checkInDate}</td>
      <td>{customer.checkOutDate}</td>
      <td>{difference}</td>
      <td>
        <button onClick={handleShowCustomer}>Show Profile</button>
      </td>
    </tr>
  );
};

export default SearchResults;
