import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL, DOWNLOAD_PAYMENT } from "../Constants/Url";
import { CREATE_PAYMENT, READ_PAYMENT, UPDATE_PAYMENT}
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

const paymentService = {

  async addItem(item) {
    try {
      const response = await apiClient.post(CREATE_PAYMENT, item);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async fetchData(params) {
    let requestParts = [];

    if ('id' in params) requestParts.push(`id=${encodeURIComponent(params.id)}`);
    if ('clientId' in params) requestParts.push(`clientId=${encodeURIComponent(params.clientId)}`);
    if ('date' in params) requestParts.push(`date=${encodeURIComponent(params.date)}`);
    if ('title' in params) requestParts.push(`title=${encodeURIComponent(params.title)}`);
    if ('amount' in params) requestParts.push(`amount=${encodeURIComponent(params.amount)}`);


    let request = '?' + requestParts.join('&');
    try {
      const response = await apiClient.get(READ_PAYMENT + request);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async editItem(item) {
    try {
      const response = await apiClient.put(UPDATE_PAYMENT, item);
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  // Logical delete, changes vigency to false
  async deleteItem(item) {
    try {
      const response = await apiClient.put(UPDATE_PAYMENT, item);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async fechFile(fileUrl) {
    try {
      const response = await apiClient.get(`${DOWNLOAD_PAYMENT}?id=${fileUrl}`)

      const { type, name, fileString } = response.data.data
      const binaryString = window.atob(fileString); // Decodificar base64 a cadena binaria
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const blob = new Blob([bytes], { type });
      const url = window.URL.createObjectURL(blob);

 
      return {
        url,
        fileName: `${name}${getSufix(type)}`
      }


    } catch (error) {
      throw error;
    }
  }

};

function getSufix(type) {
  // if (type === 'text/plain')
  //   return '.txt'
  // if(type === 'application/pdf')
  //   return '.pdf'

  const base = type.split('/')[0];
  const specific = type.split('/')[1];
  if(base){
    if(base === 'text')
      return '.txt'
    if(base === 'application' || base === 'image')
      return `.${specific}`
  }

  return type;
}

export default paymentService;
