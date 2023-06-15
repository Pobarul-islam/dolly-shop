import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const navigate = useNavigate();
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
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProduct(data?.products);
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
          <h4>Price: {product.price}</h4>
          <h4>Cetegory: {product?.category?.name}</h4>
          <div>
            <button className="btn btn-primary uppercase">Add to Cart</button>
          </div>
        </div>

        <div className="col-3">
          <h1>Similar Products</h1>
          {relatedProduct.length < 1 && (
            <p className="text-center">No similar Products found</p>
          )}
          <div className="row grid lg:grid-cols-1 gap-5 md:grid-cols-2 sm:grid-cols-1">
            {relatedProduct.map((p) => (
              <div
                className="card card-compact bg-base-100 shadow-xl"
                key={p._id}
              >
                <figure>
                  <img
                    className="w-96 h-72"
                    src={`/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                  />
                </figure>
                <div className="card-body ">
                  <h2 className="card-title">{p.name} </h2>
                  <p>{p.description.substring(0, 70)}... </p>
                  <p>$ {p.price} </p>
                  <div className="row flex gap-4">
                    <div className="card-actions justify-end">
                      <button
                        onClick={() => navigate(`/product/${p.slug}`)}
                        className="btn btn-primary uppercase"
                      >
                        More Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
