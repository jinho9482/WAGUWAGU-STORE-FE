import axios from "axios";
export const orderApi = async (url, method, body, params, headers = {}) => {
  try {
    const res = await axios({
      url,
      method,
      baseURL: "http://35.223.83.225/api/v1/order",
      data: body,
      params: params,
      headers: headers,
    });
    return res.data;
  } catch (error) {
    console.error(`Error in ${method} request to ${url}`, error);
    throw error;
  }
};
