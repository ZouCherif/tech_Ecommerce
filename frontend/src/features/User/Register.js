import { useState } from "react";
import { useRegisterNewUserMutation } from "../../api/apiSlice";
import { useNavigate } from "react-router-dom";

function Register() {
  const [addNewUser, { isSuccess, error }] = useRegisterNewUserMutation();
  const [data, setData] = useState({
    email: "",
    username: "",
    pwd: "",
    pwdC: "",
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
    console.log(data);
    try {
      const response = await addNewUser(data).unwrap();
      console.log(response);
      if (isSuccess) {
        navigate("/login");
      } else {
        console.log(error);
      }
    } catch (err) {
      console.error("failed: ", err);
    }
    setData({
      email: "",
      username: "",
      pwd: "",
      pwdC: "",
    });
  };
  return (
    <form onSubmit={handleOnSubmit}>
      <h2>Register</h2>
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        id="email"
        value={data.email}
        onChange={handleOnChange}
      />
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        value={data.username}
        onChange={handleOnChange}
      />
      <label htmlFor="pwd">Password</label>
      <input
        type="password"
        name="pwd"
        id="pwd"
        value={data.pwd}
        onChange={handleOnChange}
      />
      <label htmlFor="pwdC">Confirm Password</label>
      <input
        type="password"
        name="pwdC"
        id="pwdC"
        value={data.pwdC}
        onChange={handleOnChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Register;
