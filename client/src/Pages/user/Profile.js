import React from 'react';
import Layout from '../../Components/Layout';
import UserMenu from '../../Components/Layout/UserMenu';

const Profile = () => {
    return (
      <Layout title="Your Profile">
        <div className="grid lg:grid-cols-4 gap-40">
          <div>
            <UserMenu />
          </div>
          <div>
            <h2>Your Profile</h2>
          </div>
        </div>
      </Layout>
    );
};

export default Profile;