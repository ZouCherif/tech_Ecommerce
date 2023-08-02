import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./features/User/Login";
import Register from "./features/User/Register";
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
        <Route path="register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
