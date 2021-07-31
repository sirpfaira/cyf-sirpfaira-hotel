import React, { useEffect, useState } from 'react';
import Search from './Search.js';
import SearchResults from './SearchResults.js';
//import FakeBookings from './data/fakeBookings.json';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const SearchFunction = (searchVal) => {
    console.info('TO DO!', searchVal);
    setSearchWord(searchVal);
  };

  useEffect(() => {
    fetch(`https://sirpfaira-hotel-server.glitch.me/bookings`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        filterData(data);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
        console.log(error);
      });
  });

  const filterData = (data) => {
    if (searchWord) {
      let matchingNames = data.filter(
        (entry) =>
          entry.firstName.toUpperCase().includes(searchWord.toUpperCase()) ||
          entry.surname.toUpperCase().includes(searchWord.toUpperCase())
      );
      setBookings(matchingNames);
    } else {
      setBookings(data);
    }
  };

  return (
    <div className='App-content'>
      <div className='container'>
        <Search search={SearchFunction} />
        {loading ? (
          <p>Loading data, please wait.....</p>
        ) : error ? (
          <p>Error! Data could not be loaded!</p>
        ) : (
          <SearchResults results={bookings} />
        )}
      </div>
    </div>
  );
};

export default Bookings;
