import axios from "axios";

const API = "http://localhost:8080/api/address";

export const saveAddress = (data) => axios.post(`${API}/save`, data);

export const getUserAddresses = (userId) => axios.get(`${API}/user/${userId}`);
