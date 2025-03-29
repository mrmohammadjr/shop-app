import React,{useState,useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../context/store";
import { useNavigate } from 'react-router-dom'
import { dashboardFetch } from "../../context/dashboardSlice"
import { logout } from "../../context/loginSlice"
const Dashboard = () => {
  const {data,status, error} = useAppSelector((state) => state.login);
  const result = useAppSelector((state) => state.dashboard);
  const dispatch = useAppDispatch()
  function logoutFunc(){
    dispatch(logout())
    navigate("/login")
  }
  const navigate = useNavigate()
  const load = JSON.parse(localStorage.getItem("information") || "{}");
  console.log('first', load)
  useEffect(() => {
    dispatch(dashboardFetch(load))
    if(status === "logout") navigate("/login")
  }, [])
  return (
    <div className="flex-col flex items-center">
      <div className="p-5 flex lg:justify-center sm:flex-col items-center gap-10">
        <img src={result?.data?.avatar} className="rounded-full border-4 border-violet-600"/>
        <div className="flex flex-col gap-5">
          <h2>UserName : {result?.data?.name}</h2>
          <h2>Email : {result?.data?.email}</h2>
          <h2>Role : {result?.data?.role}</h2>
          <h2>create in : {result?.data?.creationAt}</h2>
        </div>
      </div>

        <button onClick={logoutFunc} className="bg-red-600 p-5 text-white rounded-2xl">Logout</button>
    </div>
  );
};

export default Dashboard;