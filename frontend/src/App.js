import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./features/User/Login";
import Register from "./features/User/Register";
import ForgotPassword from "./features/User/ForgotPassword";
import SharedLayout from "./components/SharedLayout";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="auth" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
