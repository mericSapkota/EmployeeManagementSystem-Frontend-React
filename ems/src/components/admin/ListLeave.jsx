import React, { useEffect, useState } from 'react'
import { listAllLeaves, addLeave, updateLeaveStatus } from '../../service/LeaveService';
import { useNavigate } from 'react-router-dom';

const ListLeave = ({showNavBar}) => {

    const [leaveList,setLeaveList]=useState([]);
    const [status,setStatus]=useState("");

    const navigator = useNavigate();
    useEffect(()=>{
        showNavBar();
        getListLeave();
       
    },[]);
    const getListLeave= async ()=>{
        try{
        const response = await listAllLeaves();
        setLeaveList(response.data);
        console.log(response.data);
        }
        catch(e){
            console.error("Unable to fetch data from server",e);
        }
       
    }
  

    const addLeaveButton = ()=>{
       navigator("/add-leave");
    }

    const updateLeave = (empId)=>{
       
        const leaveCopy =[...leaveList];
        
        leaveCopy.map((leave)=>{
            if(leave.empId===empId){
                leave.status=status;
                console.log(leave);
                updateLeaveStatus(leave.id,leave).then((response)=>{
                getListLeave();
                })
            }
        })
    }
   
 
  return (
    <>
    <div className="container-sm table-responsive p-3">
        <h2 className="text-center">List of Leaves</h2>
        <button className="btn btn-primary mb-2" onClick={addLeaveButton}>Add Leaves</button>
        <table className="w-100 table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th>Leave Id</th>
                    <th>Employee Id</th>
                    <th>Leave Type</th>
                    <th>Leave FromDate</th>
                    <th>Leave ToDate</th>
                    <th>Leave Reason</th>
                    <th>Leave Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
               {leaveList.map((leave)=>( <tr key={leave.id}>
                    <td>{leave.id}</td>
                    <td>{leave.empId}</td>
                    <td>Casual</td>
                    <td>{leave.startDate}</td>
                    <td>{leave.endDate}</td>
                    <td>{leave.leaveReason}</td>
                    <td>
                        <select  onChange={(e)=>setStatus(e.target.value)}>
                            <option value="PENDING" defaultValue={leave.status}>{leave.status}</option>
                            <option value="APPROVED">APPROVED</option>
                            <option value="REJECTED">REJECTED</option>
                        </select>
                    </td>
                    <td>
                        <button className="btn btn-info" onClick={()=>updateLeave(leave.empId)}>Update</button>
                        <button className="btn btn-danger ms-2">Delete</button>
                    </td>
                </tr>
))}
            </tbody>
        </table>
        </div>
    </>
  )
}

export default ListLeave;