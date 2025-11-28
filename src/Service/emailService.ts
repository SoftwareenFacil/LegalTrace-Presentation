// emailService.ts

import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../Constants/Url";

interface EmailPreviewResponse {
  success: boolean;
  message: string;
  data: string; // HTML string
  code: number;
}

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

export const getPaymentReminderFormat = async (
  chargeId: number
): Promise<EmailPreviewResponse> => {
  const response = await apiClient.get<EmailPreviewResponse>(
    `/EmailSend/GetPaymentReminderFormat?chargeId=${chargeId}`
  );
  return response.data;
};

export const sendPaymentReminder = async (chargeId: number) => {
  const response = await apiClient.post(`/EmailSend/SendPaymentReminder`, {
    chargeId,
  });
  return response.data;
};

export default {
  getPaymentReminderFormat,
  sendPaymentReminder,
};
