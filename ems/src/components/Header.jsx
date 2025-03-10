import React from "react";
import { useNavigate } from "react-router-dom";
import { getImage } from "../service/ImageService";

const Header = ({ showNavBar, userDetails, setUserDetails }) => {
  const image = userDetails.image;
  const navigator = useNavigate();

  const processedImage = getImage(image);

  const goToEmpDetails = () => {
    showNavBar();
    navigator("/list-employee");
  };
  const goToLeaveDetails = () => {
    showNavBar();
    navigator("/list-leave");
  };
  const goToHome = () => {
    showNavBar();
    navigator("/");
  };

  const logout = () => {
    localStorage.removeItem("userDetails");
    setUserDetails({});
    navigator("/");
  };

  return (
    <nav className="navbar bg-body-tertiary position-relative ">
      <div className="vh-100 d-none sidebar position-absolute z-1 top-0 start-0 bg-body-tertiary p-2  col-3">
        <div className="d-flex justify-content-between position-relative">
          <h5>Navbar</h5>
          <i onClick={showNavBar} className="fa fa-times position-absolute end-0 " aria-hidden="true"></i>
        </div>
        <hr></hr>
        <div>
          <h5>Go To </h5>
          <button class="btn btn-secondary mb-1" onClick={goToHome}>
            Home
          </button>
          <br></br>
          <button className="btn btn-secondary mb-1" onClick={goToEmpDetails}>
            Employee Details
          </button>
          <br></br>
          <button className="btn btn-secondary mb-1" onClick={goToLeaveDetails}>
            {" "}
            Leave Details
          </button>
        </div>
      </div>
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" onClick={showNavBar}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="#">
          Employee Management System
        </a>
        {userDetails.token && (
          <div>
            <button className="btn">
              {image ? (
                <img src={processedImage} style={{ height: "40px", width: "40px" }} />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  class="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path
                    fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                  />
                </svg>
              )}
            </button>
            <button className="btn btn-primary" onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
