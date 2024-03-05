// Tasks.jsx

// External imports
import React, { useEffect, useState, useCallback } from "react";

// Internal imports
import CrearButton from '../../Buttons/CrearButton';
import TasksModal from '../../Modals/TasksModal';
import DynamicTable from '../../Tables/DynamicTable';
import LoadingIndicator from "../../Loading//LoadingIndicator";
import EmptyData from '../../Alerts/EmptyData';
import { getTasks } from '../../../Utils/getEntity';
import { fetchEntities } from '../../../Utils/fetchEntities';
import { delay } from '../../../Utils/delay';

// Styles imports
import "../../../Style/TableStyle.css";

export function Tasks() {

  // Tasks for display
  const [tasks, setTasks] = useState([]);
  
  // Managing data retrieval
  const [empty, setEmpty] = useState(true);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadTasks = useCallback(async () => {
    await fetchEntities(
      {id: 0},
      getTasks,
      setTasks,
      setLoading,
      setError,
      setEmpty
    );
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]); 


  const handleRefresh = () => {
    loadTasks();
  };


  const tasksAttributes = [
    { key: 'clientId', label: 'Cliente' },
    { key: 'type', label: 'Tarea' },
    { key: 'userId', label: 'Usuario' },
    { key: 'created', label: 'F. Inicio' },
    { key: 'finished', label: 'Estado' },
    { key: 'title', label: 'Nombre' },
  ];
  
  const category = 'tasks';

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row mt-3 d-flex align-items-start">
          <CrearButton onFormSubmit={handleRefresh} category={category}
            CustomModal={TasksModal}/>
        </div>
      </div>
      {loading ? (
          <LoadingIndicator isLoading={loading}/>
        ) : empty? (
            <EmptyData empty={empty}/>
        ) : (
            <DynamicTable 
                data={tasks}
                attributes={tasksAttributes}
                category={category}
                onFormSubmit={handleRefresh}
                CustomModal={TasksModal}
                />
        )}
    </div>
  );
};
