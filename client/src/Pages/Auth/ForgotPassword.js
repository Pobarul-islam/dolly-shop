import React, { useState } from "react";
import Layout from "../../Components/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import {  Link, useNavigate } from "react-router-dom";


const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  

  // from functionality
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        answer,
        newPassword,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
      
        navigate( "/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went error");
    }
  };

  return (
    <Layout title={"Forgot Password"}>
      <div className=" min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card flex-shrink-0 mt-10 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleOnSubmit} className="card-body">
              <h2 className="text-2xl text-center">Reset Password</h2>
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
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Enter your favorite sport name"
                  className="input input-bordered"
                  required
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </div>

              <div className="form-control mt-2">
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <Link to="/login" className="text-red-500 font-bold">Login</Link>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Reset</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
