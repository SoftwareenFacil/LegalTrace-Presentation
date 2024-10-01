import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL } from "../Constants/Url";
import { CREATE_CLIENT, READ_CLIENT, UPDATE_CLIENT, UPDATE_CLIENT_VIGENCY } from "../Constants/Url";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});

apiClient.interceptors.request.use((config) => {
  const BEARER_TOKEN = Cookies.get("token");

  if (BEARER_TOKEN) {
    config.headers.Authorization = `Bearer ${BEARER_TOKEN}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

// Cache object to store responses
const cache = {};

const clientService = {
  async addItem(item) {
    try {
      const response = await apiClient.post(CREATE_CLIENT, item);
      return response.data;
    } catch (error) {
      console.error("Error adding item:", error);
      throw error;
    }
  },

  async fetchData(params,loadNew) {
    try {
      const requestKey = JSON.stringify(params); // Generate a unique key for each request
      if (cache[requestKey] && !loadNew) {
        return cache[requestKey]; // Return cached response if available
      }

      let requestParts = [];
      if ('id' in params) requestParts.push(`id=${encodeURIComponent(params.id)}`);
      if ('name' in params) {
        const normalizedName = params.name.charAt(0).toUpperCase() + params.name.slice(1).toLowerCase();
        requestParts.push(`name=${encodeURIComponent(normalizedName)}`);
      }
      if ('email' in params) requestParts.push(`email=${encodeURIComponent(params.email)}`);
      if ('taxId' in params) requestParts.push(`taxId=${encodeURIComponent(params.taxId)}`);
      if ('created' in params) requestParts.push(`created=${encodeURIComponent(params.created)}`);
      if ('vigency' in params) requestParts.push(`vigency=${encodeURIComponent(params.vigency)}`);
      
      let request = '?' + requestParts.join('&');
      const response = await apiClient.get(READ_CLIENT + request);
      cache[requestKey] = response.data; // Store response in cache
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  async editItem(item) {
    try {
      const response = await apiClient.put(UPDATE_CLIENT , item);
      // Clear cache for read operations after an edit
      clearCache();
      return response.data;
    } catch (error) {
      console.error("Error editing item:", error);
      throw error;
    }
  },

  async deleteItem(item) {
    try {
      const response = await apiClient.put(UPDATE_CLIENT, item);
      // Clear cache for read operations after a delete
      clearCache();
      return response.data;
    } catch (error) {
      console.error("Error deleting item:", error);
      throw error;
    }
  },

  async toggleVigency(id) {
    try {
      const response = await apiClient.put(UPDATE_CLIENT_VIGENCY + `?id=${id}`);
      // Clear cache for read operations after toggling vigency
      clearCache();
      return response.data;
    } catch (error) {
      console.error("Error toggling vigency:", error);
      throw error;
    }
  },
};

function clearCache() {
  // Clear the entire cache object
  Object.keys(cache).forEach(key => delete cache[key]);
}

export default clientService;
