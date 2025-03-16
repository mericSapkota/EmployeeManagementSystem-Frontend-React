import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSalaryList } from "../../service/SalaryService";

const ListSalary = () => {
  const navigator = useNavigate();

  const [salary, setSalary] = useState([]);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    fetchSalaryList();
  }, []);

  const fetchSalaryList = async () => {
    try {
      const response = await getSalaryList();
      console.log(response.data);
      setSalary(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const addSalary = () => {
    navigator("/addSalary");
  };

  return (
    <div className="container-sm table-responsive p-3">
      <h2 className="text-center">List of Salaries</h2>
      <button className="btn btn-primary mb-2" onClick={addSalary}>
        Apply To issue Salary
      </button>
      {updated && <p className="text-success fw-bold">Succesfully Edited!</p>}
      <p className="text-center">Total Salaries: {salary.length}</p>
      <table className="w-100 table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th>Employee username</th>

            <th>Salary Amount</th>
            <th>Tax %</th>
            <th>Last salary issued Date</th>
            <th>Total Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {salary.map((s) => (
            <tr key={s.id}>
              <td>{s.username}</td>
              <td>{s.salary}</td>
              <td>{s.tax}</td>
              <td>{s.date}</td>
              <td>{s.total}</td>

              <td>
                <button className="btn btn-danger ms-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListSalary;
