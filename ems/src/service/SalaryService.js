import axios from "axios";

const API_URL = "http://localhost:8080/salary";

export const getSalaryList = () => {
  return axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("userDetails")).token}`,
    },
  });
};
