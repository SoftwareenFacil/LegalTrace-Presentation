// External imports
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

// Internal imports
import clientService from "../../Service/clientService";
import userService from "../../Service/userService";
//import ClientIcon from "../Icons/ClientIcon";
import DateIcon from "../Icons/DateIcon";

import EditButton from "../Buttons/EditButton"; 
import DisableButton from "../Buttons/DisableButton";
import ViewButton from "../Buttons/ViewButton";

import { formatDate } from "../../Utils/formatDate";
import { show_alerta } from "../../Service/shared-state";
import { Mensajes, Formatos, Route } from "../../Constants/Constant";

// Assets and Styles imports
import "../../Style/TableStyle.css";
import "../../Style/DateIcon.css";
import { ReactComponent as ClientIcon } from '../../Assets/Icons/Client.svg';
import { ReactComponent as CredentialIcon } from 
'../../Assets/Icons/Credentials.svg';
import { ReactComponent as UserIcon } from '../../Assets/Icons/User.svg';

const DynamicTable = ({data, attributes, category, onFormSubmit, 
                      CustomModal}) => {


  const [client, setClient] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    if (data.length > 0 && category === 'tasks') {
      getEntitiesTasks(data[0].userId, data[0].clientId);
    }

    if (data.length > 0 && category === 'credentials') {
      getClientId(data[0].clientId);
    }
  }, []);

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
            (renderIcon(item['vigency'], undefined , category)):
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
                return <td key={attr.key}>{client.name}</td>
              }
              else if (attr.key === 'userId'){ 
                return <td key={attr.key}>{user.name}</td>
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
          {renderMultiButton(item)}
       </tr>
    ))
  );

  const renderIcon = (vigency, date, category) => (
    <td className="centeredDiv" style={{height: '10px'}}>
      <div style={{lineHeight: '1em', width: '4em', margin: '0 auto'}}>
        {category === 'user'? <UserIcon active={vigency}/> : null}
        {category === 'client'? <ClientIcon active={vigency}/> : null}
        {category === 'tasks'? <DateIcon date={date} vigency={vigency}/> : null}
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

  const renderMultiButton = (item) => (
    <td className="centeredDiv" style={{height: '10px'}}>
      <div style={{display: 'flex'}}>
        <div style={{flex: 1}}>
          <EditButton data={item}
                      onFormSubmit={onFormSubmit}        
                      category={category}
                      CustomModal={CustomModal}/>
        </div>
        <div style={{flex: 1}}>
          <ViewButton entity={item} category={category}/>
          <DisableButton entity={item}
                         onSubmit={onFormSubmit} 
                         category={category}/>
        </div>
      </div>
    </td>
  );

  const getEntitiesTasks = async (userId, clientId) => {
    getUserId(userId);
    getClientId(clientId);
  };

  const getUserId = async (userId) => {
    const response_user = await userService.fetchData(userId);
    setUser(response_user.data[0]);
  };


  const getClientId = async (clientId) => {
    const response_client = await clientService.fetchData(clientId);
    setClient(response_client.data[0]);
  };

  return (
    <div>
      <table className="table content table-responsive-md">
        <thead className="table-header">
          {renderTableHeaders(attributes)}
        </thead>
        <tbody className="table-body">
          {renderTableRows(data, attributes, category)}
        </tbody>
      </table>
    </div>
  );
}

export default DynamicTable;
