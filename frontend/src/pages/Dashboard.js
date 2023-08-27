import AdminNavbar from "../components/AdminNavbar";
import { Outlet, useLocation } from "react-router-dom";
import { IoNotificationsOutline, IoSearchOutline } from "react-icons/io5";
import { BsPersonCircle } from "react-icons/bs";

function Dashboard() {
  const location = useLocation();
  return (
    <div className="flex bg-stone-100 h-screen">
      <AdminNavbar />
      <div className="grow ml-[20%] p-4">
        <div className="flex justify-between py-3 px-4 bg-white rounded-xl mb-4 items-center">
          <h1 className=" text-3xl">
            {location.pathname.split("/").slice(2).join("/")}
          </h1>
          <div className="flex items-center">
            <IoSearchOutline size={20} className="mr-6" />
            <IoNotificationsOutline size={20} className="mr-6" />
            <p className="text-base font-semibold flex items-center">
              <BsPersonCircle size={20} className="mr-2" />
              Your Account
            </p>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
