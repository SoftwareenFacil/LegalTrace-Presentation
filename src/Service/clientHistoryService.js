import axios from "axios";
import Cookies from 'js-cookie';
import {BASE_URL} from "../Constants/Url";
import {CREATE_CLIENT_HISTORY,
        READ_CLIENT_HISTORY,
        UPDATE_CLIENT_HISTORY,
        DELETE_CLIENT_HISTORY,
        UPDATE_CLIENT_HISTORY_VIGENCY,
}
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

const clientHistoryService = {

  async addItem(item) {
    try {
      const response = await apiClient.post(CREATE_CLIENT_HISTORY, item);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async fetchData(params) {
    let requestParts = [];
    if (params.id) requestParts.push(`id=${encodeURIComponent(params.id)}`);
    let request = '?' + requestParts.join('&');
    try {
      console.log("request",request);
      const response = await apiClient.get(READ_CLIENT_HISTORY + request);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async editItem(item) {
    try {
      const response = await apiClient.put(UPDATE_CLIENT_HISTORY , item);
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  async deleteItem(id) {
    try {
      const response = await apiClient.delete(DELETE_CLIENT_HISTORY + `?id=${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async toggleVigency(id) {
    try {
      const response = await apiClient.put(UPDATE_CLIENT_HISTORY_VIGENCY
                                            +`?id=${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default clientHistoryService;
