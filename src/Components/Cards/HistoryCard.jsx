// HistoryCard.jsx

// External imports
import React, { useEffect, useState } from "react";
import { Card, Button, Badge } from 'react-bootstrap';

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
    <td className="centeredDiv" style={{height: '10px'}}>
      <div style={{lineHeight: '1em', width: '4em', margin: '0 auto'}}>
        <DateIcon date={date} vigency={vigency} category={category}/>
      </div>
    </td>
  );

  return (
    <Card className="m-3" style={{ width: '18rem' }}>
      {data.map((item, index) => (
        <div>
          <Card.Body>
            <Badge variant="success">Activo</Badge>
            {renderIcon(item['finished'], new Date(item['eventDate']), 
                        category)}
            <Card.Title>{item.title}</Card.Title>
            <div>{item.clientName}</div>
            <Card.Text>
              {item['description']}
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

