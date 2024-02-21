// External imports
import React, { useEffect, useState } from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Alert, Button } from "react-bootstrap";

// Internal imports
import { show_alerta } from "../../Service/shared-state";
import { Mensajes, Formatos, Route } from "../../Constants/Constant";
import UserIcon from "../Icons/UserIcon";
import ClientIcon from "../Icons/ClientIcon";
import { formatDate } from "../../AuxFunctions/formatDate";

// Styles imports
import "../../Style/TableStyle.css";

const DynamicTable = ({data, attributes, category}) => {

  const userAttributes = [
    { key: 'Usuario', label: 'Usuario' },
    { key: 'Cargo', label: 'Cargo' },
    { key: 'FIngreso', label: 'F. Ingreso' },
    { key: 'Estado', label: 'Estado' },
    { key: 'Contacto', label: 'Contacto' },
  ];


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
          {renderIcon(item['vigency'], category)}
          {attributes.map(attr => {
              if (attr.key === 'vigency') {
                return <td key={attr.key}>{renderVigency(item[attr.key])}</td>;
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
       </tr>
    ))
  );

  const renderIcon = (vigency, category) => (
    <td className="centeredDiv">
      <div style={{lineHeight: '1em', width: '3em', margin: '0 auto'}}>
        {category === 'user'? <UserIcon active={vigency}/> : null}
        {category === 'client'? <ClientIcon active={vigency}/> : null}
      </div>
    </td>
  );

  const renderVigency = (value) => (
    value? (
      <Button variant="success" size="sm" className="w-100" disabled>
        {"Activo"}
      </Button>
      ) : (
      <Button variant="danger" size="sm" className="w-100" disabled>
        {"No Activo"}
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
