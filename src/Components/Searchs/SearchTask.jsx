// External imports
import React, { useState } from 'react';
import { FormControl, Button, ListGroup } from 'react-bootstrap';

// Internal imports
import {getTasks} from '../../Utils/getEntity.js';

const SearchTask = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    performSearch(inputValue);
  };

  // Function to perform the search
  const performSearch = (query) => {
    getTasks({id: query})
      .then(tasks => {
        if (tasks.length === 0) {
          setError('No se encontraron tareas.');
        } else {
          setError(null); 
        }
        setSearchResults(tasks);
      })
      .catch(
        setError('Ocurrió un error al realizar la búsqueda.',error) 
      );
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
              <ListGroup.Item key={index} action href={`/Tareas?id=${result.id}`}>{result.title}</ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}
    </div>
  );
};

export default SearchTask;

