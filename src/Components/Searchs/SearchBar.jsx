import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../../Style/SearchStyle.css";

function SearchBar({ getEntity, placeholderText, color, setParams }) {

  const [searchText, setSearchText] = useState('');

  const handleSearch = async () => {
    const response = await getEntity({name: searchText});
    console.log(response);
    if (response === null)
    {
      setParams({id: 0});
    }
    else {
      setParams({id: response[0].id});
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    setSearchText(event.target.value);
  };

  return (
    <Form className="buscar-navbar">
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
