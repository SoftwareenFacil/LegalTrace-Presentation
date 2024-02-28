// Histories.jsx

// External imports
import React, { useEffect, useState, useCallback } from "react";

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
import "../../../Style/TableStyle.css";

export function Histories() {

  const [histories, setHistories] = useState([]);
  
  // Managing data retrieval
  const [empty, setEmpty] = useState(true);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadHistories = useCallback(async () => {
    await fetchEntities(
      0,
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
          <div className="row mt-3 d-flex align-items-start">
            <CrearButton onFormSubmit={handleRefresh} category={category}
              CustomModal={HistoriesModal}/>
          </div>
        </div>
        {loading ? (
            <LoadingIndicator isLoading={loading}/>
          ) : empty? (
              <EmptyData empty={empty}/>
          ) : (
                <HistoryCard data={histories} category={category}/>
          )}
      </div>
    </div>
  );
};
