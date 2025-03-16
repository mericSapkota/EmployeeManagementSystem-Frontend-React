import axios from "axios";

const API_URL = "http://localhost:8080/api/announcements";

export const saveAnnouncement = (announcement) => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const token = userDetails.token;
  [{ ...announcement, username: userDetails.username }];
  return axios.post(API_URL, announcement, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllAnnouncements = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const token = userDetails?.token;
  return axios.get(API_URL + "/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
