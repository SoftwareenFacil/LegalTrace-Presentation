// HistoryCard.jsx

// External imports
import React, { useEffect, useState } from "react";
import { Card, Badge, Button, Col, Row } from 'react-bootstrap';

// Internal imports
import DateIcon from "../Icons/DateIcon";
import { ReactComponent as Cross } from '../../Assets/Icons/Cross.svg';
import { ReactComponent as Check } from '../../Assets/Icons/Check.svg';
import ViewTasks from "../Modals/ViewTasks";
import { getClients } from "../../Utils/getEntity";
import { fetchAndMapById } from "../../Utils/fetchEntities";

// Styles imports
import '../../Style/HistoryCard.css';
import '../../Style/MultiButton.scss';

const HistoryCard = ({raw_data, category, CustomModal, onFormSubmit}) => {

  const [data, setData] = useState(raw_data);
  const [showEdit, setEditShow] = useState(false);
  const [showView, setViewShow] = useState(false);

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

  const handleEditClose = () => setEditShow(false);
  const handleEditShow= () => setEditShow(true);

  const handleViewClose= () => setViewShow(false);
  const handleViewShow= () => setViewShow(true);

  const badgeState = (value) => {
    const pre = 'card-badge ';
    const state = value? 'badge-active' : 'badge-inactive';
    return pre + state;
  };

  const renderIcon = (vigency, date, category) => (
    <DateIcon date={date} vigency={vigency} category={category}/>
  );

  return (
    <div className="history-card">
      <Card className="card-container">
        <div>
          <Card.Header className="card-header-custom">
            <Row> 
              <Col xs="auto" className="card-icon-col">
                {renderIcon(data.finished, new Date(data.eventDate), category)}
              </Col>    
              <Col>{data.clientName}</Col>
              <Col xs="auto">
                <Badge className={badgeState(data.vigency)}>
                    {data.vigency ? 
                      <Check style={{marginRight: '4px'}}/> 
                      :
                      <Cross style={{marginRight: '4px'}}/> 
                    }
                    {data.vigency ? 'Activo' : 'No Activo'}
                </Badge>
              </Col>
              <Card.Title className="card-title-custom">
                {data.title}
              </Card.Title>
            </Row>
          </Card.Header>
          <Card.Body className="card-body-custom">
            <Card.Text className="card-text-custom">
              <div className="description-container">
                {data.description}
              </div>
            </Card.Text>
            <div className="flex-column-container">
              <div>
                <Button className="w-100 button-custom button-view mb-2"
                  variant="primary"
                  onClick={handleViewShow}>
                  Ver
                </Button>
              </div>
              <div>
                <Button className="w-100 button-custom button-edit"
                  onClick={handleEditShow} 
                  variant="secondary">
                  editar
                </Button>
              </div>
            </div>
          </Card.Body>
          <ViewTasks  data={data}
                      show={showView}
                      onFormSubmit={onFormSubmit}
                      onClose={handleViewClose}/>
          <CustomModal  data={data}
                        op={'edit'}
                        show={showEdit}
                        onClose={handleEditClose}
                        onFormSubmit={onFormSubmit}/>
        </div>
      </Card>
  </div>
  );
};

export default HistoryCard;

