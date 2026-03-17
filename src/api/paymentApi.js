import axios from "axios";

const API = "http://localhost:8080/api/payment";

export const getPayments = (userId) => {
  return axios.get(`${API}/${userId}`);
};

export const addPayment = (data) => {
  return axios.post(API, data);
};
