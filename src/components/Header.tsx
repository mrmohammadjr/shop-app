import React,{useEffect} from 'react'
import Logo from "../Logo.png"
import Logo2 from "../media/shopViolet.png"
import { useNavigate } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../context/store";
import { autoLogin } from "../context/loginSlice"
export const Header = () => {
  const navigate = useNavigate()
  const {items} = useAppSelector((state) => state.cart); 
  const dispatch = useAppDispatch()
  const load = JSON.parse(localStorage.getItem("information") || "{}");
  useEffect(() => {
    dispatch(autoLogin(load))
  }, [])
  
  const {data,status, error} = useAppSelector((state) => state.login);
  return (
    <div className="sm:hidden lg:block bg-violet-600 w-full lg:h-36 px-5 py-1">
      <ul className="flex items-center gap-20 justify-between">
        <li onClick={()=> navigate("/")} ><img src={Logo} alt="logo" className="w-36"/></li>
        <li className="text-white text-5xl">Everything You Need</li>
        <ul className="flex justify-around gap-10 items-center">
          <li><span className="text-2xl bg-red-500 absolute right-[120px] px-2 rounded-full top-3 text-white">{items.length}</span><i onClick={()=> navigate("/cart")} className="pi pi-shopping-cart text-white text-5xl"></i></li>
          <li>
           {status === "logout" ?(
            <button onClick={()=> navigate("/login")} className="bg-purple-950 text-sm text-white p-2.5 rounded-2xl">Login</button>
           ):(
              <i onClick={()=> navigate("/dashboard")} className="pi pi-user text-white text-5xl px-4"></i>
           )}</li>
        </ul>
      </ul>
    </div>
  )
}

export const SmallHeader = () => {
  const navigate = useNavigate()
  return (
    <div className="sm:block lg:hidden">
      <div className="bg-white w-full lg:h-36 flex justify-between items-center px-1.5">
        <img src={Logo2} onClick={()=> navigate("/")} alt="logo" className="w-24" />
        <h1 className="text-violet-600">Everything You Need</h1>
        <div>
        </div>
      </div>
    </div>
  )
}