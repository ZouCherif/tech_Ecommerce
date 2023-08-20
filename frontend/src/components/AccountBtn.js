import { useSelector, shallowEqual } from "react-redux";
import { Link } from "react-router-dom";
import { GoPerson } from "react-icons/go";

function AccountBtn() {
  const user = useSelector(
    (state) => state.users.userInfo?.username,
    shallowEqual
  );
  return (
    <Link to="/auth" className="flex hover:text-gray-500 items-center">
      <GoPerson size={25} className="ss:mr-1" />
      <span className="ss:block hidden">{user ? user : "Your account"}</span>
    </Link>
  );
}

export default AccountBtn;
