import React from 'react';
import Navbar from './Header';
import Footer from './Footer';

const Layout = (props) => {
    return (
      <div>
        <Navbar/>
            <main style={{minHeight: "80vh"}}>{props.children}</main>
            <Footer/>
      </div>
    );
};

export default Layout;