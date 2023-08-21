import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector((state) => state.users.token);

  if (token) {
    const decoded = jwtDecode(token);
    const { username, roles } = decoded.UserInfo;

    return { username, roles };
  }

  return { username: "", roles: [] };
};
export default useAuth;
