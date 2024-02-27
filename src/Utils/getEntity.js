import clientService from '../Service/clientService';
import userService from '../Service/userService.js';
import userTasksService from '../Service/userTasksService';
import credentialsService from '../Service/credentialsService';

const getClients = async () => {
      try {
        const response = await clientService.fetchData(0);
        return response.data;
      } catch (error) {

        if (error.response && error.response.status === 404) {
          return null;
        }
        throw error;
      }
};


const getUsers = async () => {
      try {
        const response = await userService.fetchData(0);
        return response.data;
      } catch (error) {

        if (error.response && error.response.status === 404) {
          return null;
        }
        throw error;
      }
};

const getTasks = async () => {
      try {
        const response = await userTasksService.fetchData(0);
        return response.data;
      } catch (error) {

        if (error.response && error.response.status === 404) {
          return null;
        }
        throw error;
      }

};

const getCredentials = async () => {
      try {
        const response = await credentialsService.fetchData(0);
        return response.data;
      } catch (error) {

        if (error.response && error.response.status === 404) {
          return null;
        }
        throw error;
      }

};

export {getClients, getUsers, getTasks, getCredentials };
