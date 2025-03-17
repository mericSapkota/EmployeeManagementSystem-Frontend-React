import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteSalaryRecord, getSalaryByUsername, getSalaryList } from "../../service/SalaryService";
import { Alert, Button, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FilterSearch from "../../service/util";

const ListSalary = ({ userDetails }) => {
  const navigator = useNavigate();

  const [salary, setSalary] = useState([]);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredStatus, setFilteredStatus] = useState(false);
  const [filterdSalary, setFilteredSalary] = useState([]);
  const salaryToDisplay = filteredStatus ? filterdSalary : salary;

  useEffect(() => {
    if (userDetails.role === "ADMIN") {
      fetchSalaryList();
    } else {
      async function getSalaryPerPerson() {
        const response = await getSalaryByUsername(userDetails.username);
        setSalary(response.data);
      }
      getSalaryPerPerson();
    }
  }, []);

  useEffect(() => {
    if (userDetails.role === "ADMIN") {
      FilterSearch(query, setFilteredStatus, salary, setFilteredSalary);
    } else {
      if (query.trim().length > 1) {
        setFilteredStatus(true);
      } else {
        setFilteredStatus(false);
      }
      const filtered = salary.filter((s) => s.date.includes(query));
      setFilteredSalary(filtered);
    }
  }, [query]);

  const fetchSalaryList = async () => {
    try {
      const response = await getSalaryList();

      setSalary(response.data);
    } catch (e) {
      console.log(e);
    }
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

  const deleteSalary = async (salary) => {
    await deleteSalaryRecord(salary);
    handleClick();
    fetchSalaryList();
  };

  const addSalary = () => {
    navigator("/addSalary");
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
    <div className="container-sm table-responsive p-3">
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} action={action}>
        <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: "100%" }}>
          Succesfully Deleted Salary
        </Alert>
      </Snackbar>

      <h2 className="text-center">List of Salaries</h2>
      {userDetails.role === "ADMIN" && (
        <button className="btn btn-primary mb-2" onClick={addSalary}>
          Apply To issue Salary
        </button>
      )}
      <br></br>
      <label className="form-label">
        Search Salary By {userDetails.role === "ADMIN" ? `username &nbsp;` : "date Eg: (2024-02-02)"}{" "}
      </label>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Enter value"></input>

      <p className="text-center">Total Salaries: {salary.length}</p>
      <table className="w-100 table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th>Employee username</th>

            <th>Salary Amount</th>
            <th>Tax %</th>
            <th>Last salary issued Date</th>
            <th>Total Amount</th>
            {userDetails.role === "ADMIN" && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {salaryToDisplay.map((s) => (
            <tr key={s.id}>
              <td>{s.username}</td>
              <td>{s.salary}</td>
              <td>{s.tax}</td>
              <td>{s.date}</td>
              <td>{s.total}</td>

              {userDetails.role === "ADMIN" && (
                <td>
                  <button onClick={() => deleteSalary(s)} className="btn btn-danger ms-2">
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListSalary;
