import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Category from "./Pages/Category";
import Policy from "./Pages/Policy";
import NotFound from "./Pages/NotFound";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Pages/user/Dashboard";
import PrivateRoute from "./Components/Routes/Private";
import ForgotPassword from "./Pages/Auth/ForgotPassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/category" element={<Category />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="" element={<Dashboard />}></Route>
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
