// External imports
import React, { useState } from 'react';
import { FormControl, Button, ListGroup } from 'react-bootstrap';

// Internal imports
import {getTasks} from '../../Utils/getEntity.js';

const SearchTask = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    performSearch(inputValue);
  };

  // Function to perform the search
  const performSearch = (query) => {
    setSearchResults(getTasks({title: query}));
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); 
    performSearch(query); 
  };

  // Function to close search results
  const handleCloseResults = () => {
    setSearchResults([]);
    setQuery('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
        />
      </form>
      {searchResults.length > 0 && (
        <div>
          <Button variant="danger" onClick={handleCloseResults}>Close</Button>
          <ListGroup>
            {searchResults.map((result, index) => (
              <ListGroup.Item key={index}>{result}</ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}
    </div>
  );
};

export default SearchTask;

