import React from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/auth';
import { toast } from 'react-toastify';
  import "react-toastify/dist/ReactToastify.css";
const Header = () => {
  const handleLogout = () => {
    setAuth({
      ...auth, user:null, token:''
    })
    localStorage.removeItem('auth');
    toast.success("Logout successfully")
  }
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
             <li>
               <Link to="/register">Register</Link>
             </li>
             <li>
               <Link to="/login">Login</Link>
             </li>
           </>
         ) : (
           <>
             <div className="dropdown text-black">
               <label tabIndex={0} className="btn  m-1">
                 {auth?.user?.name}
               </label>
               <ul
                 tabIndex={0}
                 className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
               >
                 <li>
                   <a>Dashboard</a>
                 </li>
                 <li>
                   <Link onClick={handleLogout} to="/login">
                     Logout
                   </Link>
                 </li>
               </ul>
             </div>
           </>
         )}
         <li>
           <Link to="/cart">Cart (0)</Link>
         </li>
       </>
     );
    return (
   
        <div className="navbar uppercase  bg-slate-700 sticky top-0 z-10 text-white">
          <div className="navbar-start">
            <div className="dropdown text-white">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-slate-700  text-white rounded-box w-52"
              >
                {menuItems}
              </ul>
            </div>
            <Link to={"/"} className="btn btn-ghost normal-case gap-3 text-xl">
              <span className="text-red-400">
                <FaShoppingCart />{" "}
              </span>{" "}
              Dolly Shop
            </Link>
          </div>
          <div className="navbar-end hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{menuItems}</ul>
          </div>
        </div>
   
    );
};

export default Header;