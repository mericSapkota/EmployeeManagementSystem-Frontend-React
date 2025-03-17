import React, { useEffect, useState } from "react";
import { deleteEmployeeById, listEmployees } from "../../service/EmployeeService";
import { useNavigate } from "react-router-dom";
import FilterSearch from "../../service/util";

import { Alert, Button, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const ListEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const navigator = useNavigate();
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(false);
  const [filteredEmp, setFilteredEmp] = useState([]);
  const [open, setOpen] = useState(true);
  let employeesToRender = filtered ? filteredEmp : employees;

  useEffect(() => {
    listEmployee();
  }, []);

  useEffect(() => {
    FilterSearch(query, setFiltered, employees, setFilteredEmp);
  }, [query]);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const listEmployee = () => {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const createEmployee = () => {
    navigator("/add-employee");
  };
  const updateEmployee = (id) => {
    navigator(`/update-employee/${id}`);
  };
  const deleteEmployee = (id) => {
    deleteEmployeeById(id)
      .then((response) => {
        listEmployee();
        handleClick();
      })
      .catch((error) => {
        console.error(error);
      });
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
    <div className="container-sm table-responsive p-3" style={{ maxHeight: "600px", overflowY: "auto" }}>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} action={action}>
        <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: "100%" }}>
          Succesfully Deleted Salary
        </Alert>
      </Snackbar>

      <h2 className="text-center">List of Employees</h2>
      <button className="btn btn-primary mb-2" onClick={createEmployee}>
        Add Employees
      </button>
      <br></br>
      <label className="form-label">Search Employee By username &nbsp; </label>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Enter username"></input>
      <table className="w-100  table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Employee First Name</th>
            <th>Employee Last Name</th>
            <th>Username</th>
            <th>Empoloyee Email</th>
            <th>Employee Age</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employeesToRender.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.username}</td>
              <td>{employee.email}</td>
              <td>{employee.age}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => {
                    updateEmployee(employee.id);
                  }}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => {
                    deleteEmployee(employee.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployee;
