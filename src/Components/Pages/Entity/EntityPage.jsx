// EntityPage.jsx

import React, {  useEffect, useState, useCallback } from "react";
import { useLocation } from 'react-router-dom';
import { Container, Row} from "react-bootstrap";
import CrearButton from '../../Buttons/CrearButton';
import DynamicTable from '../../Tables/DynamicTable';
import LoadingIndicator from "../../Loading/LoadingIndicator";
import EmptyData from '../../Alerts/EmptyData';
import { fetchEntities } from '../../../Utils/fetchEntities';

// Filters
import MultiDropdown from '../../Dropdowns/MultiDropdown';
import { filterByVigency } from '../../../Utils/filters.js';

export function EntityPage({  category, 
                              getFunction,
                              attributes,
                              EntityModal,
                              placeholderText,
}) {
  const [data, setData] = useState([]);
  const [params, setParams] = useState({ id: 0 });;
  const [empty, setEmpty] = useState(true);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    if (params !== null) {
      setLoading(true);
      await fetchEntities(
        params,
        getFunction,
        setData,
        setLoading,
        setError,
        setEmpty
      );
    }
  }, [params,getFunction]);

  useEffect(() => {
    loadData();
  }, [ loadData]);

  const handleRefresh = () => {
    loadData();
  };

  const location = useLocation();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    const urlParams = {}
    urlParams.finished = queryParams.get('finished') === 'true' || undefined
    urlParams.id = queryParams.get('id') || undefined
    const parseParams = {} 
    Object.keys(urlParams).forEach(key => {
      if(urlParams[key] !== undefined)
        parseParams[key] = urlParams[key]
    })

    const hasQuery = Object.keys(parseParams).length > 0

    if(hasQuery) {
      setParams(parseParams);
    } else {
      setParams({ id: 0 });
    }

  }, [getFunction,location]);

  return (
    <Container fluid style={{justifyContent: 'center'}}>
      <Row style={{justifyContent: 'center'}}>
        <CrearButton  onFormSubmit={handleRefresh}
                      category={category}
                      CustomModal={EntityModal}
        />
      </Row>
      <Row className="my-3" style={{paddingTop: '40px'}}>
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
          />
      </Row>
  

      <Row style={{justifyContent: 'center'}}> 
      {loading ? (
              <LoadingIndicator isLoading={loading} />
            ) : error ? ( 
              <p style={{ color: 'red' }}>{error}</p>
            ) : empty ? (
              <EmptyData empty={empty} />
            ) : (
              <DynamicTable 
                data={data}
                attributes={attributes}
                category={category}
                onFormSubmit={handleRefresh}
                CustomModal={EntityModal}
              />
        )}
      </Row>
    </Container>
  );
};

