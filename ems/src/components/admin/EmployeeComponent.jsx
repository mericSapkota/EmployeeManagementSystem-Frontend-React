import React, { useEffect, useState } from "react";
import { addEmployees, getEmployee, updateEmployee } from "../../service/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";
import { getImage } from "../../service/ImageService";
import { Alert, Button, IconButton, Snackbar } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

import CloseIcon from "@mui/icons-material/Close";

const EmployeeComponent = ({ setAfterLogin, afterLogin, setReload, updateUserDetails }) => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    password: "",
    username: "",
    role: null,
    image: null,
  });
  const [uploadedImage, setUploadedImage] = useState();
  const [open, setOpen] = React.useState(false);

  const navigator = useNavigate();
  const { id } = useParams();
  const [errorMsg, setErrorMsg] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
  });

  const fetchEmployee = () => {
    getEmployee(id)
      .then((response) => {
        setUserDetails({
          ...userDetails,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          age: response.data.age,
          username: response.data.username,
          file: response.data.file,
          image: getImage(response.data.image),
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (id) {
      fetchEmployee(id);
    }
  }, [id]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleFileChange = (e) => {
    const image = e.target.files[0];
    setUserDetails({ ...userDetails, file: image });
    setUploadedImage(URL.createObjectURL(image));
  };
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  async function submitForm(e) {
    e.preventDefault();
    if (validateForm()) {
      const response = await addEmployees(userDetails);
      handleClick();
      setUserDetails({});
    }
  }
  function updateForm(e) {
    e.preventDefault();
    if (validateForm()) {
      console.log(userDetails);
      updateEmployee(id, userDetails)
        .then((response) => {
          handleClick();
          if (afterLogin.role != "ADMIN") {
            updateUserDetails(response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  function validateForm() {
    let valid = true;

    const errorCopy = { ...errorMsg };
    if (userDetails.firstName.trim()) {
      errorCopy.firstName = "";
    } else {
      valid = false;
      errorCopy.firstName = "First Name cannot be null";
    }
    if (userDetails.lastName.trim()) {
      errorCopy.lastName = "";
    } else {
      valid = false;
      errorCopy.lastName = "Last Name cannot be empty";
    }
    if (userDetails.age) {
      errorCopy.age = "";
    } else {
      valid = false;
      errorCopy.age = "Age cannot be empty";
    }
    if (userDetails.email.trim()) {
      errorCopy.email = "";
    } else {
      valid = false;
      errorCopy.email = "Email cannot be empty";
    }
    if (userDetails.password.trim()) {
      errorCopy.password = "";
    } else {
      valid = false;
      errorCopy.password = "Password cannot be empty";
    }
    setErrorMsg(errorCopy);
    return valid;
  }

  function updateTitle() {
    if (id) {
      return <h2 className="text-center">Update Employee</h2>;
    } else {
      return <h2 className="text-center">Add Employee</h2>;
    }
  }

  return (
    <div className="container container-fluid mt-5 mb-5  position-relative overflow-auto " style={{ height: "600px" }}>
      <div className="row d-flex h-auto justify-content-center  ">
        {updateTitle()}
        <div className=" card w-50 p-3 ">
          <form encType="multipart/form-data" className=" ">
            <label className="form-label">First Name</label>
            <input
              value={userDetails.firstName}
              placeholder="First Name"
              name="firstName"
              onChange={handleInput}
              className={`form-control ${errorMsg.firstName ? "is-invalid" : ""} `}
            ></input>
            {errorMsg.firstName ? <div className="invalid-feedback">{errorMsg.firstName}</div> : <div></div>}
            <label className="form-label">Last Name</label>
            <input
              value={userDetails.lastName}
              className={`form-control ${errorMsg.lastName ? "is-invalid" : ""} `}
              onChange={handleInput}
              name="lastName"
              placeholder="Last Name"
            ></input>
            {errorMsg.lastName ? <div className="invalid-feedback">{errorMsg.lastName}</div> : ""}
            <label className="form-label">Email</label>
            <input
              value={userDetails.email}
              className={`form-control ${errorMsg.email ? "is-invalid" : ""} `}
              name="email"
              onChange={handleInput}
              placeholder="Email"
            ></input>
            {errorMsg.email ? <div className="invalid-feedback">{errorMsg.email}</div> : ""}
            <label className="form-label">Age</label>
            <input
              value={userDetails.age}
              className={`form-control ${errorMsg.age ? "is-invalid" : ""} `}
              name="age"
              onChange={handleInput}
              placeholder="Age"
            />
            {errorMsg.age ? <div className="invalid-feedback">{errorMsg.age}</div> : ""}
            <br></br>
            <label className="form-label">Username</label>
            <input
              value={userDetails.username}
              onChange={handleInput}
              placeholder="username"
              name="username"
              className={`form-control ${errorMsg.age ? "is-invalid" : ""} `}
            />
            {errorMsg.username ? <div className="invalid-feedback">{errorMsg.username}</div> : ""}
            <br />
            <label className="form-label">Password</label>
            <input
              value={userDetails.password}
              onChange={handleInput}
              placeholder="password"
              name="password"
              className={`form-control ${errorMsg.age ? "is-invalid" : ""} `}
            />
            {errorMsg.password ? <div className="invalid-feedback">{errorMsg.password}</div> : ""}
            <label className="Select Role"></label>
            <select name="role" onChange={handleInput} className="form-select">
              <option value="ADMIN">Admin</option>
              <option value="EMPLOYEE">Employee</option>
            </select>
            <br />
            <label htmlFor="file-upload">
              <input
                id="file-upload"
                name="image"
                type="file"
                accept=".jpg, .png"
                style={{ display: "none" }}
                onChange={handleFileChange}
                required
                className="d-none"
              />
              <IconButton color="primary" component="span">
                <PhotoCamera />
              </IconButton>
              <span>{userDetails.file ? userDetails.file.name : "Upload Image"}</span>
              {uploadedImage ? (
                <img src={uploadedImage} style={{ height: "100px", width: "100px" }} />
              ) : (
                userDetails.image && <img src={userDetails.image} style={{ height: "100px", width: "100px" }} />
              )}
            </label>

            <button className="btn btn-primary" onClick={id ? updateForm : submitForm}>
              Submit
            </button>
          </form>
          <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} action={action}>
            <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: "100%" }}>
              {id ? `Succesfully Updated Employee !` : `Succesfully Added Employee !`}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
