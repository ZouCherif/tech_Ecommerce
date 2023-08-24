import {
  useRefreshTokenMutation,
  useLogoutUserMutation,
  useGetCategoriesQuery,
  useAddNewCategoryMutation,
} from "../api/apiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUserInfo, setUserInfo } from "../features/User/userSlice";
import { useState } from "react";

function Home() {
  const dispatch = useDispatch();
  // const [refreshToken] = useRefreshTokenMutation();
  // const { data } = useGetCategoriesQuery();
  const [logout] = useLogoutUserMutation();
  const [addCategory] = useAddNewCategoryMutation();
  const navigate = useNavigate();
  const [dataCat, setData] = useState({
    name: "",
    description: "",
  });
  // const handlerefresh = async () => {
  //   try {
  //     const { accessToken } = await refreshToken().unwrap();
  //     dispatch(setUserInfo({ accessToken }));
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // console.log(data);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const result = await addCategory(dataCat).unwrap();
      console.log(result);
    } catch (err) {
      console.log("errrrr");
      console.log(err.data?.message);
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
      {/* <button onClick={handlerefresh}>refresh</button> */}
      <input
        placeholder="name"
        value={dataCat.name}
        name="name"
        onChange={handleOnChange}
      />
      <input
        placeholder="description"
        value={dataCat.description}
        name="description"
        onChange={handleOnChange}
      />
      <button onClick={handleSubmit}>Send</button>
      <button onClick={handleLogout}>logout</button>
      {/* <p>{data}</p> */}
    </div>
  );
}

export default Home;
