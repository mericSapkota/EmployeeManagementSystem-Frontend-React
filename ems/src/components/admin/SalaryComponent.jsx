import React, { useEffect, useState } from "react";
import { addSalaryByUsername, getAllUsername } from "../../service/SalaryService";
import { useNavigate } from "react-router-dom";
import { Alert, Button, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const SalaryComponent = ({ userDetails }) => {
  const [salary, setSalary] = useState({
    username: "",
    date: "",
    salary: "",
    tax: "15",
    total: "",
  });
  const [usernames, setUsernames] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  let taxAmount = (salary.tax / 100) * salary.salary;
  let totalAmount = salary.salary - taxAmount;

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      const responses = await getAllUsername();
      setUsernames(responses.data);
    }
    fetchData();
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;

    setSalary((prev) => ({ ...prev, [name]: value }));
  };
  const submitForm = (e) => {
    e.preventDefault();
    console.log(totalAmount);
    const updateSalary = () => {
      return { ...salary, total: totalAmount };
    };
    const updatedSalary = updateSalary();
    console.log(updatedSalary);
    const response = addSalaryByUsername(updatedSalary);
    console.log(response);
    handleClick();
    setTimeout(() => navigate("/list-salary"), 3000);
  };
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

  return (
    <div>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} action={action}>
        <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: "100%" }}>
          Succesfully Provided Salary
        </Alert>
      </Snackbar>
      <div className="component-sm component-fluid mt-5">
        <h2 className="text-center">Salary Management</h2>
        <div className="container-sm">
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">To whom username</label>
              <br></br>
              <select name="username" className="form-control" onChange={handleInput}>
                {usernames.map((username, index) => (
                  <option key={index} value={username}>
                    {username}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Date of Issue</label>
              <input
                type="date"
                name="date"
                className="form-control"
                value={salary.date}
                onChange={handleInput}
                id="inputFromDate"
              ></input>
            </div>
            <div className="col-md-6">
              <label className="form-label">Salary Amount</label>
              <input
                type="text"
                name="salary"
                onChange={handleInput}
                className="form-control"
                value={salary.salary}
              ></input>
            </div>
            <div className="col-md-6">
              <label className="form-label">Tax in %</label>
              <input
                type="number"
                name="tax"
                onChange={handleInput}
                className="form-control"
                value={salary.tax}
              ></input>
            </div>
            <div className="col-md-6">
              <p>Total Tax:${taxAmount}</p>
              <p>Total Amount : ${salary.salary ? totalAmount : ""}</p>
            </div>

            <div className="col-12">
              <button type="submit" onClick={submitForm} className="btn btn-primary">
                Submit Salary
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SalaryComponent;
