import axios from "axios";
import Cookies from 'js-cookie';
import {BASE_URL} from "../Constants/Url";
import {CREATE_USER_TASK,
        GETBY_USER_TASK,
        DELETE_USER_TASK,
        UPDATE_USER_TASK,
        CHECK_REPTITVE_USER_TASK,
        UPDATE_USER_TASK_VIGENCY,
} from "../Constants/Url";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
    withCredentials: true,
});

apiClient.interceptors.request.use(async (config) => {
  const BEARER_TOKEN = await Cookies.get("token");

  if (BEARER_TOKEN) {
    config.headers.Authorization = `Bearer ${BEARER_TOKEN}`;
  }

  return config;
});

const userTasksService = {

  async addItem(item) {
    try {
      const response = await apiClient.post(CREATE_USER_TASK, item);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async fetchData(params) {
    let requestParts = [];
    
    if (params.id) requestParts.push(`id=${encodeURIComponent(params.id)}`);
    if (params.userId) requestParts.push(`userId=${encodeURIComponent(params.userId)}`);
    if (params.clientId) requestParts.push(`clientId=${encodeURIComponent(params.clientId)}`);
    if (params.dueDate) requestParts.push(`dueDate=${encodeURIComponent(params.dueDate)}`);
    if (params.repeatable) requestParts.push(`repeatable=${encodeURIComponent(params.repeatable)}`);
    if (params.vigency) requestParts.push(`vigency=${encodeURIComponent(params.vigency)}`);
    
    let request = '?' + requestParts.join('&');

    try {
      const response = await apiClient.get(GETBY_USER_TASK + request);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async fetchRepetitive(item) {
    try {
      const response = await apiClient.get(CHECK_REPTITVE_USER_TASK, item);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async editItem(item) {
    try {
      const response = await apiClient.put(UPDATE_USER_TASK, item);
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  async deleteItem(id) {
    try {
      const response = await apiClient.delete(DELETE_USER_TASK + `?id=${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async toggleVigency(id) {
    try {
      const response = await apiClient.put(UPDATE_USER_TASK_VIGENCY +
                                            `?id=${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

};

export default userTasksService;
