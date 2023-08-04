function ForgotPassword() {
  return (
    <div className="bg-stone-100 h-screen select-none flex justify-center">
      <div className="w-1/2 bg-white px-4">
        <h1 className="font-bold text-4xl text-center py-6">LOGO</h1>
        <hr className="border-black mb-4" />
        <div className="flex flex-col ss:w-2/3 p-4 mx-auto">
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
            required
            autoComplete="email"
            className="border-2 border-gray-300 p-2 mb-4"
          />
          <button
            type="submit"
            className="bg-black cursor-pointer text-white font-semibold py-3 hover:bg-white hover:text-black duration-700 border-2 border-black tracking-widest mb-4 flex items-center justify-center"
          >
            Continue
            {/* {isLoading ? <ClipLoader color="#E0E0E0," size={25} /> : "LOGIN"} */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
