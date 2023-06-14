import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});

  // initall details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  // getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row grid lg:grid-cols-3 m-4">
        <div className="col-1	">
          <img
            className="w-96 h-96"
            src={`/api/v1/product/product-photo/${product._id}`}
            alt={product.name}
          />
        </div>
        <div className="col-2">
          <h1 className="text-center">Products Details</h1> 
          <h4>Name: {product.name} </h4>
          <h4>Description: {product.description} </h4>
          <h4>Price: {product.price} </h4>
    
       
        </div>

        <div className="col-3">
          <p>Similar Products</p>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
