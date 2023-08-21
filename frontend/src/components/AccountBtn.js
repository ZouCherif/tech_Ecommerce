import { Link } from "react-router-dom";
import { GoPerson } from "react-icons/go";
import useAuth from "../hooks/useAuth";

function AccountBtn() {
  const { username } = useAuth();
  return (
    <Link to="/auth" className="flex hover:text-gray-500 items-center">
      <GoPerson size={25} className="ss:mr-1" />
      <span className="ss:block hidden">
        {username ? username : "Your account"}
      </span>
    </Link>
  );
}

export default AccountBtn;
