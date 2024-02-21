import { format } from "date-fns";
import { Mensajes, Formatos } from "../Constants/Constant";

const formatDate = (date) => {
  return date ? format(date, Formatos.FormatoFecha) : Mensajes.NoInformado;
};

export { formatDate };
