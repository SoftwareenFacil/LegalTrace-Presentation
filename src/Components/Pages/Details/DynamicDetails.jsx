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
import { fetchAndMapById } from "../../../Utils/fetchEntities.js";
import { getClients, getUsers, getTasks } from '../../../Utils/getEntity';
import { fetchEntities, fetchUniques } from '../../../Utils/fetchEntities';

// Styles imports
import '../../../Style/Pages/DetailsPage.scss';

export function DynamicDetails() {

  const location = useLocation();
  const { id, category } = location.state;

  // Info to display
  const [entity, setEntity] = useState({});
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  
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


  const loadUsers = useCallback(async () => {
    if (category === 'client' && tasks.length > 0) {
      const uniqueUserIds = [...new Set(tasks.map(item => item.userId))];
      const usersArray = await fetchUniques(uniqueUserIds, getUsers);
      const flattenedUsersArray = usersArray.flat(); // Flatten the array
      setUsers(flattenedUsersArray);
    }
  }, [category, tasks, getUsers, setUsers]);

  useEffect(() => {
    loadEntity();
    loadTasks();
  }, [loadEntity, loadTasks, id, category]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers, tasks]);

  const handleRefresh = () => {
    loadEntity();
    loadTasks();
    loadUsers();
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
              (
                (category === 'client')?
                  <DetailsCard  entity={entity[0]}
                                category={category} 
                                users={users}
                                onSubmit={handleRefresh}
                                CustomModal={whichModal(category)}
                  />
                  :
                  <DetailsCard  entity={entity[0]}
                                category={category} 
                                user={undefined}
                                onSubmit={handleRefresh}
                                CustomModal={whichModal(category)}
                  />
              )
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
        {category !== 'tasks'?
          loadingTasks ? (
            <LoadingIndicator isLoading={loadingTasks}/>
          ) : emptyTasks? (
              <EmptyData empty={emptyTasks}/>
          ) : (category !== 'tasks'?
              <DynamicTable 
                  data={tasks}
                  attributes={tasksAttributes}
                  category={'tasks'}
                  onFormSubmit={handleRefresh}
                  CustomModal={TasksModal}
                  />
            :
            null)
          : null
       }
      </Row>
    </Container>
  );
}
