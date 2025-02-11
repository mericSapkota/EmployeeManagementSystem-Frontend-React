import axios from "axios";

const BASE_URL = "http://localhost:8080/api/leave";

export const addLeave = (leaveData)=>{
    return axios.post(BASE_URL,leaveData);
}

export const listAllLeaves = ()=>{
    return axios.get(BASE_URL+"/all");
}

export const listLeavesByEmpId =(empId)=>{
    return axios.get(BASE_URL+"/all/"+empId);
}

export const updateLeaveStatus = (id,leaveData)=>{
    return axios.put(BASE_URL+"/"+id,leaveData);
}