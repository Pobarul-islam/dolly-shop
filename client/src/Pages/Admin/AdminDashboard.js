import React from "react";
import Layout from "../../Components/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import { useAuth } from "../../Context/auth";
const AdminDashboard = () => {
    const [auth] = useAuth();
  return (
    <Layout>
  
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-6 m-3 p-3">
        <div>
          <AdminMenu />
        </div>
        <div>
          <h1 className=" border p-3 m-2">Admin Name: {auth?.user?.name} </h1>
          <h1 className=" border p-3 m-2"> Email: {auth?.user?.email} </h1>
          <h1 className=" border p-3 m-2"> Phone: {auth?.user?.phone} </h1>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
