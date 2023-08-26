import { TfiStatsUp, TfiSettings } from "react-icons/tfi";
import { LiaShoppingBagSolid, LiaBookSolid } from "react-icons/lia";
import { GoPerson } from "react-icons/go";
import { BiCategory } from "react-icons/bi";
import { NavLink } from "react-router-dom";

function AdminNavbar() {
  return (
    <nav className="h-screen border-r-2 border-stone-300 pl-4 pr-2 py-2 w-1/6 flex flex-col justify-between">
      <div>
        <h1 className="font-bold text-2xl py-3">LOGO</h1>
        <hr className="mb-4 border-[1px] border-stone-300" />
        <ul>
          <li className="mb-1">
            <NavLink
              to="/dashboard/overview"
              style={({ isActive }) => {
                return {
                  backgroundColor: isActive ? "rgb(253 224 71)" : "",
                };
              }}
              className="flex items-center py-3 pl-1 rounded-lg"
            >
              <TfiStatsUp size={18} className="mr-3" />
              Overview
            </NavLink>
          </li>
          <li className="mb-1 rounded-lg">
            <NavLink to="#" className="flex items-center py-3 pl-1 ">
              <BiCategory size={18} className="mr-3" />
              Categories
            </NavLink>
          </li>
          <li className="mb-1 rounded-lg">
            <NavLink
              to="/dashboard/products"
              style={({ isActive }) => {
                return {
                  backgroundColor: isActive ? "rgb(253 224 71)" : "",
                };
              }}
              className="flex items-center py-3 pl-1 rounded-lg"
            >
              <LiaShoppingBagSolid size={18} className="mr-3" />
              Products
            </NavLink>
          </li>
          <li className="mb-1 rounded-lg">
            <NavLink to="#" className="flex items-center py-3 pl-1 ">
              <LiaBookSolid size={18} className="mr-3" />
              Orders
            </NavLink>
          </li>
          <li className="mb-1 rounded-lg">
            <NavLink to="#" className="flex items-center py-3 pl-1 ">
              <GoPerson size={18} className="mr-3" />
              Customers
            </NavLink>
          </li>
          <li className="mb-1 rounded-lg">
            <NavLink to="#" className="flex items-center py-3 pl-1 ">
              <TfiSettings size={18} className="mr-3" />
              Settings
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="p-2">
        <hr className="mb-2 border-[1px] border-stone-300" />
        <h2>Your Account</h2>
      </div>
    </nav>
  );
}

export default AdminNavbar;
