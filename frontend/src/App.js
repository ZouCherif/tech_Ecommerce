import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./features/User/Login";
import Register from "./features/User/Register";
import ForgotPassword from "./features/User/ForgotPassword";
import SharedLayout from "./components/SharedLayout";
import Home from "./pages/Home";
import ResetPassword from "./features/User/ResetPassword";
import Err404 from "./pages/Err404";
import RequireAuth from "./features/User/RequireAuth";
import Dashboard from "./pages/Dashboard";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<Err404 />} />
        </Route>
        <Route
          path="auth"
          element={
            <GoogleOAuthProvider
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            >
              <Login />
            </GoogleOAuthProvider>
          }
        />
        <Route
          path="register"
          element={
            <GoogleOAuthProvider
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            >
              <Register />
            </GoogleOAuthProvider>
          }
        />
        <Route path="forgotpassword" element={<ForgotPassword />} />
        <Route path="resetpassword/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
