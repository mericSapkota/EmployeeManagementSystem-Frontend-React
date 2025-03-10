import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/employee";

export const listEmployees = () => {
  return axios.get(REST_API_BASE_URL);
};

export const addEmployees = (employeeData) => {
  return axios.post("http://localhost:8080/r", employeeData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getEmployee = (empId) => {
  return axios.get(REST_API_BASE_URL + "/" + empId);
};

export const updateEmployee = (empId, empData) => {
  return axios.put(REST_API_BASE_URL + "/" + empId, empData);
};

export const deleteEmployeeById = (empId) => {
  return axios.delete(REST_API_BASE_URL + "/" + empId);
};

export const login = (loginData) => {
  return axios.post("http://localhost:8080/login", loginData);
};
