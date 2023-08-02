import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./features/User/Login";
import SignUp from "./features/USer/SignUp";
import SharedLayout from "./components/SharedLayout";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
