// HistoryCard.jsx

// External imports
import React, { useEffect, useState } from "react";
import { Card, Badge, Button, Col, Row } from 'react-bootstrap';

// Internal imports
import DateIcon from "../Icons/DateIcon";
import { getClients } from "../../Utils/getEntity";
import { fetchAndMapById } from "../../Utils/fetchEntities";

// Styles imports

const HistoryCard = ({data, category}) => {

  const [improvedData, setData] = useState(data);

  useEffect(() => {
    if (data.length > 0) {
      fetchClients(data);
    }
  }, [data]);

  const fetchClients = async (data) => {
    const uniqueClientIds = [...new Set(data.map(item => item.clientId))];
    const clientsMap = await fetchAndMapById(uniqueClientIds, 
                              getClients);
    const updatedData = data.map(item => ({
      ...item,
      clientName: clientsMap[item.clientId],
      clientId: undefined,
    }));

    setData(updatedData);
  };

  const renderIcon = (vigency, date, category) => (
    <td className="centeredDiv" style={{height: '10px', paddingTop:'0px', 
                                  paddingLeft: '0px'}}>
      <div style={{lineHeight: '1em', width: '4em', margin: '0 auto'}}>
        <DateIcon date={date} vigency={vigency} category={category}/>
      </div>
    </td>
  );

  return (
    <Card className="m-3" style={{ width: '18rem' }}>
      {improvedData.map((item, index) => (
        <div>
          <Card.Body style={{paddingLeft: '10px', paddingRight: '10px', 
              paddingBottom: '13px'}}>
             <Row > 
              <Col xs="auto">
                {renderIcon(item['finished'], new Date(item['eventDate']), 
                            category)}
              </Col>    
              <Col>{item.clientName}</Col>
              <Col xs="auto">
                <Badge variant="success">Activo</Badge>
              </Col>
              <Card.Title>{item.title}</Card.Title>
            </Row>
            <Card.Text>
              <div style={{
                backgroundColor: '#F2F5FC', 
                padding: '10px',
                margin: '10px 0',
                borderRadius: '10px'
              }}>
                {item['description']}
              </div>
            </Card.Text>
            <div style={{ display: 'flex', flexDirection: 'column'}}>
              <div style={{marginBottom: '5px'}}>

                <Button style={{ display: 'flex', alignItems: 'center', 
                                 justifyContent: 'center', height: '36px' }}
                className="w-100" variant="primary">Ver</Button>
              </div>
              <div>
                <Button style={{ display: 'flex', alignItems: 'center', 
                                 justifyContent: 'center', height: '22px' }}
                  className="w-100" variant="secondary">editar</Button>
              </div>
            </div>
          </Card.Body>
        </div>
      ))}
    </Card>
  );
};

export default HistoryCard;

