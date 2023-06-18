import React, { useState } from "react";

import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  
  // from functionality

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        phone,
        address,
        password,
        answer
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
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
              <h2 className="text-center text-3xl p-3">Register</h2>
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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
                  placeholder="Address"
                  className="input input-bordered"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Phone"
                  className="input input-bordered"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="form-control">
                <input
                  type="text"
                  placeholder="what is your favorite sports"
                  className="input input-bordered"
                  required
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </div>
              <div className="form-control">
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
              </div>
              <Link to="/login" className="text-red-500">
                Already have an account ? Please Login
              </Link>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
