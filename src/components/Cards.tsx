import React,{useEffect} from 'react'
import Product from '../Product.jpeg'
import { Data } from "../context/dataSlice"
import { useNavigate } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../context/store";
import { addToCart } from "../context/cartSlice"
import Swal from 'sweetalert2'
type CardsProps = {
  data: Data[]
  status?: 'idle' | 'loading' | 'succeeded' | 'failed';
}
export const Cards = ({data,status}:CardsProps) => {
  const navigate = useNavigate()
  const {items} = useAppSelector((state) => state.cart); 
  const dispatch = useAppDispatch()
  function addCart(id:number,title:string,price:number,images:string[]){
    dispatch(addToCart({id,title,price,images}))
    console.log(data)
    Swal.fire("Add To Cart");
  }
  return (
    <div className="my-10 lg:mx-20 sm:mx-5 grid lg:grid-cols-3 sm:grid-cols-2">
    {status === "loading" ? (
      <div className="border border-violet-600 rounded-2xl lg:w-[90%] lg:h-[90%] sm:w-[90%] sm:h-[80%] flex flex-col items-center pt-5 sm:m-3">
        <img src={Product} className="w-[70%] py-5" />
          <div className="bg-violet-600 w-full h-auto rounded-b-2xl flex items-center flex-col text-white">
            <p className="text-center">???</p>
            <p className="font-bold text-indigo-100">???</p>
            <button className="bg-violet-950 p-2 rounded-2xl mb-1">Waiting ...</button>
          </div>
      </div>
    ) : (
      <>
      {data?.map((item,index)=>(
        <div key={item.id} className="border border-violet-600 rounded-2xl lg:w-[90%] lg:h-[90%] sm:w-[90%] sm:h-[80%] flex flex-col items-center pt-5 sm:m-3">
          <img src={item?.images ? item?.images[0] : Product} className="w-[70%] py-5" onClick={()=> navigate(`/product/${item.title}`,{state:item.id})} />
          <div className="bg-violet-600 w-full h-auto rounded-b-2xl flex items-center flex-col text-white px-[0.6px]">
            <p className="text-center lg:text-2xl sm:text-[11px] lg:my-4 sm:my-2">{item?.title}</p>
            <p className="font-bold mb-2 text-indigo-100">${item?.price}</p>
            <p className="font-bold mb-2 text-green-200">Count: 28</p>
            <button onClick={()=> addCart(item.id,item.title,item.price,item.images)} className="bg-violet-950 p-2 rounded-2xl mb-1">Add To Cart</button>
        </div>
      </div>
        ))}
        
      </>
    )}
    </div>
  )
}