import React from 'react'
import Layout from '../../Components/Layout/Layout';
import UserMenu from '../../Components/Layout/UserMenu';


function Orders() {
  return (
    <Layout title={"Your orders"}>
      <div className="grid lg:grid-cols-4 gap-40">
    
        <div>
         
          <UserMenu />
        </div>
        <div>
          <h2>All orders</h2>
        </div>
      </div>
    </Layout>
  );
}

export default Orders