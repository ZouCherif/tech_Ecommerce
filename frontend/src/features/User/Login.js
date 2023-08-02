import { useState } from "react";
import { useLoginUserMutation } from "../../api/apiSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginUser, { isSuccess, error }] = useLoginUserMutation();
  const [data, setData] = useState({
    email: "",
    pwd: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!data.username || !data.password) return;
    console.log(data);
    try {
      const token = await loginUser(data).unwrap();
      console.log(token);
      if (isSuccess) {
        navigate("/");
      } else {
        console.log(error);
      }
    } catch (err) {
      console.error(err);
    }
    setData({ username: "", password: "" });
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <h2>Login</h2>
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        id="email"
        value={data.email}
        onChange={handleOnChange}
      />
      <label htmlFor="pwd">Email</label>
      <input
        type="password"
        name="pwd"
        id="pwd"
        value={data.pwd}
        onChange={handleOnChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Login;
