import React,{useEffect,useState} from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import Product from '../../../Product.jpeg'
import {Cards} from '../../../components/Cards'
interface SingleCategoriesType {
  id: number
  name: string
  slug: string
  image: string
}
//[GET] 
const SingleCategory = () => {
  const [result, setResult] = useState<any[]>([])
  const [flag, setFlag] = useState<boolean>(false)
  const navigate = useNavigate()
  const {categoryId} = useParams()
  async function getData(): Promise<void> {
      const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`)
      const data = await response.json()
      setResult(data)
      console.log(data)
      setFlag(true)
  }
  useEffect(()=>{
    getData()
    console.log("res",result)
  },[])
  return (
    <div>
      <div className="sm:ml-9 sm:w-[80%] sm:border-t-2 sm:border-violet-600 ">
      </div>
      <h1 className="p-2 sm:text-2xl lg:text-5xl sm:my-3">Category - Tshirt</h1>
          <div className="">
    {flag === false ? (
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
          <Cards data={result}/>
      </>
    )}
    </div>
    </div>
  );
};

export default SingleCategory;