// ViewButton.jsx

// External imports
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ReactComponent as Eye } from '../../Assets/Icons/Eye.svg';

// Internal imports
import { Route } from "../../Constants/Constant";

// Styles imports
import '../../Style/Icons.scss';

function ViewButton ({entity, category, CustomModal}) {

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (category !== 'credentials') {
      navigate("/Detalles" + "/"+ category + "/"+ entity.id, 
        { state: { id: entity.id, category: category } });
    } else {
      handleShow(); 
    }
  };


  return (
    <>
      <Button
        variant="primary"
        size="sm"
        className="w-100 ver-button"
        onClick={handleButtonClick} 
      >
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
     }}>
          <>
            <Eye className="icon-button"/> 
            <div>Ver</div>
          </>
      </div>
      </Button>
      {category === 'credentials'?
        <CustomModal data={entity} show={show} onClose={handleClose} />
        :
        null
      }
  </>
  );
};

export default ViewButton;


