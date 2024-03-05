import React, { useEffect, useState } from 'react';

import { DropdownButton, Dropdown } from 'react-bootstrap';

const DropdownVigency = ({ onVigencyChange, setParams, category }) => {

  const [positive, setPositive] = useState('');
  const [negative, setNegative] = useState('');

  useEffect(() => {
    state(category);
  }, [category])

  const handleSelect = (eventKey) => {
    let value;
    switch (eventKey) {
      case "1":
        value = "true"; 
        break;
      case "2":
        value = "false";
        break;
      default:
        value = "all";
    }
    onVigencyChange(value, setParams);
  };

  const state = (category) => {
    if (category === 'user' || category === 'client' || 
          category === 'histories'){
      setPositive('Activo');
      setNegative('No activo');
    }

    else if (category === 'credentials'){
      setPositive('Vigente');
      setNegative('No Vigente');
    }

    else if (category === 'tasks'){
      setPositive('terminado');
      setNegative('No Terminado');
    }
  };

  return (
    <DropdownButton 
      title="Estado" 
      variant="outline-secondary" 
      id="dropdown-status" 
      className="filter-dropdown" 
      onSelect={handleSelect}
    >
      <Dropdown.Item eventKey="all">Todos</Dropdown.Item>
      <Dropdown.Item eventKey="1">{positive}</Dropdown.Item>
      <Dropdown.Item eventKey="2">{negative}</Dropdown.Item>
    </DropdownButton>
  );
};

export default DropdownVigency;
