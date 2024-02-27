// Credentials.jsx

// External imports
import React, { useEffect, useState } from "react";

// Internal imports
import CrearButton from '../../Buttons/CrearButton';
import CredentialsModal from '../../Modals/CredentialsModal';
import DynamicTable from '../../Tables/DynamicTable';
import LoadingIndicator from "../../Loading//LoadingIndicator";
import EmptyData from '../../Alerts/EmptyData';
import { getCredentials } from '../../../Utils/getEntity';
import { delay } from '../../../Utils/delay';

// Styles imports
import "../../../Style/TableStyle.css";

export function Credentials() {

  const [credentials, setCredentials] = useState([]);
  
  // Managing data retrieval
  const [empty, setEmpty] = useState(true);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCredentials();
  }, []);

  const fetchCredentials = async () => {
    try {
      setLoading(true);
      const minLoadingTime = delay(200);
      await minLoadingTime;
      const data = await getCredentials(); 
      if (data === null)
      {
        setEmpty(true);
        setError(false);
      }
      else {
        setCredentials(data);
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
    fetchCredentials();
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
          <CrearButton onFormSubmit={handleFormSubmit} category={category}
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
                onFormSubmit={handleFormSubmit}
                CustomModal={CredentialsModal}
                />
        )}
    </div>
  );
};
