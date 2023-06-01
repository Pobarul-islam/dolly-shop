import React from "react";
import { Link } from "react-router-dom";

const AdminMenu = () => {
  return (
      <div className="m-2">
          <h2 className="text-center text-purple-500 font-bold">Admin Dashboard</h2>
      {" "}
      <ul className="bg-white shadow-md rounded-lg divide-y divide-gray-200">
        <li className="px-6 py-4 hover:bg-gray-100">
          <a href="#" className="flex items-center space-x-2">
            <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
              <i className="fas fa-envelope" />
            </span>
            <Link
              to="/dashboard/admin/create-category"
              className="text-gray-800"
            >
              Create Catagory
            </Link>
          </a>
        </li>
        <li className="px-6 py-4 hover:bg-gray-100">
          <a href="#" className="flex items-center space-x-2">
            <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
              <i className="fas fa-check" />
            </span>
            <Link
              to="/dashboard/admin/create-product"
              className="text-gray-800"
            >
              Create Product
            </Link>
          </a>
        </li>
        <li className="px-6 py-4 hover:bg-gray-100">
          <a href="#" className="flex items-center space-x-2">
            <span className="bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
              <i className="fas fa-star" />
            </span>
            <Link to="/dashboard/admin/users" className="text-gray-800">
              Users
            </Link>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AdminMenu;
