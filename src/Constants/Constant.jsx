
import {
  FaFolderOpen,
  FaHome,
  FaFileInvoice,
  FaUserFriends,
  FaBriefcase,
  FaAddressCard,
  FaFileArchive,
  FaMoneyBill,
} from "react-icons/fa";

export const sidebarLinks = [
  { to: "/", text: "Inicio", icon: <FaHome /> },
  { to: "/Tareas", text: "Tareas", icon: <FaFileInvoice /> },
  { to: "/Usuarios", text: "Usuarios", icon: <FaUserFriends /> },
  { to: "/Clientes", text: "Clientes", icon: <FaBriefcase /> },
  {
    to: "/Credenciales",
    text: "Credenciales",
    icon: <FaAddressCard />,
  },
  { to: "/Pagos", text: "Pagos", icon: <FaMoneyBill/> },
  { to: "/Bitacoras", text: "Bitácora", icon: <FaFileArchive /> },
  { to: "/Documentos", text: "Documentos", icon: <FaFolderOpen /> },
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

export const Route = {
  details: "/Detalles/",
  detailUser: "/user-detail/",
  detailClient: "/client-detail/",
};

export const placeholderText = {
  users: 'Buscar usuario por nombre',
  clients: 'Buscar cliente por nombre',
  credentials: 'Buscar credencial por nombre',
};
