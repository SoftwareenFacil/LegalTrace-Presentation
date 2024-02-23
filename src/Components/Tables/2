// External imports
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

// Internal imports
import clientService from "../../Service/clientService";
import userService from "../../Service/userService";
import UserIcon from "../Icons/UserIcon";
import ClientIcon from "../Icons/ClientIcon";
import DateIcon from "../Icons/DateIcon";
import EditButton from "../Buttons/EditButton"; 
import DisableButton from "../Buttons/DisableButton";
import { formatDate } from "../../Utils/formatDate";
import { show_alerta } from "../../Service/shared-state";
import { Mensajes, Formatos, Route } from "../../Constants/Constant";

// Styles imports
import "../../Style/TableStyle.css";
import "../../Style/DateIcon.css";

const DynamicTable = ({data, attributes, category, onFormSubmit, 
                      CustomModal}) => {


  const [client, setClient] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    if (data.length > 0 && category === 'tasks') {
      getEntitiesTasks(data[0].userId, data[0].clientId);
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
    <td className="centeredDiv">
      <div style={{lineHeight: '1em', width: '3em', margin: '0 auto'}}>
        {category === 'user'? <UserIcon active={vigency}/> : null}
        {category === 'client'? <ClientIcon active={vigency}/> : null}
        {category === 'tasks'? <DateIcon date={date} vigency={vigency}/> : null}
      </div>
    </td>
  );

  const renderVigency = (value) => (
    value? (
      <Button size="sm" className="w-100 vigency vigency--active" disabled>
        {category === 'tasks'? "Terminado":"Activo"}
      </Button>
      ) : (
      <Button size="sm" className="w-100 vigency vigency--inactive" disabled>
        {category === 'tasks'? "No Terminado":"No Activo"}
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
    <td className="centeredDiv">
      <EditButton data={item}
                  onFormSubmit={onFormSubmit}        
                  category={category}
                  CustomModal={CustomModal}/>
      <DisableButton entity={item}
                     onSubmit={onFormSubmit} 
                     category={category}/>
    </td>
  );

  const getEntitiesTasks = async (userId, clientId) => {
    const response_client = await clientService.fetchData(clientId);
    const response_user = await userService.fetchData(userId);
    setClient(response_client.data[0]);
    setUser(response_user.data[0]);
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
