import api from "./axios";

export const saveAddress = (data) => {
  return api.post("/address/save", data);
};

export const createOrder = (data) => {
  return api.post("/orders/create", data);
};

// ⭐ GET USER ORDERS
export const getUserOrders = (userId) => {
  return api.get(`/orders/user/${userId}`);
};