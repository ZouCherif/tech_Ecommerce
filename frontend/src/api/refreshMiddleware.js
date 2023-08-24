import { middleware } from "@reduxjs/toolkit/query/react";
import { useRefreshTokenMutation } from "./apiSlice"; // Import your refresh token logic
import { useDispatch } from "react-redux";
import { setUserInfo } from "../features/User/userSlice";

const customMiddleware = (api) => (next) => async (action) => {
  const [refreshToken] = useRefreshTokenMutation();
  const dispatch = useDispatch();
  // Check if the action is a failed API request with a 401 error
  if (action.type === "api/request/failed" && action.error.status === 401) {
    try {
      // Refresh the access token
      const { accessToken } = await refreshToken().unwrap();
      dispatch(setUserInfo({ accessToken })); // Implement your refresh token logic

      // Retry the original request
      const retryAction = api.util.updateQueryData(
        action.meta.arg.endpoint,
        (draft) => {
          // Clear cached data and invalidate the request
          draft.invalidated = true;
          draft.data = null;
        }
      );

      return next(retryAction);
    } catch (refreshError) {
      // Handle refresh error, such as redirecting to login page
      console.error("Failed to refresh token:", refreshError);
    }
  }

  // Pass the action along to the next middleware
  return next(action);
};

export default customMiddleware;
