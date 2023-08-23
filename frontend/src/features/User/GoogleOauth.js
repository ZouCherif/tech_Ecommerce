import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useGoogleAuthMutation } from "../../api/apiSlice";

function GoogleOauth() {
  const [googleAuth, { isLoading }] = useGoogleAuthMutation();
  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const { accessToken } = await googleAuth({ code: codeResponse }).unwrap();
      dispatch(setUserInfo({ accessToken }));
      navigate("/");
    },
    flow: "auth-code",
  });

  return (
    <button
      onClick={() => googleLogin()}
      className="flex items-center bg-stone-200 p-2 shadow-md mx-auto border-[1px] border-black"
    >
      <FcGoogle size={20} className="mr-4" />
      login with Google account
    </button>
  );
}

export default GoogleOauth;
