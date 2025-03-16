import React, { useEffect } from "react";

const UserPanel = ({ userDetails }) => {
  console.log("User details", userDetails);
  const { firstName, lastName, email, role, username } = userDetails;
  useEffect(() => {}, []);
  return (
    <div>
      <div className="container vh-100">
        <div className="row">
          <div className="main pb-5 col-12 bg-light d-flex flex-column gap-5 justify-content-center align-items-center">
            <div className="">
              <h3>
                Welcome{" "}
                <span className="text-primary">
                  {firstName} {lastName}
                </span>{" "}
                to Employee Management System
              </h3>
            </div>

            <div className="card overflow-auto" style={{ width: "38rem", height: "500px" }}>
              <div className="card-body">
                <h5 className="card-title">Announcements</h5>

                <div>
                  <div className="card">
                    <div className="card-body">
                      <div className="card">
                        <div className="card-body">
                          <div className="card-title d-flex flex-column">
                            <h5>Admin</h5>
                            <div className="d-flex gap-2">
                              <h6 className="text-muted">4:30 pm</h6>
                              <h6 className="text-muted">2024-05-12</h6>
                            </div>
                          </div>

                          <p className="">Hey this is our first post</p>
                        </div>
                      </div>

                      <div className="card mt-3">
                        <div className="card-body">
                          <h6 className="card-title">Admin</h6>
                          <p className="time">4:30 pm</p>
                          <p className="date">2024-05-12</p>
                          <p className="">Hey this is our second post</p>
                        </div>
                      </div>

                      <div className="card mt-3">
                        <div className="card-body">
                          <div className="card-title">Admin</div>
                          <p className="time">4:30 pm</p>
                          <p className="date">2024-05-12</p>
                          <p className="">Hey this is our second post</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
