import React, { useEffect, useState } from "react";

import { getAllAnnouncements, saveAnnouncement } from "../../service/AnnouncementService";
import { getImage } from "../../service/ImageService";
import { TextField, Button, IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import Announcements from "../announcements";

const AdminPanel = ({ userDetails }) => {
  const username = userDetails.username;
  const firstName = userDetails.firstName;
  const lastName = userDetails.lastName;
  const role = userDetails.role;

  const [announcements, setAnnouncements] = useState([]);

  const fetchAnnouncements = async () => {
    const response = await getAllAnnouncements();
    response.data
      // .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map((announcement) => {
        announcement.postedImage = getImage(announcement.postedImage);
        announcement.posterImage = getImage(announcement.posterImage);
        return announcement;
      });
    setAllAnnouncements(response.data);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const [allAnnouncements, setAllAnnouncements] = useState([]);

  let image = announcements.file ? URL.createObjectURL(announcements.file) : null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnnouncements({ ...announcements, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAnnouncements({ ...announcements, file: file });
  };

  const postAnnouncement = async (e) => {
    e.preventDefault();
    announcements.username = username;
    const response = await saveAnnouncement(announcements);
    fetchAnnouncements();
    setAnnouncements({});
    console.log("Announcement posted", response);
  };

  function autoResize() {
    const textarea = document.querySelector(".mytext");
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  return (
    <>
      <div className="container pt-4">
        <div className="row">
          <div className="main pb-5 col-12 bg-light d-flex flex-column gap-2 justify-content-center align-items-center">
            <div className="">
              <h3>
                Welcome {firstName} {lastName} to Employee Management System
              </h3>
            </div>

            <div
              className="card shadow-sm mx-auto p-3"
              style={{ maxWidth: "100vw", maxHeight: "600px", minHeight: "300px", overflowY: "auto" }}
            >
              <div className="card-body">
                <h5 className="card-title text-center">Announcements</h5>

                {role === "ADMIN" && (
                  <form encType="multipart/form-data" style={{ padding: "1rem" }}>
                    {/* Textarea Input */}
                    <TextField
                      name="content"
                      multiline
                      rows={2}
                      fullWidth
                      className="w-100"
                      variant="outlined"
                      placeholder="What's on your mind?"
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                    />

                    {/* File Upload with Icon */}
                    <label htmlFor="file-upload">
                      <input
                        id="file-upload"
                        name="file"
                        type="file"
                        accept=".jpg, .png"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                      <IconButton color="primary" component="span">
                        <PhotoCamera />
                      </IconButton>
                      <span className="text-truncate d-inline-block" style={{ maxWidth: "150px" }}>
                        {announcements.file ? announcements.file.name : "Upload Image"}
                      </span>
                      {announcements.file && <img src={image} style={{ height: "100px", width: "100px" }} alt="" />}
                    </label>

                    {/* Submit Button */}
                    <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={postAnnouncement}>
                      Post
                    </Button>
                  </form>
                )}

                <Announcements allAnnouncements={allAnnouncements} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
