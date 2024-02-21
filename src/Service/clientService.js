import axios from "axios";
import Cookies from 'js-cookie';
import {BASE_URL} from "../Constants/Url";
import {CREATE_CLIENT, READ_CLIENT, UPDATE_CLIENT, DELETE_CLIENT}
from "../Constants/Url";

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

const clientService = {

  async addItem(item) {
    try {
      const response = await apiClient.post(CREATE_CLIENT, item);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async fetchData(id) {
    try {
      const response = await apiClient.get(READ_CLIENT + `?id=${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async editItem(item) {
    try {
      const response = await apiClient.put(UPDATE_CLIENT , item);
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  // Logical delete, changes vigency to false
  async deleteItem(item) {
    try {
      const response = await apiClient.put(UPDATE_CLIENT, item);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default clientService;
