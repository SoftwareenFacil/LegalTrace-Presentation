// DynamicTable.jsx

// External imports
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

// Internal imports

// Buttons
import MultiButton from '../Buttons/MultiButton';

// Icons
import DateIcon from "../Icons/DateIcon";
import UserIcon from "../Icons/UserIcon";
import ClientIcon from "../Icons/ClientIcon";
import CredentialIcon from "../Icons/CredentialIcon";

// Modals
import ViewCredentials from "../Modals/ViewCredentials";

import { getClients, getUsers } from '../../Utils/getEntity';
import { formatDate } from "../../Utils/formatDate";
import { fetchAndMapById } from "../../Utils/fetchEntities"; 
import { show_alerta } from "../../Service/shared-state";
import { Mensajes, Formatos, Route } from "../../Constants/Constant";

// Assets and Styles imports
import "../../Style/TableStyle.css";
import "../../Style/MultiButton.scss";
import "../../Style/DateIcon.css";

const DynamicTable = ({data, attributes, category, onFormSubmit, 
                      CustomModal}) => {


  const [improvedData, setData] = useState(data);

  useEffect(() => {
    if (data.length > 0 && category === 'tasks') {
      fetchClientsAndUsers(data);
    }
    else if (data.length > 0 && category === 'credentials') {
      fetchClients(data);
    }
  }, [data, category]);

  const renderTableHeaders = (attributes) => (
    <tr>
      <th></th>
      {attributes.map(attr => 
        <th key={attr.key}>{attr.label}</th>)}
    </tr>
   );


  const renderTableRows = (data, attributes, category) => (
    data.map((item, index) => (
        <tr key={index}>
          {category !== 'tasks'?
            (renderIcon(item['vigency'], undefined , category))
            :
            (renderIcon(item['finished'], new Date(item['dueDate']), category))
          }
          {attributes.map(attr => {
              if ((category !== 'tasks' && attr.key === 'vigency')
                || attr.key === 'finished') {
                return <td key={attr.key}>
                {category !== 'tasks'?
                  (renderVigency(item['vigency'])):
                  (renderVigency(item['finished']))
                }
                </td>
              }
              else if (attr.key === 'clientId'){ 
                return <td key={attr.key}>{item.clientName}</td>
              }
              else if (attr.key === 'userId'){ 
                return <td key={attr.key}>{item.userName}</td>
              }
              else if (attr.key === 'created') {
                return <td key={attr.key}>{formatDate(item[attr.key])}</td>
              }
              else if (attr.key === 'contacto') {
                return renderContacto(item.phone, item.email)
              }
              else {
                return <td key={attr.key}>{item[attr.key]}</td>
              }
          })
          }
          {renderMultiButton(item, category)}
       </tr>
    ))
  );

  const renderIcon = (vigency, date, category) => (
    <td className="centeredDiv" style={{height: '10px'}}>
      <div style={{lineHeight: '1em', width: '4em', margin: '0 auto'}}>
        {category === 'user'? <UserIcon active={vigency}/> : null}
        {category === 'client'? <ClientIcon active={vigency}/> : null}
        {category === 'tasks'? <DateIcon date={date} vigency={vigency} 
                                  category={category}/> : null}
        {category === 'credentials'? <CredentialIcon active={vigency}/> : null}
      </div>
    </td>
  );

  const renderVigency = (value) => (
    value? (
      <Button size="sm" className="w-100 vigency vigency--active" disabled>
        {category === 'tasks'? "Terminado": null}
        {(category === 'user') || (category === 'client')? "Activo": null}
        {category === 'credentials'? "Vigente": null}
      </Button>
      ) : (
      <Button size="sm" className="w-100 vigency vigency--inactive" disabled>
        {category === 'tasks'? "No Terminado": null}
        {(category === 'user') || (category === 'client')? "No Activo": null}
        {category === 'credentials'? "No Vigente": null}
      </Button>
      )
  );

  const renderContacto = (phone, email) => (
    <td className="centeredDiv">
      <>
          <div className="multilineText">
          {phone? <div style={{lineHeight: '1em'}}>{phone}</div> : ''}
          {email? <div style={{lineHeight: '1em'}}>{email}</div> : ''}
          </div>
      </>
      {!email && !phone && (
        <div>No informado</div>
      )}
    </td>
  );

  const renderMultiButton = (item, category) => (
    <td className="centeredDiv"
      style={{paddingTop: '0px', paddingRight: '0px', paddingBottom: '0px'}}> 
      <MultiButton  item={item}
                    category={category}
                    onFormSubmit={onFormSubmit}
                    CustomModal={CustomModal}
      />
    </td>
  );

  const fetchClientsAndUsers = async (data) => {
    try {
      const uniqueClientIds = [...new Set(data.map(item => item.clientId))];
      const uniqueUserIds = [...new Set(data.map(item => item.userId))];

      const [clientsMap, usersMap] = await Promise.all([
        fetchAndMapById(uniqueClientIds, getClients),
        fetchAndMapById(uniqueUserIds, getUsers)
      ]);

      const updatedData = data.map(item => ({
        ...item,
        clientName: clientsMap[item.clientId],
        userName: usersMap[item.userId]
      }));

      setData(updatedData);
    } catch (error) {
      console.error('Error fetching clients and users:', error);
    }
  };

  const fetchClients = async (data) => {
    const uniqueClientIds = [...new Set(data.map(item => item.clientId))];
    const clientsMap = await fetchAndMapById(uniqueClientIds, 
                              getClients);
    const updatedData = data.map(item => ({
      ...item,
      clientName: clientsMap[item.clientId],
    }));

    setData(updatedData);
  };

  return (
    <div>
      <table className="table content table-responsive-md">
        <thead className="table-header">
          {renderTableHeaders(attributes)}
        </thead>
        <tbody className="table-body">
          {renderTableRows(improvedData, attributes, category)}
        </tbody>
      </table>
    </div>
  );
}

export default DynamicTable;
