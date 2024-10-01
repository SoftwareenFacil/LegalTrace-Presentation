// Histories.jsx
// External imports
import React, { useEffect, useState, useCallback } from "react";
import { Row, Col, Button, FormControl, Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { parseISO, isWithinInterval, startOfDay, endOfDay } from 'date-fns';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// Internal imports
import CrearButton from '../../Buttons/CrearButton';
import HistoriesModal from '../../Modals/HistoriesModal';
import LoadingIndicator from "../../Loading/LoadingIndicator";
import EmptyData from '../../Alerts/EmptyData';
import HistoryCard from '../../Cards/HistoryCard';
import { getHistories, getClients } from '../../../Utils/getEntity';

// Styles imports
import "react-datepicker/dist/react-datepicker.css";

export function Histories() {
  // State management
  const [histories, setHistories] = useState([]);
  const [params, setParams] = useState({ id: 0 });
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  // Managing data retrieval
  const [empty, setEmpty] = useState(true);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load histories data
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

  // Initial load of histories
  useEffect(() => {
    loadHistories();
  }, [loadHistories]);

  // Update params when date range changes
  useEffect(() => {
    if (startDate && endDate) {
      setParams({ startDate: startDate.toISOString(), endDate: endDate.toISOString() });
    }
  }, [startDate, endDate]);

  // Handle refresh button click
  const handleRefresh = () => {    
    setDateRange([null, null]);
    loadHistories();
  };

  // Handle search input change
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Filter data by date range
  const filterDataByDateRange = useCallback(() => {
    if (!startDate || !endDate) {
      setFilteredData(histories); // Show all data if no date range is selected
    } else {
      const filtered = histories.filter(item => {
        const itemCreatedDate = item.created ? parseISO(item.created) : null;
        const itemEventDate = item.eventDate ? parseISO(item.eventDate) : null;
        return (
          (itemCreatedDate && isWithinInterval(itemCreatedDate, { start: startOfDay(startDate), end: endOfDay(endDate) })) ||
          (itemEventDate && isWithinInterval(itemEventDate, { start: startOfDay(startDate), end: endOfDay(endDate) }))
        );
      });
      if (filtered.length === 0) {
        setFilteredData(histories);
      } else {
        setFilteredData(filtered);
      }
    }
  }, [histories, startDate, endDate]);

  // Apply date range filter when dependencies change
  useEffect(() => {
    filterDataByDateRange();
  }, [filterDataByDateRange]);

  // Filter results based on search input and date range
  const results = search
    ? histories.filter(dato => dato.clientName.toLowerCase().includes(search.toLowerCase()))
    : filteredData;

  const category = 'histories';

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row d-flex align-items-start">
          <CrearButton onFormSubmit={handleRefresh} category={category} CustomModal={HistoriesModal} />
        </div>
        <div className="my-5 w-100">
          <Form>
            <Row className="align-items-center">
              <Col xs={12} sm={6}>
                <div className="input-group">
                  <Button
                    className="btn btn-outline-secondary border-right-0 border custom-search-button"
                    onClick={handleSearch}
                    type="button"
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </Button>
                  <FormControl
                    className="placeholder-tarea"
                    type="text"
                    placeholder="Buscar por nombre de cliente"
                    value={search}
                    onChange={handleSearch}
                  />
                </div>
              </Col>
              <Col xs={12} sm={6} className="d-flex justify-content-end">
                <div className="me-2 w-50">           
                  <DatePicker
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => {
                      setDateRange(update);
                    }}
                    isClearable={true}
                    placeholderText="Seleccionar rango de fechas"
                    className="form-control w-100"
                    wrapperClassName="w-100"
                  />
                </div>
              </Col>
            </Row>
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
}