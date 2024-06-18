
// External imports
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Badge, Form } from 'react-bootstrap';

// Internal imports

// Icons
import DateIcon from "../Icons/DateIcon";

// Buttons
import DisableDetailsButton from "../Buttons/DisableDetailsButton";
import FinishButton from "../Buttons/FinishButton";
import EditButton from '../Buttons/EditButton';

// Badges
import BadgeVigency from "../Badges/BadgeVigency";

// Functions
import { getClients, getUsers } from '../../Utils/getEntity.js';
import { formatDate } from "../../Utils/formatters.js";
import { fetchAndMapById } from "../../Utils/fetchEntities"; 

// Assets and Styles imports
import "../../Style/Cards/DetailsCard.scss";

const DetailsTasks = ({entity, category, onSubmit, CustomModal}) => {

  const [client, setClient] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    const fetchNames = async () => {
      if (entity !== undefined ){ 
        const data_client = await getClients({id: entity.clientId});
        setClient(data_client[0]);
        const data_user = await getUsers({id: entity.userId});
        setUser(data_user[0]);
      }
    };
    fetchNames();
  }, [entity])


  const date = new Date(entity.dueDate);

  return (
      <div className="details-card">
        <div className="entity-content">
          <Container className="details-task-info"> 
            <Row className='main-info'> 
              <Col xs={12} sm={3} className="mb-2 mb-sm-0 date-task-area " >
                <DateIcon date={date}
                          finished={entity.finished}
                          category={category}
                          className="tasks date-icon-card"
                />
              </Col>
              <Col xs={12} sm={9} > 
                <BadgeVigency className="badge-custom" 
                  entity={entity} category={'tasks'}/>
                <div className="contract-header">
                  <span className="contract-type">{entity.type} </span>
                  <span className="contract-title">- {entity.title}</span>
                </div>
                <p style={{fontSize: '17px'}}>
                  Designado a <span className="user-name">{user.name}</span>
                </p>
              </Col>
            </Row>
            <Row className='client-info'>
              <Col xs={12} className="client-name">
                <h5>Cliente</h5>
                <h4>{client.name}</h4>
              </Col>
              <Col xs={12} className="client-address">
                <p>{client.address}</p>
              </Col>
            </Row>
          </Container>
          <div className="entity-detail-date">
            <DisableDetailsButton
              entity={entity}
              onSubmit={onSubmit}
              category={category}
              usage={'details'}
              className="btn-details"
            />
          </div>
        </div>
        <h6 className="text">Descripción:</h6>
        <div className="text text-box">
          {entity.description}
        </div>
        <div className="entity-actions" style={{ gap:'562px'}}> 
          <EditButton data={entity}
                      onFormSubmit={onSubmit}
                      category={category}
                      CustomModal={CustomModal}
                      usage={'details'}
                      className="btn-details edit-color"
          />

          <FinishButton entity={entity}
                        onFormSubmit={onSubmit}
                        className="btn-details"
          />
        </div>
      </div>
  );
};

export default DetailsTasks;
