import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../../Style/SearchStyle.css";
import { getClients, getPayments } from "../../Utils/getEntity";


const typeMap = {
  "Pesos": 0,
  "UF": 1,
  "UTM": 2,
  "USD": 3
};

function SearchBar({ getEntity, placeholderText, color, setParams, category }) {
  const [searchText, setSearchText] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();
    if (searchText.trim() === '') {
      setParams({ id: 0, clientId: 0 });
      return;
    }

    let conditionalsParams = {};

    switch (category) {
      case 'tasks':
        conditionalsParams = { title: searchText };
        break;
        case 'credentials':
          conditionalsParams = { title: searchText };
          break;
      case 'payments':
        conditionalsParams = { name: searchText };
        break;
      default:
        conditionalsParams = { name: searchText };
        break;
    }

    let response;
    if (category === 'payments') {
      try {
        const clientResponse = await getClients({ name: searchText });
        if (clientResponse && clientResponse.length > 0) {
          const clientId = clientResponse[0].id;
          response = await getPayments({ clientId });
          setParams({ clientId });
        } else {
          
          const typeValue = typeMap[searchText];
          if (typeValue !== undefined) {
            const paymentResponse = await getPayments({ type: typeValue });
            if (paymentResponse && paymentResponse.length > 0) {
              response = paymentResponse;
              setParams({ type: typeValue });
            } else {
              setParams({ clientId: 0 });
              response = null;
            }
          } else {
            setParams({ clientId: 0 });
            response = null;
          }
        }
      } catch (error) {
        console.error("Search error:", error);
        setParams({ clientId: 0 });
      }
    } else {
      try {
        response = await getEntity(conditionalsParams);
        setParams(conditionalsParams);
      } catch (error) {
        console.error("Search error:", error);
        setParams({ id: 0 });
      }
    }

    if (response === null || response.length === 0) {
      setParams({ id: 0 });
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
          type="submit"
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
