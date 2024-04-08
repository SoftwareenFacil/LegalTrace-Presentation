// EditButton.jsx

// External imports
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import MessageModal from '../Modals/MessageModal.jsx';
// Styles imports

function MessageButton ({data, className}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div> 
      <Button
        variant="outline-primary"
        size="sm"
        className={`${className}`}
        onClick={handleShow}
      >
        Contactar cliente
      </Button>
      <MessageModal data={data} category={'message'} show={show} 
        onClose={handleClose} />
    </div>
  );
};

export default MessageButton;


