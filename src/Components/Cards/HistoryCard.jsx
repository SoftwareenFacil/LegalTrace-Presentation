// HistoryCard.jsx

// External imports
import React, { useEffect, useState } from "react";
import { Card, Button, Col, Row } from 'react-bootstrap';

// Internal imports
import DateIcon from "../Icons/DateIcon";
import ViewHistories from "../Modals/ViewHistories";
import BadgeVigency from "../Badges/BadgeVigency";
import { getClients } from "../../Utils/getEntity";
import { fetchAndMapById } from "../../Utils/fetchEntities";

// Styles imports
import '../../Style/HistoryCard.scss';
import '../../Style/Icons/DateIcon.scss';

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


  const renderIcon = (vigency, date, category) => (
    <DateIcon className={data.vigency?` date-icon tasks active`:`date-icon tasks inactive`} date={date} finished={vigency} category={category}/>
  );

  return (
    <div className="history-card">
      <Card className="card-container">
        <div>
          <Card.Header className="card-header-custom">
            <Row> 
              <Col xs="auto" className="card-icon-col">
                {renderIcon(data.vigency, new Date(data.eventDate), category)}
              </Col>    
              <Col className="card-client-name">{data.clientName}</Col>
              <Col className="col-centering" style={{padding: 0}}>
                <BadgeVigency className="badge-histories"
                  entity={data} category={category}/>
              </Col>
              <Card.Title className="card-title-custom">
                {data.title}
              </Card.Title>
            </Row>
          </Card.Header>
          <Card.Body className="card-body-custom">
            <Card.Text className="card-text-custom">
              <span className="description-container">
                {data.description}
              </span>
            </Card.Text>
            <div className="flex-column-container">
              <div>
                <Button className="w-100 button-custom button-view" 
                  style={{marginBottom: '5px'}}
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
          <ViewHistories data={data}
                      show={showView}
                      onFormSubmit={onFormSubmit}
                      onClose={handleViewClose}
                      CustomModal={CustomModal}
                      refresh={onFormSubmit}/>
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

