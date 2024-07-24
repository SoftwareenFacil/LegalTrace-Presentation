import React, { useEffect, useState, useMemo } from "react";
import MultiButton from '../Buttons/MultiButton';
import BadgeVigency from '../Badges/BadgeVigency';
import DateIcon from "../Icons/DateIcon";
import UserIcon from "../Icons/UserIcon";
import ClientIcon from "../Icons/ClientIcon";
import CredentialIcon from "../Icons/CredentialIcon";
import { FaMoneyBill as Money } from "react-icons/fa";
import { getClients, getUsers } from '../../Utils/getEntity';
import { formatDate, formatCLP } from "../../Utils/formatters.js";
import { fetchAndMapById } from "../../Utils/fetchEntities"; 
import "../../Style/Tables/DynamicTable.scss";
import "../../Style/Buttons/MultiButton.scss";

const DynamicTable = ({ data, attributes, category, onFormSubmit, CustomModal }) => {


  const [improvedData, setImprovedData] = useState([]);

  useEffect(() => {
    const uniqueData = Array.from(new Set(data.map(item => item.id)))
      .map(id => data.find(item => item.id === id));
    setImprovedData(uniqueData);
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      if (category === 'tasks' && improvedData.length > 0) {
        await fetchClientsAndUsers(improvedData);
      } else if ((category === 'credentials' || category === 'payments') && improvedData.length > 0) {
        await fetchClients(improvedData);
      }
    };

    fetchData();
  }, [category, improvedData]);

  const renderTableHeaders = (attributes) => (
    <tr>
      <th key="empty-start"></th>
      {attributes.map(attr => 
        <th key={attr.key}>{attr.label}</th>
      )}
      <th key="empty-end"></th>
    </tr>
  );

  const unitMap = {'pesos': '$', 'utm': 'UTM', 'uf':'UF'};

  const renderTableRows = (data, attributes, category) => (
    data.map((item, index) => {
      const rowClass = (category === 'tasks' && item.vigency) ? null : 'disable-color-table';
      const mainKey = `${index}-${item.id || item.title}`;

      return (
        <tr key={mainKey}>
         {category === 'tasks' ? (
  <td key={`${mainKey}-icon`} className={`${!item.vigency ? rowClass + ' icon-div' : ''}`}>
    {renderIcon(item.vigency ? item.finished : undefined, new Date(item.dueDate), category)}
  </td>
) : (
  <td key={`${mainKey}-icon`}>
    {renderIcon(item.vigency, undefined, category)}
  </td>
)}

          {attributes.map(attr => {
            item['unit'] = unitMap['pesos'];
            const cellKey = `${mainKey}-${attr.key}`;

            if ((category  && (attr.key === 'vigency' || attr.key === 'finished')) ) {
              return (
                <td key={cellKey} className={category === 'tasks' ? rowClass : ''}>
                  <BadgeVigency className="badge-table" entity={item} category={category} />
                </td>
              );
            } else if (attr.key === 'clientId') {
              return (
                <td key={cellKey} className={category === 'tasks' ? rowClass : ''}>
                  {item.clientName}
                </td>
              );
            } else if (attr.key === 'userId') {
              return (
                <td key={cellKey} className={category === 'tasks' ? rowClass : ''}>
                  {item.userName}
                </td>
              );
            } else if (attr.key === 'created') {
              return (
                <td key={cellKey} className={category === 'tasks' ? rowClass : ''}>
                  {formatDate(item[attr.key])}
                </td>
              );
            } 
            // else if (attr.key === 'edit') {
            //   return (
            //     <td key={cellKey} className={category === 'tasks' ? rowClass : ''}>
            //       {formatDate(item[attr.key] || new Date(Date.now()))}
            //     </td>
            //   );
            
            // } 
            else if (attr.key === 'due') {
              return (
                <td key={cellKey} className={category === 'tasks' ? rowClass : ''}>
                  {formatDate(new Date(item['dueDate'||'date']))}
                </td>
              );
            }else if (attr.key === 'contacto') {
              return renderContacto(item.phone, item.email, cellKey);
            } else if (attr.key === 'amount') {
              return (
                <td key={cellKey}>
                  {item['unit'] + ' ' + formatCLP(item[attr.key])}
                </td>
              );
            } else if (attr.key === 'types'&&category==='payments') {
              return (
                <td key={cellKey} >
                  {item.type}{/* cambiar-fijos: F29, Renta, Leyes Sociales, Otros */}
                  
                </td>
              );}
            else {
              return (
                <td key={cellKey} className={category === 'tasks' ? rowClass : ''}>
                  {item[attr.key]}
                </td>
              );
            }
          })}
          {renderMultiButton(item, category)}
        </tr>
      );
    })
  );

  const renderIcon = (vigency, date, category) => {
    
    return (
      <div className="icon-div d-flex justify-content-center">
        {category === 'user' ? <UserIcon active={vigency} /> : null}
        {category === 'client' ? <ClientIcon active={vigency} /> : null}
        {category === 'tasks' ? <DateIcon className="tasks" date={date} finished={vigency} category={category} /> : null}
        {category === 'credentials' ? <CredentialIcon active={vigency} /> : null}
        {category === 'payments' ? <Money style={{ height: '52px', width: 'auto' }} /> : null}
      </div>
    );
  };

  const renderContacto = (phone, email, cellKey) => {
    const fontSize = (phone !== null && email !== null) ? '14px' : '16px';
    return (
      <td key={cellKey} className="centeredDiv">
        <div>
          <div className="multilineText">
            {phone ? <div style={{ lineHeight: '1em' }}>{phone}</div> : null}
            {email ? <div style={{ lineHeight: '1em', fontSize: `${fontSize}` }}>{email}</div> : null}
          </div>
        </div>
        {!email && !phone && (
          <div>No informado</div>
        )}
      </td>
    );
  };

  const renderMultiButton = (item, category) => (
    <td style={{ padding: '0px' }}>
      <MultiButton item={item} category={category} onFormSubmit={onFormSubmit} CustomModal={CustomModal} />
    </td>
  );

  const fetchClientsAndUsers = async (data) => {
    try {
      const uniqueUserIds = [...new Set(data.map(item => item.userId))];
      const uniqueClientIds = [...new Set(data.map(item => item.clientId))];
      const [clientsMap, usersMap] = await Promise.all([
        fetchAndMapById(uniqueClientIds, getClients),
        fetchAndMapById(uniqueUserIds, getUsers)
      ]);

      const updatedData = data.map(item => ({
        ...item,
        clientName: clientsMap[item.clientId],
        userName: usersMap[item.userId]
      }));

      setImprovedData(prevData => {
        if (JSON.stringify(prevData) !== JSON.stringify(updatedData)) {
          return updatedData;
        }
        return prevData;
      });
    } catch (error) {
      console.error('Error fetching clients and users:', error);
    }
  };

 const fetchClients = async (data) => {
  try {
    const uniqueClientIds = [...new Set(data.map(item => item.clientId))];
    const clientsMap = await fetchAndMapById(uniqueClientIds, getClients);
    const updatedData = data.map(item => ({
      ...item,
      clientName: clientsMap[item.clientId],
    }));

    setImprovedData(prevData => {
      if (JSON.stringify(prevData) !== JSON.stringify(updatedData)) {
        return updatedData;
      }
      return prevData;
    });
  } catch (error) {
    console.error('Error fetching clients:', error);
  }
};

  const columns = useMemo(() => attributes.length + 2, [attributes]);
  const width = useMemo(() => (category === 'tasks') ? '120px' : '222px', [category]);

  useEffect(() => {
    document.documentElement.style.setProperty('--table-columns', columns);
    document.documentElement.style.setProperty('--width-last-cell', width);
  }, [columns, width]);

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
};

export default DynamicTable;

     
