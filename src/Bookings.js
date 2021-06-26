import React, { useEffect, useState } from 'react';
import Search from './Search.js';
import SearchResults from './SearchResults.js';
//import FakeBookings from './data/fakeBookings.json';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [searchWord, setSearchWord] = useState('');

  const SearchFunction = (searchVal) => {
    console.info('TO DO!', searchVal);
    setSearchWord(searchVal);
  };

  useEffect(() => {
    fetch(`https://cyf-react.glitch.me`)
      .then((res) => res.json())
      .then((data) => {
        filterData(data);
      })
      .catch((error) => console.error(error));
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
        <SearchResults results={bookings} />
      </div>
    </div>
  );
};

export default Bookings;
