

import { FaMoneyBill as Money } from "react-icons/fa";
import { ReactComponent as Inicio} from '../Assets/Icons/Inicio.svg';
import { ReactComponent as Client} from '../Assets/Icons/Client.svg';
import { ReactComponent as Credentials } from '../Assets/Icons/Credentials.svg';
import { ReactComponent as Users } from '../Assets/Icons/Users.svg';
import { ReactComponent as Histories } from '../Assets/Icons/Histories.svg';
import { ReactComponent as Documentos } from '../Assets/Icons/Documentos.svg';
import { ReactComponent as Tasks } from '../Assets/Icons/Tasks.svg';

import '../Style/Sidebar.scss';

export const sidebarLinks = [
  { to: "/", text: "Inicio", icon: <Inicio className="sidebar-icon" /> },
  { to: "/Tareas", text: "Tareas", icon: <Tasks className="sidebar-icon" /> },
  { to: "/Usuarios", text: "Usuarios", icon: <Users className="sidebar-icon" /> },
  { to: "/Clientes", text: "Clientes", icon: <Client className="sidebar-icon" /> },
  {
    to: "/Credenciales",
    text: "Credenciales",
    icon: <Credentials className="sidebar-icon" />,
  },
  { to: "/Pagos", text: "Pagos", icon: <Money className="sidebar-icon" /> },
  { to: "/Bitacoras", text: "Bitácora", icon: <Histories className="sidebar-icon" /> },
  { to: "/Documentos", text: "Documentos", icon: <Documentos className="sidebar-icon" /> },
];

export const Mensajes = {
  ErrorApi: "Hubo un error al cargar los datos de los usuarios.",
  EmptyData: "No existen datos para mostrar.",
  NoInformado: "No informada",
  MsjDelete: "El usuario no fue eliminado",
  Copiado: "Elemento copiado satisfactoriamente",
};

export const Formatos = {
  FormatoFecha: "dd/MM/yyyy",
};

export const placeholderText = {
  users: 'Buscar usuario por nombre',
  clients: 'Buscar cliente por nombre',
  credentials: 'Buscar credencial por nombre',
  payments:'Buscar cliente o tipo de cobro',
  task:'Buscar nombre de tarea'
};

