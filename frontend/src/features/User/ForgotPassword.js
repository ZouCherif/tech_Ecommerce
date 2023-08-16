import { useState } from "react";
import { useForgotPasswordMutation } from "../../api/apiSlice";
import ClipLoader from "react-spinners/ClipLoader";
import { IoAlertCircleSharp } from "react-icons/io5";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading, isSuccess }] =
    useForgotPasswordMutation();
  const [emailError, setEmailError] = useState("");
  const [serverError, setServerError] = useState("");

  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!email) return;
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setEmailError("");
    try {
      const result = await forgotPassword({ email }).unwrap();
    } catch (err) {
      if (err.data?.message !== undefined) {
        setServerError(err.data.message);
        return;
      }
      setServerError("505 Server Error");
      console.error(err);
    }
  };

  return (
    <div className="bg-stone-100 h-screen select-none flex justify-center">
      <div className="sm:w-1/2 w-3/4 bg-white px-4">
        <h1 className="font-bold text-4xl text-center py-6">LOGO</h1>
        <hr className="border-black mb-4" />
        <form
          className="flex flex-col ss:w-2/3 ss:p-4 mx-auto tracking-widest"
          onSubmit={handleOnSubmit}
        >
          <p className="text-center text-sm mb-6">
            Enter the email address associated with your account and we will
            send you a link to reset your password.
          </p>
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
            value={email}
            required
            disabled={isSuccess}
            onChange={handleOnChange}
            autoComplete="email"
            className={`border-2 border-gray-300 p-2 ${
              emailError ? "mb-1" : "mb-6"
            }`}
          />
          {emailError && (
            <div className="text-red-500 text-xs mb-4">{emailError}</div>
          )}
          {serverError && (
            <div className="text-red-500 text-sm mb-1 flex items-center justify-center animate-custom-bounce">
              <IoAlertCircleSharp size={20} className="mr-1" />
              {serverError}
            </div>
          )}
          {!isSuccess ? (
            <button
              type="submit"
              disabled={isLoading}
              className="bg-black cursor-pointer text-white font-semibold py-3 hover:bg-white hover:text-black duration-700 border-2 border-black tracking-widest mb-4 flex items-center justify-center"
            >
              {isLoading ? (
                <ClipLoader color="#E0E0E0," size={25} />
              ) : (
                "CONTINUE"
              )}
            </button>
          ) : (
            <p>A reset password email was sent to you </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
