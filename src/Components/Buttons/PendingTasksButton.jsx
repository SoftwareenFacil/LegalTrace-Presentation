// PendingTasksButton.jsx

// External imports
import React from 'react';
import {useNavigate} from 'react-router-dom';
import { Button, Badge } from 'react-bootstrap';
import { capitalize } from 'lodash';

// Internal imports
import { ReactComponent as Tasks } from '../../Assets/Icons/Tasks.svg';

// Styles imports
import '../../Style/Buttons/PendingTasksButton.scss';

const PendingTasksButton = ({usage, count, className}) => {
  const navigate = useNavigate();

  const finished = {'pendientes': false, 'terminadas': true};
  const handleClick = () => {
    navigate(`/Tareas?finished=${finished[usage]}`);
  };
  const setTitle  = () => {
   return capitalize(usage) + ' en la';
  };
  return (
      <div className="PendingButton"  style={{padding: 0}}>
        <div className="d-grid">
          <button
            onClick={handleClick}
            className={`PendingEntity color-${usage} ${className}`}
            style={{margin: 0}}
          >
            <Tasks className="task-icon" />
            {className === "PendingButton-left"?
              <div className="PendingButton-content">
                <div className="PendingButton-text-box"> 
                    <div>Tareas</div>
                   {setTitle()}
                    <div>semana</div>
                </div>
                <div className="number">
                  <div className="count">{count}</div>
                  <Badge className={`badge-${usage}`}>Ver más</Badge>
                </div>
              </div>
              :
              <>
                <div className="PendingButton-content">
                  <div className="number">
                    <div className="count">{count}</div>
                    <Badge className={`badge-${usage}`}>Ver más</Badge>
                  </div>
                  <div className="PendingButton-text-box"> 
                      <div>Tareas</div>
                     {setTitle()}
                      <div>semana</div>
                  </div>
               </div>
            </>
            }
          </button>

        </div>
      </div>
  );
};

export default PendingTasksButton;
