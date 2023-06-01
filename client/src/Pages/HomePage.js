import React from 'react';
import Layout from '../Components/Layout';
import { useAuth } from '../Context/auth';

const HomePage = () => {
  const [auth, setAuth] = useAuth();
    return (
      <Layout title={"Best offer"}>
        <h1>Homepage</h1>
   <pre>{JSON.stringify(auth, null, 4)} </pre>
      </Layout>
    );
};

export default HomePage;