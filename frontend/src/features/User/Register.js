import { useState } from "react";
import { useRegisterNewUserMutation } from "../../api/apiSlice";
import { useNavigate, Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { IoAlertCircleSharp } from "react-icons/io5";

function Register() {
  const [addNewUser, { isLoading, error }] = useRegisterNewUserMutation();
  const [data, setData] = useState({
    email: "",
    username: "",
    pwd: "",
    pwdC: "",
  });
  const [showPasswords, setShowPasswords] = useState(false);
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [serverError, setServerError] = useState("");

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
    if (!data.email || !data.pwd || !data.pwdC || !data.username) return;
    if (!validateEmail(data.email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setEmailError("");
    if (pwd !== pwdC) {
      setServerError("Passwords do not match");
      return;
    }
    setServerError("");
    try {
      const response = await addNewUser(data).unwrap();
      console.log(response);
      setData({
        email: "",
        username: "",
        pwd: "",
        pwdC: "",
      });
      navigate("/");
    } catch (err) {
      setServerError(err.data.message);
      console.error("failed: ", err);
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
            REGISTER
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
            autoComplete="email"
            required
            value={data.email}
            onChange={handleOnChange}
            className={`border-2 border-gray-300 p-2 ${
              emailError ? "mb-1" : "mb-6"
            }`}
          />
          {emailError && (
            <div className="text-red-500 text-xs mb-4">{emailError}</div>
          )}
          <label
            htmlFor="username"
            className="text-gray-500 mb-2 ss:text-sm text-xs font-semibold"
          >
            USERNAME:
          </label>
          <input
            type="text"
            name="username"
            id="username"
            required
            placeholder="Username"
            value={data.username}
            onChange={handleOnChange}
            className="border-2 border-gray-300 p-2 mb-6"
          />
          <label
            htmlFor="pwd"
            className="text-gray-500 mb-2 ss:text-sm text-xs font-semibold"
          >
            PASSWORD:
          </label>
          <input
            type={showPasswords ? "text" : "password"}
            name="pwd"
            id="pwd"
            placeholder="•••••••••••••"
            required
            value={data.pwd}
            onChange={handleOnChange}
            className="border-2 border-gray-300 p-2 mb-6"
          />
          <label
            htmlFor="pwdC"
            className="text-gray-500 mb-2 ss:text-sm text-xs font-semibold"
          >
            CONFIRM PASSWORD:
          </label>
          <input
            type={showPasswords ? "text" : "password"}
            name="pwdC"
            id="pwdC"
            placeholder="•••••••••••••"
            required
            value={data.pwdC}
            onChange={handleOnChange}
            className="border-2 border-gray-300 p-2 mb-2"
          />
          <div className="flex items-center mb-6">
            <input
              id="showpwd"
              type="checkbox"
              checked={showPasswords}
              onChange={() =>
                setShowPasswords((prevShowPasswords) => !prevShowPasswords)
              }
              className="mr-1 cursor-pointer"
            />
            <label htmlFor="showpwd" className="text-xs cursor-pointer">
              SHOW PASSWORDS
            </label>
          </div>
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
            {isLoading ? <ClipLoader color="#E0E0E0," size={25} /> : "Register"}
          </button>
        </form>
        <p className="text-center mb-4 px-4">ALREADY HAVE AN ACCOUNT?</p>
        <Link
          to={"/auth"}
          className="bg-stone-300 block ss:w-1/2 w-2/3 mx-auto text-center text-black font-semibold py-2 hover:bg-white duration-700 border-2 border-stone-300 tracking-widest mb-4"
        >
          LOGIN
        </Link>
        <div className="flex items-center mx-center justify-center">
          <hr className="border-black w-1/3" />
          <span className="mx-2 text-xs">OR</span>
          <hr className="border-black  w-1/3" />
        </div>
        <h3 className="text-center font-semibold mb-4 p-4">
          REGISTER WITH GOOGLE ACCOUNT
        </h3>
        <div className="border-2 text-center px-2 py-4 w-1/3 mx-auto bg-green-400">
          GOOGLE
        </div>
      </div>
    </div>
  );
}

export default Register;
