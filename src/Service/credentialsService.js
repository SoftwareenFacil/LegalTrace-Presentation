import axios from "axios";
import Cookies from 'js-cookie';
import {BASE_URL} from "../Constants/Url";
import {CREATE_CREDENTIALS,
        READ_CREDENTIALS,
        UPDATE_CREDENTIALS,
        DELETE_CREDENTIALS,
        UPDATE_CREDENTIALS_VIGENCY,
} from '../Constants/Url';

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

const credentialsService = {

  async addItem(item) {
    try {
      const response = await apiClient.post(CREATE_CREDENTIALS, item);
      return response.data;
    } catch (error) {
      console.error("Error al agregar item: ", error);
      throw error;
    }
  },

  async fetchData(params) {

    let requestParts = [];
    if (params.id) requestParts.push(`id=${encodeURIComponent(params.id)}`);
    let request = '?' + requestParts.join('&');
    try {
      const response = await apiClient.get(READ_CREDENTIALS + request);
      return response.data;
    } catch (error) {
      console.error("Error al obtener datos: ", error);
      throw error;
    }
  },

  async editItem(updatedItem) {
    try {
      const response = await apiClient.put(UPDATE_CREDENTIALS , updatedItem);
      return response.data;
    } catch (error) {
      console.error("Error al editar item: ", error);
      throw error;
    }
  },


  async deleteItem(id) {
    try {
      const response = await apiClient.delete(DELETE_CREDENTIALS + `?id=${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al eliminar item: ", error);
      throw error;
    }
  },

  async toggleVigency(id) {
    try {
      const response = await apiClient.put(UPDATE_CREDENTIALS_VIGENCY+ 
                                            `?id=${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener datos: ", error);
      throw error;
    }
  },
};

export default credentialsService;
