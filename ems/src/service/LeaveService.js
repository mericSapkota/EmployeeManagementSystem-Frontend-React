import axios from "axios";

const BASE_URL = "http://localhost:8080/api/leave";

export const addLeave = (leaveData) => {
  return axios.post(BASE_URL, leaveData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("userDetails")).token}`,
    },
  });
};

export const listAllLeaves = () => {
  return axios.get(BASE_URL + "/all", {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("userDetails")).token}`,
    },
  });
};

export const listLeavesByUsername = (username) => {
  return axios.get(BASE_URL + "/all/" + username, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("userDetails")).token}`,
    },
  });
};

export const getLeaveDetailsById = (id) => {
  return axios.get(BASE_URL + "/" + id, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("userDetails")).token}`,
    },
  });
};

export const updateLeaveStatus = (id, leaveData) => {
  return axios.put(BASE_URL + "/" + id, leaveData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("userDetails")).token}`,
    },
  });
};
