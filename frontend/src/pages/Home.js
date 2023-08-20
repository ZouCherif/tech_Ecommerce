import {
  // useRefreshTokenMutation,
  useLogoutUserMutation,
} from "../api/apiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUserInfo } from "../features/User/userSlice";

function Home() {
  const dispatch = useDispatch();
  // const [refreshGoogleToken] = useRefreshTokenMutation();
  const [logout] = useLogoutUserMutation();
  const navigate = useNavigate();
  // const handlerefresh = async () => {
  //   try {
  //     const result = await refreshGoogleToken().unwrap();
  //     console.log(result);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

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
      {/* <button onClick={handlerefresh}>refresh</button> */}
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}

export default Home;
