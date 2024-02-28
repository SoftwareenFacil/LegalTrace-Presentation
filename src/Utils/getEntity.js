import clientService from '../Service/clientService';
import userService from '../Service/userService.js';
import userTasksService from '../Service/userTasksService';
import credentialsService from '../Service/credentialsService';
import clientHistoryService from '../Service/clientHistoryService';

const fetchDataFromService = (service) => async (params) => {
  try {
    const response = await service.fetchData(params);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw error;
  }
};

const getClients = fetchDataFromService(clientService);
const getUsers = fetchDataFromService(userService);
const getTasks = fetchDataFromService(userTasksService);
const getCredentials = fetchDataFromService(credentialsService);
const getHistories = fetchDataFromService(clientHistoryService);


export {getClients, getUsers, getTasks, getCredentials, getHistories };
