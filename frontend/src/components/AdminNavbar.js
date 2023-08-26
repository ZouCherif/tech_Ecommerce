import { TfiStatsUp, TfiSettings } from "react-icons/tfi";
import { LiaShoppingBagSolid, LiaBookSolid } from "react-icons/lia";
import { GoPerson } from "react-icons/go";
import { BiCategory } from "react-icons/bi";
import { SlLogout } from "react-icons/sl";
import { NavLink } from "react-router-dom";

function AdminNavbar() {
  return (
    <nav className="h-screen border-r-2 bg-white border-stone-300 pl-4 pr-2 py-2 w-1/5 flex flex-col justify-between">
      <div>
        <h1 className="font-bold text-2xl py-3">LOGO</h1>
        <hr className="mb-4 border-[1px] border-stone-300" />
        <ul>
          {[
            {
              to: "/dashboard/overview",
              icon: <TfiStatsUp size={18} className="mr-3" />,
              text: "Overview",
            },
            {
              to: "/dashboard/categories",
              icon: <BiCategory size={18} className="mr-3" />,
              text: "Categories",
            },
            {
              to: "/dashboard/products",
              icon: <LiaShoppingBagSolid size={18} className="mr-3" />,
              text: "Products",
            },
            {
              to: "/dashboard/orders",
              icon: <LiaBookSolid size={18} className="mr-3" />,
              text: "Orders",
            },
            {
              to: "/dashboard/customers",
              icon: <GoPerson size={18} className="mr-3" />,
              text: "Customers",
            },
            {
              to: "/dashboard/setings",
              icon: <TfiSettings size={18} className="mr-3" />,
              text: "Settings",
            },
          ].map((item) => (
            <li key={item.to} className="mb-1 rounded-lg">
              <NavLink
                to={item.to}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "rgb(253 224 71)" : "",
                })}
                className="flex items-center py-3 pl-1 rounded-lg"
              >
                {item.icon}
                {item.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-2 flex flex-col">
        <hr className="mb-2 border-[1px] border-stone-300" />
        <NavLink className="py-2">Help</NavLink>
        <button className="text-start pt-2 flex items-center justify-between">
          Log out
          <SlLogout size={18} className="mr-2" />
        </button>
      </div>
    </nav>
  );
}

export default AdminNavbar;
