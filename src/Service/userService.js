import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../Constants/Url";
import {CREATE_USER, READ_USER, UPDATE_USER, DELETE_USER} 
from "../Constants/Url";

const apiClient= axios.create({
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

const userService = {
 async addItem(item) {
    try {
      const response = await apiClient.post(CREATE_USER, item);
      return response.data;
    } catch (error) {
      console.error("Error al agregar item: ", error);
      throw error;
    }
  },

  async fetchData(id) {
    try {
      const response = await apiClient.get(READ_USER + `?id=${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener datos: ", error);
      throw error;
    }
  },

  async editItem(updatedItem) {
    try {
      const response = await apiClient.put(UPDATE_USER, updatedItem);
      return response.data;
    } catch (error) {
      console.error("Error al editar item: ", error);
      throw error;
    }
  },


  async deleteItem(id) {
    try {
      const response = await apiClient.delete(DELETE_USER + `?id=${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al eliminar item: ", error);
      throw error;
    }
  },
};

export default userService;

