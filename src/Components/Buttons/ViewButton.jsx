// ViewButton.jsx

// External imports
import React, { useEffect, useState } from "react";
import { Route } from "../../Constants/Constant";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

// Internal imports


function ViewButton ({entity, category, CustomModal}) {

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const navigate = useNavigate(entity);

  const handleButtonClick = () => {
    if (category !== 'credentials') {
      navigate(Route.details + entity.id, { state: { entity, category } });
    } else {
      handleShow(); 
    }
  };


  return (
    <>
      <div>
        <Button
          variant="primary"
          size="sm"
          className="w-100 ver-button"
          onClick={handleButtonClick} 
        >
          <FontAwesomeIcon icon={faEye} className="icon-spacing" />{" "}
          Ver
        </Button>
      </div>
      {category === 'credentials'?
        <CustomModal data={entity} show={show} onClose={handleClose} />
        :
        null
      }
  </>
  );
};

export default ViewButton;


