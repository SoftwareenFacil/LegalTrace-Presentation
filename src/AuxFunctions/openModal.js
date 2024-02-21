import userService from '../Service/userService';
import clientService from '../Service/clientService';
import {show_alerta} from '../Service/shared-state';

  /*
function openModal({ setModalValues = () => {}, op, category, params = {} }) {
  const {  id,
           name,
           email,
           cargo,
           phone,
           address,
           taxId,
           vigency,
           password,
           admin,
  } = params;
  setModalValues({
    id: id || '', 
    name : name || '', 
    email: email || '',
    cargo: cargo || '',
    phone: phone || '',
    address: address|| '',
    taxId: taxId || '',
    vigency: vigency || false,
    password: password || false,
    admin: admin || false,
  });
}
*/

function openModal({op,
                    category,
                    id,
                    name,
                    email,
                    cargo,
                    phone,
                    address,
                    taxId,
                    vigency,
                    password,
                    admin,
                    setTitle,
                    setId,
                    setName,
                    setEmail,
                    setCargo,
                    setPhone,
                    setAddress,
                    setTaxId,
                    setPassword,
                    setVigency,
                    setAdmin,
  }) {
  const title_pre = (category == 'client') ? 'Client' : 'User';
  const title_sub = (op == 'edit') ? 'Editar ' : 'Registrar ';
  const title = title_pre + title_sub;

  setTitle(title);
  setId(id || "");
  setName(name || "");
  setEmail(email || "");
  setCargo(cargo || "");
  setPhone(phone || "");
  setAddress(address || "");
  setTaxId(taxId || "");
  setPassword("");
  setVigency(vigency || true);
  setAdmin(admin || false);
};

const validar = async (
  op,
  category,
  id,
  name,
  email,
  cargo,
  phone,
  address,
  taxId,
  vigency,
  password,
  admin,
) => {
  var parametros;
  if (name.trim === "") {
    show_alerta("Escriba el nombre");
  } else if (email.trim === "") {
    show_alerta("Escriba el email");
  } else if (String(phone).trim === "") {
    show_alerta("Escriba el telefono");
  } else {
    let parametros = {
      name: name.trim(),
      email: email.trim(),
      phone: parseInt(String(phone).trim(), 10),
      vigency: vigency,
    };

    if (op === 'create') {
      if (category === 'client')
      {
        await clientService.addItem(parametros);
      } else {
        await userService.addItem(parametros);
      }
    }

    if (op === 'edit') {
      parametros.id = id;
      if (category === 'client')
      {
        await clientService.editItem(parametros);
      } else {
        await userService.editItem(parametros);
      }
    }
  }
};

export {openModal, validar};
