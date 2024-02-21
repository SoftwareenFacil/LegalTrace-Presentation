// Taks.jsx

// External imports
import React, { useEffect, useState } from "react";

// Internal imports
import CrearButton from '../../Buttons/CrearButton';
import TasksModal from '../../Modals/TasksModal';
import DynamicTable from '../../Tables/DynamicTable';
import { getTasks } from '../../../AuxFunctions/getEntity';
import {emptyData} from '../../Alerts/emptyData';

// Styles imports
import "../../../Style/TableStyle.css";

export function Tasks() {

  const [tasks, setTasks] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // fetchTasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
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
    }
  };

  const handleFormSubmit = () => {
    fetchTasks();
  };


  const tasksAttributes = [
    { key: 'client', label: 'Cliente' },
    { key: 'task', label: 'Tarea' },
    { key: 'user', label: 'Usuario' },
    { key: 'date', label: 'F. Termino' },
    { key: 'vigency', label: 'Estado' },
    { key: 'name', label: 'Nombre' },
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
      {emptyData(empty)}
    </div>
  );
};
