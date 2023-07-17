import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout';
import UserMenu from '../../Components/Layout/UserMenu';
import axios from 'axios';
import { useAuth } from '../../Context/auth';


function Orders() {
  const [auth, setAuth] = useAuth();
  const [orders, setOrders] = useState([])
  const getOrders = async () => {
    try {
      const { data } = await axios.get('/api/v1/auth/orders');
      setOrders(data)
    } catch (error) {
      console.log(error)
      
    }
  }

  useEffect(() => {
    getOrders();
  },[auth?.token])
  return (
    <Layout title={"Your orders"}>
      <div className="grid lg:grid-cols-4 gap-40">
        <div>
          <UserMenu />
        </div>
        <div className="mt-5">
          <h2>All orders</h2>
          {orders.map((item) => {
            return <div key={item.id}>I am one Object in the Array {item}</div>;
          })}
        </div>
      </div>
    </Layout>
  );
}

export default Orders