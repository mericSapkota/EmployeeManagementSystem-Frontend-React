import axios from "axios";

const API_URL = "http://localhost:8080/salary";

export const getSalaryList = () => {
  return axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("userDetails")).token}`,
    },
  });
};

export const getSalaryByUsername = (username) => {
  return axios.get(API_URL + "/" + username, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("userDetails")).token}`,
    },
  });
};

export const addSalaryByUsername = (salary) => {
  return axios.post(API_URL, salary, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("userDetails")).token}`,
    },
  });
};
export function deleteSalaryRecord(salary) {
  return axios.delete(API_URL, {
    data: salary,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("userDetails")).token}`,
    },
  });
}
export const getAllUsername = () => {
  return axios.get("http://localhost:8080/getAllUsername", {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("userDetails")).token}`,
    },
  });
};
