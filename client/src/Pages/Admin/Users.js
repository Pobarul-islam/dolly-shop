import React from 'react';
import Layout from '../../Components/Layout/Layout';
import AdminMenu from '../../Components/Layout/AdminMenu';


const Users = () => {
    return (
      <Layout title="Dashboard - All users">
        <div className='grid lg:grid-cols-4 gap-40'>
          {" "}
          <div>
            {" "}
            <AdminMenu />
          </div>
          <div>
            <h2>All Users</h2>
          </div>
        </div>
      </Layout>
    );
};

export default Users;