import { useState } from "react";
import { useLoginUserMutation } from "../../api/apiSlice";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import ClipLoader from "react-spinners/ClipLoader";
import { IoAlertCircleSharp } from "react-icons/io5";

function Login() {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [data, setData] = useState({
    email: "",
    pwd: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!data.email || !data.pwd) return;
    if (!validateEmail(data.email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setEmailError("");
    try {
      const user = await loginUser(data).unwrap();
      console.log(user);
      setData({ username: "", password: "" });
      navigate("/");
    } catch (err) {
      setServerError(err.data.message);
      console.error(err);
    }
  };

  return (
    <div className="bg-stone-100 h-full select-none">
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
            placeholder="example@campany.com"
            name="email"
            id="email"
            required
            autoComplete="email"
            value={data.email}
            onChange={handleOnChange}
            className={`border-2 border-gray-300 p-2 ${
              emailError ? "mb-1" : "mb-6"
            }`}
          />
          {emailError && (
            <div className="text-red-500 text-xs mb-6">{emailError}</div>
          )}

          <label
            htmlFor="pwd"
            className="text-gray-500 mb-2 ss:text-sm text-xs  font-semibold"
          >
            PASSWORD:
          </label>
          <div className="border-2 border-gray-300 mb-1 flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="•••••••••••••"
              name="pwd"
              id="pwd"
              required
              value={data.pwd}
              onChange={handleOnChange}
              className=" h-full p-2 w-full focus:outline-none"
            />
            {showPassword ? (
              <AiOutlineEye
                size={30}
                className="p-1 cursor-pointer"
                onClick={() =>
                  setShowPassword((prevShowPasswords) => !prevShowPasswords)
                }
              />
            ) : (
              <AiOutlineEyeInvisible
                size={30}
                className="p-1 cursor-pointer"
                onClick={() =>
                  setShowPassword((prevShowPasswords) => !prevShowPasswords)
                }
              />
            )}
          </div>
          <Link
            to={"/forgotPassword"}
            className="mb-6 ss:text-xs text-[0.6rem] hover:underline w-fit"
          >
            FORGOT PASSWORD?
          </Link>
          {serverError && (
            <div className="text-red-500 text-sm mb-1 flex items-center justify-center animate-custom-bounce">
              <IoAlertCircleSharp size={20} className="mr-1" />
              {serverError}
            </div>
          )}
          <button
            type="submit"
            className="bg-black cursor-pointer text-white font-semibold py-3 hover:bg-white hover:text-black duration-700 border-2 border-black tracking-widest mb-4 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? <ClipLoader color="#E0E0E0," size={25} /> : "LOGIN"}
          </button>
        </form>
        <p className="text-center mb-4 px-4">YOU DON'T HAVE AN ACCOUNT?</p>
        <Link
          to={"/register"}
          className="bg-stone-200 block ss:w-1/2 w-2/3 mx-auto text-center text-black font-semibold py-2 hover:bg-white duration-700 border-2 border-stone-200 tracking-widest mb-4"
        >
          REGISTER
        </Link>
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
