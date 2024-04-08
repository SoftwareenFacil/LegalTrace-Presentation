// DetailsCard.jsx

// Internal imports
import { formatDate } from "../../Utils/formatters.js";
import UserAvatar from "../../Assets/UserAvatar.png";
import ClientAvatar from "../../Assets/ClientAvatar.png";
import DisableDetailsButton from "../Buttons/DisableDetailsButton";
import EditButton from '../Buttons/EditButton';
import MessageButton from  '../Buttons/MessageButton';
import UserIcon from "../Icons/UserIcon";

// Styles imports
import '../../Style/Cards/DetailsCard.scss'; 

const DetailsCard = ({entity, users, category, onSubmit, CustomModal}) => {

  const gapValues = {
  'client': '191px',
  'user': '562px'
  };
  const gap = gapValues[category] || '0';

  return (
      <div className="details-card">
        <div className="entity-content">
          <div className="entity-detail-date">
            <div className="date-color">
              <span>Ingresado el: {formatDate(entity.created) || "Fecha no informada"}</span>
            </div>
          </div>
          <div className="entity-image">
            <img
              src={category === "user"? UserAvatar : ClientAvatar}
              alt={entity.name || "Usuario"}
            />
          </div>

          <div className="entity-inside-card">
            <div className="entity-main-info">
              <h1 className="entity-name">{entity.name || "Nombre no informado"}
              </h1>
              <div>
                <p className="entity-rut">{entity.taxId || "Rut no informado"}</p>
                <p className="entity-address">{entity.address || 
                  "Direccion no informada"}</p>
              </div>
            </div>

            <div className="entity-second-info">
              <p style={{marginBottom: '5px'}}>{"Fono: "+ entity.phone || 
                "Teléfono no informado"}</p>
              <p>{"Correo: "+ entity.email ||
                "Correo no informado"}</p>
            </div>
            {users !== undefined?
              <div>
              <p>Usuario(s) asignado(s):</p>
              <div className="assigned-user">
                {users.map((user) => (
                  <div key={user.id} className="user-item">
                    <UserIcon  active={user.vigency} />
                    <p className="user-name">{user.name}</p>
                  </div>
                ))}
              </div>
              </div>
              :
              null
            }

          </div>
        </div>

        <div className='entity-actions' style={{ gap }}>
          <DisableDetailsButton
            entity={entity}
            onSubmit={onSubmit}
            category={category}
            usage={'details'}
            className="btn-details"
          />
          {category === 'client' && (
            <MessageButton data={entity} className="btn-details message-color"/>
          )}
          <EditButton
            data={entity}
            onFormSubmit={onSubmit}
            category={category}
            CustomModal={CustomModal}
            usage={'details'}
            className="btn-details edit-color"
          />
        </div>

      </div>
  );
};

export default DetailsCard;
