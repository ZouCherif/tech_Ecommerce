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
import Overview from "./pages/dashboard/Overview";
import Products from "./pages/dashboard/Products";
import Categories from "./pages/dashboard/Categories";
import Orders from "./pages/dashboard/Orders";
import AddNewCategory from "./pages/dashboard/AddNewCategory";
import AddNewProduct from "./pages/dashboard/AddNewProduct";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<Err404 />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="overview" element={<Overview />} />
            <Route path="categories">
              <Route index element={<Categories />} />
              <Route path="addNewCategory" element={<AddNewCategory />} />
            </Route>
            <Route path="products">
              <Route index element={<Products />} />
              <Route path="addNewProduct" element={<AddNewProduct />} />
            </Route>
            <Route path="orders" element={<Orders />} />
          </Route>
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
