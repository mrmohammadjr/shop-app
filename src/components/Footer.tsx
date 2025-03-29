import React from 'react';
import Logo from "../Logo.png"
const Footer = () => {
  return (
    <div className="bg-violet-600 w-full lg:h-64 px-5 py-1 mt-32">
      <div className="flex flex-col items-center h-[10rem]">
        <img src={Logo} alt="logo" className="lg:w-56 sm:w-28"/>
        <p className="text-white text-4xl lg:block sm:hidden">Online Store everywhere and every time is available</p>
      </div>
    </div>
  );
};

export default Footer;