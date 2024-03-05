
// Internal imports
import { formatDate } from "../../Utils/formatDate.js";
import UserAvatar from "../../Assets/UserAvatar.png";
import ClientAvatar from "../../Assets/ClientAvatar.png";
import DisableButton from "../Buttons/DisableButton";

const DetailsCard = ({entity, category, onSubmit}) => {
  return (
      <div className="entity-detail-card">
        <div className="entity-image">
          <img
            src={category === "user"? UserAvatar : ClientAvatar}
            alt={entity.name || "Usuario"}
            className="rounded-circle"
          />
        </div>
        <div className="entity-info">
          <div className="entity-detail-date">
            <span>Ingresado el: {formatDate(entity.created) || "Fecha no informada"}</span>
          </div>
          <h1 className="entity-name">{entity.name || 
            "Nombre no informado"}</h1> <p className="entity-detail">{"Fono: "+ entity.phone || 
            "Teléfono no informado"}</p>
          <p className="entity-detail">{"Correo: "+entity.email 
            || "Correo no informado"}</p>
          {category === 'client'?
            <div>
              <p className="entity-detail">{"Rut: "+entity.taxId || 
                "Rut no informado"}</p>
              <p className="entity-detail">{"Direccion: "+entity.address || 
                "Direccion no informada"}</p>
            </div>
            :
            null
          }
        </div>
        <div className="entity-actions">
          <DisableButton  entity={entity}
                          onSubmit={onSubmit}
                          category={category}
                          usage={'details'}
          />

          <button className="btn btn-primary">Editar Usuario</button>
        </div>
      </div>
  );
};

export default DetailsCard;
