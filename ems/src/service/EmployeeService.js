import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/employee";

export const listEmployees = () => {
  return axios.get(REST_API_BASE_URL, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("userDetails")).token}`,
    },
  });
};

export const addEmployees = (employeeData) => {
  console.log(employeeData.file);
  return axios.post("http://localhost:8080/r", employeeData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getEmployee = (empId) => {
  return axios.get(REST_API_BASE_URL + "/" + empId, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("userDetails")).token}`,
    },
  });
};

export const updateEmployee = (empId, empData) => {
  console.log(empData.file);
  return axios.put(REST_API_BASE_URL + "/" + empId, empData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("userDetails")).token}`,
    },
  });
};

export const deleteEmployeeById = (empId) => {
  return axios.delete(REST_API_BASE_URL + "/" + empId, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("userDetails")).token}`,
    },
  });
};

export const login = (loginData) => {
  return axios.post("http://localhost:8080/login", loginData);
};
