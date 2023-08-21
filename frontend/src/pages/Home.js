import {
  useRefreshTokenMutation,
  useLogoutUserMutation,
} from "../api/apiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUserInfo, setUserInfo } from "../features/User/userSlice";

function Home() {
  const dispatch = useDispatch();
  const [refreshToken] = useRefreshTokenMutation();
  const [logout] = useLogoutUserMutation();
  const navigate = useNavigate();
  const handlerefresh = async () => {
    try {
      const { accessToken } = await refreshToken().unwrap();
      dispatch(setUserInfo(accessToken));
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(clearUserInfo());
      navigate("/auth");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <button onClick={handlerefresh}>refresh</button>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}

export default Home;
