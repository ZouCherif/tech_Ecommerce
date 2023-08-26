import AdminNavbar from "../components/AdminNavbar";
import { Outlet, useLocation } from "react-router-dom";
function Dashboard() {
  const location = useLocation();
  return (
    <div className="flex bg-stone-100">
      <AdminNavbar />
      <div className="w-full p-4">
        <h1 className="bg-white rounded-xl mb-4 text-4xl p-4 w-full">
          {location.pathname.slice(
            location.pathname.lastIndexOf("/") + 1,
            location.pathname.length
          )}
        </h1>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
