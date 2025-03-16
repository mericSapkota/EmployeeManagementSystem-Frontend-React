import React, { useEffect, useState } from "react";
import { listAllLeaves, addLeave, updateLeaveStatus, listLeavesByUsername } from "../../service/LeaveService";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Button } from "@mui/material";

const ListLeave = ({ userDetails }) => {
  const [leaveList, setLeaveList] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [open, setOpen] = React.useState(false);
  const role = userDetails.role;
  const username = userDetails.username;
  const [status, setStatus] = useState("PENDING");
  const navigator = useNavigate();

  useEffect(() => {
    getListLeave();
  }, []);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  const getListLeave = async () => {
    if (role == "ADMIN") {
      try {
        const response = await listAllLeaves();
        setLeaveList(response.data);
      } catch (e) {
        console.error("Unable to fetch data from server", e);
      }
    } else {
      const response = await listLeavesByUsername(username);

      setLeaveList(response.data);
    }
  };

  const addLeaveButton = () => {
    navigator("/add-leave");
  };

  const updateLeave = (id) => {
    if (role === "EMPLOYEE") {
      navigator("/update-leave/" + id);
    } else {
      updateLeaveStatus(id, { status })
        .then((response) => {
          console.log(response.data);
          setUpdated(true);
          handleClick();
          getListLeave();
        })
        .catch((e) => console.error(e));
    }
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
    <>
      <div className="container-sm table-responsive p-3">
        <h2 className="text-center">List of Leaves</h2>
        <button className="btn btn-primary mb-2" onClick={addLeaveButton}>
          Apply For Leave
        </button>
        {updated && <p className="text-success fw-bold">Succesfully Edited!</p>}
        <p className="text-center">Total Leaves: {leaveList.length}</p>
        <table className="w-100 table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th>Leave Id</th>
              <th>Employee Id</th>

              <th>Leave FromDate</th>
              <th>Leave ToDate</th>
              <th>Leave Reason</th>
              <th>Leave Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leaveList.map((leave) => (
              <tr key={leave.id}>
                <td>{leave.id}</td>
                <td>{leave.empId}</td>

                <td>{leave.startDate}</td>
                <td>{leave.endDate}</td>
                <td>{leave.leaveReason}</td>
                <td>
                  <select
                    defaultValue={leave.status}
                    disabled={role === "ADMIN" ? false : true}
                    onChange={handleChange}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>
                </td>
                <td>
                  <button className="btn btn-info" onClick={() => updateLeave(leave.id)}>
                    Update
                  </button>
                  <button className="btn btn-danger ms-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} action={action}>
        <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: "100%" }}>
          Succesfully Changed Leave Status !
        </Alert>
      </Snackbar>
    </>
  );
};

export default ListLeave;
