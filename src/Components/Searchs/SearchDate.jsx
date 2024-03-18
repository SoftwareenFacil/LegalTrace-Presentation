// SearchVigency.jsx

// External imports
import React from 'react';
import { Form } from 'react-bootstrap';

const SearchDate = ({onVigencyChange, setParams}) => {

  return (
    <Form>
      <Form.Group controlId="vigencySelector">
        <Form.Label>Estado</Form.Label>
        <Form.Control as="select" onChange={e => onVigencyChange(e.target.value, 
          setParams)}>
          <option value="all">Mes</option>
          <option value="true">Activo</option>
          <option value="false">No Activo</option>
        </Form.Control>
      </Form.Group>
    </Form>
  );
};


export default SearchDate;

