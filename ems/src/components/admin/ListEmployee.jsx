import React, { useEffect, useState } from "react";
import { deleteEmployeeById, listEmployees } from "../../service/EmployeeService";
import { useNavigate } from "react-router-dom";

const ListEmployee = ({}) => {
  const [employees, setEmployees] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    listEmployee();
  }, []);

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
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="container-sm table-responsive p-3">
      <h2 className="text-center">List of Employees</h2>
      <button className="btn btn-primary mb-2" onClick={createEmployee}>
        Add Employees
      </button>
      <table className="w-100  table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Employee First Name</th>
            <th>Employee Last Name</th>
            <th>Empoloyee Email</th>
            <th>Employee Age</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
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
