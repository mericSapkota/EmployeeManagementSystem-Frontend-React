import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import ListEmployee from "./components/admin/ListEmployee";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import EmployeeComponent from "./components/admin/EmployeeComponent";
import AdminPanel from "./components/admin/AdminPanel";
import { useEffect, useState } from "react";

import ListLeave from "./components/admin/ListLeave";
import LeaveComponent from "./components/user/LeaveComponent";
import Login from "./components/login";
import UserPanel from "./components/user/UserPanel";

function App() {
  const [navOn, setNavOn] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const showNavBar = () => {
    const navbar = document.querySelector(".sidebar");
    navbar.classList.toggle("d-none");

    setNavOn(!navOn);
  };

  const [userDetails, setUserDetails] = useState(() => {
    const user = localStorage.getItem("userDetails");
    return user
      ? JSON.parse(user)
      : {
          token: null,
          firstName: "",
          lastName: "",
          email: "",
          role: "",
          username: "",
          image: null,
        };
  });

  useEffect(() => {
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
  }, [userDetails]);

  return (
    <>
      <BrowserRouter>
        <Header
          showNavBar={showNavBar}
          setLoggedIn={setLoggedIn}
          setUserDetails={setUserDetails}
          userDetails={userDetails}
        />
        <Routes>
          <Route
            path="/"
            element={<Login setAfterLogin={setUserDetails} setLoggedIn={setLoggedIn} afterLogin={userDetails} />}
          ></Route>

          {userDetails.role === "ADMIN" ? (
            <Route path="/admin" element={<AdminPanel showNavBar={showNavBar} userDetails={userDetails} />}></Route>
          ) : (
            <Route path="/user" element={<UserPanel userDetails={userDetails} showNavBar={showNavBar} />}></Route>
          )}
          <Route path="/list-employee" element={<ListEmployee showNavBar={showNavBar} />}></Route>
          <Route path="/add-employee" element={<EmployeeComponent />}></Route>
          <Route path="/update-employee/:id" element={<EmployeeComponent />}></Route>
          <Route path="/list-leave" element={<ListLeave showNavBar={showNavBar} />}></Route>
          <Route path="/add-leave" element={<LeaveComponent />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
