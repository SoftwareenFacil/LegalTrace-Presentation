// Clients.jsx

// External imports
import React, { useEffect, useState, useCallback } from "react";

// Internal imports
import CrearButton from '../../Buttons/CrearButton';
import DynamicModal from '../../Modals/DynamicModal';
import DynamicTable from '../../Tables/DynamicTable';
import LoadingIndicator from "../../Loading//LoadingIndicator";
import EmptyData from '../../Alerts/EmptyData';
import { getClients } from '../../../Utils/getEntity';
import { fetchEntities } from '../../../Utils/fetchEntities';
import { delay } from '../../../Utils/delay';

// Styles imports
import "../../../Style/TableStyle.css";

export function Clients() {

  // Clients for display
  const [clients, setClients] = useState([]);
  
  // Managing data retrieval
  const [empty, setEmpty] = useState(true);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadClients = useCallback(async () => {
    await fetchEntities(
      0,
      getClients,
      setClients,
      setLoading,
      setError,
      setEmpty
    );
  }, []);

  useEffect(() => {
    loadClients();
  }, [loadClients]); 


  const handleRefresh = () => {
    loadClients();
  };


  const clientAttributes = [
    { key: 'name', label: 'Cliente' },
    { key: 'taxId', label: 'RUT' },
    { key: 'created', label: 'F. Creacion' },
    { key: 'vigency', label: 'Estado' },
    { key: 'contacto', label: 'Contacto' },
  ];
  
  const category = 'client';

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
        ) : empty? (
            <EmptyData empty={empty}/>
        ) : (
            <DynamicTable 
                data={clients}
                attributes={clientAttributes}
                category={category}
                onFormSubmit={handleRefresh}
                CustomModal={DynamicModal}
                />
        )}
    </div>
  );
};
