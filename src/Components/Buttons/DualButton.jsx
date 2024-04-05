import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PendingTasksButton from './PendingTasksButton';

// Styles imports
import '../../Style/Buttons/DualButton.scss';

function DualButton() {
  return (
    <Row>
      <Col>
        <div className="dual-button">
          <PendingTasksButton
            usage={'pendientes'}
            count={50}
            className="PendingButton-left"
          />
          <PendingTasksButton
            usage={'terminadas'}
            count={250}
            className="PendingButton-right"
          />
        </div>
      </Col>
    </Row>
  );
}

export default DualButton;
