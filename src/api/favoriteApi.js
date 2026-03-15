import axios from "axios";

const API = "http://localhost:8080/api/favorites";

export const getFavorites = (userId) => {
  return axios.get(`${API}/${userId}`);
};

export const addFavorite = (data) => {
  return axios.post(API, data);
};

export const deleteFavorite = (id) => {
  return axios.delete(`${API}/${id}`);
};