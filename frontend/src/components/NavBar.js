import { FaSearch, FaShoppingCart, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-stone-200 text-black w-full">
      <div className="container mx-auto flex justify-between items-center py-3">
        <div className="text-xl font-bold">LOGO</div>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="py-3 px-4 pr-10 text-gray-700 w-64 sm:w-96 focus:outline-none bg-white border border-gray-300 rounded-full transition-all duration-300 focus:ring-2 focus:ring-indigo-300"
            />
            <FaSearch
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>

          <a href="#" className="hover:text-gray-500">
            <FaShoppingCart size={20} />
          </a>
          <a href="#" className="hover:text-gray-500">
            <FaHeart size={20} />
          </a>
          <Link
            to="/auth"
            className="bg-white cursor-pointer text-black font-semibold hover:bg-black hover:text-white duration-300 border-2 border-gray-300 tracking-widest py-2 px-4"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="bg-black cursor-pointer text-white font-semibold py-2 px-4 hover:bg-white hover:text-black duration-300 border-2 border-black tracking-widest"
          >
            Sign Up
          </Link>
        </div>
      </div>
      <hr className=" border-gray-700" />
      <div className="bg-black">
        <ul className="flex justify-around w-1/2 mx-auto text-white text-center">
          <li className="bg-black cursor-pointer text-white font-semibold py-2 px-4 hover:bg-white hover:text-black duration-300 tracking-widest w-1/5">
            Home
          </li>
          <li className="bg-black cursor-pointer text-white font-semibold py-2 px-4 hover:bg-white hover:text-black duration-300 tracking-widest w-1/5">
            Shop
          </li>
          <li className="bg-black cursor-pointer text-white font-semibold py-2 px-4 hover:bg-white hover:text-black duration-300 tracking-widest w-1/5">
            About
          </li>
          <li className="bg-black cursor-pointer text-white font-semibold py-2 px-4 hover:bg-white hover:text-black duration-300 tracking-widest w-1/5">
            Contact Us
          </li>
          <li className="bg-black cursor-pointer text-white font-semibold py-2 px-4 hover:bg-white hover:text-black duration-300 tracking-widest w-1/5">
            Best Sales
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
