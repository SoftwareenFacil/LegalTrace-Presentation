import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../Constants/Url";
import {CREATE_USER, READ_USER, UPDATE_USER, DELETE_USER, UPDATE_USER_VIGENCY} 
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
      throw error;
    }
  },

  async fetchData(params) {
    let requestParts = [];
    
    if ('id' in params) requestParts.push(`id=${encodeURIComponent(params.id)}`);
    if ('name' in params) requestParts.push(`name=${encodeURIComponent(params.name)}`);
    if ('email' in params) requestParts.push(`email=${encodeURIComponent(params.email)}`);
    if ('created' in params) requestParts.push(`created=${encodeURIComponent(params.created)}`);
    if ('vigency' in params) requestParts.push(`vigency=${encodeURIComponent(params.vigency)}`);
    
    let request = '?' + requestParts.join('&');

    try {
      const response = await apiClient.get(READ_USER + request);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async editItem(updatedItem) {
    try {
      const response = await apiClient.put(UPDATE_USER, updatedItem);
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  async deleteItem(updatedItem) {
    try {
      const response = await apiClient.put(UPDATE_USER, updatedItem);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async toggleVigency(id) {
    try {
      const response = await apiClient.put(UPDATE_USER_VIGENCY+ `?id=${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

};

export default userService;

