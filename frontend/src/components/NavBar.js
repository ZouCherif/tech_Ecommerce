import { FaSearch } from "react-icons/fa";
import { AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-stone-200 text-black w-full">
      <div className="container mx-auto flex justify-between items-center py-3 max-w-[1200px] px-6">
        <div className="text-xl font-bold mr-2">LOGO</div>
        <div className="flex items-center sm:space-x-6 ss:space-x-4 space-x-3">
          <div className="relative ss:block hidden">
            <input
              type="text"
              placeholder="Search products..."
              className="py-3 px-4 pr-10 text-gray-700 w-64 sm:w-80 focus:outline-none bg-white border border-gray-300 rounded-full transition-all duration-300 focus:ring-2 focus:ring-indigo-300"
            />
            <FaSearch
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
          <Link to="/" className="hover:text-gray-500 flex items-center">
            <AiOutlineShoppingCart size={20} className="ss:mr-1" />{" "}
            <span className="ss:block hidden">Cart</span>
          </Link>
          <Link to="/" className="hover:text-gray-500 flex items-center">
            <MdFavoriteBorder size={20} className="ss:mr-1" />{" "}
            <span className="ss:block hidden">Favorites</span>
          </Link>
          <Link to="/auth" className="flex hover:text-gray-500 items-center">
            <GoPerson size={20} className="ss:mr-2" />
            <span className="ss:block hidden">Your account</span>
          </Link>
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
      <div className="bg-black xs:block hidden">
        <ul className="flex justify-around  mx-auto text-white text-center md:max-w-[1000px] xs:text-sm sm:text-base">
          <li className="bg-black cursor-pointer text-white font-semibold py-2 px-4 hover:bg-white hover:text-black duration-300 tracking-widest w-1/5">
            Home
          </li>
          <li className="bg-black cursor-pointer text-white font-semibold py-2 px-4 hover:bg-white hover:text-black duration-300 tracking-widest w-1/5">
            Shop
          </li>
          <li className="bg-black cursor-pointer text-white font-semibold py-2 px-4 hover:bg-white hover:text-black duration-300 tracking-widest w-1/5">
            Best Sales
          </li>
          <li className="bg-black cursor-pointer text-white font-semibold py-2 px-4 hover:bg-white hover:text-black duration-300 tracking-widest w-1/5">
            About
          </li>
          <li className="bg-black cursor-pointer text-white font-semibold py-2 px-4 hover:bg-white hover:text-black duration-300 tracking-widest w-1/5">
            Contact
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
