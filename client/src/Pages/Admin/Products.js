import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import AdminMenu from "../../Components/Layout/AdminMenu";

const Products = () => {
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      // toast.error("Someething Went Wrong"); 
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="row flex">
        <div>
          <AdminMenu/>
        </div>
    
        <div className=" grid lg:grid-cols-3 gap-4 p-4">
          {products.map((p) => (
            <div key={p._id}>
              {" "}
              <div
                className="card card-compact bg-base-100 shadow-xl"
                key={p._id}
              >
                <figure>
                  <img className="w-96" src={p.photo} alt={p.name} />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{p.name} </h2>
                  <p>{p.description} </p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
