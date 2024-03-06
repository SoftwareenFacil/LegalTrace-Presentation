// EntityPage.jsx

import React, { useEffect, useState, useCallback } from "react";
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
}) {
  const [data, setData] = useState([]);
  const [params, setParams] = useState({id: 0});
  const [empty, setEmpty] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getDataWithFunction = useCallback(
    async (params) => {
      const data = await getFunction(params);
      return data;
    },
    [getFunction]
  );
  const loadData = useCallback(async () => {
    await fetchEntities(
      params,
      getDataWithFunction,
      setData,
      setLoading,
      setError,
      setEmpty
    );
  }, [params, getDataWithFunction]);

  useEffect(() => {
    loadData();
  }, [params, loadData]);

  const handleRefresh = () => {
    loadData();
  };

  return (
    <Container fluid>
      <Row className="my-3 justify-content-end">
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
          />
        </Col>
      </Row>
      <Row>
        {loading ? (
            <LoadingIndicator isLoading={loading}/>
          ) : empty ? (
              <EmptyData />
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

