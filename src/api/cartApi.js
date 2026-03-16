import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api"
});

export const addToCart = (data) => {
  return API.post("/cart/add", data);
};

export const getCart = (userId) => {
  return API.get(`/cart/${userId}`);
};

export const removeCart = (cartId) => {
  return API.delete(`/cart/${cartId}`);
};

export const clearCart = (userId) => {
  return API.delete(`/cart/user/${userId}`);
};
