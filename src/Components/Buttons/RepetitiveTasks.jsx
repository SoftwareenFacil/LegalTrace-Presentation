
import React, { useState } from 'react';
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

// Internal imports
import RepetitiveModal from '../Modals/RepetitiveModal.jsx';

function RepetitiveTasks() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button 
        variant="outline-secondary"
        onClick={handleShow}
        className="repeat-task-button">
        <FontAwesomeIcon icon={faCalendarAlt} />
        {' '}Tareas Repetitivas
      </Button>

      <RepetitiveModal show={show} onClose={handleClose}/> 
    </div>
  );
}

export default RepetitiveTasks;
