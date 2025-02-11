import React from 'react'
import { useNavigate } from 'react-router-dom';


const Header = ({showNavBar}) => {

    const navigator = useNavigate();

    const goToEmpDetails = ()=>{
        navigator("/list-employee");
    }
    const goToLeaveDetails=()=>{
        navigator("/list-leave");
    }
    const goToHome=()=>{
        navigator("/")
    }


    
  return (
    <nav className="navbar bg-body-tertiary position-relative ">
           <div className='vh-100 d-none sidebar position-absolute z-1 top-0 start-0 bg-body-tertiary p-2  col-3'>
            <div className="d-flex justify-content-between position-relative">
                <h5>Navbar</h5>
                <i onClick={showNavBar} className="fa fa-times position-absolute end-0 " aria-hidden="true"></i>
            </div>
            <hr></hr>
            <div>
                <h5>Go To </h5>
                <button class="btn btn-secondary mb-1" onClick={goToHome}>Home</button><br></br>
                <button className='btn btn-secondary mb-1' onClick={goToEmpDetails}>Employee Details</button><br></br>
                <button className='btn btn-secondary mb-1' onClick={goToLeaveDetails}>  Leave Details</button>
            </div>
        </div>
            <div className="container-fluid">
         <button
                    className="navbar-toggler"
                    type="button"
                    onClick={showNavBar}
        >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" href="#">Employee Management System</a>
            </div>
        </nav>
  )
}

export default Header