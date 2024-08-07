import axios from "axios";

export const api = async (url, method, body, params, headers) => {
  const res = await axios({
    url,
    method,
    // baseURL: "http://34.69.39.99", // baseURL
    baseURL: "http://localhost:8090", // baseURL
    data: body,
    params: params,
    headers: {
      Authorization: "",
    },
  });
  return res;
};