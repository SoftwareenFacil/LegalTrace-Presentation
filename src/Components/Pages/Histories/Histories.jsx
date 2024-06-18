// Histories.jsx

// External imports
import React, { useEffect, useState, useCallback } from "react";
import { Row, Col, Button, FormControl, Form } from 'react-bootstrap';

// Internal imports
import CrearButton from '../../Buttons/CrearButton';
import HistoriesModal from '../../Modals/HistoriesModal';
import LoadingIndicator from "../../Loading/LoadingIndicator";
import EmptyData from '../../Alerts/EmptyData';
import HistoryCard from '../../Cards/HistoryCard';
import { getHistories, getClients } from '../../../Utils/getEntity';
import { fetchEntities } from '../../../Utils/fetchEntities';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


// Styles imports
//import "../../../Style/TableStyle.css";

export function Histories() {
  const [histories, setHistories] = useState([]);
  const [search, setSearch] = useState('');

  // Managing data retrieval
  const [empty, setEmpty] = useState(true);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadHistories = useCallback(async () => {
    setLoading(true);
    setError(false);
    setEmpty(false);
    try {
      const data = await getHistories({ id: 0 });
      if (data.length === 0) {
        setEmpty(true);
      }
      // Fetch client names for each history
      const updatedHistories = await Promise.all(data.map(async (history) => {
        const client = await getClients({ id: history.clientId });
        if (client.length > 0) {
          return { ...history, clientName: client[0].name };
        }
        return history;
      }));
      setHistories(updatedHistories);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHistories();
  }, [loadHistories]);

  const handleRefresh = () => {
    loadHistories();
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  let results = [];
  if (!search) {
    results = histories;
  } else {
    results = histories.filter(dato =>
      dato.clientName.toLowerCase().includes(search.toLowerCase())
    );
  }

  const category = 'histories';

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row d-flex align-items-start">
          <CrearButton onFormSubmit={handleRefresh} category={category} CustomModal={HistoriesModal} />
        </div>
        <div className="my-5 w-50">

        <Form >
          <div className=" input-group">
            
        <Button
          className="btn btn-outline-secondary border-right-0 border custom-search-button"
          onClick={handleSearch}
          type="button"
        >
          <FontAwesomeIcon icon={faSearch} />
        </Button>
          <FormControl className="placeholder-tarea "
            type="text"
            placeholder="Buscar por nombre de cliente"
            value={search}
            onChange={handleSearch}
          />
          </div>
        </Form>
        </div>
      </div>
      {loading ? (
        <LoadingIndicator isLoading={loading} />
      ) : error ? (
        <div>Error loading data. Please try again.</div>
      ) : empty ? (
        <EmptyData empty={empty} />
      ) : (
        <Row className="d-flex align-items-center justify-content-center">
          {results.map((item, index) => (
            <Col key={index} className="d-flex align-items-center justify-content-center">
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
  );
};
