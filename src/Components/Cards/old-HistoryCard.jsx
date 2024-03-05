// HistoryCard.jsx

// External imports
import React, { useEffect, useState } from "react";
import { Card, Badge, Button, Col, Row } from 'react-bootstrap';

// Internal imports
import DateIcon from "../Icons/DateIcon";
import { getClients } from "../../Utils/getEntity";
import { fetchAndMapById } from "../../Utils/fetchEntities";

// Styles imports

const HistoryCard = ({raw_data, category, CustomModal, onFormSubmit}) => {

  const [data, setData] = useState(raw_data);
  const [show, setShow] = useState(false);


  useEffect(() => {
    if (raw_data) {
      fetchClient(raw_data.clientId);
      console.log(data);
    }
  }, [raw_data]); 


  const fetchClient = async (clientId) => {
    const data_client = await getClients({id: clientId});
    const client = data_client[0];
    const updatedData = {
      ...raw_data,
      clientName: client.name, 
    };

    setData(updatedData);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const renderIcon = (vigency, date, category) => (
    <DateIcon date={date} vigency={vigency} category={category}/>
  );

  return (
    <Card className="m-3" style={{height: '320px', width: '320px' }}>
      <div>
        <Card.Header style={{ backgroundColor: '#fff', 
                              paddingBottom: '0px',
                              borderBottom: 'none'}}>
           <Row> 
            <Col xs="auto" style={{marginBottom: '10px'}}>
              {renderIcon(data.finished, new Date(data.eventDate), 
                          category)}
            </Col>    
            <Col>{data.clientName}</Col>
            <Col xs="auto">
              <Badge variant="success">
                {data.vigency? 'Activo': 'No Activo'}
              </Badge>
            </Col>
            <Card.Title style={{marginBottom: '0px'}}>
              {data.title}
            </Card.Title>
          </Row>
        </Card.Header>
        <Card.Body style={{ paddingLeft: '10px',
                            paddingRight: '10px', 
                            paddingTop: '0px', 
                            paddingBottom: '13px'}}>
          <Card.Text style={{marginBottom: '0px', marginTop: '2px'}}>
            <div style={{
              backgroundColor: '#F2F5FC', 
              height: '125px',
              padding: '10px',
              padding: '10px',
              marginTop: '5px',
              margin: '10px 0px',
              borderRadius: '10px'
            }}>
              {data.description}
            </div>
          </Card.Text>
          <div style={{ display: 'flex', flexDirection: 'column'}}>
            <div style={{marginBottom: '5px'}}>

              <Button style={{ display: 'flex', alignItems: 'center', 
                               justifyContent: 'center', height: '36px' }}
              className="w-100" variant="primary">Ver</Button>
            </div>
            <div>
              <Button style={{  display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                marginBottom: '13px',
                                height: '22px' }}
                className="w-100" onClick={handleShow}
                variant="secondary">editar</Button>
            </div>
          </div>
          </Card.Body>
        <CustomModal data={data} op={'edit'}  show={show} 
          onClose={handleClose} onFormSubmit={onFormSubmit}/>
        </div>
    </Card>
  );
};

export default HistoryCard;

