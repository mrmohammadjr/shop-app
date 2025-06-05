import React,{useEffect} from 'react'
import Logo from "../Logo.png"
import { useNavigate } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../context/store";
import { autoLogin } from "../context/loginSlice"

const MobileMenu = () => {
  const navigate = useNavigate()
  const {items} = useAppSelector((state) => state.cart); 
  const { data, status, error } = useAppSelector((state) => state.login);
  console.log(status)
  return (
    <div className="lg:hidden md:hidden sm:flex sm:justify-between sm:items-center bg-violet-600 w-[94%] m-3 h-20 p-5 fixed bottom-0 rounded-2xl shadow-2xl">
      <h1 className="flex flex-col text-white text-[10px] items-center" onClick={()=> navigate("/categories")}><i className="pi pi-list text-[20px]"></i>categories</h1>
        <span className=" bg-red-500 absolute right-[210px] px-1 rounded-full top-4 text-white text-[12px]">{items.length}</span><i onClick={()=> navigate("/cart")} className="pi pi-shopping-cart text-white text-[26px] mr-5"></i>
           {status === "logout" || "no_user" ?(
            <button onClick={()=> navigate("/login")} className="bg-purple-950 text-sm text-white p-2.5 rounded-2xl">Login</button>
           ):(
              <i onClick={()=> navigate("/dashboard")} className="pi pi-user text-white text-2xl px-4"></i>
           )}
    </div>
  );
};

export default MobileMenu;
