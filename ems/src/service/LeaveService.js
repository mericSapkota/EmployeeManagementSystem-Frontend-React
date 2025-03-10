import axios from "axios";
import axiosInstance from "./envService";

const BASE_URL = "http://localhost:8080/api/leave";

export const addLeave = (leaveData)=>{
    return axiosInstance.post(BASE_URL,leaveData);
}

export const listAllLeaves = ()=>{
    return axiosInstance.get(BASE_URL+"/all");
}

export const listLeavesByEmpId =(empId)=>{
    return axiosInstance.get(BASE_URL+"/all/"+empId);
}

export const updateLeaveStatus = (id,leaveData)=>{
    return axiosInstance.put(BASE_URL+"/"+id,leaveData);
}