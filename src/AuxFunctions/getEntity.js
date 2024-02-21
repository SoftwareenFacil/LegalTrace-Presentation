import clientService from '../Service/clientService';
import userService from '../Service/userService.js';
import userTasksService from '../Service/userTasksService';

const getClients = async () => {
      try {
        const response = await clientService.fetchData(0);
        return response.data;
      } catch (error) {

        if (error.response && error.response.status === 404) {
          return null;
        }
        console.error("Error fetching tasks:", error);
        throw error;
      }
};


const getUsers = async () => {
      try {
        const response = await userService.fetchData(0);
        if (response.status === 404) {
          return null; 
        }
        return response.data; 
      } catch (error) {
        console.error("Error fetching users:", error);
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
        console.error("Error fetching tasks:", error);
        throw error;
      }

};

export {getClients, getUsers, getTasks};
