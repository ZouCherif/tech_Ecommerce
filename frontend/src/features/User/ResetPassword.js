import { useState } from "react";
import { useResetPasswordMutation } from "../../api/apiSlice";
import ClipLoader from "react-spinners/ClipLoader";
import { IoAlertCircleSharp } from "react-icons/io5";
import { useParams } from "react-router-dom";

function ResetPassword() {
  const { token } = useParams();
  const [password, setPwd] = useState("");
  const [serverError, setServerError] = useState("");
  const [resetPassword, { isLoading, isSuccess }] = useResetPasswordMutation();
  const handleOnChange = (e) => {
    setPwd(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!password) {
      setServerError("password is required");
      return;
    }
    try {
      const result = await resetPassword(token, password).unwrap();
      setPwd("");
      console.log(result);
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
          <p className="text-center text-sm mb-6">Enter the new password.</p>
          <label
            htmlFor="email"
            className="text-gray-500 mb-2 ss:text-sm text-xs font-semibold"
          >
            PASSWORD
          </label>
          <input
            type="password"
            placeholder=""
            name="password"
            id="pawword"
            value={password}
            required
            onChange={handleOnChange}
            className={`border-2 border-gray-300 p-2 mb-4`}
          />
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
            <p>password reset successfully</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
