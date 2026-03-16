import axios from "axios";

const API = "http://localhost:8080/api/wallet";

export function getWallet(partnerId) {
  return axios.get(`${API}/${partnerId}`);
}

export function withdrawMoney(partnerId, amount) {
  return axios.post(`${API}/withdraw`, null, {
    params: {
      partnerId,
      amount
    }
  });
}