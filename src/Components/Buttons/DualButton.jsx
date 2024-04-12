// DualButton.jsx

// External imports
import React, {useState, useEffect, useCallback} from 'react';
import { Row, Col } from 'react-bootstrap';
import PendingTasksButton from './PendingTasksButton';

// Internal imports
import {getTasks} from '../../Utils/getEntity.js';
import { fetchEntities } from '../../Utils/fetchEntities.js';

// Styles imports
import '../../Style/Buttons/DualButton.scss';

function DualButton() {

  const [tasksTrue, setTasksTrue] = useState([]);
  const [tasksFalse, setTasksFalse] = useState([]);
  const [countTrue, setCountTrue] = useState(0);
  const [countFalse, setCountFalse] = useState(0);

  const [error, setError] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadData = useCallback(async (params, setData) => {
    await fetchEntities(
      params,
      getTasks,
      setData,
      setLoading,
      setError,
      setEmpty
    );
  }, []);

  useEffect(() => {
    loadData({ finished: true }, setTasksTrue);
    loadData({ finished: false }, setTasksFalse);
  }, [loadData]);

  useEffect(() => {
    setCountTrue(tasksTrue.length);
    setCountFalse(tasksFalse.length);
  }, [tasksTrue, tasksFalse]);

  return (
    <Row>
      <Col>
        <div className="dual-button">
          <PendingTasksButton
            usage={'pendientes'}
            count={countFalse}
            className="PendingButton-left"
          />
          <PendingTasksButton
            usage={'terminadas'}
            count={countTrue}
            className="PendingButton-right"
          />
        </div>
      </Col>
    </Row>
  );
}

export default DualButton;
