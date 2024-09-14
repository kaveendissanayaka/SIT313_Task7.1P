import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/auth/Login";
import LoginSuccess from "./components/auth/LoginSuccess";
import SignUpPage from "./components/auth/Signup";
import HomePage from "./components/homepage";

const App = () => {
  return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<LoginSuccess />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
  );
};

export default App;
