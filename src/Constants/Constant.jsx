
import {
  FaFolderOpen,
  FaHome,
  FaFileInvoice,
  FaUserFriends,
  FaBriefcase,
  FaAddressCard,
  FaFileArchive,
} from "react-icons/fa";

export const sidebarLinks = [
  { to: "/", text: "Inicio", icon: <FaHome /> },
  { to: "/Tareas", text: "Tareas", icon: <FaFileInvoice /> },
  { to: "/users", text: "Usuarios", icon: <FaUserFriends /> },
  { to: "/clients", text: "Clientes", icon: <FaBriefcase /> },
  {
    to: "/Credenciales",
    text: "Credenciales",
    icon: <FaAddressCard />,
  },
  { to: "/Bitacoras", text: "Bitácora", icon: <FaFileArchive /> },
  { to: "/Documentos", text: "Documentos", icon: <FaFolderOpen /> },
];

export const Mensajes = {
  ErrorApi: "Hubo un error al cargar los datos de los usuarios.",
  EmptyData: "No existen datos para mostrar.",
  NoInformado: "No informada",
  MsjDelete: "El usuario no fue eliminado",
};

export const Formatos = {
  FormatoFecha: "dd/MM/yyyy",
};

export const Route = {
  detailUser: "/user-detail/",
  detailClient: "/client-detail/",
};
