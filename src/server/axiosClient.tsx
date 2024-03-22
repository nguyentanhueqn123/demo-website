import axios from "axios";
import { API_BASE_URL } from "../config/index";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

// axiosClient.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response.data;
//   },
//   function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     let res = {};
//     if (error.response) {
//       res.data = error.response.data;
//       res.status = error.response.status;
//       res.headers = error.response.headers;
//     } else if (error.request) {
//       console.log(error.request);
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.log("Error:", error.message);
//     }
//     return res;
//     // return Promise.reject(error);
//   }
// );

export default axiosClient;
