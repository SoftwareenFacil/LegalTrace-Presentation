// TasksModal.jsx

// External imports
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, ListGroup } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { parseISO } from 'date-fns';

// Internal imports
import DateIcon from "../Icons/DateIcon";
import EmptyData from '../Alerts/EmptyData.jsx';
import userTasksService from '../../Service/userTasksService';
import { validateInput } from '../../Utils/validateInput';
import {getTasks} from '../../Utils/getEntity';
import { formatDate } from "../../Utils/formatters.js";

// Styles imports
import '../../Style/DynamicModal.css';
import '../../Style/ListGroup/RepetitiveTasks.scss';

function RepetitiveModal({ show, onClose }) {

  useEffect(() => {
    const fetchEntities = async () => {
      const data = await getTasks({id: 0});
      setTasks(data);
    };
    fetchEntities();
  }, []);

  const [errors, setErrors] = useState({});
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [date, setDate] = useState('');
  const [increment, setIncrement] = useState(0);
  const [toRenew, setToRenew] = useState([]);

  const submitData = async (params) => {
    await userTasksService.editItem(params);
  };

  const navigate = useNavigate();

  const handleVermas = (entity) => { 
    navigate("/Detalles" + "/"+ 'tasks' + "/"+ entity.id, 
        { state: { id: entity.id, category: 'tasks' } });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

   const handleCheckboxChange = (task) => {
    const { id } = task;
    const isChecked = toRenew.some((t) => t.id === id);

    if (isChecked) {
      setToRenew(toRenew.filter((t) => t.id !== id));
    } else {
      setToRenew([...toRenew, task]);
    }
  };

  const amounts = {
    '7 dias' : 7,
    '2 semanas' : 14,
    '3 semanas' : 21,
    '1 mes': 30,
  }
  
  return (
    <>
      <Modal show={show} onHide={onClose} size="lg">
        <Modal.Header className="no-border" style={{ textAlign: 'center' }}>
          <Modal.Title style={{ margin: 'auto' }}>Tareas repetitivas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div style={{ width: '60%', margin: 'auto' }}>
              {tasks !== null?
              <div>
                <Form.Group className="custom-form-group">
                  <ListGroup>
                    {tasks.map((item, index) => (
                      <ListGroup.Item key={index} className="list-repetitive">
                        <div className="checkbox"> 
                          <Form.Check
                            type="checkbox"
                            checked={toRenew.some((t) => t.id === item.id)}
                            onChange={() => handleCheckboxChange(item)}
                          />
                        </div>
                        <Row className="row-repetitive"> 
                          <Col className="content">
                            <div className="icon-repetitive">
                              <DateIcon
                                className="tasks"
                                date={new Date(item.dueDate)}
                                finished={item.finished}
                                category={'tasks'}
                              />
                            </div>
                            <div className="text-container">
                              <div className="type">{item.type}{' - '}</div>
                              <div className="title">{item.title}</div>
                            </div>
                          </Col>
                          <Col xs={2} className="col-button">
                            <Button
                              variant="primary"
                              className="button-ver-mas"
                              onClick={() => handleVermas(item)}
                              size="sm"
                            >
                              Ver más
                            </Button>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Form.Group>
                <div> 
                  <Button variant="primary" type="submit">
                    <div>Renovar</div>
                  </Button>
                </div>
              </div>
              :
                <EmptyData empty={true}/>
              }
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RepetitiveModal;

