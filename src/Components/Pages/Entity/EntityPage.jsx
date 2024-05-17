// EntityPage.jsx

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
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
  let [params, setParams] = useState(null);
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
  }, [params]);

  useEffect(() => {
    loadData();
  }, [params, loadData]);

  const handleRefresh = () => {
    loadData();
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  let finishedURL = null;
  if (queryParams.get('finished'))
  {
    finishedURL = queryParams.get('finished');
  }

  let paramsURL = null;
  if (finishedURL !== null)
  {
    paramsURL = {finished: finishedURL};
  }
  else {
    params = {id: 0};
  }

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
            params={paramsURL}  
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
            ) : empty? (
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

