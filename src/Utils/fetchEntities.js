// fetchEntities.js


// Internal imports
import { delay } from './delay.js';

const fetchEntities = async (
    params,
    getEntity, 
    setEntity,
    setLoading,
    setError,
    setEmpty,
) => {
  try {
    setLoading(true);
    const minLoadingTime = delay(300);
    await minLoadingTime;
    const data = await getEntity(params); 
    if (data === null)
    {
      setEmpty(true);
      setError(false);
    }
    else {
      setEntity(data);
      setEmpty(false);
      setError(false);
    }
  }
  catch(error) {
    setError(true);
    setEmpty(false);
  } finally {
    setLoading(false);
  }
};

const fetchAndMapById = async (uniqueIds, fetchEntity) => {
  const entityPromises = uniqueIds.map(id => fetchEntity({id: id}));
  let entities = await Promise.all(entityPromises);
  entities = entities.flat(); 

  const entityMap = entities.reduce((acc, current) => {
    acc[current.id] = current.name;
    return acc;
  }, {});

  return entityMap;
};

const fetchUniques = async (uniqueIds, fetchEntity) => {
  const entityPromises = uniqueIds.map(id => fetchEntity({id: id}));
  let entities = await Promise.all(entityPromises);
  return entities;
};

export { fetchEntities, fetchAndMapById, fetchUniques};
