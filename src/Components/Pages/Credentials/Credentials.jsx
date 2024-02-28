// Credentials.jsx

// External imports
import React, { useEffect, useState, useCallback } from "react";

// Internal imports
import CrearButton from '../../Buttons/CrearButton';
import CredentialsModal from '../../Modals/CredentialsModal';
import DynamicTable from '../../Tables/DynamicTable';
import LoadingIndicator from "../../Loading//LoadingIndicator";
import EmptyData from '../../Alerts/EmptyData';
import { getCredentials } from '../../../Utils/getEntity';
import { fetchEntities } from '../../../Utils/fetchEntities';
import { delay } from '../../../Utils/delay';

// Styles imports
import "../../../Style/TableStyle.css";

export function Credentials() {

  const [credentials, setCredentials] = useState([]);
  
  // Managing data retrieval
  const [empty, setEmpty] = useState(true);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);


  const loadCredentials= useCallback(async () => {
    await fetchEntities(
      0,
      getCredentials,
      setCredentials,
      setLoading,
      setError,
      setEmpty
    );
  }, []);

  useEffect(() => {
    loadCredentials();
  }, [loadCredentials]); 

  const handleRefresh = () => {
    loadCredentials();
  };
  const credentialsAttributes = [
    { key: 'clientId', label: 'Cliente' },
    { key: 'created', label: 'F. Creacion' },
    { key: 'vigency', label: 'Estado' },
    { key: 'title', label: 'Nombre' },
  ];
  
  const category = 'credentials';

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row mt-3 d-flex align-items-start">
          <CrearButton onFormSubmit={handleRefresh} category={category}
            CustomModal={CredentialsModal}/>
        </div>
      </div>
      {loading ? (
          <LoadingIndicator isLoading={loading}/>
        ) : empty? (
            <EmptyData empty={empty}/>
        ) : (
            <DynamicTable 
                data={credentials}
                attributes={credentialsAttributes}
                category={category}
                onFormSubmit={handleRefresh}
                CustomModal={CredentialsModal}
                />
        )}
    </div>
  );
};
