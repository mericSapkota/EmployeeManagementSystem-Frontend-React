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
import ListSalary from "./components/user/ListSalary";

function App() {
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
          id: null,
        };
  });

  useEffect(() => {
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
  }, [userDetails]);

  return (
    <div id="root">
      <BrowserRouter>
        <Header setUserDetails={setUserDetails} userDetails={userDetails} />
        <Routes>
          <Route path="/" element={<Login setAfterLogin={setUserDetails} afterLogin={userDetails} />}></Route>
          <Route path="/home" element={<AdminPanel userDetails={userDetails} />}></Route>
          <Route path="/list-employee" element={<ListEmployee userDetails={userDetails} />}></Route>
          <Route path="/add-employee" element={<EmployeeComponent />}></Route>
          <Route
            path="/update-employee/:id"
            element={<EmployeeComponent afterLogin={userDetails} setAfterLogin={setUserDetails} />}
          ></Route>
          <Route path="/list-leave" element={<ListLeave userDetails={userDetails} />}></Route>
          <Route path="/update-leave/:id" element={<LeaveComponent userDetails={userDetails} />}></Route>
          <Route path="/add-leave" element={<LeaveComponent userDetails={userDetails} />}></Route>
          <Route path="/list-salary" element={<ListSalary userDetails={userDetails} />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
