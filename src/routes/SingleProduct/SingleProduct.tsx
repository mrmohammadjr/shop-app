import React,{ useState,useEffect } from "react"
import Product from '../../Product.jpeg'
import { useNavigate,useLocation } from "react-router-dom"
import CarouselComponent from "../../components/Carousel"
import {useAppDispatch, useAppSelector} from "../../context/store";
import { addToCart } from "../../context/cartSlice"
import { Data } from '../../context/dataSlice';
import Swal from 'sweetalert2'
interface Datatype {
  data : Data[]
  loading : boolean
  error: unknown | string
}
const SingleProduct = () => {
  const {state} = useLocation()
  const dispatch = useAppDispatch()
  function addCart(id:number,title:string,price:number,images:string[]){
    dispatch(addToCart({id,title,price,images}))
    Swal.fire("Add To Cart");
  }
  const [data, setData] = useState<Datatype>({data:[],loading:false,error:""})
  async function getData(){
    try{
      setData({data:[],loading:true,error:""})
      const response = await fetch(`https://api.escuelajs.co/api/v1/products/${state}`);
      const resJson = await response.json()
      setData({data:[resJson],loading:false,error:""})
    }catch(error){
      setData({data:[],loading:false,error:"bug"})
    }
  }
  useEffect(() => {
    getData()
    }, []); 
    console.log(data)
  return (
    <div>
      <h1 className="p-5 lg:text-3xl">{data?.data[0]?.category?.name} - item {data?.data[0]?.id}</h1>
      {data.loading?(
        <div className="bg-gray-200 w-full flex justify-center border-y-2 border-black">
          <img src={Product} />
        </div>
      ):(
        <>
          {data.data.map((item)=>(
            <div>
              <div className="bg-gray-200 w-full flex justify-center border-y-2 border-black">
                  <CarouselComponent images={item.images} />
              </div>
              <h1 className="pl-5 mt-5 lg:text-3xl">{item.title}</h1>
              <div className="flex sm:justify-around lg:flex-col ">
                <h1 className="pl-5 my-5 lg:text-3xl">Price :<span className="text-red-600 lg:text-3xl"> ${item.price}</span></h1>
                <h1 className="pl-5 my-5 lg:text-3xl">Count :<span className="text-green-600 lg:text-3xl"> 28</span></h1>
              </div>
                <button onClick={()=> addCart(item.id,item.title,item.price,item.images)} className="bg-violet-950 sm:p-5 rounded-2xl mb-1 text-white sm:ml-[30%] lg:ml-4 lg:text-3xl">Add To Cart</button>
              <h1 className="pl-5 mt-5 sm:text-sm lg:text-3xl">{item.description}</h1>                
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default SingleProduct;