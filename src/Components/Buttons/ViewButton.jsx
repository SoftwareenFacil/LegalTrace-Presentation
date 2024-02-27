// ViewButton.jsx

// External imports
import React, { useState } from "react";
import { Route } from "../../Constants/Constant";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

// Internal imports

function ViewButton () {

  /*
  const navigate = useNavigate();
  const redirectToUserDetails = (user) => {
    navigate(Route.detailUser + user.id, { state: { user } });
  };
  */

  return (
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
  );
};

export default ViewButton;


