import axios from "axios";



const axiosInstance = axios.create({

  headers: {
    "Content-type": "application/json",
  }});
 axiosInstance.interceptors.request.use(
  (config) => {
    config.auth = {
      username: "meric1",
      password: "meric1",
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;