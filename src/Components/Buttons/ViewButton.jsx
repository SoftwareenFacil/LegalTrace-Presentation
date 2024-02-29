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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  /*
  const navigate = useNavigate();
  const redirectToUserDetails = (user) => {
    navigate(Route.detailUser + user.id, { state: { user } });
  };
  */

  return (
    <>
    {(category !== 'credentials')?
      (
        <div> 
          <Button
            variant="primary"
            size="sm"
            className="w-100 ver-button"
          >
            <FontAwesomeIcon icon={faEye} className="icon-spacing"/>{" "}
            Ver
          </Button>
        </div>
     )
      :
      (
        <div> 
          <Button
            variant="primary"
            size="sm"
            className="w-100 ver-button"
            onClick={handleShow}
          >
            <FontAwesomeIcon icon={faEye} className="icon-spacing"/>{" "}
            Ver
          </Button>
          <CustomModal data={entity} show={show} onClose={handleClose}/> 
        </div>
      )
    }
    </>
  );
};

export default ViewButton;


