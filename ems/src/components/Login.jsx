import React, { useState, useEffect } from "react";
import { login } from "../service/EmployeeService";
import { useNavigate } from "react-router-dom";

const Login = ({ afterLogin, setAfterLogin }) => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await login(userDetails);
      setAfterLogin({
        token: response.data.token,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        role: response.data.role,
        username: response.data.username,
        image: response.data.image,
        id: response.data.id,
      });

      navigate("/home");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  useEffect(() => {
    console.log("After login", afterLogin);
  }, [afterLogin]);

  return (
    <div>
      <div className="container-fluid  m-5" style={{ height: "80vh" }}>
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src="/draw2.webp" className="img-fluid" alt="Sample image" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form>
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                <button
                  type="button"
                  data-mdb-button-init=""
                  data-mdb-ripple-init=""
                  className="btn btn-primary btn-floating mx-1"
                >
                  <i className="fab fa-facebook-f" />
                </button>
                <button
                  type="button"
                  data-mdb-button-init=""
                  data-mdb-ripple-init=""
                  className="btn btn-primary btn-floating mx-1"
                >
                  <i className="fab fa-twitter" />
                </button>
                <button
                  type="button"
                  data-mdb-button-init=""
                  data-mdb-ripple-init=""
                  className="btn btn-primary btn-floating mx-1"
                >
                  <i className="fab fa-linkedin-in" />
                </button>
              </div>
              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Or</p>
              </div>
              <div data-mdb-input-init="" className="form-outline mb-4">
                <input
                  onChange={handleInput}
                  name="username"
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter a username"
                />
                <label className="form-label" htmlFor="form3Example3">
                  {" "}
                  Username{" "}
                </label>
              </div>
              <div data-mdb-input-init="" className="form-outline mb-3">
                <input
                  onChange={handleInput}
                  name="password"
                  type="password"
                  id="form3Example4"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                />
                <label className="form-label" htmlFor="form3Example4">
                  {" "}
                  Password{" "}
                </label>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input className="form-check-input me-2" type="checkbox" defaultValue="" id="form2Example3" />
                  <label className="form-check-label" htmlFor="form2Example3">
                    {" "}
                    Remember me{" "}
                  </label>
                </div>
                <a href="#!" className="text-body">
                  {" "}
                  Forgot password?{" "}
                </a>
              </div>
              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="button"
                  data-mdb-button-init=""
                  data-mdb-ripple-init=""
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  onClick={submitForm}
                >
                  Login
                </button>
                {/* <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{"{"}" "{"}"}
                    <a href="#!" className="link-danger">
                      {" "}
                      Register{" "}
                    </a>
                  </p> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
