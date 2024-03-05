// validateCreation.js

import { getUsers, getClients } from '../Utils/getEntity';

const uniqueEmail = async (email) => {
  const response = await getUsers({ email: email });
  if (response === null) {
    return true; 
  }
  return false;
};


async function validateInput(params, category) {
    let errors = {};

    if (category === 'user' || category === 'client') {
      if (!params.name) errors.name = "Nombre es requerido";

      if (!params.taxId) errors.taxId = "Rut es requerido";

      if (!params.phone) errors.phone = "Telefono es requerido";
      else if (!/^\d{9}$/.test(params.phone)) errors.phone = 
                                      "Telefono debe tener 9 digitos";

      if (!params.email) {
          errors.email = "Correo es requerido";
      }
      else if (!/\S+@\S+\.\S+/.test(params.email)) {
          errors.email = "Correo es invalido";
      }
      else {

        const whichGet = (category === 'user')? getUsers : getClients;
        const isEmailUnique = await uniqueEmail(params.email, whichGet);
        console.log(isEmailUnique);
        if (!isEmailUnique) {
            errors.email = "Ya existe usuario con este correo";
        } 
      }
      
      if (category === 'client') {
        if (!params.address) errors.address = "Direccion es requerida";
      }
    }

    else if (category === 'credentials') {
      if (!params.clientId) errors.client = "Institucion es requerida";
      if (!params.title) errors.name = "Nombre de credencial es requerido";
      if (!params.username) errors.username = "Usuario es requerido";
      if (!params.keyValue) errors.taxId = "Contrasenna es requerida";
    }

    else if (category === 'tasks') {
      if (!params.clientId) errors.client = "Cliente es requerido";
      if (!params.userId) errors.user = "Usuario es requerido";
      if (!params.title) errors.title = "Titulo es requerido";
      if (!params.dueDate) errors.dueDate = "Plazo limite es requerido";
    }

    else if (category === 'histories') {
      if (!params.clientId) errors.client = "Cliente es requerido";
      if (!params.title) errors.title = "Titulo es requerido";
    }
    return errors;
}

export { validateInput };

