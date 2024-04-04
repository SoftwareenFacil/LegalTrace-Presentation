import { format } from "date-fns";
import { Mensajes, Formatos } from "../Constants/Constant";

const formatDate = (date) => {
  return date ? format(date, Formatos.FormatoFecha) : Mensajes.NoInformado;
};

const formatCLP = (value) => {
  if (value === '') {
    return '';
  }
  const numericValue = parseInt(value, 10);
  return new Intl.NumberFormat('es-CL', {
    currency: 'CLP',
  }).format(numericValue);
};

export { formatDate, formatCLP };
