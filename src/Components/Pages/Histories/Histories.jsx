// Histories.jsx

// External imports
import React, { useEffect, useState, useCallback } from "react";
import { Row, Col } from 'react-bootstrap';

// Internal imports
import CrearButton from '../../Buttons/CrearButton';
import HistoriesModal from '../../Modals/HistoriesModal';
import DynamicTable from '../../Tables/DynamicTable';
import LoadingIndicator from "../../Loading//LoadingIndicator";
import EmptyData from '../../Alerts/EmptyData';
import HistoryCard from '../../Cards/HistoryCard';
import { getHistories } from '../../../Utils/getEntity';
import { delay } from '../../../Utils/delay';
import { fetchEntities } from '../../../Utils/fetchEntities';

// Styles imports
//import "../../../Style/TableStyle.css";

export function Histories() {

  const [histories, setHistories] = useState([]);

  
  // Managing data retrieval
  const [empty, setEmpty] = useState(true);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadHistories = useCallback(async () => {
    await fetchEntities(
      {id: 0},
      getHistories,
      setHistories,
      setLoading,
      setError,
      setEmpty
    );
  }, []);

  useEffect(() => {
    loadHistories();
  }, [loadHistories]); 


  const handleRefresh = () => {
    loadHistories();
  };

  const category = 'histories';

  return (
    <div className="App">
      <div className="App">
        <div className="container-fluid">
          <div className="row d-flex align-items-start">
            <CrearButton onFormSubmit={handleRefresh} category={category}
              CustomModal={HistoriesModal}/>
          </div>
        </div>
        {loading ? (
            <LoadingIndicator isLoading={loading}/>
          ) : empty? (
              <EmptyData empty={empty}/>
          ) : (
             <Row className="d-flex align-items-center justify-content-center">
              {histories.map((item, index) => (
              <Col className="d-flex align-items-center justify-content-center">
                  <HistoryCard 
                      raw_data={item} 
                      category={category} 
                      CustomModal={HistoriesModal}
                      onFormSubmit={handleRefresh}
                  />
                </Col>
              ))}
            </Row>
          )}
      </div>
    </div>
  );
};
