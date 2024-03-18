// Users.jsx

// External imports
import React, { useEffect, useState, useCallback } from "react";
import { Row, Container, Col } from "react-bootstrap";

// Internal imports
import CrearButton from '../../Buttons/CrearButton';
import DynamicModal from '../../Modals/DynamicModal';
import DynamicTable from '../../Tables/DynamicTable';
import LoadingIndicator from "../../Loading/LoadingIndicator";
import EmptyData from '../../Alerts/EmptyData';
import MultiDropdown from '../../Dropdowns/MultiDropdown';
import { filterByVigency } from '../../../Utils/filters';
import { getUsers } from '../../../Utils/getEntity';
import { fetchEntities, fetchByVigency } from '../../../Utils/fetchEntities';
import { delay } from '../../../Utils/delay';

// Styles imports
import "../../../Style/TableStyle.css";

export function Users() {

  // Users to display
  const [users, setUsers] = useState([]);
  const [date, setDate] = useState(null);
  
  // Mangin data filtering
  const [params, setParams] = useState({id: 0});

  // Managing data retrieval
  const [empty, setEmpty] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filtering, setFiltering] = useState(false);

  const loadUsers = useCallback(async () => {
    await fetchEntities(
      params,
      getUsers,
      setUsers,
      setLoading,
      setError,
      setEmpty
    );
  }, [params]);

  useEffect(() => {
    loadUsers();
  }, [params, loadUsers]); 

  const handleRefresh = () => {
    loadUsers();
  };

  const userAttributes = [
    { key: 'name', label: 'Cliente' },
    { key: 'created', label: 'F. Creacion' },
    { key: 'vigency', label: 'Estado' },
    { key: 'contacto', label: 'Contacto' },
  ];

  const category = 'user';

  /*
        <div className="row mt-3 d-flex align-items-start">
          <CrearButton onFormSubmit={handleRefresh} category={category}
            CustomModal={DynamicModal}/>
        </div>
        */
  return (
    <Container fluid >
        <Row className="my-3 justify-content-end">
          <CrearButton onFormSubmit={handleRefresh} category={category}
            CustomModal={DynamicModal}/>
        </Row>
        <Row className="my-3 justify-content-end" style={{paddingTop: '40px'}}>
          <Col xs="auto" className="px-1">
            <MultiDropdown
              onVigencyChange={filterByVigency}
              setParams={setParams}
              category={category}
            />
          </Col>
        </Row>
        <Row>
        {loading ? (
            <LoadingIndicator isLoading={loading}/>
          ) : empty ? (
              EmptyData(empty)
          ) : (
              <DynamicTable 
                  data={users}
                  attributes={userAttributes}
                  category={category}
                  onFormSubmit={handleRefresh}
                  CustomModal={DynamicModal}
                  />
          )}
        </Row>
    </Container>
  );
};

