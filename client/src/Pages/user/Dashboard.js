import React from "react";

import { useAuth } from "../../Context/auth";
import Layout from "../../Components/Layout/Layout";
import UserMenu from "../../Components/Layout/UserMenu";

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
