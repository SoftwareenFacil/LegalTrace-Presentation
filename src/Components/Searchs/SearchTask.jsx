import React, { useState, useEffect } from 'react';
import { FormControl, ListGroup } from 'react-bootstrap';
import { getTasks } from '../../Utils/getEntity.js';

const SearchTask = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query.trim() === '') {
      setSearchResults([]);
      setError(null);
      return;
    }

    getTasks({ title: query })
      .then((tasks) => {
        if (tasks.length === 0) {
          setError('No se encontraron tareas.');
        } else {
          setError(null);
        }
        setSearchResults(tasks);
      })
      .catch((error) => {
        setError('Ocurrió un error al realizar la búsqueda.',error);
        setSearchResults([]);
      });
  }, [query]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
   
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
        <div className='position-absolute mt-3'>
          <ListGroup>
            {searchResults.map((result, index) => (
              <ListGroup.Item key={index} action href={`/Tareas?id=${result.id}`}>{result.title}</ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}
      {error && (
        <p className='text-danger mt-3'>{error}</p>
      )}
    </div>
  );
};

export default SearchTask;
