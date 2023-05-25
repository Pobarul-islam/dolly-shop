import React from "react";

import Footer from "./Footer";
import { Helmet } from "react-helmet";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
  
const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content={author} />
        <meta name={"keywords"} content={keywords} />
        <link rel="canonical" href="http://internbangla.com" />
      </Helmet>
      <Header />
          <main style={{ minHeight: "70vh" }}>{children}</main>
          <ToastContainer/>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Dolly - Shop now",
  name: "Dolly Shop",
  author: "Pobarul islam",
  keywords: "daraz.com, mern stack project, ecommarce project, online shop",
};
export default Layout;
