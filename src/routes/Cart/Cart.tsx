import React,{useState,useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../context/store";
import { addToCart,removeFromCart,clearCart } from "../../context/cartSlice"
import Swal from 'sweetalert2'
const Cart = () => {
  const [total,setTotal] = useState<number>(0)
  const {items} = useAppSelector((state) => state.cart); 
  const {data,status, error} = useAppSelector((state) => state.login); 
  useEffect(() => {
    let sum = items.reduce((sum,item)=> sum + item.price * item.count ,0)
    setTotal(sum)
  }, [items])
  
  const dispatch = useAppDispatch()
  function removeCart(id:number){
    dispatch(removeFromCart(id))
  }
  function addCart(id:number,title:string,price:number,images:string[]){
    dispatch(addToCart({id,title,price,images}))
  }
  function clearcart(){
    Swal.fire("Finished");
    dispatch(clearCart())
  }
  return (
    <div className="flex flex-col items-center lg:mt-0 sm:mt-10">
      {items.length === 0 ? (
        <h1 className="mb-10 text-3xl">Cart Is Empty</h1>
        ) : (
          <>
            {items.map((item)=>(
              <div key={item.id} className="flex lg:flex-col sm:justify-around items-center gap-3 border-2 lg:w-[75%] m-3 p-2">
                <img src={item.images[0]} className="w-36"/>
                <div className="flex flex-col items-center gap-3">
                  <h1 className="sm:text-sm">{item.title}</h1>
                  <h1>${item.price}</h1>
                  <div className="flex gap-5 items-center">
                    <button className="bg-violet-600 text-white px-2 rounded" onClick={()=> removeCart(item.id)}>-</button>
                    <h1>{item.count}</h1>
                    <button className="bg-violet-600 text-white px-2 rounded" onClick={()=> addCart(item.id,item.title,item.price,item.images)}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
        <div className="flex justify-between items-center w-full px-3 ">
          <h1>Total Price : ${total}</h1>
          <button className="bg-purple-950 text-sm text-white p-2.5 rounded-2xl" onClick={()=> {status === "logout" ? Swal.fire("Please Login") : items.length < 1 ? Swal.fire("Cart Is Empty") :clearcart()}}>Pay it 💳</button>
        </div>
    </div>
  );
};

export default Cart;