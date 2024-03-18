// DynamicDetails.jsx

// External imports
import React, { useEffect, useState, useCallback } from "react";
import { Row, Container, Col } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";

// Internal imports
import TasksModal from '../../Modals/TasksModal';
import DynamicModal from '../../Modals/DynamicModal';
import DynamicTable from '../../Tables/DynamicTable';
import DetailsCard from '../../Cards/DetailsCard';
import DetailsTasks from '../../Cards/DetailsTasks';
import LoadingIndicator from "../../Loading//LoadingIndicator";
import EmptyData from '../../Alerts/EmptyData';
import { tasksAttributes } from '../../../Constants/entityAttributes.js';
import { getClients, getUsers, getTasks } from '../../../Utils/getEntity';
import { fetchEntities } from '../../../Utils/fetchEntities';

// Styles imports
import '../../../Style/Detail.css';

export function DynamicDetails() {

  const location = useLocation();
  const { id, category } = location.state;

  // Info to display
  const [entity, setEntity] = useState({});
  const [tasks, setTasks] = useState([]);
  
  // Managing data retrieval entity
  const [emptyEntity, setEmptyEntity] = useState(true);
  const [errorEntity, setErrorEntity] = useState(false);
  const [loadingEntity, setLoadingEntity] = useState(false);

  // Managing data retrieval tasks
  const [emptyTasks, setEmptyTasks] = useState(true);
  const [errorTasks, setErrorTasks] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(false);


  const loadEntity = useCallback(async () => {
    await fetchEntities(
      {id: id},
      whichGet(category),
      setEntity,
      setLoadingEntity,
      setErrorEntity,
      setEmptyEntity
    );
  }, []);

  const loadTasks = useCallback(async () => {
    await fetchEntities(
      (category === 'user')? {userId: id}: {clientId: id},
      getTasks,
      setTasks,
      setLoadingTasks,
      setErrorTasks,
      setEmptyTasks
    );
  }, []);

  useEffect(() => {
    loadEntity();
    loadTasks();
  }, [loadEntity, loadTasks, id]); 

  const handleRefresh = () => {
    loadEntity();
    loadTasks();
  };

  const whichGet = (category) => { 
      if (category === 'user'){
        return getUsers;
      }
      else if (category === 'client'){
        return getClients;
      }
      else if (category === 'tasks'){
        return getTasks;
      }
  };

  const whichModal = (category) => {
    if (category == 'tasks') {
      return TasksModal;
    }
    else { 
      return DynamicModal;
    }
  };

  return (
    <Container>
      <Row>
        <div className="entity-detail-container">

        {loadingEntity? (
            <LoadingIndicator isLoading={loadingEntity}/>
          ) : emptyEntity? (
              <EmptyData empty={emptyEntity}/>
          ) : (
            (category !== 'tasks')?
              <DetailsCard  entity={entity[0]}
                            category={category} 
                            onSubmit={handleRefresh}
                            CustomModal={whichModal(category)}
              />
            : 
              <DetailsTasks entity={entity[0]}
                            category={category} 
                            onSubmit={handleRefresh}
                            CustomModal={whichModal(category)}
              />
        )}
        </div>
      </Row>
      <Row>
        {loadingTasks ? (
            <LoadingIndicator isLoading={loadingTasks}/>
          ) : emptyTasks? (
              <EmptyData empty={emptyTasks}/>
          ) : (
              <DynamicTable 
                  data={tasks}
                  attributes={tasksAttributes}
                  category={'tasks'}
                  onFormSubmit={handleRefresh}
                  CustomModal={TasksModal}
                  />
       )}
      </Row>
    </Container>
  );
}
