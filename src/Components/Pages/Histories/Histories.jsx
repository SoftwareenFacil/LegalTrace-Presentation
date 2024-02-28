// Histories.jsx

// External imports
import React, { useEffect, useState, useCallback } from "react";

// Internal imports
import CrearButton from '../../Buttons/CrearButton';
import TasksModal from '../../Modals/TasksModal';
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
      <HistoryCard data={histories} category={category}/>
    </div>
  );
};
