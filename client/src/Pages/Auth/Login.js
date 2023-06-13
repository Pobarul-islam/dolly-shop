import React, { useState } from "react";

import { toast } from "react-toastify";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/auth";
import Layout from "../../Components/Layout/Layout";

const Login = () => {
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // from functionality
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/Login", {
        email,

        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went error");
    }
  };

  return (
    <Layout>
      <div className=" min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card flex-shrink-0 mt-10 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleOnSubmit} className="card-body">
              <h2 className="text-3xl text-center p-3">Login</h2>
              <div className="form-control">
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-control mt-2">
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Link
                to="/forgot-password"
                onClick={() => {
                  navigate("/forgot-password");
                }}
                href="#"
                className="label-text-alt link link-hover text-red-5p00 font-bold"
              >
                Forgot password ?
              </Link>

              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
              <button className="label">
                <Link
                  to="/register"
                  onClick={() => {
                    navigate("/");
                  }}
                  href="#"
                  className="label-text-alt  link link-hover font-bold"
                >
                  <span className="text-red-500"> New to Dolly shop ?</span>{" "}
                  <span className=""> Create new account</span>
                </Link>
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
