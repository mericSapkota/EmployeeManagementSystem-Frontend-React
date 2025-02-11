import React, { useEffect, useState } from "react";
import { addEmployees, getEmployee, updateEmployee } from "../../service/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeComponent = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
  });

  const navigator = useNavigate();
  const {id}= useParams();
  const [errorMsg, setErrorMsg] = useState(
    {
      firstName: "",
      lastName: "",
      age: "",
      email: "",
    }
  );

  useEffect(()=>{
    if(id){
      getEmployee(id).then((response)=>{
        
        setUserDetails({...userDetails,firstName:response.data.firstName,
          lastName:response.data.lastName,
          email:response.data.email,
          age:response.data.age
        });
       
      }).catch(error=>{
        console.error(error);
      })
    }
  },[id]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };


  function submitForm(e) {
    e.preventDefault();
    if (validateForm()) {
      addEmployees(userDetails).then((response) => {
        console.log(response.data);
        navigator("/");
      });
    }
  }
  function updateForm(e){
    e.preventDefault();
    if(validateForm()){
      updateEmployee(id,userDetails).then((response)=>{
        console.log(response.data);
        navigator("/");
      }).catch(error=>{
        console.error(error);
      })
    }
  }  

  function validateForm() {
      let valid = true;
      
      const errorCopy = { ...errorMsg };
      if (userDetails.firstName.trim()) {
        errorCopy.firstName = "";
      } else {
        valid = false;
        errorCopy.firstName = "First Name cannot be null";
      }
      if (userDetails.lastName.trim()) {
        errorCopy.lastName = "";
      } else {
        valid = false;
        errorCopy.lastName = "Last Name cannot be empty";
      }
      if (userDetails.age) {
        errorCopy.age = "";
      } else {
        valid = false;
        errorCopy.age = "Age cannot be empty";
      }
      if (userDetails.email.trim()) {
        errorCopy.email = "";
      } else {
        valid = false;
        errorCopy.email = "Email cannot be empty";
      }
      setErrorMsg(errorCopy);
      return valid;
    }
  

  function updateTitle(){
    if(id){
       return <h2 className="text-center">Update Employee</h2>
    }
    else{
       return <h2 className="text-center">Add Employee</h2>
    }
  }


  return (
    <div className="container container-fluid mt-5 position-relative">
      <div className="row d-flex justify-content-center">
        {updateTitle()}
        <div className=" card w-50 p-3 ">
          <form className=" ">
            <label className="form-label">First Name</label>
            <input
              value={userDetails.firstName}
              placeholder="First Name"
              name="firstName"
              onChange={handleInput}
              className={`form-control ${
                errorMsg.firstName ? "is-invalid" : ""
              } `}
            ></input>
            {errorMsg.firstName ? (
              <div className="invalid-feedback">{errorMsg.firstName}</div>
            ) : (
              <div></div>
            )}
            <label className="form-label">Last Name</label>
            <input
              value={userDetails.lastName}
              className={`form-control ${
                errorMsg.lastName ? "is-invalid" : ""
              } `}
              onChange={handleInput}
              name="lastName"
              placeholder="Last Name"
            ></input>
            {errorMsg.lastName ? (
              <div className="invalid-feedback">{errorMsg.lastName}</div>
            ) : (
              ""
            )}
            <label className="form-label">Email</label>
            <input
              value={userDetails.email}
              className={`form-control ${
                errorMsg.email ? "is-invalid" : ""
              } `}
              name="email"
              onChange={handleInput}
              placeholder="Email"
            ></input>
            {errorMsg.email ? (
              <div className="invalid-feedback">{errorMsg.email}</div>
            ) : (
              ""
            )}
            <label className="form-label">Age</label>
            <input
              value={userDetails.age}
               className={`form-control ${
                errorMsg.age ? "is-invalid" : ""
              } `}
              name="age"
              onChange={handleInput}
              placeholder="Age"
            ></input>
            {errorMsg.age ? (
              <div className="invalid-feedback">{errorMsg.age}</div>
            ) : (
              ""
            )}
            <br></br>
            <button className="btn btn-primary" onClick={id? updateForm : submitForm}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
