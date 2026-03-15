import axios from "axios";

const BASE = "http://localhost:8080/api/delivery";

// get available orders
export const getOrders = () => {
  return axios.get(`${BASE}/orders`);
};

// accept order
export const acceptOrder = (id) => {
  return axios.put(`${BASE}/accept/${id}`);
};

// get active deliveries
export const getActiveOrders = () => {
  return axios.get(`${BASE}/active`);
};

// mark delivered
export const markDelivered = (id) => {
  return axios.put(`${BASE}/deliver/${id}`);
};
