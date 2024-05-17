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

  const [error1, setError1] = useState(false);
  const [empty1, setEmpty1] = useState(false);
  const [loading1, setLoading1] = useState(false);

  const [error2, setError2] = useState(false);
  const [empty2, setEmpty2] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const loadData = useCallback(async (params, setData, setLoading, setError, 
    setEmpty) => {
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
    const params = {finished: true};
    loadData(params, setTasksTrue, setLoading1, setError1, setEmpty1);
  }, []);

  useEffect(() => {
    setCountTrue(tasksTrue.length);
  }, [tasksTrue]);

  useEffect(() => {
    const params = {finished: false};
    loadData(params, setTasksFalse, setLoading2, setError2, setEmpty2);
  }, []);

  useEffect(() => {
    setCountFalse(tasksFalse.length);
  }, [tasksFalse]);

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
