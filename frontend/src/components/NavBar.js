import { FaSearch } from "react-icons/fa";
import { AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import AccountBtn from "./AccountBtn";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const handleToggleMenu = () => {
    setToggleMenu((prevToggleMenu) => !prevToggleMenu);
  };
  return (
    <nav className="text-black w-full relative">
      <div className="relative z-20 bg-stone-200">
        <div className="container mx-auto flex justify-between items-center py-3 max-w-[1200px] ss:px-6 px-4">
          <div className="text-xl font-bold mr-2 flex items-center">
            <AiOutlineMenu
              size={25}
              className="mr-2 ss:hidden"
              onClick={handleToggleMenu}
            />
            LOGO
          </div>
          <div className="flex items-center sm:space-x-6 ss:space-x-4 space-x-3">
            <div className="relative ss:block hidden">
              <input
                type="text"
                placeholder="Search products..."
                className="py-2 px-4 pr-10 text-gray-700 w-64 sm:w-80 focus:outline-none bg-white border border-gray-300 rounded-full transition-all duration-300 focus:ring-2 focus:ring-indigo-300"
              />
              <FaSearch
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
            <Link to="/" className="hover:text-gray-500 flex items-center">
              <AiOutlineShoppingCart size={25} className="ss:mr-1" />
              <span className="ss:block hidden">Cart</span>
            </Link>
            <Link to="/" className="hover:text-gray-500 flex items-center">
              <MdFavoriteBorder size={25} className="ss:mr-1" />
              <span className="ss:block hidden">Favorites</span>
            </Link>
            <AccountBtn />
          </div>
        </div>
        <div className="relative max-w-md mx-auto ss:hidden px-4 mb-2">
          <input
            type="text"
            placeholder="Search products..."
            className="py-2 px-3 pr-10 text-gray-700 w-full focus:outline-none bg-white border border-gray-300 rounded-full transition-all duration-300 focus:ring-2 focus:ring-indigo-300"
          />
          <FaSearch
            className="absolute right-7 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
        <hr className=" border-gray-700" />
        <div className="bg-black ss:block hidden">
          <ul className="flex justify-around  mx-auto text-white text-center md:max-w-[1000px] xs:text-sm sm:text-base">
            <li className="bg-black cursor-pointer text-white font-semibold py-2 px-4 hover:bg-white hover:text-black duration-300 tracking-widest w-1/6">
              Home
            </li>
            <li className="bg-black cursor-pointer text-white font-semibold py-2 px-4 hover:bg-white hover:text-black duration-300 tracking-widest w-1/6">
              Shop
            </li>
            <li className="bg-black cursor-pointer text-white font-semibold py-2 px-4 hover:bg-white hover:text-black duration-300 tracking-widest w-1/6">
              Categories
            </li>
            <li className="bg-black cursor-pointer text-white font-semibold py-2 px-4 hover:bg-white hover:text-black duration-300 tracking-widest w-1/6">
              Best Sales
            </li>
            <li className="bg-black cursor-pointer text-white font-semibold py-2 px-4 hover:bg-white hover:text-black duration-300 tracking-widest w-1/6">
              About
            </li>
            <li className="bg-black cursor-pointer text-white font-semibold py-2 px-4 hover:bg-white hover:text-black duration-300 tracking-widest w-1/6">
              Contact
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`ss:hidden bg-black text-white opacity-70 text-md fixed w-full transition-translate duration-300 transform-gpu ${
          toggleMenu ? "" : "-translate-y-full"
        }`}
      >
        <ul>
          <li className="text-center py-2">Home</li>
          <hr />
          <li className="text-center py-2">Shop</li>
          <hr />
          <li className="text-center py-2">Categories</li>
          <hr />
          <li className="text-center py-2">Best Sales</li>
          <hr />
          <li className="text-center py-2">About</li>
          <hr />
          <li className="text-center py-2">Contact</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
