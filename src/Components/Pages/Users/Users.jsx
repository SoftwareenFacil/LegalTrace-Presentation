// Users.jsx

// External imports
import React, { useEffect, useState, useCallback } from "react";

// Internal imports
import CrearButton from '../../Buttons/CrearButton';
import DynamicModal from '../../Modals/DynamicModal';
import DynamicTable from '../../Tables/DynamicTable';
import LoadingIndicator from "../../Loading//LoadingIndicator";
import EmptyData from '../../Alerts/EmptyData';
import { getUsers } from '../../../Utils/getEntity';
import { fetchEntities } from '../../../Utils/fetchEntities';
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

  const loadUsers = useCallback(async () => {
    await fetchEntities(
      {id: 0},
      getUsers,
      setUsers,
      setLoading,
      setError,
      setEmpty
    );
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]); 

  const handleRefresh = () => {
    loadUsers();
  };

  const userAttributes = [
    { key: 'name', label: 'Cliente' },
    { key: 'created', label: 'F. Creacion' },
    { key: 'vigency', label: 'Estado' },
    { key: 'contacto', label: 'Contacto' },
  ];

  const category = 'user';

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row mt-3 d-flex align-items-start">
          <CrearButton onFormSubmit={handleRefresh} category={category}
            CustomModal={DynamicModal}/>
        </div>
      </div>
      {loading ? (
          <LoadingIndicator isLoading={loading}/>
        ) : empty ? (
            EmptyData(empty)
        ) : (
            <DynamicTable 
                data={users}
                attributes={userAttributes}
                category={category}
                onFormSubmit={handleRefresh}
                CustomModal={DynamicModal}
                />
        )}
    </div>
  );
};

