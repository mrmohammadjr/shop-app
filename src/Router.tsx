import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home/Home'
import Categories from './routes/Categories/Categories'
import SingleCategory from './routes/Categories/singleCategory/SingleCategory'
import SingleProduct from './routes/SingleProduct/SingleProduct'
import Login from './routes/Login/Login'
import Signup from './routes/Signup/Signup'
import Cart from './routes/Cart/Cart'
import Dashboard from './routes/Dashboard/Dashboard'
const Routers: React.FC = () => {
  return<Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:categoryId" element={<SingleCategory />} />
        <Route path="/product/:productName" element={<SingleProduct />} />
      </Routes>
};

export default Routers;