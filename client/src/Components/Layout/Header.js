import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchInput from "../Form/SearchInput";
const Header = () => {
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout successfully");
  };
  const [auth, setAuth] = useAuth();
  const menuItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>

      <li>
        <Link to="/category">category</Link>
      </li>
      {!auth.user ? (
        <>
          <Link to="/cart" tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </Link>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </>
      ) : (
        <></>
      )}
    </>
  );
  return (
    <div className="navbar  bg-slate-700 top-0 sticky z-10">
      <div className="flex-1">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl text-white">
          Dolly shop
        </Link>
      </div>
      <SearchInput/>

      <div className="flex-none text-white">
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{menuItems}</ul>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            className=" card card-compact dropdown-content w-52 bg-base-100 shadow"
          ></div>
        </div>
        <div className="dropdown dropdown-end text-black">
          <label tabIndex={0}>
            <div className="w-102 btn rounded-full">{auth?.user?.name}</div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link
                to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link onClick={handleLogout} to="/login">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
