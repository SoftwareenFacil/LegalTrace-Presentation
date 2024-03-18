// EntityPage.jsx

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CrearButton from '../../Buttons/CrearButton';
import DynamicTable from '../../Tables/DynamicTable';
import LoadingIndicator from "../../Loading/LoadingIndicator";
import EmptyData from '../../Alerts/EmptyData';
import { fetchEntities } from '../../../Utils/fetchEntities';

// Filters
import DatePickerFilter from '../../Searchs/DatePickerFilter';

import MultiDropdown from '../../Dropdowns/MultiDropdown';
import { filterByVigency } from '../../../Utils/filters.js';

export function EntityPage({  category, 
                              getFunction,
                              attributes,
                              EntityModal,
                              placeholderText,
}) {
  const [data, setData] = useState([]);
  const [params, setParams] = useState({id: 0});
  const [empty, setEmpty] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadData = useCallback(async () => {
    await fetchEntities(
      params,
      getFunction,
      setData,
      setLoading,
      setError,
      setEmpty
    );
  }, [params]);

  useEffect(() => {
    loadData();
  }, [params, loadData]);

  const handleRefresh = () => {
    loadData();
  };


  return (
    <Container fluid style={{justifyContent: 'center'}}>
      <Row className="my-3" style={{justifyContent: 'center'}}>
        <CrearButton  onFormSubmit={handleRefresh}
                      category={category}
                      CustomModal={EntityModal}
        />
      </Row>
      <Row className="my-3 justify-content-end" style={{paddingTop: '40px'}}>
        <Col xs="auto" className="px-1">
          <MultiDropdown
            onVigencyChange={filterByVigency}
            setParams={setParams}
            category={category}
            getEntity={getFunction}
            setData={setData}
            setEmpty={setEmpty}
            setError={setError}
            setLoading={setLoading}
            placeholderText={placeholderText}
          />
        </Col>
      </Row>
      <Row>
        {loading ? (
            <LoadingIndicator isLoading={loading}/>
          ) : empty ? (
              <EmptyData empty={empty}/>
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

