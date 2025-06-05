import React,{useState} from 'react'
import LopTop from "../media/Loptop.png"
import Phone from "../media/Phone.png"
import Coat from "../media/Coat.png"
import {useNavigate} from 'react-router-dom';
type Category = {
  id: number
  name: string
}

export const CategoriesCards = () => {
  const navigate = useNavigate()
  const [data,setData] = useState<Category[]>([
    {id:1,name:"Clothes1"},
    {id:2,name:"Furniture"},
    {id:3,name:"Electronics"},
    {id:4,name:"Grosery"},
    {id:5,name:"Miscellaneous"},
    ])
  return (
    <div className="flex justify-start gap-10">
        <h1 onClick={()=> navigate("/categories")} className="lg:block md:block sm:hidden lg:text-2xl sm:text-sm border-2 border-black font-bold lg:p-3 sm:p-1 mx-5 my-2 rounded-2xl flex gap-3 items-center"><i className="pi pi-list"></i>All Categories</h1>
      {data.map((item)=>(
        <h1 onClick={()=> navigate(`/categories/${item.id}`)} className="text-3xl border-2 p-3 mx-5 my-2 rounded-2xl lg:block sm:hidden">{item?.name}</h1>
      ))}
    </div>
  )
}

export const TopThree = () => {
  return (
    <div className="flex flex-col items-center gap-8 my-20 ">
      <div className="border-2 lg:w-[70%] sm:w-[80%] lg:h-[13rem] sm:h-[10rem] bg-gradient-to-r from-gray-300 to-gray-50 flex items-center justify-between overflow-hidden px-5">
        <h1 className="lg:text-6xl sm:text-2xl sm:text-center">Best-selling gaming laptops</h1>
        <img src={LopTop} className="w-[25%] sm:hidden lg:block "/>
      </div>
      <div className="border-2 lg:w-[70%] sm:w-[80%] lg:h-[13rem] sm:h-[10rem]  bg-gradient-to-l from-black to-blue-500 flex items-center px-5 justify-between overflow-hidden">
        <img src={Phone} className="w-[20%] sm:hidden lg:block "/>
        <h1 className="lg:text-6xl sm:text-2xl sm:text-center sm:text-white">The best mid-range phones</h1>
      </div>
      <div className="border-2 lg:w-[70%] sm:w-[80%] lg:h-[13rem] sm:h-[10rem] bg-gradient-to-r from-red-500 to-yellow-300 flex items-center px-5 justify-between overflow-hidden">
        <h1 className="lg:text-6xl sm:text-2xl sm:text-center">Stylish clothes for a party</h1>
        <img src={Coat} className="w-[20%] sm:hidden lg:block "/>
      </div>
    </div>
  )
}
