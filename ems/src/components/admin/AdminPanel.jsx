import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { getAllAnnouncements, saveAnnouncement } from "../../service/AnnouncementService";

const AdminPanel = ({ showNavBar, userDetails }) => {
  const username = userDetails.username;

  const [announcements, setAnnouncements] = useState({
    username: username,
    content: "",
    file: null,
  });

  const fetchAnnouncements = async () => {
    const response = await getAllAnnouncements();
    console.log("All announcements", response);
  };
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const [allAnnouncements, setAllAnnouncements] = useState([]);

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
    console.log("Stored token:", localStorage.getItem("token"));

    const response = await saveAnnouncement(announcements);
    console.log("Announcement posted", response);
  };

  function autoResize() {
    const textarea = document.querySelector(".mytext");
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  return (
    <>
      <div className="container vh-100">
        <div className="row">
          <div className="main pb-5 col-12 bg-light d-flex flex-column gap-5 justify-content-center align-items-center">
            <div className="">
              <h3>Welcome to Employee Management System</h3>
            </div>

            <div className="card  overflow-auto" style={{ width: 38 + "rem", height: "500px" }}>
              <div className="card-body">
                <h5 className="card-title">Announcements</h5>
                <form encType="multipart/form-data">
                  <div className="d-flex flex-column gap-2 mb-2" style={{ maxHeight: 200 + "px" }}>
                    <textarea
                      name="content"
                      type="textarea"
                      className="mytext mh-50 mh-100 mw-100"
                      onInput={autoResize}
                      rows={2}
                      onChange={handleInputChange}
                      placeholder={` What's on your mind? `}
                    ></textarea>
                  </div>
                  <label>Upload Image</label>
                  <input name="file" onChange={handleFileChange} type="file" accept=".jpg, .png" />
                  <br></br>
                  <Button variant="outlined" className="mt-4 mb-4 w-100" onClick={postAnnouncement}>
                    Post
                  </Button>
                </form>

                <div>
                  <div className="card">
                    <div className="card-body">
                      <h7 className="card-title">Annoucments</h7>
                      {allAnnouncements.map((announcement) => (
                        <div className="card">
                          <div className="card-body">
                            <div className="card-title d-flex flex-column ">
                              <h5>Admin</h5>
                              <div className="d-flex  gap-2">
                                <h7 className="text-muted">4:30 pm</h7>
                                <h7 className="text-muted">2024-05-12</h7>
                              </div>
                            </div>

                            <p className="">Hey this is our fist post</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
