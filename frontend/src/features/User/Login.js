import { useState } from "react";
import { useLoginUserMutation } from "../../api/apiSlice";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [loginUser] = useLoginUserMutation();
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
    if (!data.email || !data.pwd) return;
    try {
      const user = await loginUser(data).unwrap();
      console.log(user);
      setData({ username: "", password: "" });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-stone-100 h-full">
      <h1 className="font-bold text-4xl text-center py-10">LOGO</h1>
      <div className="sm:w-1/2 w-3/4 mx-auto bg-white py-10 tracking-widest">
        <form
          onSubmit={handleOnSubmit}
          className="flex flex-col ss:w-2/3 p-4 mx-auto"
        >
          <h2 className="text-center ss:text-3xl text-2xl font-bold mb-8">
            LOGIN
          </h2>
          <label
            htmlFor="email"
            className="text-gray-500 mb-2 ss:text-sm text-xs font-semibold"
          >
            EMAIL ADDRESS:
          </label>
          <input
            type="text"
            name="email"
            id="email"
            value={data.email}
            onChange={handleOnChange}
            className="border-2 border-gray-300 p-2 mb-6"
          />
          <label
            htmlFor="pwd"
            className="text-gray-500 mb-2 ss:text-sm text-xs  font-semibold"
          >
            PASSWORD:
          </label>
          <input
            type="password"
            name="pwd"
            id="pwd"
            value={data.pwd}
            onChange={handleOnChange}
            className="border-2 border-gray-300 p-2 mb-1"
          />
          <Link
            to={"/forgotPassword"}
            className="mb-6 ss:text-xs text-[0.6rem] hover:underline"
          >
            FORGOT PASSWORD?
          </Link>
          <button
            type="submit"
            className="bg-black text-white font-semibold py-3 hover:bg-white hover:text-black duration-700 border-2 border-black tracking-widest mb-4"
          >
            LOGIN
          </button>
        </form>
        <div className="flex items-center mx-center justify-center">
          <hr className="border-black w-1/3" />
          <span className="mx-2 text-xs">OR</span>
          <hr className="border-black  w-1/3" />
        </div>
        <h3 className="text-center font-semibold mb-4 p-4">
          LOGIN WITH GOOGLE ACCOUNT
        </h3>
        <div className="border-2 text-center px-2 py-4 w-1/3 mx-auto bg-green-400">
          GOOGLE
        </div>
      </div>
    </div>
  );
}

export default Login;
