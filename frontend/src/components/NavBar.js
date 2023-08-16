import { FaSearch, FaShoppingCart, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-stone-200 text-black w-full">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="text-xl font-bold">LOGO</div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center bg-white">
            <input
              type="text"
              placeholder="Search"
              className="p-2 text-black w-40 sm:w-56 focus:outline-none"
            />
            <FaSearch className=" text-gray-400 mr-2" size={20} />
          </div>
          <a href="#" className="hover:text-gray-500">
            <FaShoppingCart size={20} />
          </a>
          <a href="#" className="hover:text-gray-500">
            <FaHeart size={20} />
          </a>
          <Link
            to="/auth"
            className="bg-white cursor-pointer text-black font-semibold hover:bg-black hover:text-white duration-700 border-2 border-white tracking-widest py-2 px-4"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="bg-black cursor-pointer text-white font-semibold py-2 px-4 hover:bg-white hover:text-black duration-700 border-2 border-black tracking-widest"
          >
            Sign Up
          </Link>
        </div>
      </div>
      <hr className=" border-gray-700" />
    </nav>
  );
};

export default Navbar;
