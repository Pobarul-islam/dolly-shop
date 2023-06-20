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
    if (auth?.token) getOrders();
  },[auth?.token])
  return (
    <Layout title={"Your orders"}>
      <div className="grid lg:grid-cols-4 gap-40">
    
        <div>
         
          <UserMenu />
        </div>
        <div>
          <h2>All orders</h2>
          <p>{JSON.stringify(orders, null, 4)} </p>
        </div>
      </div>
    </Layout>
  );
}

export default Orders