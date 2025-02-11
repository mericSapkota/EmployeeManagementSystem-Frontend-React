import React, { useEffect } from 'react'
import Button from '@mui/material/Button';


const AdminPanel = ({showNavBar}) => {
    useEffect(()=>{
        showNavBar()},[]);

    function autoResize(){
         const textarea = document.querySelector(".mytext");
         textarea.style.height="auto"
        textarea.style.height=textarea.scrollHeight+"px";
    }    
  
  return (
    <>
    <div className="container vh-100">
    <div className='row'>
        
        <div className="main col-12 bg-light d-flex flex-column gap-5 justify-content-center align-items-center">
           <div className="">
            <h3>Welcome to Employee Management System</h3> 
            </div>

            <div className="card" style={{width: 38+"rem"}}>
                <div className="card-body" >
                    <h5 className="card-title">Announcements</h5>
                    <div className="d-flex flex-column gap-2 mb-2" style={{maxHeight:200+"px"}}>
                    <textarea type="textarea" className="mytext mh-50 mh-100 mw-100" onInput={autoResize} rows={2} placeholder={` What's on your mind? `}></textarea>
                    <Button variant='outlined'>Post</Button>
                    </div> 
                    <div>
                        <div className="card">
                            <div className="card-body">
                                <h7 className='card-title'>Annoucments</h7>

                                <div className='card'>
                                    <div className='card-body'>
                                        <div className="card-title d-flex flex-column ">
                                            <h5>Admin</h5>
                                            <div className='d-flex  gap-2'>
                                            <h7 className='text-muted'>4:30 pm</h7>
                                            <h7 className="text-muted">2024-05-12</h7>
                                            </div>
                                           
                                        </div>
                                        
                                        <p className="">Hey this is our fist post</p>
                                    </div>
                                </div>

                                <div className='card mt-3'>
                                    <div className='card-body'>
                                        <h6 className="card-title">Admin</h6>
                                        <p className='time'>4:30 pm</p>
                                        <p className="date">2024-05-12</p>
                                        <p className="">Hey this is our second post</p>
                                    </div>
                                </div>

                                <div className='card mt-3'>
                                    <div className='card-body'>
                                        <div className="card-title">Admin</div>
                                        <p className='time'>4:30 pm</p>
                                        <p className="date">2024-05-12</p>
                                        <p className="">Hey this is our second post</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>        
            </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default AdminPanel