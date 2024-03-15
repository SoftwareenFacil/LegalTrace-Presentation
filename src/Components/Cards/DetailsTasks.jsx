
// External imports
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Badge, Form } from 'react-bootstrap';

// Internal imports

// Icons
import DateIcon from "../Icons/DateIcon";

// Buttons
import DisableButton from "../Buttons/DisableButton";
import FinishButton from "../Buttons/FinishButton";
import EditButton from '../Buttons/EditButton';

import { getClients, getUsers } from '../../Utils/getEntity.js';
import { formatDate } from "../../Utils/formatters.js";
import { fetchAndMapById } from "../../Utils/fetchEntities"; 

// Assets and Styles imports
import "../../Style/MultiButton.scss";
import "../../Style/DateIcon.css";
import "../../Style/DetailsTasks.css";

/*
  "id": 4,
  "clientId": 5,
  "userId": 1,
  "title": "nueva tarea",
  "description": "esta es una nueva tarea",
  "type": "Water",
  "finished": false,
  "vigency": true,
*/

const DetailsTasks = ({entity, category, onSubmit, CustomModal}) => {

  const [client, setClient] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    console.log('test');
    const fetchNames = async () => {
      if (entity !== undefined ){ 
        const data_client = await getClients({id: entity.clientId});
        setClient(data_client[0]);
        const data_user = await getUsers({id: entity.userId});
        setUser(data_user[0]);
      }
    };
    fetchNames();
  }, [])


  const date = new Date(entity.dueDate);

  const clientName = 'test';
  const clientLocation = 'test';
  const contractId = 'test';
  const assignedTo = 'user';

  const isFinished = (finished) => {
    return (finished)? 'Terminado' : 'No Terminado';
  };
  return (
      <div className="entity-detail-card">
        <div> 
          <Container style={{paddingLeft: 0}}>
            <Row className="align-items-center">
              <Col xs={12} sm={3} className="mb-2 mb-sm-0" 
                style={{marginRight: '10px', width: '64px'}}>
                <DateIcon date={date}
                          vigency={entity.vigency}
                          category={category}
                />
              </Col>

              <Col xs={12} sm={9}>
                <Row>
                  <Col xs={12}>
                    <Badge variant="danger">
                      {isFinished(entity.finished)}
                    </Badge>
                    <div className="contract-header">
                      <span className="contract-type">{entity.type} - </span>
                      <span className="contract-title">{entity.title}</span>
                    </div>
                    <p>
                      Designado a <span className="user-name">{user.name}</span>
                    </p>
                  </Col>
                </Row>
              </Col>
                <Row>
                  <Col xs={12} className="client-name">
                    <h5>Cliente</h5>
                    <h4>{client.name}</h4>
                  </Col>
                  <Col xs={12} className="client-address">
                    <p>{client.address}</p>
                  </Col>
                </Row>
            </Row>
          </Container>
        </div>
        <h6>Descripción:</h6>
        <div 
          className="text-box"
          contentEditable="false"
        >
          {entity.description}
        </div>
        <div className="entity-info" >
          <div className="entity-detail-date">
            <DisableButton  entity={entity}
                            onSubmit={onSubmit}
                            category={category}
                            usage={'details'}
            />
          </div>


        </div>
        <div className="entity-actions" style={{height: '50px'}}>
          <EditButton data={entity}
                      onFormSubmit={onSubmit}
                      category={category}
                      CustomModal={CustomModal}
                      usage={'details'}
          />

          <FinishButton entity={entity}
                        onFormSubmit={onSubmit}
          />
        </div>
      </div>
  );
};

export default DetailsTasks;
