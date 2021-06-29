import React, { useEffect, useState } from 'react';
import userImage from './data/user.png';

const CustomerProfile = ({ customerID }) => {
  const [customer, setCustomer] = useState([]);
  useEffect(() => {
    fetch(`https://cyf-react.glitch.me/customers/${customerID}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCustomer(data);
      });
  }, [customerID]);

  if (customerID) {
    return (
      <div className='customer-profile'>
        <h5>Customer {customerID} profile</h5>
        <img src={userImage} alt='User default' className='user-image' />
        <p>E-mail: {customer.email}</p>
        <p>VIP: {customer.vip ? 'Yes' : 'No'}</p>
        <p>Cell: {customer.phoneNumber}</p>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default CustomerProfile;
