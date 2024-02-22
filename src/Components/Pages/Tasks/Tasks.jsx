// Taks.jsx

// External imports
import React, { useEffect, useState } from "react";

// Internal imports
import CrearButton from '../../Buttons/CrearButton';
import TasksModal from '../../Modals/TasksModal';
import DynamicTable from '../../Tables/DynamicTable';
import LoadingIndicator from "../../Loading//LoadingIndicator";
import { getTasks } from '../../../Utils/getEntity';
import { emptyData } from '../../Alerts/emptyData';
import { delay } from '../../../Utils/delay';

// Styles imports
import "../../../Style/TableStyle.css";

export function Tasks() {

  // Tasks for display
  const [tasks, setTasks] = useState([]);
  
  // Managing data retrieval
  const [empty, setEmpty] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // fetchTasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {

      setLoading(true);
      const minLoadingTime = delay(200);
      await minLoadingTime;
      const data = await getTasks();

      if (data === null)
      {
        setEmpty(true);
        setError(false);
      }
      else {
        setTasks(data);
        setEmpty(false);
        setError(false);
      }
    } 
    catch(error) {
      setError(true);
      setEmpty(false);
    } finally {
      setLoading(false);
    }

  };

  const handleFormSubmit = () => {
    fetchTasks();
  };


  const tasksAttributes = [
    { key: 'clientId', label: 'Cliente' },
    { key: 'type', label: 'Tarea' },
    { key: 'userId', label: 'Usuario' },
    { key: 'dueDate', label: 'F. Termino' },
    { key: 'vigency', label: 'Estado' },
    { key: 'title', label: 'Nombre' },
  ];
  
  const category = 'tasks';

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row mt-3 d-flex align-items-start">
          <CrearButton onFormSubmit={handleFormSubmit} category={category}
            CustomModal={TasksModal}/>
        </div>
      </div>
      {loading ? (
          <LoadingIndicator isLoading={loading}/>
        ) : empty ? (
            emptyData(empty)
        ) : (
            <DynamicTable 
                data={tasks}
                attributes={tasksAttributes}
                category={category}
                />
        )}
    </div>
  );
};
