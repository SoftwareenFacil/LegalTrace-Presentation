// entityAttributes.js

export const usersAttributes = [
  { key: 'name', label: 'Cliente' },
  { key: 'created', label: 'F. Creacion' },
  { key: 'vigency', label: 'Estado' },
  { key: 'contacto', label: 'Contacto' },
];

export const clientsAttributes = [
  { key: 'name', label: 'Cliente' },
  { key: 'taxId', label: 'RUT' },
  { key: 'created', label: 'F. Creacion' },
  { key: 'vigency', label: 'Estado' },
  { key: 'contacto', label: 'Contacto' },
];

export const tasksAttributes = [
  { key: 'clientId', label: 'Cliente' },
  { key: 'type', label: 'Tarea' },
  { key: 'userId', label: 'Usuario' },
  { key: 'created', label: 'F. Inicio' },
  // { key: 'edit', label: 'F. Edición' },
  { key: 'due', label: 'Vence' },
  { key: 'finished', label: 'Estado' },
  { key: 'title', label: 'Nombre' },
];

export const credentialsAttributes = [
  { key: 'clientId', label: 'Cliente' },
  { key: 'created', label: 'F. Creacion' },
  { key: 'vigency', label: 'Estado' },
  { key: 'title', label: 'Nombre' },
];
  

export const paymentsAttributes = [
  { key: 'clientId', label: 'Cliente' },
  { key: 'title', label: 'Nombre' },
  { key: 'created', label: 'F. Creacion' },
  { key: 'amount', label: 'Monto' },
  { key:'types',label:'Tipo'}
];

