import axios from "axios";

export const $api = axios.create({
  baseURL: "https://66d08cad181d059277df025d.mockapi.io/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

$api.interceptors.response.use((response) => {
  return response;
});
