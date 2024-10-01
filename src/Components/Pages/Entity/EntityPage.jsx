import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from 'react-router-dom';
import { Container, Row } from "react-bootstrap";
import CrearButton from '../../Buttons/CrearButton';
import DynamicTable from '../../Tables/DynamicTable';
import LoadingIndicator from "../../Loading/LoadingIndicator";
import EmptyData from '../../Alerts/EmptyData';
import { fetchEntities } from '../../../Utils/fetchEntities';

// Filters
import MultiDropdown from '../../Dropdowns/MultiDropdown';
import { filterByVigency } from '../../../Utils/filters.js';

// Importar funciones de date-fns
import { parseISO, isSameDay, startOfDay} from 'date-fns';

export function EntityPage({
  category,
  getFunction,
  attributes,
  EntityModal,
  placeholderText,
}) {
  const [data, setData] = useState([]);
  const [params, setParams] = useState({ id: 0 });
  const [empty, setEmpty] = useState(true);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loadNew, setLoadNew] = useState(false);

  const loadData = useCallback(async () => {
    if (params !== null) {
      setLoading(true);
      await fetchEntities(
        params,
        getFunction,
        setData,
        setLoading,
        setError,
        setEmpty,
        loadNew
      );
    }
  }, [params, loadNew,getFunction]);

  useEffect(() => {
    loadData();
  }, [loadData]);
  useEffect(() => {
    if (selectedDate) {
      setParams({date:parseISO(selectedDate.toISOString())})
    }
  }, [selectedDate]); 
  const handleRefresh = () => {   
    setLoadNew(true);
    loadData();
    //setLoadNew(false);
  };

  const location = useLocation();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    const urlParams = {
      finished: queryParams.get('finished') === 'true' || undefined,
      id: queryParams.get('id') || undefined,
      date: queryParams.get('date') || undefined,
      dueDate: queryParams.get('dueDate') || undefined,
    };

    const parseParams = {};
    Object.keys(urlParams).forEach(key => {
      if (urlParams[key] !== undefined)
        parseParams[key] = urlParams[key];
    });

    const hasQuery = Object.keys(parseParams).length > 0;

    if (hasQuery) {
      setParams(parseParams);
    } else {
      setParams({ id: 0 });
    }

  }, [location]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    filterDataByDate(date);
  };

  const filterDataByDate = (selectedDate) => {
    if (!selectedDate) {
      setFilteredData(data); // Mostrar todos los datos si no hay fecha seleccionada
    } else {
      const filtered = data.filter(item => {
        const itemCreatedDate = item.created ? parseISO(item.created) : null;
        const itemEditDate = item.date||item.dueDate ? parseISO(item.date||item.dueDate) : null;
        return (
          (itemCreatedDate && isSameDay(startOfDay(itemCreatedDate), startOfDay(selectedDate))) ||
          (itemEditDate && isSameDay(startOfDay(itemEditDate), startOfDay(selectedDate)))
        );
      });
      if(filtered.length===0){setFilteredData(data)}
      else{setFilteredData(filtered);}
      
    }
  };

  return (
    <Container fluid style={{ justifyContent: 'center' }}>
      <Row style={{ justifyContent: 'center' }}>
        <CrearButton
          onFormSubmit={handleRefresh}
          category={category}
          CustomModal={EntityModal}
        />
      </Row>
      <Row className="my-3" style={{ paddingTop: '40px' }}>
        <MultiDropdown
          onVigencyChange={filterByVigency}
          setParams={setParams}
          category={category}
          getEntity={getFunction}
          params={params}
          setData={setData}
          setEmpty={setEmpty}
          setError={setError}
          setLoading={setLoading}
          placeholderText={placeholderText}
          handleDateChange={handleDateChange}
          selected={selectedDate}
        />
      </Row>

      <Row style={{ justifyContent: 'center' }}>
        {loading ? (
          <LoadingIndicator isLoading={loading} />
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : empty ? (
          <EmptyData empty={empty} />
        ) : (
          <DynamicTable
            data={selectedDate ? filteredData : data}
            attributes={attributes}
            category={category}
            onFormSubmit={handleRefresh}
            CustomModal={EntityModal}
          />
        )}
      </Row>
    </Container>
  );
}
