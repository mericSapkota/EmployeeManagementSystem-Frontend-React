import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addLeave, getLeaveDetailsById } from "../../service/LeaveService";

const LeaveComponent = ({ userDetails }) => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [leaveDetails, setLeaveDetails] = useState({
    leaveReason: "",
    startDate: "",
    endDate: "",
    empId: userDetails.id,
    status: "PENDING",
  });

  const getLeaveById = async (id) => {
    console.log("in empcompe");
    const response = await getLeaveDetailsById(id);
    console.log(response.data);
    setLeaveDetails(response.data);
  };

  useEffect(() => {
    if (id) {
      console.log("id", id);
      getLeaveById(id);
    }
  }, [id]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setLeaveDetails({ ...leaveDetails, [name]: value });
  };

  const submitLeave = (e) => {
    e.preventDefault();
    console.log(leaveDetails);
    addLeave(leaveDetails)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => console.error(e));
    navigate("/list-leave");
  };

  const updateLeave = (e) => {
    e.preventDefault();
    console.log(leaveDetails);
    addLeave(leaveDetails)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => console.error(e));
    navigate("/list-leave");
  };
  return (
    <>
      <div className="component-sm component-fluid">
        <h2 className="text-center">Leave Management</h2>
        <div className="container-sm">
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">From Date</label>
              <input
                type="date"
                name="startDate"
                className="form-control"
                value={leaveDetails.startDate}
                onChange={handleInput}
                id="inputFromDate"
              ></input>
            </div>
            <div className="col-md-6">
              <label className="form-label">To Date</label>
              <input
                type="date"
                name="endDate"
                onChange={handleInput}
                className="form-control"
                value={leaveDetails.endDate}
                id="inputToDate"
              ></input>
            </div>
            <div className="col-md-12">
              <label className="form-label">Reason</label>
              <input
                type="text"
                name="leaveReason"
                onChange={handleInput}
                value={leaveDetails.leaveReason}
                className="form-control"
                id="inputReason"
              ></input>
            </div>
            <div className="col-12">
              <button type="submit" onClick={id ? updateLeave : submitLeave} className="btn btn-primary">
                Apply Leave
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LeaveComponent;
