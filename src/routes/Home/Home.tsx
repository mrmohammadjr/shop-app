import React,{ useEffect } from 'react'
import { CategoriesCards,TopThree } from '../../components/CategoriesCards'
import {useAppDispatch, useAppSelector} from "../../context/store";
import { fetchData } from "../../context/dataSlice";
import {Cards} from '../../components/Cards'
import SearchBar from '../../components/SearchBar'
import MobileMenu from '../../components/MobileMenu'
import Logo from "../../Logo.png"
const Home:React.FC = () => {
  const {data,status} = useAppSelector((state) => state.data);
  console.log(data)
  const dispatch = useAppDispatch()
  const date = new Date()
    const year = date.getFullYear()
    const month = date.getUTCMonth()
    const day = date.getDate()
  useEffect(() => {
    dispatch(fetchData());
    }, []); 
  return (
    <div>
      <CategoriesCards />
      <SearchBar />
      <TopThree />
      <div className="bg-violet-600 w-[100%] h-[70%] mt-40 mb-32 flex flex-col items-center">
        <div className="flex justify-center items-center">    
          <img src={Logo} className="lg:w-96 sm:w-48" />
        
        </div>
          <h1 className="lg:text-7xl sm:text-2xl text-white"><b>Online Store</b></h1>
          <div className="flex flex-col items-center">
          <span className="lg:text-7xl sm:text-xl my-8 text-white">Special discount from</span>
          <span className="lg:text-7xl sm:text-xl my-4 text-orange-500">{year} - {month} - {day}</span>
          <span className="lg:text-7xl sm:text-xl my-4 text-white">until</span>
          <span className="lg:text-7xl sm:text-xl my-4 text-orange-500">2025 - 12 - 12</span>
          </div>
          
      </div>
        <h1 className="lg:text-4xl lg:pl-16 sm:text-2xl sm:pl-8">Discount on</h1>
          <Cards data={data.slice(1,6)} status={status}/>
        <h1 className="lg:text-4xl lg:pl-16 sm:text-2xl sm:pl-8">Best seller</h1>
          <Cards data={data.slice(7,13)} status={status}/>
      <MobileMenu />
    </div>
  )
}
export default Home