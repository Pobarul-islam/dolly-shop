import React from 'react';
import Layout from '../../Components/Layout';
import AdminMenu from '../../Components/Layout/AdminMenu';

const CreateProduct = () => {
    return (
      <Layout title="Dashboard - Create-Product">
        <div className="grid lg:grid-cols-4 gap-40">
          {" "}
          <div>
            {" "}
            <AdminMenu />
          </div>
          <div>
            <h2>Create Product</h2>
          </div>
        </div>
      </Layout>
    );
};

export default CreateProduct;