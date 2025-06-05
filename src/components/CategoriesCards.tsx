import React,{useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
interface CategoriesType {
  creationAt: string
  id: number
  image: string
  name: string
  slug: string
  updatedAt: string
}
const Categories:React.FC = () => {
  const [result, setResult] = useState<CategoriesType[]>([])
  const [flag, setFlag] = useState<boolean>(false)
  const navigate = useNavigate()
  async function getData(): Promise<void> {
      const response = await fetch("https://api.escuelajs.co/api/v1/categories")
      const data = await response.json()
      setResult(data)
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
      <h1 className="p-2 sm:text-2xl lg:text-4xl sm:my-3">All Categories</h1>
      <div className="grid grid-cols-3">
        {flag === true ? (
          <>
          {result?.map((item)=>(
          <div key={item.id} onClick={()=> navigate(`/categories/${item.id}`)} className="sm:bg-gray-200 lg:bg-transparent sm:border sm:border-gray-600 lg:border-none flex flex-col items-center pt-2 lg:m-10">
            <img src={item.image} className="border-2 border-violet-500 sm:w-[90%] lg:w-[40%]"/>
            <p className="sm:text-sm lg:text-5xl sm:my-1 lg:my-5">{item.name}</p>
          </div>
          ))}
          </>
        ) : (
          <h1>loading ...</h1>
        )}

      </div>
    </div>
  );
};

export default Categories;
