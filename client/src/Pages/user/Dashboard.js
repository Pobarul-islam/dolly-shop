import React from "react";
import Layout from "../../Components/Layout";
import UserMenu from "../../Components/Layout/UserMenu";
import { useAuth } from "../../Context/auth";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-6 m-3 p-3">
        <div>
          <UserMenu />
        </div>
        <div>
          <h1 className=" border p-3 m-2">{auth?.user?.name} </h1>
          <h1 className=" border p-3 m-2">{auth?.user?.email} </h1>
          <h1 className=" border p-3 m-2">{auth?.user?.address} </h1>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
