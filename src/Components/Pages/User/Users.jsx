// Users.jsx

// External imports
import React, { useEffect, useState } from "react";

// Internal imports
import CrearButton from '../../Buttons/CrearButton';
import DynamicModal from '../../Modals/DynamicModal';
import DynamicTable from '../../Tables/DynamicTable';
import LoadingIndicator from "../../Loading//LoadingIndicator";
import { getUsers } from '../../../Utils/getEntity';
import { emptyData } from '../../Alerts/emptyData';
import { delay } from '../../../Utils/delay';

// Styles imports
import "../../../Style/TableStyle.css";

export function Users() {

  // Users for display
  const [users, setUsers] = useState([]);
  
  // Managing data retrieval
  const [empty, setEmpty] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // fetchTasks on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {

      setLoading(true);
      const minLoadingTime = delay(200);
      await minLoadingTime;
      const data = await getUsers();

      if (data === null)
      {
        setEmpty(true);
        setError(false);
      }
      else {
        setUsers(data);
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
    fetchUsers();
  };

  const userAttributes = [
    { key: 'name', label: 'Cliente' },
    { key: 'cargo', label: 'Cargo' },
    { key: 'created', label: 'F. Creacion' },
    { key: 'vigency', label: 'Estado' },
    { key: 'contacto', label: 'Contacto' },
  ];

  const category = 'user';

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row mt-3 d-flex align-items-start">
          <CrearButton onFormSubmit={handleFormSubmit} category={category}
            CustomModal={DynamicModal}/>
        </div>
      </div>
      {loading ? (
          <LoadingIndicator isLoading={loading}/>
        ) : empty ? (
            emptyData(empty)
        ) : (
            <DynamicTable 
                data={users}
                attributes={userAttributes}
                category={category}
                onFormSubmit={handleFormSubmit}
                CustomModal={DynamicModal}
                />
        )}
    </div>
  );
};

