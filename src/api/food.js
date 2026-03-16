import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api"
});

export const getFoods = () => {
  return API.get("/foods");
};
