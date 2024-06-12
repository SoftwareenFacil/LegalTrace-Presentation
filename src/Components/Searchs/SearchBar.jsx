import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../../Style/SearchStyle.css";

function SearchBar({ getEntity, placeholderText, color, setParams,category }) {

  const [searchText, setSearchText] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();
  
    let conditionalsParams;
  
    if (category === 'tasks') {
      conditionalsParams = { id: searchText };
    } else if (category === 'payments') {
      conditionalsParams = { id: searchText };
    } else {
      conditionalsParams = { name: searchText };
    }
  
    const response = await getEntity(conditionalsParams);
  
    if (response === null) {
      setParams({ id: 0 });
    } else {
      if (category === 'tasks') {
        setParams({ id: searchText });
      } else if (category === 'payments') {
        setParams({ id: searchText });
      } else {
        setParams({ name: searchText });
      }
    }
  };
  

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <Form className="buscar-navbar" onSubmit={handleSearch}>
      <div className="input-group">
        <Button
          className="btn btn-outline-secondary border-right-0 border custom-search-button"
          style={{ color, borderColor: color }}
          onClick={handleSearch}
          type="button"
        >
          <FontAwesomeIcon icon={faSearch} />
        </Button>
        <FormControl
          type="text"
          placeholder={placeholderText}
          className="placeholder-tarea"
          style={{ color, borderColor: color }}
          value={searchText}
          onChange={handleChange}
        />
      </div>
    </Form>
  );
}

export default SearchBar;
