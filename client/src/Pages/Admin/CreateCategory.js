import React from 'react';
import Layout from '../../Components/Layout';
import AdminMenu from '../../Components/Layout/AdminMenu';

const CreateCategory = () => {
    return (
      <Layout title="Dashboard - Create-category">
        <div className="grid lg:grid-cols-4 gap-40">
          {" "}
          <div>
            {" "}
            <AdminMenu />
          </div>
          <div>
            <h2>Create Category</h2>
          </div>
        </div>
      </Layout>
    );
};

export default CreateCategory;