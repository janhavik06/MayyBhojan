import axios from "axios";

const API = "http://localhost:8080/api/delivery";

export function getWallet(partnerId) {

  return axios.get(`${API}/wallet?partnerId=${partnerId}`);

}