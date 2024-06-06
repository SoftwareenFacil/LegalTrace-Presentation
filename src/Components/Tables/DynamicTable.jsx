// DynamicTable.jsx

// External imports
import React, { useEffect, useState, useMemo } from "react";
import { Button } from "react-bootstrap";

// Internal imports
import { useData } from '../Pages/Entity/EntityPage.jsx';

// Buttons
import MultiButton from '../Buttons/MultiButton';

// Badges
import BadgeVigency from '../Badges/BadgeVigency';

// Icons
import DateIcon from "../Icons/DateIcon";
import UserIcon from "../Icons/UserIcon";
import ClientIcon from "../Icons/ClientIcon";
import CredentialIcon from "../Icons/CredentialIcon";
import { FaMoneyBill as Money } from "react-icons/fa";

// Modals
import ViewCredentials from "../Modals/ViewCredentials";

import { getClients, getUsers } from '../../Utils/getEntity';
import { formatDate, formatCLP } from "../../Utils/formatters.js";
import { fetchAndMapById } from "../../Utils/fetchEntities"; 
import { show_alerta } from "../../Service/shared-state";
import { Mensajes, Formatos, Route } from "../../Constants/Constant";

// Assets and Styles imports
import "../../Style/Tables/DynamicTable.scss";
import "../../Style/Buttons/MultiButton.scss";

const DynamicTable = ({data, attributes, category, onFormSubmit, 
                      CustomModal}) => {

  const [improvedData, setImprovedData] = useState(data);
  useEffect(() => {
      setImprovedData(data);
    }, [data]);

  useEffect(() => {
    if (data.length > 0 && category === 'tasks') {
      fetchClientsAndUsers(data);
    }
    else if (data.length > 0 && (category === 'credentials' || 
      category ==='payments')) {
      fetchClients(data);
    }
  }, [data, category]);

  const renderTableHeaders = (attributes) => (
    <tr>
      <th></th>
      {attributes.map(attr => 
        <th key={attr.key}>{attr.label}</th>)}
      <th></th>
    </tr>
  );
  const unitMap = {'pesos': '$', 'utm': 'UTM', 'uf':'UF'};

  const renderTableRows = (data, attributes, category) => (
    data.map((item, index) => {
      const rowClass = (category === 'tasks' && item.vigency) ? null: 'disable-color-table';
      
      return (<tr key={index} >
        {category !== 'tasks'?
          (renderIcon(item['vigency'] , undefined , category))
          :
          (renderIcon(item['finished'], new Date(item['dueDate']), category))
        }
        {attributes.map(attr => {
            item['unit'] = unitMap['pesos'];
            if ((category !== 'tasks' && attr.key === 'vigency')
              || (category !== 'tasks' && attr.key === 'finished')) {
              return <td key={attr.key} >
              {
                <BadgeVigency className="badge-table"
                  entity={item} category={category}/>
              }
              </td>
            }
            else if ( (category === 'tasks' && attr.key === 'vigency')
              || (category === 'tasks' && attr.key === 'finished')){ 
              return <td key={attr.key}  className={rowClass}>{
                <BadgeVigency className="badge-table"
                  entity={item} category={category}/>
              }</td>
            }
            else if (attr.key === 'clientId'&&category==='tasks'){ 
              return <td key={attr.key}  className={rowClass}>{item.clientName}</td>
            }
            else if (attr.key === 'clientId'){ 
              return <td key={attr.key}  >{item.clientName}</td>
            }
            else if (attr.key === 'userId'&&category==='tasks'){ 
              return <td key={attr.key}className={rowClass}>{item.userName}</td>
            }
            else if (attr.key === 'userId'){ 
              return <td key={attr.key}>{item.userName}</td>
            }
            else if (attr.key === 'created'&&category==='tasks') {
              return <td key={attr.key} className={rowClass}>{formatDate(item[attr.key])}</td>
            }
            else if (attr.key === 'created') {
              return <td key={attr.key}>{formatDate(item[attr.key])}</td>
            }
            else if (attr.key === 'contacto') {
              return renderContacto(item.phone, item.email)
            }
            else if (attr.key === 'amount') {
              return <td key={attr.key}>{
                      item['unit'] +' '+ formatCLP(item[attr.key])}</td>
            }
            else if (attr.key && category==='tasks') {
              return <td key={attr.key} className={rowClass}>{item[attr.key]}</td>
            }
            else {
              return <td key={attr.key}>{item[attr.key]}</td>
            }
        })
        }
        {renderMultiButton(item, category)}
     </tr>)
    })
  );


  const renderIcon = (vigency, date, category) => {
   return( <td > 
      <div className="icon-div d-flex justify-content-center">
        {category === 'user'? <UserIcon active={vigency}/> : null}
        {category === 'client'? <ClientIcon active={vigency}/> : null}
        {category === 'tasks'? <DateIcon className="tasks" 
          date={date} finished={vigency} category={category}/> : null}
        {category === 'credentials'? <CredentialIcon active={vigency}/> : null}
        {category === 'payments'? <Money style={{height: '52px', 
            width: 'auto'}}/> : null}
      </div>
    </td>)
  };

  const renderContacto = (phone, email) => {
    const fontSize = (phone !== null && email !== null)? '14px' : '16px';
    return (
    <td className="centeredDiv">
      <>
          <div className="multilineText">
            {phone? <div style={{lineHeight: '1em'}}>{phone}</div> : null}
            {email? <div style={{lineHeight: '1em', fontSize: `${fontSize}`}}>
                {email}</div> : null}
          </div>
      </>
      {!email && !phone && (
        <div>No informado</div>
      )}
    </td>
    );
  };

  const renderMultiButton = (item, category) => (
    <td 
      style={{
        padding: '0px',
      }}>
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

      setImprovedData(updatedData);
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

    setImprovedData(updatedData);
  };

  const columns = useMemo(() => attributes.length + 2, [attributes]);
  const width = useMemo(() =>  
    (category === 'tasks')? '120px' : '222px', [category]);

  useEffect(() => {
    document.documentElement.style.setProperty('--table-columns', columns);
    document.documentElement.style.setProperty('--width-last-cell', width);
  }, [columns, category]);

  return (
    <div className="div-table">
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
