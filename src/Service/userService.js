import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../Constants/Url";
import { CREATE_USER, READ_USER, UPDATE_USER, UPDATE_USER_VIGENCY } from "../Constants/Url";

//let loadNew =false;
// Objeto para mantener la caché de respuestas
const responseCache = {};

// Configurar Axios
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Asegura que las cookies se envíen con las solicitudes
});

// Interceptor de solicitud para agregar el token de autorización y manejar la caché
apiClient.interceptors.request.use((config) => {
  const BEARER_TOKEN = Cookies.get("token");

  if (BEARER_TOKEN) {
    config.headers.Authorization = `Bearer ${BEARER_TOKEN}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

// Función para hacer solicitudes con manejo de caché
const fetchWithCache = async (url, params,loadNew) => {
  const cacheKey = url + JSON.stringify(params);

  if (responseCache[cacheKey] && !loadNew) {
    return responseCache[cacheKey];
  }

  try {
    const response = await apiClient.get(url, { params });
    responseCache[cacheKey] = response.data;
    loadNew =false;
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Servicio de usuarios
const userService = {
  async addItem(item) {
    try {
      const response = await apiClient.post(CREATE_USER, item);
      //loadNew =true;
      return response.data;
    } catch (error) {
      console.error("Error adding item:", error);
      throw error;
    }
  },

  async fetchData(params,loadNew) {
    try {
      return fetchWithCache(READ_USER, params,loadNew);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  async editItem(updatedItem) {
    try {
      const response = await apiClient.put(UPDATE_USER, updatedItem);
      //loadNew =true;
      return response.data;
    } catch (error) {
      console.error("Error editing item:", error);
      throw error;
    }
  },

  async deleteItem(updatedItem) {
    try {
      const response = await apiClient.put(UPDATE_USER, updatedItem);
      //loadNew =true;
      return response.data;
    } catch (error) {
      console.error("Error deleting item:", error);
      throw error;
    }
  },

  async toggleVigency(id) {
    try {
      const response = await apiClient.put(UPDATE_USER_VIGENCY + `?id=${id}`);
      return response.data;
    } catch (error) {
      console.error("Error toggling vigency:", error);
      throw error;
    }
  },
};

export default userService;
