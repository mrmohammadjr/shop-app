import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Data } from "../context/dataSlice"
const SearchBar = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState<string>("")
  const [result, setResult] = useState<Data[]>([])
  async function searchResult(){
    const response = await fetch(`https://api.escuelajs.co/api/v1/products/?title=${search}`)
    const resData = await response.json()
    setResult(resData)
    console.log("res",result)
  }
  useEffect(() => {
    searchResult()
  }, [search])
  
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between lg:my-16 sm:my-8 border-2 border-violet-600 w-[80%] items-center lg:p-7 sm:p-4 rounded-[5rem]">
        <input type="text" onChange={(e)=> setSearch(e.target.value)} className="outline-none lg:text-2xl sm:text-sm sm:p-3 rounded-3xl w-full" placeholder="Search What You Want ..." />
        <i className="pi pi-search text-violet-500 lg:text-5xl sm:text-xl"></i>
      </div>
      {search.length > 0 ? (
        <div className="rounded-2xl border-2 border-violet-600 bg-white h-auto p-2 w-[80%] absolute lg:mt-[200px] sm:mt-[116px] overflow-scroll">
          {result.length > 0 ? (
            <>
            {result.map((item)=>(
              <p onClick={()=> navigate(`/product/${item.title}`,{state:item.id})} className="text-sm my-1 py-1 border-t-2 border-b-2">{item.title}</p>
            ))}
            </>
          ):(
            <p>Nothing To Show</p>
          )}
        </div>
      ):(
        <>
        </>
      )}
    </div>
  );
};

export default SearchBar;
