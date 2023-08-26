import AdminNavbar from "../components/AdminNavbar";
import { Outlet } from "react-router-dom";
function Dashboard() {
  return (
    <div className="flex">
      <AdminNavbar />
      <Outlet />
    </div>
  );
}

export default Dashboard;
