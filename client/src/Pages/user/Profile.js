import React, { useEffect, useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import UserMenu from '../../Components/Layout/UserMenu';
import { useAuth } from '../../Context/auth';
import axios from 'axios';
import { toast } from 'react-toastify';


const Profile = () => {
  // content
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // from functionality

  // form function
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  // get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);

  }, [auth?.user]);
  return (
    <Layout title="Your Profile">
      <div className="grid lg:grid-cols-4 gap-40">
        <div>
          <UserMenu />
        </div>
        <div className="hero-content  flex-col lg:flex-row-reverse">
          <div className="card flex-shrink-0 mt-10 w-96 max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleOnSubmit} className="card-body">
              <h2 className="text-center text-3xl p-3">User Profile</h2>
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered"
                  
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-control">
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  
                  disabled
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Address"
                  className="input input-bordered"
                  
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Phone"
                  className="input input-bordered"
                  
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="form-control">
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered"
                  value={password}
                  
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;